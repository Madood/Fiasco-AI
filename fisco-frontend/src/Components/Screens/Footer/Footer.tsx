// // Footer.tsx
// import React from "react";
// import { Receipt } from "lucide-react";
// import "./footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-grid">
//           <div className="footer-brand">
//             <div className="footer-logo">
//               <div className="footer-logo-icon">
//                 <Receipt />
//               </div>
//               <span className="footer-logo-text">FiscoAI</span>
//             </div>
//             <p className="footer-description">
//               La piattaforma di gestione fiscale intelligente per Partita IVA italiana.
//             </p>
//           </div>

//           <div className="footer-column">
//             <h4>Prodotto</h4>
//             <ul className="footer-links">
//               <li><a href="#">Funzionalità</a></li>
//               <li><a href="#">Prezzi</a></li>
//               <li><a href="#">Guide</a></li>
//               <li><a href="#">API</a></li>
//             </ul>
//           </div>

//           <div className="footer-column">
//             <h4>Legale</h4>
//             <ul className="footer-links">
//               <li><a href="#">Privacy Policy</a></li>
//               <li><a href="#">Termini di Servizio</a></li>
//               <li><a href="#">Cookie Policy</a></li>
//               <li><a href="#">GDPR</a></li>
//             </ul>
//           </div>

//           <div className="footer-column">
//             <h4>Supporto</h4>
//             <ul className="footer-links">
//               <li><a href="#">Centro Assistenza</a></li>
//               <li><a href="#">Contattaci</a></li>
//               <li><a href="#">Blog</a></li>
//               <li><a href="#">Community</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p className="copyright">
//             © 2025 FiscoAI. Tutti i diritti riservati. P.IVA 12345678901
//           </p>
//           <div className="social-links">
//             <a href="#" className="social-link">LinkedIn</a>
//             <a href="#" className="social-link">Twitter</a>
//             <a href="#" className="social-link">Facebook</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// Footer.tsx
import React from "react";
import { Receipt } from "lucide-react";
import Supporters from "./Supporters";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Receipt />
              </div>
              <span className="footer-logo-text">FiscoAI</span>
            </div>
            <p className="footer-description">
              La piattaforma di gestione fiscale intelligente per Partita IVA italiana.
            </p>
          </div>

          <div className="footer-column">
            <h4>Prodotto</h4>
            <ul className="footer-links">
              <li><a href="#">Funzionalità</a></li>
              <li><a href="#">Prezzi</a></li>
              <li><a href="#">Guide</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legale</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Termini di Servizio</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Supporto</h4>
            <ul className="footer-links">
              <li><a href="#">Centro Assistenza</a></li>
              <li><a href="#">Contattaci</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
        </div>

       <Supporters />


        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2025 FiscoAI. Tutti i diritti riservati. P.IVA 12345678901
          </p>
          <div className="social-links">
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
