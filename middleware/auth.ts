// middleware/auth.ts
import { useUser } from "~/stores/useUserStore";

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUser();
    const {
        isAuthenticated
    } = storeToRefs(userStore);
    
    if (!isAuthenticated.value) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
})
