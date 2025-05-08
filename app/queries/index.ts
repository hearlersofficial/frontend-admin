import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { v1QueryKeys } from '~/queries/v1';

const queries = mergeQueryKeys(v1QueryKeys);

export { queries };
