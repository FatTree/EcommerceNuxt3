export type CategoryList = string[];

export type ProductDetailModel = ProductModel & {
    brand: string;
}

export type ProductModel = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string;
    weight: number;
    dimensions: DimensionsModel;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

export type DimensionsModel = {
    width: number;
    height: number;
    depth: number;
}

export type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export type Meta = {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}
