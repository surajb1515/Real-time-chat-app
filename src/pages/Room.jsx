import React, { useEffect, useState } from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig';

const Room = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
    console.log(response)
    setMessages(response.documents)
  }



  return (
    <main className='container'>
      <div className='room--container'>
        {messages.map(message => (
          <div key={message.$id} className="message--wrapper">
            <div className="message--header">
              <p>
                {message?.username ? (
                  <span> {message?.username}</span>
                ) : (
                  'Anonymous user'
                )}

                <small className="message-timestamp"> {new Date(message.$createdAt).toLocaleString()}</small>
              </p>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
              {/* {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
              <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />

            )} */}
            </div>

            {/* <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner' : '')}>
            <span>{message.body}</span>

          </div> */}


          </div>
        ))}
      </div>
    </main>
  )
}

export default Room
