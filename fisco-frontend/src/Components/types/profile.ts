// User profile types for the Italian tax management platform

export type UserType = 'professional' | 'enterprise';
export type TaxRegime = 'forfettario' | 'semplificato';

export type ProfileId = 'A' | 'B' | 'C' | 'D';

export interface UserProfile {
  id: ProfileId;
  userType: UserType;
  taxRegime: TaxRegime;
  label: string;
  description: string;
}

// Profile configurations
export const PROFILES: Record<ProfileId, UserProfile> = {
  A: {
    id: 'A',
    userType: 'professional',
    taxRegime: 'forfettario',
    label: 'Professionista • Regime Forfettario',
    description: 'Libero professionista con fatturato fino a €85.000 e regime fiscale agevolato'
  },
  B: {
    id: 'B',
    userType: 'professional',
    taxRegime: 'semplificato',
    label: 'Professionista • Regime Semplificato',
    description: 'Libero professionista con contabilità ordinaria semplificata e gestione IVA completa'
  },
  C: {
    id: 'C',
    userType: 'enterprise',
    taxRegime: 'forfettario',
    label: 'Impresa • Regime Forfettario',
    description: 'Micro-impresa con fatturato fino a €85.000 e regime fiscale agevolato'
  },
  D: {
    id: 'D',
    userType: 'enterprise',
    taxRegime: 'semplificato',
    label: 'Impresa • Regime Semplificato',
    description: 'Impresa con contabilità ordinaria semplificata, gestione IVA e cespiti'
  }
};

// Feature flags based on profile
export interface ProfileFeatures {
  // Core modules
  invoicing: 'mandatory' | 'optional' | 'simplified';
  transactions: boolean;
  documents: boolean;
  
  // Tax features
  vatManagement: boolean;
  withholdingTax: boolean;
  fixedAssets: boolean;
  irap: boolean;
  
  // F24 complexity
  f24Type: 'basic' | 'advanced';
  
  // Social security
  socialSecurity: {
    inps: boolean;
    professionalFunds: boolean;
  };
  
  // Optional modules
  immobiliIMU: boolean;
  
  // Dashboard widgets
  dashboardWidgets: {
    revenueChart: boolean;
    taxBreakdown: boolean;
    vatSummary: boolean;
    withholdingTax: boolean;
    fixedAssetsDepreciation: boolean;
    socialSecurityContributions: boolean;
  };
}

export function getProfileFeatures(profile: UserProfile): ProfileFeatures {
  const isForfettario = profile.taxRegime === 'forfettario';
  const isSemplificato = profile.taxRegime === 'semplificato';
  const isProfessional = profile.userType === 'professional';
  
  return {
    // Core modules
    invoicing: isForfettario ? 'optional' : 'mandatory',
    transactions: true,
    documents: true,
    
    // Tax features - only for Semplificato
    vatManagement: isSemplificato,
    withholdingTax: isSemplificato,
    fixedAssets: isSemplificato,
    irap: isSemplificato && !isProfessional, // Only for enterprises
    
    // F24
    f24Type: isForfettario ? 'basic' : 'advanced',
    
    // Social security
    socialSecurity: {
      inps: true, // All profiles have INPS
      professionalFunds: isProfessional, // Only professionals have professional funds
    },
    
    // Optional modules
    immobiliIMU: true, // Available for all but optional
    
    // Dashboard widgets
    dashboardWidgets: {
      revenueChart: true,
      taxBreakdown: true,
      vatSummary: isSemplificato,
      withholdingTax: isSemplificato,
      fixedAssetsDepreciation: isSemplificato,
      socialSecurityContributions: true,
    }
  };
}

// Helper to get profile label for display
export function getProfileLabel(profileId: ProfileId): string {
  return PROFILES[profileId].label;
}

// Helper to determine menu visibility
export function shouldShowMenuItem(
  menuItem: string,
  profile: UserProfile
): boolean {
  const features = getProfileFeatures(profile);
  
  const menuVisibility: Record<string, boolean> = {
    'dashboard': true,
    'invoicing': true, // Always shown but behavior differs
    'transactions': features.transactions,
    'documents': features.documents,
    'taxes': true,
    'declarations': true,
    'ai-assistant': true,
    'settings': true,
    // Conditional items
    'vat': features.vatManagement,
    'withholding': features.withholdingTax,
    'fixed-assets': features.fixedAssets,
    'immobili': features.immobiliIMU,
    'social-security': true, // Always shown
  };
  
  return menuVisibility[menuItem] ?? false;
}

// Helper to get all profiles
export function getAllProfiles(): UserProfile[] {
  return Object.values(PROFILES);
}

// Helper to get profile by ID
export function getProfileById(id: ProfileId): UserProfile | undefined {
  return PROFILES[id];
}

// Type guard for ProfileId
export function isValidProfileId(id: string): id is ProfileId {
  return id in PROFILES;
}

// Default profile (can be used for initial state)
export const DEFAULT_PROFILE: UserProfile = PROFILES.A;