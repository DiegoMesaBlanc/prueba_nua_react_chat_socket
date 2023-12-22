import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('/', {
  auth: {
    serverOffset: 0,
    user: 'NU4-CH4T'
  }
})

function ChatPage() {
  const [message, setMessage] = useState('')
  const [carryMessages, setCarryMessages] = useState([])
  const messagesEndRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setCarryMessages([...carryMessages, { mssg: message, id: socket.id }])
    socket.emit('message', message)
    setMessage('')
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [carryMessages])

  useEffect(() => {
    socket.on('message', getMessages)

    return () => {
      socket.off('message', getMessages)
    }
  }, [])

  const getMessages = (mssg) => setCarryMessages((state) => [...state, mssg])

  return (
    <div className='flex flex-col gap-10 h-[calc(100dvh-100px)] items-center justify-center colum'>
      <div className='bg-zinc-800 max-w-lg w-full p-7 rounded-md'>
        <ul className='max-h-80 overflow-y-auto p-3 max-w-lg'>
          {carryMessages.map((messag, i) => (
            <li
              key={messag.id + i}
              className={`my-2 px-4 py-2 max-w-80 rounded-md text-wrap truncate ${
                messag.id === socket.id
                  ? 'bg-purple-400 ml-auto text-black'
                  : 'bg-yellow-100 text-black'
              }`}
            >
              <span className='text-xs font-bold'>
                {messag.id !== socket.id ? 'Otro' : 'Me'}:
              </span>{' '}
              {messag.mssg}
            </li>
          ))}

          <div ref={messagesEndRef} />
        </ul>

        <form
          className='flex gap-x-4 w-full items-center justify-center pt-5'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            value={message}
            placeholder='Escribe tu mensaje...'
            onChange={(e) => setMessage(e.target.value)}
            className='w-96 bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <button
            type='submit'
            className='my-2 px-5 py-2 bg-purple-900 rounded-md'
          >
            Enviar
          </button>
        </form>
      </div>

      <button className='my-2 px-5 py-2 outline outline-offset-2 outline-purple-900 rounded-md'>
        <Link to='/chat-lista'>Ir a lista de mensajes</Link>
      </button>
    </div>
  )
}

export default ChatPage
