import { useState, useEffect } from "react";
import axios from "axios";
function useRequest(search) {
  const [apiData, setApidata] = useState([]);
  useEffect(() => {
    async function makeRequest() {
      try {
        if (search.length >= 3) {
          const response = await axios.get(
            `https://api.tvmaze.com/search/shows?q=${search}`
          );
          setApidata(response.data);
        }
        if (search.length === 0) {
          setApidata([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    makeRequest();
  }, [search]);
  return apiData;
}

export default useRequest;
