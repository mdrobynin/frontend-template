import { BuiltAsyncOperationActionNames } from '../types';
import { createActionBaseName } from './createActionBaseName';
import { buildOperationId } from './operationId';

export function buildActionNames(
    serviceName: string,
    propertyName: string,
): BuiltAsyncOperationActionNames {
    const operationId = buildOperationId(serviceName, propertyName);
    const baseName = createActionBaseName(serviceName, propertyName);
    
    return {
        operationId,
        actionNames: {
            initialize: `${baseName}_INITIALIZE`,
            executionStarted: `${baseName}_EXECUTION_STARTED`,
            executionSucceeded: `${baseName}_EXECUTION_SUCCEEDED`,
            executionFailed: `${baseName}_EXECUTION_FAILED`,
        },
    };
}
