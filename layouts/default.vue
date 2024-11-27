<script setup lang="ts">
import ShoppingCart from "~/components/shoppingCart.vue";
import { useUser } from "~/stores/useUserStore";
// import { useCategory } from "~/stores/useCategoryStore";


</script>

<template>
  <div class="layout">
    <Nav />
    <!-- <ShoppingCart /> -->
    <div class="container">
      <h1>Layout: default</h1>
      <div class="left">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}
.layout {
  background-color: #f4f4f4;
}
.content {
  display: flex;
  justify-content: space-between;
}
</style>
