export declare enum StringConstant {
    nothing = "",
    newline = "\n",
    space = " ",
    slash = "/",
    period = ".",
    and = "&&"
}
export declare enum CommandlineArguments {
    folder = "folder",
    name = "name",
    type = "type",
    filter = "filter"
}
export declare enum ErrorMessage {
    noName = "No bundle name defined",
    noFolder = "No bundle folder defined",
    noBundle = "No bundle created"
}
export declare enum BundleType {
    ts = "ts",
    js = "js",
    json = "json"
}
export interface IGetBundleExport {
    folder: string;
    name: string;
    type: BundleType;
    filter?: string;
}
export interface IBundleExport {
    [key: string]: string;
}
export declare const regex: {
    leadingSlash: RegExp;
};
