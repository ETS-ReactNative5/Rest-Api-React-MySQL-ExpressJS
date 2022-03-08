import { useEffect, useState } from 'react';

const useFormResults = () => {
  const BASE_URL = process.env.REACT_APP_URL

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(`${BASE_URL}/results`)
      return response.json()
        .then(data => {
          setResults(data)
          setError(null)
          setIsLoading(false)
        })
    } catch (error) {
        setError(error)
        setIsLoading(false)
    }
  }, [BASE_URL]);


  const deleteResult = async (id) => {
    try {
      await fetch(`${BASE_URL}/results/${id}`, {
        method: "DELETE",
      }).then(response => {
        setResults(results.filter(result => result.id !== id))
        return response.json()
      })
    } catch (error) {
        console.log(error)
    }
  }

  return {results, error, deleteResult, isLoading}
}

export default useFormResults