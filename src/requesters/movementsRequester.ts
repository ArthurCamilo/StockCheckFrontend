import Movement from '../models/movement';
import api from './baseApi';

export class MovementsRequester {
    async getMovements(): Promise<Movement[]> {
        const movements = (await api.get('/movements')).data.data;
        return movements.map((d: Movement) => d as Movement);
    }

    async addMovement(movement: Movement) {
        await api.post('/movements', movement);
    }

    async editMovement(movement: Movement) {
        await api.put(`/movements/${movement._id}`, movement);
    }

    async deleteMovement(movement: Movement) {
        await api.delete(`/movements/${movement._id}`);
    }
}


