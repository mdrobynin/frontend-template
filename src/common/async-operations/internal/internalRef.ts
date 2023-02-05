import { Reducer, Store } from '@reduxjs/toolkit';

type InternalRef = {
    updateReducer: (asyncOperationsReducer: Reducer) => void;
    store?: Store;
}

export const INTERNAL_REF: InternalRef = {
    updateReducer: () => void 0,
    store: undefined,
};
