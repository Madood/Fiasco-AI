// /Components/Screens/Settings/Settings.tsx
import React, { useState } from "react";
import "./Settings.css";
import { 
  Settings as SettingsIcon,
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Info,
  Briefcase,
  CheckCircle2,
  Plus
} from "lucide-react";
import { useProfile } from "../../../Context/ProfileContext";
import { PROFILES, ProfileId } from "../../../types/profile";

const Settings = () => {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profilo", icon: User },
    { id: "business", label: "Attività", icon: Building },
    { id: "fiscal-profile", label: "Profilo Fiscale", icon: Briefcase },
    { id: "notifications", label: "Notifiche", icon: Bell },
    { id: "security", label: "Sicurezza", icon: Shield },
    { id: "billing", label: "Fatturazione", icon: CreditCard },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Impostazioni</h1>
        <p className="subtitle">Gestisci il tuo profilo e le preferenze dell'account</p>
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="icon-sm" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="tab-content">
              <h2>Informazioni Personali</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="first-name">Nome</label>
                  <input type="text" id="first-name" defaultValue="Mario" />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">Cognome</label>
                  <input type="text" id="last-name" defaultValue="Rossi" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" defaultValue="mario.rossi@email.it" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="phone">Telefono</label>
                  <input type="tel" id="phone" defaultValue="+39 333 1234567" />
                </div>
              </div>
              <button className="save-button">Salva Modifiche</button>
            </div>
          )}

          {activeTab === "business" && (
            <div className="tab-content">
              <h2>Dati Attività</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="business-name">Ragione Sociale</label>
                  <input type="text" id="business-name" defaultValue="Mario Rossi" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="vat">Partita IVA</label>
                  <input type="text" id="vat" defaultValue="12345678901" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="tax-regime">Regime Fiscale</label>
                  <input 
                    type="text" 
                    id="tax-regime" 
                    defaultValue={profile?.taxRegime === 'forfettario' ? 'Forfettario' : 'Semplificato'} 
                    disabled 
                  />
                  <p className="help-text">
                    Per modificare il regime fiscale, vai alla sezione "Profilo Fiscale"
                  </p>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="ateco">Codice ATECO</label>
                  <input type="text" id="ateco" defaultValue="62.01.00 - Produzione software" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="address">Indirizzo</label>
                  <input type="text" id="address" defaultValue="Via Roma, 123 - 20100 Milano" />
                </div>
              </div>
              <button className="save-button">Salva Modifiche</button>
            </div>
          )}

          {activeTab === "fiscal-profile" && profile && (
            <div className="tab-content">
              <div className="current-profile">
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-icon">
                      <Briefcase className="icon-md text-white" />
                    </div>
                    <div className="profile-info">
                      <div className="profile-title">
                        <span>Profilo Corrente</span>
                        <span className="profile-badge">Profilo {profile.id}</span>
                      </div>
                      <h3>{profile.label}</h3>
                      <p className="profile-description">{profile.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-features">
                <h3>Caratteristiche del tuo profilo</h3>
                <div className="features-list">
                  <div className="feature-item">
                    <CheckCircle2 className="icon-sm text-emerald-600" />
                    <div>
                      <h4>{profile.userType === 'professional' ? 'Professionista' : 'Impresa'}</h4>
                      <p>
                        {profile.userType === 'professional' 
                          ? 'Attività professionale con accesso a casse professionali'
                          : 'Attività imprenditoriale con gestione IRAP e cespiti'}
                      </p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 className="icon-sm text-emerald-600" />
                    <div>
                      <h4>Regime {profile.taxRegime === 'forfettario' ? 'Forfettario' : 'Semplificato'}</h4>
                      <p>
                        {profile.taxRegime === 'forfettario'
                          ? 'Imposta sostitutiva al 5% o 15%, contabilità semplificata, IVA limitata'
                          : 'Gestione IVA completa, ritenute d\'acconto, cespiti e ammortamenti'}
                      </p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 className="icon-sm text-emerald-600" />
                    <div>
                      <h4>Fatturazione Elettronica</h4>
                      <p>
                        {profile.taxRegime === 'forfettario'
                          ? 'Opzionale - puoi scegliere se utilizzare il Sistema di Interscambio'
                          : 'Obbligatoria - tutte le fatture devono passare per il Sistema di Interscambio'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-notice">
                <Info className="icon-sm text-blue-600" />
                <div>
                  <h4>Modifica Profilo Fiscale</h4>
                  <p>
                    Il cambio di profilo fiscale influisce sulle funzionalità disponibili e sulla configurazione 
                    del tuo account. Contatta l'assistenza per modificare il tuo profilo fiscale.
                  </p>
                  <button className="outline-button">Contatta Assistenza</button>
                </div>
              </div>

              <div className="profile-comparison">
                <h3>Confronto Profili</h3>
                <div className="profiles-grid">
                  {(Object.keys(PROFILES) as ProfileId[]).map((profileId) => {
                    const p = PROFILES[profileId];
                    const isCurrentProfile = profile.id === profileId;
                    return (
                      <div 
                        key={profileId}
                        className={`profile-card ${isCurrentProfile ? 'current' : ''}`}
                      >
                        <div className="profile-card-header">
                          <span className={`profile-type-badge ${p.taxRegime}`}>
                            Profilo {profileId}
                          </span>
                          {isCurrentProfile && (
                            <span className="active-badge">Attivo</span>
                          )}
                        </div>
                        <h4>{p.label}</h4>
                        <p className="profile-card-description">{p.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="tab-content">
              <h2>Preferenze Notifiche</h2>
              <div className="notifications-list">
                {[
                  { label: "Email su scadenze fiscali", description: "Ricevi promemoria prima delle scadenze", checked: true },
                  { label: "Fatture ricevute", description: "Notifica quando ricevi nuove fatture via SdI", checked: true },
                  { label: "Insights AI", description: "Suggerimenti intelligenti settimanali", checked: true },
                  { label: "Newsletter", description: "Aggiornamenti normativi e consigli fiscali", checked: false },
                ].map((notification, index) => (
                  <div key={index} className="notification-item">
                    <div>
                      <h4>{notification.label}</h4>
                      <p>{notification.description}</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={notification.checked} />
                      <span className="slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="tab-content">
              <h2>Sicurezza Account</h2>
              <div className="security-section">
                <h3>Modifica Password</h3>
                <div className="password-form">
                  <input type="password" placeholder="Password attuale" />
                  <input type="password" placeholder="Nuova password" />
                  <input type="password" placeholder="Conferma nuova password" />
                  <button className="update-button">Aggiorna Password</button>
                </div>
              </div>
              <div className="security-section">
                <div className="two-factor">
                  <div>
                    <h3>Autenticazione a due fattori</h3>
                    <p>Aggiungi un livello extra di sicurezza</p>
                  </div>
                  <span className="active-status">Attiva</span>
                </div>
                <button className="outline-button">Gestisci 2FA</button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="tab-content">
              <h2>Piano e Fatturazione</h2>
              <div className="plan-card">
                <div className="plan-header">
                  <h3>Piano Professional</h3>
                  <span className="plan-badge">Attivo</span>
                </div>
                <p className="plan-price">€ 29/mese • Rinnovo automatico il 17 Feb 2025</p>
                <button className="outline-button">Gestisci Piano</button>
              </div>
              <div className="payment-method">
                <h3>Metodo di Pagamento</h3>
                <div className="payment-card">
                  <CreditCard className="icon-sm text-slate-400" />
                  <div>
                    <div className="card-number">•••• •••• •••• 4242</div>
                    <div className="card-expiry">Scadenza 12/26</div>
                  </div>
                  <button className="edit-button">Modifica</button>
                </div>
                <button className="add-payment-button">
                  <Plus className="icon-xs" />
                  Aggiungi Metodo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;