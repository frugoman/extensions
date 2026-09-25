import assert from "node:assert/strict";
import * as http from "node:http";
import { AddressInfo } from "node:net";
import { test } from "node:test";
import { AIError, generateText } from "../src/ai/llm";

async function withServer(handler: http.RequestListener, run: (baseUrl: string) => Promise<void>) {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    await run(`http://127.0.0.1:${(server.address() as AddressInfo).port}/v1`);
  } finally {
    server.close();
  }
}

test("streams an OpenAI-compatible answer", async () => {
  let receivedBody: { model?: string; stream?: boolean } = {};
  await withServer(
    (req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        receivedBody = JSON.parse(body);
        assert.equal(req.url, "/v1/chat/completions");
        res.writeHead(200, { "Content-Type": "text/event-stream" });
        for (const token of ["<think>hmm</think>", "Hello", ", ", "world"]) {
          res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: token } }] })}\n\n`);
        }
        res.end("data: [DONE]\n\n");
      });
    },
    async (baseUrl) => {
      const partials: string[] = [];
      const text = await generateText([{ role: "user", content: "hi" }], {
        config: { baseUrl, model: "llama3.2" },
        onText: (partial) => partials.push(partial),
      });
      assert.equal(text, "Hello, world");
      assert.ok(partials.length >= 3);
      assert.equal(receivedBody.model, "llama3.2");
      assert.equal(receivedBody.stream, true);
    },
  );
});

test("supports servers that don't stream", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ choices: [{ message: { content: "Done" } }] }));
    },
    async (baseUrl) => {
      assert.equal(await generateText([], { config: { baseUrl, model: "m" } }), "Done");
    },
  );
});

test("explains HTTP errors", async () => {
  await withServer(
    (_req, res) => {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: { message: "bad key" } }));
    },
    async (baseUrl) => {
      await assert.rejects(generateText([], { config: { baseUrl, model: "m" } }), (error: Error) => {
        assert.ok(error instanceof AIError);
        assert.match(error.message, /API key/);
        assert.match(error.message, /bad key/);
        return true;
      });
    },
  );
});

test("explains when the local server is not running", async () => {
  await assert.rejects(
    generateText([], { config: { baseUrl: "http://localhost:1/v1", model: "m" } }),
    /Could not connect to your local AI server/,
  );
});
