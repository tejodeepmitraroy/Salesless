
import React from 'react';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import TrendingProducts from '@/components/TrendingProducts';
import VendorShowcase from '@/components/VendorShowcase';
import PromoSection from '@/components/PromoSection';
import DealsSection from '@/components/DealsSection';
import FeaturesBanner from '@/components/FeaturesBanner';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="content-container">
        <Hero />
        <FeaturedCategories />
        <TrendingProducts />
        <PromoSection />
        <VendorShowcase />
        <DealsSection />
        <FeaturesBanner />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
