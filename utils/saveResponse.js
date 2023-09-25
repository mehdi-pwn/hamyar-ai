export async function saveResponse(userId, prompt, response) {
  try {
    const JSONdata = JSON.stringify({ userId, prompt, response });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    await fetch("/api/save-response", options);
  } catch (error) {
    console.log(error);
    return alert(error);
  }
}
