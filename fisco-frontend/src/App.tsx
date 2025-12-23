// App.tsx - Fixed version
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ProfileProvider, useProfile } from "./Components/Context/ProfileContext";
import { ProfileId } from "./Components/types/profile";

// Auth Components
import Homepage from "./Components/Screens/Home/Home";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import ProfileOnboarding from "./Components/Screens/ProfileOnboarding/ProfileOnboarding";

// Main Layout
import AppLayout from "./Components/Screens/MainLayout/AppLayout";

// Dashboard and Core Features
import Dashboard from "./Components/Screens/SideBar/Dashboard/Dashboard";
import Invoicing from "./Components/Screens/SideBar/Invoicing/Invoicing";
import Transactions from "./Components/Screens/SideBar/Transactions/Transactions";

// Documents and Taxes
import Documents from "./Components/Screens/SideBar/Documents/Documents";
import Taxes from "./Components/Screens/SideBar/Taxes/Taxes";
import Declarations from "./Components/Screens/SideBar/Declarations/Declarations";

// Settings and AI Assistant
import Settings from "./Components/Screens/SideBar/Settings/Settings";
import AIAssistant from "./Components/Screens/SideBar/AIAssistant/AIAssistant";

// Placeholder components for other pages
const VATManagement = () => <div className="page-content">Gestione IVA (Coming Soon)</div>;
const WithholdingTax = () => <div className="page-content">Ritenute d'Acconto (Coming Soon)</div>;
const FixedAssets = () => <div className="page-content">Gestione Cespiti (Coming Soon)</div>;
const SocialSecurity = () => <div className="page-content">Previdenza (Coming Soon)</div>;
const ImmobiliIMU = () => <div className="page-content">Immobili IMU (Coming Soon)</div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    return !!token;
  });
  
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState(() => {
    const savedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    return savedOnboarding === 'true';
  });
  
  const [selectedProfile, setSelectedProfile] = React.useState<ProfileId | null>(() => {
    const savedProfile = localStorage.getItem('selectedProfile') as ProfileId;
    return savedProfile || null;
  });

  // Mock function to generate a token (replace with real API call)
  const generateMockToken = () => {
    return 'mock-jwt-token-' + Date.now();
  };

  const handleLogin = () => {
    console.log("Login successful");
    const token = generateMockToken();
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    
    // Check if user has completed onboarding
    const savedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    const savedProfile = localStorage.getItem('selectedProfile') as ProfileId;
    
    if (savedOnboarding === 'true' && savedProfile) {
      setHasCompletedOnboarding(true);
      setSelectedProfile(savedProfile);
    }
  };

  const handleSignup = () => {
    console.log("Signup successful");
    const token = generateMockToken();
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setHasCompletedOnboarding(false); // New users need onboarding
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('selectedProfile');
    localStorage.removeItem('hasCompletedOnboarding');
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setSelectedProfile(null);
  };

  const handleOnboardingComplete = (profileId: ProfileId) => {
    console.log("Onboarding completed with profile:", profileId);
    setSelectedProfile(profileId);
    setHasCompletedOnboarding(true);
    localStorage.setItem('selectedProfile', profileId);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <Navigate to="/app/dashboard" />
                  ) : (
                    <Navigate to="/onboarding" />
                  )
                ) : (
                  <LoginWrapper 
                    onLogin={handleLogin}
                  />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding ? (
                    <Navigate to="/app/dashboard" />
                  ) : (
                    <Navigate to="/onboarding" />
                  )
                ) : (
                  <SignupWrapper 
                    onSignup={handleSignup}
                  />
                )
              } 
            />
            
            {/* Onboarding Route */}
            <Route 
              path="/onboarding" 
              element={
                isAuthenticated ? (
                  <ProfileOnboarding 
                    onComplete={handleOnboardingComplete}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            
            {/* Protected App Routes */}
            <Route 
              path="/app/*" 
              element={
                isAuthenticated ? (
                  hasCompletedOnboarding && selectedProfile ? (
                    <AppLayoutWrapper 
                      onLogout={handleLogout}
                      profileId={selectedProfile}
                    />
                  ) : (
                    <Navigate to="/onboarding" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            
            {/* Redirect old dashboard route */}
            <Route 
              path="/dashboard" 
              element={<Navigate to="/app/dashboard" />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  );
}

// Wrapper component for Login to provide navigation
function LoginWrapper({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  
  const handleSwitchToSignup = () => {
    navigate("/signup");
  };
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  const handleLoginSuccess = () => {
    onLogin(); // No token parameter needed
    const hasOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    if (hasOnboarding) {
      navigate("/app/dashboard");
    } else {
      navigate("/onboarding");
    }
  };
  
  return (
    <Login 
      onLogin={handleLoginSuccess}
      onSwitchToSignup={handleSwitchToSignup}
      onBackToHome={handleBackToHome}
    />
  );
}

// Wrapper component for Signup to provide navigation
function SignupWrapper({ onSignup }: { onSignup: () => void }) {
  const navigate = useNavigate();
  
  const handleSwitchToLogin = () => {
    navigate("/login");
  };
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  const handleSignupSuccess = () => {
    onSignup(); // No token parameter needed
    navigate("/onboarding");
  };
  
  return (
    <Signup 
      onSignup={handleSignupSuccess}
      onSwitchToLogin={handleSwitchToLogin}
      onBackToHome={handleBackToHome}
    />
  );
}

// Wrapper component for AppLayout
interface AppLayoutWrapperProps {
  onLogout: () => void;
  profileId: ProfileId;
}

function AppLayoutWrapper({ onLogout, profileId }: AppLayoutWrapperProps) {
  const [currentPage, setCurrentPage] = React.useState("dashboard");
  const navigate = useNavigate();
  const { setProfile } = useProfile();
  
  // Set the profile when component mounts
  React.useEffect(() => {
    if (profileId) {
      setProfile(profileId);
    }
  }, [profileId, setProfile]);
  
  // Get the current page from the URL
  React.useEffect(() => {
    const pathname = window.location.pathname;
    const currentPath = pathname.replace('/app/', '') || 'dashboard';
    setCurrentPage(currentPath);
  }, []);
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    navigate(`/app/${page}`);
  };
  
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };
  
  return (
    <AppLayout 
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      <Routes>
        {/* Core Navigation */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="documents" element={<Documents />} />
        
        {/* Tax Management */}
        <Route path="taxes" element={<Taxes />} />
        <Route path="vat" element={<VATManagement />} />
        <Route path="withholding" element={<WithholdingTax />} />
        <Route path="fixed-assets" element={<FixedAssets />} />
        <Route path="declarations" element={<Declarations />} />
        
        {/* Additional Modules */}
        <Route path="social-security" element={<SocialSecurity />} />
        <Route path="immobili" element={<ImmobiliIMU />} />
        
        {/* Bottom Navigation */}
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Catch-all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </AppLayout>
  );
}

export default App;