import tempfile
import shutil
import pandas as pd
import pyterrier as pt
from pathlib import Path
from function_parser.language_data import LANGUAGE_METADATA
from function_parser.process import DataProcessor
from tree_sitter import Language
from transformers import AutoTokenizer, AutoModelWithLMHead, SummarizationPipeline


def copy_and_overwrite(from_path: Path, to_path: Path):
    if to_path.exists():
        shutil.rmtree(to_path)
    shutil.copytree(from_path, to_path)


def expand_methods(methods, expansion_method):
    if expansion_method == "NONE":
        for m in methods:
            m["text"] = m["function"]
        return methods
    elif expansion_method == "PLBART":
        raise Exception("TODO: implement me")
    elif expansion_method == "CODETRANS":
        model_name = "SEBIS/code_trans_t5_base_code_documentation_generation_java"
        pipeline = SummarizationPipeline(
            model=AutoModelWithLMHead.from_pretrained(model_name),
            tokenizer=AutoTokenizer.from_pretrained(
                model_name,
                skip_special_tokens=True,
            ),
            device=0,
        )
        documents = []
        for m in methods:
            summary = pipeline(m["function"])[0]["summary_text"]
            document = m["function"] + " " + summary
            documents.append({"text": document})
        return documents
    elif expansion_method == "KEYWORDS":
        raise Exception("TODO: implement me")
    else:
        raise Exception("Invalid expansion method.")


def get_methods_from_git_repo(git_repo_url, prog_lang):
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


def create_index_from_methods(methods, expansion_method, tmp_dir):
    documents = expand_methods(methods, expansion_method)

    # Create index
    pd_indexer = pt.DFIndexer(tmp_dir.name, blocks=True)
    df = pd.DataFrame(documents)
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
