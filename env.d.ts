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

  

  export {};
