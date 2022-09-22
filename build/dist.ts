import * as fs from "fs";

async function main(): Promise<void> {
  
    const ROOT = `${__dirname}/..`;
    const DIST = `${ROOT}/dist`;

    if (fs.existsSync(`${DIST}/src`)) {
        fs.cpSync(`${DIST}/src`, `${DIST}/`, { recursive: true });
        fs.rmSync(`${DIST}/src`, { recursive: true });
    }
    if (fs.existsSync(`${DIST}/test`)) {
        fs.rmSync(`${DIST}/test`,  { recursive: true });
    }
}
main();