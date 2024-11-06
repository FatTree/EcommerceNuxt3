<script lang="ts" setup>
const route = useRoute();

import { useCart } from '~/stores/useCartStore';
const cartStore = useCart()
const { 
    addToCart,
    canAddToCart
} = cartStore;

const products = [
    { id: '1', name: '產品 A', stock: 5 },
    { id: '2', name: '產品 B', stock: 3 },
    { id: '3', name: '產品 C', stock: 10 },
];

definePageMeta({
    validate(route: any) {
        return /^\d+$/.test(route.params.id);
    }
});
</script>
<template>
    <div>
        <h1>/{{ route.params.category }}/{{ route.params.id }}</h1>
        <div>
            <h1>產品列表</h1>
            <div v-for="product in products" :key="product.id">
            <h2>{{ product.name }}</h2>
            <p>stock: {{ product.stock }}</p>
            <button 
                @click="addToCart({...product, quantity: 1})"
                :disabled="!canAddToCart({...product, quantity: 1})">
                加入購物車
            </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    
</style>