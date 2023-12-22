import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { messagesRequest } from '../api/chat'

function ChatList() {
  const [messageSaved, setMessageSaved] = useState([])

  useEffect(() => {
    const messagesSaved = async () => {
      try {
        const res = await messagesRequest()

        setMessageSaved(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    messagesSaved()
  }, [])

  return (
    <div>
      <ul>
        {messageSaved.map((message) => (
          <li key={message.sesion}>{message.mssg}</li>
        ))}
      </ul>

      <button className='my-2 px-5 py-2 bg-purple-900 rounded-md'>
        <Link to='/chat'>Iniciar chat</Link>
      </button>
    </div>
  )
}

export default ChatList
