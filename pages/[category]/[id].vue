<script lang="ts" setup>
const route = useRoute();
import { useCart } from '~/stores/useCartStore';
import { useProduct } from '~/stores/useProductStore';
import type { ProductDetailModel } from '~/models/dataModel';

const cartStore = useCart();
const productStore = useProduct();
const { 
    addToCart,
    canAddToCart
} = cartStore;

const {
    getProduct
} = productStore;

const {
    productDetail
} = storeToRefs(productStore);

const id: string = route.params.id as string;

const detail: Ref<ProductDetailModel> = ref({} as ProductDetailModel);
const mainImg: Ref<string> = ref('');
const mainImgFlag: Ref<number> = ref(0);

const quantity: Ref<number> = ref(0);

const discountPrice = computed( () => {
    const price = detail.value.price;
    const discount = detail.value.discountPercentage;
    return (price - (price * (discount * 0.01))).toFixed(2);
})

const switchMainImg = (url: string, index: number) => {
    mainImg.value = url;
    mainImgFlag.value = index;
}

const handelQuantity = (val: number) => {
    quantity.value = val;
}

onBeforeMount( async () => {
    await getProduct(id);
    detail.value = productDetail.value;
    mainImg.value = detail.value.images[0];
});

definePageMeta({
    validate(route: any) {
        return /^\d+$/.test(route.params.id);
    }
});
</script>
<template>
    <div>
        <WhereIAm />
        <div class="top mb-s">
            <div class="picGroup column">
                <div class="picGroup__main">
                    <img class="picGroup__main__img" :src="mainImg" :alt="detail.title">
                </div>
            </div>
            <div class="prodDetail column">
                <p class="prodDetail__brand mb-s">{{ detail.brand }}</p>
                <h2 class="prodDetail__title mb-s">{{ detail.title }}</h2>
                <UiKitsRatingStars :rating="detail.rating" class="mb-s" />
                <p class="prodDetail__price mb-s">$ {{ detail.price }}</p>
                <div v-if="detail.discountPercentage">
                    <label class="OPrice">原價: $ {{ detail.price }}</label> 
                    <p class="prodDetail__price mb-s">特價: $ {{ discountPrice }} <label>({{ detail.discountPercentage }}% off)</label></p>
                </div>
                <div v-else>
                    <label class="prodDetail__price mb-s">$ {{ detail.price }}</label> 
                </div>
                <p class="prodDetail__stock mb-m">stock: {{ detail.stock }}</p>
                <div class="prodDetail__desc">
                    <div class="prodDetail__desc__intro mb-m">
                        <h3 class="mb-s">商品介紹</h3>
                        <p class="paragraph-m">{{ detail.description }}</p>
                    </div>
                    <ul class="prodDetail__desc__dimensions">
                        <li v-for="(value, name, index) in detail.dimensions">{{ name }} : {{ value }}</li>
                    </ul>
                </div>
                <div class="space"></div>
                <div class="prodDetail__btns">
                    <UiKitsSetQuantity :detail="detail" @updateQuantity="handelQuantity" />
                    <button 
                        class="btn_yellow"
                        @click="addToCart({...detail, name:detail.title,  quantity })"
                        :disabled="!canAddToCart({...detail, name:detail.title, quantity })">
                        <svgo-cart-shopping-solid />
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
        <div class="picGroup__sub mb-l">
            <div class="picGroup__sub__img" 
                v-for="(img, index) in detail.images"
                :key="index"
                :class="mainImgFlag === index ? 'focus' : ''"
                @click="switchMainImg(img, index)">
                <img :src="img" width="50" alt="">
            </div>
        </div>
        <div class="bottom">
            <h2 class="bottom__title mb-s">Reviews</h2>
            <div v-for="review in detail.reviews" class="mb-s">
                <UiKitsRatingStars :rating="review.rating" />
                <p>{{ review.rating }}/5 | {{ review.date }}</p>
                <h4>{{ review.reviewerName }}</h4>
                <p>{{ review.comment }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* * {
    border: 1px solid #000 !important;
} */
.top {
    display: flex;
    justify-content: space-between;

    > .picGroup {
        width: 49%;
    }
    > .prodDetail {
        width: 49%;
    }

    @include tablet {
        flex-direction: column;

        .picGroup {
            width: 100%;
        }
        .prodDetail {
            width: 100%;
        }
    }
}

.prodDetail {
    &__brand {
        @include label-m;
    }
    &__title {
        @include title-m;
    }
    &__price {
        @include label-l;
        @include fw-ex-blod;
    }
    &__stock {
        @include label-m;
    }
    &__desc {
        &__intro {
            
        }
    }
}

.picGroup {
    &__main {
        background-color: $white;
        height: 100%;
        border-radius: 1rem;

        &__img {
            height: 100%;
            width: 100%;
            background-size: contain;
            background-position: 50% 50%;
        }
    }

    &__sub {
        display: flex;

        &__img {
            cursor: pointer;
            margin-right: 1rem;
            border: 3px solid $bgc;
            background-color: #fff;

            &.focus {
                border: 3px solid $yellow-normal;
            }
        }
    }
}

.bottom {
    &__title {
        @include title-m;
    }
}

.OPrice {
    text-decoration: line-through;
    font-style: italic;
    color: $white-hover-active;
}
</style>