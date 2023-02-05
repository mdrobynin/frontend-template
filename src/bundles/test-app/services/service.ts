import { createService } from '../../../common/async-operations';

const api = {
    getValue: () => new Promise((resolve) => {
        setTimeout(() => {
            resolve('value');
        }, 5000)
    })
};

class Service {
    public async getValue(arg: {argType: string}) {
        return await api.getValue();
    }
}

export const service = createService(Service);
