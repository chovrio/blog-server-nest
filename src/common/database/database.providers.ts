import { getConfig } from 'src/utils';

const { MYSQL_CONFIG } = getConfig();
export const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
};
