import { StoreEnhancer, Reducer,  compose } from '@reduxjs/toolkit';
import { INTERNAL_REF } from './internal/internalRef';

export const asyncOperationsEnchancer: StoreEnhancer = (next) => (reducer, preloadedState) => {
    const store = next(reducer, preloadedState);
    
    INTERNAL_REF.store = store;
    INTERNAL_REF.updateReducer = (asyncOperationsReducer: Reducer) => {
        const nextReducers = compose(reducer, asyncOperationsReducer) as unknown as Reducer;
        store.replaceReducer(nextReducers);  
    };
    
    return store;
};
