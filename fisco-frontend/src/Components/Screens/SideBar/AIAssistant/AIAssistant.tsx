import { useState } from "react";
import { 
  Sparkles,
  Send,
  FileText,
  Calculator,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import "./AIAssistant.css";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface SuggestedQuestion {
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  color: string;
}

interface Insight {
  title: string;
  description: string;
  action: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: 'Ciao Mario! 👋 Sono il tuo assistente fiscale AI. Posso aiutarti con domande su deduzioni, scadenze, regime forfettario e molto altro. Come posso aiutarti oggi?',
      timestamp: '10:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      icon: Calculator,
      question: 'Quali sono le prossime scadenze fiscali?',
      color: 'emerald'
    },
    {
      icon: TrendingUp,
      question: 'Come posso ottimizzare le mie deduzioni?',
      color: 'blue'
    },
    {
      icon: FileText,
      question: 'Cosa posso dedurre nel regime forfettario?',
      color: 'purple'
    },
    {
      icon: HelpCircle,
      question: 'Come funziona la ritenuta d\'acconto?',
      color: 'amber'
    }
  ];

  const quickInsights: Insight[] = [
    {
      title: 'Analisi Spese Gennaio',
      description: 'Le tue spese software sono aumentate del 15%. Verifica se tutti gli abbonamenti sono necessari.',
      action: 'Vedi dettagli',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Ottimizzazione Fiscale',
      description: 'Hai ancora €3.200 di margine prima del limite forfettario. Puoi emettere nuove fatture.',
      action: 'Calcola limite',
      icon: Calculator,
      color: 'emerald'
    },
    {
      title: 'Suggerimento Deduzioni',
      description: 'Hai spese per formazione professionali non categorizzate. Potrebbero essere deducibili.',
      action: 'Rivedi spese',
      icon: Lightbulb,
      color: 'amber'
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'Grazie per la tua domanda. In base alla tua situazione in regime forfettario, ecco cosa devi sapere...',
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);

    setInputMessage('');
  };

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' | 'bg-gradient') => {
    const colorMap: Record<string, Record<string, string>> = {
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        'bg-gradient': 'from-emerald-50 to-teal-50'
      },
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        'bg-gradient': ''
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        'bg-gradient': ''
      },
      amber: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        'bg-gradient': ''
      }
    };
    return colorMap[color]?.[type] || '';
  };

  return (
    <div className="ai-assistant-container">
      {/* Header */}
      <div className="ai-header">
        <div>
          <div className="header-title">
            <div className="ai-logo">
              <Sparkles className="ai-logo-icon" />
            </div>
            <h2>Assistente AI</h2>
          </div>
          <p className="ai-subtitle">
            Consulenza fiscale intelligente, disponibile 24/7
          </p>
        </div>
        <div className="online-badge">
          <div className="pulse-dot" />
          Online
        </div>
      </div>

      {/* Main Content */}
      <div className="ai-main-content">
        {/* Chat Area */}
        <div className="ai-chat-card">
          {/* Messages */}
          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${message.type === 'user' ? 'ai-message-user' : 'ai-message-assistant'}`}
              >
                <div className={`ai-message-bubble ${message.type === 'user' ? 'ai-message-user-bubble' : 'ai-message-assistant-bubble'}`}>
                  {message.type === 'assistant' && (
                    <div className="ai-message-header">
                      <Sparkles className="ai-assistant-icon" />
                      <span className="ai-assistant-name">FiscoAI</span>
                    </div>
                  )}
                  <p className="ai-message-content">{message.content}</p>
                  <p className={`ai-message-timestamp ${message.type === 'user' ? 'ai-message-timestamp-user' : ''}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="ai-suggested-questions">
              <p className="ai-suggested-title">Domande frequenti:</p>
              <div className="ai-suggested-grid">
                {suggestedQuestions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      className="ai-suggested-button"
                      onClick={() => setInputMessage(item.question)}
                    >
                      <Icon className={`ai-suggested-icon ${getColorClasses(item.color, 'text')}`} />
                      <span className="ai-suggested-text">{item.question}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="ai-input-area">
            <div className="ai-input-group">
              <input
                className="ai-input"
                placeholder="Chiedi qualsiasi cosa sul fisco italiano..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="ai-send-button"
                onClick={handleSendMessage}
              >
                <Send className="ai-send-icon" />
              </button>
            </div>
            <p className="ai-disclaimer">
              L'AI può commettere errori. Verifica informazioni importanti.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="ai-sidebar">
          {/* Quick Insights */}
          <div className="ai-insights-card">
            <h3 className="ai-card-title">Insights Intelligenti</h3>
            <div className="ai-insights-list">
              {quickInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={index}
                    className={`ai-insight ${getColorClasses(insight.color, 'bg')} ${getColorClasses(insight.color, 'border')}`}
                  >
                    <div className="ai-insight-header">
                      <div className={`ai-insight-icon-container ${getColorClasses(insight.color, 'bg').replace('50', '100')}`}>
                        <Icon className={`ai-insight-icon ${getColorClasses(insight.color, 'text')}`} />
                      </div>
                      <div className="ai-insight-content">
                        <div className={`ai-insight-title ${getColorClasses(insight.color, 'text')}`}>
                          {insight.title}
                        </div>
                        <p className={`ai-insight-description ${getColorClasses(insight.color, 'text').replace('700', '600')}`}>
                          {insight.description}
                        </p>
                      </div>
                    </div>
                    <button 
                      className={`ai-insight-button ${getColorClasses(insight.color, 'border').replace('200', '300')}`}
                    >
                      {insight.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Help Topics */}
          <div className="ai-help-card">
            <h3 className="ai-card-title">Guide Utili</h3>
            <div className="ai-help-list">
              <button className="ai-help-button">
                <FileText className="ai-help-icon" />
                Guida Regime Forfettario
              </button>
              <button className="ai-help-button">
                <Calculator className="ai-help-icon" />
                Calcolo Imposte 2025
              </button>
              <button className="ai-help-button">
                <CheckCircle2 className="ai-help-icon" />
                Checklist Adempimenti
              </button>
              <button className="ai-help-button">
                <HelpCircle className="ai-help-icon" />
                FAQ Fiscali
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className={`ai-stats-card ${getColorClasses('emerald', 'bg-gradient')}`}>
            <div className="ai-stats-content">
              <div className="ai-stats-icon-container">
                <Sparkles className="ai-stats-icon" />
              </div>
              <div className="ai-stats-number">127 domande risolte</div>
              <p className="ai-stats-description">
                Hai risparmiato oltre 15 ore di ricerca fiscale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}