const request = {
    fetchProducts: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    fetchProduct: (slug) => `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
}

export default request;