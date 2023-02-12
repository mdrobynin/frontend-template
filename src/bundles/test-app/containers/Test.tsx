import { useEffect, memo } from 'react';

import {service, anotherService} from '../services/service';

import { useOperation } from '../../../common/async-operations'

export function TestContent() {
    const {isLoading, result} = useOperation(service.operations.getValue);
    const {isLoading: isLoading2, result: result2} = useOperation(anotherService.operations.getValue);
    
    useEffect(() => {
        service.actions.getValue({ argType: '123' });
        anotherService.actions.getValue({ argType: '123' });
    }, [])
    
    console.log(isLoading, result, isLoading2, result2)
    
    return (
        <div>
            <div>{isLoading}</div>
            <div>{result}</div>
            <div>{isLoading2}</div>
            <div>{result2}</div>
        </div>
    );
}

export const Test = memo(TestContent);
