import { verifyToken } from "./verifyToken";

export async function saveResponse(prompt, response) {
  const verify = await verifyToken();
  if (!verify)
    return console.log("NOT AUTHORIZED AND RESPONSE NOT SAVED TO USER LIBRARY");
  try {
    const JSONdata = JSON.stringify({ prompt, response });
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
