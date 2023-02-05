export function buildOperationId(serviceName: string, propertyName: string) {
    return `${serviceName}%%${propertyName}`;
}

export function parseOperationId(operationId: string) {
    const parts = operationId.split('%%');
    
    if (parts.length < 2) {
        throw new Error('Invalid operation id passed to parseOperationId');
    }
    
    return {
        serviceName: parts[0],
        propertyName: parts[1],
    };
}