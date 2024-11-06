// middleware/auth.ts
import { useUser } from "~/stores/useUserStore";
import { useCategory } from "~/stores/useCategoryStore";

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUser();
    const {
        isAuthenticated
    } = storeToRefs(userStore);
    const {
        setAuth
    } = userStore;

    const categoryStore = useCategory()
    const {
        getCategoryList
    } = categoryStore;
    const {
        CategoryList
    } = storeToRefs(categoryStore);

    // skip middleware on server
    if (process.server) {
        console.log('middleware: server');
        
        return
    }
    // skip middleware on client side entirely
    if (process.client) {
        console.log('middleware: client');
        return
    }
    // or only skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        console.log('middleware: or only skip middleware on initial client load');
        return
    }
})
