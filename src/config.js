// src/config.js
const fetch = require('node-fetch');
const BASE_URL = "http://20.254.93.210:8080/";

const api = {
    get: async (path) => {
      try {
        const response = await fetch(`${BASE_URL}${path}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
  
        // Check if the response is OK (status code 200) and the content type is JSON
        if (response.ok && response.headers.get('content-type').includes('application/json')) {
          return await response.json();
        } else {
          // If the response is not OK or the content type is not JSON, log the error and the response text
          console.error("Fetch error: Invalid response or content type", response.status, await response.text());
          throw new Error("Invalid response or content type");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  };
  

export default api;