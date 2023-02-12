import { StoreEnhancer, Reducer,  compose } from '@reduxjs/toolkit';
import { INTERNAL_REF, ASYNC_OPERATIONS_STATE_FIELD } from './internal';

export const asyncOperationsEnchancer: StoreEnhancer = (next) => (reducer, preloadedState) => {
    const asyncOperationsState = {[ASYNC_OPERATIONS_STATE_FIELD]: {}};
    const state = preloadedState ? {...preloadedState, ...asyncOperationsState} : asyncOperationsState as any;
    const store = next(reducer, state);
    
    INTERNAL_REF.store = store;
    INTERNAL_REF.updateReducer = (asyncOperationsReducer: Reducer) => {
        const nextReducers = compose(reducer, asyncOperationsReducer) as unknown as Reducer;
        store.replaceReducer(nextReducers);  
    };
    
    return store;
};
