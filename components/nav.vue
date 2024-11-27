<script setup lang="ts">
const userStore = useUser();
const { 
  isAuthenticated, 
  userAuth 
} = storeToRefs(userStore);
const { setAuth } = userStore;

const categoryStore = useCategory();
const {
  isCategoryLoading,
  CategoryList
} = storeToRefs(categoryStore);

const {
  getCategoryList
} = categoryStore;

const logout = () => {
  setAuth(null, false);
}

onBeforeMount(async() => {
  await getCategoryList();
  
});
</script>

<template>
  <div class="nav">
    <div class="container">
      <p>isAuthenticated: {{  isAuthenticated }}</p>
      <p v-if="isAuthenticated">Hi~{{ userAuth?.name }}</p>
      <nuxt-link to="/">home</nuxt-link> | 
      <nuxt-link to="/member">member</nuxt-link> | 
      <nuxt-link to="/login">login</nuxt-link> | 
      <nuxt-link to="/purchase">purchase</nuxt-link> | 
      <button @click="logout" :disabled="!isAuthenticated">logout</button>
      <label v-show="isCategoryLoading">isCategoryLoading</label>
      <div v-show="!isCategoryLoading">
        <p>Categories:</p>
        <label v-for="cate in CategoryList" >
          <nuxt-link :to="`/${cate}`">{{ cate }}</nuxt-link> |
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
