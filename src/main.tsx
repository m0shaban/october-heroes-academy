import { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State = { hasError: false };

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled App error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', backgroundColor: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#EAB308' }}>أكاديمية أبطال أكتوبر</h1>
          <p style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>حدث خطأ مؤقت في التحميل. يرجى إعادة تحديث الصفحة.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', backgroundColor: '#EAB308', color: '#001538', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            إعادة التحديث
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
}
