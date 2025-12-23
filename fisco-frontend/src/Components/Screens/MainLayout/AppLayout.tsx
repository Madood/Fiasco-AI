import { useState, ReactNode } from "react";
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  FileText,
  Calculator,
  FileCheck,
  Sparkles,
  Settings,
  Menu,
  X,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
  LogOut,
  HelpCircle,
  Percent,
  FileSpreadsheet,
  Building,
  Home,
  Users,
  LucideIcon,
} from "lucide-react";
import { useProfile } from "../../Context/ProfileContext";
import { getProfileFeatures } from "../../types/profile";
import "./AppLayout.css";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface AppLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Deadline {
  date: string;
  label: string;
}

export default function AppLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
}: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { getProfile } = useProfile();
  const profile = getProfile();

  // Get profile features to conditionally show menu items
  const features = profile ? getProfileFeatures(profile) : null;

  // Base navigation items - always visible
  const baseNavigationItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "invoicing",
      label: "Fatturazione",
      icon: Receipt,
      badge: features?.invoicing === "mandatory" ? "3" : undefined,
    },
    { id: "transactions", label: "Transazioni", icon: CreditCard },
    { id: "documents", label: "Documenti", icon: FileText },
  ];

  // Conditional tax-related items
  const taxNavigationItems: NavigationItem[] = [
    { id: "taxes", label: "Imposte", icon: Calculator },
    ...(features?.vatManagement
      ? [{ id: "vat", label: "IVA", icon: Percent }]
      : []),
    ...(features?.withholdingTax
      ? [{ id: "withholding", label: "Ritenute", icon: FileSpreadsheet }]
      : []),
    ...(features?.fixedAssets
      ? [{ id: "fixed-assets", label: "Cespiti", icon: Building }]
      : []),
    { id: "declarations", label: "Dichiarazioni", icon: FileCheck },
  ];

  // Additional modules
  const additionalNavigationItems: NavigationItem[] = [
    { id: "social-security", label: "Previdenza", icon: Users },
    ...(features?.immobiliIMU
      ? [{ id: "immobili", label: "Immobili (IMU)", icon: Home }]
      : []),
  ];

  // Bottom navigation items
  const bottomNavigationItems: NavigationItem[] = [
    { id: "ai-assistant", label: "Assistente AI", icon: Sparkles },
    { id: "settings", label: "Impostazioni", icon: Settings },
  ];

  const navigationItems: NavigationItem[] = [
    ...baseNavigationItems,
    ...taxNavigationItems,
    ...additionalNavigationItems,
    ...bottomNavigationItems,
  ];

  const upcomingDeadlines: Deadline[] = [
    { date: "31 Gen", label: "IVA Q4 2024" },
    { date: "16 Feb", label: "Contributi INPS" },
  ];

  const getActivePageLabel = (): string => {
    const activeItem = navigationItems.find((item) => item.id === currentPage);
    return activeItem?.label || "Dashboard";
  };

  return (
    <div
      className={`app-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${
        mobileSidebarOpen ? "mobile-sidebar-open" : ""
      }`}
    >
      {/* Desktop Sidebar */}
      <aside
        className={`sidebar-desktop ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          {!sidebarCollapsed && (
            <div className="logo-container">
              <div className="logo-icon">
                <Receipt className="icon-sm" />
              </div>
              <span className="logo-text">FiscoAI</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="logo-icon-collapsed">
              <Receipt className="icon-sm" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item ${
                  isActive ? "nav-item-active" : "nav-item-inactive"
                } ${sidebarCollapsed ? "nav-item-collapsed" : ""}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="nav-icon" />
                {!sidebarCollapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="sidebar-collapse-toggle">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="collapse-button"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="icon-xs" />
            ) : (
              <>
                <ChevronLeft className="icon-xs" />
                <span>Riduci</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div
            className="mobile-sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="mobile-sidebar">
            {/* Logo */}
            <div className="mobile-sidebar-header">
              <div className="logo-container">
                <div className="logo-icon">
                  <Receipt className="icon-sm" />
                </div>
                <span className="logo-text">FiscoAI</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="close-button"
              >
                <X className="icon-sm" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mobile-navigation">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`nav-item ${
                      isActive ? "nav-item-active" : "nav-item-inactive"
                    }`}
                  >
                    <Icon className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="mobile-menu-button"
            >
              <Menu className="icon-sm" />
            </button>

            <div className="page-info">
              <h1 className="page-title">{getActivePageLabel()}</h1>
              <p className="page-subtitle">
                {profile?.label || "Regime Forfettario"} • P.IVA 12345678901
              </p>
            </div>
          </div>

          <div className="top-bar-right">
            {/* Quick Actions */}
            <div className="quick-actions">
              <button className="quick-action-button">
                <Upload className="icon-xs" />
                Carica
              </button>
              <button className="new-invoice-button">
                <Plus className="icon-xs" />
                Nuova Fattura
              </button>
            </div>

            {/* Notifications */}
            <div className="dropdown-container">
              <button className="notification-button">
                <Bell className="icon-sm" />
                <span className="notification-indicator" />
              </button>
              <div className="dropdown-content dropdown-content-wide">
                <div className="dropdown-label">Scadenze Imminenti</div>
                <div className="dropdown-separator" />
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="dropdown-item deadline-item">
                    <div className="deadline-icon">
                      <Calculator className="icon-sm" />
                    </div>
                    <div className="deadline-info">
                      <div className="deadline-label">{deadline.label}</div>
                      <div className="deadline-date">
                        Scadenza {deadline.date}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="dropdown-separator" />
                <div className="dropdown-item view-all-notifications">
                  Vedi tutte le notifiche
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="dropdown-container">
              <button className="user-menu-button">
                <div className="avatar-sm">
                  <div className="avatar-fallback">MR</div>
                </div>
                <span className="user-name">Francesco Parretta</span>
              </button>
              <div className="dropdown-content dropdown-content-normal">
                <div className="dropdown-label">
                  <div>Francesco Parretta  </div>
                  <div className="user-email">francesco.parretta@email.it</div>
                </div>
                <div className="dropdown-separator" />
                <div
                  className="dropdown-item"
                  onClick={() => onNavigate("settings")}
                >
                  <Settings className="icon-xs" />
                  Impostazioni
                </div>
                <div className="dropdown-item">
                  <HelpCircle className="icon-xs" />
                  Centro Assistenza
                </div>
                <div className="dropdown-separator" />
                <div className="dropdown-item logout-item" onClick={onLogout}>
                  <LogOut className="icon-xs" />
                  Esci
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">{children}</main>

        {/* Footer - Centered Layout */}
        <footer className="app-footer-centered">
          <div className="footer-content-centered">
            <a href="#" className="footer-link">
              Privacy
            </a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">
              Termini
            </a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">
              GDPR
            </a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">
              Assistenza
            </a>
          </div>
          <div className="copyright-right">
            © 2025 FiscoAI • Conforme AgE e GDPR
          </div>
        </footer>
      </div>
    </div>
  );
}
