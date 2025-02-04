const API_URL = import.meta.env.VITE_OLLAMA_API_URL;

export const getModelInfo = async () => {
  const response = await fetch(`${API_URL}/api/tags`);
  return response.json();
};

export const generateResponse = async (model, prompt) => {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, prompt }),
  });
  return response;
};