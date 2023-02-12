import {
    ClassType,
    ServiceField,
    ServiceFieldOperationId
} from '../types';

export function buildOperationId<T extends ClassType, F extends ServiceField<T>>(Service: T, propertyName: F) {
    return `${Service.name}%%${propertyName}` as ServiceFieldOperationId<T, F>;
}
