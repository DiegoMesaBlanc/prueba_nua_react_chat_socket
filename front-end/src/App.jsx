import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import ChatList from './pages/ChatList'

function App() {
  return (
    <AuthProvider>
      <Router>
        <main className='container mx-auto'>
          <Navbar />

          <Routes>
            <Route
              path='/'
              element={<h1 className='text-4xl font-bold'>Home Page</h1>}
            />
            <Route path='/ingreso' element={<LoginPage />} />
            <Route path='/registro' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/chat-lista' element={<ChatList />} />
              <Route path='/chat' element={<ChatPage />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App
