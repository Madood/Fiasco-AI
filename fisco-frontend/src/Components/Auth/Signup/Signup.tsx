import { useState, useEffect } from "react";
import { 
  Receipt, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Building,
  User,
  Mail,
  Lock,
  ArrowLeft
} from "lucide-react";
import "./signup.css";

interface SignupProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
}

export default function Signup({ onSignup, onSwitchToLogin, onBackToHome }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    vatNumber: "",
    taxRegime: "",
    atecoCode: "",
    agreeTerms: false
  });
  const [passwordError, setPasswordError] = useState("");

  // Check if passwords match whenever password or confirmPassword changes
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError("Le password non corrispondono");
    } else {
      setPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match on step 1 before proceeding
    if (currentStep === 1) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Le password non corrispondono");
        return;
      }
      if (formData.password.length < 8) {
        setPasswordError("La password deve avere almeno 8 caratteri");
        return;
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate signup - in production this would call an API
      onSignup();
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="signup-container">
      {/* Header */}
      <header className="signup-header">
        <div className="signup-header-container">
          <div className="signup-header-content">
            <button 
              onClick={onBackToHome}
              className="back-button"
            >
              <ArrowLeft className="back-arrow" />
              <div className="back-logo-icon">
                <Receipt className="back-logo-svg" />
              </div>
              <span className="back-logo-text">FiscoAI</span>
            </button>
            <div className="login-prompt">
              <span className="full-text">Hai già un account?</span>
              <span className="short-text">Account?</span>
              <button className="login-button" onClick={onSwitchToLogin}>
                Accedi
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="signup-main">
        <div className="signup-content">
          {/* Trust Badge */}
          <div className="trust-badge-container">
            <div className="trust-badge">
              <ShieldCheck className="trust-icon" />
              <span>Registrazione sicura • 30 giorni gratis</span>
            </div>
            <h1 className="signup-title">Inizia gratis oggi</h1>
            <p className="signup-subtitle">
              Crea il tuo account in pochi minuti. Nessuna carta richiesta.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className="steps-container">
              <div className="step-item">
                <div className={`step-number ${currentStep >= 1 ? 'step-active' : ''}`}>
                  {currentStep > 1 ? <CheckCircle2 className="step-check" /> : '1'}
                </div>
                <span className={`step-label ${currentStep >= 1 ? 'step-label-active' : ''}`}>
                  Dati Personali
                </span>
              </div>
              <div className={`step-line ${currentStep >= 2 ? 'step-line-active' : ''}`} />
              <div className="step-item">
                <div className={`step-number ${currentStep >= 2 ? 'step-active' : ''}`}>
                  2
                </div>
                <span className={`step-label ${currentStep >= 2 ? 'step-label-active' : ''}`}>
                  Dati Fiscali
                </span>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="signup-card">
            <form onSubmit={handleSubmit} className="signup-form">
              {currentStep === 1 && (
                <>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">Nome</label>
                      <div className="input-with-icon">
                        <User className="input-icon" />
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Mario"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">Cognome</label>
                      <div className="input-with-icon">
                        <User className="input-icon" />
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Rossi"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-with-icon">
                      <Mail className="input-icon" />
                      <input
                        id="email"
                        type="email"
                        placeholder="mario.rossi@email.it"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Almeno 8 caratteri"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        required
                        className="form-input password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? (
                          <EyeOff className="eye-icon" />
                        ) : (
                          <Eye className="eye-icon" />
                        )}
                      </button>
                    </div>
                    <p className="input-hint">
                      Usa almeno 8 caratteri con lettere e numeri
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Conferma Password</label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ripeti la password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        required
                        className="form-input password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="password-toggle"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="eye-icon" />
                        ) : (
                          <Eye className="eye-icon" />
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="input-error">
                        {passwordError}
                      </p>
                    )}
                    <p className="input-hint">
                      Inserisci nuovamente la password per confermare
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="signup-button continue-button"
                    disabled={!!passwordError}
                  >
                    Continua
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="form-group">
                    <label htmlFor="businessName" className="form-label">Ragione Sociale / Nome e Cognome</label>
                    <div className="input-with-icon">
                      <Building className="input-icon" />
                      <input
                        id="businessName"
                        type="text"
                        placeholder="Mario Rossi o Nome Azienda SRL"
                        value={formData.businessName}
                        onChange={(e) => updateFormData('businessName', e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vatNumber" className="form-label">Partita IVA</label>
                    <input
                      id="vatNumber"
                      type="text"
                      placeholder="12345678901"
                      value={formData.vatNumber}
                      onChange={(e) => updateFormData('vatNumber', e.target.value)}
                      required
                      className="form-input"
                      maxLength={11}
                    />
                    <p className="input-hint">
                      11 cifre della tua Partita IVA italiana
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="taxRegime" className="form-label">Regime Fiscale</label>
                    <select 
                      value={formData.taxRegime}
                      onChange={(e) => updateFormData('taxRegime', e.target.value)}
                      required
                      className="form-select"
                    >
                      <option value="">Seleziona il tuo regime fiscale</option>
                      <option value="forfettario">Regime Forfettario</option>
                      <option value="semplificato">Regime Semplificato</option>
                      <option value="ordinario">Regime Ordinario</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="atecoCode" className="form-label">Codice ATECO (opzionale)</label>
                    <input
                      id="atecoCode"
                      type="text"
                      placeholder="es. 62.01.00"
                      value={formData.atecoCode}
                      onChange={(e) => updateFormData('atecoCode', e.target.value)}
                      className="form-input"
                    />
                    <p className="input-hint">
                      Il codice della tua attività economica
                    </p>
                  </div>

                  <div className="terms-section">
                    <div className="terms-checkbox">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeTerms}
                        onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                        required
                        className="checkbox-input"
                      />
                      <label htmlFor="terms" className="terms-label">
                        Accetto i{" "}
                        <a href="#" className="terms-link">
                          Termini di Servizio
                        </a>
                        {" "}e la{" "}
                        <a href="#" className="terms-link">
                          Privacy Policy
                        </a>
                        . Confermo che FiscoAI non è destinato alla raccolta di dati sensibili.
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="back-button-form"
                      onClick={() => setCurrentStep(1)}
                    >
                      Indietro
                    </button>
                    <button
                      type="submit"
                      className="signup-button create-button"
                      disabled={!formData.agreeTerms}
                    >
                      Crea Account
                    </button>
                  </div>
                </>
              )}
            </form>

            {currentStep === 1 && (
              <div className="social-login-section">
                {/* Add "or" text below the continue button */}
                <div className="or-text">
                  oppure
                </div>

                <div className="social-buttons">
                  <button
                    type="button"
                    className="social-button google-button"
                  >
                    <svg className="social-icon google-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continua con Google
                  </button>

                  {/* Add "or" between buttons */}
                  <div className="social-buttons-or">o</div>

                  <button
                    type="button"
                    className="social-button facebook-button"
                  >
                    <svg className="social-icon facebook-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continua con Facebook
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-item">
              <CheckCircle2 className="feature-icon" />
              <div>
                <div className="feature-title">30 giorni gratis</div>
                <div className="feature-description">Prova senza impegno</div>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle2 className="feature-icon" />
              <div>
                <div className="feature-title">Nessuna carta</div>
                <div className="feature-description">Non richiesta per iniziare</div>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle2 className="feature-icon" />
              <div>
                <div className="feature-title">Supporto incluso</div>
                <div className="feature-description">Assistenza in italiano</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}