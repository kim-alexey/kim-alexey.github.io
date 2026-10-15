// Serve the static export without requiring a production Next.js server.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const basePath = process.env.PORTFOLIO_BASE_PATH || "";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};
const server = createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    let pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (basePath) {
      if (pathname !== basePath && !pathname.startsWith(basePath + "/"))
        throw new Error("Not found");
      pathname = pathname.slice(basePath.length) || "/";
    }
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Not found");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const bytes = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
});
server.listen(port, "0.0.0.0", () =>
  console.log(`Static portfolio server listening on port ${port}`),
);
const close = () => server.close(() => process.exit(0));
process.on("SIGTERM", close);
process.on("SIGINT", close);
