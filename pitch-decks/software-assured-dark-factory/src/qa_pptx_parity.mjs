import fs from "node:fs/promises";
import path from "node:path";

const { PresentationFile } = await import("@oai/artifact-tool");

const WORKSPACE =
  "C:/Users/abhir/Documents/Codex/2026-04-23/files-mentioned-by-the-user-dark";
const DECK_ROOT = path.join(
  WORKSPACE,
  "pitch-decks",
  "software-assured-dark-factory",
);
const PPTX_PATH = path.join(DECK_ROOT, "output", "output.pptx");
const PARITY_DIR = path.join(DECK_ROOT, "scratch", "pptx-parity-previews");
const REPORT_PATH = path.join(DECK_ROOT, "scratch", "pptx-parity-report.json");

await fs.mkdir(PARITY_DIR, { recursive: true });

async function saveBlob(blob, targetPath) {
  if (typeof blob.save === "function") {
    await blob.save(targetPath);
    return;
  }
  if (blob.data) {
    await fs.writeFile(targetPath, blob.data);
    return;
  }
  const arrayBuffer = await blob.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
}

const pptxBytes = await fs.readFile(PPTX_PATH);
const presentation = await PresentationFile.importPptx(pptxBytes);

const previews = [];
for (let i = 0; i < presentation.slides.count; i += 1) {
  const slide = presentation.slides.getItem(i);
  const previewPath = path.join(PARITY_DIR, `slide-${String(i + 1).padStart(2, "0")}.png`);
  await saveBlob(await slide.export({ format: "png" }), previewPath);
  previews.push(previewPath);
}

const report = {
  checkedDeck: PPTX_PATH,
  slideCount: presentation.slides.count,
  parityPreviewDir: PARITY_DIR,
  previews,
  status: "saved PPTX reopened and rendered through headless artifact-tool import/export",
};

await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
