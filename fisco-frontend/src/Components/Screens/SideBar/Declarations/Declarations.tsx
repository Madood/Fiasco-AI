// /Components/Screens/Declarations/Declarations.tsx
import React from "react";
import "./Declarations.css";
import { FileCheck, Calendar, AlertTriangle, CheckCircle2, Download } from "lucide-react";

const Declarations = () => {
  const declarations = [
    {
      title: 'Modello Redditi PF 2025',
      year: '2024',
      status: 'not_started',
      deadline: '30 Nov 2025',
      description: 'Dichiarazione dei redditi anno 2024'
    },
    {
      title: 'Comunicazione IVA Annuale',
      year: '2024',
      status: 'in_progress',
      deadline: '28 Feb 2025',
      description: 'Comunicazione dati IVA anno 2024'
    },
    {
      title: 'Modello Redditi PF 2024',
      year: '2023',
      status: 'completed',
      deadline: '30 Nov 2024',
      description: 'Dichiarazione dei redditi anno 2023'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge completed">Completata</span>;
      case 'in_progress':
        return <span className="status-badge in-progress">In Corso</span>;
      default:
        return <span className="status-badge not-started">Da Iniziare</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="icon-md text-emerald-600" />;
      case 'in_progress':
        return <Calendar className="icon-md text-blue-600" />;
      default:
        return <AlertTriangle className="icon-md text-slate-400" />;
    }
  };

  return (
    <div className="declarations-page">
      <div className="declarations-header">
        <h1>Dichiarazioni Fiscali</h1>
        <p className="subtitle">Compila e invia le tue dichiarazioni fiscali</p>
        
        <div className="header-actions">
          <button className="primary-button">
            <FileCheck className="icon-sm" />
            Nuova Dichiarazione
          </button>
        </div>
      </div>

      <div className="declarations-stats">
        <div className="stat-card">
          <div className="stat-header">
            <CheckCircle2 className="icon-sm text-emerald-600" />
            <span className="stat-label">Completate</span>
          </div>
          <div className="stat-value">3</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Calendar className="icon-sm text-blue-600" />
            <span className="stat-label">In Corso</span>
          </div>
          <div className="stat-value">1</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <AlertTriangle className="icon-sm text-amber-600" />
            <span className="stat-label">Da Iniziare</span>
          </div>
          <div className="stat-value">1</div>
        </div>
      </div>

      <div className="declarations-list">
        {declarations.map((declaration, index) => (
          <div key={index} className="declaration-item">
            <div className="declaration-icon">
              {getStatusIcon(declaration.status)}
            </div>
            <div className="declaration-content">
              <div className="declaration-header">
                <h3>{declaration.title}</h3>
                {getStatusBadge(declaration.status)}
              </div>
              <p className="declaration-description">{declaration.description}</p>
              <div className="declaration-meta">
                <span>Anno {declaration.year}</span>
                <span className="meta-separator">•</span>
                <span>Scadenza: {declaration.deadline}</span>
              </div>
            </div>
            <div className="declaration-actions">
              {declaration.status === 'completed' ? (
                <button className="outline-button">
                  <Download className="icon-xs" />
                  Scarica
                </button>
              ) : (
                <button className="primary-button">
                  {declaration.status === 'in_progress' ? 'Continua' : 'Inizia'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Declarations;