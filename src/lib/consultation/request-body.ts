export async function readRequestBody(
  request: Request,
): Promise<{ body: unknown } | { response: Response }> {
  const fail = (message: string, status: number) => ({
    response: Response.json({ message }, { status }),
  });
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return fail("Please send a JSON request.", 415);
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("Invalid request body.", 400);
    const decoder = new TextDecoder();
    let text = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16_384) {
        await reader.cancel();
        return fail("Request is too large.", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    return { body: JSON.parse(text + decoder.decode()) };
  } catch {
    return fail("Invalid request body.", 400);
  }
}
