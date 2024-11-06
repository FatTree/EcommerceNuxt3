import useApi from "~/composables/useApi";

const storeName = 'category';
export const useCategory = defineStore(storeName, () => {
    const {
        callApi,
        fetchData: CategoryList,
        isLoading: isCategoryLoading,
    } = useApi();

    const getCategoryList = async() => {
        await callApi('https://dummyjson.com/products/category-list', {keepalive: true});
    }

    return {
        getCategoryList,
        CategoryList,
        isCategoryLoading
    };
});
