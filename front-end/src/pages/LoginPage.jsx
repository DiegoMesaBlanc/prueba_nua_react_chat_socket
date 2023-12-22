import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signin, isAuthenticated, errors: ApiErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (values) => {
    signin(values)
  })

  useEffect(() => {
    if (isAuthenticated) navigate('/chat')
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className='text-2xl font-bold'>Portal NUA</h1>

        {ApiErrors.length > 0 &&
          ApiErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white' key={i}>
              {error}
            </div>
          ))}

        <br />

        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            {...register('email', { required: true })}
            placeholder='Correo electrónico...'
          />
          {errors.email && (
            <p className='text-red-500'>El correo es requerido</p>
          )}

          <input
            type='password'
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            {...register('password', { required: true })}
            placeholder='Contraseña...'
          />
          {errors.password && (
            <p className='text-red-500'>La contraseña es requerida</p>
          )}

          <button
            type='submit'
            className='my-2 px-5 py-2 bg-purple-900 rounded-md'
          >
            Ingresar
          </button>
        </form>

        <br />
        <br />

        <p className='flex gap-x-2 justify-between'>
          ¿No tienes una cuenta?{' '}
          <strong className='text-purple-900'>
            <Link to='/registro'>Registrate</Link>
          </strong>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
