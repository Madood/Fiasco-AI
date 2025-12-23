import React from "react";
import { ArrowRight } from "lucide-react";
import "./stressReliefSection.css";

export default function StressReliefSection() {
  return (
    <section className="stress-relief-section">
      <div className="stress-relief-wrapper">

        {/* Top link */}
        <div className="stress-top">
          <button className="stress-top-button">
            SCOPRI DI PIÙ <ArrowRight size={18} />
          </button>
        </div>

        {/* Main block */}
        <div className="stress-card">

          {/* Image */}
          <div className="stress-image-container">
            <img
              src="/cta-foto.png"
              alt="Consulente"
              className="stress-image"
            />
          </div>

          {/* Content */}
          <div className="stress-content">
            <h2>
              Gestire la contabilità<br />
              può essere stressante
            </h2>

            <p>TI AIUTIAMO A RENDERE TUTTO PIÙ FACILE</p>

            <button className="stress-main-button">
              FAI IL PRIMO PASSO <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

