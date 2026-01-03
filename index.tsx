
console.log("FocusFlow: index.tsx 脚本开始加载...");

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("FocusFlow: 核心依赖已就绪");

const container = document.getElementById('root');

if (!container) {
  console.error("FocusFlow: 无法找到根节点 #root");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("FocusFlow: React 渲染已启动");
  } catch (err) {
    console.error("FocusFlow: 挂载异常", err);
    const log = document.getElementById('mobile-error-log');
    if (log) {
      log.style.display = 'block';
      log.innerHTML += `<div style="padding:15px; background:#fff1f2; border:2px solid #f43f5e; border-radius:12px;">
        <h3 style="margin-top:0; color:#e11d48">React 初始化失败</h3>
        <p>${err instanceof Error ? err.message : String(err)}</p>
      </div>`;
    }
  }
}
