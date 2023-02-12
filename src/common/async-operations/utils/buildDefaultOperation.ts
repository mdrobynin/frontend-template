import { OperationId, AsyncOperation } from '../types';

export function buildDefaultOperation<TRes = unknown, TArgs = unknown[]>(operationId?: OperationId<TRes, TArgs>) {
    return {
        id: operationId,
        isLoading: false,
        isError: false,
        error: undefined,
        args: undefined,
        result: undefined,
    } as AsyncOperation<TRes, TArgs>;
}
