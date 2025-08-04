export async function streamOpenAIResponse(prompt: string, onToken: (token: string) => void) {
  const response = await fetch('/api/query-open-ai', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.error('Response:', response);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);

    const matches = chunk.matchAll(/"content":"(.*?)"/g);
    for (const match of matches) {
      const token = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      onToken(token);
    }
  }
}
