import { OperationId } from './operation';

type AnyFunction = (...args: any) => any;

export type ClassType = { new(): any, name: string };

export type ServiceField<T> = string & keyof T;

export type ArgsType<T, F extends ServiceField<T>> = T[F] extends AnyFunction
    ? Parameters<AnyFunction & T[F]>
    : never;
    
export type ResultType<T, F extends ServiceField<T>> = T[F] extends AnyFunction
    ? ReturnType<AnyFunction & T[F]>
    : never;
    
export type ServiceFieldOperationId<T extends ClassType, F extends ServiceField<T>> = OperationId<ArgsType<T, F>, ResultType<T, F>>;

export type ServiceFieldAction<T extends ClassType, F extends ServiceField<T>> = (...args: ArgsType<T, F>) => ResultType<T, F>;

type ServiceFieldsRecord<T, F> = Partial<Record<ServiceField<T>, F>>;

export type ServiceOperations<T extends ClassType> = ServiceFieldsRecord<T, ServiceFieldOperationId<T, ServiceField<T>>>;

export type ServiceActions<T extends ClassType> = ServiceFieldsRecord<T, ServiceFieldAction<T, ServiceField<T>>>;