import React, { useEffect, useState } from 'react'
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig';
import { ID, Query } from 'appwrite'
import { Trash2 } from 'react-feather'





const Room = () => {

  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([])
  // const { user } = useAuth()




  useEffect(() => {
    getMessages();

    // SUBSCRIBE TO SOME EVENTS
    // SUBSCRIBING TO CREATE, UPDATA , DELETE METHODS

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A MESSAGE WAS CREATED')
        setMessages(prevState => [response.payload, ...prevState])
      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A MESSAGE WAS DELETED!!!')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
    });

    console.log('unsubscribe:', unsubscribe)


    //  CLEAN UP FUNCTION AS SUBSCRIBE IS CALLED TWICE 
    return () => {
      unsubscribe();
    };
  }, []);






  // TO POPULATE MESSAGES FORM THE DATABASE INTO OUR UI----->

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt'),    // for the desending order 
        Query.limit(20)                 // to limit the response data 
      ]
    )
    console.log(response)
    setMessages(response.documents)
  }






  // TO SEND THE MESSAGE AND TO STORE IT IN OUT DATABASE----------->

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      body: messageBody
    }

    // to create the message into our dataBase
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),              // unique id to distinguish
      payload,
    )

    console.log("Created", response)

    // to add the message into our setMessages array
    setMessages(prevState => [response, ...messages])

    setMessageBody('')      // to clear the input text area after sending the message
  }







  // DELETE THE MESSAGE ---->

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
                {/* {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                  <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />

                )} */}
                <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />
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
