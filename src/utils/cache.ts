import fs from 'node:fs';

const CACHE = {};

fs.mkdirSync("./cache", { recursive: true });


export function addCache(prompt: string, result: string) {
  // TODO: write result into a html file
  const path = `./cache/${prompt}.html`;
  fs.writeFileSync(`./cache/${prompt}.html`, result, { encoding: "utf-8" });
}

export function getCache(prompt: string) {
  // TODO: check if cahce file exists and return its content or null.
  const path = `./cache/${prompt}.html`;
  if (fs.existsSync(path)) {
    return fs.readFileSync(path);
  } else {
    return null;
  }
}

export function clearCache() {
  // TODO: remove all cached files
  fs.rmdirSync("./cache");
  fs.mkdirSync("./cache");
}