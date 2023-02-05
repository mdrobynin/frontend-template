import { AsyncOperationActionNames } from '../types';
import { INTERNAL_REF } from '../internal/internalRef';

export function buildActionWrapper(instance: any, propertyName: string, actionNames:  AsyncOperationActionNames) {
    return (...args: any[]) => {
        if (INTERNAL_REF.store) {
            INTERNAL_REF.store.dispatch({ type: actionNames.initialize });
            
            const originalMethod = instance[propertyName] as (...args: any[]) => any;
            
            try {
                const methodResult = originalMethod(...args);
                
                INTERNAL_REF.store.dispatch({
                    type: actionNames.executionStarted,
                    payload: {
                        args,
                    },
                });
                
                if (methodResult.then) {
                    const resultPromise = methodResult as Promise<any>;
                    
                    resultPromise.then(
                        result => {
                            if (INTERNAL_REF.store) {
                                INTERNAL_REF.store.dispatch({
                                    type: actionNames.executionSucceeded,
                                    payload: {
                                        result,
                                    },
                                });
                            } else {
                                throw new Error('Unpredicted internal error');
                            }
                        },
                        error => {
                            if (INTERNAL_REF.store) {
                                INTERNAL_REF.store.dispatch({
                                    type: actionNames.executionFailed,
                                    payload: {
                                        error,
                                    },
                                });
                            } else {
                                throw new Error('Unpredicted internal error');
                            }
                        }
                    );
                } else {
                    INTERNAL_REF.store.dispatch({
                        type: actionNames.executionSucceeded,
                        payload: {
                            result: methodResult,
                        },
                    });
                }
            } catch (error) {
                INTERNAL_REF.store.dispatch({
                    type: actionNames.executionFailed,
                    payload: {
                        error,
                    },
                });
            }
        } else {
            throw new Error('asyncOperationsEnchancer was not used');
        }
    }
};
