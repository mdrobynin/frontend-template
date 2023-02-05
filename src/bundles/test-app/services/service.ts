import { createService } from '../../../common/async-operations';

const api = {
    getValue: () => Promise.resolve({valueType: 'value'})
};

class Service {
    public async getValue(arg: {argType: string}) {
        return await api.getValue();
    }
}

export const service = createService(Service);
