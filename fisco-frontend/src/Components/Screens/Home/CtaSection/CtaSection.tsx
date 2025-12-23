import React from "react";
import { Zap } from "lucide-react";
import "./ctaSection.css";

interface CtaSectionProps {
  onLogin: () => void;
}

export default function CtaSection({ onLogin }: CtaSectionProps) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Inizia oggi, gratis per 30 giorni</h2>
          <p className="cta-description">
            Nessuna carta di credito richiesta. Cancellazione in qualsiasi
            momento. Supporto in italiano 7 giorni su 7.
          </p>
          <div className="cta-buttons">
            <button className="primary-cta-button" onClick={onLogin}>
              <Zap className="cta-icon" />
              Inizia Gratis Ora
            </button>
            <button className="secondary-cta-button">
              Parla con un Esperto
            </button>
          </div>
          <p className="cta-footer">
            Già 12.000+ professionisti si affidano a FiscoAI
          </p>
        </div>
      </div>
    </section>
  );
}