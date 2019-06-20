import { resolve as resolvePath } from 'path';
import getFileText from 'vamtiger-get-file-text';
import createFile from 'vamtiger-create-file';
import getFolderContent, { ClassifiedDirectoryContent } from 'vamtiger-get-directory-content-recursive';
import {
    IGetBundleExport,
    IBundleExport,
    StringConstant,
    BundleType,
    ErrorMessage,
    regex
} from './types';

const { stringify } = JSON;
const { nothing } = StringConstant;
const { noBundle } = ErrorMessage;
const { leadingSlash } = regex;

export default async function ({ folder, name, type, filter: filterPattern }: IGetBundleExport) {
    const { file: filePaths } = await getFolderContent({
        path: folder,
        classified: true
    }) as ClassifiedDirectoryContent;
    const filter = filterPattern && new RegExp(filterPattern, 'i');
    const bundlePath = resolvePath(
        folder,
        `${name}.${type}`
    );
    const filteredFilePaths = filter && filePaths.filter(filePath => (filePath as string).match(filter)) || filePaths;
    const bundleExport = await Promise
        .all((filteredFilePaths as string[]).map(async filePath => ({ [filePath.replace(folder, nothing).replace(leadingSlash, nothing)]: await getFileText(filePath)}) as IBundleExport))
        .then(bundleExports => bundleExports.reduce((bundleExport, currentBundleExport) => ({...bundleExport, ...currentBundleExport}), {} as IBundleExport));
    const bundleExportStatement = type === BundleType.json && stringify(bundleExport)
        || type === BundleType.js && `module.exports = ${stringify(bundleExport)}`
        || type === BundleType.ts && `export default ${stringify(bundleExport)}`;

    if (!bundleExportStatement) {
        throw new Error(noBundle);
    }

    await createFile(bundlePath, bundleExportStatement);

    return bundleExportStatement;
}