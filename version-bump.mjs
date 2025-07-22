import fs from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), "manifest.json");
const versionsPath = path.join(process.cwd(), "versions.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const versions = JSON.parse(fs.readFileSync(versionsPath, "utf8"));

const newVersion = process.argv[2];

if (!newVersion) {
  console.error("Please provide a new version number.");
  process.exit(1);
}

manifest.version = newVersion;
versions[newVersion] = manifest.minAppVersion;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, "\t"));
fs.writeFileSync(versionsPath, JSON.stringify(versions, null, "\t"));
