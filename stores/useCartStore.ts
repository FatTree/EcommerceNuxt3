// composables/useCart.ts

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    stock: number; // 庫存上限
}
const storeName = 'cart';
export const useCart = defineStore(storeName, () => {
    const cart = ref<CartItem[]>([]);

    // 初始化購物車，從 localStorage 中載入
    const loadCart = () => {
        if (process.client) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                cart.value = JSON.parse(storedCart);
            }
        }
    };

    // 將購物車儲存到 localStorage
    const saveCart = () => {
        if (process.client) {
            localStorage.setItem('cart', JSON.stringify(cart.value));
        }
    };

    // 監聽 cart 的變化，並自動儲存到 localStorage
    watch(cart, saveCart, { deep: true });

    // 檢查是否可以加入購物車
    const canAddToCart = (item: CartItem) => {
        const existingItem = cart.value.find((i) => i.id === item.id);
        return !existingItem || existingItem.quantity < item.stock;
    };

    // 加入商品到購物車
    const addToCart = (item: CartItem) => {
        if (!canAddToCart(item)) return; // 若已達庫存上限，則無法加入購物車

        const existingItem = cart.value.find((i) => i.id === item.id);
        if (existingItem) {
            increaseQuantity(existingItem.id);
        } else {
            cart.value.push({ ...item, quantity: 1 });
        }
    };

    // 增加商品數量
    const increaseQuantity = (id: string) => {
        const item = cart.value.find((i) => i.id === id);
        if (item && item.quantity < item.stock) {
            item.quantity++;
        }
    };

    // 減少商品數量，最少為 1
    const decreaseQuantity = (id: string) => {
        const item = cart.value.find((i) => i.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
        }
    };

    // 移除商品
    const removeItem = (id: string) => {
        cart.value = cart.value.filter((item) => item.id !== id);
    };

    // 獲取購物車總商品數
    const totalQuantity = computed(() =>
        cart.value.reduce((total, item) => total + item.quantity, 0)
    );

    loadCart();

    return {
        cart,
        canAddToCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalQuantity,
    };
})
