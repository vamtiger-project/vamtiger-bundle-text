#!/usr/bin/env node
"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var StringConstant,CommandlineArguments,ErrorMessage,BundleType,path=require("path"),getFileText=_interopDefault(require("vamtiger-get-file-text")),createFile=_interopDefault(require("vamtiger-create-file")),getFolderContent=_interopDefault(require("vamtiger-get-directory-content-recursive")),Args=_interopDefault(require("vamtiger-argv/build/main"));!function(e){e.nothing="",e.newline="\n",e.space=" ",e.slash="/",e.period=".",e.and="&&"}(StringConstant||(StringConstant={})),function(e){e.folder="folder",e.name="name",e.type="type",e.filter="filter"}(CommandlineArguments||(CommandlineArguments={})),function(e){e.noName="No bundle name defined",e.noFolder="No bundle folder defined",e.noBundle="No bundle created"}(ErrorMessage||(ErrorMessage={})),function(e){e.ts="ts",e.js="js",e.json="json"}(BundleType||(BundleType={}));const regex={leadingSlash:new RegExp(`^${StringConstant.slash}`)},{stringify:stringify}=JSON,{nothing:nothing}=StringConstant,{noBundle:noBundle}=ErrorMessage,{leadingSlash:leadingSlash}=regex;async function getBundleExport({folder:e,name:n,type:r,filter:t}){const{file:a}=await getFolderContent({path:e,classified:!0}),o=t&&new RegExp(t,"i"),i=path.resolve(e,`${n}.${r}`),l=o&&a.filter(e=>e.match(o))||a,s=await Promise.all(l.map(async n=>({[n.replace(e,nothing).replace(leadingSlash,nothing)]:await getFileText(n)}))).then(e=>e.reduce((e,n)=>Object.assign({},e,n),{})),d=r===BundleType.json&&stringify(s)||r===BundleType.js&&`module.exports = ${stringify(s)};`||r===BundleType.ts&&`export default ${stringify(s)};`;if(!d)throw new Error(noBundle);return await createFile(i,d),d}const args=new Args,{cwd:cwd}=process,folder=args.has(CommandlineArguments.folder)&&path.resolve(cwd(),args.get(CommandlineArguments.folder)),name=args.has(CommandlineArguments.name)&&args.get(CommandlineArguments.name),type=args.has(CommandlineArguments.type)&&args.get(CommandlineArguments.type)||BundleType.ts,filter=args.has(CommandlineArguments.filter)&&args.get(CommandlineArguments.filter)||"",{noName:noName,noFolder:noFolder}=ErrorMessage;if(!name)throw new Error(noName);if(!folder)throw new Error(noFolder);async function bundleText({folder:e,name:n,type:r}){return await getBundleExport({folder:e,name:n,type:r}).catch(handleError)}function handleError(e){console.error(e.message),console.error(e.stack),process.exit()}bundleText({folder:folder,name:name,type:type,filter:filter}),module.exports=bundleText;
//# sourceMappingURL=vamtiger-bundle-text.js.map
