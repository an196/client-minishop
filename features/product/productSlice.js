import { createSlice } from '@reduxjs/toolkit';

const  filters = [
		{ name: 'increase', stats: true },
		{ name: 'decrease', stats: false },
		{ name: 'newest', stats: false },
		{ name: 'oldest', stats: false },
]

const productSlice = createSlice({
    name: 'product',
    initialState: {filters, products: null},
    reducers: {
        setFilters: (state, action) => {
            state.filters.forEach((filter) => {
                if (action.payload.name === filter.name) {
                    filter.stats = true;
                } else {
                    filter.stats = false;
                }
            });
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        sortProduct: (state, action) => {
            switch (action.payload.name) {
                case 'increase':
                    state.products.sort((a, b) => a.price - b.price);
                    break;
                case 'decrease':
                    state.products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    state.products.sort((a, b) => a.goodsReceipts - b.goodsReceipts);
                    break;
                case 'oldest':
                    state.products.sort((a, b) => b.goodsReceipts - a.goodsReceipts);
                    break;
                default:
                    break;
            }
        },
    
    },
});

export const { setFilters, setProducts, sortProduct} = productSlice.actions;

export default productSlice.reducer;

export const selectCurrentFilters = state => state.product.filters;
export const selectCurrentProducts = state => state.product.products;
