import { Client, Account, Databases } from 'appwrite';

// export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
// export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
// export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
// export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES


// export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
export const PROJECT_ID = "649eb7638663cbd997df"
export const DATABASE_ID = "649eba4404f9fecc0303"
export const COLLECTION_ID_MESSAGES = "649eba489b7f1910829d"

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('649eb7638663cbd997df');


// export const account = new Account(Client);
export const databases = new Databases(client)

export default client;