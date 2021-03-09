import Product from '../../DTO/productDTO';
import ProductCart from '../../DTO/productCartDTO';
import { get } from '../../services/productsService';

interface CartSate {
    items: ProductCart[],
    total: number,
    qty: number
}

export default {
    namespaced: true,
    state(): CartSate {
        return {
            items: [],
            total: 0,
            qty: 0
        };
    },
    mutations: {
        addProductToCart(state: CartSate, payload: Product) {
            const product = payload;
            const productInCartIndex: number = state.items.findIndex( (ci: Product) => ci.id === product.id
            );

            if (productInCartIndex >= 0) {
                state.items[productInCartIndex].qty++;
            } else {
                const newItem: ProductCart = {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    qty: 1,
                };
                state.items.push(newItem);
            }
            state.qty++;
            state.total += product.price;
        },
        removeProductFromCart(state: CartSate, payload: ProductCart) {
            const productInCartIndex = state.items.findIndex(
                (cartItem: ProductCart) => cartItem.id === payload.id
            );
            const prodData = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= prodData.qty;
            state.total -= prodData.price * prodData.qty;
        },
    },
    actions: {
        async addToCart(context: { commit: (arg0: string, arg1: any) => void; }, payload: { id: string; }) {
            const prodId = payload.id;

            const product: { payload: Product | null; error: string | null;} = await get(prodId);
            if (product.error !== null) {
                console.log(product.error);
            } else {
                context.commit('addProductToCart', product.payload);
            };
        },
        removeFromCart(context: { commit: (arg0: string, arg1: any) => void; }, payload: ProductCart) {
            context.commit('removeProductFromCart', payload);
        },
    },
    getters: {
        cartItems(state: CartSate) {
            return state.items;
        },
        cartTotal(state: CartSate) {
            return state.total;
        },
        cartQty(state: CartSate) {
            return state.qty;
        },
    }
}