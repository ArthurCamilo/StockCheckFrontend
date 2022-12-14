import Vendor from '../models/vendor';
import api from './baseApi';

export class VendorsRequester {
    async getVendors(): Promise<Vendor[]> {
        const vendors = (await api.get('/vendors')).data.data;
        return vendors;
    }

    async addVendor(vendor: Vendor) {
        await api.post('/vendors', vendor);
    }

    async editVendor(vendor: Vendor) {
        await api.put(`/vendors/${vendor._id}`, vendor);
    }

    async deleteVendor(vendor: Vendor) {
        await api.delete(`/vendors/${vendor._id}`);
    }
}


