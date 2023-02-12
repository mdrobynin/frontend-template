import { useSelector } from 'react-redux';

import { OperationId, AsyncOperation, AppState } from '../types';
import { ASYNC_OPERATIONS_STATE_FIELD } from '../internal';
import { buildDefaultOperation } from '../utils/buildDefaultOperation';

export function useOperation<TRes = unknown, TArgs = unknown[]>(operationId?: OperationId<TRes, TArgs>) {    
    return useSelector((state: AppState) => {
        console.log(state, operationId)
        
        if (!operationId || !state[ASYNC_OPERATIONS_STATE_FIELD] || !state[ASYNC_OPERATIONS_STATE_FIELD][operationId]) {
            return buildDefaultOperation(operationId);
        }
        
        return state[ASYNC_OPERATIONS_STATE_FIELD][operationId] as AsyncOperation<TRes, TArgs>;
    });
}
