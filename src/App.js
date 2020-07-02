import React, { lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import Header from './components/Header'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const RaporAr = lazy(() => import('./pages/RaporAr'))
const Persil = lazy(() => import('./pages/Persil'))
const ExtraEffort = lazy(() => import('./pages/Persil/ExtraEffort'))
const PenambahanWP = lazy(() => import('./pages/Persil/PenambahanWP'))
const PembayaranWPBaru = lazy(() => import('./pages/Persil/PembayaranWPBaru'))
const KepatuhanWPBaru = lazy(() => import('./pages/Persil/KepatuhanWPBaru'))
const Tagging = lazy(() => import('./pages/Persil/Tagging'))
const Penerimaan = lazy(() => import('./pages/Penerimaan'))
const PerBln = lazy(() => import('./pages/Penerimaan/PerBln'))
const PerThnDaftar = lazy(() => import('./pages/Penerimaan/PerThnDaftar'))
const PerSbrData = lazy(() => import('./pages/Penerimaan/PerSbrData'))
const PerJnsWP = lazy(() => import('./pages/Penerimaan/PerJnsWP'))
const Pengawasan = lazy(() => import('./pages/Pengawasan'))
const PembayaranMasa = lazy(() => import('./pages/Pengawasan/PembayaranMasa'))

const App = () => {
  const routes = [
    { title: 'Dashboard', link: '/', component: Dashboard },
    { title: 'Rapor AR', link: '/rapor-ar', component: RaporAr },
    { title: 'Persil', children: [
      { title: 'Persil', link: '/persil', component: Persil },
      { title: 'Extra Effort', link: '/persil/ee', component: ExtraEffort },
      { title: 'Penambahan WP', link: '/persil/wp-baru', component: PenambahanWP },
      { title: 'Pembayaran WP Baru', link: '/persil/wp-baru-bayar', component: PembayaranWPBaru },
      { title: 'Kepatuhan WP Baru', link: '/persil/wp-patuh', component: KepatuhanWPBaru },
      { title: 'Tagging', link: '/persil/tagging', component: Tagging },
    ]},
    { title: 'Penerimaan', children: [
      { title: 'Penerimaan', link: '/penerimaan', component: Penerimaan },
      { title: 'Per Bulan', link: '/penerimaan/per-bln', component: PerBln },
      { title: 'Per Tahun Daftar', link: '/penerimaan/per-thn-daftar', component: PerThnDaftar },
      { title: 'Per Sumber Data', link: '/penerimaan/per-sbr-data', component: PerSbrData },
      { title: 'Per Jenis WP', link: '/penerimaan/per-jns-wp', component: PerJnsWP },
    ]},
    { title: 'Pengawasan', children: [
      { title: 'Pengawasan', link: '/pengawasan', component: Pengawasan },
      { title: 'Pembayaran Masa', link: '/pengawasan/pembayaran-masa', component: PembayaranMasa },
    ]}
  ]
  
  return (
    <div className="App">
      <Router>
        <Header sections={ routes }/>
        <Routes routes={ routes } />
      </Router>
    </div>
  )
}

export default App