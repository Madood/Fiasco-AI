import React from "react";
import { ShieldCheck, Star } from "lucide-react";
import "./trustSection.css";

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Scelto da migliaia di professionisti
          </h2>
          <p className="section-description">
            La soluzione di fiducia per freelance, consulenti e micro-imprese
            in tutta Italia
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">
              "Finalmente una piattaforma che capisce le esigenze di noi
              freelance italiani. La fatturazione elettronica è semplicissima
              e l'AI mi ha fatto risparmiare ore di lavoro."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar bg-emerald">
                <span className="avatar-text">MC</span>
              </div>
              <div>
                <div className="author-name">Marco Colonna</div>
                <div className="author-role">Designer Freelance</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">
              "Ho chiuso il commercialista. Con FiscoAI gestisco tutto da sola
              in regime forfettario. L'assistente AI risponde meglio del mio
              vecchio commercialista!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar bg-blue">
                <span className="avatar-text">SR</span>
              </div>
              <div>
                <div className="author-name">Sofia Russo</div>
                <div className="author-role">Consulente Marketing</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">
              "Perfetta per il regime semplificato. Dashboard chiarissima,
              sempre aggiornata con le scadenze. Mi ha fatto risparmiare
              migliaia di euro in consulenze."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar bg-purple">
                <span className="avatar-text">LB</span>
              </div>
              <div>
                <div className="author-name">Luca Bianchi</div>
                <div className="author-role">Sviluppatore Web</div>
              </div>
            </div>
          </div>
        </div>

        <div className="certifications">
          <div className="certification-item">
            <ShieldCheck className="certification-icon" />
            <span>Conforme AgE</span>
          </div>
          <div className="certification-item">
            <ShieldCheck className="certification-icon" />
            <span>GDPR Compliant</span>
          </div>
          <div className="certification-item">
            <ShieldCheck className="certification-icon" />
            <span>ISO 27001</span>
          </div>
          <div className="certification-item">
            <ShieldCheck className="certification-icon" />
            <span>SSL/TLS</span>
          </div>
        </div>
      </div>
    </section>
  );
}