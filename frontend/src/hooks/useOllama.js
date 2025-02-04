import { useState, useEffect } from 'react';
import { getModelInfo, generateResponse } from '../utils/api';

export const useOllama = () => {
  const [modelInfo, setModelInfo] = useState({ name: 'Loading...', status: 'unknown' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const fetchModelInfo = async () => {
    try {
      const data = await getModelInfo();
      console.log('fetchModelInfo::', data)
      if (data && data.models && data.models.length > 0) {
        setModelInfo({
          name: data.models[0].name,
          status: 'ready'
        });
      }
    } catch (error) {
      setModelInfo({
        name: 'Error connecting to server',
        status: 'error'
      });
    }
  };

  const generateChat = async (prompt, handleResponse) => {
    setIsLoading(true);
    try {
      const response = await generateResponse(modelInfo.name, prompt);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsedChunk = JSON.parse(line);
              if (parsedChunk.response) {
                handleResponse(parsedChunk.response);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      handleResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return { modelInfo, isLoading, generateChat };
};