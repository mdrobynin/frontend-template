import { Dispatch } from '@reduxjs/toolkit';

import { AsyncOperationActionNames, ClassType, ServiceField, ServiceFieldAction, ArgsType } from '../types';

export function buildActionWrapper<T extends ClassType, F extends ServiceField<T>>(
    Service: T,
    propertyName: F,
    actionNames: AsyncOperationActionNames,
    dispatch: Dispatch
) {
    return (...args: ArgsType<T, F>) => {
        const originalMethod = Service[propertyName] as ServiceFieldAction<T, F>;
        
        try {
            dispatch({
                type: actionNames.executionStarted,
                payload: { args },
            });
            
            const methodResult = originalMethod(...args);
            
            if (methodResult.then) {
                const resultPromise = methodResult as Promise<any>;
                
                resultPromise.then(
                    result => dispatch({
                        type: actionNames.executionSucceeded,
                        payload: { result },
                    }),
                    error => dispatch({
                        type: actionNames.executionFailed,
                        payload: { error },
                    })
                );
            } else {
                dispatch({
                    type: actionNames.executionSucceeded,
                    payload: { result: methodResult },
                });
            }
            
            return methodResult;
        } catch (error) {
            dispatch({
                type: actionNames.executionFailed,
                payload: { error },
            });
            
            throw error;
        }
    }
};
