export type AsyncOperationAction = {
    type: string,
};

export type AsyncOperationInitializeAction = AsyncOperationAction;

export type AsyncOperationExecutionStartedAction<TArgs> = AsyncOperationAction & {
    payload: {
        args: TArgs;
    },
};

export type AsyncOperationExecutionSuccededAction<TRes> = AsyncOperationAction & {
    payload: {
        result: TRes;
    },    
};

export type AsyncOperationExecutionFailedAction<TErr> = AsyncOperationAction & {
    payload: {
        error: TErr;
    },  
};

export type AsyncOperationActionNames = {
    initialize: string,
    executionStarted: string,
    executionSucceeded: string,
    executionFailed: string,
};

export type BuiltAsyncOperationActionNames = {
    operationId: string,
    actionNames: AsyncOperationActionNames,
}
