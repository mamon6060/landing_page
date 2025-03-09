import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to add an item to the carts
    addToCart: builder.mutation({
      query: ({ params }) => ({
        url: `/carts`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["carts"],
    }),

    getCarts: builder.query({
      query: () => ({
        url: `/carts`,
        method: "GET",
      }),
      providesTags: ["carts"],
    }),

    // updateSingleCart: builder.mutation({
    //   query: ({
    //     id,
    //     increment = false,
    //     decrement = false,
    //     update = false,
    //     params = {},
    //   }) => ({
    //     url: `/carts/${id}?increment=${increment}&decrement=${decrement}&update=${update}`,
    //     method: "PUT",
    //     body: params,
    //   }),
    //   invalidatesTags: ["carts"],
    // }),

    deleteSingleCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartsQuery,
  useDeleteSingleCartMutation,
} = cartApi;
