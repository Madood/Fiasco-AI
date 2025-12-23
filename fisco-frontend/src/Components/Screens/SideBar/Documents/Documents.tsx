// /Components/Screens/Documents/Documents.tsx
import React from "react";
import "./Documents.css";
import { FileText, Upload, Download, Folder } from "lucide-react";

const Documents = () => {
  const documents = [
    { name: 'Fattura_FT2025004.pdf', category: 'Fatture', date: '15 Gen 2025', size: '245 KB' },
    { name: 'Ricevuta_Bonifico_Studio_Design.pdf', category: 'Ricevute', date: '14 Gen 2025', size: '128 KB' },
    { name: 'Scontrino_Adobe_Gennaio.pdf', category: 'Spese', date: '10 Gen 2025', size: '89 KB' },
    { name: 'F24_Acconto_2024.pdf', category: 'Imposte', date: '05 Gen 2025', size: '156 KB' },
  ];

  return (
    <div className="documents-page">
      <div className="documents-header">
        <h1>Documenti</h1>
        <p className="subtitle">Archivia e gestisci tutti i tuoi documenti fiscali</p>
        
        <div className="header-actions">
          <button className="upload-button">
            <Upload className="icon-sm" />
            Carica Documento
          </button>
        </div>
      </div>

      <div className="documents-stats">
        <div className="stat-card">
          <div className="stat-header">
            <Folder className="icon-sm text-emerald-600" />
            <span className="stat-label">Fatture</span>
          </div>
          <div className="stat-value">87 file</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Folder className="icon-sm text-blue-600" />
            <span className="stat-label">Spese</span>
          </div>
          <div className="stat-value">124 file</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Folder className="icon-sm text-purple-600" />
            <span className="stat-label">Imposte</span>
          </div>
          <div className="stat-value">23 file</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Folder className="icon-sm text-amber-600" />
            <span className="stat-label">Altri</span>
          </div>
          <div className="stat-value">45 file</div>
        </div>
      </div>

      <div className="documents-container">
        <div className="documents-toolbar">
          <input type="text" placeholder="Cerca documenti..." className="search-input" />
          <button className="filter-button">Filtri</button>
        </div>

        <div className="documents-list">
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              <div className="document-icon">
                <FileText className="icon-md text-emerald-600" />
              </div>
              <div className="document-details">
                <div className="document-name">{doc.name}</div>
                <div className="document-meta">
                  <span className="meta-item">{doc.category}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{doc.date}</span>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{doc.size}</span>
                </div>
              </div>
              <div className="document-actions">
                <button className="action-button">
                  <Download className="icon-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;