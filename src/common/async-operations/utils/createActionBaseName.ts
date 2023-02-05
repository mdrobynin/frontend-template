export function createActionBaseName(serviceName: string, fieldName: string) {
    const prefix = serviceName.toUpperCase();
    
    if (fieldName.length < 2) {
        return `${prefix}_${fieldName.toUpperCase()}`;
    }

    const parts: string[] = [];
    let temp = fieldName[0];
    
    for (let index = 1; index < fieldName.length; index++) {
        const charCode = fieldName.charCodeAt(index);
        
        if (charCode < 65 || charCode > 90) {
            temp += fieldName[index];
        } else {
            parts.push(temp);
            temp = fieldName[index];
        }
        
        if (index === fieldName.length - 1) {
            parts.push(temp);
        }
    }
    
    const builtName = parts.map(part => part.toUpperCase()).join('_');
    
    return `${prefix}_${builtName}`;
}
