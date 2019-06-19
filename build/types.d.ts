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
    type = "type"
}
export declare enum ErrorMessage {
    noName = "No bundle name defined",
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
}
export interface IBundleExport {
    [key: string]: string;
}
export declare const regex: {
    leadingSlash: RegExp;
};
