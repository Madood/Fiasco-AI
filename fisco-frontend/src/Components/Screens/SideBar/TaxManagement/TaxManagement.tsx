import React from 'react';
import { useProfile } from "../../Context/ProfileContext";
import { 
  Percent,
  FileSpreadsheet,
  Building,
  Users,
  Home,
  Plus,
  Download,
  Upload,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  Euro,
  Briefcase
} from "lucide-react";
import "./TaxManagement.css";

// Helper function to get badge classes
const getBadgeClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    emerald: 'badge-emerald',
    blue: 'badge-blue',
    purple: 'badge-purple',
    amber: 'badge-amber'
  };
  return colorMap[color] || 'badge-blue';
};

// Helper function to get background classes
const getBgClasses = (color: string, intensity: string = '100') => {
  const colorMap: Record<string, Record<string, string>> = {
    emerald: {
      '100': 'bg-emerald-100',
      '50': 'bg-emerald-50',
      '600': 'bg-emerald-600'
    },
    blue: {
      '100': 'bg-blue-100',
      '50': 'bg-blue-50',
      '600': 'bg-blue-600'
    },
    purple: {
      '100': 'bg-purple-100',
      '50': 'bg-purple-50',
      '600': 'bg-purple-600'
    },
    amber: {
      '100': 'bg-amber-100',
      '50': 'bg-amber-50',
      '600': 'bg-amber-600'
    }
  };
  return colorMap[color]?.[intensity] || '';
};

// Helper function to get text classes
const getTextClasses = (color: string, intensity: string = '600') => {
  const colorMap: Record<string, Record<string, string>> = {
    emerald: {
      '600': 'text-emerald-600',
      '700': 'text-emerald-700',
      '900': 'text-emerald-900'
    },
    blue: {
      '600': 'text-blue-600',
      '700': 'text-blue-700',
      '900': 'text-blue-900'
    },
    purple: {
      '600': 'text-purple-600',
      '700': 'text-purple-700',
      '900': 'text-purple-900'
    },
    amber: {
      '600': 'text-amber-600',
      '700': 'text-amber-700',
      '900': 'text-amber-900'
    }
  };
  return colorMap[color]?.[intensity] || '';
};

// Helper function to get border classes
const getBorderClasses = (color: string, intensity: string = '200') => {
  const colorMap: Record<string, Record<string, string>> = {
    emerald: {
      '200': 'border-emerald-200',
      '300': 'border-emerald-300'
    },
    blue: {
      '200': 'border-blue-200',
      '300': 'border-blue-300'
    },
    purple: {
      '200': 'border-purple-200',
      '300': 'border-purple-300'
    },
    amber: {
      '200': 'border-amber-200',
      '300': 'border-amber-300'
    }
  };
  return colorMap[color]?.[intensity] || '';
};

// VAT Management Page (for Semplificato only)
export function VAT() {
  const { getProfile } = useProfile();
  const profile = getProfile();
  
  return (
    <div className="tax-management-container">
      <div className="tax-header">
        <div>
          <h2>Gestione IVA</h2>
          <p className="tax-subtitle">
            Liquidazioni periodiche, registri IVA e comunicazioni
          </p>
        </div>
        <div className="tax-actions">
          <button className="tax-button tax-button-outline">
            <Download className="tax-button-icon" />
            Esporta
          </button>
          <button className="tax-button tax-button-primary">
            <Plus className="tax-button-icon" />
            Nuova Liquidazione
          </button>
        </div>
      </div>

      {/* Alert */}
      <div className="tax-alert tax-alert-blue">
        <div className="tax-alert-content">
          <AlertCircle className="tax-alert-icon" />
          <div className="tax-alert-text">
            <div className="tax-alert-title">Liquidazione IVA Q4 2024</div>
            <p className="tax-alert-description">
              Scadenza 16 febbraio 2025. IVA a debito: € 2.340
            </p>
          </div>
          <button className="tax-button tax-button-blue tax-button-sm">
            Genera F24
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="tax-stats-grid">
        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('emerald')}`}>
              <TrendingUp className={getTextClasses('emerald')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('emerald')}`}>
              2025
            </span>
          </div>
          <div className="tax-stat-label">IVA a Debito</div>
          <div className="tax-stat-value">€ 8.450</div>
          <div className="tax-stat-subtitle">Anno corrente</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('blue')}`}>
              <Percent className={getTextClasses('blue')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('blue')}`}>
              2025
            </span>
          </div>
          <div className="tax-stat-label">IVA a Credito</div>
          <div className="tax-stat-value">€ 3.210</div>
          <div className="tax-stat-subtitle">Anno corrente</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('purple')}`}>
              <Euro className={getTextClasses('purple')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('purple')}`}>
              Netto
            </span>
          </div>
          <div className="tax-stat-label">Saldo IVA</div>
          <div className="tax-stat-value">€ 5.240</div>
          <div className="tax-stat-subtitle">Da versare</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('amber')}`}>
              <Calendar className={getTextClasses('amber')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('amber')}`}>
              Q1
            </span>
          </div>
          <div className="tax-stat-label">Prossima Scadenza</div>
          <div className="tax-stat-value">16 Feb 2025</div>
          <div className="tax-stat-subtitle">Liquidazione trimestrale</div>
        </div>
      </div>

      {/* Liquidations Table */}
      <div className="tax-card">
        <h3 className="tax-card-title">Liquidazioni IVA</h3>
        <div className="tax-list">
          {[
            { period: 'Q4 2024', date: '16 Feb 2025', debit: '€ 2.340', credit: '€ 890', balance: '€ 1.450', status: 'pending' },
            { period: 'Q3 2024', date: '16 Nov 2024', debit: '€ 2.120', credit: '€ 1.100', balance: '€ 1.020', status: 'paid' },
            { period: 'Q2 2024', date: '16 Ago 2024', debit: '€ 1.980', credit: '€ 750', balance: '€ 1.230', status: 'paid' },
          ].map((item, index) => (
            <div 
              key={index}
              className="tax-list-item"
            >
              <div className="tax-list-grid">
                <div className="tax-list-field">
                  <div className="tax-list-label">Periodo</div>
                  <div className="tax-list-value">{item.period}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Scadenza</div>
                  <div className="tax-list-value">{item.date}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">IVA Debito</div>
                  <div className="tax-list-value">{item.debit}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">IVA Credito</div>
                  <div className="tax-list-value">{item.credit}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Saldo</div>
                  <div className="tax-list-value">{item.balance}</div>
                </div>
              </div>
              <span className={`tax-badge ${item.status === 'paid' ? getBadgeClasses('emerald') : getBadgeClasses('amber')}`}>
                {item.status === 'paid' ? 'Pagato' : 'Da Pagare'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Withholding Tax Page (for Semplificato only)
export function Withholding() {
  return (
    <div className="tax-management-container">
      <div className="tax-header">
        <div>
          <h2>Ritenute d'Acconto</h2>
          <p className="tax-subtitle">
            Gestione ritenute subite e certificate di ritenuta
          </p>
        </div>
        <div className="tax-actions">
          <button className="tax-button tax-button-outline">
            <Upload className="tax-button-icon" />
            Carica CU
          </button>
          <button className="tax-button tax-button-primary">
            <Plus className="tax-button-icon" />
            Nuova Ritenuta
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="tax-stats-grid">
        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('blue')}`}>
              <FileSpreadsheet className={getTextClasses('blue')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('blue')}`}>
              2025
            </span>
          </div>
          <div className="tax-stat-label">Ritenute Subite</div>
          <div className="tax-stat-value">€ 6.340</div>
          <div className="tax-stat-subtitle">Anno corrente</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('emerald')}`}>
              <CheckCircle2 className={getTextClasses('emerald')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('emerald')}`}>
              Credito
            </span>
          </div>
          <div className="tax-stat-label">Recuperabile</div>
          <div className="tax-stat-value">€ 6.340</div>
          <div className="tax-stat-subtitle">In dichiarazione</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('purple')}`}>
              <FileText className={getTextClasses('purple')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('purple')}`}>
              28
            </span>
          </div>
          <div className="tax-stat-label">Certificazioni</div>
          <div className="tax-stat-value">28 documenti</div>
          <div className="tax-stat-subtitle">Totali ricevute</div>
        </div>
      </div>

      <div className="tax-card">
        <h3 className="tax-card-title">Ritenute Recenti</h3>
        <div className="tax-list">
          {[
            { client: 'Studio Design SRL', date: '15 Gen 2025', amount: '€ 1.500', withholding: '€ 300', status: 'certified' },
            { client: 'TechFlow SpA', date: '12 Gen 2025', amount: '€ 2.200', withholding: '€ 440', status: 'certified' },
            { client: 'Marketing Pro', date: '08 Gen 2025', amount: '€ 850', withholding: '€ 170', status: 'pending' },
          ].map((item, index) => (
            <div 
              key={index}
              className="tax-list-item"
            >
              <div className="tax-list-grid">
                <div className="tax-list-field">
                  <div className="tax-list-label">Cliente</div>
                  <div className="tax-list-value">{item.client}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Data</div>
                  <div className="tax-list-value">{item.date}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Imponibile</div>
                  <div className="tax-list-value">{item.amount}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Ritenuta 20%</div>
                  <div className="tax-list-value">{item.withholding}</div>
                </div>
              </div>
              <span className={`tax-badge ${item.status === 'certified' ? getBadgeClasses('emerald') : getBadgeClasses('amber')}`}>
                {item.status === 'certified' ? 'Certificata' : 'In Attesa'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fixed Assets Page (for Semplificato only)
export function FixedAssets() {
  return (
    <div className="tax-management-container">
      <div className="tax-header">
        <div>
          <h2>Gestione Cespiti</h2>
          <p className="tax-subtitle">
            Registro cespiti ammortizzabili e calcolo ammortamenti
          </p>
        </div>
        <div className="tax-actions">
          <button className="tax-button tax-button-outline">
            <Download className="tax-button-icon" />
            Registro Cespiti
          </button>
          <button className="tax-button tax-button-primary">
            <Plus className="tax-button-icon" />
            Nuovo Cespite
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="tax-stats-grid">
        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('blue')}`}>
              <Building className={getTextClasses('blue')} />
            </div>
          </div>
          <div className="tax-stat-label">Valore Totale</div>
          <div className="tax-stat-value">€ 45.600</div>
          <div className="tax-stat-subtitle">Costo storico</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('emerald')}`}>
              <TrendingUp className={getTextClasses('emerald')} />
            </div>
          </div>
          <div className="tax-stat-label">Valore Residuo</div>
          <div className="tax-stat-value">€ 32.150</div>
          <div className="tax-stat-subtitle">Dopo ammortamenti</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('purple')}`}>
              <Percent className={getTextClasses('purple')} />
            </div>
          </div>
          <div className="tax-stat-label">Ammortamento 2025</div>
          <div className="tax-stat-value">€ 6.840</div>
          <div className="tax-stat-subtitle">Anno corrente</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('amber')}`}>
              <FileText className={getTextClasses('amber')} />
            </div>
          </div>
          <div className="tax-stat-label">Cespiti Attivi</div>
          <div className="tax-stat-value">12 beni</div>
          <div className="tax-stat-subtitle">In ammortamento</div>
        </div>
      </div>

      <div className="tax-card">
        <h3 className="tax-card-title">Registro Cespiti</h3>
        <div className="tax-list">
          {[
            { name: 'Computer Dell XPS', category: 'Macchine ufficio', date: '15 Gen 2023', cost: '€ 1.500', rate: '20%', residual: '€ 900' },
            { name: 'Arredamento Ufficio', category: 'Mobili', date: '10 Mar 2022', cost: '€ 8.500', rate: '12%', residual: '€ 5.440' },
            { name: 'Server HP', category: 'Hardware', date: '05 Giu 2021', cost: '€ 3.200', rate: '20%', residual: '€ 1.024' },
          ].map((item, index) => (
            <div 
              key={index}
              className="tax-list-item"
            >
              <div className="tax-list-grid">
                <div className="tax-list-field tax-list-field-wide">
                  <div className="tax-list-label">Descrizione</div>
                  <div className="tax-list-value">{item.name}</div>
                  <div className="tax-list-description">{item.category}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Data Acquisto</div>
                  <div className="tax-list-value">{item.date}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Costo</div>
                  <div className="tax-list-value">{item.cost}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Aliquota</div>
                  <div className="tax-list-value">{item.rate}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Valore Residuo</div>
                  <div className="tax-list-value">{item.residual}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Social Security Page (for all profiles)
export function SocialSecurity() {
  const { getProfile } = useProfile();
  const profile = getProfile();
  
  // Type-safe check for professional funds
  const hasProfessionalFunds = () => {
    if (!profile) return false;
    
    // Check if profile has features property
    const profileAny = profile as any;
    
    // Option 1: Check if features exist
    if (profileAny.features?.socialSecurity?.professionalFunds !== undefined) {
      return profileAny.features.socialSecurity.professionalFunds;
    }
    
    // Option 2: Check profile name for keywords
    if (profileAny.name && typeof profileAny.name === 'string') {
      const name = profileAny.name.toLowerCase();
      return name.includes('professionista') || 
             name.includes('commercialista') || 
             name.includes('consulente');
    }
    
    // Option 3: Check profile ID if it's a string
    if (profileAny.id && typeof profileAny.id === 'string') {
      const id = profileAny.id.toLowerCase();
      return id.includes('professionista') || 
             id.includes('commercialista') || 
             id.includes('consulente');
    }
    
    return false;
  };
  
  const professionalFunds = hasProfessionalFunds();
  
  return (
    <div className="tax-management-container">
      <div className="tax-header">
        <div>
          <h2>Previdenza e Contributi</h2>
          <p className="tax-subtitle">
            Gestione INPS{professionalFunds ? ', casse professionali' : ''} e contributi obbligatori
          </p>
        </div>
        <button className="tax-button tax-button-primary">
          <Plus className="tax-button-icon" />
          Calcola Contributi
        </button>
      </div>

      {/* Stats */}
      <div className="tax-stats-grid">
        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('blue')}`}>
              <Users className={getTextClasses('blue')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('blue')}`}>
              INPS
            </span>
          </div>
          <div className="tax-stat-label">Contributi INPS 2025</div>
          <div className="tax-stat-value">€ 4.800</div>
          <div className="tax-stat-subtitle">Gestione separata</div>
        </div>

        {professionalFunds && (
          <div className="tax-stat-card">
            <div className="tax-stat-header">
              <div className={`tax-stat-icon ${getBgClasses('purple')}`}>
                <Briefcase className={getTextClasses('purple')} />
              </div>
              <span className={`tax-badge ${getBadgeClasses('purple')}`}>
                Cassa
              </span>
            </div>
            <div className="tax-stat-label">Cassa Professionale</div>
            <div className="tax-stat-value">€ 2.400</div>
            <div className="tax-stat-subtitle">Contributi obbligatori</div>
          </div>
        )}

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('emerald')}`}>
              <Calendar className={getTextClasses('emerald')} />
            </div>
            <span className={`tax-badge ${getBadgeClasses('emerald')}`}>
              Q1
            </span>
          </div>
          <div className="tax-stat-label">Prossima Scadenza</div>
          <div className="tax-stat-value">16 Feb 2025</div>
          <div className="tax-stat-subtitle">Acconto trimestrale</div>
        </div>
      </div>

      <div className="tax-card">
        <h3 className="tax-card-title">Scadenze Contributive</h3>
        <div className="tax-list">
          {[
            { type: 'INPS - Acconto Q1', date: '16 Feb 2025', amount: '€ 1.200', status: 'pending' },
            { type: 'INPS - Saldo 2024', date: '30 Giu 2025', amount: '€ 4.800', status: 'upcoming' },
            ...(professionalFunds ? [
              { type: 'Cassa Professionale', date: '31 Lug 2025', amount: '€ 2.400', status: 'upcoming' }
            ] : []),
          ].map((item, index) => (
            <div 
              key={index}
              className="tax-list-item"
            >
              <div className="tax-list-grid">
                <div className="tax-list-field">
                  <div className="tax-list-label">Contributo</div>
                  <div className="tax-list-value">{item.type}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Scadenza</div>
                  <div className="tax-list-value">{item.date}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Importo</div>
                  <div className="tax-list-value">{item.amount}</div>
                </div>
              </div>
              <span className={`tax-badge ${item.status === 'pending' ? getBadgeClasses('amber') : getBadgeClasses('blue')}`}>
                {item.status === 'pending' ? 'Da Pagare' : 'In Programma'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Immobili (IMU) Page (optional for all profiles)
export function Immobili() {
  return (
    <div className="tax-management-container">
      <div className="tax-header">
        <div>
          <h2>Gestione Immobili (IMU)</h2>
          <p className="tax-subtitle">
            Registro immobili e calcolo IMU/TASI
          </p>
        </div>
        <button className="tax-button tax-button-primary">
          <Plus className="tax-button-icon" />
          Nuovo Immobile
        </button>
      </div>

      <div className="tax-alert tax-alert-blue">
        <div className="tax-alert-content">
          <AlertCircle className="tax-alert-icon" />
          <div className="tax-alert-text">
            <div className="tax-alert-title">Acconto IMU 2025</div>
            <p className="tax-alert-description">
              Scadenza 16 giugno 2025. Totale da versare: € 850
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="tax-stats-grid">
        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('blue')}`}>
              <Home className={getTextClasses('blue')} />
            </div>
          </div>
          <div className="tax-stat-label">Immobili Registrati</div>
          <div className="tax-stat-value">2 proprietà</div>
          <div className="tax-stat-subtitle">In gestione</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('purple')}`}>
              <Euro className={getTextClasses('purple')} />
            </div>
          </div>
          <div className="tax-stat-label">IMU Annuale</div>
          <div className="tax-stat-value">€ 1.700</div>
          <div className="tax-stat-subtitle">Totale 2025</div>
        </div>

        <div className="tax-stat-card">
          <div className="tax-stat-header">
            <div className={`tax-stat-icon ${getBgClasses('emerald')}`}>
              <Calendar className={getTextClasses('emerald')} />
            </div>
          </div>
          <div className="tax-stat-label">Prossima Scadenza</div>
          <div className="tax-stat-value">16 Giu 2025</div>
          <div className="tax-stat-subtitle">Acconto</div>
        </div>
      </div>

      <div className="tax-card">
        <h3 className="tax-card-title">Registro Immobili</h3>
        <div className="tax-list">
          {[
            { address: 'Via Roma 123, Milano', type: 'Appartamento', category: 'A/2', rendita: '€ 800', imu: '€ 1.200' },
            { address: 'Via Verdi 45, Roma', type: 'Garage', category: 'C/6', rendita: '€ 150', imu: '€ 500' },
          ].map((item, index) => (
            <div 
              key={index}
              className="tax-list-item"
            >
              <div className={`tax-list-icon ${getBgClasses('blue')}`}>
                <Home className={getTextClasses('blue')} />
              </div>
              <div className="tax-list-grid">
                <div className="tax-list-field tax-list-field-wide">
                  <div className="tax-list-label">Indirizzo</div>
                  <div className="tax-list-value">{item.address}</div>
                  <div className="tax-list-description">{item.type} • Cat. {item.category}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">Rendita Catastale</div>
                  <div className="tax-list-value">{item.rendita}</div>
                </div>
                <div className="tax-list-field">
                  <div className="tax-list-label">IMU Annuale</div>
                  <div className="tax-list-value">{item.imu}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}