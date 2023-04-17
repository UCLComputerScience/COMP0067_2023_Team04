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
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  },
};

export default api;