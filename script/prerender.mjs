import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { preview } from 'vite';
import siteConfig from '../site/site.config.mjs';

const prefix = 'http://127.0.0.1:9999';
const spiderPath = path.resolve('./_static_site');

function initPageList() {
  const pageList = [];

  siteConfig.docs.forEach((doc) => {
    doc.children.forEach((child) => {
      pageList.push(`${prefix}${child.path}`);
    });
  });

  console.log(pageList)

  return pageList;
}

async function initPreviewServer() {
  const previewServer = await preview({
    preview: { port: 9999, open: false },
    build: { outDir: './_site' }
  });

  previewServer.printUrls();
}

(async () => {
  const pageList = initPageList();
  await initPreviewServer();

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    fs.mkdirSync(spiderPath);
  } catch {}

  for (let url of pageList) {
    const [, pathName] = url.split(prefix);
    const filePath = `${spiderPath}${pathName || '/index'}.html`;

    console.log('\x1b[35m', `opening ${url}...`);
    await page.goto(url);

    console.log('\x1b[34m', `rendering ${url}...`);
    const html = await page.content();
    try {
      fs.mkdirSync(path.dirname(filePath));
    } catch {}

    console.log('\x1b[32m', `writting ${url}... \n`);
    fs.writeFileSync(filePath, html);
  }

  await browser.close();
  process.exit();
})();
