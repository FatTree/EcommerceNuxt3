import useApi from "~/composables/useApi";
import type { CategoryList } from '~/models/dataModel';

const storeName = 'category';
export const useCategory = defineStore(storeName, () => {
    const {
        callApi,
        fetchData: CategoryList,
        isLoading: isCategoryLoading,
    } = useApi();

    const {
        callApi: callCategoryProductListApi,
        fetchData: categoryProductList,
        isLoading: isCategoryProductLoading,
    } = useApi();

    const getCategoryList = async() => {
        if (!CategoryList.value === undefined) return;
        await callApi('https://dummyjson.com/products/category-list', {keepalive: true});
    }

    const getCategoryProductList = async(category: string) => {
        await callCategoryProductListApi(`https://dummyjson.com/products/category/${category}`, {keepalive: true});
    }
    return {
        getCategoryList,
        getCategoryProductList,
        CategoryList,
        isCategoryLoading,
        categoryProductList,
        isCategoryProductLoading
    };
});
