import { resolve as resolvePath, basename, parse } from 'path';
import { expect } from 'chai';
import { describe, before, after, it } from 'mocha';
import getFolderContent from 'vamtiger-get-directory-content';
import bash from 'vamtiger-bash';
import {
    BundleType,
    StringConstant
} from '../types';
import getBundleExport from '../get-bundle-export';

const { space, period, nothing, and } = StringConstant;
const bundleTextPath = resolvePath(
    __dirname,
    '..',
    'vamtiger-bundle-text'
);
const tsBundle = 'bundle.ts';
const jsBundle = 'bundle.js';
const jsonBundle = 'bundle.json';
const bundlePaths = [tsBundle, jsBundle, jsonBundle].map(fileName => resolvePath(__dirname, fileName));
const removeFiles = `rm -rf ${bundlePaths.map(fileName => resolvePath(__dirname, fileName)).join(space)};`;
const bundle = bundlePaths.map(bundlePath => `node ${bundleTextPath} --folder ${__dirname} ${getParams(bundlePath)}`)
    .join(` ${and} `);
const bundleOptions = {
    cwd: __dirname
}

describe('getBundleExport should export', function () {
    before(async function () {
        await bash(removeFiles);

        await Promise.all([
            getBundleExport({
                folder: __dirname,
                name: 'bundle',
                type: BundleType.ts
            }),
            getBundleExport({
                folder: __dirname,
                name: 'bundle',
                type: BundleType.js
            }),
            getBundleExport({
                folder: __dirname,
                name: 'bundle',
                type: BundleType.json
            })
        ]);
    });

    after(async function () {
        await bash(removeFiles);
    });

    it(BundleType.ts, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(tsBundle)).to.be.true;
    });

    it(BundleType.js, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(jsBundle)).to.be.true;
    });

    it(BundleType.json, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(jsonBundle)).to.be.true;
    });
});

describe('vamtiger-bundle-text should export', function () {
    before(async function () {
        await bash(removeFiles);

        await bash(bundle, bundleOptions);
    });

    after(async function () {
        await bash(removeFiles);
    });

    it(BundleType.ts, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(tsBundle)).to.be.true;
    });

    it(BundleType.js, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(jsBundle)).to.be.true;
    });

    it(BundleType.json, async function () {
        const folderContent = new Set(await getFolderContent(__dirname));

        expect(folderContent.has(jsonBundle)).to.be.true;
    });
});

function getParams(filePath: string) {
    const fileName = basename(filePath);
    const { ext: type, name } = parse(fileName);
    const params = `--name ${name} --type ${type.replace(period, nothing)}`;

    return params;
}