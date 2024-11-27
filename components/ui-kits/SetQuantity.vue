<script lang="ts" setup>
import type { ProductDetailModel } from '~/models/dataModel';

type props = {
    detail: ProductDetailModel
}
const Props = withDefaults(defineProps<props>(), {
    detail: () => ({}) as ProductDetailModel,
});

const amount: Ref<number> = ref(1);

const emits = defineEmits(['updateQuantity']);

const sendQuantity = () => {
    emits('updateQuantity', amount.value);
}

const cartStore = useCart();

const { 
    canAddToCart
} = cartStore;



enum AmountAction {
    ADD = 'add', 
    DEC = 'decrease'
}
const setAmount = (action: AmountAction = AmountAction.ADD) => {
    switch (action) {
        case AmountAction.ADD:
            amount.value += 1;
            sendQuantity();
            break;
    
        case AmountAction.DEC:
            if(amount.value === 1) break;
            amount.value -= 1;
            sendQuantity();
        default:
            
            break;
    }
}

</script>

<template>
    <div class="setQuantity">
        <div class="quentityInput">
            數量
        </div>
        <div class="quantity flex">
            <button class="quantity__btn" @click="setAmount(AmountAction.DEC)">
                <svgo-minus-solid />
            </button>
            <div class="quantity__amount">{{ amount }}</div>
            <button class="quantity__btn" @click="setAmount(AmountAction.ADD)" :disabled="!canAddToCart({...detail, name:detail.title,  quantity: amount})">
                <svgo-plus-solid />
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.setQuantity {
    display: inline-block;
    border: 1px solid $white-hover-active !important;
    border-radius: .5rem;

    > .quentityInput {
        color: $white-hover-active;
        margin-top: -9px;
        margin-left: .5rem;
        font-size: 12px;
        background-color: $bgc;
        width: 3em;
        text-align: center;
    }
}
.quantity {
    padding: 0.3rem 0.8rem 0.5rem;

    &__btn {
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        cursor: pointer;

        &:hover {
            background-color: $white-hover;
        }
    }

    &__amount {
        padding: 0 1rem;
        line-height: 2rem;
        width: 1.5em;
        text-align: center;
    }
}
</style>