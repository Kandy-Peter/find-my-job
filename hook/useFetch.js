import { useEffect, useState } from "react";
import axios from "axios";

const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY

const useFetch = (endpoint, query) => {
  const [data, setData] =  useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false)
    } catch (err){
      setError(err)
      alert("Something went wrong!")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData();
  }

  return {data, isLoading, error, refetch}
}

export default useFetch
