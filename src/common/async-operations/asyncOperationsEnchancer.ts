import { Store } from '@reduxjs/toolkit';
import { STORE_CACHE } from './internal/storeCache';

export function asyncOperationsEnchancer(config: {store: Store}) {
    if (!config.store || typeof config.store !== 'object') {
        throw new Error('Redux store must be passed to initReduxAsyncAction');
    }
    
    STORE_CACHE.store = config.store;
};

export type StoreEnhancer<Ext = {}, StateExt = {}> = (
    next: StoreEnhancerStoreCreator
  ) => StoreEnhancerStoreCreator<Ext, StateExt>
  export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
    S = any,
    A extends Action = AnyAction
  >(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => Store<S & StateExt, A> & Ext
  
const enchancer = (next: any) => (reducer: Reducer, initialState, enhance) => 