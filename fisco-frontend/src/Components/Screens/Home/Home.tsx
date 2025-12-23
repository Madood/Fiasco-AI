import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { Receipt, Menu, X } from "lucide-react";
import Footer from "../Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import TrustSection from "./TrustSection/TrustSection";
import CtaSection from "./CtaSection/CtaSection";
import StressReliefSection from "./StressReliefSection/StressReliefSection";

import "./home.css";

export default function Homepage() { // Remove onLogin prop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation handlers
  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon">
                <Receipt className="logo-icon-svg" />
              </div>
              <span className="logo-text">FiscoAI</span>
            </div>
            <nav className="desktop-nav">
              <a href="#funzionalità" className="nav-link">
                Funzionalità
              </a>
              <a href="#prezzi" className="nav-link">
                Prezzi
              </a>
              <a href="#chi-siamo" className="nav-link">
                Chi Siamo
              </a>
              <button className="ghost-button" onClick={handleLoginNavigation}>
                Accedi
              </button>
              <button className="cta-button" onClick={handleLoginNavigation}>
                Inizia Gratis
              </button>
            </nav>
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="menu-icon" />
              ) : (
                <Menu className="menu-icon" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`mobile-nav-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-dropdown-content">
              <nav className="mobile-nav">
                <a href="#funzionalità" className="mobile-nav-link" onClick={handleNavClick}>
                  <span className="mobile-nav-link-text">Funzionalità</span>
                  <div className="mobile-nav-link-underline"></div>
                </a>
                <a href="#prezzi" className="mobile-nav-link" onClick={handleNavClick}>
                  <span className="mobile-nav-link-text">Prezzi</span>
                  <div className="mobile-nav-link-underline"></div>
                </a>
                <a href="#chi-siamo" className="mobile-nav-link" onClick={handleNavClick}>
                  <span className="mobile-nav-link-text">Chi Siamo</span>
                  <div className="mobile-nav-link-underline"></div>
                </a>
              </nav>

              <div className="mobile-nav-actions">
                <button className="mobile-nav-button ghost" onClick={() => {
                  handleNavClick();
                  handleLoginNavigation();
                }}>
                  Accedi
                </button>
                <button className="mobile-nav-button cta" onClick={() => {
                  handleNavClick();
                  handleLoginNavigation();
                }}>
                  Inizia Gratis
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onLogin={handleLoginNavigation} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stress Relief Section */}
      <StressReliefSection />

      {/* Trust Section */}
      <TrustSection />

      {/* CTA Section */}
      <CtaSection onLogin={handleLoginNavigation} />

      {/* Footer */}
      <Footer />
    </div>
  );
}