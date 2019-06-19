#!/usr/bin/env node
"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var StringConstant,CommandlineArguments,ErrorMessage,BundleType,path=require("path"),getFileText=_interopDefault(require("vamtiger-get-file-text")),createFile=_interopDefault(require("vamtiger-create-file")),getFolderContent=_interopDefault(require("vamtiger-get-directory-content-recursive")),Args=_interopDefault(require("vamtiger-argv/build/main"));!function(e){e.nothing="",e.newline="\n",e.space=" ",e.slash="/",e.period=".",e.and="&&"}(StringConstant||(StringConstant={})),function(e){e.folder="folder",e.name="name",e.type="type"}(CommandlineArguments||(CommandlineArguments={})),function(e){e.noName="No bundle name defined",e.noBundle="No bundle created"}(ErrorMessage||(ErrorMessage={})),function(e){e.ts="ts",e.js="js",e.json="json"}(BundleType||(BundleType={}));const regex={leadingSlash:new RegExp(`^${StringConstant.slash}`)},{stringify:stringify}=JSON,{nothing:nothing}=StringConstant,{noBundle:noBundle}=ErrorMessage,{leadingSlash:leadingSlash}=regex;async function getBundleExport({folder:e,name:n,type:t}){const{file:r}=await getFolderContent({path:e,classified:!0}),a=path.resolve(e,`${n}.${t}`),o=await Promise.all(r.map(async n=>({[n.replace(e,nothing).replace(leadingSlash,nothing)]:await getFileText(n)}))).then(e=>e.reduce((e,n)=>Object.assign({},e,n),{})),s=t===BundleType.json&&stringify(o)||t===BundleType.js&&`module.exports = ${stringify(o)}`||t===BundleType.ts&&`export default ${stringify(o)}`;if(!s)throw new Error(noBundle);return await createFile(a,s),s}const args=new Args,{cwd:cwd}=process,folder=args.has(CommandlineArguments.folder)&&args.get(CommandlineArguments.folder)||cwd(),name=args.has(CommandlineArguments.name)&&args.get(CommandlineArguments.name),type=args.has(CommandlineArguments.type)&&args.get(CommandlineArguments.type)||BundleType.ts,{noName:noName}=ErrorMessage;if(!name)throw new Error(noName);async function bundleText({folder:e,name:n,type:t}){return await getBundleExport({folder:e,name:n,type:t}).catch(handleError)}function handleError(e){console.error(e.message),console.error(e.stack),process.exit()}bundleText({folder:folder,name:name,type:type}),module.exports=bundleText;
//# sourceMappingURL=vamtiger-bundle-text.js.map