import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import LoadingSplash from './components/LoadingSplash';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import ServicesList from './pages/ServicesList';
import ServiceDetail from './pages/ServiceDetail';
import PortfolioFull from './pages/PortfolioFull';
import PortfolioDetail from './pages/PortfolioDetail';
import PricingPage from './pages/PricingPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter>
      <LoadingSplash />
      <CustomCursor />
      <ScrollToTop />
      <ScrollProgress />
      <PageTransition />
      <div className="relative">
        <TopBar />
        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dich-vu" element={<ServicesList />} />
            <Route path="/dich-vu/:slug" element={<ServiceDetail />} />
            <Route path="/tac-pham" element={<PortfolioFull />} />
            <Route path="/tac-pham/:slug" element={<PortfolioDetail />} />
            <Route path="/bang-gia" element={<PricingPage />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </BrowserRouter>
  );
}
