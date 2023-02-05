import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: (state: any) => state,
    enhancers: []
});
