import { useState, useEffect } from "react";
import axios from "axios";
function usePostRequest(search) {
  const [apiData, setApidata] = useState([]);
  useEffect(() => {
    async function makeRequest() {
      try {
        if (!url || !data) {
          setApidata([]);
          return;
        }
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "aplication.json",
          },
        });
        setApidata(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    makeRequest();
  }, [search]);
  return apiData;
}

export default usePostRequest;
