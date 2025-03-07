import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

import { addMessage, getMessages } from "./utils/messages";
import { cleanOutput } from "./utils/clean-output";

const modelName = process.env.LLM_MODEL_NAME || "qwen2.5-coder";

const systemPrompt = `You are an adaptive website.
# Your role:
Generate HTML, CSS and Javascript code based on the users requests.
Only provide valid HTML code in your response. 
DO NOT include any other text, explanations, or comments.
You can use tailwindcss classes for styling but make sure you include "<script src="https://cdn.tailwindcss.com"></script>" tag in the header.

# Website generation
- For navigation you need to use A tags, include the desired outcomes prompt into the src property. For example: <a href="/more+details+page">Details</a>
- If you generate an app make sure its functional, use JavaSript to create its functionality the best you can!
- You can pass data to the same page uising query params.
- All pages are generated only once than cached on the server.
- If the prompt is ONLY "home" reply with a simple form:
  - How can I help you today?
  - An input field
  - A submit button
  - When the submit button is pressed redirect the browser "/" with the input's value like this for example: "/user+prompt+is+here"
  - Replace spaces with + in the user input
  - Also include at least 6 idea links where to start for example:
    - <a href="/weather+app">Weather app</a>
    - <a href="/web+search+app">Web search app</a>
    - Make up your own
`;

export async function generate(userPrompt: string) {
  console.log(`Generating: ${userPrompt}`);
  const startTime = Date.now();

  const prompt = userPrompt.replaceAll("+", " ");

  addMessage({ role: "user", content: userPrompt })

  const results = await generateText({
    model: ollama(modelName),
    system: systemPrompt,
    messages: getMessages(),
  });


  console.log(`${userPrompt} generation finished in ${Date.now() - startTime}ms`);

  const response = cleanOutput(results.text);

  addMessage({ role: "assistant", content: response })
  return response;
}