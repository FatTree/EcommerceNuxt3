import { defineStore } from 'pinia';

const storeName = 'user';
export const useUser = defineStore(storeName, () => {
    type UserModel = {
        name: string;
        email: string;
    }

    const isAuthenticated: Ref<boolean> = ref(false);
    const userAuth: Ref<UserModel | null> = ref(null);

    const setAuth = (user: UserModel | null, val?: boolean) => {
        if (val) {
            isAuthenticated.value = val;
            userAuth.value = user;
            return;
        }
        isAuthenticated.value = !isAuthenticated.value;
    }
    return {
        isAuthenticated,
        userAuth,
        setAuth
    }
})