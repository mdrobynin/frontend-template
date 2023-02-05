import { useEffect } from 'react';

import {service} from '../services/service';

console.log(service)

export function Test() {
    useEffect(() => {
        console.log(123)
        service.actions.getValue({ argType: '123' });
    }, [])
    
    return (
        <></>
    );
}
