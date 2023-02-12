import { AsyncOperationActionNames } from '../types';

function buildUppercaseUnderscoreSeparatedName(name: string) {
    if (name.length === 1) {
        return name.toUpperCase();
    }

    const parts: string[] = [];
    let temp = name[0];
    
    for (let index = 1; index < name.length; index++) {
        const charCode = name.charCodeAt(index);
        
        if (charCode < 65 || charCode > 90) {
            temp += name[index];
        } else {
            parts.push(temp);
            temp = name[index];
        }
        
        if (index === name.length - 1) {
            parts.push(temp);
        }
    }
    
    return parts.map(part => part.toUpperCase()).join('_');
}

function createActionBaseName(serviceName: string, fieldName: string) {
    const prefix = buildUppercaseUnderscoreSeparatedName(serviceName);
    const name = buildUppercaseUnderscoreSeparatedName(fieldName);
    
    return `${prefix}_${name}`;
}

export function buildActionNames(
    serviceName: string,
    propertyName: string,
): AsyncOperationActionNames {
    const baseName = createActionBaseName(serviceName, propertyName);
    
    return {
        executionStarted: `${baseName}_EXECUTION_STARTED`,
        executionSucceeded: `${baseName}_EXECUTION_SUCCEEDED`,
        executionFailed: `${baseName}_EXECUTION_FAILED`,
    };
}
