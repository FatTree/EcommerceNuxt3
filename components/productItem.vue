<script lang="ts" setup>
import type { ProductModel } from '~/models/dataModel';

type Props = {
    product: ProductModel;
    category: string;
}

const props = withDefaults(defineProps<Props>(), {
    product: () => ({} as ProductModel),
    category: '',
});

const cartStore = useCart();
const { 
    addToCart,
    canAddToCart
} = cartStore;

const discountPrice = computed( () => {
    const price = props.product.price;
    const discount = props.product.discountPercentage;
    return (price - (price * (discount * 0.01))).toFixed(2);
})

</script>
<template>
    <div class="ProductItem">
        <div class="card">
            <div class="card__content">
                <UiKitsRatingStars :rating="product.rating" />
                <h3 class="card__header">
                    <NuxtLink :to="`/${category}/${product.id}`">{{ product.title }}</NuxtLink>
                </h3>
                <div class="card__img">
                    <img :src="product.thumbnail" alt="">
                </div>
                <div v-show="false">
                    <label v-for="tag in product.tags">{{ tag }}</label>
                </div>
                <div v-if="product.discountPercentage">
                    <label class="OPrice">原價: $ {{ product.price }}</label> 
                    <p>特價: $ {{ discountPrice }} <label>({{ product.discountPercentage }}% off)</label></p>
                </div>
                <div v-else>
                    <label>$ {{ product.price }}</label> 
                </div>
                <button 
                    @click="addToCart({...product, name:product.title,  quantity: 1})"
                    :disabled="!canAddToCart({...product, name:product.title, quantity: 1})">
                    加入購物車
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$padding: 1rem;
.ProductItem {
    padding-top: $padding;
    padding-left: $padding;
    
    @include desktop {
        width: calc(33.3% - $padding);
        max-width: 18em;
    }
    @include tablet {
        width: calc(50% - $padding);
    }
    @include mobile {
        width: calc(50% - $padding);
    }
}

.card {
    padding: 1rem;
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);

    &__header {
        margin-top: 0;
        font-size: 20px;
        height: 2.5em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        white-space: normal; 
        @include title-s;

        > a {
            text-decoration: none;
            color: #000;
        }
    }

    &__img {
        > img {
            max-width: 100%;
        }
    }
}

.OPrice {
    text-decoration: line-through;
    font-style: italic;
    color: $white-hover-active;
}
</style>