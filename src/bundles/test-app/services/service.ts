import { createService } from '../../../common/async-operations';

const api = {
    getValue: () => new Promise((resolve) => {
        setTimeout(() => {
            resolve('value');
        }, 5000)
    })
};

class Service {
    public static async getValue(arg: {argType: string}) {
        console.log(123);
        return await api.getValue();
    }
}

class AnotherService {
    public static async getValue(arg: {argType: string}) {
        return await Service.getValue(arg);
    }
}

export const service = createService(Service);

export const anotherService = createService(AnotherService);
