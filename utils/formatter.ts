import type { ProductDetailModel } from '~/models/dataModel';
import type { CartItem } from '~/models/viewModel';

export const productToCartFormatter = (pdModel: ProductDetailModel) => {
    const cartModel: CartItem = { ...pdModel, name: pdModel.title, quantity: 1};
}