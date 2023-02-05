import { createOperationReducer } from './createOperationReducer';
import { buildActionNames } from './buildActionNames';

export function createService<T>(Service: {new(): T, name: string}) {    
    const instance = new Service();
    const prototype = Object.getPrototypeOf(instance);
    const allPropertyNames = Object.getOwnPropertyNames(prototype);
    const propertyNames = allPropertyNames
        .filter(name => name !== 'constructor')
        .filter(name => typeof prototype[name] === 'function');
    
    propertyNames.forEach(propertyName => {
        const {operationId, actionNames} = buildActionNames(Service.name, propertyName);
        const reducer = createOperationReducer(operationId, actionNames);
    });
    
    return 1;
}
