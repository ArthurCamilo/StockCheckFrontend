import api from './baseApi';

export class AuthenticationRequester {
    async authenticate(email: string, password: string): Promise<any> {
        const token = (await api.put('/authenticate', { email, password })).data;
        return token;
    }
}
