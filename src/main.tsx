import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// scripts/prerender.mjs sets data-prerendered="true" on snapshot output.
// Dev mode (vite serve) sends the empty shell — fall back to createRoot.
if (container.hasAttribute('data-prerendered')) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
