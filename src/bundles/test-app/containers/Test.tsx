import { useEffect } from 'react';

import {service} from '../services/service';

export function Test() {
    useEffect(() => {
        console.log(service)
    }, [])
    
    return (
        <></>
    );
}
