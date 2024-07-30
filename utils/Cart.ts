export interface CartItem {
    id: string;
    quantity: number;
    product: Product;
    price:number
  }

export interface Cart {
    id: string;
    cartItems: CartItem[];
  }

export interface CartCompatability{
    cart:Cart
    compatibilityIssues: string[]
    compatibilityStatus: boolean
}