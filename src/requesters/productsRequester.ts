import Product from '../models/product';
import api from './baseApi';

export class ProductsRequester {
    async getProducts(): Promise<Product[]> {
        const products = (await api.get('/products')).data.data;
        return products.map((d: Product) => d as Product);
    }

    async addProduct(product: Product) {
        await api.post('/products', product);
    }

    async editProduct(product: Product) {
        await api.put(`/products/${product._id}`, product);
    }

    async deleteProduct(product: Product) {
        await api.delete(`/products/${product._id}`);
    }
}


