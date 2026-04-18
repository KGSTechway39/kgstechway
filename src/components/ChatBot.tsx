import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import './ChatBot.css';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'How can I contact KGS Techway?',
  'Do you offer QA testing?',
  'Tell me about AI solutions',
];

/** Renders plain-text bot replies with basic markdown formatting */
function formatBotText(text: string) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="bot-list">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const renderInline = (s: string): ReactNode => {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      elements.push(<br key={key++} />);
    } else if (/^[-•*]\s+/.test(trimmed)) {
      listItems.push(trimmed.replace(/^[-•*]\s+/, ''));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
    } else if (/^#{1,3}\s+/.test(trimmed)) {
      flushList();
      elements.push(<p key={key++} className="bot-heading">{renderInline(trimmed.replace(/^#{1,3}\s+/, ''))}</p>);
    } else {
      flushList();
      elements.push(<p key={key++}>{renderInline(trimmed)}</p>);
    }
  }
  flushList();
  return <div className="bot-formatted">{elements}</div>;
}

const ChatBot = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi! I'm **KGS Assistant** 👋 How can I help you today?\n\nAsk me about our services, pricing, or anything tech-related!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
      setHasNewMessage(false);
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const history = updatedMessages.slice(0, -1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await response.json();
      const botMessage: Message = {
        role: 'model',
        text: data.reply || 'Sorry, I could not get a response. Please try again.',
      };

      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Sorry, something went wrong. Please try again or contact us at sales@kgstechway.com',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${isDarkMode ? 'dark' : 'light'}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span>KGS</span>
              </div>
              <div>
                <div className="chatbot-name">KGS Assistant</div>
                <div className="chatbot-status">
                  <span className="status-dot" />
                  Powered by Groq AI · Online
                </div>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.role === 'model' && (
                  <div className="bot-avatar">K</div>
                )}
                <div className="message-bubble">
                  {msg.role === 'model' ? formatBotText(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message bot">
                <div className="bot-avatar">K</div>
                <div className="message-bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about KGS Techway..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      <button
        className={`chatbot-bubble ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI chat assistant"
      >
        {isOpen ? (
          <span className="bubble-icon">✕</span>
        ) : (
          <>
            <span className="bubble-icon">💬</span>
            {hasNewMessage && <span className="bubble-badge" />}
          </>
        )}
      </button>
    </>
  );
};

export default ChatBot;
