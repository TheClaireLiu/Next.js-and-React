import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 在index.html文件中，ID为root的div，应该呈现render()括号里的代码。
// <App />指的是 app.jsx文件，
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
