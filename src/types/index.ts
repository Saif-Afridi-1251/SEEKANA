export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  colors: ProductVariantColor[];
  sizes: string[];
  materials?: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  odooOrderNumber: string; // e.g. "SO00104"
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  deliveryMethod: string;
  paymentMethod: 'cash_on_delivery' | 'bank_transfer';
  status: 'Quotation' | 'Sales Order' | 'Delivered';
  paymentStatus: 'Pending' | 'Paid';
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minSpend?: number;
  description: string;
}

export interface OdooSettings {
  announcementText: string;
  announcementActive: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  storePhone: string;
  storeEmail: string;
  storeWhatsApp: string;
  storeAddress: string;
  currencySymbol: string;
}

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'categories'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'account'
  | 'order-confirmation'
  | 'privacy-policy'
  | 'terms'
  | 'shipping-policy'
  | 'return-policy';
