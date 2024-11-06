<script lang="ts" setup>
import { useUser } from "~/stores/useUserStore";

const router = useRouter();
const route = useRoute();
const userStore = useUser()

const name: Ref<string> = ref('');
const email: Ref<string> = ref('');

const { setAuth } = userStore;
const login = () => {
    setAuth({name: name.value, email: email.value}, true);
    const redirectPath: string = route.query.redirect as string || '/';
    router.push(redirectPath);
}

</script>
<template>
    <div>
        <h1>login</h1>
        <input type="text" placeholder="name" v-model="name"> <br>
        <input type="text" placeholder="email" v-model="email"> <br>
        <button @click="login">login</button>
    </div>
</template>

<style lang="scss">
    
</style>