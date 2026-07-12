import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/onest/index.css'
import '@fontsource-variable/unbounded/index.css'
import './index.css'
import App from './App'
import { initMetrika } from './lib/metrika'

initMetrika()

/*
 * Публичные роуты пререндерятся в статический HTML (scripts/prerender.mjs):
 * краулеры и первый пейнт получают готовую разметку, затем React
 * перерисовывает контейнер тем же контентом.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
