export function cleanOutput(output: string) {
    // Remove ```html and ``` markdown formatting from HTML
    return output.replace(/```html/g, "").replace(/```/g, "").trim();
  }