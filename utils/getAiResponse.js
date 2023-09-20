export async function getAiResponse(data) {
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch("/api/ai-response", options);

  const result = await response.json();

  return result;
}
