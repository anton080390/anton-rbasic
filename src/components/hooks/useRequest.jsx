import { useState, useEffect } from "react";
import axios from "axios";

function useRequest(url) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function makeRequest() {
      try {
        if (url) {
          const response = await axios.get(url);
          setApiData(response.data);
        } else {
          setApiData([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    makeRequest();
  }, [url]);

  return apiData;
}

export default useRequest;
