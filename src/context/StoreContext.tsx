import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  PageRoute, 
  PromoCode, 
  OdooSettings, 
  CustomerInfo 
} from '../types';
import { PRODUCTS, INITIAL_SETTINGS, PROMO_CODES, INITIAL_ORDERS } from '../data/mockData';

interface ToastInfo {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  currentPage: PageRoute;
  selectedProductId: string | null;
  selectedCategoryFilter: string | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentPlacedOrder: Order | null;
  settings: OdooSettings;
  appliedPromo: PromoCode | null;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  isOdooManagerOpen: boolean;
  toasts: ToastInfo[];
  
  // Navigation
  navigateTo: (page: PageRoute, productId?: string, categoryFilter?: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsOdooManagerOpen: (open: boolean) => void;
  
  // Cart Actions
  addToCart: (product: Product, color: string, size: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  discountAmount: number;
  cartTotal: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  
  // Order Actions
  placeOrder: (
    customer: CustomerInfo, 
    deliveryMethod: string, 
    paymentMethod: 'cash_on_delivery' | 'bank_transfer'
  ) => Order;
  reorder: (order: Order) => void;
  
  // Settings Actions
  updateSettings: (newSettings: Partial<OdooSettings>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('seekana_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('seekana_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-6'];
    } catch {
      return ['prod-1', 'prod-6'];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('seekana_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });
  const [currentPlacedOrder, setCurrentPlacedOrder] = useState<Order | null>(null);
  const [settings, setSettings] = useState<OdooSettings>(() => {
    try {
      const saved = localStorage.getItem('seekana_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOdooManagerOpen, setIsOdooManagerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem('seekana_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('seekana_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('seekana_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('seekana_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const navigateTo = (page: PageRoute, productId?: string, categoryFilter?: string | null) => {
    setCurrentPage(page);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    if (categoryFilter !== undefined) {
      setSelectedCategoryFilter(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, color: string, size: string, quantity = 1, openDrawer = true) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${color}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color,
        size,
        quantity,
      };
      setCart((prev) => [...prev, newItem]);
    }

    showToast(`Added "${product.name}" to your cart.`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from wishlist.', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to your wishlist.');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1, true);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Delivery fee logic based on Odoo settings
  const deliveryFee =
    cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0
      ? 0
      : settings.standardShippingFee;

  const discountAmount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try WELCOME10' };
    }
    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Code requires a minimum spend of Rs. ${found.minSpend.toLocaleString()}`,
      };
    }
    setAppliedPromo(found);
    showToast(`Promo "${cleanCode}" applied: ${found.discountPercent}% OFF!`);
    return { success: true, message: `Promo applied: ${found.discountPercent}% OFF` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder = (
    customer: CustomerInfo,
    deliveryMethod: string,
    paymentMethod: 'cash_on_delivery' | 'bank_transfer'
  ) => {
    const orderNumberInt = 100 + orders.length + 1;
    const odooOrderNumber = `SO00${orderNumberInt}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      odooOrderNumber,
      date: new Date().toISOString().split('T')[0],
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      total: cartTotal,
      promoCode: appliedPromo?.code,
      deliveryMethod,
      paymentMethod,
      status: 'Sales Order',
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'Pending' : 'Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentPlacedOrder(newOrder);
    setCart([]);
    setAppliedPromo(null);
    navigateTo('order-confirmation');
    showToast(`Sales Order ${odooOrderNumber} created successfully!`);
    return newOrder;
  };

  const reorder = (order: Order) => {
    order.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.color, item.size, item.quantity, false);
      }
    });
    setIsCartDrawerOpen(true);
    showToast(`Added ${order.items.length} item(s) from order ${order.odooOrderNumber} to cart.`);
  };

  const updateSettings = (newSettings: Partial<OdooSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings updated.');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedCategoryFilter,
        searchQuery,
        cart,
        wishlist,
        orders,
        currentPlacedOrder,
        settings,
        appliedPromo,
        isCartDrawerOpen,
        isSearchOpen,
        isOdooManagerOpen,
        toasts,
        navigateTo,
        setSearchQuery,
        setIsCartDrawerOpen,
        setIsSearchOpen,
        setIsOdooManagerOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        discountAmount,
        cartTotal,
        applyPromoCode,
        removePromoCode,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        placeOrder,
        reorder,
        updateSettings,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
