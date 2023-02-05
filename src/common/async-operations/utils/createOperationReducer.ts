import { Reducer } from "@reduxjs/toolkit";

import {
    OperationId,
    AsyncOperation,
    AsyncOperations,
    AsyncOperationAction,
    AsyncOperationActionNames,
    AsyncOperationExecutionStartedAction,
    AsyncOperationExecutionFailedAction,
    AsyncOperationExecutionSuccededAction,
} from '../types';

function getDefaultOperation<TRes = unknown, TArgs = unknown[], TErr = Error>(operationId: OperationId<TRes, TArgs, TErr>) {
    return {
        id: operationId,
        isLoading: false,
        isError: false,
        error: undefined,
        args: undefined,
        result: undefined,
    } as AsyncOperation<TRes, TArgs, TErr>;
}

export function createOperationReducer<TRes = unknown, TArgs = unknown[], TErr = Error>(
    operationId: OperationId<TRes, TArgs, TErr>,
    actionNames: AsyncOperationActionNames,
): Reducer<AsyncOperations | undefined> {
    return (state: AsyncOperations | undefined, action: AsyncOperationAction) => {
        const nextState: AsyncOperations = state ? state : {};
        
        switch (action.type) {
            case actionNames.initialize: {
                return {
                    ...nextState,
                    [operationId]: getDefaultOperation(operationId),
                };
            }
            case actionNames.executionStarted: {
                const startAction = action as AsyncOperationExecutionStartedAction<TArgs>;
                const operation = state && state[operationId]
                    ? state[operationId]
                    : getDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: true,
                    args: startAction.payload.args
                } as AsyncOperation<TRes, TArgs, TErr>;
                
                return {
                    ...nextState,
                    [operationId]: updatedOperation,
                };
            }
            case actionNames.executionSucceeded: {
                const successAction = action as AsyncOperationExecutionSuccededAction<TRes>;
                const operation = state && state[operationId]
                    ? state[operationId]
                    : getDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: false,
                    result: successAction.payload.result,
                } as AsyncOperation<TRes, TArgs, TErr>;
                
                return {
                    ...nextState,
                    [operationId]: updatedOperation,
                };
            }
            case actionNames.executionFailed: {
                const successAction = action as AsyncOperationExecutionFailedAction<TErr>
                const operation = state && state[operationId]
                    ? state[operationId]
                    : getDefaultOperation(operationId);
                const updatedOperation = {
                    ...operation,
                    isLoading: false,
                    error: successAction.payload.error,
                } as AsyncOperation<TRes, TArgs, TErr>;
                
                return {
                    ...nextState,
                    [operationId]: updatedOperation,
                };
            }
            default: {
                return nextState;
            }
        }
    };
}
