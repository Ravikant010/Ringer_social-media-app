declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_MY_VARIABLE: string;
        MONGO_URI: string;
        PORT: string;
        baseURL: string;
        // Add any other environment variables you need here
      }
    }
  }
  
  // Set default values for your environment variables
  process.env.MONGO_URI =  'mongodb+srv://Peter:Peter123@cluster0.ocbbskm.mongodb.net/Ringer?retryWrites=true&w=majority';
  process.env.PORT ='8080';
  process.env.baseURL ='https://ringer.onrender.com';
  
  export {};
  