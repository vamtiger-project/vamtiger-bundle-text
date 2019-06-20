import { resolve as resolvePath } from 'path';
import Args from 'vamtiger-argv/build/main';
import {
    CommandlineArguments,
    IGetBundleExport,
    ErrorMessage,
    BundleType
} from './types';
import getBundleExport from './get-bundle-export';

const args = new Args();
const { cwd } = process;
const folder = args.has(CommandlineArguments.folder) && resolvePath(cwd(), args.get(CommandlineArguments.folder) as string);
const name = args.has(CommandlineArguments.name) && args.get(CommandlineArguments.name);
const type = (args.has(CommandlineArguments.type) && args.get(CommandlineArguments.type) || BundleType.ts) as BundleType;
const { noName, noFolder } = ErrorMessage;

if (!name) {
    throw new Error(noName);
} else if (!folder) {
    throw new Error(noFolder);
}

bundleText({ folder, name, type });

async function bundleText({ folder, name, type }: IGetBundleExport) {
    const bundleText = await getBundleExport({ folder, name, type })
        .catch(handleError);

    return bundleText;
}

function handleError(error: Error) {
    console.error(error.message);
    console.error(error.stack);
    process.exit();
}

export default bundleText;