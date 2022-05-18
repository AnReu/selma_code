import { Result } from '../app/services/results';
import { Config } from '../app/services/configs';

export const r1: Result = {
  acceptedAnswerId: 31,
  body: 'this is the body',
  id: 11,
  parentId: 22,
  postTypeId: 33,
  title: 'this is the title',
  tags: 'this is a tag',
  cut: true,
  relevantSentence: 'i am a relevant sentence',
};
export const r2: Result = {
  acceptedAnswerId: 36,
  body: 'i am the 2nd body',
  id: 113,
  parentId: 45,
  postTypeId: 93,
  title: '2nd title',
  tags: '2nd tag',
  cut: true,
  relevantSentence: '2nd relevant sentence',
};

export const cfg: Config = {
  database_path: 'myDbPath',
  db_table_name: 'myTableName',
  db_content_attribute_name: 'myContentAttributeName',
  databases_dir_path: 'myDataDir',
  index_path: '',
  indexes_dir_path: '',
  allowed_search_modes: {
    default: true, separated: false, url: false, file: true,
  },
};
