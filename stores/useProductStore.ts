import useApi from "~/composables/useApi";


const storeName = 'product';
export const useProduct = defineStore(storeName, () => {
    const {
        callApi,
        fetchData: productDetail,
        isLoading: isProductLoading,
    } = useApi();

    const getProduct = async(id: string) => {
        await callApi(`https://dummyjson.com/products/${id}`);
    }
    
    return {
        getProduct,
        productDetail,
        isProductLoading
    };
});
