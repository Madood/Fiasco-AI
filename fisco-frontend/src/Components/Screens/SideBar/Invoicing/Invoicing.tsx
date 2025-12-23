import { useState } from "react";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Euro,
  ChevronDown,
  Calendar,
  Building
} from "lucide-react";
import "./Invoicing.css";

interface Invoice {
  id: number;
  number: string;
  client: string;
  clientVat: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  sdiStatus: 'delivered' | 'accepted' | 'rejected';
}

export default function Invoicing() {
  const [showNewInvoiceDialog, setShowNewInvoiceDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newInvoiceData, setNewInvoiceData] = useState({
    number: 'FT-2025-005',
    date: '2025-01-17',
    client: '',
    clientName: '',
    clientVat: '',
    clientAddress: '',
    clientPec: '',
    paymentTerms: '30',
    notes: ''
  });

  const invoices: Invoice[] = [
    {
      id: 1,
      number: 'FT-2025-004',
      client: 'Studio Design SRL',
      clientVat: '12345678901',
      date: '15 Gen 2025',
      dueDate: '14 Feb 2025',
      amount: 1500,
      status: 'paid',
      sdiStatus: 'delivered'
    },
    {
      id: 2,
      number: 'FT-2025-003',
      client: 'TechFlow SpA',
      clientVat: '98765432109',
      date: '12 Gen 2025',
      dueDate: '11 Feb 2025',
      amount: 2200,
      status: 'paid',
      sdiStatus: 'delivered'
    },
    {
      id: 3,
      number: 'FT-2025-002',
      client: 'Marketing Pro',
      clientVat: '45612378901',
      date: '08 Gen 2025',
      dueDate: '07 Feb 2025',
      amount: 850,
      status: 'pending',
      sdiStatus: 'accepted'
    },
    {
      id: 4,
      number: 'FT-2025-001',
      client: 'Consulting Group SRL',
      clientVat: '78945612301',
      date: '03 Gen 2025',
      dueDate: '02 Feb 2025',
      amount: 3500,
      status: 'overdue',
      sdiStatus: 'delivered'
    },
    {
      id: 5,
      number: 'FT-2024-087',
      client: 'Digital Agency',
      clientVat: '32165498701',
      date: '28 Dic 2024',
      dueDate: '27 Gen 2025',
      amount: 1200,
      status: 'pending',
      sdiStatus: 'delivered'
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (statusFilter !== 'all' && invoice.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        invoice.number.toLowerCase().includes(query) ||
        invoice.client.toLowerCase().includes(query) ||
        invoice.clientVat.includes(query) ||
        invoice.amount.toString().includes(query)
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="status-badge status-paid">Pagata</span>;
      case 'pending':
        return <span className="status-badge status-pending">In Attesa</span>;
      case 'overdue':
        return <span className="status-badge status-overdue">Scaduta</span>;
      default:
        return <span className="status-badge">-</span>;
    }
  };

  const getSdiStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="sdi-badge sdi-delivered">Consegnata</span>;
      case 'accepted':
        return <span className="sdi-badge sdi-accepted">Accettata</span>;
      case 'rejected':
        return <span className="sdi-badge sdi-rejected">Rifiutata</span>;
      default:
        return <span className="sdi-badge">In Elaborazione</span>;
    }
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'paid').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    overdue: invoices.filter(i => i.status === 'overdue').length,
    totalAmount: invoices.reduce((sum, i) => sum + i.amount, 0),
    paidAmount: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateInvoice = () => {
    console.log('Creating invoice:', newInvoiceData);
    setShowNewInvoiceDialog(false);
    // Reset form
    setNewInvoiceData({
      number: 'FT-2025-005',
      date: '2025-01-17',
      client: '',
      clientName: '',
      clientVat: '',
      clientAddress: '',
      clientPec: '',
      paymentTerms: '30',
      notes: ''
    });
  };

  return (
    <div className="invoicing-container">
      {/* Header */}
      <div className="invoicing-header">
        <div className="header-content">
          <h2>Fatturazione Elettronica</h2>
          <p>
            Gestisci le tue fatture e inviale tramite Sistema di Interscambio (SdI)
          </p>
        </div>
        <button 
          className="new-invoice-btn"
          onClick={() => setShowNewInvoiceDialog(true)}
        >
          <Plus className="icon-sm" />
          Nuova Fattura
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Totale Fatture</div>
            <Receipt className="icon-md stat-icon" />
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-amount">
            € {stats.totalAmount.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Pagate</div>
            <CheckCircle2 className="icon-md stat-icon-paid" />
          </div>
          <div className="stat-value">{stats.paid}</div>
          <div className="stat-amount-paid">
            € {stats.paidAmount.toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">In Attesa</div>
            <Clock className="icon-md stat-icon-pending" />
          </div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-amount-pending">
            € {invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Scadute</div>
            <XCircle className="icon-md stat-icon-overdue" />
          </div>
          <div className="stat-value">{stats.overdue}</div>
          <div className="stat-amount-overdue">
            € {invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
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
              placeholder="Cerca per numero, cliente o importo..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <div className="select-wrapper">
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tutte</option>
                <option value="paid">Pagate</option>
                <option value="pending">In Attesa</option>
                <option value="overdue">Scadute</option>
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

      {/* Invoices Table */}
      <div className="invoices-card">
        <div className="table-container">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Scadenza</th>
                <th className="text-right">Importo</th>
                <th>Stato Pagamento</th>
                <th>Stato SdI</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <div className="invoice-number">
                      <div className="invoice-icon">
                        <Receipt className="icon-sm" />
                      </div>
                      <span>{invoice.number}</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-info">
                      <div className="client-name">{invoice.client}</div>
                      <div className="client-vat">{invoice.clientVat}</div>
                    </div>
                  </td>
                  <td className="invoice-date">{invoice.date}</td>
                  <td className="invoice-due-date">{invoice.dueDate}</td>
                  <td className="text-right invoice-amount">
                    € {invoice.amount.toLocaleString()}
                  </td>
                  <td>
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td>
                    {getSdiStatusBadge(invoice.sdiStatus)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="Visualizza">
                        <Eye className="icon-xs" />
                      </button>
                      <button className="action-btn" title="Modifica">
                        <Edit className="icon-xs" />
                      </button>
                      <button className="action-btn" title="Download PDF">
                        <Download className="icon-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Dialog */}
      {showNewInvoiceDialog && (
        <>
          <div className="dialog-overlay" onClick={() => setShowNewInvoiceDialog(false)} />
          <div className="dialog">
            <div className="dialog-header">
              <h3>Crea Nuova Fattura</h3>
              <p>Compila i dati per generare una fattura elettronica conforme allo SdI</p>
              <button 
                className="dialog-close-btn"
                onClick={() => setShowNewInvoiceDialog(false)}
              >
                ×
              </button>
            </div>
            <div className="dialog-content">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="invoice-number">Numero Fattura</label>
                  <input 
                    id="invoice-number" 
                    name="number"
                    placeholder="FT-2025-005" 
                    value={newInvoiceData.number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="invoice-date">Data Emissione</label>
                  <input 
                    id="invoice-date" 
                    name="date"
                    type="date" 
                    value={newInvoiceData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="client-select">Cliente</label>
                <div className="select-wrapper">
                  <select 
                    id="client-select" 
                    name="client"
                    value={newInvoiceData.client}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleziona cliente esistente o creane uno nuovo</option>
                    <option value="new">+ Nuovo Cliente</option>
                    <option value="client1">Studio Design SRL</option>
                    <option value="client2">TechFlow SpA</option>
                    <option value="client3">Marketing Pro</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="client-name">Ragione Sociale</label>
                  <input 
                    id="client-name" 
                    name="clientName"
                    placeholder="Nome azienda cliente" 
                    value={newInvoiceData.clientName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="client-vat">P.IVA Cliente</label>
                  <input 
                    id="client-vat" 
                    name="clientVat"
                    placeholder="12345678901" 
                    value={newInvoiceData.clientVat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="client-address">Indirizzo</label>
                <input 
                  id="client-address" 
                  name="clientAddress"
                  placeholder="Via, Numero civico, CAP, Città" 
                  value={newInvoiceData.clientAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="client-pec">PEC / Codice Destinatario</label>
                <input 
                  id="client-pec" 
                  name="clientPec"
                  placeholder="email@pec.it o 1234567" 
                  value={newInvoiceData.clientPec}
                  onChange={handleInputChange}
                />
              </div>

              <div className="invoice-items-section">
                <label className="section-label">Righe Fattura</label>
                <div className="invoice-items">
                  <div className="invoice-item-row">
                    <input className="item-desc" placeholder="Descrizione servizio" />
                    <input className="item-qty" type="number" placeholder="Qtà" defaultValue="1" />
                    <input className="item-price" type="number" placeholder="Prezzo" />
                    <input className="item-vat" type="number" placeholder="IVA %" defaultValue="22" />
                    <button className="item-delete-btn">
                      <Trash2 className="icon-xs" />
                    </button>
                  </div>
                </div>
                <button className="add-item-btn">
                  <Plus className="icon-xs" />
                  Aggiungi Riga
                </button>
              </div>

              <div className="invoice-summary">
                <div className="summary-row">
                  <span>Imponibile</span>
                  <span>€ 0.00</span>
                </div>
                <div className="summary-row">
                  <span>IVA 22%</span>
                  <span>€ 0.00</span>
                </div>
                <div className="summary-total">
                  <span>Totale</span>
                  <span>€ 0.00</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="payment-terms">Termini di Pagamento</label>
                <div className="select-wrapper">
                  <select 
                    id="payment-terms" 
                    name="paymentTerms"
                    value={newInvoiceData.paymentTerms}
                    onChange={handleInputChange}
                  >
                    <option value="0">Immediato</option>
                    <option value="30">30 giorni</option>
                    <option value="60">60 giorni</option>
                    <option value="90">90 giorni</option>
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Note</label>
                <textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Note aggiuntive (opzionale)" 
                  value={newInvoiceData.notes}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
            <div className="dialog-footer">
              <button 
                className="dialog-btn-secondary"
                onClick={() => setShowNewInvoiceDialog(false)}
              >
                Annulla
              </button>
              <button className="dialog-btn-outline">
                <FileText className="icon-xs" />
                Salva Bozza
              </button>
              <button 
                className="dialog-btn-primary"
                onClick={handleCreateInvoice}
              >
                <Send className="icon-xs" />
                Invia tramite SdI
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}