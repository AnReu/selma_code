import pandas as pd
import pyterrier as pt
from function_parser.language_data import LANGUAGE_METADATA
from function_parser.process import DataProcessor
from tree_sitter import Language


def get_methods_from_git_repo(git_repo_url, prog_lang):
    DataProcessor.PARSER.set_language(
        Language(
            '/media/gui/ssd/dev/retrievalsystem/backend/app/tree_sitter_languages/languages.so',
            prog_lang,
        )
    )
    processor = DataProcessor(
        language=prog_lang,
        language_parser=LANGUAGE_METADATA[prog_lang]['language_parser'],
    )
    definitions = processor.process_dee(
        git_repo_url, ext=LANGUAGE_METADATA[prog_lang]['ext']
    )
    return definitions


def create_index_from_methods(methods, tmp_dir):
    pd_indexer = pt.DFIndexer(tmp_dir.name)
    df = pd.DataFrame(methods)
    df['docno'] = df.index.astype(str)

    # The first argument should always a pandas.Series object of Strings,
    # which specifies the body of each document.
    # Any arguments after that are for specifying metadata.
    indexref = pd_indexer.index(df['function'], df['docno'])
    return indexref
