<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { ProductModel } from '~/models/dataModel'
const route = useRoute();

const categoryStore = useCategory();
const cartStore = useCart();
const { 
    addToCart,
    canAddToCart
} = cartStore;

const {
    categoryProductList
} = storeToRefs(categoryStore);
const {
    getCategoryProductList
} = categoryStore;

const category: Ref<string> = ref(route.params.category as string);
const productList: Ref<ProductModel[]> = ref([]);

onBeforeMount(async() => {
    await getCategoryProductList(category.value);
    productList.value = categoryProductList.value.products;
    console.log(productList.value);
    
})

definePageMeta({
    async validate(route: any) {
        const categoryStore = useCategory();

        const {
            CategoryList,
        } = storeToRefs(categoryStore);

        const {
            getCategoryList,
        } = categoryStore;
        
        
        if(!CategoryList.value) {
            await getCategoryList();
        }

        const arr = CategoryList.value;
        return arr.includes(route.params.category);
    }
});


</script>
<template>
    <div class="category">
        <WhereIAm />
        <div class="category__content">
            <div class="filter">
                filter
            </div>
            <div class="productContent">
                <div class="productContent__top">
                    <h3>{{ category }}</h3>
                    <div>價格由低到高</div>
                </div>
                <div class="productContent__list">
                    <ProductItem 
                        v-for="prod in productList"
                        :product="prod"
                        :category="category" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.category {
    &__content {
        display: flex;
        flex-direction: row;
        > .filter {
            flex:1 0 250px;
            max-width: 300px;
        }
        > .productList {
            flex: 1 0 400px;
        }

        @include mobile {
            flex-direction: column;
            > .filter {
                max-width: 100%;
            }
        }
        
    }
}

.filter {
    height: 500px;
    background: palegoldenrod;
}

.productContent {
    width: 100%;
    background-color: pink;
    
    &__top {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    
    &__list {
        display: flex;
        flex-wrap: wrap;
        @include mobile {
            margin-left: -1rem;
        }

    }
}
    
</style>