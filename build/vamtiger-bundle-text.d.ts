import { IGetBundleExport } from './types';
declare function bundleText({ folder, name, type }: IGetBundleExport): Promise<string | void>;
export default bundleText;
