declare class OperationIdMetaClass<TRes = unknown, TArgs = unknown[]> {
    private result: TRes;
    private args: TArgs;
    private error: Error;
}

export type OperationId<TRes = unknown, TArgs = unknown[]> = string & OperationIdMetaClass<TRes, TArgs>;

export type AsyncOperation<TRes = unknown, TArgs = unknown[]> = {
    id: OperationId<TRes, TArgs>;
    isLoading?: boolean;
    isError?: boolean;
    error?: Error;
    args?: TArgs;
    result?: TRes;
};
