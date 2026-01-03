
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
    console.log("FocusFlow 启动成功");
  } catch (error) {
    console.error("React 挂载失败:", error);
    const log = document.getElementById('mobile-error-log');
    if (log) {
      log.style.display = 'block';
      log.innerHTML += `<div><b>React 初始化失败:</b> ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  }
}
