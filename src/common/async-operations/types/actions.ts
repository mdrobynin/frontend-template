import { Action } from '@reduxjs/toolkit';

export type AsyncOperationInitializeAction = Action<string>;

export type AsyncOperationExecutionStartedAction<TArgs> = Action<string> & {
    payload: {
        args: TArgs;
    },
};

export type AsyncOperationExecutionSuccededAction<TRes> = Action<string> & {
    payload: {
        result: TRes;
    },    
};

export type AsyncOperationExecutionFailedAction = Action<string> & {
    payload: {
        error: Error;
    },  
};

export type AsyncOperationAction<TRes = unknown, TArgs = unknown[]> =
    | AsyncOperationInitializeAction
    | AsyncOperationExecutionStartedAction<TArgs>
    | AsyncOperationExecutionSuccededAction<TRes>
    | AsyncOperationExecutionFailedAction;

export type AsyncOperationActionNames = {
    initialize: string,
    executionStarted: string,
    executionSucceeded: string,
    executionFailed: string,
};
