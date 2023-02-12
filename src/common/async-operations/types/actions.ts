import { Action } from '@reduxjs/toolkit';

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
    | Action<string>
    | AsyncOperationExecutionStartedAction<TArgs>
    | AsyncOperationExecutionSuccededAction<TRes>
    | AsyncOperationExecutionFailedAction;

export type AsyncOperationActionNames = {
    executionStarted: string,
    executionSucceeded: string,
    executionFailed: string,
};
