/* eslint-disable multiline-ternary */
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className='bg-zinc-700 my-2 flex justify-between py-5 px-10'>
      <h1 className='text-2xl font-bold'>CHAT - NUA</h1>

      <ul className='flex gap-x-4'>
        {isAuthenticated ? (
          <li className='bg-purple-900 px-4 py-2 rounded-md'>
            <Link to='/ingreso' onClick={() => logout()}>
              Cerrar sesión
            </Link>
          </li>
        ) : (
          <>
            <li className='bg-purple-900 px-4 py-2 rounded-md'>
              <Link to='/ingreso'>Ingreso</Link>
            </li>
            <li className='bg-purple-900 px-4 py-2 rounded-md'>
              <Link to='/registro'>Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
