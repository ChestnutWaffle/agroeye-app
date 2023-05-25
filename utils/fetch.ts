export async function fetchResults(imageBase64: string) {
  const jsondata = JSON.stringify({ img: imageBase64 });
  const response = await fetch("http://18.60.90.174:8080/predict", {
    body: jsondata,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
  });

  if (response.status >= 400) {
    throw new Error("Couldn't connect to the Server.");
  }

  const data = (await response.json()) as { [x: string]: string }[];

  const result = data.map((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return { key, value };
  });

  return result;
}
