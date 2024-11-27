import type { DimensionsModel, Review } from "./dataModel";

export type CartItem = {
    id: number;
    name: string;
    quantity: number;
    stock: number; // 庫存上限
}

export type ProdctViewModel = {
    title: string;
    rating: number;
    id: number;
    thumbnail: string;
    tags: string[];
    price: number;
    stock: number;
    discountPercentage: number;
}