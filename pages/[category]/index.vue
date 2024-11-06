<script lang="ts" setup>
import { useRoute } from 'vue-router';

definePageMeta({
    async validate(route: any) {
        const categoryStore = useCategory();

        const {
            CategoryList
        } = storeToRefs(categoryStore);

        const {
            getCategoryList
        } = categoryStore;
        await getCategoryList() // 這邊刪掉的話，下面的CategoryList.value會undefined
        console.log(CategoryList.value);
        
        
        const arr = CategoryList.value;
        return arr.includes(route.params.category);
    }
});

const route = useRoute();
const category = ref(route.params.category);

</script>
<template>
    <div>
        <h1>page: Category~~</h1>
        <!-- <p v-show="isLoading">isLoading...</p> -->
        <h1>{{ category }}</h1>
        <nav>
            <NuxtLink :to="`/${category}/1`">product1</NuxtLink> |
            <NuxtLink :to="`/${category}/2`">product2</NuxtLink> |
            <NuxtLink :to="`/${category}/3`">product3</NuxtLink> |
            <NuxtLink :to="`/${category}/4`">product4</NuxtLink>
        </nav>
        <div class="nuxtpage">
            <h3>NuxtPage</h3>
            <NuxtPage class="page" />
        </div>
    </div>
</template>

<style lang="scss">
.nuxtpage {
    width: 10em;
    height: 10em;
    border: 1px solid #000;
}
    
</style>