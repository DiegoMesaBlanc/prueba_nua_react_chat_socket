import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<h1 className='text-4xl font-bold'>Home Page</h1>}
          />
          <Route path='/ingreso' element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/chat' element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
