import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Euro,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  CreditCard,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Plus,
  Percent,
  FileSpreadsheet,
  Building,
  Users,
} from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useProfile } from "../../../Context/ProfileContext";
import { getProfileFeatures } from "../../../types/profile";
import "./Dashboard.css";

interface Invoice {
  number: string;
  client: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending';
}

interface Deadline {
  date: string;
  title: string;
  amount: string;
  status: 'urgent' | 'upcoming';
  daysLeft: number;
}

// Use Record type for chart data to satisfy recharts
interface ChartDataItem extends Record<string, string | number> {
  name: string;
  value: number;
  color: string;
}

interface RevenueData {
  month: string;
  revenue: number;
}

export default function Dashboard() {
  const { getProfile } = useProfile();
  const profile = getProfile();
  const features = profile ? getProfileFeatures(profile) : null;
  
  const [revenueData] = useState<RevenueData[]>([
    { month: 'Lug', revenue: 3200 },
    { month: 'Ago', revenue: 4100 },
    { month: 'Set', revenue: 3800 },
    { month: 'Ott', revenue: 5200 },
    { month: 'Nov', revenue: 4900 },
    { month: 'Dic', revenue: 6100 },
    { month: 'Gen', revenue: 4500 },
  ]);

  const isForfettario = profile?.taxRegime === 'forfettario';
  const isSemplificato = profile?.taxRegime === 'semplificato';
  
  // Create chart-compatible data
  const [taxChartData] = useState<ChartDataItem[]>(() => {
    if (isForfettario) {
      return [
        { name: 'Imposta Sostitutiva', value: 750, color: '#10b981' },
        { name: 'Contributi INPS', value: 1200, color: '#3b82f6' },
      ];
    }
    return [
      { name: 'IRPEF', value: 1100, color: '#10b981' },
      { name: 'Contributi INPS', value: 1200, color: '#3b82f6' },
      { name: 'Ritenute d\'acconto', value: 400, color: '#f59e0b' },
      { name: 'IVA', value: 650, color: '#8b5cf6' },
    ];
  });

  const [upcomingDeadlines] = useState<Deadline[]>([
    {
      date: '31 Gen 2025',
      title: 'Liquidazione IVA Q4 2024',
      amount: '€ 890',
      status: 'urgent',
      daysLeft: 14
    },
    {
      date: '16 Feb 2025',
      title: 'Contributi INPS Trimestre',
      amount: '€ 1.250',
      status: 'upcoming',
      daysLeft: 30
    },
    {
      date: '16 Mar 2025',
      title: 'Acconto Imposte 2025',
      amount: '€ 750',
      status: 'upcoming',
      daysLeft: 58
    },
  ]);

  const [recentInvoices] = useState<Invoice[]>([
    {
      number: 'FT-2025-004',
      client: 'Studio Design SRL',
      date: '15 Gen 2025',
      amount: '€ 1.500',
      status: 'paid'
    },
    {
      number: 'FT-2025-003',
      client: 'TechFlow SpA',
      date: '12 Gen 2025',
      amount: '€ 2.200',
      status: 'paid'
    },
    {
      number: 'FT-2025-002',
      client: 'Marketing Pro',
      date: '08 Gen 2025',
      amount: '€ 850',
      status: 'pending'
    },
  ]);

  const totalRevenue = 31800;
  const totalExpenses = 8400;
  const totalTaxes = 2350;
  const netIncome = totalRevenue - totalExpenses - totalTaxes;

  // Custom Button Component
  const CustomButton = ({ 
    children, 
    variant = 'primary',
    size = 'medium',
    onClick,
    className = '',
    ...props 
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    className?: string;
  }) => {
    const sizeClasses = {
      small: 'btn-small',
      medium: 'btn-medium',
      large: 'btn-large'
    };
    
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
      ghost: 'btn-ghost'
    };
    
    return (
      <button
        className={`custom-button ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Custom Badge Component
  const CustomBadge = ({ 
    children, 
    variant = 'default',
    className = ''
  }: {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    className?: string;
  }) => {
    const variantClasses = {
      default: 'badge-default',
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'badge-danger',
      info: 'badge-info'
    };
    
    return (
      <span className={`custom-badge ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  // Custom Card Component
  const CustomCard = ({ 
    children, 
    className = '',
    padding = true
  }: {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
  }) => {
    return (
      <div className={`custom-card ${padding ? 'card-padding' : ''} ${className}`}>
        {children}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Welcome & Quick Stats */}
      <div className="dashboard-header">
        <div>
          <div className="welcome-section">
            <h2> Bienvenidos, Francesco!👋</h2>
            {profile && (
              <CustomBadge 
                variant={isForfettario ? 'success' : 'info'}
                className="profile-badge"
              >
                {profile.label}
              </CustomBadge>
            )}
          </div>
          <p className="dashboard-subtitle">
            Ecco il riepilogo della tua situazione fiscale
          </p>
        </div>
        <div className="header-actions">
          <CustomButton variant="outline">
            <FileText className="icon-sm" />
            Report
          </CustomButton>
          <CustomButton variant="primary" className="btn-new-invoice">
            <Plus className="icon-sm" />
            Nuova Fattura
          </CustomButton>
        </div>
      </div>

      {/* Alert Banner - Different based on regime */}
      {isSemplificato ? (
        <CustomCard className="alert-banner warning">
          <div className="alert-content">
            <AlertTriangle className="alert-icon" />
            <div className="alert-text">
              <div className="alert-title">Scadenza imminente: Liquidazione IVA Q4</div>
              <p className="alert-description">
                Hai 14 giorni per pagare € 1.450. Prepara l'F24 o paga direttamente dalla piattaforma.
              </p>
            </div>
          </div>
          <CustomButton size="small" variant="primary" className="alert-action">
            Genera F24
          </CustomButton>
        </CustomCard>
      ) : isForfettario ? (
        <CustomCard className="alert-banner success">
          <div className="alert-content">
            <CheckCircle2 className="alert-icon" />
            <div className="alert-text">
              <div className="alert-title">Regime Forfettario: Gestione semplificata</div>
              <p className="alert-description">
                Prossima scadenza: Contributi INPS (16 Feb 2025). Imposta sostitutiva al {profile?.id === 'A' || profile?.id === 'C' ? '15%' : '5%'}.
              </p>
            </div>
          </div>
          <CustomButton size="small" variant="outline" className="alert-action">
            Dettagli
          </CustomButton>
        </CustomCard>
      ) : null}

      {/* Key Metrics */}
      <div className="metrics-grid">
        <CustomCard>
          <div className="metric-card">
            <div className="metric-header">
              <div className="metric-icon revenue">
                <TrendingUp className="icon-md" />
              </div>
              <CustomBadge variant="success" className="metric-trend">
                +12%
              </CustomBadge>
            </div>
            <div className="metric-label">Fatturato 2025</div>
            <div className="metric-value">€ {totalRevenue.toLocaleString()}</div>
            <div className="metric-change positive">
              <ArrowUpRight className="icon-xs" />
              <span>vs. mese scorso</span>
            </div>
          </div>
        </CustomCard>

        <CustomCard>
          <div className="metric-card">
            <div className="metric-header">
              <div className="metric-icon net">
                <Euro className="icon-md" />
              </div>
              <CustomBadge variant="info" className="metric-trend">
                Netto
              </CustomBadge>
            </div>
            <div className="metric-label">Reddito Netto</div>
            <div className="metric-value">€ {netIncome.toLocaleString()}</div>
            <div className="metric-description">
              Dopo imposte e spese
            </div>
          </div>
        </CustomCard>

        <CustomCard>
          <div className="metric-card">
            <div className="metric-header">
              <div className="metric-icon expenses">
                <CreditCard className="icon-md" />
              </div>
              <CustomBadge variant="danger" className="metric-trend">
                -5%
              </CustomBadge>
            </div>
            <div className="metric-label">Spese Deducibili</div>
            <div className="metric-value">€ {totalExpenses.toLocaleString()}</div>
            <div className="metric-change negative">
              <ArrowDownRight className="icon-xs" />
              <span>vs. mese scorso</span>
            </div>
          </div>
        </CustomCard>

        <CustomCard>
          <div className="metric-card">
            <div className="metric-header">
              <div className="metric-icon invoices">
                <Receipt className="icon-md" />
              </div>
              <CustomBadge variant="info" className="metric-trend">
                3
              </CustomBadge>
            </div>
            <div className="metric-label">Fatture in Sospeso</div>
            <div className="metric-value">€ 4.250</div>
            <div className="metric-description">
              Da incassare
            </div>
          </div>
        </CustomCard>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Revenue Trend */}
        <CustomCard className="chart-card revenue-chart">
          <div className="chart-header">
            <div>
              <h3>Andamento Fatturato</h3>
              <p>Ultimi 7 mesi</p>
            </div>
            <div className="chart-controls">
              <CustomButton variant="outline" size="small">Mese</CustomButton>
              <CustomButton variant="ghost" size="small">Anno</CustomButton>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CustomCard>

        {/* Tax Breakdown - Fixed with proper Tooltip */}
        <CustomCard className="chart-card tax-chart">
          <div className="chart-header">
            <div>
              <h3>Imposte 2025</h3>
              <p>Totale: € {totalTaxes.toLocaleString()}</p>
            </div>
          </div>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={taxChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taxChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="tax-breakdown-list">
            {taxChartData.map((item, index) => (
              <div key={index} className="tax-item">
                <div className="tax-item-info">
                  <div 
                    className="tax-color-indicator" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="tax-name">{item.name}</span>
                </div>
                <span className="tax-value">€ {item.value}</span>
              </div>
            ))}
          </div>
        </CustomCard>
      </div>

      {/* Conditional Widgets for Semplificato */}
      {features?.dashboardWidgets.vatSummary && (
        <div className="widgets-grid">
          {/* VAT Summary */}
          <CustomCard className="widget-card">
            <div className="widget-header">
              <div>
                <h3>Riepilogo IVA</h3>
                <p>Trimestre corrente</p>
              </div>
              <CustomButton variant="ghost" size="small">
                Dettagli
              </CustomButton>
            </div>
            <div className="widget-content">
              <div className="stat-card vat-debit">
                <div className="stat-icon">
                  <Percent className="icon-md" />
                </div>
                <div className="stat-info">
                  <div className="stat-label">IVA a Debito</div>
                  <div className="stat-value">€ 2.340</div>
                </div>
              </div>
              <div className="stat-card vat-credit">
                <div className="stat-icon">
                  <Percent className="icon-md" />
                </div>
                <div className="stat-info">
                  <div className="stat-label">IVA a Credito</div>
                  <div className="stat-value">€ 890</div>
                </div>
              </div>
              <div className="stat-card vat-balance">
                <div className="stat-icon">
                  <Euro className="icon-md" />
                </div>
                <div className="stat-info">
                  <div className="stat-label">Saldo IVA</div>
                  <div className="stat-value">€ 1.450</div>
                </div>
              </div>
            </div>
          </CustomCard>

          {/* Withholding Tax Summary */}
          {features?.dashboardWidgets.withholdingTax && (
            <CustomCard className="widget-card">
              <div className="widget-header">
                <div>
                  <h3>Ritenute d'Acconto</h3>
                  <p>Anno corrente</p>
                </div>
                <CustomButton variant="ghost" size="small">
                  Dettagli
                </CustomButton>
              </div>
              <div className="widget-content">
                <div className="stat-card withholding-subite">
                  <div className="stat-icon">
                    <FileSpreadsheet className="icon-md" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Ritenute Subite</div>
                    <div className="stat-value">€ 6.340</div>
                  </div>
                </div>
                <div className="stat-card withholding-credit">
                  <div className="stat-icon">
                    <CheckCircle2 className="icon-md" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Credito Recuperabile</div>
                    <div className="stat-value">€ 6.340</div>
                  </div>
                </div>
                <div className="stat-card withholding-docs">
                  <div className="stat-icon">
                    <FileText className="icon-md" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Certificazioni</div>
                    <div className="stat-value">28 documenti</div>
                  </div>
                </div>
              </div>
            </CustomCard>
          )}
        </div>
      )}

      {/* Social Security Contributions */}
      {features?.dashboardWidgets.socialSecurityContributions && (
        <CustomCard className="social-security-card">
          <div className="widget-header">
            <div>
              <h3>Contributi Previdenziali</h3>
              <p>Riepilogo anno corrente</p>
            </div>
            <CustomButton variant="ghost" size="small">
              Vedi Tutti
            </CustomButton>
          </div>
          <div className="social-security-grid">
            <div className="contribution-card inps">
              <div className="contribution-icon">
                <Users className="icon-md" />
              </div>
              <div className="contribution-label">INPS</div>
              <div className="contribution-value">€ 4.800</div>
              <div className="contribution-description">Gestione separata</div>
            </div>
            {features?.socialSecurity.professionalFunds && (
              <div className="contribution-card cassa">
                <div className="contribution-icon">
                  <Users className="icon-md" />
                </div>
                <div className="contribution-label">Cassa Prof.</div>
                <div className="contribution-value">€ 2.400</div>
                <div className="contribution-description">Contributi obbligatori</div>
              </div>
            )}
            <div className="contribution-card next">
              <div className="contribution-icon">
                <Calendar className="icon-md" />
              </div>
              <div className="contribution-label">Prossima</div>
              <div className="contribution-value">16 Feb 2025</div>
              <div className="contribution-description">Acconto Q1</div>
            </div>
          </div>
        </CustomCard>
      )}

      {/* Deadlines & Recent Activity */}
      <div className="activity-grid">
        {/* Upcoming Deadlines */}
        <CustomCard className="activity-card">
          <div className="activity-header">
            <div>
              <h3>Scadenze Fiscali</h3>
              <p>Prossimi pagamenti</p>
            </div>
            <CustomButton variant="ghost" size="small">
              Vedi Tutte
            </CustomButton>
          </div>
          <div className="deadlines-list">
            {upcomingDeadlines.map((deadline, index) => (
              <div 
                key={index}
                className={`deadline-item ${deadline.status}`}
              >
                <div className={`deadline-icon ${deadline.status}`}>
                  <Calendar className="icon-md" />
                </div>
                <div className="deadline-info">
                  <div className="deadline-header">
                    <div className="deadline-title">{deadline.title}</div>
                    <CustomBadge 
                      variant={deadline.status === 'urgent' ? 'danger' : 'info'}
                      className="days-badge"
                    >
                      {deadline.daysLeft}g
                    </CustomBadge>
                  </div>
                  <div className="deadline-footer">
                    <div className="deadline-date">{deadline.date}</div>
                    <div className="deadline-amount">{deadline.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CustomButton variant="outline" className="full-width-button">
            <Calendar className="icon-sm" />
            Calendario Completo
          </CustomButton>
        </CustomCard>

        {/* Recent Invoices */}
        <CustomCard className="activity-card">
          <div className="activity-header">
            <div>
              <h3>Fatture Recenti</h3>
              <p>Ultimi movimenti</p>
            </div>
            <CustomButton variant="ghost" size="small">
              Vedi Tutte
            </CustomButton>
          </div>
          <div className="invoices-list">
            {recentInvoices.map((invoice, index) => (
              <div 
                key={index}
                className="invoice-item"
              >
                <div className="invoice-icon">
                  <Receipt className="icon-md" />
                </div>
                <div className="invoice-info">
                  <div className="invoice-header">
                    <div className="invoice-number">{invoice.number}</div>
                    <CustomBadge 
                      variant={invoice.status === 'paid' ? 'success' : 'warning'}
                      className="invoice-status"
                    >
                      {invoice.status === 'paid' ? 'Pagata' : 'In Attesa'}
                    </CustomBadge>
                  </div>
                  <div className="invoice-client">{invoice.client}</div>
                </div>
                <div className="invoice-details">
                  <div className="invoice-amount">{invoice.amount}</div>
                  <div className="invoice-date">{invoice.date}</div>
                </div>
              </div>
            ))}
          </div>
          <CustomButton variant="outline" className="full-width-button">
            <Receipt className="icon-sm" />
            Tutte le Fatture
          </CustomButton>
        </CustomCard>
      </div>

      {/* Quick Actions - Different based on profile */}
      <CustomCard className="quick-actions-card">
        <h3>Azioni Rapide</h3>
        <div className="quick-actions-grid">
          <CustomButton variant="outline" className="quick-action-btn">
            <Receipt className="icon-lg" />
            <div className="quick-action-text">
              <div>
                {features?.invoicing === 'mandatory' ? 'Nuova Fattura SdI' : 'Nuova Fattura'}
              </div>
              <div className="quick-action-subtext">
                {features?.invoicing === 'mandatory' ? 'Elettronica obbligatoria' : 'Crea e invia'}
              </div>
            </div>
          </CustomButton>
          
          <CustomButton variant="outline" className="quick-action-btn">
            <CreditCard className="icon-lg" />
            <div className="quick-action-text">
              <div>Registra Spesa</div>
              <div className="quick-action-subtext">Carica documento</div>
            </div>
          </CustomButton>
          
          {features?.vatManagement && (
            <CustomButton variant="outline" className="quick-action-btn">
              <Percent className="icon-lg" />
              <div className="quick-action-text">
                <div>Liquidazione IVA</div>
                <div className="quick-action-subtext">Calcola e versa</div>
              </div>
            </CustomButton>
          )}
          
          {!features?.vatManagement && (
            <CustomButton variant="outline" className="quick-action-btn">
              <FileText className="icon-lg" />
              <div className="quick-action-text">
                <div>Genera F24</div>
                <div className="quick-action-subtext">Paga imposte</div>
              </div>
            </CustomButton>
          )}
          
          <CustomButton variant="outline" className="quick-action-btn">
            <Clock className="icon-lg" />
            <div className="quick-action-text">
              <div>Chiedi all'AI</div>
              <div className="quick-action-subtext">Assistenza fiscale</div>
            </div>
          </CustomButton>
        </div>
      </CustomCard>
    </div>
  );
}