import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { OdooManagerModal } from './components/OdooManagerModal';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { Settings, ExternalLink, Github } from 'lucide-react';

const StoreContent: React.FC = () => {
  const { currentPage, setIsOdooManagerOpen, orders } = useStore();
  const [isGitHubModalOpen, setIsGitHubModalOpen] = React.useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <CustomerPortalPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'shipping-policy':
        return <ShippingPolicyPage />;
      case 'return-policy':
        return <ReturnPolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717] selection:bg-[#111111] selection:text-white">
      {/* Discreet Odoo Consultant Mode Bar (Top thin bar) */}
      <div className="bg-[#1f1924] text-[#cfcbd4] text-[11px] py-1 px-4 flex items-center justify-between border-b border-black/20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-300">
            SEEKANA · Odoo Website & eCommerce Architecture
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-neutral-400 hidden md:inline">
            Active Orders: <strong className="text-white font-mono">{orders.length}</strong>
          </span>
          <button
            onClick={() => setIsGitHubModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#24292F] hover:bg-[#32383f] text-white px-2 py-0.5 rounded text-[10px] font-semibold transition-colors border border-neutral-700 shadow-xs"
            title="Deploy to GitHub Pages"
          >
            <Github className="w-3 h-3 text-white" />
            <span>Deploy to GitHub Pages</span>
          </button>
          <button
            onClick={() => setIsOdooManagerOpen(true)}
            className="flex items-center gap-1.5 bg-[#714B67] hover:bg-[#85587a] text-white px-2 py-0.5 rounded text-[10px] font-semibold transition-colors shadow-xs"
          >
            <Settings className="w-3 h-3" />
            <span>Odoo Store Manager</span>
          </button>
        </div>
      </div>

      {/* Main Header with Announcement Bar */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating Non-Intrusive WhatsApp Concierge */}
      <WhatsAppButton />

      {/* Odoo Live Management Modal */}
      <OdooManagerModal />

      {/* GitHub Pages Integration Modal */}
      <GitHubPagesModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
