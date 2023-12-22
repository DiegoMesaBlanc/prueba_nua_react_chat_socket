import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('/')

function ChatPage() {
  const [message, setMessage] = useState('')
  const [carryMessages, setCarryMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setCarryMessages([...carryMessages, { body: message, from: 'Me' }])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', getMessages)

    return () => {
      socket.off('message', getMessages)
    }
  }, [])

  const getMessages = (mssg) => setCarryMessages((state) => [...state, mssg])

  return (
    <div className='flex h-[calc(100vh-0px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <ul>
          {carryMessages.map((mss, i) => (
            <li
              key={mss.from + i}
              className={`my-2 px-4 py-2 max-w-80 rounded-md ${
                mss.from === 'Me'
                  ? 'bg-purple-400 ml-auto text-black'
                  : 'bg-yellow-100 text-black'
              }`}
            >
              <span className='text-xs font-bold'>
                {mss.from !== 'Me' ? 'Otro' : 'Me'}:
              </span>{' '}
              {mss.body}
            </li>
          ))}
        </ul>

        <form
          className='flex gap-x-4 w-full items-center justify-center'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            value={message}
            placeholder='Type your message...'
            onChange={(e) => setMessage(e.target.value)}
            className='w-72 bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <button
            type='submit'
            className='my-2 px-5 py-2 bg-purple-900 rounded-md'
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage
