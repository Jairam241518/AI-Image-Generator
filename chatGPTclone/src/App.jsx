import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("")
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setResult(response.data.data[0].url);
  };
  return (
    <div className="app-main">
      <h3>Generate an Image for the given prompt</h3>
      <input
        className="app-input"
        placeholder="Enter the prompt"
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button onClick={generateImage}>Generate an Image</button>

      {result.length > 0 ? <img src={result || ""} className="result-image" alt="result"></img> : <></>}
    </div>
  );
}

export default App;
