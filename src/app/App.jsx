import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GlobalStyle from '@/styles/GlobalStyle'
import { AuthProvider } from '@/features/auth/AuthContext'
import ProtectedRoute from '@/features/auth/ProtectedRoute'
import LoginPage from '@/features/auth/LoginPage'
import AdminLayout from '@/layouts/AdminLayout'
import MaterialsRoute from '@/features/materials/MaterialsPage'
import { DEFAULT_PAGE } from '@/config/materials'

// New admin section = new <Route> inside AdminLayout (+ a sidebar entry in AdminLayout).
export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="materials/:page" element={<MaterialsRoute />} />
              <Route path="*" element={<Navigate to={`/materials/${DEFAULT_PAGE}`} replace />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
