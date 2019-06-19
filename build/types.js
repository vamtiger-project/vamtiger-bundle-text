"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringConstant;
(function (StringConstant) {
    StringConstant["nothing"] = "";
    StringConstant["newline"] = "\n";
    StringConstant["space"] = " ";
    StringConstant["slash"] = "/";
    StringConstant["period"] = ".";
    StringConstant["and"] = "&&";
})(StringConstant = exports.StringConstant || (exports.StringConstant = {}));
var CommandlineArguments;
(function (CommandlineArguments) {
    CommandlineArguments["folder"] = "folder";
    CommandlineArguments["name"] = "name";
    CommandlineArguments["type"] = "type";
})(CommandlineArguments = exports.CommandlineArguments || (exports.CommandlineArguments = {}));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["noName"] = "No bundle name defined";
    ErrorMessage["noBundle"] = "No bundle created";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
var BundleType;
(function (BundleType) {
    BundleType["ts"] = "ts";
    BundleType["js"] = "js";
    BundleType["json"] = "json";
})(BundleType = exports.BundleType || (exports.BundleType = {}));
exports.regex = {
    leadingSlash: new RegExp(`^${StringConstant.slash}`)
};
//# sourceMappingURL=types.js.map