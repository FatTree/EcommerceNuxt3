<!-- pages/cart.vue -->
<script setup lang="ts">
import { useCart } from '~/stores/useCartStore';
const cartStore = useCart()
const {
    totalQuantity,
    cart: cartItems,
} = storeToRefs(cartStore);

const { 
    increaseQuantity, 
    decreaseQuantity, 
    removeItem
} = cartStore;

</script>
<template>
    <div>
        <h1>購買清單</h1>
        <div v-if="cartItems.length">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <h2>{{ item.name }}</h2>
                <p>數量：{{ item.quantity }}</p>
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">
                    -
                </button>
                <button @click="increaseQuantity(item.id)" :disabled="item.quantity >= item.stock">
                    +
                </button>
                <button @click="removeItem(item.id)">移除</button>
                <p>庫存上限：{{ item.stock }}</p>
            </div>
        </div>
        <div v-else>
            <p>購物車內沒有商品。</p>
        </div>
        <p>購物車商品總數：{{ totalQuantity }}</p>
    </div>
</template>

<style scoped>
.cart-item {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px 0;
}
</style>
