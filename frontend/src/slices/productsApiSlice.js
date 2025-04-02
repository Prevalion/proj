import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword = '', pageNumber = '' }) => ({
                url: PRODUCTS_URL,
                params: { keyword, pageNumber },
            }),
            providesTags: ['Product'],
            //5 seconds
            keepUnusedDataFor: 5,
        }),
        
        
        getProductDetails: builder.query({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),

        // Admin endpoints
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useGetTopProductsQuery,
    useCreateReviewMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice;
