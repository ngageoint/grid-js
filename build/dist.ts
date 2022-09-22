import * as fs from "fs";

/**
 * This is used to "clean up" the dist dirctory.  This aligns the code up with what is in index.ts (and not in the src/ directory).
 * 
 * @since 1.0.0
 */
async function main(): Promise<void> {

    const ROOT = `${__dirname}/..`;
    const DIST = `${ROOT}/dist`;

    if (fs.existsSync(`${DIST}/src`)) {
        fs.cpSync(`${DIST}/src`, `${DIST}/`, { recursive: true });
        fs.rmSync(`${DIST}/src`, { recursive: true });
    }
    if (fs.existsSync(`${DIST}/test`)) {
        fs.rmSync(`${DIST}/test`, { recursive: true });
    }
}
main();