// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type OperationId<TRes = unknown, TArgs = unknown[], TErr = Error> = string;

export type AsyncOperation<TRes = unknown, TArgs = unknown[], TErr = Error> = {
    id: OperationId<TRes, TArgs, TErr>;
    isLoading?: boolean;
    isError?: boolean;
    error?: TErr;
    args?: TArgs;
    result?: TRes;
};
