import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//config time
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
