export interface Category {
  id: string;
  name: string;
}
export interface Characteristic {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  name: string;
  imgUrl: string;
  categories: Category[];
  productCharacteristics: ProductCharacteristic[];
}
export interface ProductCharacteristic {
  id: string;
  value: string;
  characteristic: Characteristic;
}
interface flatCharacteristics {
  characteristicId: string;
  characteristicName: string;
  valueId: string;
  value: string;
}

export interface FlattenProduct {
  id: string;
  name: string;
  imgUrl: string;
  categories: Category[];
  characteristics: flatCharacteristics[];
  price: string;
}
export interface getProductResponse {
  products: FlattenProduct[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function flattenProduct(product: Product): FlattenProduct {
  const flatProduct: FlattenProduct = {
    id: product.id,
    name: product.name,
    imgUrl: product.imgUrl,
    categories: product.categories,
    characteristics: [],
    price: "",
  };
  for (const productCharacteristic of product.productCharacteristics) {
    if (productCharacteristic.characteristic.name == "price") {
      flatProduct.price = productCharacteristic.value;
    } else {
      flatProduct.characteristics.push({
        characteristicId: productCharacteristic.characteristic.id,
        characteristicName: productCharacteristic.characteristic.name,
        valueId: productCharacteristic.id,
        value: productCharacteristic.value,
      });
    }
  }
  return flatProduct;
}
