import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Receipt,
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Info,
  Calculator,
  ChevronLeft
} from "lucide-react";
import { PROFILES, ProfileId, UserType, TaxRegime } from "../../types/profile";
import { useProfile } from "../../Context/ProfileContext";
import "./ProfileOnboarding.css";

interface ProfileOnboardingProps {
  onComplete: (profileId: ProfileId) => void;
  userName?: string;
}

export default function ProfileOnboarding({ onComplete, userName = "Mario" }: ProfileOnboardingProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [taxRegime, setTaxRegime] = useState<TaxRegime | null>(null);
  const { setProfile } = useProfile();
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const handleTaxRegimeSelect = (regime: TaxRegime) => {
    setTaxRegime(regime);
  };

  const handleComplete = () => {
    if (!userType || !taxRegime) return;
    
    const profileMap: Record<string, ProfileId> = {
      'professional-forfettario': 'A',
      'professional-semplificato': 'B',
      'enterprise-forfettario': 'C',
      'enterprise-semplificato': 'D',
    };
    
    const profileId = profileMap[`${userType}-${taxRegime}`] as ProfileId;
    
    // Save profile to context
    setProfile(profileId);
    
    // Call the onComplete callback
    onComplete(profileId);
    
    // Navigate to Dashboard page
    navigate("/dashboard");
  };

  const getSelectedProfile = (): ProfileId | null => {
    if (!userType || !taxRegime) return null;
    const profileMap: Record<string, ProfileId> = {
      'professional-forfettario': 'A',
      'professional-semplificato': 'B',
      'enterprise-forfettario': 'C',
      'enterprise-semplificato': 'D',
    };
    return profileMap[`${userType}-${taxRegime}`];
  };

  const selectedProfile = getSelectedProfile();

  return (
    <div className="profile-onboarding-container">
      {/* Header */}
      <header className="onboarding-header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon-container">
                <Receipt className="logo-icon" />
              </div>
              <span className="logo-text">FiscoAI</span>
            </div>
            <div className="security-badge">
              <ShieldCheck className="security-icon" />
              Configurazione Sicura
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="onboarding-main-content">
        <div className="onboarding-content-container">
          {/* Account Created Success Banner */}
          <div className="account-created-banner">
            <CheckCircle2 className="account-created-icon" />
            <span className="account-created-text">Account creato con successo</span>
          </div>

          {/* Welcome Message */}
          <div className="welcome-message">
            <h1 className="welcome-title">
              Benvenuto{userName ? `, ${userName}` : ''}! 👋
            </h1>
            <p className="welcome-subtitle">
              Configura il tuo profilo fiscale in 2 semplici passaggi per personalizzare la tua esperienza
            </p>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps-container">
            <div className="progress-steps">
              <div className="step-item">
                <div className={`step-icon ${step >= 1 ? 'step-active' : 'step-inactive'}`}>
                  {step > 1 ? <CheckCircle2 className="step-check-icon" /> : '1'}
                </div>
                <span className={`step-label ${step >= 1 ? 'step-label-active' : 'step-label-inactive'}`}>
                  Tipo Attività
                </span>
              </div>
              <div className={`step-connector ${step >= 2 ? 'step-connector-active' : 'step-connector-inactive'}`} />
              <div className="step-item">
                <div className={`step-icon ${step >= 2 ? 'step-active' : 'step-inactive'}`}>
                  2
                </div>
                <span className={`step-label ${step >= 2 ? 'step-label-active' : 'step-label-inactive'}`}>
                  Regime Fiscale
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">Seleziona il tipo di attività</h2>
                <p className="step-description">
                  Scegli la categoria che descrive meglio la tua situazione
                </p>
              </div>

              <div className="selection-grid">
                {/* Professional */}
                <div 
                  className={`selection-card ${userType === 'professional' ? 'card-selected' : ''}`}
                  onClick={() => handleUserTypeSelect('professional')}
                >
                  <div className="selection-card-content">
                    <div className="selection-icon professional-icon">
                      <User className="icon-large" />
                    </div>
                    <div className="selection-text">
                      <h3 className="selection-title">Professionista</h3>
                      <p className="selection-subtitle">
                        Libero professionista, consulente, freelancer
                      </p>
                    </div>
                    <div className="selection-features">
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Attività professionale individuale</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Servizi di consulenza</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Casse professionali (opzionale)</span>
                      </div>
                    </div>
                    <button className="selection-button green-button">
                      <span className="button-text">
                        {userType === 'professional' ? 'Professionista Selezionato' : 'Seleziona Professionista'}
                      </span>
                      <ArrowRight className="button-icon" />
                    </button>
                  </div>
                </div>

                {/* Enterprise */}
                <div 
                  className={`selection-card ${userType === 'enterprise' ? 'card-selected' : ''}`}
                  onClick={() => handleUserTypeSelect('enterprise')}
                >
                  <div className="selection-card-content">
                    <div className="selection-icon enterprise-icon">
                      <Building2 className="icon-large" />
                    </div>
                    <div className="selection-text">
                      <h3 className="selection-title">Impresa</h3>
                      <p className="selection-subtitle">
                        Micro-impresa, ditta individuale, società
                      </p>
                    </div>
                    <div className="selection-features">
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Attività imprenditoriale</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Commercio e produzione</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Gestione cespiti e IRAP</span>
                      </div>
                    </div>
                    <button className="selection-button green-button">
                      <span className="button-text">
                        {userType === 'enterprise' ? 'Impresa Selezionata' : 'Seleziona Impresa'}
                      </span>
                      <ArrowRight className="button-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tax Regime Selection */}
          {step === 2 && userType && (
            <div className="step-content">
              <div className="step-header">
                <button 
                  className="back-button"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="button-icon" />
                  Cambia tipo attività
                </button>
                <h2 className="step-title">Seleziona il regime fiscale</h2>
                <p className="step-description">
                  Scegli il regime che corrisponde alla tua situazione attuale
                </p>
              </div>

              <div className="selection-grid">
                {/* Forfettario */}
                <div 
                  className={`selection-card ${taxRegime === 'forfettario' ? 'card-selected' : ''}`}
                  onClick={() => handleTaxRegimeSelect('forfettario')}
                >
                  <div className="selection-card-content">
                    <div className="tax-card-header">
                      <div className="selection-icon tax-icon">
                        <TrendingUp className="icon-large" />
                      </div>
                      {taxRegime === 'forfettario' && (
                        <CheckCircle2 className="selection-check-icon" />
                      )}
                    </div>
                    <div className="selection-text">
                      <h3 className="selection-title">Regime Forfettario</h3>
                      <p className="selection-subtitle">
                        Regime agevolato con imposta sostitutiva al 5% o 15%
                      </p>
                    </div>
                    <div className="selection-features">
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Fatturato fino a €85.000/anno</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Imposta sostitutiva flat (5% o 15%)</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Contabilità semplificata</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>IVA limitata o assente</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Fatturazione elettronica opzionale</span>
                      </div>
                    </div>
                    {/* ADDED BUTTON HERE */}
                    <button className="selection-button green-button">
                      <span className="button-text">
                        {taxRegime === 'forfettario' ? 'Forfettario Selezionato' : 'Seleziona Forfettario'}
                      </span>
                      <ArrowRight className="button-icon" />
                    </button>
                  </div>
                </div>

                {/* Semplificato */}
                <div 
                  className={`selection-card ${taxRegime === 'semplificato' ? 'card-selected' : ''}`}
                  onClick={() => handleTaxRegimeSelect('semplificato')}
                >
                  <div className="selection-card-content">
                    <div className="tax-card-header">
                      <div className="selection-icon tax-icon">
                        <Calculator className="icon-large" />
                      </div>
                      {taxRegime === 'semplificato' && (
                        <CheckCircle2 className="selection-check-icon" />
                      )}
                    </div>
                    <div className="selection-text">
                      <h3 className="selection-title">Regime Semplificato</h3>
                      <p className="selection-subtitle">
                        Contabilità ordinaria con gestione completa IVA
                      </p>
                    </div>
                    <div className="selection-features">
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Fatturato oltre €85.000/anno</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Gestione IVA completa</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Ritenute d'acconto</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Gestione cespiti e ammortamenti</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle2 className="feature-check-icon" />
                        <span>Fatturazione elettronica obbligatoria</span>
                      </div>
                    </div>
                    {/* ADDED BUTTON HERE */}
                    <button className="selection-button green-button">
                      <span className="button-text">
                        {taxRegime === 'semplificato' ? 'Semplificato Selezionato' : 'Seleziona Semplificato'}
                      </span>
                      <ArrowRight className="button-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              {selectedProfile && (
                <div className="profile-summary">
                  <div className="summary-content">
                    <div className="summary-icon">
                      <Briefcase className="summary-icon-large" />
                    </div>
                    <div className="summary-text">
                      <h3 className="summary-title">Profilo Selezionato</h3>
                      <div className="profile-label">
                        {PROFILES[selectedProfile].label}
                      </div>
                      <p className="profile-description">
                        {PROFILES[selectedProfile].description}
                      </p>
                      <div className="info-note">
                        <Info className="info-icon" />
                        <span>
                          Potrai modificare queste impostazioni in qualsiasi momento dalle Impostazioni del tuo account.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  className="action-button back-action"
                  onClick={() => setStep(1)}
                >
                  Indietro
                </button>
                <button
                  className="action-button complete-button"
                  onClick={handleComplete}
                  disabled={!taxRegime}
                >
                  Completa Configurazione
                  <ArrowRight className="button-icon" />
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="help-text">
            <p>
              Non sei sicuro? <a href="#" className="help-link">Chatta con il nostro assistente AI</a> per aiuto nella scelta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}