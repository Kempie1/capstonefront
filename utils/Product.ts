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
interface flatCharacteristics{
  characteristicId: string,
  characteristicName: string,
  valueId: string,
  value: string,
}

export interface flattenProduct{
  id: string,
    name: string,
    imgUrl: string,
    categories: Category[],
    characteristics: flatCharacteristics[],
    price: string,
}

export function flattenProduct(product: Product): flattenProduct {
  let flatProduct: flattenProduct = {
    id: product.id,
    name: product.name,
    imgUrl: product.imgUrl,
    categories: product.categories,
    characteristics: [],
    price: "",
  };
  for (let productCharacteristic of product.productCharacteristics) {
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
