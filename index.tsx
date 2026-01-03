
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Init Error:", error);
    const log = document.getElementById('mobile-error-log');
    if (log) {
      log.style.display = 'block';
      log.innerHTML += `<div><b>React Render Error:</b> ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  }
};

// 确保 DOM 加载完成后再挂载
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
