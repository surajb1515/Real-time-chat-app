import React, { useEffect, useState } from 'react'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig';
import { ID, Query } from 'appwrite'


const Room = () => {

  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([])
  // const { user } = useAuth()



  useEffect(() => {
    getMessages()
  }, [])


  // to show the data form the data base
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    )
    console.log(response)
    setMessages(response.documents)
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      body: messageBody
    }

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,

    )

    console.log("Created", response)

    setMessages(prevState => [response, ...messages])

    setMessageBody('')
  }


  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    );
    setMessages(prevState => prevState.filter(message => message.$id !== message_id))
  }





  return (
    <main className='container'>
      <div className='room--container'>

        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="250"
              placeholder="Say something..."
              onChange={(e) => { setMessageBody(e.target.value) }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input
              className="btn btn--secondary"
              type="submit"
              value="send"
            />
          </div>
        </form>


        <div>
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
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                  <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />

                )}
              </div>

              {/* <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner' : '')}>
            <span>{message.body}</span>

          </div> */}


            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Room
