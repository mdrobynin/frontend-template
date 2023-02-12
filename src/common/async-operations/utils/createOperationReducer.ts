import { Reducer } from "@reduxjs/toolkit";

import {
    OperationId,
    AsyncOperation,
    AppState,
    AsyncOperationAction,
    AsyncOperationActionNames,
    AsyncOperationExecutionStartedAction,
    AsyncOperationExecutionFailedAction,
    AsyncOperationExecutionSuccededAction,
} from '../types';
import { ASYNC_OPERATIONS_STATE_FIELD } from '../internal';
import { buildDefaultOperation } from './buildDefaultOperation';

export function createOperationReducer<TRes = unknown, TArgs = unknown[]>(
    operationId: OperationId<TRes, TArgs>,
    actionNames: AsyncOperationActionNames,
): Reducer<AppState | undefined, AsyncOperationAction> {
    return (state: AppState | undefined, action: AsyncOperationAction) => {
        const asyncOperationsState = (state && state[ASYNC_OPERATIONS_STATE_FIELD]) || {};
        
        switch (action.type) {
            case actionNames.initialize: {
                return {
                    ...state,
                    [ASYNC_OPERATIONS_STATE_FIELD]: {
                        ...asyncOperationsState,
                        [operationId]: buildDefaultOperation(operationId),
                    },
                };
            }
            
            case actionNames.executionStarted: {
                const startAction = action as AsyncOperationExecutionStartedAction<TArgs>;
                const operation = state && state[operationId]
                    ? state[operationId]
                    : buildDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: true,
                    args: startAction.payload.args
                } as AsyncOperation<TRes, TArgs>;
                
                return {
                    ...state,
                    [ASYNC_OPERATIONS_STATE_FIELD]: {
                        ...asyncOperationsState,
                        [operationId]: updatedOperation,
                    },
                };
            }
            
            case actionNames.executionSucceeded: {
                const successAction = action as AsyncOperationExecutionSuccededAction<TRes>;
                const operation = state && state[operationId]
                    ? state[operationId]
                    : buildDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: false,
                    result: successAction.payload.result,
                } as AsyncOperation<TRes, TArgs>;
                
                return {
                    ...state,
                    [ASYNC_OPERATIONS_STATE_FIELD]: {
                        ...asyncOperationsState,
                        [operationId]: updatedOperation,
                    },
                };
            }
            
            case actionNames.executionFailed: {
                const successAction = action as AsyncOperationExecutionFailedAction;
                const operation = state && state[operationId]
                    ? state[operationId]
                    : buildDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: false,
                    error: successAction.payload.error,
                } as AsyncOperation<TRes, TArgs>;
                
                return {
                    ...state,
                    [ASYNC_OPERATIONS_STATE_FIELD]: {
                        ...asyncOperationsState,
                        [operationId]: updatedOperation,
                    },
                };
            }
            default: {
                return state;
            }
        }
    };
}
