import { AsyncOperation } from './operation';
import { ASYNC_OPERATIONS_STATE_FIELD } from '../internal';

export type AsyncOperations = Record<string, AsyncOperation<any, any>>;

export type AppState = {
    [key: string]: any,
    [ASYNC_OPERATIONS_STATE_FIELD]: AsyncOperations,
};
