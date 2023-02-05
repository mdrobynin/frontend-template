import { configureStore } from "@reduxjs/toolkit";

import { asyncOperationsEnchancer } from '../async-operations'

export const store = configureStore({
    reducer: (state: any) => state,
    enhancers: [asyncOperationsEnchancer],
});
