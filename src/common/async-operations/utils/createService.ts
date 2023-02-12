import { createOperationReducer } from './createOperationReducer';
import { buildActionNames } from './buildActionNames';
import { buildActionWrapper } from './buildActionWrapper';
import { buildOperationId } from './operationId';
import { INTERNAL_REF } from '../internal';
import { ServiceField, ClassType, ServiceOperations, ServiceActions } from '../types';

function getServiceMethodNames<T extends ClassType>(Service: T): ServiceField<T>[] {
    const serviceFields = Object.getOwnPropertyNames(Service) as ServiceField<T>[];
    
    return serviceFields.filter(name => name !== 'constructor' && typeof Service[name] === 'function');
}

export function createService<T extends ClassType>(Service: T) {
    const serviceActions: ServiceActions<T> = {};
    const operations: ServiceOperations<T> = {};

    getServiceMethodNames(Service)
        .forEach(methodName => {
            if (!INTERNAL_REF.store) {
                throw new Error('asyncOperationsEnchancer was not used');
            }
            
            const operationId = buildOperationId(Service, methodName);
            const actionNames = buildActionNames(Service.name, methodName);
            const reducer = createOperationReducer(operationId, actionNames);

            INTERNAL_REF.updateReducer(reducer);

            serviceActions[methodName] = buildActionWrapper(
                Service,
                methodName,
                actionNames,
                INTERNAL_REF.store.dispatch
            );
            operations[methodName] = operationId;
        });

    return {
        actions: serviceActions as T,
        operations
    };
}
