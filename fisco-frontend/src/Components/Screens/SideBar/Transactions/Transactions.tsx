import { useState } from "react";
import { 
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Truck,
  Wifi,
  Coffee,
  Laptop,
  Fuel,
  ChevronDown,
  Info
} from "lucide-react";
import "./Transactions.css";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  deductible: boolean;
  icon: any;
  color: string;
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('2025-01');
  const [showNewTransaction, setShowNewTransaction] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 1,
      date: '15 Gen 2025',
      description: 'Abbonamento Adobe Creative Cloud',
      category: 'Software',
      type: 'expense',
      amount: 60.49,
      deductible: true,
      icon: Laptop,
      color: 'blue'
    },
    {
      id: 2,
      date: '14 Gen 2025',
      description: 'Bonifico da Studio Design SRL',
      category: 'Ricavo',
      type: 'income',
      amount: 1500,
      deductible: false,
      icon: ArrowDownRight,
      color: 'emerald'
    },
    {
      id: 3,
      date: '12 Gen 2025',
      description: 'Pranzo cliente - Ristorante La Terrazza',
      category: 'Rappresentanza',
      type: 'expense',
      amount: 85,
      deductible: true,
      icon: Coffee,
      color: 'purple'
    },
    {
      id: 4,
      date: '11 Gen 2025',
      description: 'Benzina - Viaggio cliente Milano',
      category: 'Trasporto',
      type: 'expense',
      amount: 65,
      deductible: true,
      icon: Fuel,
      color: 'amber'
    },
    {
      id: 5,
      date: '10 Gen 2025',
      description: 'Bonifico da TechFlow SpA',
      category: 'Ricavo',
      type: 'income',
      amount: 2200,
      deductible: false,
      icon: ArrowDownRight,
      color: 'emerald'
    },
    {
      id: 6,
      date: '08 Gen 2025',
      description: 'Spedizione documenti cliente',
      category: 'Spese Generali',
      type: 'expense',
      amount: 15.50,
      deductible: true,
      icon: Truck,
      color: 'rose'
    },
    {
      id: 7,
      date: '05 Gen 2025',
      description: 'Fibra internet studio',
      category: 'Utenze',
      type: 'expense',
      amount: 29.90,
      deductible: true,
      icon: Wifi,
      color: 'teal'
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (typeFilter !== 'all' && transaction.type !== typeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query)
      );
    }
    return true;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const deductibleExpenses = transactions
    .filter(t => t.type === 'expense' && t.deductible)
    .reduce((sum, t) => sum + t.amount, 0);

  const getIconColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      'blue': 'icon-blue',
      'emerald': 'icon-emerald',
      'purple': 'icon-purple',
      'amber': 'icon-amber',
      'rose': 'icon-rose',
      'teal': 'icon-teal'
    };
    return colorMap[color] || 'icon-default';
  };

  const getIconBgClass = (color: string): string => {
    const bgMap: Record<string, string> = {
      'blue': 'icon-bg-blue',
      'emerald': 'icon-bg-emerald',
      'purple': 'icon-bg-purple',
      'amber': 'icon-bg-amber',
      'rose': 'icon-bg-rose',
      'teal': 'icon-bg-teal'
    };
    return bgMap[color] || 'icon-bg-default';
  };

  return (
    <div className="transactions-container">
      {/* Header */}
      <div className="transactions-header">
        <div className="header-content">
          <h2>Transazioni</h2>
          <p>
            Monitora entrate, uscite e spese deducibili
          </p>
        </div>
        <button 
          className="new-transaction-btn"
          onClick={() => setShowNewTransaction(true)}
        >
          <Plus className="icon-sm" />
          Registra Transazione
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Entrate</div>
            <ArrowDownRight className="stat-icon-income" />
          </div>
          <div className="stat-value">
            € {totalIncome.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-change-income">
            +12% vs. mese scorso
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Uscite</div>
            <ArrowUpRight className="stat-icon-expense" />
          </div>
          <div className="stat-value">
            € {totalExpenses.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-change-expense">
            -5% vs. mese scorso
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Spese Deducibili</div>
            <Receipt className="stat-icon-deductible" />
          </div>
          <div className="stat-value">
            € {deductibleExpenses.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-change-deductible">
            {((deductibleExpenses / totalExpenses) * 100).toFixed(0)}% del totale
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="filters-card">
        <div className="filters-container">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Cerca transazioni..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <div className="select-wrapper">
              <select 
                className="filter-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tutte</option>
                <option value="income">Entrate</option>
                <option value="expense">Uscite</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
            <div className="select-wrapper">
              <select 
                className="filter-select"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="2025-01">Gennaio 2025</option>
                <option value="2024-12">Dicembre 2024</option>
                <option value="2024-11">Novembre 2024</option>
              </select>
              <ChevronDown className="select-arrow" />
            </div>
            <button className="filter-btn">
              <Filter className="icon-xs" />
              Filtri
            </button>
            <button className="filter-btn">
              <Download className="icon-xs" />
              Esporta
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        {filteredTransactions.map((transaction) => {
          const Icon = transaction.icon;
          const iconColorClass = getIconColorClass(transaction.color);
          const iconBgClass = getIconBgClass(transaction.color);
          
          return (
            <div 
              key={transaction.id} 
              className="transaction-item"
            >
              <div className={`transaction-icon ${iconBgClass}`}>
                <Icon className={`transaction-icon-svg ${iconColorClass}`} />
              </div>
              
              <div className="transaction-details">
                <div className="transaction-header">
                  <div className="transaction-description">{transaction.description}</div>
                  {transaction.deductible && (
                    <span className="deductible-badge">Deducibile</span>
                  )}
                </div>
                <div className="transaction-meta">
                  <span>{transaction.date}</span>
                  <span className="meta-separator">•</span>
                  <span>{transaction.category}</span>
                </div>
              </div>

              <div className={`transaction-amount ${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                <div className="amount-value">
                  {transaction.type === 'income' ? '+' : '-'} 
                  € {transaction.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Card */}
      <div className="tip-card">
        <div className="tip-content">
          <div className="tip-icon">
            <Receipt className="tip-icon-svg" />
          </div>
          <div>
            <h3 className="tip-title">💡 Suggerimento sulle spese deducibili</h3>
            <p className="tip-text">
              Nel regime forfettario non puoi dedurre le spese, ma è importante tracciarle per 
              analizzare la redditività. Nel regime semplificato puoi dedurre fino al 100% di 
              alcune categorie di spese.
            </p>
            <button className="tip-btn">
              Scopri di più
            </button>
          </div>
        </div>
      </div>

      {/* New Transaction Modal */}
      {showNewTransaction && (
        <>
          <div className="modal-overlay" onClick={() => setShowNewTransaction(false)} />
          <div className="new-transaction-modal">
            <div className="modal-header">
              <h3>Registra Nuova Transazione</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowNewTransaction(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="transaction-type">Tipo Transazione</label>
                <div className="select-wrapper">
                  <select id="transaction-type">
                    <option value="">Seleziona tipo</option>
                    <option value="income">Entrata</option>
                    <option value="expense">Uscita</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="transaction-amount">Importo</label>
                <input 
                  id="transaction-amount" 
                  type="number" 
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="transaction-description">Descrizione</label>
                <input 
                  id="transaction-description" 
                  type="text" 
                  placeholder="Descrizione della transazione"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="transaction-category">Categoria</label>
                <div className="select-wrapper">
                  <select id="transaction-category">
                    <option value="">Seleziona categoria</option>
                    <option value="ricavo">Ricavo</option>
                    <option value="software">Software</option>
                    <option value="rappresentanza">Rappresentanza</option>
                    <option value="trasporto">Trasporto</option>
                    <option value="utenze">Utenze</option>
                    <option value="spese-generali">Spese Generali</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="transaction-date">Data</label>
                <input 
                  id="transaction-date" 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <input 
                  id="transaction-deductible" 
                  type="checkbox"
                />
                <label htmlFor="transaction-deductible">Spesa deducibile</label>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn-secondary"
                onClick={() => setShowNewTransaction(false)}
              >
                Annulla
              </button>
              <button className="modal-btn-primary">
                Registra Transazione
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}