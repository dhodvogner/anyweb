# anyweb

A real-time AI generated website.

Why? Why not! 

But dont expect much 😂

## Running locally

- Make sure you have at least [bun 1.2.4](https://bun.sh) installed.

- Clone the project.

- Install dependencies:

```bash
bun install
```

- Make sure ollama is running locally.

- The default model is `qwen2.5-coder` make sure its pulled.

- Run:

```bash
bun run index.ts
```

- Open browser on https://localhost:3000/home

## Enviroment Variables

```.env
PORT=3001
LLM_MODEL_NAME="llama3.2"
```