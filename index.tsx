
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // 隐藏加载提示
    const timeoutMsg = document.getElementById('loading-timeout-msg');
    if (timeoutMsg) timeoutMsg.style.display = 'none';
    
    console.log("FocusFlow application initialized successfully.");
  } catch (error) {
    console.error("Critical: Failed to mount React application", error);
    const log = document.getElementById('mobile-error-log');
    if (log) {
      log.style.display = 'block';
      log.innerHTML += `<div><b>[React挂载失败]:</b> ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  }
} else {
  console.error("Critical: Root element #root not found in the DOM.");
}
