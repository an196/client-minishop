const request = {
    fetchProducts: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    fetchProduct: (slug) => `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
    fetchCategories: `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
    fetchSearchResult: (searchTerm) => `${process.env.NEXT_PUBLIC_BASE_URL}/products/search?p=${searchTerm}`,
}

export default request;