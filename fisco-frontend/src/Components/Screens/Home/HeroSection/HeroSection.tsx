import React from "react";
import { Sparkles, CheckCheck, ShieldCheck, Star, TrendingUp } from "lucide-react";
import "./heroSection.css";

interface HeroSectionProps {
  onLogin: () => void;
}

export default function HeroSection({ onLogin }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-text">
              <span className="ai-badge">
                <Sparkles className="badge-icon" />
                Gestione fiscale con AI
              </span>
              <h1 className="hero-title">
                Contabilità e fisco semplificati per la tua Partita IVA
              </h1>
              <p className="hero-description">
                La piattaforma completa per freelance e professionisti in
                regime Forfettario e Semplificato. Fatturazione elettronica,
                gestione spese e dichiarazioni fiscali automatizzate con
                assistenza AI.
              </p>
            </div>

            <div className="hero-buttons">
              <button className="primary-cta" onClick={onLogin}>
                Inizia Gratis per 30 Giorni
              </button>
              <button className="secondary-cta">Guarda Demo</button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <CheckCheck className="feature-icon" />
                <span className="feature-text">
                  Conformità fiscale italiana
                </span>
              </div>
              <div className="feature-item">
                <ShieldCheck className="feature-icon" />
                <span className="feature-text">GDPR compliant</span>
              </div>
              <div className="feature-item">
                <Star className="feature-icon" />
                <span className="feature-text">Supporto dedicato</span>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="image-wrapper">
              <img
                src="/Hero.png"
                alt="Professional working"
                className="hero-image"
              />
            </div>
            <div className="image-card">
              <div className="card-content">
                <div className="card-icon">
                  <TrendingUp className="card-icon-svg" />
                </div>
                <div>
                  <div className="card-value">€12.450</div>
                  <div className="card-label">Fatturato 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}