import React from "react";
import { CheckCheck } from "lucide-react";
import "./featuresSection.css";

export default function FeaturesSection() {
  return (
    <section id="funzionalità" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tutto quello che ti serve per gestire la tua Partita IVA
          </h2>
          <p className="section-description">
            Una piattaforma completa che si adatta al tuo regime fiscale e
            semplifica ogni aspetto della gestione contabile
          </p>
        </div>

        <div className="features-grid">

          {/* 1 */}
          <div className="feature-card">
            <img
              src="/featureSection/first.png"
              alt="Fatturazione elettronica"
              className="feature-image"
            />
            <h3 className="feature-title">Fatturazione Elettronica</h3>
            <p className="feature-description">
              Crea e invia fatture XML conformi allo SdI in pochi click.
              Integrazione diretta con l'Agenzia delle Entrate.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Template personalizzabili</li>
              <li><CheckCheck className="list-icon" /> Invio automatico via SdI</li>
              <li><CheckCheck className="list-icon" /> Tracking stato fatture</li>
            </ul>
          </div>

          {/* 2 */}
          <div className="feature-card">
            <img
              src="/featureSection/second.png"
              alt="Assistente AI"
              className="feature-image"
            />
            <h3 className="feature-title">Assistente AI</h3>
            <p className="feature-description">
              Risposte immediate su fisco, deduzioni e scadenze con supporto AI.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Consulenza fiscale 24/7</li>
              <li><CheckCheck className="list-icon" /> Categorizzazione automatica</li>
              <li><CheckCheck className="list-icon" /> Alert personalizzati</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="feature-card">
            <img
              src="/featureSection/third.png"
              alt="Gestione spese"
              className="feature-image"
            />
            <h3 className="feature-title">Gestione Spese</h3>
            <p className="feature-description">
              Traccia le spese deducibili e massimizza le detrazioni fiscali.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Upload da mobile</li>
              <li><CheckCheck className="list-icon" /> OCR automatico</li>
              <li><CheckCheck className="list-icon" /> Calcolo deducibilità</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="feature-card">
            <img
              src="/featureSection/fourth.png"
              alt="Dichiarazioni fiscali"
              className="feature-image"
            />
            <h3 className="feature-title">Dichiarazioni Fiscali</h3>
            <p className="feature-description">
              Compilazione automatica di Modello Redditi, F24 e IVA.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Redditi PF pre-compilato</li>
              <li><CheckCheck className="list-icon" /> Calcolo imposte automatico</li>
              <li><CheckCheck className="list-icon" /> Invio telematico</li>
            </ul>
          </div>

          {/* 5 */}
          <div className="feature-card">
            <img
              src="/featureSection/fifth.png"
              alt="Dashboard e report"
              className="feature-image"
            />
            <h3 className="feature-title">Dashboard & Report</h3>
            <p className="feature-description">
              Controllo in tempo reale di fatturato, tasse e flussi di cassa.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Situazione fiscale real-time</li>
              <li><CheckCheck className="list-icon" /> Grafici e analytics</li>
              <li><CheckCheck className="list-icon" /> Export per commercialista</li>
            </ul>
          </div>

          {/* 6 */}
          <div className="feature-card">
            <img
              src="/featureSection/sixth.png"
              alt="Sicurezza e conformità"
              className="feature-image"
            />
            <h3 className="feature-title">Conformità & Sicurezza</h3>
            <p className="feature-description">
              Dati protetti e sistema sempre conforme alle normative italiane.
            </p>
            <ul className="feature-list">
              <li><CheckCheck className="list-icon" /> Aggiornamenti normativi</li>
              <li><CheckCheck className="list-icon" /> Backup automatico</li>
              <li><CheckCheck className="list-icon" /> Crittografia end-to-end</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
