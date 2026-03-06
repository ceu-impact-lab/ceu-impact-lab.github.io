import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import puppeteer from "puppeteer";

const outDir = path.resolve("out");
const port = Number(process.env.EXPORT_PORT || 4173);
const basePath = (process.env.EXPORT_BASE_PATH || "").replace(/\/+$/, "");
const exportPath = `${basePath}/presentacion/retos/ia-operaciones?export=1`;
const outputDir = basePath ? path.join(outDir, basePath.replace(/^\//, "")) : outDir;
const outputPath = path.join(outputDir, "ia-operaciones.pdf");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    let filePath = path.join(outDir, decodeURIComponent(url.pathname));
    const fileStat = await stat(filePath).catch(() => null);

    if (fileStat?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.statusCode = 200;
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});

const startServer = () =>
  new Promise((resolve) => {
    server.listen(port, () => resolve());
  });

const stopServer = () =>
  new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });

await startServer();

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.emulateMediaType("screen");
  await page.goto(`http://127.0.0.1:${port}${exportPath}`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => window.__EXPORT_READY__ === true, { timeout: 30000 });
  await page.waitForTimeout(500);
  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`PDF export complete: ${outputPath}`);
} finally {
  await browser.close();
  await stopServer();
}
