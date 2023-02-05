import { createOperationReducer } from './createOperationReducer';
import { buildActionNames } from './buildActionNames';
import { buildActionWrapper } from './buildActionWrapper';
import { INTERNAL_REF } from '../internal/internalRef';

export function createService<T>(Service: { new(): T, name: string }) {
    console.log('createService')
    const instance = new Service();
    const prototype = Object.getPrototypeOf(instance);
    const allPropertyNames = Object.getOwnPropertyNames(prototype);
    const propertyNames = allPropertyNames
        .filter(name => name !== 'constructor')
        .filter(name => typeof prototype[name] === 'function');

    const serviceActions: any = {};

    propertyNames.forEach(propertyName => {
        const { operationId, actionNames } = buildActionNames(Service.name, propertyName);
        const reducer = createOperationReducer(operationId, actionNames);

        INTERNAL_REF.updateReducer(reducer);

        serviceActions[propertyName] = buildActionWrapper(instance, propertyName, actionNames);
    });

    return {
        actions: serviceActions as T,
    };
}
