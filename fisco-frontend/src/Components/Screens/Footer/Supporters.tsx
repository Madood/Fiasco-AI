import React from "react";
import "./supporters.css";

export default function Supporters() {
  return (
    <div className="footer-support">
      <p className="footer-support-title">Con il supporto di</p>

      <div className="footer-support-grid">
        <div className="support-card">
          <img
            src="/footer/smart.png"
            alt="Smart & Start Italia"
          />
        </div>

        <div className="support-card">
          <img
            src="/footer/invitalia.png"
            alt="Invitalia"
          />
        </div>

        <div className="support-card">
          <img
            src="/footer/mdse.png"
            alt="Ministero dello Sviluppo Economico"
          />
        </div>

        <div className="support-card">
          <img
            src="/footer/mise.png"
            alt="Unione Europea – Fondo Europeo di Sviluppo Regionale"
          />
        </div>

        <div className="support-card">
          <img
            src="/footer/mef.png"
            alt="Ministero dell’Economia e delle Finanze"
          />
        </div>

        <div className="support-card">
          <img
            src="/footer/Devmunus.png"
            alt="DevMundus"
          />
        </div>

    
      </div>
    </div>
  );
}
