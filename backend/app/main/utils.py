import tempfile
import shutil
import pandas as pd
import pyterrier as pt
from pathlib import Path
from function_parser.language_data import LANGUAGE_METADATA
from function_parser.process import DataProcessor
from typing import List, NamedTuple, Optional
from tree_sitter import Language
from transformers import (
    AutoTokenizer,
    AutoModelWithLMHead,
    SummarizationPipeline,
    PLBartForConditionalGeneration,
    PLBartTokenizer,
)


# TODO: Find a better name for this class
class MethodDefinitions(NamedTuple):
    """
    Properties from the dictionary returned by process_dee from the DataProcessor class in function_parser.
    For more details, see: https://github.com/github/CodeSearchNet/tree/master/function_parser
    """

    nwo: str
    sha: str
    path: str
    language: str
    identifier: str
    parameters: str
    argument_list: str
    return_statement: str
    docstring: str
    docstring_summary: str
    docstring_tokens: str
    function: str
    function_tokens: str
    url: str
    id: Optional[str] = None
    text: Optional[str] = None


def expand_with_plbart(documents: List[MethodDefinitions], checkpoint: str) -> str:
    model = PLBartForConditionalGeneration.from_pretrained(checkpoint)
    tokenizer = PLBartTokenizer.from_pretrained(
        checkpoint, src_lang="java", tgt_lang="en_XX"
    )
    for doc in documents:
        inputs = tokenizer(doc["text"], return_tensors="pt")
        output_tokens = model.generate(
            **inputs,
            decoder_start_token_id=tokenizer.lang_code_to_id["__en_XX__"],
        )
        summary = tokenizer.batch_decode(output_tokens, skip_special_tokens=True)[0]
        doc["text"] = doc["text"] + " " + summary
    return documents


def expand_with_codetrans(documents: List[MethodDefinitions], checkpoint: str) -> str:
    for doc in documents:
        pipeline = SummarizationPipeline(
            model=AutoModelWithLMHead.from_pretrained(checkpoint),
            tokenizer=AutoTokenizer.from_pretrained(
                checkpoint,
                skip_special_tokens=True,
            ),
            device=0,
        )
        summary = pipeline(doc["text"])[0]["summary_text"]
        doc["text"] = doc["text"] + " " + summary
    return documents


def copy_and_overwrite(from_path: Path, to_path: Path):
    if to_path.exists():
        shutil.rmtree(to_path)
    shutil.copytree(from_path, to_path)


def expand_documents(
    original_docs, expansion_methods: List[str]
) -> List[MethodDefinitions]:
    expanded_docs = original_docs
    for doc in expanded_docs:
        doc["text"] = doc["function"]

    if "CODETRANS" in expansion_methods:
        CODETRANS_CHECKPOINT = (
            "SEBIS/code_trans_t5_base_code_documentation_generation_java"
        )
        expanded_docs = expand_with_codetrans(expanded_docs, CODETRANS_CHECKPOINT)

    if "PLBART" in expansion_methods:
        PLBART_CHECKPOINT = "uclanlp/plbart-java-en_XX"
        expanded_docs = expand_with_plbart(expanded_docs, PLBART_CHECKPOINT)

    if "KEYWORDS" in expansion_methods:
        raise Exception("TODO: implement me")

    return expanded_docs


def get_methods_from_git_repo(git_repo_url, prog_lang) -> List[MethodDefinitions]:
    DataProcessor.PARSER.set_language(
        # TODO: replace hard-coded path
        Language(
            "/mnt/ssd/dev/retrievalsystem/backend/app/tree_sitter_languages/languages.so",
            prog_lang,
        )
    )
    processor = DataProcessor(
        language=prog_lang,
        language_parser=LANGUAGE_METADATA[prog_lang]["language_parser"],
    )
    definitions = processor.process_dee(
        git_repo_url, ext=LANGUAGE_METADATA[prog_lang]["ext"]
    )
    return definitions


def create_index_from_documents(
    documents: MethodDefinitions, expansion_methods: List[str], tmp_dir: Path
):
    expanded_docs = expand_documents(documents, expansion_methods)

    # Create index
    pd_indexer = pt.DFIndexer(tmp_dir.name, blocks=True)
    df = pd.DataFrame(expanded_docs)
    df["docno"] = df["id"].astype(str)

    # The first argument should always a pandas.Series object of Strings,
    # which specifies the body of each document.
    # Any arguments after that are for specifying metadata.
    indexref = pd_indexer.index(df["text"], df["docno"])
    return indexref


def update_index(old_index_path: Path, new_index):
    old_index = pt.IndexFactory.of(str(old_index_path / "data.properties"))
    old_index = pt.cast("org.terrier.structures.IndexOnDisk", old_index)
    new_index = pt.cast("org.terrier.structures.IndexOnDisk", new_index)
    tmp_dir = tempfile.TemporaryDirectory()
    temp_index = pt.autoclass("org.terrier.structures.IndexOnDisk").createNewIndex(
        str(tmp_dir.name),
        "data",
    )
    merger = pt.autoclass("org.terrier.structures.merging.StructureMerger")(
        new_index, old_index, temp_index
    )
    try:
        merger.mergeStructures()
        # print(merger.getCollectionStatistics())
        print(old_index.getCollectionStatistics())
        print(new_index.getCollectionStatistics())
    except:
        raise Exception("Error when merging indices.")
    else:
        # If merge is successful, rename old index,
        # create a new tir with the same name,
        # copy the temporary files to the new index
        copy_and_overwrite(Path(tmp_dir.name), old_index_path)
