import { useTechAgent } from './lib/techagent'
import Header from './screens/Header'
import Footer from './screens/Footer'
import Landing from './screens/Landing'
import Catalog from './screens/Catalog'
import Product from './screens/Product'
import How from './screens/How'
import Cabinet from './screens/Cabinet'
import Pay from './screens/Pay'

export default function App() {
  const app = useTechAgent()
  return (
    <>
      <Header app={app} />

      {app.toast && (
        <div style={{ position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 120, display: 'flex', alignItems: 'center', gap: 10, background: '#0B1020', color: '#fff', padding: '14px 20px', borderRadius: 14, boxShadow: '0 18px 50px rgba(11,16,32,.35)', fontWeight: 500, fontSize: 14.5, animation: 'ta-fade .3s ease' }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#12B981', display: 'grid', placeItems: 'center', flex: 'none' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5 11-11" /></svg></span>
          {app.toast}
        </div>
      )}

      <main style={{ minHeight: '60vh' }}>
        {app.isLanding && <Landing app={app} />}
        {app.isCatalog && <Catalog app={app} />}
        {app.isProduct && <Product app={app} />}
        {app.isHow && <How app={app} />}
        {app.isCabinet && <Cabinet app={app} />}
        {app.isPay && <Pay app={app} />}
      </main>

      {app.showFooter && <Footer app={app} />}
    </>
  )
}
