export enum StringConstant {
    nothing = '',
    newline = '\n',
    space = ' ',
    slash = '/',
    period = '.',
    and = '&&'
}

export enum CommandlineArguments {
    folder = 'folder',
    name = 'name',
    type = 'type',
    filter = 'filter'
}

export enum ErrorMessage {
    noName = 'No bundle name defined',
    noBundle = 'No bundle created'
}

export enum BundleType {
    ts = 'ts',
    js = 'js',
    json = 'json'
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

export const regex = {
    leadingSlash: new RegExp(`^${StringConstant.slash}`)
}