import { Store } from '@reduxjs/toolkit';

type StoreCache = { store?: Store };

export const STORE_CACHE: StoreCache = {
    store: undefined
};
