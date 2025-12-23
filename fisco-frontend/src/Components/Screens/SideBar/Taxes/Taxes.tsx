// /Components/Screens/Taxes/Taxes.tsx
import React from "react";
import "./Taxes.css";
import { Calculator, FileText, AlertTriangle, Calendar } from "lucide-react";

const Taxes = () => {
  const taxItems = [
    {
      title: 'Imposta Sostitutiva',
      description: 'Regime Forfettario 15%',
      period: '2025',
      amount: 750,
      status: 'upcoming',
      dueDate: '30 Giu 2025'
    },
    {
      title: 'Contributi INPS',
      description: 'Gestione Separata',
      period: 'Q1 2025',
      amount: 1250,
      status: 'upcoming',
      dueDate: '16 Feb 2025'
    },
    {
      title: 'IVA Trimestrale',
      description: 'Liquidazione Q4 2024',
      period: 'Q4 2024',
      amount: 890,
      status: 'urgent',
      dueDate: '31 Gen 2025'
    }
  ];

  return (
    <div className="taxes-page">
      <div className="taxes-header">
        <h1>Imposte e Contributi</h1>
        <p className="subtitle">Gestisci pagamenti fiscali e contributi previdenziali</p>
        
        <div className="header-actions">
          <button className="primary-button">
            <FileText className="icon-sm" />
            Genera F24
          </button>
        </div>
      </div>

      <div className="taxes-stats">
        <div className="stat-card">
          <div className="stat-label">Imposte 2025</div>
          <div className="stat-value">€ 2.350</div>
          <div className="stat-description">Stimate in base al fatturato</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pagate YTD</div>
          <div className="stat-value">€ 0</div>
          <div className="stat-description highlight-emerald">Acconti in scadenza</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Da Pagare</div>
          <div className="stat-value">€ 2.890</div>
          <div className="stat-description highlight-amber">Prossime scadenze</div>
        </div>
      </div>

      <div className="upcoming-payments">
        <h2>Prossimi Pagamenti</h2>
        <div className="payments-list">
          {taxItems.map((item, index) => (
            <div 
              key={index}
              className={`payment-item ${item.status === 'urgent' ? 'urgent' : 'upcoming'}`}
            >
              <div className="payment-icon">
                <Calculator className="icon-md" />
              </div>
              <div className="payment-details">
                <div className="payment-header">
                  <h3>{item.title}</h3>
                  {item.status === 'urgent' && (
                    <span className="status-badge urgent">Urgente</span>
                  )}
                </div>
                <p className="payment-description">{item.description}</p>
                <div className="payment-meta">
                  <span className="meta-item">{item.period}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">Scadenza: {item.dueDate}</span>
                </div>
              </div>
              <div className="payment-amount">
                <div className="amount-value">€ {item.amount.toLocaleString()}</div>
                <button className="pay-button">
                  Paga Ora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tax-simulation">
        <div className="simulation-content">
          <Calculator className="icon-lg text-blue-600" />
          <div>
            <h3>Simulazione Imposte 2025</h3>
            <p className="simulation-description">
              In base al tuo fatturato attuale, le tue imposte annuali saranno circa € 2.350.
              Ricorda di pagare gli acconti entro le scadenze.
            </p>
            <button className="outline-button">
              Vedi Dettagli
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxes;