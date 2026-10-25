import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Applications from './pages/Applications.jsx'
import Tournaments from './pages/Tournaments.jsx'
import Landing from './pages/Landing.jsx'
import Directory from './pages/Directory.jsx'
import Payments from './pages/Payments.jsx'
import Complaints from './pages/Complaints.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <div className="shell">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/arizalar" element={<Applications />} />
        <Route path="/turnirlar" element={<Tournaments />} />
        <Route path="/landing" element={<Landing key="landing" />} />
        <Route path="/homiylar" element={<Landing key="spons" initialSection="spons" />} />
        <Route path="/klublar" element={<Directory key="klub" initialTab="klub" />} />
        <Route path="/foydalanuvchilar" element={<Directory key="foyd" initialTab="foyd" />} />
        <Route path="/tolovlar" element={<Payments />} />
        <Route path="/shikoyatlar" element={<Complaints />} />
        <Route path="/sozlamalar" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
