import Product from '../../DTO/productDTO';
import { getAll } from '../../services/productsService';

interface ProductsState {
    products: Product[];
    error: string | null;
}

export default {
    namespaced: true,
    state(): ProductsState {
        return {
            products: [],
            error: null
        }
    },
    mutations: {
        loadProducts(state: ProductsState, payload: Product[]) {
            state.products = payload;
        },
        loadError(state: ProductsState, payload: string){
            state.error = payload;
        }
    },
    actions: {
        async loadProducts(context: { commit: (arg0: string, arg1: any) => void; }) {
            const response: { payload: Product[] | null; error: string | null} = await getAll();
            if(response.error){
                context.commit('loadError', response.error);
            } else {
                context.commit('loadProducts', response.payload);
            }
        }
    },
    getters: {
        productsList(state: ProductsState) {
            return state.products;
        },
        error(state: ProductsState) {
            return state.error;
        }
    }
}