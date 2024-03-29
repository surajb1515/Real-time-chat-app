import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from 'appwrite';



// NAME OF THE CONTEXT -------->
const AuthContext = createContext()


export const AuthProvider = ({ children }) => {


  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()



  useEffect(() => {
    getUserOnLoad()
  }, [])







  // TO GET DETAILS OF THE ALREADY LOGGEDIN USER

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      console.log(accountDetails)

      setUser(accountDetails)
    }
    catch (error) {
      // console.log(error)
    }
    setLoading(false)
  }










  const handleUserLogin = async (e, credentials) => {
    e.preventDefault()
    console.log('CREDS:', credentials)

    try {
      let response = await account.createEmailSession(credentials.email, credentials.password)
      console.log("LOGGEDIN", response)

      // to get user account details
      let accountDetails = await account.get();
      setUser(accountDetails)
      navigate('/')
    }
    catch (error) {
      console.error("ERROR in handleUserLogin function ", error)
    }
  }









  const handleLogout = async () => {
    const response = await account.deleteSession('current');
    setUser(null)
  }










  const handleRegister = async (e, credentials) => {
    e.preventDefault()
    console.log('Handle Register triggered!', credentials)

    if (credentials.password1 !== credentials.password2) {
      alert('Passwords did not match!')
      return
    }

    try {

      let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
      console.log('User registered!', response)

      await account.createEmailSession(credentials.email, credentials.password1)
      let accountDetails = await account.get();
      setUser(accountDetails)
      navigate('/')
    }
    catch (error) {
      console.error(error)
    }
  }









  const contextData = {
    user,
    handleUserLogin,
    handleLogout,
    handleRegister
  }





  return (  // contextData  WILL BE PROVIDED TO ALL THE COMPONENTS
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}

// WE WILL USE useAuth INSTEAD OF  useContext(AuthContext)  
// TO MAKE CODE LOOK GOOD
export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;