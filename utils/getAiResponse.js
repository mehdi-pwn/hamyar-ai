export async function getAiResponse(data) {
  try {
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
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return alert(error);
  }
}
