import { IGetBundleExport } from './types';
declare function bundleText({ folder, name, type, filter }: IGetBundleExport): Promise<string | void>;
export default bundleText;
