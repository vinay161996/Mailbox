import { useCallback, useState } from "react";

const useFetch = (updatedUrl = "") => {
  const [isLoading, setIsloading] = useState(false);

  const sendingReq = useCallback(async (reqConfigs) => {
    setIsloading(true);
    try {
      const promises = reqConfigs.map((reqConfig) => {
        const { endPoint, method, headers, body } = reqConfig;
        const url = `${updatedUrl}${endPoint}`;
        return fetch(url, {
          method: method ? method : "GET",
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null,
        });
      });

      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map((res) => res.json()));
      return data;
    } catch (error) {
      throw new Error();
    } finally {
      setIsloading(false);
    }
  }, []);

  return {
    isLoading,
    sendingReq,
  };
};

export default useFetch;
