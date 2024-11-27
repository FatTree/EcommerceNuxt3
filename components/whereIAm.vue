<script lang="ts" setup>
type Props = {
    
}

const props = withDefaults(defineProps<Props>(), {
});
</script>
<template>
    <div>
        <label for=""><nuxt-link to="/">首頁</nuxt-link></label>
        <label for=""> -> <nuxt-link to="/">首頁</nuxt-link></label>
    </div>
</template>
<style>
</style>