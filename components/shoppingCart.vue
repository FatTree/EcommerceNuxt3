<script setup lang="ts">
import { useCart } from '~/stores/useCartStore';
const cartStore = useCart();

const {
    totalQuantity,
    cart: cartItems,
} = storeToRefs(cartStore);

</script>

<template>
    <div class="shoppingCart">
        <h1>購物車</h1>
        <div v-if="cartItems.length">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <h2>{{ item.name }}</h2>
                <p>數量：{{ item.quantity }}</p>
            </div>
        </div>
        <div v-else>
            <p>購物車內沒有商品。</p>
        </div>
        <p>購物車商品總數：{{ totalQuantity }}</p>
    </div>
</template>

<style scoped>
.shoppingCart {
    border: 1px solid #000;
}
</style>