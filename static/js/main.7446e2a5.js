/*! For license information please see main.7446e2a5.js.LICENSE.txt */
(()=>{var e={5:(e,t)=>{"use strict";var n="function"===typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,o=n?Symbol.for("react.fragment"):60107,a=n?Symbol.for("react.strict_mode"):60108,s=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,c=n?Symbol.for("react.context"):60110,u=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,f=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,g=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,b=n?Symbol.for("react.responder"):60118,x=n?Symbol.for("react.scope"):60119;function w(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case u:case d:case o:case s:case a:case p:return e;default:switch(e=e&&e.$$typeof){case c:case f:case g:case m:case l:return e;default:return t}}case i:return t}}}function k(e){return w(e)===d}},11:(e,t,n)=>{"use strict";var r=n(123);function i(e){var t=0,n=e.length;if(0===n)return t;for(var r=0;r<n;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t}e.exports=function(e){return e.map((function(e){return e._key?e:r({_key:(t=e,i(JSON.stringify(t)).toString(36).replace(/[^A-Za-z0-9]/g,""))},e);var t}))}},43:(e,t,n)=>{"use strict";e.exports=n(202)},68:(e,t,n)=>{"use strict";var r=n(564),i=n(672),o=n(123),a=encodeURIComponent,s="You must either:\n  - Pass `projectId` and `dataset` to the block renderer\n  - Materialize images to include the `url` field.\n\nFor more information, see ".concat(r("block-content-image-materializing"));e.exports=function(e){var t=e.node,n=e.options,r=n.projectId,l=n.dataset,c=t.asset;if(!c)throw new Error("Image does not have required `asset` property");if(c.url)return c.url+function(e){var t=e.imageOptions,n=Object.keys(t);if(!n.length)return"";var r=n.map((function(e){return"".concat(a(e),"=").concat(a(t[e]))}));return"?".concat(r.join("&"))}(n);if(!r||!l)throw new Error(s);if(!c._ref)throw new Error("Invalid image reference in block, no `_ref` found on `asset`");return i(o({projectId:r,dataset:l},n.imageOptions||{})).image(t).toString()}},123:e=>{"use strict";var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(i){return!1}}()?Object.assign:function(e,i){for(var o,a,s=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),l=1;l<arguments.length;l++){for(var c in o=Object(arguments[l]))n.call(o,c)&&(s[c]=o[c]);if(t){a=t(o);for(var u=0;u<a.length;u++)r.call(o,a[u])&&(s[a[u]]=o[a[u]])}}return s}},138:function(e){e.exports=function(){function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.apply(this,arguments)}function t(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function r(e,n){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=t(e))||n&&e&&"number"===typeof e.length){r&&(e=r);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i="image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";function o(e){var t=e.split("-"),n=t[1],r=t[2],o=t[3];if(!n||!r||!o)throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');var a=r.split("x"),s=+a[0],l=+a[1];if(!isFinite(s)||!isFinite(l))throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');return{id:n,width:s,height:l,format:o}}var a=function(e){return!!e&&"string"===typeof e._ref},s=function(e){return!!e&&"string"===typeof e._id},l=function(e){var t=e;return!(!t||!t.asset)&&"string"===typeof t.asset.url};function c(t){if(!t)return null;var n;if("string"===typeof t&&u(t))n={asset:{_ref:d(t)}};else if("string"===typeof t)n={asset:{_ref:t}};else if(a(t))n={asset:t};else if(s(t))n={asset:{_ref:t._id||""}};else if(l(t))n={asset:{_ref:d(t.asset.url)}};else{if("object"!==typeof t.asset)return null;n=e({},t)}var r=t;return r.crop&&(n.crop=r.crop),r.hotspot&&(n.hotspot=r.hotspot),f(n)}function u(e){return/^https?:\/\//.test(""+e)}function d(e){return("image-"+e.split("/").slice(-1)[0]).replace(/\.([a-z]+)$/,"-$1")}function f(t){if(t.crop&&t.hotspot)return t;var n=e({},t);return n.crop||(n.crop={left:0,top:0,bottom:0,right:0}),n.hotspot||(n.hotspot={x:.5,y:.5,height:1,width:1}),n}var p=[["width","w"],["height","h"],["format","fm"],["download","dl"],["blur","blur"],["sharpen","sharp"],["invert","invert"],["orientation","or"],["minHeight","min-h"],["maxHeight","max-h"],["minWidth","min-w"],["maxWidth","max-w"],["quality","q"],["fit","fit"],["crop","crop"],["saturation","sat"],["auto","auto"],["dpr","dpr"],["pad","pad"],["frame","frame"]];function h(t){var n=e({},t||{}),r=n.source;delete n.source;var i=c(r);if(!i)throw new Error("Unable to resolve image URL from source ("+JSON.stringify(r)+")");var a=o(i.asset._ref||i.asset._id||""),s=Math.round(i.crop.left*a.width),l=Math.round(i.crop.top*a.height),u={left:s,top:l,width:Math.round(a.width-i.crop.right*a.width-s),height:Math.round(a.height-i.crop.bottom*a.height-l)},d=i.hotspot.height*a.height/2,f=i.hotspot.width*a.width/2,p=i.hotspot.x*a.width,h=i.hotspot.y*a.height,v={left:p-f,top:h-d,right:p+f,bottom:h+d};return n.rect||n.focalPoint||n.ignoreImageParams||n.crop||(n=e({},n,g({crop:u,hotspot:v},n))),m(e({},n,{asset:a}))}function m(e){var t=(e.baseUrl||"https://cdn.sanity.io").replace(/\/+$/,""),n=e.vanityName?"/"+e.vanityName:"",r=e.asset.id+"-"+e.asset.width+"x"+e.asset.height+"."+e.asset.format+n,i=t+"/images/"+e.projectId+"/"+e.dataset+"/"+r,o=[];if(e.rect){var a=e.rect,s=a.left,l=a.top,c=a.width,u=a.height;(0!==s||0!==l||u!==e.asset.height||c!==e.asset.width)&&o.push("rect="+s+","+l+","+c+","+u)}e.bg&&o.push("bg="+e.bg),e.focalPoint&&(o.push("fp-x="+e.focalPoint.x),o.push("fp-y="+e.focalPoint.y));var d=[e.flipHorizontal&&"h",e.flipVertical&&"v"].filter(Boolean).join("");return d&&o.push("flip="+d),p.forEach((function(t){var n=t[0],r=t[1];"undefined"!==typeof e[n]?o.push(r+"="+encodeURIComponent(e[n])):"undefined"!==typeof e[r]&&o.push(r+"="+encodeURIComponent(e[r]))})),0===o.length?i:i+"?"+o.join("&")}function g(e,t){var n,r=t.width,i=t.height;if(!r||!i)return{width:r,height:i,rect:e.crop};var o=e.crop,a=e.hotspot,s=r/i;if(o.width/o.height>s){var l=Math.round(o.height),c=Math.round(l*s),u=Math.max(0,Math.round(o.top)),d=Math.round((a.right-a.left)/2+a.left),f=Math.max(0,Math.round(d-c/2));f<o.left?f=o.left:f+c>o.left+o.width&&(f=o.left+o.width-c),n={left:f,top:u,width:c,height:l}}else{var p=o.width,h=Math.round(p/s),m=Math.max(0,Math.round(o.left)),g=Math.round((a.bottom-a.top)/2+a.top),v=Math.max(0,Math.round(g-h/2));v<o.top?v=o.top:v+h>o.top+o.height&&(v=o.top+o.height-h),n={left:m,top:v,width:p,height:h}}return{width:r,height:i,rect:n}}var v=["clip","crop","fill","fillmax","max","scale","min"],y=["top","bottom","left","right","center","focalpoint","entropy"],b=["format"];function x(e){return!(!e||!("config"in e))&&"function"===typeof e.config}function w(e){return!(!e||!("clientConfig"in e))&&"object"===typeof e.clientConfig}function k(e){for(var t,n=r(p);!(t=n()).done;){var i=t.value,o=i[0],a=i[1];if(e===o||e===a)return o}return e}function j(e){if(x(e)){var t=e.config(),n=t.apiHost,r=t.projectId,i=t.dataset;return new S(null,{baseUrl:(n||"https://api.sanity.io").replace(/^https:\/\/api\./,"https://cdn."),projectId:r,dataset:i})}if(w(e)){var o=e.clientConfig,a=o.apiHost,s=o.projectId,l=o.dataset;return new S(null,{baseUrl:(a||"https://api.sanity.io").replace(/^https:\/\/api\./,"https://cdn."),projectId:s,dataset:l})}return new S(null,e||{})}var S=function(){function t(t,n){this.options=void 0,this.options=t?e({},t.options||{},n||{}):e({},n||{})}var n=t.prototype;return n.withOptions=function(n){var r=n.baseUrl||this.options.baseUrl,i={baseUrl:r};for(var o in n)n.hasOwnProperty(o)&&(i[k(o)]=n[o]);return new t(this,e({baseUrl:r},i))},n.image=function(e){return this.withOptions({source:e})},n.dataset=function(e){return this.withOptions({dataset:e})},n.projectId=function(e){return this.withOptions({projectId:e})},n.bg=function(e){return this.withOptions({bg:e})},n.dpr=function(e){return this.withOptions(e&&1!==e?{dpr:e}:{})},n.width=function(e){return this.withOptions({width:e})},n.height=function(e){return this.withOptions({height:e})},n.focalPoint=function(e,t){return this.withOptions({focalPoint:{x:e,y:t}})},n.maxWidth=function(e){return this.withOptions({maxWidth:e})},n.minWidth=function(e){return this.withOptions({minWidth:e})},n.maxHeight=function(e){return this.withOptions({maxHeight:e})},n.minHeight=function(e){return this.withOptions({minHeight:e})},n.size=function(e,t){return this.withOptions({width:e,height:t})},n.blur=function(e){return this.withOptions({blur:e})},n.sharpen=function(e){return this.withOptions({sharpen:e})},n.rect=function(e,t,n,r){return this.withOptions({rect:{left:e,top:t,width:n,height:r}})},n.format=function(e){return this.withOptions({format:e})},n.invert=function(e){return this.withOptions({invert:e})},n.orientation=function(e){return this.withOptions({orientation:e})},n.quality=function(e){return this.withOptions({quality:e})},n.forceDownload=function(e){return this.withOptions({download:e})},n.flipHorizontal=function(){return this.withOptions({flipHorizontal:!0})},n.flipVertical=function(){return this.withOptions({flipVertical:!0})},n.ignoreImageParams=function(){return this.withOptions({ignoreImageParams:!0})},n.fit=function(e){if(-1===v.indexOf(e))throw new Error('Invalid fit mode "'+e+'"');return this.withOptions({fit:e})},n.crop=function(e){if(-1===y.indexOf(e))throw new Error('Invalid crop mode "'+e+'"');return this.withOptions({crop:e})},n.saturation=function(e){return this.withOptions({saturation:e})},n.auto=function(e){if(-1===b.indexOf(e))throw new Error('Invalid auto mode "'+e+'"');return this.withOptions({auto:e})},n.pad=function(e){return this.withOptions({pad:e})},n.vanityName=function(e){return this.withOptions({vanityName:e})},n.frame=function(e){if(1!==e)throw new Error('Invalid frame value "'+e+'"');return this.withOptions({frame:e})},n.url=function(){return h(this.options)},n.toString=function(){return this.url()},t}();return j}()},141:e=>{e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},150:(e,t,n)=>{"use strict";var r=n(123),i=n(658),o=n(849),a=n(11),s=n(313),l=["projectId","dataset","imageOptions","ignoreUnknownTypes"],c={imageOptions:{},ignoreUnknownTypes:!0};function u(e){return"block"===e._type&&e.listItem}e.exports=function(e,t,n,d){var f=r({},c,t),p=Array.isArray(f.blocks)?f.blocks:[f.blocks],h=a(p),m=o(h,f.listNestMode),g=s(n,f.serializers||{}),v=l.reduce((function(e,t){var n=f[t];return"undefined"!==typeof n&&(e[t]=n),e}),{});function y(t,n,r,o){return"list"===(a=t)._type&&a.listItem?function(t){var n=t.listItem,r=t.level,i=t._key,o=t.children.map(y);return e(g.list,{key:i,level:r,type:n,options:v},o)}(t):u(t)?function(t,n){var r=t._key,o=i(t),a=o.map(y);return e(g.listItem,{node:t,serializers:g,index:n,key:r,options:v},a)}(t,function(e,t){for(var n=0,r=0;r<t.length;r++){if(t[r]===e)return n;u(t[r])&&n++}return n}(t,r)):function(e){return"string"===typeof e||e.marks||"span"===e._type}(t)?d(t,g,n,{serializeNode:y}):function(t,n,r){var o=i(t),a=o.map((function(e,t,n){return y(e,t,n,!0)})),s={key:t._key||"block-".concat(n),node:t,isInline:r,serializers:g,options:v};return e(g.block,s,a)}(t,n,o);var a}var b=Boolean(f.renderContainerOnSingleChild),x=m.map(y);if(b||x.length>1){var w=f.className?{className:f.className}:{};return e(g.container,w,x)}return x[0]?x[0]:"function"===typeof g.empty?e(g.empty):g.empty}},153:(e,t,n)=>{"use strict";n(123);var r=n(43),i=60103;if(t.Fragment=60107,"function"===typeof Symbol&&Symbol.for){var o=Symbol.for;i=o("react.element"),t.Fragment=o("react.fragment")}var a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:u,props:o,_owner:a.current}}t.jsx=c,t.jsxs=c},173:(e,t,n)=>{e.exports=n(497)()},202:(e,t,n)=>{"use strict";var r=n(123),i=60103,o=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var a=60109,s=60110,l=60112;t.Suspense=60113;var c=60115,u=60116;if("function"===typeof Symbol&&Symbol.for){var d=Symbol.for;i=d("react.element"),o=d("react.portal"),t.Fragment=d("react.fragment"),t.StrictMode=d("react.strict_mode"),t.Profiler=d("react.profiler"),a=d("react.provider"),s=d("react.context"),l=d("react.forward_ref"),t.Suspense=d("react.suspense"),c=d("react.memo"),u=d("react.lazy")}var f="function"===typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}function v(){}function y(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||h}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=g.prototype;var b=y.prototype=new v;b.constructor=y,r(b,g.prototype),b.isPureReactComponent=!0;var x={current:null},w=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function j(e,t,n){var r,o={},a=null,s=null;if(null!=t)for(r in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(a=""+t.key),t)w.call(t,r)&&!k.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(1===l)o.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];o.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===o[r]&&(o[r]=l[r]);return{$$typeof:i,type:e,key:a,ref:s,props:o,_owner:x.current}}function S(e){return"object"===typeof e&&null!==e&&e.$$typeof===i}var C=/\/+/g;function E(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function T(e,t,n,r,a){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l=!1;if(null===e)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case i:case o:l=!0}}if(l)return a=a(l=e),e=""===r?"."+E(l,0):r,Array.isArray(a)?(n="",null!=e&&(n=e.replace(C,"$&/")+"/"),T(a,t,n,"",(function(e){return e}))):null!=a&&(S(a)&&(a=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(C,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var c=0;c<e.length;c++){var u=r+E(s=e[c],c);l+=T(s,t,n,u,a)}else if(u=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"===typeof u)for(e=u.call(e),c=0;!(s=e.next()).done;)l+=T(s=s.value,t,n,u=r+E(s,c++),a);else if("object"===s)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function P(e,t,n){if(null==e)return e;var r=[],i=0;return T(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function O(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var A={current:null};function z(){var e=A.current;if(null===e)throw Error(p(321));return e}var $={ReactCurrentDispatcher:A,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:x,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:P,forEach:function(e,t,n){P(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return P(e,(function(){t++})),t},toArray:function(e){return P(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(p(143));return e}},t.Component=g,t.PureComponent=y,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error(p(267,e));var o=r({},e.props),a=e.key,s=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,l=x.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(u in t)w.call(t,u)&&!k.hasOwnProperty(u)&&(o[u]=void 0===t[u]&&void 0!==c?c[u]:t[u])}var u=arguments.length-2;if(1===u)o.children=n;else if(1<u){c=Array(u);for(var d=0;d<u;d++)c[d]=arguments[d+2];o.children=c}return{$$typeof:i,type:e.type,key:a,ref:s,props:o,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:s,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=j,t.createFactory=function(e){var t=j.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=S,t.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:O}},t.memo=function(e,t){return{$$typeof:c,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return z().useCallback(e,t)},t.useContext=function(e,t){return z().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return z().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return z().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return z().useLayoutEffect(e,t)},t.useMemo=function(e,t){return z().useMemo(e,t)},t.useReducer=function(e,t,n){return z().useReducer(e,t,n)},t.useRef=function(e){return z().useRef(e)},t.useState=function(e){return z().useState(e)},t.version="17.0.2"},218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},219:(e,t,n)=>{"use strict";var r=n(763),i={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},s={};function l(e){return r.isMemo(e)?a:s[e.$$typeof]||i}s[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s[r.Memo]=a;var c=Object.defineProperty,u=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,n,r){if("string"!==typeof n){if(h){var i=p(n);i&&i!==h&&e(t,i,r)}var a=u(n);d&&(a=a.concat(d(n)));for(var s=l(t),m=l(n),g=0;g<a.length;++g){var v=a[g];if(!o[v]&&(!r||!r[v])&&(!m||!m[v])&&(!s||!s[v])){var y=f(n,v);try{c(t,v,y)}catch(b){}}}}return t}},225:(e,t,n)=>{"use strict";var r=n(43),i=(0,n(736).getSerializers)(r.createElement),o=i.defaultSerializers,a=i.serializeSpan;e.exports={serializeSpan:a,serializers:o,renderProps:{nestMarks:!0}}},234:(e,t)=>{"use strict";var n,r,i,o;if("object"===typeof performance&&"function"===typeof performance.now){var a=performance;t.unstable_now=function(){return a.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}if("undefined"===typeof window||"function"!==typeof MessageChannel){var c=null,u=null,d=function(){if(null!==c)try{var e=t.unstable_now();c(!0,e),c=null}catch(n){throw setTimeout(d,0),n}};n=function(e){null!==c?setTimeout(n,0,e):(c=e,setTimeout(d,0))},r=function(e,t){u=setTimeout(e,t)},i=function(){clearTimeout(u)},t.unstable_shouldYield=function(){return!1},o=t.unstable_forceFrameRate=function(){}}else{var f=window.setTimeout,p=window.clearTimeout;if("undefined"!==typeof console){var h=window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!==typeof h&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var m=!1,g=null,v=-1,y=5,b=0;t.unstable_shouldYield=function(){return t.unstable_now()>=b},o=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<e?Math.floor(1e3/e):5};var x=new MessageChannel,w=x.port2;x.port1.onmessage=function(){if(null!==g){var e=t.unstable_now();b=e+y;try{g(!0,e)?w.postMessage(null):(m=!1,g=null)}catch(n){throw w.postMessage(null),n}}else m=!1},n=function(e){g=e,m||(m=!0,w.postMessage(null))},r=function(e,n){v=f((function(){e(t.unstable_now())}),n)},i=function(){p(v),v=-1}}function k(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,i=e[r];if(!(void 0!==i&&0<C(i,t)))break e;e[r]=t,e[n]=i,n=r}}function j(e){return void 0===(e=e[0])?null:e}function S(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length;r<i;){var o=2*(r+1)-1,a=e[o],s=o+1,l=e[s];if(void 0!==a&&0>C(a,n))void 0!==l&&0>C(l,a)?(e[r]=l,e[s]=n,r=s):(e[r]=a,e[o]=n,r=o);else{if(!(void 0!==l&&0>C(l,n)))break e;e[r]=l,e[s]=n,r=s}}}return t}return null}function C(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var E=[],T=[],P=1,O=null,A=3,z=!1,$=!1,R=!1;function _(e){for(var t=j(T);null!==t;){if(null===t.callback)S(T);else{if(!(t.startTime<=e))break;S(T),t.sortIndex=t.expirationTime,k(E,t)}t=j(T)}}function I(e){if(R=!1,_(e),!$)if(null!==j(E))$=!0,n(M);else{var t=j(T);null!==t&&r(I,t.startTime-e)}}function M(e,n){$=!1,R&&(R=!1,i()),z=!0;var o=A;try{for(_(n),O=j(E);null!==O&&(!(O.expirationTime>n)||e&&!t.unstable_shouldYield());){var a=O.callback;if("function"===typeof a){O.callback=null,A=O.priorityLevel;var s=a(O.expirationTime<=n);n=t.unstable_now(),"function"===typeof s?O.callback=s:O===j(E)&&S(E),_(n)}else S(E);O=j(E)}if(null!==O)var l=!0;else{var c=j(T);null!==c&&r(I,c.startTime-n),l=!1}return l}finally{O=null,A=o,z=!1}}var L=o;t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){$||z||($=!0,n(M))},t.unstable_getCurrentPriorityLevel=function(){return A},t.unstable_getFirstCallbackNode=function(){return j(E)},t.unstable_next=function(e){switch(A){case 1:case 2:case 3:var t=3;break;default:t=A}var n=A;A=t;try{return e()}finally{A=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=L,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=A;A=e;try{return t()}finally{A=n}},t.unstable_scheduleCallback=function(e,o,a){var s=t.unstable_now();switch("object"===typeof a&&null!==a?a="number"===typeof(a=a.delay)&&0<a?s+a:s:a=s,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return e={id:P++,callback:o,priorityLevel:e,startTime:a,expirationTime:l=a+l,sortIndex:-1},a>s?(e.sortIndex=a,k(T,e),null===j(E)&&e===j(T)&&(R?i():R=!0,r(I,a-s))):(e.sortIndex=l,k(E,e),$||z||($=!0,n(M))),e},t.unstable_wrapCallback=function(e){var t=A;return function(){var n=A;A=t;try{return e.apply(this,arguments)}finally{A=n}}}},287:(e,t,n)=>{"use strict";var r=n(123),i=n(68);e.exports=function(e,t){var n=t||{useDashedStyles:!1};function o(t,n){return e(t,null,n.children)}return{defaultSerializers:{types:{block:function(t){var n=t.node.style||"normal";return/^h\d/.test(n)?e(n,null,t.children):e("blockquote"===n?"blockquote":"p",null,t.children)},image:function(t){if(!t.node.asset)return null;var n=e("img",{src:i(t)});return t.isInline?n:e("figure",null,n)}},marks:{strong:o.bind(null,"strong"),em:o.bind(null,"em"),code:o.bind(null,"code"),underline:function(t){var r=n.useDashedStyles?{"text-decoration":"underline"}:{textDecoration:"underline"};return e("span",{style:r},t.children)},"strike-through":function(t){return e("del",null,t.children)},link:function(t){return e("a",{href:t.mark.href},t.children)}},list:function(t){var n="bullet"===t.type?"ul":"ol";return e(n,null,t.children)},listItem:function(t){var n=t.node.style&&"normal"!==t.node.style?e(t.serializers.types.block,t,t.children):t.children;return e("li",null,n)},block:function(t){var n=t.node,r=t.serializers,i=t.options,o=t.isInline,a=t.children,s=n._type,l=r.types[s];if(!l){if(i.ignoreUnknownTypes)return console.warn('Unknown block type "'.concat(s,'", please specify a serializer for it in the `serializers.types` prop')),e(r.unknownType,{node:n,options:i,isInline:o},a);throw new Error('Unknown block type "'.concat(s,'", please specify a serializer for it in the `serializers.types` prop'))}return e(l,{node:n,options:i,isInline:o},a)},span:function(t){var n=t.node,r=n.mark,i=n.children,o="string"===typeof r?r:r._type,a=t.serializers.marks[o];return a?e(a,t.node,i):(console.warn('Unknown mark type "'.concat(o,'", please specify a serializer for it in the `serializers.marks` prop')),e(t.serializers.unknownMark,null,i))},hardBreak:function(){return e("br")},unknownType:function(t){return e("div",{style:{display:"none"}},'Unknown block type "'.concat(t.node._type,'", please specify a serializer for it in the `serializers.types` prop'))},unknownMark:"span",container:"div",text:void 0,empty:""},serializeSpan:function(t,n,i,o){if("\n"===t&&n.hardBreak)return e(n.hardBreak,{key:"hb-".concat(i)});if("string"===typeof t)return n.text?e(n.text,{key:"text-".concat(i)},t):t;var a;t.children&&(a={children:t.children.map((function(e,n){return o.serializeNode(e,n,t.children,!0)}))});var s=r({},t,a);return e(n.span,{key:t._key||"span-".concat(i),node:s,serializers:n})}}}},313:(e,t,n)=>{"use strict";function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}var i=n(123);e.exports=function(e,t){return Object.keys(e).reduce((function(n,o){var a=r(e[o]);return n[o]="function"===a?"undefined"!==typeof t[o]?t[o]:e[o]:"object"===a?i({},e[o],t[o]):"undefined"===typeof t[o]?e[o]:t[o],n}),{})}},324:e=>{e.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(void 0!==i)return!!i;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var o=Object.keys(e),a=Object.keys(t);if(o.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<o.length;l++){var c=o[l];if(!s(c))return!1;var u=e[c],d=t[c];if(!1===(i=n?n.call(r,u,d,c):void 0)||void 0===i&&u!==d)return!1}return!0}},366:e=>{var t="undefined"!==typeof Element,n="function"===typeof Map,r="function"===typeof Set,i="function"===typeof ArrayBuffer&&!!ArrayBuffer.isView;function o(e,a){if(e===a)return!0;if(e&&a&&"object"==typeof e&&"object"==typeof a){if(e.constructor!==a.constructor)return!1;var s,l,c,u;if(Array.isArray(e)){if((s=e.length)!=a.length)return!1;for(l=s;0!==l--;)if(!o(e[l],a[l]))return!1;return!0}if(n&&e instanceof Map&&a instanceof Map){if(e.size!==a.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1;for(u=e.entries();!(l=u.next()).done;)if(!o(l.value[1],a.get(l.value[0])))return!1;return!0}if(r&&e instanceof Set&&a instanceof Set){if(e.size!==a.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!a.has(l.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(a)){if((s=e.length)!=a.length)return!1;for(l=s;0!==l--;)if(e[l]!==a[l])return!1;return!0}if(e.constructor===RegExp)return e.source===a.source&&e.flags===a.flags;if(e.valueOf!==Object.prototype.valueOf&&"function"===typeof e.valueOf&&"function"===typeof a.valueOf)return e.valueOf()===a.valueOf();if(e.toString!==Object.prototype.toString&&"function"===typeof e.toString&&"function"===typeof a.toString)return e.toString()===a.toString();if((s=(c=Object.keys(e)).length)!==Object.keys(a).length)return!1;for(l=s;0!==l--;)if(!Object.prototype.hasOwnProperty.call(a,c[l]))return!1;if(t&&e instanceof Element)return!1;for(l=s;0!==l--;)if(("_owner"!==c[l]&&"__v"!==c[l]&&"__o"!==c[l]||!e.$$typeof)&&!o(e[c[l]],a[c[l]]))return!1;return!0}return e!==e&&a!==a}e.exports=function(e,t){try{return o(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},404:(e,t,n)=>{"use strict";var r=n(287),i=n(150),o=n(68),a=n(313);e.exports={blocksToNodes:function(e,t,n,o){if(n)return i(e,t,n,o);var a=r(e);return i(e,t,a.defaultSerializers,a.serializeSpan)},getSerializers:r,getImageUrl:o,mergeSerializers:a}},490:(e,t,n)=>{"use strict";n.d(t,{C:()=>a,Q:()=>u});var r={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},i={0:8203,1:8204,2:8205,3:65279},o=new Array(4).fill(String.fromCodePoint(i[0])).join("");function a(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"auto";return!0===n||"auto"===n&&(function(e){return!(!Number.isNaN(Number(e))||/[a-z]/i.test(e)&&!/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(e))&&!!Date.parse(e)}(e)||function(e){try{new URL(e,e.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}(e))?e:`${e}${function(e){let t=JSON.stringify(e);return`${o}${Array.from(t).map((e=>{let n=e.charCodeAt(0);if(n>255)throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${t} on character ${e} (${n})`);return Array.from(n.toString(4).padStart(4,"0")).map((e=>String.fromCodePoint(i[e]))).join("")})).join("")}`}(t)}`}Object.fromEntries(Object.entries(i).map((e=>e.reverse()))),Object.fromEntries(Object.entries(r).map((e=>e.reverse())));var s=`${Object.values(r).map((e=>`\\u{${e.toString(16)}}`)).join("")}`,l=new RegExp(`[${s}]{4,}`,"gu");function c(e){return e&&JSON.parse(function(e){var t;return{cleaned:e.replace(l,""),encoded:(null==(t=e.match(l))?void 0:t[0])||""}}(JSON.stringify(e)).cleaned)}function u(e){return c(e)}},497:(e,t,n)=>{"use strict";var r=n(218);function i(){}function o(){}o.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,o,a){if(a!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:i};return n.PropTypes=n,n}},504:(e,t,n)=>{var r=n(141);e.exports=h,e.exports.parse=o,e.exports.compile=function(e,t){return l(o(e,t),t)},e.exports.tokensToFunction=l,e.exports.tokensToRegExp=p;var i=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function o(e,t){for(var n,r=[],o=0,s=0,l="",c=t&&t.delimiter||"/";null!=(n=i.exec(e));){var d=n[0],f=n[1],p=n.index;if(l+=e.slice(s,p),s=p+d.length,f)l+=f[1];else{var h=e[s],m=n[2],g=n[3],v=n[4],y=n[5],b=n[6],x=n[7];l&&(r.push(l),l="");var w=null!=m&&null!=h&&h!==m,k="+"===b||"*"===b,j="?"===b||"*"===b,S=m||c,C=v||y,E=m||("string"===typeof r[r.length-1]?r[r.length-1]:"");r.push({name:g||o++,prefix:m||"",delimiter:S,optional:j,repeat:k,partial:w,asterisk:!!x,pattern:C?u(C):x?".*":a(S,E)})}}return s<e.length&&(l+=e.substr(s)),l&&r.push(l),r}function a(e,t){return!t||t.indexOf(e)>-1?"[^"+c(e)+"]+?":c(t)+"|(?:(?!"+c(t)+")[^"+c(e)+"])+?"}function s(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function l(e,t){for(var n=new Array(e.length),i=0;i<e.length;i++)"object"===typeof e[i]&&(n[i]=new RegExp("^(?:"+e[i].pattern+")$",f(t)));return function(t,i){for(var o="",a=t||{},l=(i||{}).pretty?s:encodeURIComponent,c=0;c<e.length;c++){var u=e[c];if("string"!==typeof u){var d,f=a[u.name];if(null==f){if(u.optional){u.partial&&(o+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(r(f)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<f.length;p++){if(d=l(f[p]),!n[c].test(d))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(d)+"`");o+=(0===p?u.prefix:u.delimiter)+d}}else{if(d=u.asterisk?encodeURI(f).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):l(f),!n[c].test(d))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+d+'"');o+=u.prefix+d}}else o+=u}return o}}function c(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function d(e,t){return e.keys=t,e}function f(e){return e&&e.sensitive?"":"i"}function p(e,t,n){r(t)||(n=t||n,t=[]);for(var i=(n=n||{}).strict,o=!1!==n.end,a="",s=0;s<e.length;s++){var l=e[s];if("string"===typeof l)a+=c(l);else{var u=c(l.prefix),p="(?:"+l.pattern+")";t.push(l),l.repeat&&(p+="(?:"+u+p+")*"),a+=p=l.optional?l.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")"}}var h=c(n.delimiter||"/"),m=a.slice(-h.length)===h;return i||(a=(m?a.slice(0,-h.length):a)+"(?:"+h+"(?=$))?"),a+=o?"$":i&&m?"":"(?="+h+"|$)",d(new RegExp("^"+a,f(n)),t)}function h(e,t,n){return r(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return d(e,t)}(e,t):r(e)?function(e,t,n){for(var r=[],i=0;i<e.length;i++)r.push(h(e[i],t,n).source);return d(new RegExp("(?:"+r.join("|")+")",f(n)),t)}(e,t,n):function(e,t,n){return p(o(e,n),t,n)}(e,t,n)}},528:(e,t)=>{"use strict";var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler");Symbol.for("react.provider");var s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.view_transition"),m=Symbol.for("react.client.reference");function g(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case i:case a:case o:case u:case d:case h:return e;default:switch(e=e&&e.$$typeof){case l:case c:case p:case f:case s:return e;default:return t}}case r:return t}}}t.Hy=function(e){return"string"===typeof e||"function"===typeof e||e===i||e===a||e===o||e===u||e===d||"object"===typeof e&&null!==e&&(e.$$typeof===p||e.$$typeof===f||e.$$typeof===l||e.$$typeof===s||e.$$typeof===c||e.$$typeof===m||void 0!==e.getModuleId)},t.QP=g},564:e=>{e.exports=function(e){return"https://docs.sanity.io/help/"+e}},579:(e,t,n)=>{"use strict";e.exports=n(153)},658:e=>{"use strict";var t=["strong","em","code","underline","strike-through"];function n(e,t,n){if(!e.marks||0===e.marks.length)return e.marks||[];var i=e.marks.reduce((function(e,r){e[r]=e[r]?e[r]+1:1;for(var i=t+1;i<n.length;i++){var o=n[i];if(!o.marks||!Array.isArray(o.marks)||-1===o.marks.indexOf(r))break;e[r]++}return e}),{}),o=r.bind(null,i);return e.marks.slice().sort(o)}function r(e,n,r){var i=e[n]||0,o=e[r]||0;if(i!==o)return o-i;var a=t.indexOf(n),s=t.indexOf(r);return a!==s?a-s:n<r?-1:n>r?1:0}e.exports=function(e){var t=e.children,r=e.markDefs;if(!t||!t.length)return[];var i=t.map(n),o={_type:"span",children:[]},a=[o];return t.forEach((function(e,t){var n=i[t];if(n){var o=1;if(a.length>1)for(;o<a.length;o++){var s=a[o].markKey,l=n.indexOf(s);if(-1===l)break;n.splice(l,1)}var c,u=function(e){for(var t=e.length-1;t>=0;t--){var n=e[t];if("span"===n._type&&n.children)return n}return}(a=a.slice(0,o));if(n.forEach((function(t){var n={_type:"span",_key:e._key,children:[],mark:r.find((function(e){return e._key===t}))||t,markKey:t};u.children.push(n),a.push(n),u=n})),"span"!==(c=e)._type||"string"!==typeof c.text||!Array.isArray(c.marks)&&"undefined"!==typeof c.marks)u.children=u.children.concat(e);else{for(var d=e.text.split("\n"),f=d.length;f-- >1;)d.splice(f,0,"\n");u.children=u.children.concat(d)}}else{a[a.length-1].children.push(e)}})),o.children}},672:function(e){e.exports=function(){function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.apply(this,arguments)}function t(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function r(e){var n=0;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=t(e)))return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}var i="image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";function o(e){var t=e.split("-"),n=t[1],r=t[2],o=t[3];if(!n||!r||!o)throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');var a=r.split("x"),s=+a[0],l=+a[1];if(!isFinite(s)||!isFinite(l))throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');return{id:n,width:s,height:l,format:o}}var a=function(e){return!!e&&"string"===typeof e._ref},s=function(e){return!!e&&"string"===typeof e._id},l=function(e){var t=e;return!(!t||!t.asset)&&"string"===typeof t.asset.url};function c(e){if(!e)return null;var t;if("string"===typeof e&&u(e))t={asset:{_ref:d(e)}};else if("string"===typeof e)t={asset:{_ref:e}};else if(a(e))t={asset:e};else if(s(e))t={asset:{_ref:e._id||""}};else if(l(e))t={asset:{_ref:d(e.asset.url)}};else{if("object"!==typeof e.asset)return null;t=e}var n=e;return n.crop&&(t.crop=n.crop),n.hotspot&&(t.hotspot=n.hotspot),f(t)}function u(e){return/^https?:\/\//.test(""+e)}function d(e){return("image-"+e.split("/").slice(-1)[0]).replace(/\.([a-z]+)$/,"-$1")}function f(t){if(t.crop&&t.hotspot)return t;var n=e({},t);return n.crop||(n.crop={left:0,top:0,bottom:0,right:0}),n.hotspot||(n.hotspot={x:.5,y:.5,height:1,width:1}),n}var p=[["width","w"],["height","h"],["format","fm"],["download","dl"],["blur","blur"],["sharpen","sharp"],["invert","invert"],["orientation","or"],["minHeight","min-h"],["maxHeight","max-h"],["minWidth","min-w"],["maxWidth","max-w"],["quality","q"],["fit","fit"],["crop","crop"],["saturation","sat"],["auto","auto"],["dpr","dpr"],["pad","pad"]];function h(t){var n=e({},t||{}),r=n.source;delete n.source;var i=c(r);if(!i)return null;var a=o(i.asset._ref||i.asset._id||""),s=Math.round(i.crop.left*a.width),l=Math.round(i.crop.top*a.height),u={left:s,top:l,width:Math.round(a.width-i.crop.right*a.width-s),height:Math.round(a.height-i.crop.bottom*a.height-l)},d=i.hotspot.height*a.height/2,f=i.hotspot.width*a.width/2,p=i.hotspot.x*a.width,h=i.hotspot.y*a.height,v={left:p-f,top:h-d,right:p+f,bottom:h+d};return n.rect||n.focalPoint||n.ignoreImageParams||n.crop||(n=e(e({},n),g({crop:u,hotspot:v},n))),m(e(e({},n),{},{asset:a}))}function m(e){var t=e.baseUrl||"https://cdn.sanity.io",n=e.asset.id+"-"+e.asset.width+"x"+e.asset.height+"."+e.asset.format,r=t+"/images/"+e.projectId+"/"+e.dataset+"/"+n,i=[];if(e.rect){var o=e.rect,a=o.left,s=o.top,l=o.width,c=o.height;(0!==a||0!==s||c!==e.asset.height||l!==e.asset.width)&&i.push("rect="+a+","+s+","+l+","+c)}e.bg&&i.push("bg="+e.bg),e.focalPoint&&(i.push("fp-x="+e.focalPoint.x),i.push("fp-y="+e.focalPoint.y));var u=[e.flipHorizontal&&"h",e.flipVertical&&"v"].filter(Boolean).join("");return u&&i.push("flip="+u),p.forEach((function(t){var n=t[0],r=t[1];"undefined"!==typeof e[n]?i.push(r+"="+encodeURIComponent(e[n])):"undefined"!==typeof e[r]&&i.push(r+"="+encodeURIComponent(e[r]))})),0===i.length?r:r+"?"+i.join("&")}function g(e,t){var n,r=t.width,i=t.height;if(!r||!i)return{width:r,height:i,rect:e.crop};var o=e.crop,a=e.hotspot,s=r/i;if(o.width/o.height>s){var l=o.height,c=l*s,u=o.top,d=(a.right-a.left)/2+a.left-c/2;d<o.left?d=o.left:d+c>o.left+o.width&&(d=o.left+o.width-c),n={left:Math.round(d),top:Math.round(u),width:Math.round(c),height:Math.round(l)}}else{var f=o.width,p=f/s,h=o.left,m=(a.bottom-a.top)/2+a.top-p/2;m<o.top?m=o.top:m+p>o.top+o.height&&(m=o.top+o.height-p),n={left:Math.max(0,Math.floor(h)),top:Math.max(0,Math.floor(m)),width:Math.round(f),height:Math.round(p)}}return{width:r,height:i,rect:n}}var v=["clip","crop","fill","fillmax","max","scale","min"],y=["top","bottom","left","right","center","focalpoint","entropy"],b=["format"];function x(e){return!!e&&"object"===typeof e.clientConfig}function w(e){for(var t,n=r(p);!(t=n()).done;){var i=t.value,o=i[0],a=i[1];if(e===o||e===a)return o}return e}function k(e){var t=e;if(x(t)){var n=t.clientConfig,r=n.apiHost,i=n.projectId,o=n.dataset;return new j(null,{baseUrl:(r||"https://api.sanity.io").replace(/^https:\/\/api\./,"https://cdn."),projectId:i,dataset:o})}return new j(null,e)}var j=function(){function t(t,n){this.options=e(t?e({},t.options||{}):{},n||{})}var n=t.prototype;return n.withOptions=function(n){var r=n.baseUrl||this.options.baseUrl,i={baseUrl:r};for(var o in n)n.hasOwnProperty(o)&&(i[w(o)]=n[o]);return new t(this,e({baseUrl:r},i))},n.image=function(e){return this.withOptions({source:e})},n.dataset=function(e){return this.withOptions({dataset:e})},n.projectId=function(e){return this.withOptions({projectId:e})},n.bg=function(e){return this.withOptions({bg:e})},n.dpr=function(e){return this.withOptions({dpr:e})},n.width=function(e){return this.withOptions({width:e})},n.height=function(e){return this.withOptions({height:e})},n.focalPoint=function(e,t){return this.withOptions({focalPoint:{x:e,y:t}})},n.maxWidth=function(e){return this.withOptions({maxWidth:e})},n.minWidth=function(e){return this.withOptions({minWidth:e})},n.maxHeight=function(e){return this.withOptions({maxHeight:e})},n.minHeight=function(e){return this.withOptions({minHeight:e})},n.size=function(e,t){return this.withOptions({width:e,height:t})},n.blur=function(e){return this.withOptions({blur:e})},n.sharpen=function(e){return this.withOptions({sharpen:e})},n.rect=function(e,t,n,r){return this.withOptions({rect:{left:e,top:t,width:n,height:r}})},n.format=function(e){return this.withOptions({format:e})},n.invert=function(e){return this.withOptions({invert:e})},n.orientation=function(e){return this.withOptions({orientation:e})},n.quality=function(e){return this.withOptions({quality:e})},n.forceDownload=function(e){return this.withOptions({download:e})},n.flipHorizontal=function(){return this.withOptions({flipHorizontal:!0})},n.flipVertical=function(){return this.withOptions({flipVertical:!0})},n.ignoreImageParams=function(){return this.withOptions({ignoreImageParams:!0})},n.fit=function(e){if(-1===v.indexOf(e))throw new Error('Invalid fit mode "'+e+'"');return this.withOptions({fit:e})},n.crop=function(e){if(-1===y.indexOf(e))throw new Error('Invalid crop mode "'+e+'"');return this.withOptions({crop:e})},n.saturation=function(e){return this.withOptions({saturation:e})},n.auto=function(e){if(-1===b.indexOf(e))throw new Error('Invalid auto mode "'+e+'"');return this.withOptions({auto:e})},n.pad=function(e){return this.withOptions({pad:e})},n.url=function(){return h(this.options)},n.toString=function(){return this.url()},t}();return k}()},681:(e,t,n)=>{"use strict";n(5)},730:(e,t,n)=>{"use strict";var r=n(43),i=n(123),o=n(853);function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!r)throw Error(a(227));var s=new Set,l={};function c(e,t){u(e,t),u(e+"Capture",t)}function u(e,t){for(l[e]=t,e=0;e<t.length;e++)s.add(t[e])}var d=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),f=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p=Object.prototype.hasOwnProperty,h={},m={};function g(e,t,n,r,i,o,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){v[e]=new g(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];v[t]=new g(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){v[e]=new g(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){v[e]=new g(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){v[e]=new g(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){v[e]=new g(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){v[e]=new g(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){v[e]=new g(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){v[e]=new g(e,5,!1,e.toLowerCase(),null,!1,!1)}));var y=/[\-:]([a-z])/g;function b(e){return e[1].toUpperCase()}function x(e,t,n,r){var i=v.hasOwnProperty(t)?v[t]:null;(null!==i?0===i.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(function(e,t,n,r){if(null===t||"undefined"===typeof t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!p.call(m,e)||!p.call(h,e)&&(f.test(e)?m[e]=!0:(h[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(y,b);v[t]=new g(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!1,!1)})),v.xlinkHref=new g("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){v[e]=new g(e,1,!1,e.toLowerCase(),null,!0,!0)}));var w=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,k=60103,j=60106,S=60107,C=60108,E=60114,T=60109,P=60110,O=60112,A=60113,z=60120,$=60115,R=60116,_=60121,I=60128,M=60129,L=60130,D=60131;if("function"===typeof Symbol&&Symbol.for){var N=Symbol.for;k=N("react.element"),j=N("react.portal"),S=N("react.fragment"),C=N("react.strict_mode"),E=N("react.profiler"),T=N("react.provider"),P=N("react.context"),O=N("react.forward_ref"),A=N("react.suspense"),z=N("react.suspense_list"),$=N("react.memo"),R=N("react.lazy"),_=N("react.block"),N("react.scope"),I=N("react.opaque.id"),M=N("react.debug_trace_mode"),L=N("react.offscreen"),D=N("react.legacy_hidden")}var F,V="function"===typeof Symbol&&Symbol.iterator;function U(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=V&&e[V]||e["@@iterator"])?e:null}function B(e){if(void 0===F)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);F=t&&t[1]||""}return"\n"+F+e}var H=!1;function q(e,t){if(!e||H)return"";H=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(l){var r=l}Reflect.construct(e,[],t)}else{try{t.call()}catch(l){r=l}e.call(t.prototype)}else{try{throw Error()}catch(l){r=l}e()}}catch(l){if(l&&r&&"string"===typeof l.stack){for(var i=l.stack.split("\n"),o=r.stack.split("\n"),a=i.length-1,s=o.length-1;1<=a&&0<=s&&i[a]!==o[s];)s--;for(;1<=a&&0<=s;a--,s--)if(i[a]!==o[s]){if(1!==a||1!==s)do{if(a--,0>--s||i[a]!==o[s])return"\n"+i[a].replace(" at new "," at ")}while(1<=a&&0<=s);break}}}finally{H=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?B(e):""}function W(e){switch(e.tag){case 5:return B(e.type);case 16:return B("Lazy");case 13:return B("Suspense");case 19:return B("SuspenseList");case 0:case 2:case 15:return e=q(e.type,!1);case 11:return e=q(e.type.render,!1);case 22:return e=q(e.type._render,!1);case 1:return e=q(e.type,!0);default:return""}}function Y(e){if(null==e)return null;if("function"===typeof e)return e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case S:return"Fragment";case j:return"Portal";case E:return"Profiler";case C:return"StrictMode";case A:return"Suspense";case z:return"SuspenseList"}if("object"===typeof e)switch(e.$$typeof){case P:return(e.displayName||"Context")+".Consumer";case T:return(e._context.displayName||"Context")+".Provider";case O:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case $:return Y(e.type);case _:return Y(e._render);case R:t=e._payload,e=e._init;try{return Y(e(t))}catch(n){}}return null}function X(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function K(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function G(e){e._valueTracker||(e._valueTracker=function(e){var t=K(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function J(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=K(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function Q(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Z(e,t){var n=t.checked;return i({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function ee(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=X(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function te(e,t){null!=(t=t.checked)&&x(e,"checked",t,!1)}function ne(e,t){te(e,t);var n=X(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ie(e,t.type,n):t.hasOwnProperty("defaultValue")&&ie(e,t.type,X(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function re(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ie(e,t,n){"number"===t&&Q(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function oe(e,t){return e=i({children:void 0},t),(t=function(e){var t="";return r.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function ae(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+X(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function se(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(a(91));return i({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function le(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(a(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(a(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:X(n)}}function ce(e,t){var n=X(t.value),r=X(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function ue(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var de="http://www.w3.org/1999/xhtml",fe="http://www.w3.org/2000/svg";function pe(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function he(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?pe(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var me,ge,ve=(ge=function(e,t){if(e.namespaceURI!==fe||"innerHTML"in e)e.innerHTML=t;else{for((me=me||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=me.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return ge(e,t)}))}:ge);function ye(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var be={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xe=["Webkit","ms","Moz","O"];function we(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||be.hasOwnProperty(e)&&be[e]?(""+t).trim():t+"px"}function ke(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=we(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(be).forEach((function(e){xe.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),be[t]=be[e]}))}));var je=i({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Se(e,t){if(t){if(je[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(a(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(a(60));if("object"!==typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(a(61))}if(null!=t.style&&"object"!==typeof t.style)throw Error(a(62))}}function Ce(e,t){if(-1===e.indexOf("-"))return"string"===typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ee(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Te=null,Pe=null,Oe=null;function Ae(e){if(e=ri(e)){if("function"!==typeof Te)throw Error(a(280));var t=e.stateNode;t&&(t=oi(t),Te(e.stateNode,e.type,t))}}function ze(e){Pe?Oe?Oe.push(e):Oe=[e]:Pe=e}function $e(){if(Pe){var e=Pe,t=Oe;if(Oe=Pe=null,Ae(e),t)for(e=0;e<t.length;e++)Ae(t[e])}}function Re(e,t){return e(t)}function _e(e,t,n,r,i){return e(t,n,r,i)}function Ie(){}var Me=Re,Le=!1,De=!1;function Ne(){null===Pe&&null===Oe||(Ie(),$e())}function Fe(e,t){var n=e.stateNode;if(null===n)return null;var r=oi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(a(231,t,typeof n));return n}var Ve=!1;if(d)try{var Ue={};Object.defineProperty(Ue,"passive",{get:function(){Ve=!0}}),window.addEventListener("test",Ue,Ue),window.removeEventListener("test",Ue,Ue)}catch(ge){Ve=!1}function Be(e,t,n,r,i,o,a,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var He=!1,qe=null,We=!1,Ye=null,Xe={onError:function(e){He=!0,qe=e}};function Ke(e,t,n,r,i,o,a,s,l){He=!1,qe=null,Be.apply(Xe,arguments)}function Ge(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Je(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function Qe(e){if(Ge(e)!==e)throw Error(a(188))}function Ze(e){if(e=function(e){var t=e.alternate;if(!t){if(null===(t=Ge(e)))throw Error(a(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var o=i.alternate;if(null===o){if(null!==(r=i.return)){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return Qe(i),e;if(o===r)return Qe(i),t;o=o.sibling}throw Error(a(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(a(189))}}if(n.alternate!==r)throw Error(a(190))}if(3!==n.tag)throw Error(a(188));return n.stateNode.current===n?e:t}(e),!e)return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function et(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var tt,nt,rt,it,ot=!1,at=[],st=null,lt=null,ct=null,ut=new Map,dt=new Map,ft=[],pt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ht(e,t,n,r,i){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:i,targetContainers:[r]}}function mt(e,t){switch(e){case"focusin":case"focusout":st=null;break;case"dragenter":case"dragleave":lt=null;break;case"mouseover":case"mouseout":ct=null;break;case"pointerover":case"pointerout":ut.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":dt.delete(t.pointerId)}}function gt(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e=ht(t,n,r,i,o),null!==t&&(null!==(t=ri(t))&&nt(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function vt(e){var t=ni(e.target);if(null!==t){var n=Ge(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Je(n)))return e.blockedOn=t,void it(e.lanePriority,(function(){o.unstable_runWithPriority(e.priority,(function(){rt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function yt(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=ri(n))&&nt(t),e.blockedOn=n,!1;t.shift()}return!0}function bt(e,t,n){yt(e)&&n.delete(t)}function xt(){for(ot=!1;0<at.length;){var e=at[0];if(null!==e.blockedOn){null!==(e=ri(e.blockedOn))&&tt(e);break}for(var t=e.targetContainers;0<t.length;){var n=Zt(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&at.shift()}null!==st&&yt(st)&&(st=null),null!==lt&&yt(lt)&&(lt=null),null!==ct&&yt(ct)&&(ct=null),ut.forEach(bt),dt.forEach(bt)}function wt(e,t){e.blockedOn===t&&(e.blockedOn=null,ot||(ot=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,xt)))}function kt(e){function t(t){return wt(t,e)}if(0<at.length){wt(at[0],e);for(var n=1;n<at.length;n++){var r=at[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==st&&wt(st,e),null!==lt&&wt(lt,e),null!==ct&&wt(ct,e),ut.forEach(t),dt.forEach(t),n=0;n<ft.length;n++)(r=ft[n]).blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&null===(n=ft[0]).blockedOn;)vt(n),null===n.blockedOn&&ft.shift()}function jt(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var St={animationend:jt("Animation","AnimationEnd"),animationiteration:jt("Animation","AnimationIteration"),animationstart:jt("Animation","AnimationStart"),transitionend:jt("Transition","TransitionEnd")},Ct={},Et={};function Tt(e){if(Ct[e])return Ct[e];if(!St[e])return e;var t,n=St[e];for(t in n)if(n.hasOwnProperty(t)&&t in Et)return Ct[e]=n[t];return e}d&&(Et=document.createElement("div").style,"AnimationEvent"in window||(delete St.animationend.animation,delete St.animationiteration.animation,delete St.animationstart.animation),"TransitionEvent"in window||delete St.transitionend.transition);var Pt=Tt("animationend"),Ot=Tt("animationiteration"),At=Tt("animationstart"),zt=Tt("transitionend"),$t=new Map,Rt=new Map,_t=["abort","abort",Pt,"animationEnd",Ot,"animationIteration",At,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",zt,"transitionEnd","waiting","waiting"];function It(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];i="on"+(i[0].toUpperCase()+i.slice(1)),Rt.set(r,t),$t.set(r,i),c(i,[r])}}(0,o.unstable_now)();var Mt=8;function Lt(e){if(0!==(1&e))return Mt=15,1;if(0!==(2&e))return Mt=14,2;if(0!==(4&e))return Mt=13,4;var t=24&e;return 0!==t?(Mt=12,t):0!==(32&e)?(Mt=11,32):0!==(t=192&e)?(Mt=10,t):0!==(256&e)?(Mt=9,256):0!==(t=3584&e)?(Mt=8,t):0!==(4096&e)?(Mt=7,4096):0!==(t=4186112&e)?(Mt=6,t):0!==(t=62914560&e)?(Mt=5,t):67108864&e?(Mt=4,67108864):0!==(134217728&e)?(Mt=3,134217728):0!==(t=805306368&e)?(Mt=2,t):0!==(1073741824&e)?(Mt=1,1073741824):(Mt=8,e)}function Dt(e,t){var n=e.pendingLanes;if(0===n)return Mt=0;var r=0,i=0,o=e.expiredLanes,a=e.suspendedLanes,s=e.pingedLanes;if(0!==o)r=o,i=Mt=15;else if(0!==(o=134217727&n)){var l=o&~a;0!==l?(r=Lt(l),i=Mt):0!==(s&=o)&&(r=Lt(s),i=Mt)}else 0!==(o=n&~a)?(r=Lt(o),i=Mt):0!==s&&(r=Lt(s),i=Mt);if(0===r)return 0;if(r=n&((0>(r=31-Ht(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0===(t&a)){if(Lt(t),i<=Mt)return t;Mt=i}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-Ht(t)),r|=e[n],t&=~i;return r}function Nt(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function Ft(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Vt(24&~t))?Ft(10,t):e;case 10:return 0===(e=Vt(192&~t))?Ft(8,t):e;case 8:return 0===(e=Vt(3584&~t))&&(0===(e=Vt(4186112&~t))&&(e=512)),e;case 2:return 0===(t=Vt(805306368&~t))&&(t=268435456),t}throw Error(a(358,e))}function Vt(e){return e&-e}function Ut(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Bt(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-Ht(t)]=n}var Ht=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(qt(e)/Wt|0)|0},qt=Math.log,Wt=Math.LN2;var Yt=o.unstable_UserBlockingPriority,Xt=o.unstable_runWithPriority,Kt=!0;function Gt(e,t,n,r){Le||Ie();var i=Qt,o=Le;Le=!0;try{_e(i,e,t,n,r)}finally{(Le=o)||Ne()}}function Jt(e,t,n,r){Xt(Yt,Qt.bind(null,e,t,n,r))}function Qt(e,t,n,r){var i;if(Kt)if((i=0===(4&t))&&0<at.length&&-1<pt.indexOf(e))e=ht(null,e,t,n,r),at.push(e);else{var o=Zt(e,t,n,r);if(null===o)i&&mt(e,r);else{if(i){if(-1<pt.indexOf(e))return e=ht(o,e,t,n,r),void at.push(e);if(function(e,t,n,r,i){switch(t){case"focusin":return st=gt(st,e,t,n,r,i),!0;case"dragenter":return lt=gt(lt,e,t,n,r,i),!0;case"mouseover":return ct=gt(ct,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return ut.set(o,gt(ut.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,dt.set(o,gt(dt.get(o)||null,e,t,n,r,i)),!0}return!1}(o,e,t,n,r))return;mt(e,r)}Ir(e,t,r,null,n)}}}function Zt(e,t,n,r){var i=Ee(r);if(null!==(i=ni(i))){var o=Ge(i);if(null===o)i=null;else{var a=o.tag;if(13===a){if(null!==(i=Je(o)))return i;i=null}else if(3===a){if(o.stateNode.hydrate)return 3===o.tag?o.stateNode.containerInfo:null;i=null}else o!==i&&(i=null)}}return Ir(e,t,r,i,n),null}var en=null,tn=null,nn=null;function rn(){if(nn)return nn;var e,t,n=tn,r=n.length,i="value"in en?en.value:en.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===i[o-t];t++);return nn=i.slice(e,1<t?1-t:void 0)}function on(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function an(){return!0}function sn(){return!1}function ln(e){function t(t,n,r,i,o){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(i):i[a]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?an:sn,this.isPropagationStopped=sn,this}return i(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=an)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=an)},persist:function(){},isPersistent:an}),t}var cn,un,dn,fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pn=ln(fn),hn=i({},fn,{view:0,detail:0}),mn=ln(hn),gn=i({},hn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==dn&&(dn&&"mousemove"===e.type?(cn=e.screenX-dn.screenX,un=e.screenY-dn.screenY):un=cn=0,dn=e),cn)},movementY:function(e){return"movementY"in e?e.movementY:un}}),vn=ln(gn),yn=ln(i({},gn,{dataTransfer:0})),bn=ln(i({},hn,{relatedTarget:0})),xn=ln(i({},fn,{animationName:0,elapsedTime:0,pseudoElement:0})),wn=i({},fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),kn=ln(wn),jn=ln(i({},fn,{data:0})),Sn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Cn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},En={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Tn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=En[e])&&!!t[e]}function Pn(){return Tn}var On=i({},hn,{key:function(e){if(e.key){var t=Sn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=on(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?Cn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pn,charCode:function(e){return"keypress"===e.type?on(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?on(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),An=ln(On),zn=ln(i({},gn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),$n=ln(i({},hn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pn})),Rn=ln(i({},fn,{propertyName:0,elapsedTime:0,pseudoElement:0})),_n=i({},gn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),In=ln(_n),Mn=[9,13,27,32],Ln=d&&"CompositionEvent"in window,Dn=null;d&&"documentMode"in document&&(Dn=document.documentMode);var Nn=d&&"TextEvent"in window&&!Dn,Fn=d&&(!Ln||Dn&&8<Dn&&11>=Dn),Vn=String.fromCharCode(32),Un=!1;function Bn(e,t){switch(e){case"keyup":return-1!==Mn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var qn=!1;var Wn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Wn[e.type]:"textarea"===t}function Xn(e,t,n,r){ze(r),0<(t=Lr(t,"onChange")).length&&(n=new pn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Kn=null,Gn=null;function Jn(e){Or(e,0)}function Qn(e){if(J(ii(e)))return e}function Zn(e,t){if("change"===e)return t}var er=!1;if(d){var tr;if(d){var nr="oninput"in document;if(!nr){var rr=document.createElement("div");rr.setAttribute("oninput","return;"),nr="function"===typeof rr.oninput}tr=nr}else tr=!1;er=tr&&(!document.documentMode||9<document.documentMode)}function ir(){Kn&&(Kn.detachEvent("onpropertychange",or),Gn=Kn=null)}function or(e){if("value"===e.propertyName&&Qn(Gn)){var t=[];if(Xn(t,Gn,e,Ee(e)),e=Jn,Le)e(t);else{Le=!0;try{Re(e,t)}finally{Le=!1,Ne()}}}}function ar(e,t,n){"focusin"===e?(ir(),Gn=n,(Kn=t).attachEvent("onpropertychange",or)):"focusout"===e&&ir()}function sr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Qn(Gn)}function lr(e,t){if("click"===e)return Qn(t)}function cr(e,t){if("input"===e||"change"===e)return Qn(t)}var ur="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t},dr=Object.prototype.hasOwnProperty;function fr(e,t){if(ur(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!dr.call(t,n[r])||!ur(e[n[r]],t[n[r]]))return!1;return!0}function pr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hr(e,t){var n,r=pr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=pr(r)}}function mr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?mr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function gr(){for(var e=window,t=Q();t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=Q((e=t.contentWindow).document)}return t}function vr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var yr=d&&"documentMode"in document&&11>=document.documentMode,br=null,xr=null,wr=null,kr=!1;function jr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;kr||null==br||br!==Q(r)||("selectionStart"in(r=br)&&vr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},wr&&fr(wr,r)||(wr=r,0<(r=Lr(xr,"onSelect")).length&&(t=new pn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=br)))}It("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),It("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),It(_t,2);for(var Sr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Cr=0;Cr<Sr.length;Cr++)Rt.set(Sr[Cr],0);u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),c("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),c("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),c("onBeforeInput",["compositionend","keypress","textInput","paste"]),c("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Tr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function Pr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,o,s,l,c){if(Ke.apply(this,arguments),He){if(!He)throw Error(a(198));var u=qe;He=!1,qe=null,We||(We=!0,Ye=u)}}(r,t,void 0,e),e.currentTarget=null}function Or(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==o&&i.isPropagationStopped())break e;Pr(i,s,c),o=l}else for(a=0;a<r.length;a++){if(l=(s=r[a]).instance,c=s.currentTarget,s=s.listener,l!==o&&i.isPropagationStopped())break e;Pr(i,s,c),o=l}}}if(We)throw e=Ye,We=!1,Ye=null,e}function Ar(e,t){var n=ai(t),r=e+"__bubble";n.has(r)||(_r(t,e,2,!1),n.add(r))}var zr="_reactListening"+Math.random().toString(36).slice(2);function $r(e){e[zr]||(e[zr]=!0,s.forEach((function(t){Tr.has(t)||Rr(t,!1,e,null),Rr(t,!0,e,null)})))}function Rr(e,t,n,r){var i=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,o=n;if("selectionchange"===e&&9!==n.nodeType&&(o=n.ownerDocument),null!==r&&!t&&Tr.has(e)){if("scroll"!==e)return;i|=2,o=r}var a=ai(o),s=e+"__"+(t?"capture":"bubble");a.has(s)||(t&&(i|=4),_r(o,e,i,t),a.add(s))}function _r(e,t,n,r){var i=Rt.get(t);switch(void 0===i?2:i){case 0:i=Gt;break;case 1:i=Jt;break;default:i=Qt}n=i.bind(null,t,n,e),i=void 0,!Ve||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ir(e,t,n,r,i){var o=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var a=r.tag;if(3===a||4===a){var s=r.stateNode.containerInfo;if(s===i||8===s.nodeType&&s.parentNode===i)break;if(4===a)for(a=r.return;null!==a;){var l=a.tag;if((3===l||4===l)&&((l=a.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;a=a.return}for(;null!==s;){if(null===(a=ni(s)))return;if(5===(l=a.tag)||6===l){r=o=a;continue e}s=s.parentNode}}r=r.return}!function(e,t,n){if(De)return e(t,n);De=!0;try{return Me(e,t,n)}finally{De=!1,Ne()}}((function(){var r=o,i=Ee(n),a=[];e:{var s=$t.get(e);if(void 0!==s){var l=pn,c=e;switch(e){case"keypress":if(0===on(n))break e;case"keydown":case"keyup":l=An;break;case"focusin":c="focus",l=bn;break;case"focusout":c="blur",l=bn;break;case"beforeblur":case"afterblur":l=bn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=vn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=yn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=$n;break;case Pt:case Ot:case At:l=xn;break;case zt:l=Rn;break;case"scroll":l=mn;break;case"wheel":l=In;break;case"copy":case"cut":case"paste":l=kn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=zn}var u=0!==(4&t),d=!u&&"scroll"===e,f=u?null!==s?s+"Capture":null:s;u=[];for(var p,h=r;null!==h;){var m=(p=h).stateNode;if(5===p.tag&&null!==m&&(p=m,null!==f&&(null!=(m=Fe(h,f))&&u.push(Mr(h,m,p)))),d)break;h=h.return}0<u.length&&(s=new l(s,c,null,n,i),a.push({event:s,listeners:u}))}}if(0===(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||0!==(16&t)||!(c=n.relatedTarget||n.fromElement)||!ni(c)&&!c[ei])&&(l||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,l?(l=r,null!==(c=(c=n.relatedTarget||n.toElement)?ni(c):null)&&(c!==(d=Ge(c))||5!==c.tag&&6!==c.tag)&&(c=null)):(l=null,c=r),l!==c)){if(u=vn,m="onMouseLeave",f="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(u=zn,m="onPointerLeave",f="onPointerEnter",h="pointer"),d=null==l?s:ii(l),p=null==c?s:ii(c),(s=new u(m,h+"leave",l,n,i)).target=d,s.relatedTarget=p,m=null,ni(i)===r&&((u=new u(f,h+"enter",c,n,i)).target=p,u.relatedTarget=d,m=u),d=m,l&&c)e:{for(f=c,h=0,p=u=l;p;p=Dr(p))h++;for(p=0,m=f;m;m=Dr(m))p++;for(;0<h-p;)u=Dr(u),h--;for(;0<p-h;)f=Dr(f),p--;for(;h--;){if(u===f||null!==f&&u===f.alternate)break e;u=Dr(u),f=Dr(f)}u=null}else u=null;null!==l&&Nr(a,s,l,u,!1),null!==c&&null!==d&&Nr(a,d,c,u,!0)}if("select"===(l=(s=r?ii(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===l&&"file"===s.type)var g=Zn;else if(Yn(s))if(er)g=cr;else{g=sr;var v=ar}else(l=s.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===s.type||"radio"===s.type)&&(g=lr);switch(g&&(g=g(e,r))?Xn(a,g,n,i):(v&&v(e,s,r),"focusout"===e&&(v=s._wrapperState)&&v.controlled&&"number"===s.type&&ie(s,"number",s.value)),v=r?ii(r):window,e){case"focusin":(Yn(v)||"true"===v.contentEditable)&&(br=v,xr=r,wr=null);break;case"focusout":wr=xr=br=null;break;case"mousedown":kr=!0;break;case"contextmenu":case"mouseup":case"dragend":kr=!1,jr(a,n,i);break;case"selectionchange":if(yr)break;case"keydown":case"keyup":jr(a,n,i)}var y;if(Ln)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else qn?Bn(e,n)&&(b="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(b="onCompositionStart");b&&(Fn&&"ko"!==n.locale&&(qn||"onCompositionStart"!==b?"onCompositionEnd"===b&&qn&&(y=rn()):(tn="value"in(en=i)?en.value:en.textContent,qn=!0)),0<(v=Lr(r,b)).length&&(b=new jn(b,e,null,n,i),a.push({event:b,listeners:v}),y?b.data=y:null!==(y=Hn(n))&&(b.data=y))),(y=Nn?function(e,t){switch(e){case"compositionend":return Hn(t);case"keypress":return 32!==t.which?null:(Un=!0,Vn);case"textInput":return(e=t.data)===Vn&&Un?null:e;default:return null}}(e,n):function(e,t){if(qn)return"compositionend"===e||!Ln&&Bn(e,t)?(e=rn(),nn=tn=en=null,qn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Lr(r,"onBeforeInput")).length&&(i=new jn("onBeforeInput","beforeinput",null,n,i),a.push({event:i,listeners:r}),i.data=y))}Or(a,t)}))}function Mr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Lr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;5===i.tag&&null!==o&&(i=o,null!=(o=Fe(e,n))&&r.unshift(Mr(e,o,i)),null!=(o=Fe(e,t))&&r.push(Mr(e,o,i))),e=e.return}return r}function Dr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Nr(e,t,n,r,i){for(var o=t._reactName,a=[];null!==n&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(null!==l&&l===r)break;5===s.tag&&null!==c&&(s=c,i?null!=(l=Fe(n,o))&&a.unshift(Mr(n,l,s)):i||null!=(l=Fe(n,o))&&a.push(Mr(n,l,s))),n=n.return}0!==a.length&&e.push({event:t,listeners:a})}function Fr(){}var Vr=null,Ur=null;function Br(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function Hr(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var qr="function"===typeof setTimeout?setTimeout:void 0,Wr="function"===typeof clearTimeout?clearTimeout:void 0;function Yr(e){1===e.nodeType?e.textContent="":9===e.nodeType&&(null!=(e=e.body)&&(e.textContent=""))}function Xr(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function Kr(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var Gr=0;var Jr=Math.random().toString(36).slice(2),Qr="__reactFiber$"+Jr,Zr="__reactProps$"+Jr,ei="__reactContainer$"+Jr,ti="__reactEvents$"+Jr;function ni(e){var t=e[Qr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ei]||n[Qr]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Kr(e);null!==e;){if(n=e[Qr])return n;e=Kr(e)}return t}n=(e=n).parentNode}return null}function ri(e){return!(e=e[Qr]||e[ei])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function ii(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(a(33))}function oi(e){return e[Zr]||null}function ai(e){var t=e[ti];return void 0===t&&(t=e[ti]=new Set),t}var si=[],li=-1;function ci(e){return{current:e}}function ui(e){0>li||(e.current=si[li],si[li]=null,li--)}function di(e,t){li++,si[li]=e.current,e.current=t}var fi={},pi=ci(fi),hi=ci(!1),mi=fi;function gi(e,t){var n=e.type.contextTypes;if(!n)return fi;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function vi(e){return null!==(e=e.childContextTypes)&&void 0!==e}function yi(){ui(hi),ui(pi)}function bi(e,t,n){if(pi.current!==fi)throw Error(a(168));di(pi,t),di(hi,n)}function xi(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!==typeof r.getChildContext)return n;for(var o in r=r.getChildContext())if(!(o in e))throw Error(a(108,Y(t)||"Unknown",o));return i({},n,r)}function wi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||fi,mi=pi.current,di(pi,e),di(hi,hi.current),!0}function ki(e,t,n){var r=e.stateNode;if(!r)throw Error(a(169));n?(e=xi(e,t,mi),r.__reactInternalMemoizedMergedChildContext=e,ui(hi),ui(pi),di(pi,e)):ui(hi),di(hi,n)}var ji=null,Si=null,Ci=o.unstable_runWithPriority,Ei=o.unstable_scheduleCallback,Ti=o.unstable_cancelCallback,Pi=o.unstable_shouldYield,Oi=o.unstable_requestPaint,Ai=o.unstable_now,zi=o.unstable_getCurrentPriorityLevel,$i=o.unstable_ImmediatePriority,Ri=o.unstable_UserBlockingPriority,_i=o.unstable_NormalPriority,Ii=o.unstable_LowPriority,Mi=o.unstable_IdlePriority,Li={},Di=void 0!==Oi?Oi:function(){},Ni=null,Fi=null,Vi=!1,Ui=Ai(),Bi=1e4>Ui?Ai:function(){return Ai()-Ui};function Hi(){switch(zi()){case $i:return 99;case Ri:return 98;case _i:return 97;case Ii:return 96;case Mi:return 95;default:throw Error(a(332))}}function qi(e){switch(e){case 99:return $i;case 98:return Ri;case 97:return _i;case 96:return Ii;case 95:return Mi;default:throw Error(a(332))}}function Wi(e,t){return e=qi(e),Ci(e,t)}function Yi(e,t,n){return e=qi(e),Ei(e,t,n)}function Xi(){if(null!==Fi){var e=Fi;Fi=null,Ti(e)}Ki()}function Ki(){if(!Vi&&null!==Ni){Vi=!0;var e=0;try{var t=Ni;Wi(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),Ni=null}catch(n){throw null!==Ni&&(Ni=Ni.slice(e+1)),Ei($i,Xi),n}finally{Vi=!1}}}var Gi=w.ReactCurrentBatchConfig;function Ji(e,t){if(e&&e.defaultProps){for(var n in t=i({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var Qi=ci(null),Zi=null,eo=null,to=null;function no(){to=eo=Zi=null}function ro(e){var t=Qi.current;ui(Qi),e.type._context._currentValue=t}function io(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function oo(e,t){Zi=e,to=eo=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(La=!0),e.firstContext=null)}function ao(e,t){if(to!==e&&!1!==t&&0!==t)if("number"===typeof t&&1073741823!==t||(to=e,t=1073741823),t={context:e,observedBits:t,next:null},null===eo){if(null===Zi)throw Error(a(308));eo=t,Zi.dependencies={lanes:0,firstContext:t,responders:null}}else eo=eo.next=t;return e._currentValue}var so=!1;function lo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function co(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function uo(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function fo(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function po(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?i=o=a:o=o.next=a,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ho(e,t,n,r){var o=e.updateQueue;so=!1;var a=o.firstBaseUpdate,s=o.lastBaseUpdate,l=o.shared.pending;if(null!==l){o.shared.pending=null;var c=l,u=c.next;c.next=null,null===s?a=u:s.next=u,s=c;var d=e.alternate;if(null!==d){var f=(d=d.updateQueue).lastBaseUpdate;f!==s&&(null===f?d.firstBaseUpdate=u:f.next=u,d.lastBaseUpdate=c)}}if(null!==a){for(f=o.baseState,s=0,d=u=c=null;;){l=a.lane;var p=a.eventTime;if((r&l)===l){null!==d&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var h=e,m=a;switch(l=t,p=n,m.tag){case 1:if("function"===typeof(h=m.payload)){f=h.call(p,f,l);break e}f=h;break e;case 3:h.flags=-4097&h.flags|64;case 0:if(null===(l="function"===typeof(h=m.payload)?h.call(p,f,l):h)||void 0===l)break e;f=i({},f,l);break e;case 2:so=!0}}null!==a.callback&&(e.flags|=32,null===(l=o.effects)?o.effects=[a]:l.push(a))}else p={eventTime:p,lane:l,tag:a.tag,payload:a.payload,callback:a.callback,next:null},null===d?(u=d=p,c=f):d=d.next=p,s|=l;if(null===(a=a.next)){if(null===(l=o.shared.pending))break;a=l.next,l.next=null,o.lastBaseUpdate=l,o.shared.pending=null}}null===d&&(c=f),o.baseState=c,o.firstBaseUpdate=u,o.lastBaseUpdate=d,Us|=s,e.lanes=s,e.memoizedState=f}}function mo(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!==typeof i)throw Error(a(191,i));i.call(r)}}}var go=(new r.Component).refs;function vo(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:i({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var yo={isMounted:function(e){return!!(e=e._reactInternals)&&Ge(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pl(),i=hl(e),o=uo(r,i);o.payload=t,void 0!==n&&null!==n&&(o.callback=n),fo(e,o),ml(e,i,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pl(),i=hl(e),o=uo(r,i);o.tag=1,o.payload=t,void 0!==n&&null!==n&&(o.callback=n),fo(e,o),ml(e,i,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pl(),r=hl(e),i=uo(n,r);i.tag=2,void 0!==t&&null!==t&&(i.callback=t),fo(e,i),ml(e,r,n)}};function bo(e,t,n,r,i,o,a){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,a):!t.prototype||!t.prototype.isPureReactComponent||(!fr(n,r)||!fr(i,o))}function xo(e,t,n){var r=!1,i=fi,o=t.contextType;return"object"===typeof o&&null!==o?o=ao(o):(i=vi(t)?mi:pi.current,o=(r=null!==(r=t.contextTypes)&&void 0!==r)?gi(e,i):fi),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=yo,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function wo(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&yo.enqueueReplaceState(t,t.state,null)}function ko(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs=go,lo(e);var o=t.contextType;"object"===typeof o&&null!==o?i.context=ao(o):(o=vi(t)?mi:pi.current,i.context=gi(e,o)),ho(e,n,i,r),i.state=e.memoizedState,"function"===typeof(o=t.getDerivedStateFromProps)&&(vo(e,t,o,n),i.state=e.memoizedState),"function"===typeof t.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(t=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&yo.enqueueReplaceState(i,i.state,null),ho(e,n,i,r),i.state=e.memoizedState),"function"===typeof i.componentDidMount&&(e.flags|=4)}var jo=Array.isArray;function So(e,t,n){if(null!==(e=n.ref)&&"function"!==typeof e&&"object"!==typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(a(309));var r=n.stateNode}if(!r)throw Error(a(147,e));var i=""+e;return null!==t&&null!==t.ref&&"function"===typeof t.ref&&t.ref._stringRef===i?t.ref:(t=function(e){var t=r.refs;t===go&&(t=r.refs={}),null===e?delete t[i]:t[i]=e},t._stringRef=i,t)}if("string"!==typeof e)throw Error(a(284));if(!n._owner)throw Error(a(290,e))}return e}function Co(e,t){if("textarea"!==e.type)throw Error(a(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Eo(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=Yl(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function s(t){return e&&null===t.alternate&&(t.flags=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Jl(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function c(e,t,n,r){return null!==t&&t.elementType===n.type?((r=i(t,n.props)).ref=So(e,t,n),r.return=e,r):((r=Xl(n.type,n.key,n.props,null,e.mode,r)).ref=So(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Ql(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function d(e,t,n,r,o){return null===t||7!==t.tag?((t=Kl(n,e.mode,r,o)).return=e,t):((t=i(t,n)).return=e,t)}function f(e,t,n){if("string"===typeof t||"number"===typeof t)return(t=Jl(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case k:return(n=Xl(t.type,t.key,t.props,null,e.mode,n)).ref=So(e,null,t),n.return=e,n;case j:return(t=Ql(t,e.mode,n)).return=e,t}if(jo(t)||U(t))return(t=Kl(t,e.mode,n,null)).return=e,t;Co(e,t)}return null}function p(e,t,n,r){var i=null!==t?t.key:null;if("string"===typeof n||"number"===typeof n)return null!==i?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case k:return n.key===i?n.type===S?d(e,t,n.props.children,r,i):c(e,t,n,r):null;case j:return n.key===i?u(e,t,n,r):null}if(jo(n)||U(n))return null!==i?null:d(e,t,n,r,null);Co(e,n)}return null}function h(e,t,n,r,i){if("string"===typeof r||"number"===typeof r)return l(t,e=e.get(n)||null,""+r,i);if("object"===typeof r&&null!==r){switch(r.$$typeof){case k:return e=e.get(null===r.key?n:r.key)||null,r.type===S?d(t,e,r.props.children,i,r.key):c(t,e,r,i);case j:return u(t,e=e.get(null===r.key?n:r.key)||null,r,i)}if(jo(r)||U(r))return d(t,e=e.get(n)||null,r,i,null);Co(t,r)}return null}function m(i,a,s,l){for(var c=null,u=null,d=a,m=a=0,g=null;null!==d&&m<s.length;m++){d.index>m?(g=d,d=null):g=d.sibling;var v=p(i,d,s[m],l);if(null===v){null===d&&(d=g);break}e&&d&&null===v.alternate&&t(i,d),a=o(v,a,m),null===u?c=v:u.sibling=v,u=v,d=g}if(m===s.length)return n(i,d),c;if(null===d){for(;m<s.length;m++)null!==(d=f(i,s[m],l))&&(a=o(d,a,m),null===u?c=d:u.sibling=d,u=d);return c}for(d=r(i,d);m<s.length;m++)null!==(g=h(d,i,m,s[m],l))&&(e&&null!==g.alternate&&d.delete(null===g.key?m:g.key),a=o(g,a,m),null===u?c=g:u.sibling=g,u=g);return e&&d.forEach((function(e){return t(i,e)})),c}function g(i,s,l,c){var u=U(l);if("function"!==typeof u)throw Error(a(150));if(null==(l=u.call(l)))throw Error(a(151));for(var d=u=null,m=s,g=s=0,v=null,y=l.next();null!==m&&!y.done;g++,y=l.next()){m.index>g?(v=m,m=null):v=m.sibling;var b=p(i,m,y.value,c);if(null===b){null===m&&(m=v);break}e&&m&&null===b.alternate&&t(i,m),s=o(b,s,g),null===d?u=b:d.sibling=b,d=b,m=v}if(y.done)return n(i,m),u;if(null===m){for(;!y.done;g++,y=l.next())null!==(y=f(i,y.value,c))&&(s=o(y,s,g),null===d?u=y:d.sibling=y,d=y);return u}for(m=r(i,m);!y.done;g++,y=l.next())null!==(y=h(m,i,g,y.value,c))&&(e&&null!==y.alternate&&m.delete(null===y.key?g:y.key),s=o(y,s,g),null===d?u=y:d.sibling=y,d=y);return e&&m.forEach((function(e){return t(i,e)})),u}return function(e,r,o,l){var c="object"===typeof o&&null!==o&&o.type===S&&null===o.key;c&&(o=o.props.children);var u="object"===typeof o&&null!==o;if(u)switch(o.$$typeof){case k:e:{for(u=o.key,c=r;null!==c;){if(c.key===u){if(7===c.tag){if(o.type===S){n(e,c.sibling),(r=i(c,o.props.children)).return=e,e=r;break e}}else if(c.elementType===o.type){n(e,c.sibling),(r=i(c,o.props)).ref=So(e,c,o),r.return=e,e=r;break e}n(e,c);break}t(e,c),c=c.sibling}o.type===S?((r=Kl(o.props.children,e.mode,l,o.key)).return=e,e=r):((l=Xl(o.type,o.key,o.props,null,e.mode,l)).ref=So(e,r,o),l.return=e,e=l)}return s(e);case j:e:{for(c=o.key;null!==r;){if(r.key===c){if(4===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=i(r,o.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=Ql(o,e.mode,l)).return=e,e=r}return s(e)}if("string"===typeof o||"number"===typeof o)return o=""+o,null!==r&&6===r.tag?(n(e,r.sibling),(r=i(r,o)).return=e,e=r):(n(e,r),(r=Jl(o,e.mode,l)).return=e,e=r),s(e);if(jo(o))return m(e,r,o,l);if(U(o))return g(e,r,o,l);if(u&&Co(e,o),"undefined"===typeof o&&!c)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(a(152,Y(e.type)||"Component"))}return n(e,r)}}var To=Eo(!0),Po=Eo(!1),Oo={},Ao=ci(Oo),zo=ci(Oo),$o=ci(Oo);function Ro(e){if(e===Oo)throw Error(a(174));return e}function _o(e,t){switch(di($o,t),di(zo,e),di(Ao,Oo),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:he(null,"");break;default:t=he(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}ui(Ao),di(Ao,t)}function Io(){ui(Ao),ui(zo),ui($o)}function Mo(e){Ro($o.current);var t=Ro(Ao.current),n=he(t,e.type);t!==n&&(di(zo,e),di(Ao,n))}function Lo(e){zo.current===e&&(ui(Ao),ui(zo))}var Do=ci(0);function No(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!==(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fo=null,Vo=null,Uo=!1;function Bo(e,t){var n=ql(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function Ho(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function qo(e){if(Uo){var t=Vo;if(t){var n=t;if(!Ho(e,t)){if(!(t=Xr(n.nextSibling))||!Ho(e,t))return e.flags=-1025&e.flags|2,Uo=!1,void(Fo=e);Bo(Fo,n)}Fo=e,Vo=Xr(t.firstChild)}else e.flags=-1025&e.flags|2,Uo=!1,Fo=e}}function Wo(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;Fo=e}function Yo(e){if(e!==Fo)return!1;if(!Uo)return Wo(e),Uo=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!Hr(t,e.memoizedProps))for(t=Vo;t;)Bo(e,t),t=Xr(t.nextSibling);if(Wo(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(a(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Vo=Xr(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Vo=null}}else Vo=Fo?Xr(e.stateNode.nextSibling):null;return!0}function Xo(){Vo=Fo=null,Uo=!1}var Ko=[];function Go(){for(var e=0;e<Ko.length;e++)Ko[e]._workInProgressVersionPrimary=null;Ko.length=0}var Jo=w.ReactCurrentDispatcher,Qo=w.ReactCurrentBatchConfig,Zo=0,ea=null,ta=null,na=null,ra=!1,ia=!1;function oa(){throw Error(a(321))}function aa(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ur(e[n],t[n]))return!1;return!0}function sa(e,t,n,r,i,o){if(Zo=o,ea=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Jo.current=null===e||null===e.memoizedState?Ra:_a,e=n(r,i),ia){o=0;do{if(ia=!1,!(25>o))throw Error(a(301));o+=1,na=ta=null,t.updateQueue=null,Jo.current=Ia,e=n(r,i)}while(ia)}if(Jo.current=$a,t=null!==ta&&null!==ta.next,Zo=0,na=ta=ea=null,ra=!1,t)throw Error(a(300));return e}function la(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===na?ea.memoizedState=na=e:na=na.next=e,na}function ca(){if(null===ta){var e=ea.alternate;e=null!==e?e.memoizedState:null}else e=ta.next;var t=null===na?ea.memoizedState:na.next;if(null!==t)na=t,ta=e;else{if(null===e)throw Error(a(310));e={memoizedState:(ta=e).memoizedState,baseState:ta.baseState,baseQueue:ta.baseQueue,queue:ta.queue,next:null},null===na?ea.memoizedState=na=e:na=na.next=e}return na}function ua(e,t){return"function"===typeof t?t(e):t}function da(e){var t=ca(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=ta,i=r.baseQueue,o=n.pending;if(null!==o){if(null!==i){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(null!==i){i=i.next,r=r.baseState;var l=s=o=null,c=i;do{var u=c.lane;if((Zo&u)===u)null!==l&&(l=l.next={lane:0,action:c.action,eagerReducer:c.eagerReducer,eagerState:c.eagerState,next:null}),r=c.eagerReducer===e?c.eagerState:e(r,c.action);else{var d={lane:u,action:c.action,eagerReducer:c.eagerReducer,eagerState:c.eagerState,next:null};null===l?(s=l=d,o=r):l=l.next=d,ea.lanes|=u,Us|=u}c=c.next}while(null!==c&&c!==i);null===l?o=r:l.next=s,ur(r,t.memoizedState)||(La=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function fa(e){var t=ca(),n=t.queue;if(null===n)throw Error(a(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(null!==i){n.pending=null;var s=i=i.next;do{o=e(o,s.action),s=s.next}while(s!==i);ur(o,t.memoizedState)||(La=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function pa(e,t,n){var r=t._getVersion;r=r(t._source);var i=t._workInProgressVersionPrimary;if(null!==i?e=i===r:(e=e.mutableReadLanes,(e=(Zo&e)===e)&&(t._workInProgressVersionPrimary=r,Ko.push(t))),e)return n(t._source);throw Ko.push(t),Error(a(350))}function ha(e,t,n,r){var i=_s;if(null===i)throw Error(a(349));var o=t._getVersion,s=o(t._source),l=Jo.current,c=l.useState((function(){return pa(i,t,n)})),u=c[1],d=c[0];c=na;var f=e.memoizedState,p=f.refs,h=p.getSnapshot,m=f.source;f=f.subscribe;var g=ea;return e.memoizedState={refs:p,source:t,subscribe:r},l.useEffect((function(){p.getSnapshot=n,p.setSnapshot=u;var e=o(t._source);if(!ur(s,e)){e=n(t._source),ur(d,e)||(u(e),e=hl(g),i.mutableReadLanes|=e&i.pendingLanes),e=i.mutableReadLanes,i.entangledLanes|=e;for(var r=i.entanglements,a=e;0<a;){var l=31-Ht(a),c=1<<l;r[l]|=e,a&=~c}}}),[n,t,r]),l.useEffect((function(){return r(t._source,(function(){var e=p.getSnapshot,n=p.setSnapshot;try{n(e(t._source));var r=hl(g);i.mutableReadLanes|=r&i.pendingLanes}catch(o){n((function(){throw o}))}}))}),[t,r]),ur(h,n)&&ur(m,t)&&ur(f,r)||((e={pending:null,dispatch:null,lastRenderedReducer:ua,lastRenderedState:d}).dispatch=u=za.bind(null,ea,e),c.queue=e,c.baseQueue=null,d=pa(i,t,n),c.memoizedState=c.baseState=d),d}function ma(e,t,n){return ha(ca(),e,t,n)}function ga(e){var t=la();return"function"===typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:ua,lastRenderedState:e}).dispatch=za.bind(null,ea,e),[t.memoizedState,e]}function va(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=ea.updateQueue)?(t={lastEffect:null},ea.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ya(e){return e={current:e},la().memoizedState=e}function ba(){return ca().memoizedState}function xa(e,t,n,r){var i=la();ea.flags|=e,i.memoizedState=va(1|t,n,void 0,void 0===r?null:r)}function wa(e,t,n,r){var i=ca();r=void 0===r?null:r;var o=void 0;if(null!==ta){var a=ta.memoizedState;if(o=a.destroy,null!==r&&aa(r,a.deps))return void va(t,n,o,r)}ea.flags|=e,i.memoizedState=va(1|t,n,o,r)}function ka(e,t){return xa(516,4,e,t)}function ja(e,t){return wa(516,4,e,t)}function Sa(e,t){return wa(4,2,e,t)}function Ca(e,t){return"function"===typeof t?(e=e(),t(e),function(){t(null)}):null!==t&&void 0!==t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Ea(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,wa(4,2,Ca.bind(null,t,e),n)}function Ta(){}function Pa(e,t){var n=ca();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&aa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Oa(e,t){var n=ca();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&aa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Aa(e,t){var n=Hi();Wi(98>n?98:n,(function(){e(!0)})),Wi(97<n?97:n,(function(){var n=Qo.transition;Qo.transition=1;try{e(!1),t()}finally{Qo.transition=n}}))}function za(e,t,n){var r=pl(),i=hl(e),o={lane:i,action:n,eagerReducer:null,eagerState:null,next:null},a=t.pending;if(null===a?o.next=o:(o.next=a.next,a.next=o),t.pending=o,a=e.alternate,e===ea||null!==a&&a===ea)ia=ra=!0;else{if(0===e.lanes&&(null===a||0===a.lanes)&&null!==(a=t.lastRenderedReducer))try{var s=t.lastRenderedState,l=a(s,n);if(o.eagerReducer=a,o.eagerState=l,ur(l,s))return}catch(c){}ml(e,i,r)}}var $a={readContext:ao,useCallback:oa,useContext:oa,useEffect:oa,useImperativeHandle:oa,useLayoutEffect:oa,useMemo:oa,useReducer:oa,useRef:oa,useState:oa,useDebugValue:oa,useDeferredValue:oa,useTransition:oa,useMutableSource:oa,useOpaqueIdentifier:oa,unstable_isNewReconciler:!1},Ra={readContext:ao,useCallback:function(e,t){return la().memoizedState=[e,void 0===t?null:t],e},useContext:ao,useEffect:ka,useImperativeHandle:function(e,t,n){return n=null!==n&&void 0!==n?n.concat([e]):null,xa(4,2,Ca.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xa(4,2,e,t)},useMemo:function(e,t){var n=la();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=la();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=za.bind(null,ea,e),[r.memoizedState,e]},useRef:ya,useState:ga,useDebugValue:Ta,useDeferredValue:function(e){var t=ga(e),n=t[0],r=t[1];return ka((function(){var t=Qo.transition;Qo.transition=1;try{r(e)}finally{Qo.transition=t}}),[e]),n},useTransition:function(){var e=ga(!1),t=e[0];return ya(e=Aa.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=la();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},ha(r,e,t,n)},useOpaqueIdentifier:function(){if(Uo){var e=!1,t=function(e){return{$$typeof:I,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(Gr++).toString(36))),Error(a(355))})),n=ga(t)[1];return 0===(2&ea.mode)&&(ea.flags|=516,va(5,(function(){n("r:"+(Gr++).toString(36))}),void 0,null)),t}return ga(t="r:"+(Gr++).toString(36)),t},unstable_isNewReconciler:!1},_a={readContext:ao,useCallback:Pa,useContext:ao,useEffect:ja,useImperativeHandle:Ea,useLayoutEffect:Sa,useMemo:Oa,useReducer:da,useRef:ba,useState:function(){return da(ua)},useDebugValue:Ta,useDeferredValue:function(e){var t=da(ua),n=t[0],r=t[1];return ja((function(){var t=Qo.transition;Qo.transition=1;try{r(e)}finally{Qo.transition=t}}),[e]),n},useTransition:function(){var e=da(ua)[0];return[ba().current,e]},useMutableSource:ma,useOpaqueIdentifier:function(){return da(ua)[0]},unstable_isNewReconciler:!1},Ia={readContext:ao,useCallback:Pa,useContext:ao,useEffect:ja,useImperativeHandle:Ea,useLayoutEffect:Sa,useMemo:Oa,useReducer:fa,useRef:ba,useState:function(){return fa(ua)},useDebugValue:Ta,useDeferredValue:function(e){var t=fa(ua),n=t[0],r=t[1];return ja((function(){var t=Qo.transition;Qo.transition=1;try{r(e)}finally{Qo.transition=t}}),[e]),n},useTransition:function(){var e=fa(ua)[0];return[ba().current,e]},useMutableSource:ma,useOpaqueIdentifier:function(){return fa(ua)[0]},unstable_isNewReconciler:!1},Ma=w.ReactCurrentOwner,La=!1;function Da(e,t,n,r){t.child=null===e?Po(t,null,n,r):To(t,e.child,n,r)}function Na(e,t,n,r,i){n=n.render;var o=t.ref;return oo(t,i),r=sa(e,t,n,r,o,i),null===e||La?(t.flags|=1,Da(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,as(e,t,i))}function Fa(e,t,n,r,i,o){if(null===e){var a=n.type;return"function"!==typeof a||Wl(a)||void 0!==a.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Xl(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=a,Va(e,t,a,r,i,o))}return a=e.child,0===(i&o)&&(i=a.memoizedProps,(n=null!==(n=n.compare)?n:fr)(i,r)&&e.ref===t.ref)?as(e,t,o):(t.flags|=1,(e=Yl(a,r)).ref=t.ref,e.return=t,t.child=e)}function Va(e,t,n,r,i,o){if(null!==e&&fr(e.memoizedProps,r)&&e.ref===t.ref){if(La=!1,0===(o&i))return t.lanes=e.lanes,as(e,t,o);0!==(16384&e.flags)&&(La=!0)}return Ha(e,t,n,r,o)}function Ua(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0===(4&t.mode))t.memoizedState={baseLanes:0},jl(t,n);else{if(0===(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},jl(t,e),null;t.memoizedState={baseLanes:0},jl(t,null!==o?o.baseLanes:n)}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,jl(t,r);return Da(e,t,i,n),t.child}function Ba(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function Ha(e,t,n,r,i){var o=vi(n)?mi:pi.current;return o=gi(t,o),oo(t,i),n=sa(e,t,n,r,o,i),null===e||La?(t.flags|=1,Da(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,as(e,t,i))}function qa(e,t,n,r,i){if(vi(n)){var o=!0;wi(t)}else o=!1;if(oo(t,i),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),xo(t,n,r),ko(t,n,r,i),r=!0;else if(null===e){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,c=n.contextType;"object"===typeof c&&null!==c?c=ao(c):c=gi(t,c=vi(n)?mi:pi.current);var u=n.getDerivedStateFromProps,d="function"===typeof u||"function"===typeof a.getSnapshotBeforeUpdate;d||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==r||l!==c)&&wo(t,a,r,c),so=!1;var f=t.memoizedState;a.state=f,ho(t,r,a,i),l=t.memoizedState,s!==r||f!==l||hi.current||so?("function"===typeof u&&(vo(t,n,u,r),l=t.memoizedState),(s=so||bo(t,n,s,r,f,l,c))?(d||"function"!==typeof a.UNSAFE_componentWillMount&&"function"!==typeof a.componentWillMount||("function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount()),"function"===typeof a.componentDidMount&&(t.flags|=4)):("function"===typeof a.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=s):("function"===typeof a.componentDidMount&&(t.flags|=4),r=!1)}else{a=t.stateNode,co(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Ji(t.type,s),a.props=c,d=t.pendingProps,f=a.context,"object"===typeof(l=n.contextType)&&null!==l?l=ao(l):l=gi(t,l=vi(n)?mi:pi.current);var p=n.getDerivedStateFromProps;(u="function"===typeof p||"function"===typeof a.getSnapshotBeforeUpdate)||"function"!==typeof a.UNSAFE_componentWillReceiveProps&&"function"!==typeof a.componentWillReceiveProps||(s!==d||f!==l)&&wo(t,a,r,l),so=!1,f=t.memoizedState,a.state=f,ho(t,r,a,i);var h=t.memoizedState;s!==d||f!==h||hi.current||so?("function"===typeof p&&(vo(t,n,p,r),h=t.memoizedState),(c=so||bo(t,n,c,r,f,h,l))?(u||"function"!==typeof a.UNSAFE_componentWillUpdate&&"function"!==typeof a.componentWillUpdate||("function"===typeof a.componentWillUpdate&&a.componentWillUpdate(r,h,l),"function"===typeof a.UNSAFE_componentWillUpdate&&a.UNSAFE_componentWillUpdate(r,h,l)),"function"===typeof a.componentDidUpdate&&(t.flags|=4),"function"===typeof a.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=h),a.props=r,a.state=h,a.context=l,r=c):("function"!==typeof a.componentDidUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof a.getSnapshotBeforeUpdate||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),r=!1)}return Wa(e,t,n,r,o,i)}function Wa(e,t,n,r,i,o){Ba(e,t);var a=0!==(64&t.flags);if(!r&&!a)return i&&ki(t,n,!1),as(e,t,o);r=t.stateNode,Ma.current=t;var s=a&&"function"!==typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&a?(t.child=To(t,e.child,null,o),t.child=To(t,null,s,o)):Da(e,t,s,o),t.memoizedState=r.state,i&&ki(t,n,!0),t.child}function Ya(e){var t=e.stateNode;t.pendingContext?bi(0,t.pendingContext,t.pendingContext!==t.context):t.context&&bi(0,t.context,!1),_o(e,t.containerInfo)}var Xa,Ka,Ga,Ja,Qa={dehydrated:null,retryLane:0};function Za(e,t,n){var r,i=t.pendingProps,o=Do.current,a=!1;return(r=0!==(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!==(2&o)),r?(a=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===i.fallback||!0===i.unstable_avoidThisFallback||(o|=1),di(Do,1&o),null===e?(void 0!==i.fallback&&qo(t),e=i.children,o=i.fallback,a?(e=es(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Qa,e):"number"===typeof i.unstable_expectedLoadTime?(e=es(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=Qa,t.lanes=33554432,e):((n=Gl({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,a?(i=ns(e,t,i.children,i.fallback,n),a=t.child,o=e.child.memoizedState,a.memoizedState=null===o?{baseLanes:n}:{baseLanes:o.baseLanes|n},a.childLanes=e.childLanes&~n,t.memoizedState=Qa,i):(n=ts(e,t,i.children,n),t.memoizedState=null,n))}function es(e,t,n,r){var i=e.mode,o=e.child;return t={mode:"hidden",children:t},0===(2&i)&&null!==o?(o.childLanes=0,o.pendingProps=t):o=Gl(t,i,0,null),n=Kl(n,i,r,null),o.return=e,n.return=e,o.sibling=n,e.child=o,n}function ts(e,t,n,r){var i=e.child;return e=i.sibling,n=Yl(i,{mode:"visible",children:n}),0===(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}function ns(e,t,n,r,i){var o=t.mode,a=e.child;e=a.sibling;var s={mode:"hidden",children:n};return 0===(2&o)&&t.child!==a?((n=t.child).childLanes=0,n.pendingProps=s,null!==(a=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=a,a.nextEffect=null):t.firstEffect=t.lastEffect=null):n=Yl(a,s),null!==e?r=Yl(e,r):(r=Kl(r,o,i,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}function rs(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),io(e.return,t)}function is(e,t,n,r,i,o){var a=e.memoizedState;null===a?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,lastEffect:o}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i,a.lastEffect=o)}function os(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(Da(e,t,r.children,n),0!==(2&(r=Do.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!==(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&rs(e,n);else if(19===e.tag)rs(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(di(Do,r),0===(2&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===No(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),is(t,!1,i,n,o,t.lastEffect);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===No(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}is(t,!0,n,null,o,t.lastEffect);break;case"together":is(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function as(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Us|=t.lanes,0!==(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(a(153));if(null!==t.child){for(n=Yl(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Yl(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function ss(e,t){if(!Uo)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ls(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:case 17:return vi(t.type)&&yi(),null;case 3:return Io(),ui(hi),ui(pi),Go(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(Yo(t)?t.flags|=4:r.hydrate||(t.flags|=256)),Ka(t),null;case 5:Lo(t);var o=Ro($o.current);if(n=t.type,null!==e&&null!=t.stateNode)Ga(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(a(166));return null}if(e=Ro(Ao.current),Yo(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Qr]=t,r[Zr]=s,n){case"dialog":Ar("cancel",r),Ar("close",r);break;case"iframe":case"object":case"embed":Ar("load",r);break;case"video":case"audio":for(e=0;e<Er.length;e++)Ar(Er[e],r);break;case"source":Ar("error",r);break;case"img":case"image":case"link":Ar("error",r),Ar("load",r);break;case"details":Ar("toggle",r);break;case"input":ee(r,s),Ar("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Ar("invalid",r);break;case"textarea":le(r,s),Ar("invalid",r)}for(var c in Se(n,s),e=null,s)s.hasOwnProperty(c)&&(o=s[c],"children"===c?"string"===typeof o?r.textContent!==o&&(e=["children",o]):"number"===typeof o&&r.textContent!==""+o&&(e=["children",""+o]):l.hasOwnProperty(c)&&null!=o&&"onScroll"===c&&Ar("scroll",r));switch(n){case"input":G(r),re(r,s,!0);break;case"textarea":G(r),ue(r);break;case"select":case"option":break;default:"function"===typeof s.onClick&&(r.onclick=Fr)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(c=9===o.nodeType?o:o.ownerDocument,e===de&&(e=pe(n)),e===de?"script"===n?((e=c.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"===typeof r.is?e=c.createElement(n,{is:r.is}):(e=c.createElement(n),"select"===n&&(c=e,r.multiple?c.multiple=!0:r.size&&(c.size=r.size))):e=c.createElementNS(e,n),e[Qr]=t,e[Zr]=r,Xa(e,t,!1,!1),t.stateNode=e,c=Ce(n,r),n){case"dialog":Ar("cancel",e),Ar("close",e),o=r;break;case"iframe":case"object":case"embed":Ar("load",e),o=r;break;case"video":case"audio":for(o=0;o<Er.length;o++)Ar(Er[o],e);o=r;break;case"source":Ar("error",e),o=r;break;case"img":case"image":case"link":Ar("error",e),Ar("load",e),o=r;break;case"details":Ar("toggle",e),o=r;break;case"input":ee(e,r),o=Z(e,r),Ar("invalid",e);break;case"option":o=oe(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=i({},r,{value:void 0}),Ar("invalid",e);break;case"textarea":le(e,r),o=se(e,r),Ar("invalid",e);break;default:o=r}Se(n,o);var u=o;for(s in u)if(u.hasOwnProperty(s)){var d=u[s];"style"===s?ke(e,d):"dangerouslySetInnerHTML"===s?null!=(d=d?d.__html:void 0)&&ve(e,d):"children"===s?"string"===typeof d?("textarea"!==n||""!==d)&&ye(e,d):"number"===typeof d&&ye(e,""+d):"suppressContentEditableWarning"!==s&&"suppressHydrationWarning"!==s&&"autoFocus"!==s&&(l.hasOwnProperty(s)?null!=d&&"onScroll"===s&&Ar("scroll",e):null!=d&&x(e,s,d,c))}switch(n){case"input":G(e),re(e,r,!1);break;case"textarea":G(e),ue(e);break;case"option":null!=r.value&&e.setAttribute("value",""+X(r.value));break;case"select":e.multiple=!!r.multiple,null!=(s=r.value)?ae(e,!!r.multiple,s,!1):null!=r.defaultValue&&ae(e,!!r.multiple,r.defaultValue,!0);break;default:"function"===typeof o.onClick&&(e.onclick=Fr)}Br(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)Ja(e,t,e.memoizedProps,r);else{if("string"!==typeof r&&null===t.stateNode)throw Error(a(166));n=Ro($o.current),Ro(Ao.current),Yo(t)?(r=t.stateNode,n=t.memoizedProps,r[Qr]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[Qr]=t,t.stateNode=r)}return null;case 13:return ui(Do),r=t.memoizedState,0!==(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&Yo(t):n=null!==e.memoizedState,r&&!n&&0!==(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!==(1&Do.current)?0===Ns&&(Ns=3):(0!==Ns&&3!==Ns||(Ns=4),null===_s||0===(134217727&Us)&&0===(134217727&Bs)||bl(_s,Ms))),(r||n)&&(t.flags|=4),null);case 4:return Io(),Ka(t),null===e&&$r(t.stateNode.containerInfo),null;case 10:return ro(t),null;case 19:if(ui(Do),null===(r=t.memoizedState))return null;if(s=0!==(64&t.flags),null===(c=r.rendering))if(s)ss(r,!1);else{if(0!==Ns||null!==e&&0!==(64&e.flags))for(e=t.child;null!==e;){if(null!==(c=No(e))){for(t.flags|=64,ss(r,!1),null!==(s=c.updateQueue)&&(t.updateQueue=s,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(s=n).flags&=2,s.nextEffect=null,s.firstEffect=null,s.lastEffect=null,null===(c=s.alternate)?(s.childLanes=0,s.lanes=e,s.child=null,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=c.childLanes,s.lanes=c.lanes,s.child=c.child,s.memoizedProps=c.memoizedProps,s.memoizedState=c.memoizedState,s.updateQueue=c.updateQueue,s.type=c.type,e=c.dependencies,s.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return di(Do,1&Do.current|2),t.child}e=e.sibling}null!==r.tail&&Bi()>Ys&&(t.flags|=64,s=!0,ss(r,!1),t.lanes=33554432)}else{if(!s)if(null!==(e=No(c))){if(t.flags|=64,s=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),ss(r,!0),null===r.tail&&"hidden"===r.tailMode&&!c.alternate&&!Uo)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*Bi()-r.renderingStartTime>Ys&&1073741824!==n&&(t.flags|=64,s=!0,ss(r,!1),t.lanes=33554432);r.isBackwards?(c.sibling=t.child,t.child=c):(null!==(n=r.last)?n.sibling=c:t.child=c,r.last=c)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=Bi(),n.sibling=null,t=Do.current,di(Do,s?1&t|2:1&t),n):null;case 23:case 24:return Sl(),null!==e&&null!==e.memoizedState!==(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(a(156,t.tag))}function cs(e){switch(e.tag){case 1:vi(e.type)&&yi();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Io(),ui(hi),ui(pi),Go(),0!==(64&(t=e.flags)))throw Error(a(285));return e.flags=-4097&t|64,e;case 5:return Lo(e),null;case 13:return ui(Do),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return ui(Do),null;case 4:return Io(),null;case 10:return ro(e),null;case 23:case 24:return Sl(),null;default:return null}}function us(e,t){try{var n="",r=t;do{n+=W(r),r=r.return}while(r);var i=n}catch(o){i="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:i}}function ds(e,t){try{console.error(t.value)}catch(n){setTimeout((function(){throw n}))}}Xa=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},Ka=function(){},Ga=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Ro(Ao.current);var a,s=null;switch(n){case"input":o=Z(e,o),r=Z(e,r),s=[];break;case"option":o=oe(e,o),r=oe(e,r),s=[];break;case"select":o=i({},o,{value:void 0}),r=i({},r,{value:void 0}),s=[];break;case"textarea":o=se(e,o),r=se(e,r),s=[];break;default:"function"!==typeof o.onClick&&"function"===typeof r.onClick&&(e.onclick=Fr)}for(d in Se(n,r),n=null,o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&null!=o[d])if("style"===d){var c=o[d];for(a in c)c.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(l.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var u=r[d];if(c=null!=o?o[d]:void 0,r.hasOwnProperty(d)&&u!==c&&(null!=u||null!=c))if("style"===d)if(c){for(a in c)!c.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&c[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(s||(s=[]),s.push(d,n)),n=u;else"dangerouslySetInnerHTML"===d?(u=u?u.__html:void 0,c=c?c.__html:void 0,null!=u&&c!==u&&(s=s||[]).push(d,u)):"children"===d?"string"!==typeof u&&"number"!==typeof u||(s=s||[]).push(d,""+u):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(l.hasOwnProperty(d)?(null!=u&&"onScroll"===d&&Ar("scroll",e),s||c===u||(s=[])):"object"===typeof u&&null!==u&&u.$$typeof===I?u.toString():(s=s||[]).push(d,u))}n&&(s=s||[]).push("style",n);var d=s;(t.updateQueue=d)&&(t.flags|=4)}},Ja=function(e,t,n,r){n!==r&&(t.flags|=4)};var fs="function"===typeof WeakMap?WeakMap:Map;function ps(e,t,n){(n=uo(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Js||(Js=!0,Qs=r),ds(0,t)},n}function hs(e,t,n){(n=uo(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"===typeof r){var i=t.value;n.payload=function(){return ds(0,t),r(i)}}var o=e.stateNode;return null!==o&&"function"===typeof o.componentDidCatch&&(n.callback=function(){"function"!==typeof r&&(null===Zs?Zs=new Set([this]):Zs.add(this),ds(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var ms="function"===typeof WeakSet?WeakSet:Set;function gs(e){var t=e.ref;if(null!==t)if("function"===typeof t)try{t(null)}catch(n){Vl(e,n)}else t.current=null}function vs(e,t){switch(t.tag){case 0:case 11:case 15:case 22:case 5:case 6:case 4:case 17:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:Ji(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&Yr(t.stateNode.containerInfo))}throw Error(a(163))}function ys(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3===(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var i=e;r=i.next,0!==(4&(i=i.tag))&&0!==(1&i)&&(Dl(n,e),Ll(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:Ji(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&mo(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:case 1:e=n.child.stateNode}mo(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&Br(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:case 19:case 17:case 20:case 21:case 23:case 24:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&kt(n)))))}throw Error(a(163))}function bs(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"===typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var i=n.memoizedProps.style;i=void 0!==i&&null!==i&&i.hasOwnProperty("display")?i.display:null,r.style.display=we("display",i)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function xs(e,t){if(Si&&"function"===typeof Si.onCommitFiberUnmount)try{Si.onCommitFiberUnmount(ji,t)}catch(o){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,i=r.destroy;if(r=r.tag,void 0!==i)if(0!==(4&r))Dl(t,n);else{r=t;try{i()}catch(o){Vl(r,o)}}n=n.next}while(n!==e)}break;case 1:if(gs(t),"function"===typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(o){Vl(t,o)}break;case 5:gs(t);break;case 4:Es(e,t)}}function ws(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function ks(e){return 5===e.tag||3===e.tag||4===e.tag}function js(e){e:{for(var t=e.return;null!==t;){if(ks(t))break e;t=t.return}throw Error(a(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(a(161))}16&n.flags&&(ye(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||ks(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?Ss(e,n,t):Cs(e,n,t)}function Ss(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Fr));else if(4!==r&&null!==(e=e.child))for(Ss(e,t,n),e=e.sibling;null!==e;)Ss(e,t,n),e=e.sibling}function Cs(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(Cs(e,t,n),e=e.sibling;null!==e;)Cs(e,t,n),e=e.sibling}function Es(e,t){for(var n,r,i=t,o=!1;;){if(!o){o=i.return;e:for(;;){if(null===o)throw Error(a(160));switch(n=o.stateNode,o.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}o=o.return}o=!0}if(5===i.tag||6===i.tag){e:for(var s=e,l=i,c=l;;)if(xs(s,c),null!==c.child&&4!==c.tag)c.child.return=c,c=c.child;else{if(c===l)break e;for(;null===c.sibling;){if(null===c.return||c.return===l)break e;c=c.return}c.sibling.return=c.return,c=c.sibling}r?(s=n,l=i.stateNode,8===s.nodeType?s.parentNode.removeChild(l):s.removeChild(l)):n.removeChild(i.stateNode)}else if(4===i.tag){if(null!==i.child){n=i.stateNode.containerInfo,r=!0,i.child.return=i,i=i.child;continue}}else if(xs(e,i),null!==i.child){i.child.return=i,i=i.child;continue}if(i===t)break;for(;null===i.sibling;){if(null===i.return||i.return===t)return;4===(i=i.return).tag&&(o=!1)}i.sibling.return=i.return,i=i.sibling}}function Ts(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3===(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:case 12:case 17:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var i=null!==e?e.memoizedProps:r;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[Zr]=r,"input"===e&&"radio"===r.type&&null!=r.name&&te(n,r),Ce(e,i),t=Ce(e,r),i=0;i<o.length;i+=2){var s=o[i],l=o[i+1];"style"===s?ke(n,l):"dangerouslySetInnerHTML"===s?ve(n,l):"children"===s?ye(n,l):x(n,s,l,t)}switch(e){case"input":ne(n,r);break;case"textarea":ce(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(o=r.value)?ae(n,!!r.multiple,o,!1):e!==!!r.multiple&&(null!=r.defaultValue?ae(n,!!r.multiple,r.defaultValue,!0):ae(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(a(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,kt(n.containerInfo)));case 13:return null!==t.memoizedState&&(Ws=Bi(),bs(t.child,!0)),void Ps(t);case 19:return void Ps(t);case 23:case 24:return void bs(t,null!==t.memoizedState)}throw Error(a(163))}function Ps(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new ms),t.forEach((function(t){var r=Bl.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function Os(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&(null!==(t=t.memoizedState)&&null===t.dehydrated)}var As=Math.ceil,zs=w.ReactCurrentDispatcher,$s=w.ReactCurrentOwner,Rs=0,_s=null,Is=null,Ms=0,Ls=0,Ds=ci(0),Ns=0,Fs=null,Vs=0,Us=0,Bs=0,Hs=0,qs=null,Ws=0,Ys=1/0;function Xs(){Ys=Bi()+500}var Ks,Gs=null,Js=!1,Qs=null,Zs=null,el=!1,tl=null,nl=90,rl=[],il=[],ol=null,al=0,sl=null,ll=-1,cl=0,ul=0,dl=null,fl=!1;function pl(){return 0!==(48&Rs)?Bi():-1!==ll?ll:ll=Bi()}function hl(e){if(0===(2&(e=e.mode)))return 1;if(0===(4&e))return 99===Hi()?1:2;if(0===cl&&(cl=Vs),0!==Gi.transition){0!==ul&&(ul=null!==qs?qs.pendingLanes:0),e=cl;var t=4186112&~ul;return 0===(t&=-t)&&(0===(t=(e=4186112&~e)&-e)&&(t=8192)),t}return e=Hi(),0!==(4&Rs)&&98===e?e=Ft(12,cl):e=Ft(e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),cl),e}function ml(e,t,n){if(50<al)throw al=0,sl=null,Error(a(185));if(null===(e=gl(e,t)))return null;Bt(e,t,n),e===_s&&(Bs|=t,4===Ns&&bl(e,Ms));var r=Hi();1===t?0!==(8&Rs)&&0===(48&Rs)?xl(e):(vl(e,n),0===Rs&&(Xs(),Xi())):(0===(4&Rs)||98!==r&&99!==r||(null===ol?ol=new Set([e]):ol.add(e)),vl(e,n)),qs=e}function gl(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function vl(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Ht(s),c=1<<l,u=o[l];if(-1===u){if(0===(c&r)||0!==(c&i)){u=t,Lt(c);var d=Mt;o[l]=10<=d?u+250:6<=d?u+5e3:-1}}else u<=t&&(e.expiredLanes|=c);s&=~c}if(r=Dt(e,e===_s?Ms:0),t=Mt,0===r)null!==n&&(n!==Li&&Ti(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==Li&&Ti(n)}15===t?(n=xl.bind(null,e),null===Ni?(Ni=[n],Fi=Ei($i,Ki)):Ni.push(n),n=Li):14===t?n=Yi(99,xl.bind(null,e)):(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(a(358,e))}}(t),n=Yi(n,yl.bind(null,e))),e.callbackPriority=t,e.callbackNode=n}}function yl(e){if(ll=-1,ul=cl=0,0!==(48&Rs))throw Error(a(327));var t=e.callbackNode;if(Ml()&&e.callbackNode!==t)return null;var n=Dt(e,e===_s?Ms:0);if(0===n)return null;var r=n,i=Rs;Rs|=16;var o=Tl();for(_s===e&&Ms===r||(Xs(),Cl(e,r));;)try{Al();break}catch(l){El(e,l)}if(no(),zs.current=o,Rs=i,null!==Is?r=0:(_s=null,Ms=0,r=Ns),0!==(Vs&Bs))Cl(e,0);else if(0!==r){if(2===r&&(Rs|=64,e.hydrate&&(e.hydrate=!1,Yr(e.containerInfo)),0!==(n=Nt(e))&&(r=Pl(e,n))),1===r)throw t=Fs,Cl(e,0),bl(e,n),vl(e,Bi()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(a(345));case 2:case 5:Rl(e);break;case 3:if(bl(e,n),(62914560&n)===n&&10<(r=Ws+500-Bi())){if(0!==Dt(e,0))break;if(((i=e.suspendedLanes)&n)!==n){pl(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=qr(Rl.bind(null,e),r);break}Rl(e);break;case 4:if(bl(e,n),(4186112&n)===n)break;for(r=e.eventTimes,i=-1;0<n;){var s=31-Ht(n);o=1<<s,(s=r[s])>i&&(i=s),n&=~o}if(n=i,10<(n=(120>(n=Bi()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*As(n/1960))-n)){e.timeoutHandle=qr(Rl.bind(null,e),n);break}Rl(e);break;default:throw Error(a(329))}}return vl(e,Bi()),e.callbackNode===t?yl.bind(null,e):null}function bl(e,t){for(t&=~Hs,t&=~Bs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ht(t),r=1<<n;e[n]=-1,t&=~r}}function xl(e){if(0!==(48&Rs))throw Error(a(327));if(Ml(),e===_s&&0!==(e.expiredLanes&Ms)){var t=Ms,n=Pl(e,t);0!==(Vs&Bs)&&(n=Pl(e,t=Dt(e,t)))}else n=Pl(e,t=Dt(e,0));if(0!==e.tag&&2===n&&(Rs|=64,e.hydrate&&(e.hydrate=!1,Yr(e.containerInfo)),0!==(t=Nt(e))&&(n=Pl(e,t))),1===n)throw n=Fs,Cl(e,0),bl(e,t),vl(e,Bi()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Rl(e),vl(e,Bi()),null}function wl(e,t){var n=Rs;Rs|=1;try{return e(t)}finally{0===(Rs=n)&&(Xs(),Xi())}}function kl(e,t){var n=Rs;Rs&=-2,Rs|=8;try{return e(t)}finally{0===(Rs=n)&&(Xs(),Xi())}}function jl(e,t){di(Ds,Ls),Ls|=t,Vs|=t}function Sl(){Ls=Ds.current,ui(Ds)}function Cl(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,Wr(n)),null!==Is)for(n=Is.return;null!==n;){var r=n;switch(r.tag){case 1:null!==(r=r.type.childContextTypes)&&void 0!==r&&yi();break;case 3:Io(),ui(hi),ui(pi),Go();break;case 5:Lo(r);break;case 4:Io();break;case 13:case 19:ui(Do);break;case 10:ro(r);break;case 23:case 24:Sl()}n=n.return}_s=e,Is=Yl(e.current,null),Ms=Ls=Vs=t,Ns=0,Fs=null,Hs=Bs=Us=0}function El(e,t){for(;;){var n=Is;try{if(no(),Jo.current=$a,ra){for(var r=ea.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}ra=!1}if(Zo=0,na=ta=ea=null,ia=!1,$s.current=null,null===n||null===n.return){Ns=1,Fs=t,Is=null;break}e:{var o=e,a=n.return,s=n,l=t;if(t=Ms,s.flags|=2048,s.firstEffect=s.lastEffect=null,null!==l&&"object"===typeof l&&"function"===typeof l.then){var c=l;if(0===(2&s.mode)){var u=s.alternate;u?(s.updateQueue=u.updateQueue,s.memoizedState=u.memoizedState,s.lanes=u.lanes):(s.updateQueue=null,s.memoizedState=null)}var d=0!==(1&Do.current),f=a;do{var p;if(p=13===f.tag){var h=f.memoizedState;if(null!==h)p=null!==h.dehydrated;else{var m=f.memoizedProps;p=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!d)}}if(p){var g=f.updateQueue;if(null===g){var v=new Set;v.add(c),f.updateQueue=v}else g.add(c);if(0===(2&f.mode)){if(f.flags|=64,s.flags|=16384,s.flags&=-2981,1===s.tag)if(null===s.alternate)s.tag=17;else{var y=uo(-1,1);y.tag=2,fo(s,y)}s.lanes|=1;break e}l=void 0,s=t;var b=o.pingCache;if(null===b?(b=o.pingCache=new fs,l=new Set,b.set(c,l)):void 0===(l=b.get(c))&&(l=new Set,b.set(c,l)),!l.has(s)){l.add(s);var x=Ul.bind(null,o,c,s);c.then(x,x)}f.flags|=4096,f.lanes=t;break e}f=f.return}while(null!==f);l=Error((Y(s.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==Ns&&(Ns=2),l=us(l,s),f=a;do{switch(f.tag){case 3:o=l,f.flags|=4096,t&=-t,f.lanes|=t,po(f,ps(0,o,t));break e;case 1:o=l;var w=f.type,k=f.stateNode;if(0===(64&f.flags)&&("function"===typeof w.getDerivedStateFromError||null!==k&&"function"===typeof k.componentDidCatch&&(null===Zs||!Zs.has(k)))){f.flags|=4096,t&=-t,f.lanes|=t,po(f,hs(f,o,t));break e}}f=f.return}while(null!==f)}$l(n)}catch(j){t=j,Is===n&&null!==n&&(Is=n=n.return);continue}break}}function Tl(){var e=zs.current;return zs.current=$a,null===e?$a:e}function Pl(e,t){var n=Rs;Rs|=16;var r=Tl();for(_s===e&&Ms===t||Cl(e,t);;)try{Ol();break}catch(i){El(e,i)}if(no(),Rs=n,zs.current=r,null!==Is)throw Error(a(261));return _s=null,Ms=0,Ns}function Ol(){for(;null!==Is;)zl(Is)}function Al(){for(;null!==Is&&!Pi();)zl(Is)}function zl(e){var t=Ks(e.alternate,e,Ls);e.memoizedProps=e.pendingProps,null===t?$l(e):Is=t,$s.current=null}function $l(e){var t=e;do{var n=t.alternate;if(e=t.return,0===(2048&t.flags)){if(null!==(n=ls(n,t,Ls)))return void(Is=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!==(1073741824&Ls)||0===(4&n.mode)){for(var r=0,i=n.child;null!==i;)r|=i.lanes|i.childLanes,i=i.sibling;n.childLanes=r}null!==e&&0===(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=cs(t)))return n.flags&=2047,void(Is=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(Is=t);Is=t=e}while(null!==t);0===Ns&&(Ns=5)}function Rl(e){var t=Hi();return Wi(99,_l.bind(null,e,t)),null}function _l(e,t){do{Ml()}while(null!==tl);if(0!==(48&Rs))throw Error(a(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(a(177));e.callbackNode=null;var r=n.lanes|n.childLanes,i=r,o=e.pendingLanes&~i;e.pendingLanes=i,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=i,e.mutableReadLanes&=i,e.entangledLanes&=i,i=e.entanglements;for(var s=e.eventTimes,l=e.expirationTimes;0<o;){var c=31-Ht(o),u=1<<c;i[c]=0,s[c]=-1,l[c]=-1,o&=~u}if(null!==ol&&0===(24&r)&&ol.has(e)&&ol.delete(e),e===_s&&(Is=_s=null,Ms=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(i=Rs,Rs|=32,$s.current=null,Vr=Kt,vr(s=gr())){if("selectionStart"in s)l={start:s.selectionStart,end:s.selectionEnd};else e:if(l=(l=s.ownerDocument)&&l.defaultView||window,(u=l.getSelection&&l.getSelection())&&0!==u.rangeCount){l=u.anchorNode,o=u.anchorOffset,c=u.focusNode,u=u.focusOffset;try{l.nodeType,c.nodeType}catch(E){l=null;break e}var d=0,f=-1,p=-1,h=0,m=0,g=s,v=null;t:for(;;){for(var y;g!==l||0!==o&&3!==g.nodeType||(f=d+o),g!==c||0!==u&&3!==g.nodeType||(p=d+u),3===g.nodeType&&(d+=g.nodeValue.length),null!==(y=g.firstChild);)v=g,g=y;for(;;){if(g===s)break t;if(v===l&&++h===o&&(f=d),v===c&&++m===u&&(p=d),null!==(y=g.nextSibling))break;v=(g=v).parentNode}g=y}l=-1===f||-1===p?null:{start:f,end:p}}else l=null;l=l||{start:0,end:0}}else l=null;Ur={focusedElem:s,selectionRange:l},Kt=!1,dl=null,fl=!1,Gs=r;do{try{Il()}catch(E){if(null===Gs)throw Error(a(330));Vl(Gs,E),Gs=Gs.nextEffect}}while(null!==Gs);dl=null,Gs=r;do{try{for(s=e;null!==Gs;){var b=Gs.flags;if(16&b&&ye(Gs.stateNode,""),128&b){var x=Gs.alternate;if(null!==x){var w=x.ref;null!==w&&("function"===typeof w?w(null):w.current=null)}}switch(1038&b){case 2:js(Gs),Gs.flags&=-3;break;case 6:js(Gs),Gs.flags&=-3,Ts(Gs.alternate,Gs);break;case 1024:Gs.flags&=-1025;break;case 1028:Gs.flags&=-1025,Ts(Gs.alternate,Gs);break;case 4:Ts(Gs.alternate,Gs);break;case 8:Es(s,l=Gs);var k=l.alternate;ws(l),null!==k&&ws(k)}Gs=Gs.nextEffect}}catch(E){if(null===Gs)throw Error(a(330));Vl(Gs,E),Gs=Gs.nextEffect}}while(null!==Gs);if(w=Ur,x=gr(),b=w.focusedElem,s=w.selectionRange,x!==b&&b&&b.ownerDocument&&mr(b.ownerDocument.documentElement,b)){null!==s&&vr(b)&&(x=s.start,void 0===(w=s.end)&&(w=x),"selectionStart"in b?(b.selectionStart=x,b.selectionEnd=Math.min(w,b.value.length)):(w=(x=b.ownerDocument||document)&&x.defaultView||window).getSelection&&(w=w.getSelection(),l=b.textContent.length,k=Math.min(s.start,l),s=void 0===s.end?k:Math.min(s.end,l),!w.extend&&k>s&&(l=s,s=k,k=l),l=hr(b,k),o=hr(b,s),l&&o&&(1!==w.rangeCount||w.anchorNode!==l.node||w.anchorOffset!==l.offset||w.focusNode!==o.node||w.focusOffset!==o.offset)&&((x=x.createRange()).setStart(l.node,l.offset),w.removeAllRanges(),k>s?(w.addRange(x),w.extend(o.node,o.offset)):(x.setEnd(o.node,o.offset),w.addRange(x))))),x=[];for(w=b;w=w.parentNode;)1===w.nodeType&&x.push({element:w,left:w.scrollLeft,top:w.scrollTop});for("function"===typeof b.focus&&b.focus(),b=0;b<x.length;b++)(w=x[b]).element.scrollLeft=w.left,w.element.scrollTop=w.top}Kt=!!Vr,Ur=Vr=null,e.current=n,Gs=r;do{try{for(b=e;null!==Gs;){var j=Gs.flags;if(36&j&&ys(b,Gs.alternate,Gs),128&j){x=void 0;var S=Gs.ref;if(null!==S){var C=Gs.stateNode;Gs.tag,x=C,"function"===typeof S?S(x):S.current=x}}Gs=Gs.nextEffect}}catch(E){if(null===Gs)throw Error(a(330));Vl(Gs,E),Gs=Gs.nextEffect}}while(null!==Gs);Gs=null,Di(),Rs=i}else e.current=n;if(el)el=!1,tl=e,nl=t;else for(Gs=r;null!==Gs;)t=Gs.nextEffect,Gs.nextEffect=null,8&Gs.flags&&((j=Gs).sibling=null,j.stateNode=null),Gs=t;if(0===(r=e.pendingLanes)&&(Zs=null),1===r?e===sl?al++:(al=0,sl=e):al=0,n=n.stateNode,Si&&"function"===typeof Si.onCommitFiberRoot)try{Si.onCommitFiberRoot(ji,n,void 0,64===(64&n.current.flags))}catch(E){}if(vl(e,Bi()),Js)throw Js=!1,e=Qs,Qs=null,e;return 0!==(8&Rs)||Xi(),null}function Il(){for(;null!==Gs;){var e=Gs.alternate;fl||null===dl||(0!==(8&Gs.flags)?et(Gs,dl)&&(fl=!0):13===Gs.tag&&Os(e,Gs)&&et(Gs,dl)&&(fl=!0));var t=Gs.flags;0!==(256&t)&&vs(e,Gs),0===(512&t)||el||(el=!0,Yi(97,(function(){return Ml(),null}))),Gs=Gs.nextEffect}}function Ml(){if(90!==nl){var e=97<nl?97:nl;return nl=90,Wi(e,Nl)}return!1}function Ll(e,t){rl.push(t,e),el||(el=!0,Yi(97,(function(){return Ml(),null})))}function Dl(e,t){il.push(t,e),el||(el=!0,Yi(97,(function(){return Ml(),null})))}function Nl(){if(null===tl)return!1;var e=tl;if(tl=null,0!==(48&Rs))throw Error(a(331));var t=Rs;Rs|=32;var n=il;il=[];for(var r=0;r<n.length;r+=2){var i=n[r],o=n[r+1],s=i.destroy;if(i.destroy=void 0,"function"===typeof s)try{s()}catch(c){if(null===o)throw Error(a(330));Vl(o,c)}}for(n=rl,rl=[],r=0;r<n.length;r+=2){i=n[r],o=n[r+1];try{var l=i.create;i.destroy=l()}catch(c){if(null===o)throw Error(a(330));Vl(o,c)}}for(l=e.current.firstEffect;null!==l;)e=l.nextEffect,l.nextEffect=null,8&l.flags&&(l.sibling=null,l.stateNode=null),l=e;return Rs=t,Xi(),!0}function Fl(e,t,n){fo(e,t=ps(0,t=us(n,t),1)),t=pl(),null!==(e=gl(e,1))&&(Bt(e,1,t),vl(e,t))}function Vl(e,t){if(3===e.tag)Fl(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Fl(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"===typeof n.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Zs||!Zs.has(r))){var i=hs(n,e=us(t,e),1);if(fo(n,i),i=pl(),null!==(n=gl(n,1)))Bt(n,1,i),vl(n,i);else if("function"===typeof r.componentDidCatch&&(null===Zs||!Zs.has(r)))try{r.componentDidCatch(t,e)}catch(o){}break}}n=n.return}}function Ul(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=pl(),e.pingedLanes|=e.suspendedLanes&n,_s===e&&(Ms&n)===n&&(4===Ns||3===Ns&&(62914560&Ms)===Ms&&500>Bi()-Ws?Cl(e,0):Hs|=n),vl(e,t)}function Bl(e,t){var n=e.stateNode;null!==n&&n.delete(t),0===(t=0)&&(0===(2&(t=e.mode))?t=1:0===(4&t)?t=99===Hi()?1:2:(0===cl&&(cl=Vs),0===(t=Vt(62914560&~cl))&&(t=4194304))),n=pl(),null!==(e=gl(e,t))&&(Bt(e,t,n),vl(e,n))}function Hl(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function ql(e,t,n,r){return new Hl(e,t,n,r)}function Wl(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Yl(e,t){var n=e.alternate;return null===n?((n=ql(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xl(e,t,n,r,i,o){var s=2;if(r=e,"function"===typeof e)Wl(e)&&(s=1);else if("string"===typeof e)s=5;else e:switch(e){case S:return Kl(n.children,i,o,t);case M:s=8,i|=16;break;case C:s=8,i|=1;break;case E:return(e=ql(12,n,t,8|i)).elementType=E,e.type=E,e.lanes=o,e;case A:return(e=ql(13,n,t,i)).type=A,e.elementType=A,e.lanes=o,e;case z:return(e=ql(19,n,t,i)).elementType=z,e.lanes=o,e;case L:return Gl(n,i,o,t);case D:return(e=ql(24,n,t,i)).elementType=D,e.lanes=o,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case T:s=10;break e;case P:s=9;break e;case O:s=11;break e;case $:s=14;break e;case R:s=16,r=null;break e;case _:s=22;break e}throw Error(a(130,null==e?e:typeof e,""))}return(t=ql(s,n,t,i)).elementType=e,t.type=r,t.lanes=o,t}function Kl(e,t,n,r){return(e=ql(7,e,r,t)).lanes=n,e}function Gl(e,t,n,r){return(e=ql(23,e,r,t)).elementType=L,e.lanes=n,e}function Jl(e,t,n){return(e=ql(6,e,null,t)).lanes=n,e}function Ql(e,t,n){return(t=ql(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Zl(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=Ut(0),this.expirationTimes=Ut(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ut(0),this.mutableSourceEagerHydrationData=null}function ec(e,t,n,r){var i=t.current,o=pl(),s=hl(i);e:if(n){t:{if(Ge(n=n._reactInternals)!==n||1!==n.tag)throw Error(a(170));var l=n;do{switch(l.tag){case 3:l=l.stateNode.context;break t;case 1:if(vi(l.type)){l=l.stateNode.__reactInternalMemoizedMergedChildContext;break t}}l=l.return}while(null!==l);throw Error(a(171))}if(1===n.tag){var c=n.type;if(vi(c)){n=xi(n,c,l);break e}}n=l}else n=fi;return null===t.context?t.context=n:t.pendingContext=n,(t=uo(o,s)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),fo(i,t),ml(i,s,o),s}function tc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function nc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function rc(e,t){nc(e,t),(e=e.alternate)&&nc(e,t)}function ic(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new Zl(e,t,null!=n&&!0===n.hydrate),t=ql(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,lo(t),e[ei]=n.current,$r(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var i=(t=r[e])._getVersion;i=i(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i)}this._internalRoot=n}function oc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function ac(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o._internalRoot;if("function"===typeof i){var s=i;i=function(){var e=tc(a);s.call(e)}}ec(t,a,e,i)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new ic(e,0,t?{hydrate:!0}:void 0)}(n,r),a=o._internalRoot,"function"===typeof i){var l=i;i=function(){var e=tc(a);l.call(e)}}kl((function(){ec(t,a,e,i)}))}return tc(a)}function sc(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!oc(t))throw Error(a(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:j,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)}Ks=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||hi.current)La=!0;else{if(0===(n&r)){switch(La=!1,t.tag){case 3:Ya(t),Xo();break;case 5:Mo(t);break;case 1:vi(t.type)&&wi(t);break;case 4:_o(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var i=t.type._context;di(Qi,i._currentValue),i._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!==(n&t.child.childLanes)?Za(e,t,n):(di(Do,1&Do.current),null!==(t=as(e,t,n))?t.sibling:null);di(Do,1&Do.current);break;case 19:if(r=0!==(n&t.childLanes),0!==(64&e.flags)){if(r)return os(e,t,n);t.flags|=64}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),di(Do,Do.current),r)break;return null;case 23:case 24:return t.lanes=0,Ua(e,t,n)}return as(e,t,n)}La=0!==(16384&e.flags)}else La=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=gi(t,pi.current),oo(t,n),i=sa(null,t,r,e,i,n),t.flags|=1,"object"===typeof i&&null!==i&&"function"===typeof i.render&&void 0===i.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,vi(r)){var o=!0;wi(t)}else o=!1;t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,lo(t);var s=r.getDerivedStateFromProps;"function"===typeof s&&vo(t,r,s,e),i.updater=yo,t.stateNode=i,i._reactInternals=t,ko(t,r,e,n),t=Wa(null,t,r,!0,o,n)}else t.tag=0,Da(null,t,i,n),t=t.child;return t;case 16:i=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=(o=i._init)(i._payload),t.type=i,o=t.tag=function(e){if("function"===typeof e)return Wl(e)?1:0;if(void 0!==e&&null!==e){if((e=e.$$typeof)===O)return 11;if(e===$)return 14}return 2}(i),e=Ji(i,e),o){case 0:t=Ha(null,t,i,e,n);break e;case 1:t=qa(null,t,i,e,n);break e;case 11:t=Na(null,t,i,e,n);break e;case 14:t=Fa(null,t,i,Ji(i.type,e),r,n);break e}throw Error(a(306,i,""))}return t;case 0:return r=t.type,i=t.pendingProps,Ha(e,t,r,i=t.elementType===r?i:Ji(r,i),n);case 1:return r=t.type,i=t.pendingProps,qa(e,t,r,i=t.elementType===r?i:Ji(r,i),n);case 3:if(Ya(t),r=t.updateQueue,null===e||null===r)throw Error(a(282));if(r=t.pendingProps,i=null!==(i=t.memoizedState)?i.element:null,co(e,t),ho(t,r,null,n),(r=t.memoizedState.element)===i)Xo(),t=as(e,t,n);else{if((o=(i=t.stateNode).hydrate)&&(Vo=Xr(t.stateNode.containerInfo.firstChild),Fo=t,o=Uo=!0),o){if(null!=(e=i.mutableSourceEagerHydrationData))for(i=0;i<e.length;i+=2)(o=e[i])._workInProgressVersionPrimary=e[i+1],Ko.push(o);for(n=Po(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Da(e,t,r,n),Xo();t=t.child}return t;case 5:return Mo(t),null===e&&qo(t),r=t.type,i=t.pendingProps,o=null!==e?e.memoizedProps:null,s=i.children,Hr(r,i)?s=null:null!==o&&Hr(r,o)&&(t.flags|=16),Ba(e,t),Da(e,t,s,n),t.child;case 6:return null===e&&qo(t),null;case 13:return Za(e,t,n);case 4:return _o(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=To(t,null,r,n):Da(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,Na(e,t,r,i=t.elementType===r?i:Ji(r,i),n);case 7:return Da(e,t,t.pendingProps,n),t.child;case 8:case 12:return Da(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value;var l=t.type._context;if(di(Qi,l._currentValue),l._currentValue=o,null!==s)if(l=s.value,0===(o=ur(l,o)?0:0|("function"===typeof r._calculateChangedBits?r._calculateChangedBits(l,o):1073741823))){if(s.children===i.children&&!hi.current){t=as(e,t,n);break e}}else for(null!==(l=t.child)&&(l.return=t);null!==l;){var c=l.dependencies;if(null!==c){s=l.child;for(var u=c.firstContext;null!==u;){if(u.context===r&&0!==(u.observedBits&o)){1===l.tag&&((u=uo(-1,n&-n)).tag=2,fo(l,u)),l.lanes|=n,null!==(u=l.alternate)&&(u.lanes|=n),io(l.return,n),c.lanes|=n;break}u=u.next}}else s=10===l.tag&&l.type===t.type?null:l.child;if(null!==s)s.return=l;else for(s=l;null!==s;){if(s===t){s=null;break}if(null!==(l=s.sibling)){l.return=s.return,s=l;break}s=s.return}l=s}Da(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=(o=t.pendingProps).children,oo(t,n),r=r(i=ao(i,o.unstable_observedBits)),t.flags|=1,Da(e,t,r,n),t.child;case 14:return o=Ji(i=t.type,t.pendingProps),Fa(e,t,i,o=Ji(i.type,o),r,n);case 15:return Va(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ji(r,i),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,vi(r)?(e=!0,wi(t)):e=!1,oo(t,n),xo(t,r,i),ko(t,r,i,n),Wa(null,t,r,!0,e,n);case 19:return os(e,t,n);case 23:case 24:return Ua(e,t,n)}throw Error(a(156,t.tag))},ic.prototype.render=function(e){ec(e,this._internalRoot,null,null)},ic.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;ec(null,e,null,(function(){t[ei]=null}))},tt=function(e){13===e.tag&&(ml(e,4,pl()),rc(e,4))},nt=function(e){13===e.tag&&(ml(e,67108864,pl()),rc(e,67108864))},rt=function(e){if(13===e.tag){var t=pl(),n=hl(e);ml(e,n,t),rc(e,n)}},it=function(e,t){return t()},Te=function(e,t,n){switch(t){case"input":if(ne(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=oi(r);if(!i)throw Error(a(90));J(r),ne(r,i)}}}break;case"textarea":ce(e,n);break;case"select":null!=(t=n.value)&&ae(e,!!n.multiple,t,!1)}},Re=wl,_e=function(e,t,n,r,i){var o=Rs;Rs|=4;try{return Wi(98,e.bind(null,t,n,r,i))}finally{0===(Rs=o)&&(Xs(),Xi())}},Ie=function(){0===(49&Rs)&&(function(){if(null!==ol){var e=ol;ol=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,vl(e,Bi())}))}Xi()}(),Ml())},Me=function(e,t){var n=Rs;Rs|=2;try{return e(t)}finally{0===(Rs=n)&&(Xs(),Xi())}};var lc={Events:[ri,ii,oi,ze,$e,Ml,{current:!1}]},cc={findFiberByHostInstance:ni,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},uc={bundleType:cc.bundleType,version:cc.version,rendererPackageName:cc.rendererPackageName,rendererConfig:cc.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:w.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ze(e))?null:e.stateNode},findFiberByHostInstance:cc.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var dc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dc.isDisabled&&dc.supportsFiber)try{ji=dc.inject(uc),Si=dc}catch(ge){}}t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lc,t.createPortal=sc,t.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(a(188));throw Error(a(268,Object.keys(e)))}return e=null===(e=Ze(t))?null:e.stateNode},t.flushSync=function(e,t){var n=Rs;if(0!==(48&n))return e(t);Rs|=1;try{if(e)return Wi(99,e.bind(null,t))}finally{Rs=n,Xi()}},t.hydrate=function(e,t,n){if(!oc(t))throw Error(a(200));return ac(null,e,t,!0,n)},t.render=function(e,t,n){if(!oc(t))throw Error(a(200));return ac(null,e,t,!1,n)},t.unmountComponentAtNode=function(e){if(!oc(e))throw Error(a(40));return!!e._reactRootContainer&&(kl((function(){ac(null,null,e,!1,(function(){e._reactRootContainer=null,e[ei]=null}))})),!0)},t.unstable_batchedUpdates=wl,t.unstable_createPortal=function(e,t){return sc(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!oc(n))throw Error(a(200));if(null==e||void 0===e._reactInternals)throw Error(a(38));return ac(e,t,n,!1,r)},t.version="17.0.2"},736:(e,t,n)=>{e.exports=n(404)},740:e=>{"use strict";e.exports=function(e,t,n,r,i,o,a,s){if(!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,i,o,a,s],u=0;(l=new Error(t.replace(/%s/g,(function(){return c[u++]})))).name="Invariant Violation"}throw l.framesToPop=1,l}}},760:(e,t,n)=>{"use strict";var r=n(43),i=n(173),o=n(736),a=n(225),s=a.serializers,l=a.serializeSpan,c=a.renderProps,u=o.getImageUrl,d=o.blocksToNodes,f=o.mergeSerializers,p=r.createElement,h=function e(t){var n=f(e.defaultSerializers,t.serializers),r=Object.assign({},c,t,{serializers:n,blocks:t.blocks||[]});return d(p,r,s,l)};h.defaultSerializers=s,h.getImageUrl=u,h.propTypes={className:i.string,renderContainerOnSingleChild:i.bool,ignoreUnknownTypes:i.bool,projectId:i.string,dataset:i.string,imageOptions:i.object,serializers:i.shape({types:i.object,marks:i.object,list:i.func,listItem:i.func,block:i.func,span:i.func}),blocks:i.oneOfType([i.arrayOf(i.shape({_type:i.string.isRequired})),i.shape({_type:i.string.isRequired})]).isRequired},h.defaultProps={ignoreUnknownTypes:!0,renderContainerOnSingleChild:!1,serializers:{},imageOptions:{}},e.exports=h},763:(e,t,n)=>{"use strict";e.exports=n(983)},849:(e,t,n)=>{"use strict";var r=n(123);function i(e){return Boolean(e.listItem)}function o(e,t){return e.level===t.level&&e.listItem===t.listItem}function a(e){return{_type:"list",_key:"".concat(e._key,"-parent"),level:e.level,listItem:e.listItem,children:[e]}}function s(e){return e.children&&e.children[e.children.length-1]}function l(e,t){var n="string"===typeof t.listItem;if("list"===e._type&&e.level===t.level&&n&&e.listItem===t.listItem)return e;var r=s(e);return!!r&&l(r,t)}e.exports=function(e){for(var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"html",c=[],u=0;u<e.length;u++){var d=e[u];if(i(d))if(t)if(o(d,t))t.children.push(d);else if(d.level>t.level){var f=a(d);if("html"===n){var p=s(t),h=r({},p,{children:p.children.concat(f)});t.children[t.children.length-1]=h}else t.children.push(f);t=f}else if(d.level<t.level){var m=l(c[c.length-1],d);if(m){(t=m).children.push(d);continue}t=a(d),c.push(t)}else if(d.listItem===t.listItem)console.warn("Unknown state encountered for block",d),c.push(d);else{var g=l(c[c.length-1],{level:d.level});if(g&&g.listItem===d.listItem){(t=g).children.push(d);continue}t=a(d),c.push(t)}else t=a(d),c.push(t);else c.push(d),t=null}return c}},853:(e,t,n)=>{"use strict";e.exports=n(234)},950:(e,t,n)=>{"use strict";!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(730)},983:(e,t)=>{"use strict";var n="function"===typeof Symbol&&Symbol.for,r=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,o=n?Symbol.for("react.fragment"):60107,a=n?Symbol.for("react.strict_mode"):60108,s=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,c=n?Symbol.for("react.context"):60110,u=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,f=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,m=n?Symbol.for("react.memo"):60115,g=n?Symbol.for("react.lazy"):60116,v=n?Symbol.for("react.block"):60121,y=n?Symbol.for("react.fundamental"):60117,b=n?Symbol.for("react.responder"):60118,x=n?Symbol.for("react.scope"):60119;function w(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case u:case d:case o:case s:case a:case p:return e;default:switch(e=e&&e.$$typeof){case c:case f:case g:case m:case l:return e;default:return t}}case i:return t}}}function k(e){return w(e)===d}t.AsyncMode=u,t.ConcurrentMode=d,t.ContextConsumer=c,t.ContextProvider=l,t.Element=r,t.ForwardRef=f,t.Fragment=o,t.Lazy=g,t.Memo=m,t.Portal=i,t.Profiler=s,t.StrictMode=a,t.Suspense=p,t.isAsyncMode=function(e){return k(e)||w(e)===u},t.isConcurrentMode=k,t.isContextConsumer=function(e){return w(e)===c},t.isContextProvider=function(e){return w(e)===l},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===r},t.isForwardRef=function(e){return w(e)===f},t.isFragment=function(e){return w(e)===o},t.isLazy=function(e){return w(e)===g},t.isMemo=function(e){return w(e)===m},t.isPortal=function(e){return w(e)===i},t.isProfiler=function(e){return w(e)===s},t.isStrictMode=function(e){return w(e)===a},t.isSuspense=function(e){return w(e)===p},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===d||e===s||e===a||e===p||e===h||"object"===typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===m||e.$$typeof===l||e.$$typeof===c||e.$$typeof===f||e.$$typeof===y||e.$$typeof===b||e.$$typeof===x||e.$$typeof===v)},t.typeOf=w}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,i){if(1&i&&(r=this(r)),8&i)return r;if("object"===typeof r&&r){if(4&i&&r.__esModule)return r;if(16&i&&"function"===typeof r.then)return r}var o=Object.create(null);n.r(o);var a={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>a[e]=()=>r[e]));return a.default=()=>r,n.d(o,a),o}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>"static/js/"+e+"."+{165:"2affbb25",796:"b7636e0e"}[e]+".chunk.js",n.miniCssF=e=>{},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="felipe-portfolio:";n.l=(r,i,o,a)=>{if(e[r])e[r].push(i);else{var s,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+o){s=d;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+o),s.src=r),e[r]=[i];var f=(t,n)=>{s.onerror=s.onload=null,clearTimeout(p);var i=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(n))),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={792:0};n.f.j=(t,r)=>{var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise(((n,r)=>i=e[t]=[n,r]));r.push(i[2]=o);var a=n.p+n.u(t),s=new Error;n.l(a,(r=>{if(n.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,i[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var i,o,a=r[0],s=r[1],l=r[2],c=0;if(a.some((t=>0!==e[t]))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)l(n)}for(t&&t(r);c<a.length;c++)o=a[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=self.webpackChunkfelipe_portfolio=self.webpackChunkfelipe_portfolio||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0,(()=>{"use strict";var e=n(43),t=n(950),r=n(528),i=n(324),o=n.n(i);const a=function(e){function t(e,r,l,c,f){for(var p,h,m,g,x,k=0,j=0,S=0,C=0,E=0,$=0,_=m=p=0,M=0,L=0,D=0,N=0,F=l.length,V=F-1,U="",B="",H="",q="";M<F;){if(h=l.charCodeAt(M),M===V&&0!==j+C+S+k&&(0!==j&&(h=47===j?10:47),C=S=k=0,F++,V++),0===j+C+S+k){if(M===V&&(0<L&&(U=U.replace(d,"")),0<U.trim().length)){switch(h){case 32:case 9:case 59:case 13:case 10:break;default:U+=l.charAt(M)}h=59}switch(h){case 123:for(p=(U=U.trim()).charCodeAt(0),m=1,N=++M;M<F;){switch(h=l.charCodeAt(M)){case 123:m++;break;case 125:m--;break;case 47:switch(h=l.charCodeAt(M+1)){case 42:case 47:e:{for(_=M+1;_<V;++_)switch(l.charCodeAt(_)){case 47:if(42===h&&42===l.charCodeAt(_-1)&&M+2!==_){M=_+1;break e}break;case 10:if(47===h){M=_+1;break e}}M=_}}break;case 91:h++;case 40:h++;case 34:case 39:for(;M++<V&&l.charCodeAt(M)!==h;);}if(0===m)break;M++}if(m=l.substring(N,M),0===p&&(p=(U=U.replace(u,"").trim()).charCodeAt(0)),64===p){switch(0<L&&(U=U.replace(d,"")),h=U.charCodeAt(1)){case 100:case 109:case 115:case 45:L=r;break;default:L=z}if(N=(m=t(r,L,m,h,f+1)).length,0<R&&(x=s(3,m,L=n(z,U,D),r,P,T,N,h,f,c),U=L.join(""),void 0!==x&&0===(N=(m=x.trim()).length)&&(h=0,m="")),0<N)switch(h){case 115:U=U.replace(w,a);case 100:case 109:case 45:m=U+"{"+m+"}";break;case 107:m=(U=U.replace(v,"$1 $2"))+"{"+m+"}",m=1===A||2===A&&o("@"+m,3)?"@-webkit-"+m+"@"+m:"@"+m;break;default:m=U+m,112===c&&(B+=m,m="")}else m=""}else m=t(r,n(r,U,D),m,c,f+1);H+=m,m=D=L=_=p=0,U="",h=l.charCodeAt(++M);break;case 125:case 59:if(1<(N=(U=(0<L?U.replace(d,""):U).trim()).length))switch(0===_&&(p=U.charCodeAt(0),45===p||96<p&&123>p)&&(N=(U=U.replace(" ",":")).length),0<R&&void 0!==(x=s(1,U,r,e,P,T,B.length,c,f,c))&&0===(N=(U=x.trim()).length)&&(U="\0\0"),p=U.charCodeAt(0),h=U.charCodeAt(1),p){case 0:break;case 64:if(105===h||99===h){q+=U+l.charAt(M);break}default:58!==U.charCodeAt(N-1)&&(B+=i(U,p,h,U.charCodeAt(2)))}D=L=_=p=0,U="",h=l.charCodeAt(++M)}}switch(h){case 13:case 10:47===j?j=0:0===1+p&&107!==c&&0<U.length&&(L=1,U+="\0"),0<R*I&&s(0,U,r,e,P,T,B.length,c,f,c),T=1,P++;break;case 59:case 125:if(0===j+C+S+k){T++;break}default:switch(T++,g=l.charAt(M),h){case 9:case 32:if(0===C+k+j)switch(E){case 44:case 58:case 9:case 32:g="";break;default:32!==h&&(g=" ")}break;case 0:g="\\0";break;case 12:g="\\f";break;case 11:g="\\v";break;case 38:0===C+j+k&&(L=D=1,g="\f"+g);break;case 108:if(0===C+j+k+O&&0<_)switch(M-_){case 2:112===E&&58===l.charCodeAt(M-3)&&(O=E);case 8:111===$&&(O=$)}break;case 58:0===C+j+k&&(_=M);break;case 44:0===j+S+C+k&&(L=1,g+="\r");break;case 34:case 39:0===j&&(C=C===h?0:0===C?h:C);break;case 91:0===C+j+S&&k++;break;case 93:0===C+j+S&&k--;break;case 41:0===C+j+k&&S--;break;case 40:if(0===C+j+k){if(0===p)if(2*E+3*$===533);else p=1;S++}break;case 64:0===j+S+C+k+_+m&&(m=1);break;case 42:case 47:if(!(0<C+k+S))switch(j){case 0:switch(2*h+3*l.charCodeAt(M+1)){case 235:j=47;break;case 220:N=M,j=42}break;case 42:47===h&&42===E&&N+2!==M&&(33===l.charCodeAt(N+2)&&(B+=l.substring(N,M+1)),g="",j=0)}}0===j&&(U+=g)}$=E,E=h,M++}if(0<(N=B.length)){if(L=r,0<R&&(void 0!==(x=s(2,B,L,e,P,T,N,c,f,c))&&0===(B=x).length))return q+B+H;if(B=L.join(",")+"{"+B+"}",0!==A*O){switch(2!==A||o(B,2)||(O=0),O){case 111:B=B.replace(b,":-moz-$1")+B;break;case 112:B=B.replace(y,"::-webkit-input-$1")+B.replace(y,"::-moz-$1")+B.replace(y,":-ms-input-$1")+B}O=0}}return q+B+H}function n(e,t,n){var i=t.trim().split(m);t=i;var o=i.length,a=e.length;switch(a){case 0:case 1:var s=0;for(e=0===a?"":e[0]+" ";s<o;++s)t[s]=r(e,t[s],n).trim();break;default:var l=s=0;for(t=[];s<o;++s)for(var c=0;c<a;++c)t[l++]=r(e[c]+" ",i[s],n).trim()}return t}function r(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(g,"$1"+e.trim());case 58:return e.trim()+t.replace(g,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(g,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function i(e,t,n,r){var a=e+";",s=2*t+3*n+4*r;if(944===s){e=a.indexOf(":",9)+1;var l=a.substring(e,a.length-1).trim();return l=a.substring(0,e).trim()+l+";",1===A||2===A&&o(l,1)?"-webkit-"+l+l:l}if(0===A||2===A&&!o(a,1))return a;switch(s){case 1015:return 97===a.charCodeAt(10)?"-webkit-"+a+a:a;case 951:return 116===a.charCodeAt(3)?"-webkit-"+a+a:a;case 963:return 110===a.charCodeAt(5)?"-webkit-"+a+a:a;case 1009:if(100!==a.charCodeAt(4))break;case 969:case 942:return"-webkit-"+a+a;case 978:return"-webkit-"+a+"-moz-"+a+a;case 1019:case 983:return"-webkit-"+a+"-moz-"+a+"-ms-"+a+a;case 883:if(45===a.charCodeAt(8))return"-webkit-"+a+a;if(0<a.indexOf("image-set(",11))return a.replace(E,"$1-webkit-$2")+a;break;case 932:if(45===a.charCodeAt(4))switch(a.charCodeAt(5)){case 103:return"-webkit-box-"+a.replace("-grow","")+"-webkit-"+a+"-ms-"+a.replace("grow","positive")+a;case 115:return"-webkit-"+a+"-ms-"+a.replace("shrink","negative")+a;case 98:return"-webkit-"+a+"-ms-"+a.replace("basis","preferred-size")+a}return"-webkit-"+a+"-ms-"+a+a;case 964:return"-webkit-"+a+"-ms-flex-"+a+a;case 1023:if(99!==a.charCodeAt(8))break;return"-webkit-box-pack"+(l=a.substring(a.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+a+"-ms-flex-pack"+l+a;case 1005:return p.test(a)?a.replace(f,":-webkit-")+a.replace(f,":-moz-")+a:a;case 1e3:switch(t=(l=a.substring(13).trim()).indexOf("-")+1,l.charCodeAt(0)+l.charCodeAt(t)){case 226:l=a.replace(x,"tb");break;case 232:l=a.replace(x,"tb-rl");break;case 220:l=a.replace(x,"lr");break;default:return a}return"-webkit-"+a+"-ms-"+l+a;case 1017:if(-1===a.indexOf("sticky",9))break;case 975:switch(t=(a=e).length-10,s=(l=(33===a.charCodeAt(t)?a.substring(0,t):a).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|l.charCodeAt(7))){case 203:if(111>l.charCodeAt(8))break;case 115:a=a.replace(l,"-webkit-"+l)+";"+a;break;case 207:case 102:a=a.replace(l,"-webkit-"+(102<s?"inline-":"")+"box")+";"+a.replace(l,"-webkit-"+l)+";"+a.replace(l,"-ms-"+l+"box")+";"+a}return a+";";case 938:if(45===a.charCodeAt(5))switch(a.charCodeAt(6)){case 105:return l=a.replace("-items",""),"-webkit-"+a+"-webkit-box-"+l+"-ms-flex-"+l+a;case 115:return"-webkit-"+a+"-ms-flex-item-"+a.replace(j,"")+a;default:return"-webkit-"+a+"-ms-flex-line-pack"+a.replace("align-content","").replace(j,"")+a}break;case 973:case 989:if(45!==a.charCodeAt(3)||122===a.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(l=e.substring(e.indexOf(":")+1)).charCodeAt(0)?i(e.replace("stretch","fill-available"),t,n,r).replace(":fill-available",":stretch"):a.replace(l,"-webkit-"+l)+a.replace(l,"-moz-"+l.replace("fill-",""))+a;break;case 962:if(a="-webkit-"+a+(102===a.charCodeAt(5)?"-ms-"+a:"")+a,211===n+r&&105===a.charCodeAt(13)&&0<a.indexOf("transform",10))return a.substring(0,a.indexOf(";",27)+1).replace(h,"$1-webkit-$2")+a}return a}function o(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),_(2!==t?r:r.replace(S,"$1"),n,t)}function a(e,t){var n=i(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(k," or ($1)").substring(4):"("+t+")"}function s(e,t,n,r,i,o,a,s,l,u){for(var d,f=0,p=t;f<R;++f)switch(d=$[f].call(c,e,p,n,r,i,o,a,s,l,u)){case void 0:case!1:case!0:case null:break;default:p=d}if(p!==t)return p}function l(e){return void 0!==(e=e.prefix)&&(_=null,e?"function"!==typeof e?A=1:(A=2,_=e):A=0),l}function c(e,n){var r=e;if(33>r.charCodeAt(0)&&(r=r.trim()),r=[r],0<R){var i=s(-1,n,r,r,P,T,0,0,0,0);void 0!==i&&"string"===typeof i&&(n=i)}var o=t(z,r,n,0,0);return 0<R&&(void 0!==(i=s(-2,o,r,r,P,T,o.length,0,0,0))&&(o=i)),O=0,T=P=1,o}var u=/^\0+/g,d=/[\0\r\f]/g,f=/: */g,p=/zoo|gra/,h=/([,: ])(transform)/g,m=/,\r+?/g,g=/([\t\r\n ])*\f?&/g,v=/@(k\w+)\s*(\S*)\s*/,y=/::(place)/g,b=/:(read-only)/g,x=/[svh]\w+-[tblr]{2}/,w=/\(\s*(.*)\s*\)/g,k=/([\s\S]*?);/g,j=/-self|flex-/g,S=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,E=/([^-])(image-set\()/,T=1,P=1,O=0,A=1,z=[],$=[],R=0,_=null,I=0;return c.use=function e(t){switch(t){case void 0:case null:R=$.length=0;break;default:if("function"===typeof t)$[R++]=t;else if("object"===typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else I=0|!!t}return e},c.set=l,void 0!==e&&l(e),c};const s={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function l(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var c=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,u=l((function(e){return c.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),d=n(219),f=n.n(d);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var h=function(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n},m=function(e){return null!==e&&"object"==typeof e&&"[object Object]"===(e.toString?e.toString():Object.prototype.toString.call(e))&&!(0,r.QP)(e)},g=Object.freeze([]),v=Object.freeze({});function y(e){return"function"==typeof e}function b(e){return e.displayName||e.name||"Component"}function x(e){return e&&"string"==typeof e.styledComponentId}var w="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",k="undefined"!=typeof window&&"HTMLElement"in window,j=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&(void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:void 0!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY))),S={};function C(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):""))}var E=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)(i<<=1)<0&&C(16,""+e);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var o=r;o<i;o++)this.groupSizes[o]=0}for(var a=this.indexOfGroup(e+1),s=0,l=t.length;s<l;s++)this.tag.insertRule(a,t[s])&&(this.groupSizes[e]++,a++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,o=r;o<i;o++)t+=this.tag.getRule(o)+"/*!sc*/\n";return t},e}(),T=new Map,P=new Map,O=1,A=function(e){if(T.has(e))return T.get(e);for(;P.has(O);)O++;var t=O++;return T.set(e,t),P.set(t,e),t},z=function(e){return P.get(e)},$=function(e,t){t>=O&&(O=t+1),T.set(e,t),P.set(t,e)},R="style["+w+'][data-styled-version="5.3.11"]',_=new RegExp("^"+w+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),I=function(e,t,n){for(var r,i=n.split(","),o=0,a=i.length;o<a;o++)(r=i[o])&&e.registerName(t,r)},M=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],i=0,o=n.length;i<o;i++){var a=n[i].trim();if(a){var s=a.match(_);if(s){var l=0|parseInt(s[1],10),c=s[2];0!==l&&($(c,l),I(e,c,s[3]),e.getTag().insertRules(l,r)),r.length=0}else r.push(a)}}},L=function(){return n.nc},D=function(e){var t=document.head,n=e||t,r=document.createElement("style"),i=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(w))return r}}(n),o=void 0!==i?i.nextSibling:null;r.setAttribute(w,"active"),r.setAttribute("data-styled-version","5.3.11");var a=L();return a&&r.setAttribute("nonce",a),n.insertBefore(r,o),r},N=function(){function e(e){var t=this.element=D(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}C(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),F=function(){function e(e){var t=this.element=D(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),V=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),U=k,B={isServer:!k,useCSSOMInjection:!j},H=function(){function e(e,t,n){void 0===e&&(e=v),void 0===t&&(t={}),this.options=p({},B,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&k&&U&&(U=!1,function(e){for(var t=document.querySelectorAll(R),n=0,r=t.length;n<r;n++){var i=t[n];i&&"active"!==i.getAttribute(w)&&(M(e,i),i.parentNode&&i.parentNode.removeChild(i))}}(this))}e.registerId=function(e){return A(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(p({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,i=t.target,e=n?new V(i):r?new N(i):new F(i),new E(e)));var e,t,n,r,i},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(A(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(A(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(A(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",i=0;i<n;i++){var o=z(i);if(void 0!==o){var a=e.names.get(o),s=t.getGroup(i);if(a&&s&&a.size){var l=w+".g"+i+'[id="'+o+'"]',c="";void 0!==a&&a.forEach((function(e){e.length>0&&(c+=e+",")})),r+=""+s+l+'{content:"'+c+'"}/*!sc*/\n'}}}return r}(this)},e}(),q=/(a)(d)/gi,W=function(e){return String.fromCharCode(e+(e>25?39:97))};function Y(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=W(t%52)+n;return(W(t%52)+n).replace(q,"$1-$2")}var X=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},K=function(e){return X(5381,e)};function G(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(y(n)&&!x(n))return!1}return!0}var J=K("5.3.11"),Q=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&G(e),this.componentId=t,this.baseHash=X(J,t),this.baseStyle=n,H.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,i=[];if(this.baseStyle&&i.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))i.push(this.staticRulesId);else{var o=ge(this.rules,e,t,n).join(""),a=Y(X(this.baseHash,o)>>>0);if(!t.hasNameForId(r,a)){var s=n(o,"."+a,void 0,r);t.insertRules(r,a,s)}i.push(a),this.staticRulesId=a}else{for(var l=this.rules.length,c=X(this.baseHash,n.hash),u="",d=0;d<l;d++){var f=this.rules[d];if("string"==typeof f)u+=f;else if(f){var p=ge(f,e,t,n),h=Array.isArray(p)?p.join(""):p;c=X(c,h+d),u+=h}}if(u){var m=Y(c>>>0);if(!t.hasNameForId(r,m)){var g=n(u,"."+m,void 0,r);t.insertRules(r,m,g)}i.push(m)}}return i.join(" ")},e}(),Z=/^\s*\/\/.*$/gm,ee=[":","[",".","#"];function te(e){var t,n,r,i,o=void 0===e?v:e,s=o.options,l=void 0===s?v:s,c=o.plugins,u=void 0===c?g:c,d=new a(l),f=[],p=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,i,o,a,s,l,c,u,d){switch(n){case 1:if(0===u&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===c)return r+"/*|*/";break;case 3:switch(c){case 102:case 112:return e(i[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){f.push(e)})),h=function(e,r,o){return 0===r&&-1!==ee.indexOf(o[n.length])||o.match(i)?e:"."+t};function m(e,o,a,s){void 0===s&&(s="&");var l=e.replace(Z,""),c=o&&a?a+" "+o+" { "+l+" }":l;return t=s,n=o,r=new RegExp("\\"+n+"\\b","g"),i=new RegExp("(\\"+n+"\\b){2,}"),d(a||!o?"":o,c)}return d.use([].concat(u,[function(e,t,i){2===e&&i.length&&i[0].lastIndexOf(n)>0&&(i[0]=i[0].replace(r,h))},p,function(e){if(-2===e){var t=f;return f=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||C(15),X(e,t.name)}),5381).toString():"",m}var ne=e.createContext(),re=(ne.Consumer,e.createContext()),ie=(re.Consumer,new H),oe=te();function ae(){return(0,e.useContext)(ne)||ie}function se(){return(0,e.useContext)(re)||oe}function le(t){var n=(0,e.useState)(t.stylisPlugins),r=n[0],i=n[1],a=ae(),s=(0,e.useMemo)((function(){var e=a;return t.sheet?e=t.sheet:t.target&&(e=e.reconstructWithOptions({target:t.target},!1)),t.disableCSSOMInjection&&(e=e.reconstructWithOptions({useCSSOMInjection:!1})),e}),[t.disableCSSOMInjection,t.sheet,t.target]),l=(0,e.useMemo)((function(){return te({options:{prefix:!t.disableVendorPrefixes},plugins:r})}),[t.disableVendorPrefixes,r]);return(0,e.useEffect)((function(){o()(r,t.stylisPlugins)||i(t.stylisPlugins)}),[t.stylisPlugins]),e.createElement(ne.Provider,{value:s},e.createElement(re.Provider,{value:l},t.children))}var ce=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=oe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return C(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=oe),this.name+e.hash},e}(),ue=/([A-Z])/,de=/([A-Z])/g,fe=/^ms-/,pe=function(e){return"-"+e.toLowerCase()};function he(e){return ue.test(e)?e.replace(de,pe).replace(fe,"-ms-"):e}var me=function(e){return null==e||!1===e||""===e};function ge(e,t,n,r){if(Array.isArray(e)){for(var i,o=[],a=0,l=e.length;a<l;a+=1)""!==(i=ge(e[a],t,n,r))&&(Array.isArray(i)?o.push.apply(o,i):o.push(i));return o}return me(e)?"":x(e)?"."+e.styledComponentId:y(e)?"function"!=typeof(c=e)||c.prototype&&c.prototype.isReactComponent||!t?e:ge(e(t),t,n,r):e instanceof ce?n?(e.inject(n,r),e.getName(r)):e:m(e)?function e(t,n){var r,i,o=[];for(var a in t)t.hasOwnProperty(a)&&!me(t[a])&&(Array.isArray(t[a])&&t[a].isCss||y(t[a])?o.push(he(a)+":",t[a],";"):m(t[a])?o.push.apply(o,e(t[a],a)):o.push(he(a)+": "+(r=a,(null==(i=t[a])||"boolean"==typeof i||""===i?"":"number"!=typeof i||0===i||r in s||r.startsWith("--")?String(i).trim():i+"px")+";")));return n?[n+" {"].concat(o,["}"]):o}(e):e.toString();var c}var ve=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function ye(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return y(e)||m(e)?ve(ge(h(g,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:ve(ge(h(e,n)))}new Set;var be=function(e,t,n){return void 0===n&&(n=v),e.theme!==n.theme&&e.theme||t||n.theme},xe=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,we=/(^-|-$)/g;function ke(e){return e.replace(xe,"-").replace(we,"")}var je=function(e){return Y(K(e)>>>0)};function Se(e){return"string"==typeof e&&!0}var Ce=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ee=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Te(e,t,n){var r=e[n];Ce(t)&&Ce(r)?Pe(r,t):e[n]=t}function Pe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var i=0,o=n;i<o.length;i++){var a=o[i];if(Ce(a))for(var s in a)Ee(s)&&Te(e,a[s],s)}return e}var Oe=e.createContext();Oe.Consumer;var Ae={};function ze(t,n,r){var i=x(t),o=!Se(t),a=n.attrs,s=void 0===a?g:a,l=n.componentId,c=void 0===l?function(e,t){var n="string"!=typeof e?"sc":ke(e);Ae[n]=(Ae[n]||0)+1;var r=n+"-"+je("5.3.11"+n+Ae[n]);return t?t+"-"+r:r}(n.displayName,n.parentComponentId):l,d=n.displayName,h=void 0===d?function(e){return Se(e)?"styled."+e:"Styled("+b(e)+")"}(t):d,m=n.displayName&&n.componentId?ke(n.displayName)+"-"+n.componentId:n.componentId||c,w=i&&t.attrs?Array.prototype.concat(t.attrs,s).filter(Boolean):s,k=n.shouldForwardProp;i&&t.shouldForwardProp&&(k=n.shouldForwardProp?function(e,r,i){return t.shouldForwardProp(e,r,i)&&n.shouldForwardProp(e,r,i)}:t.shouldForwardProp);var j,S=new Q(r,m,i?t.componentStyle:void 0),C=S.isStatic&&0===s.length,E=function(t,n){return function(t,n,r,i){var o=t.attrs,a=t.componentStyle,s=t.defaultProps,l=t.foldedComponentIds,c=t.shouldForwardProp,d=t.styledComponentId,f=t.target,h=function(e,t,n){void 0===e&&(e=v);var r=p({},t,{theme:e}),i={};return n.forEach((function(e){var t,n,o,a=e;for(t in y(a)&&(a=a(r)),a)r[t]=i[t]="className"===t?(n=i[t],o=a[t],n&&o?n+" "+o:n||o):a[t]})),[r,i]}(be(n,(0,e.useContext)(Oe),s)||v,n,o),m=h[0],g=h[1],b=function(e,t,n){var r=ae(),i=se();return t?e.generateAndInjectStyles(v,r,i):e.generateAndInjectStyles(n,r,i)}(a,i,m),x=r,w=g.$as||n.$as||g.as||n.as||f,k=Se(w),j=g!==n?p({},n,{},g):n,S={};for(var C in j)"$"!==C[0]&&"as"!==C&&("forwardedAs"===C?S.as=j[C]:(c?c(C,u,w):!k||u(C))&&(S[C]=j[C]));return n.style&&g.style!==n.style&&(S.style=p({},n.style,{},g.style)),S.className=Array.prototype.concat(l,d,b!==d?b:null,n.className,g.className).filter(Boolean).join(" "),S.ref=x,(0,e.createElement)(w,S)}(j,t,n,C)};return E.displayName=h,(j=e.forwardRef(E)).attrs=w,j.componentStyle=S,j.displayName=h,j.shouldForwardProp=k,j.foldedComponentIds=i?Array.prototype.concat(t.foldedComponentIds,t.styledComponentId):g,j.styledComponentId=m,j.target=i?t.target:t,j.withComponent=function(e){var t=n.componentId,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(n,["componentId"]),o=t&&t+"-"+(Se(e)?e:ke(b(e)));return ze(e,p({},i,{attrs:w,componentId:o}),r)},Object.defineProperty(j,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?Pe({},t.defaultProps,e):e}}),Object.defineProperty(j,"toString",{value:function(){return"."+j.styledComponentId}}),o&&f()(j,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),j}var $e=function(e){return function e(t,n,i){if(void 0===i&&(i=v),!(0,r.Hy)(n))return C(1,String(n));var o=function(){return t(n,i,ye.apply(void 0,arguments))};return o.withConfig=function(r){return e(t,n,p({},i,{},r))},o.attrs=function(r){return e(t,n,p({},i,{attrs:Array.prototype.concat(i.attrs,r).filter(Boolean)}))},o}(ze,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){$e[e]=$e(e)}));var Re=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=G(e),H.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(e,t,n,r){var i=r(ge(this.rules,t,n,r).join(""),""),o=this.componentId+e;n.insertRules(o,o,i)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&H.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function _e(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=ye.apply(void 0,[e].concat(n)).join(""),o=je(i);return new ce(o,i)}!function(){function t(){var t=this;this._emitSheetCSS=function(){var e=t.instance.toString();if(!e)return"";var n=L();return"<style "+[n&&'nonce="'+n+'"',w+'="true"','data-styled-version="5.3.11"'].filter(Boolean).join(" ")+">"+e+"</style>"},this.getStyleTags=function(){return t.sealed?C(2):t._emitSheetCSS()},this.getStyleElement=function(){var n;if(t.sealed)return C(2);var r=((n={})[w]="",n["data-styled-version"]="5.3.11",n.dangerouslySetInnerHTML={__html:t.instance.toString()},n),i=L();return i&&(r.nonce=i),[e.createElement("style",p({},r,{key:"sc-0-0"}))]},this.seal=function(){t.sealed=!0},this.instance=new H({isServer:!0}),this.sealed=!1}var n=t.prototype;n.collectStyles=function(t){return this.sealed?C(2):e.createElement(le,{sheet:this.instance},t)},n.interleaveWithNodeStream=function(e){return C(3)}}();const Ie=$e;function Me(){return Me=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Me.apply(null,arguments)}function Le(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}function De(e,t){if(null==e)return{};var n,r,i=Le(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],-1===t.indexOf(n)&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Ne(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Ne(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}const Fe=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=Ne(e))&&(r&&(r+=" "),r+=t);return r};var Ve="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};const Ue="object"===("undefined"===typeof window?"undefined":Ve(window))&&"object"===("undefined"===typeof document?"undefined":Ve(document))&&9===document.nodeType;function Be(e){return Be="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Be(e)}function He(e){var t=function(e,t){if("object"!=Be(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=Be(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==Be(t)?t:t+""}function qe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,He(r.key),r)}}function We(e,t,n){return t&&qe(e.prototype,t),n&&qe(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function Ye(e,t){return Ye=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Ye(e,t)}function Xe(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ye(e,t)}function Ke(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var Ge={}.constructor;function Je(e){if(null==e||"object"!==typeof e)return e;if(Array.isArray(e))return e.map(Je);if(e.constructor!==Ge)return e;var t={};for(var n in e)t[n]=Je(e[n]);return t}function Qe(e,t,n){void 0===e&&(e="unnamed");var r=n.jss,i=Je(t),o=r.plugins.onCreateRule(e,i,n);return o||(e[0],null)}var Ze=function(e,t){for(var n="",r=0;r<e.length&&"!important"!==e[r];r++)n&&(n+=t),n+=e[r];return n},et=function(e){if(!Array.isArray(e))return e;var t="";if(Array.isArray(e[0]))for(var n=0;n<e.length&&"!important"!==e[n];n++)t&&(t+=", "),t+=Ze(e[n]," ");else t=Ze(e,", ");return"!important"===e[e.length-1]&&(t+=" !important"),t};function tt(e){return e&&!1===e.format?{linebreak:"",space:""}:{linebreak:"\n",space:" "}}function nt(e,t){for(var n="",r=0;r<t;r++)n+="  ";return n+e}function rt(e,t,n){void 0===n&&(n={});var r="";if(!t)return r;var i=n.indent,o=void 0===i?0:i,a=t.fallbacks;!1===n.format&&(o=-1/0);var s=tt(n),l=s.linebreak,c=s.space;if(e&&o++,a)if(Array.isArray(a))for(var u=0;u<a.length;u++){var d=a[u];for(var f in d){var p=d[f];null!=p&&(r&&(r+=l),r+=nt(f+":"+c+et(p)+";",o))}}else for(var h in a){var m=a[h];null!=m&&(r&&(r+=l),r+=nt(h+":"+c+et(m)+";",o))}for(var g in t){var v=t[g];null!=v&&"fallbacks"!==g&&(r&&(r+=l),r+=nt(g+":"+c+et(v)+";",o))}return(r||n.allowEmpty)&&e?(r&&(r=""+l+r+l),nt(""+e+c+"{"+r,--o)+nt("}",o)):r}var it=/([[\].#*$><+~=|^:(),"'`\s])/g,ot="undefined"!==typeof CSS&&CSS.escape,at=function(e){return ot?ot(e):e.replace(it,"\\$1")},st=function(){function e(e,t,n){this.type="style",this.isProcessed=!1;var r=n.sheet,i=n.Renderer;this.key=e,this.options=n,this.style=t,r?this.renderer=r.renderer:i&&(this.renderer=new i)}return e.prototype.prop=function(e,t,n){if(void 0===t)return this.style[e];var r=!!n&&n.force;if(!r&&this.style[e]===t)return this;var i=t;n&&!1===n.process||(i=this.options.jss.plugins.onChangeValue(t,e,this));var o=null==i||!1===i,a=e in this.style;if(o&&!a&&!r)return this;var s=o&&a;if(s?delete this.style[e]:this.style[e]=i,this.renderable&&this.renderer)return s?this.renderer.removeProperty(this.renderable,e):this.renderer.setProperty(this.renderable,e,i),this;var l=this.options.sheet;return l&&l.attached,this},e}(),lt=function(e){function t(t,n,r){var i;i=e.call(this,t,n,r)||this;var o=r.selector,a=r.scoped,s=r.sheet,l=r.generateId;return o?i.selectorText=o:!1!==a&&(i.id=l(Ke(Ke(i)),s),i.selectorText="."+at(i.id)),i}Xe(t,e);var n=t.prototype;return n.applyTo=function(e){var t=this.renderer;if(t){var n=this.toJSON();for(var r in n)t.setProperty(e,r,n[r])}return this},n.toJSON=function(){var e={};for(var t in this.style){var n=this.style[t];"object"!==typeof n?e[t]=n:Array.isArray(n)&&(e[t]=et(n))}return e},n.toString=function(e){var t=this.options.sheet,n=!!t&&t.options.link?Me({},e,{allowEmpty:!0}):e;return rt(this.selectorText,this.style,n)},We(t,[{key:"selector",set:function(e){if(e!==this.selectorText){this.selectorText=e;var t=this.renderer,n=this.renderable;if(n&&t)t.setSelector(n,e)||t.replaceRule(n,this)}},get:function(){return this.selectorText}}]),t}(st),ct={onCreateRule:function(e,t,n){return"@"===e[0]||n.parent&&"keyframes"===n.parent.type?null:new lt(e,t,n)}},ut={indent:1,children:!0},dt=/@([\w-]+)/,ft=function(){function e(e,t,n){this.type="conditional",this.isProcessed=!1,this.key=e;var r=e.match(dt);for(var i in this.at=r?r[1]:"unknown",this.query=n.name||"@"+this.at,this.options=n,this.rules=new Mt(Me({},n,{parent:this})),t)this.rules.add(i,t[i]);this.rules.process()}var t=e.prototype;return t.getRule=function(e){return this.rules.get(e)},t.indexOf=function(e){return this.rules.indexOf(e)},t.addRule=function(e,t,n){var r=this.rules.add(e,t,n);return r?(this.options.jss.plugins.onProcessRule(r),r):null},t.replaceRule=function(e,t,n){var r=this.rules.replace(e,t,n);return r&&this.options.jss.plugins.onProcessRule(r),r},t.toString=function(e){void 0===e&&(e=ut);var t=tt(e).linebreak;if(null==e.indent&&(e.indent=ut.indent),null==e.children&&(e.children=ut.children),!1===e.children)return this.query+" {}";var n=this.rules.toString(e);return n?this.query+" {"+t+n+t+"}":""},e}(),pt=/@container|@media|@supports\s+/,ht={onCreateRule:function(e,t,n){return pt.test(e)?new ft(e,t,n):null}},mt={indent:1,children:!0},gt=/@keyframes\s+([\w-]+)/,vt=function(){function e(e,t,n){this.type="keyframes",this.at="@keyframes",this.isProcessed=!1;var r=e.match(gt);r&&r[1]?this.name=r[1]:this.name="noname",this.key=this.type+"-"+this.name,this.options=n;var i=n.scoped,o=n.sheet,a=n.generateId;for(var s in this.id=!1===i?this.name:at(a(this,o)),this.rules=new Mt(Me({},n,{parent:this})),t)this.rules.add(s,t[s],Me({},n,{parent:this}));this.rules.process()}return e.prototype.toString=function(e){void 0===e&&(e=mt);var t=tt(e).linebreak;if(null==e.indent&&(e.indent=mt.indent),null==e.children&&(e.children=mt.children),!1===e.children)return this.at+" "+this.id+" {}";var n=this.rules.toString(e);return n&&(n=""+t+n+t),this.at+" "+this.id+" {"+n+"}"},e}(),yt=/@keyframes\s+/,bt=/\$([\w-]+)/g,xt=function(e,t){return"string"===typeof e?e.replace(bt,(function(e,n){return n in t?t[n]:e})):e},wt=function(e,t,n){var r=e[t],i=xt(r,n);i!==r&&(e[t]=i)},kt={onCreateRule:function(e,t,n){return"string"===typeof e&&yt.test(e)?new vt(e,t,n):null},onProcessStyle:function(e,t,n){return"style"===t.type&&n?("animation-name"in e&&wt(e,"animation-name",n.keyframes),"animation"in e&&wt(e,"animation",n.keyframes),e):e},onChangeValue:function(e,t,n){var r=n.options.sheet;if(!r)return e;switch(t){case"animation":case"animation-name":return xt(e,r.keyframes);default:return e}}},jt=function(e){function t(){return e.apply(this,arguments)||this}return Xe(t,e),t.prototype.toString=function(e){var t=this.options.sheet,n=!!t&&t.options.link?Me({},e,{allowEmpty:!0}):e;return rt(this.key,this.style,n)},t}(st),St={onCreateRule:function(e,t,n){return n.parent&&"keyframes"===n.parent.type?new jt(e,t,n):null}},Ct=function(){function e(e,t,n){this.type="font-face",this.at="@font-face",this.isProcessed=!1,this.key=e,this.style=t,this.options=n}return e.prototype.toString=function(e){var t=tt(e).linebreak;if(Array.isArray(this.style)){for(var n="",r=0;r<this.style.length;r++)n+=rt(this.at,this.style[r]),this.style[r+1]&&(n+=t);return n}return rt(this.at,this.style,e)},e}(),Et=/@font-face/,Tt={onCreateRule:function(e,t,n){return Et.test(e)?new Ct(e,t,n):null}},Pt=function(){function e(e,t,n){this.type="viewport",this.at="@viewport",this.isProcessed=!1,this.key=e,this.style=t,this.options=n}return e.prototype.toString=function(e){return rt(this.key,this.style,e)},e}(),Ot={onCreateRule:function(e,t,n){return"@viewport"===e||"@-ms-viewport"===e?new Pt(e,t,n):null}},At=function(){function e(e,t,n){this.type="simple",this.isProcessed=!1,this.key=e,this.value=t,this.options=n}return e.prototype.toString=function(e){if(Array.isArray(this.value)){for(var t="",n=0;n<this.value.length;n++)t+=this.key+" "+this.value[n]+";",this.value[n+1]&&(t+="\n");return t}return this.key+" "+this.value+";"},e}(),zt={"@charset":!0,"@import":!0,"@namespace":!0},$t={onCreateRule:function(e,t,n){return e in zt?new At(e,t,n):null}},Rt=[ct,ht,kt,St,Tt,Ot,$t],_t={process:!0},It={force:!0,process:!0},Mt=function(){function e(e){this.map={},this.raw={},this.index=[],this.counter=0,this.options=e,this.classes=e.classes,this.keyframes=e.keyframes}var t=e.prototype;return t.add=function(e,t,n){var r=this.options,i=r.parent,o=r.sheet,a=r.jss,s=r.Renderer,l=r.generateId,c=r.scoped,u=Me({classes:this.classes,parent:i,sheet:o,jss:a,Renderer:s,generateId:l,scoped:c,name:e,keyframes:this.keyframes,selector:void 0},n),d=e;e in this.raw&&(d=e+"-d"+this.counter++),this.raw[d]=t,d in this.classes&&(u.selector="."+at(this.classes[d]));var f=Qe(d,t,u);if(!f)return null;this.register(f);var p=void 0===u.index?this.index.length:u.index;return this.index.splice(p,0,f),f},t.replace=function(e,t,n){var r=this.get(e),i=this.index.indexOf(r);r&&this.remove(r);var o=n;return-1!==i&&(o=Me({},n,{index:i})),this.add(e,t,o)},t.get=function(e){return this.map[e]},t.remove=function(e){this.unregister(e),delete this.raw[e.key],this.index.splice(this.index.indexOf(e),1)},t.indexOf=function(e){return this.index.indexOf(e)},t.process=function(){var e=this.options.jss.plugins;this.index.slice(0).forEach(e.onProcessRule,e)},t.register=function(e){this.map[e.key]=e,e instanceof lt?(this.map[e.selector]=e,e.id&&(this.classes[e.key]=e.id)):e instanceof vt&&this.keyframes&&(this.keyframes[e.name]=e.id)},t.unregister=function(e){delete this.map[e.key],e instanceof lt?(delete this.map[e.selector],delete this.classes[e.key]):e instanceof vt&&delete this.keyframes[e.name]},t.update=function(){var e,t,n;if("string"===typeof(arguments.length<=0?void 0:arguments[0])?(e=arguments.length<=0?void 0:arguments[0],t=arguments.length<=1?void 0:arguments[1],n=arguments.length<=2?void 0:arguments[2]):(t=arguments.length<=0?void 0:arguments[0],n=arguments.length<=1?void 0:arguments[1],e=null),e)this.updateOne(this.get(e),t,n);else for(var r=0;r<this.index.length;r++)this.updateOne(this.index[r],t,n)},t.updateOne=function(t,n,r){void 0===r&&(r=_t);var i=this.options,o=i.jss.plugins,a=i.sheet;if(t.rules instanceof e)t.rules.update(n,r);else{var s=t.style;if(o.onUpdate(n,t,a,r),r.process&&s&&s!==t.style){for(var l in o.onProcessStyle(t.style,t,a),t.style){var c=t.style[l];c!==s[l]&&t.prop(l,c,It)}for(var u in s){var d=t.style[u],f=s[u];null==d&&d!==f&&t.prop(u,null,It)}}}},t.toString=function(e){for(var t="",n=this.options.sheet,r=!!n&&n.options.link,i=tt(e).linebreak,o=0;o<this.index.length;o++){var a=this.index[o].toString(e);(a||r)&&(t&&(t+=i),t+=a)}return t},e}(),Lt=function(){function e(e,t){for(var n in this.attached=!1,this.deployed=!1,this.classes={},this.keyframes={},this.options=Me({},t,{sheet:this,parent:this,classes:this.classes,keyframes:this.keyframes}),t.Renderer&&(this.renderer=new t.Renderer(this)),this.rules=new Mt(this.options),e)this.rules.add(n,e[n]);this.rules.process()}var t=e.prototype;return t.attach=function(){return this.attached||(this.renderer&&this.renderer.attach(),this.attached=!0,this.deployed||this.deploy()),this},t.detach=function(){return this.attached?(this.renderer&&this.renderer.detach(),this.attached=!1,this):this},t.addRule=function(e,t,n){var r=this.queue;this.attached&&!r&&(this.queue=[]);var i=this.rules.add(e,t,n);return i?(this.options.jss.plugins.onProcessRule(i),this.attached?this.deployed?(r?r.push(i):(this.insertRule(i),this.queue&&(this.queue.forEach(this.insertRule,this),this.queue=void 0)),i):i:(this.deployed=!1,i)):null},t.replaceRule=function(e,t,n){var r=this.rules.get(e);if(!r)return this.addRule(e,t,n);var i=this.rules.replace(e,t,n);return i&&this.options.jss.plugins.onProcessRule(i),this.attached?this.deployed?(this.renderer&&(i?r.renderable&&this.renderer.replaceRule(r.renderable,i):this.renderer.deleteRule(r)),i):i:(this.deployed=!1,i)},t.insertRule=function(e){this.renderer&&this.renderer.insertRule(e)},t.addRules=function(e,t){var n=[];for(var r in e){var i=this.addRule(r,e[r],t);i&&n.push(i)}return n},t.getRule=function(e){return this.rules.get(e)},t.deleteRule=function(e){var t="object"===typeof e?e:this.rules.get(e);return!(!t||this.attached&&!t.renderable)&&(this.rules.remove(t),!(this.attached&&t.renderable&&this.renderer)||this.renderer.deleteRule(t.renderable))},t.indexOf=function(e){return this.rules.indexOf(e)},t.deploy=function(){return this.renderer&&this.renderer.deploy(),this.deployed=!0,this},t.update=function(){var e;return(e=this.rules).update.apply(e,arguments),this},t.updateOne=function(e,t,n){return this.rules.updateOne(e,t,n),this},t.toString=function(e){return this.rules.toString(e)},e}(),Dt=function(){function e(){this.plugins={internal:[],external:[]},this.registry={}}var t=e.prototype;return t.onCreateRule=function(e,t,n){for(var r=0;r<this.registry.onCreateRule.length;r++){var i=this.registry.onCreateRule[r](e,t,n);if(i)return i}return null},t.onProcessRule=function(e){if(!e.isProcessed){for(var t=e.options.sheet,n=0;n<this.registry.onProcessRule.length;n++)this.registry.onProcessRule[n](e,t);e.style&&this.onProcessStyle(e.style,e,t),e.isProcessed=!0}},t.onProcessStyle=function(e,t,n){for(var r=0;r<this.registry.onProcessStyle.length;r++)t.style=this.registry.onProcessStyle[r](t.style,t,n)},t.onProcessSheet=function(e){for(var t=0;t<this.registry.onProcessSheet.length;t++)this.registry.onProcessSheet[t](e)},t.onUpdate=function(e,t,n,r){for(var i=0;i<this.registry.onUpdate.length;i++)this.registry.onUpdate[i](e,t,n,r)},t.onChangeValue=function(e,t,n){for(var r=e,i=0;i<this.registry.onChangeValue.length;i++)r=this.registry.onChangeValue[i](r,t,n);return r},t.use=function(e,t){void 0===t&&(t={queue:"external"});var n=this.plugins[t.queue];-1===n.indexOf(e)&&(n.push(e),this.registry=[].concat(this.plugins.external,this.plugins.internal).reduce((function(e,t){for(var n in t)n in e&&e[n].push(t[n]);return e}),{onCreateRule:[],onProcessRule:[],onProcessStyle:[],onProcessSheet:[],onChangeValue:[],onUpdate:[]}))},e}(),Nt=function(){function e(){this.registry=[]}var t=e.prototype;return t.add=function(e){var t=this.registry,n=e.options.index;if(-1===t.indexOf(e))if(0===t.length||n>=this.index)t.push(e);else for(var r=0;r<t.length;r++)if(t[r].options.index>n)return void t.splice(r,0,e)},t.reset=function(){this.registry=[]},t.remove=function(e){var t=this.registry.indexOf(e);this.registry.splice(t,1)},t.toString=function(e){for(var t=void 0===e?{}:e,n=t.attached,r=Le(t,["attached"]),i=tt(r).linebreak,o="",a=0;a<this.registry.length;a++){var s=this.registry[a];null!=n&&s.attached!==n||(o&&(o+=i),o+=s.toString(r))}return o},We(e,[{key:"index",get:function(){return 0===this.registry.length?0:this.registry[this.registry.length-1].options.index}}]),e}(),Ft=new Nt,Vt="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window&&window.Math===Math?window:"undefined"!==typeof self&&self.Math===Math?self:Function("return this")(),Ut="2f1acc6c3a606b082e5eef5e54414ffb";null==Vt[Ut]&&(Vt[Ut]=0);var Bt=Vt[Ut]++,Ht=function(e){void 0===e&&(e={});var t=0;return function(n,r){t+=1;var i="",o="";return r&&(r.options.classNamePrefix&&(o=r.options.classNamePrefix),null!=r.options.jss.id&&(i=String(r.options.jss.id))),e.minify?""+(o||"c")+Bt+i+t:o+n.key+"-"+Bt+(i?"-"+i:"")+"-"+t}},qt=function(e){var t;return function(){return t||(t=e()),t}},Wt=function(e,t){try{return e.attributeStyleMap?e.attributeStyleMap.get(t):e.style.getPropertyValue(t)}catch(n){return""}},Yt=function(e,t,n){try{var r=n;if(Array.isArray(n)&&(r=et(n)),e.attributeStyleMap)e.attributeStyleMap.set(t,r);else{var i=r?r.indexOf("!important"):-1,o=i>-1?r.substr(0,i-1):r;e.style.setProperty(t,o,i>-1?"important":"")}}catch(a){return!1}return!0},Xt=function(e,t){try{e.attributeStyleMap?e.attributeStyleMap.delete(t):e.style.removeProperty(t)}catch(n){}},Kt=function(e,t){return e.selectorText=t,e.selectorText===t},Gt=qt((function(){return document.querySelector("head")}));function Jt(e){var t=Ft.registry;if(t.length>0){var n=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.attached&&r.options.index>t.index&&r.options.insertionPoint===t.insertionPoint)return r}return null}(t,e);if(n&&n.renderer)return{parent:n.renderer.element.parentNode,node:n.renderer.element};if(n=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.attached&&r.options.insertionPoint===t.insertionPoint)return r}return null}(t,e),n&&n.renderer)return{parent:n.renderer.element.parentNode,node:n.renderer.element.nextSibling}}var r=e.insertionPoint;if(r&&"string"===typeof r){var i=function(e){for(var t=Gt(),n=0;n<t.childNodes.length;n++){var r=t.childNodes[n];if(8===r.nodeType&&r.nodeValue.trim()===e)return r}return null}(r);if(i)return{parent:i.parentNode,node:i.nextSibling}}return!1}var Qt=qt((function(){var e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null})),Zt=function(e,t,n){try{"insertRule"in e?e.insertRule(t,n):"appendRule"in e&&e.appendRule(t)}catch(r){return!1}return e.cssRules[n]},en=function(e,t){var n=e.cssRules.length;return void 0===t||t>n?n:t},tn=function(){function e(e){this.getPropertyValue=Wt,this.setProperty=Yt,this.removeProperty=Xt,this.setSelector=Kt,this.hasInsertedRules=!1,this.cssRules=[],e&&Ft.add(e),this.sheet=e;var t=this.sheet?this.sheet.options:{},n=t.media,r=t.meta,i=t.element;this.element=i||function(){var e=document.createElement("style");return e.textContent="\n",e}(),this.element.setAttribute("data-jss",""),n&&this.element.setAttribute("media",n),r&&this.element.setAttribute("data-meta",r);var o=Qt();o&&this.element.setAttribute("nonce",o)}var t=e.prototype;return t.attach=function(){if(!this.element.parentNode&&this.sheet){!function(e,t){var n=t.insertionPoint,r=Jt(t);if(!1!==r&&r.parent)r.parent.insertBefore(e,r.node);else if(n&&"number"===typeof n.nodeType){var i=n,o=i.parentNode;o&&o.insertBefore(e,i.nextSibling)}else Gt().appendChild(e)}(this.element,this.sheet.options);var e=Boolean(this.sheet&&this.sheet.deployed);this.hasInsertedRules&&e&&(this.hasInsertedRules=!1,this.deploy())}},t.detach=function(){if(this.sheet){var e=this.element.parentNode;e&&e.removeChild(this.element),this.sheet.options.link&&(this.cssRules=[],this.element.textContent="\n")}},t.deploy=function(){var e=this.sheet;e&&(e.options.link?this.insertRules(e.rules):this.element.textContent="\n"+e.toString()+"\n")},t.insertRules=function(e,t){for(var n=0;n<e.index.length;n++)this.insertRule(e.index[n],n,t)},t.insertRule=function(e,t,n){if(void 0===n&&(n=this.element.sheet),e.rules){var r=e,i=n;if("conditional"===e.type||"keyframes"===e.type){var o=en(n,t);if(!1===(i=Zt(n,r.toString({children:!1}),o)))return!1;this.refCssRule(e,o,i)}return this.insertRules(r.rules,i),i}var a=e.toString();if(!a)return!1;var s=en(n,t),l=Zt(n,a,s);return!1!==l&&(this.hasInsertedRules=!0,this.refCssRule(e,s,l),l)},t.refCssRule=function(e,t,n){e.renderable=n,e.options.parent instanceof Lt&&this.cssRules.splice(t,0,n)},t.deleteRule=function(e){var t=this.element.sheet,n=this.indexOf(e);return-1!==n&&(t.deleteRule(n),this.cssRules.splice(n,1),!0)},t.indexOf=function(e){return this.cssRules.indexOf(e)},t.replaceRule=function(e,t){var n=this.indexOf(e);return-1!==n&&(this.element.sheet.deleteRule(n),this.cssRules.splice(n,1),this.insertRule(t,n))},t.getRules=function(){return this.element.sheet.cssRules},e}(),nn=0,rn=function(){function e(e){this.id=nn++,this.version="10.10.0",this.plugins=new Dt,this.options={id:{minify:!1},createGenerateId:Ht,Renderer:Ue?tn:null,plugins:[]},this.generateId=Ht({minify:!1});for(var t=0;t<Rt.length;t++)this.plugins.use(Rt[t],{queue:"internal"});this.setup(e)}var t=e.prototype;return t.setup=function(e){return void 0===e&&(e={}),e.createGenerateId&&(this.options.createGenerateId=e.createGenerateId),e.id&&(this.options.id=Me({},this.options.id,e.id)),(e.createGenerateId||e.id)&&(this.generateId=this.options.createGenerateId(this.options.id)),null!=e.insertionPoint&&(this.options.insertionPoint=e.insertionPoint),"Renderer"in e&&(this.options.Renderer=e.Renderer),e.plugins&&this.use.apply(this,e.plugins),this},t.createStyleSheet=function(e,t){void 0===t&&(t={});var n=t.index;"number"!==typeof n&&(n=0===Ft.index?0:Ft.index+1);var r=new Lt(e,Me({},t,{jss:this,generateId:t.generateId||this.generateId,insertionPoint:this.options.insertionPoint,Renderer:this.options.Renderer,index:n}));return this.plugins.onProcessSheet(r),r},t.removeStyleSheet=function(e){return e.detach(),Ft.remove(e),this},t.createRule=function(e,t,n){if(void 0===t&&(t={}),void 0===n&&(n={}),"object"===typeof e)return this.createRule(void 0,e,t);var r=Me({},n,{name:e,jss:this,Renderer:this.options.Renderer});r.generateId||(r.generateId=this.generateId),r.classes||(r.classes={}),r.keyframes||(r.keyframes={});var i=Qe(e,t,r);return i&&this.plugins.onProcessRule(i),i},t.use=function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach((function(t){e.plugins.use(t)})),this},e}(),on=function(e){return new rn(e)},an="object"===typeof CSS&&null!=CSS&&"number"in CSS;function sn(e){var t=null;for(var n in e){var r=e[n],i=typeof r;if("function"===i)t||(t={}),t[n]=r;else if("object"===i&&null!==r&&!Array.isArray(r)){var o=sn(r);o&&(t||(t={}),t[n]=o)}}return t}on();function ln(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.baseClasses,n=e.newClasses;e.Component;if(!n)return t;var r=Me({},t);return Object.keys(n).forEach((function(e){n[e]&&(r[e]="".concat(t[e]," ").concat(n[e]))})),r}var cn={set:function(e,t,n,r){var i=e.get(t);i||(i=new Map,e.set(t,i)),i.set(n,r)},get:function(e,t,n){var r=e.get(t);return r?r.get(n):void 0},delete:function(e,t,n){e.get(t).delete(n)}};const un=cn;const dn=e.createContext(null);function fn(){return e.useContext(dn)}const pn="function"===typeof Symbol&&Symbol.for?Symbol.for("mui.nested"):"__THEME_NESTED__";var hn=["checked","disabled","error","focused","focusVisible","required","expanded","selected"];var mn=Date.now(),gn="fnValues"+mn,vn="fnStyle"+ ++mn;const yn=function(){return{onCreateRule:function(e,t,n){if("function"!==typeof t)return null;var r=Qe(e,{},n);return r[vn]=t,r},onProcessStyle:function(e,t){if(gn in t||vn in t)return e;var n={};for(var r in e){var i=e[r];"function"===typeof i&&(delete e[r],n[r]=i)}return t[gn]=n,e},onUpdate:function(e,t,n,r){var i=t,o=i[vn];o&&(i.style=o(e)||{});var a=i[gn];if(a)for(var s in a)i.prop(s,a[s](e),r)}}};var bn="@global",xn="@global ",wn=function(){function e(e,t,n){for(var r in this.type="global",this.at=bn,this.isProcessed=!1,this.key=e,this.options=n,this.rules=new Mt(Me({},n,{parent:this})),t)this.rules.add(r,t[r]);this.rules.process()}var t=e.prototype;return t.getRule=function(e){return this.rules.get(e)},t.addRule=function(e,t,n){var r=this.rules.add(e,t,n);return r&&this.options.jss.plugins.onProcessRule(r),r},t.replaceRule=function(e,t,n){var r=this.rules.replace(e,t,n);return r&&this.options.jss.plugins.onProcessRule(r),r},t.indexOf=function(e){return this.rules.indexOf(e)},t.toString=function(e){return this.rules.toString(e)},e}(),kn=function(){function e(e,t,n){this.type="global",this.at=bn,this.isProcessed=!1,this.key=e,this.options=n;var r=e.substr(8);this.rule=n.jss.createRule(r,t,Me({},n,{parent:this}))}return e.prototype.toString=function(e){return this.rule?this.rule.toString(e):""},e}(),jn=/\s*,\s*/g;function Sn(e,t){for(var n=e.split(jn),r="",i=0;i<n.length;i++)r+=t+" "+n[i].trim(),n[i+1]&&(r+=", ");return r}const Cn=function(){return{onCreateRule:function(e,t,n){if(!e)return null;if(e===bn)return new wn(e,t,n);if("@"===e[0]&&e.substr(0,8)===xn)return new kn(e,t,n);var r=n.parent;return r&&("global"===r.type||r.options.parent&&"global"===r.options.parent.type)&&(n.scoped=!1),n.selector||!1!==n.scoped||(n.selector=e),null},onProcessRule:function(e,t){"style"===e.type&&t&&(function(e,t){var n=e.options,r=e.style,i=r?r[bn]:null;if(i){for(var o in i)t.addRule(o,i[o],Me({},n,{selector:Sn(o,e.selector)}));delete r[bn]}}(e,t),function(e,t){var n=e.options,r=e.style;for(var i in r)if("@"===i[0]&&i.substr(0,7)===bn){var o=Sn(i.substr(7),e.selector);t.addRule(o,r[i],Me({},n,{selector:o})),delete r[i]}}(e,t))}}};var En=/\s*,\s*/g,Tn=/&/g,Pn=/\$([\w-]+)/g;const On=function(){function e(e,t){return function(n,r){var i=e.getRule(r)||t&&t.getRule(r);return i?i.selector:r}}function t(e,t){for(var n=t.split(En),r=e.split(En),i="",o=0;o<n.length;o++)for(var a=n[o],s=0;s<r.length;s++){var l=r[s];i&&(i+=", "),i+=-1!==l.indexOf("&")?l.replace(Tn,a):a+" "+l}return i}function n(e,t,n){if(n)return Me({},n,{index:n.index+1});var r=e.options.nestingLevel;r=void 0===r?1:r+1;var i=Me({},e.options,{nestingLevel:r,index:t.indexOf(e)+1});return delete i.name,i}return{onProcessStyle:function(r,i,o){if("style"!==i.type)return r;var a,s,l=i,c=l.options.parent;for(var u in r){var d=-1!==u.indexOf("&"),f="@"===u[0];if(d||f){if(a=n(l,c,a),d){var p=t(u,l.selector);s||(s=e(c,o)),p=p.replace(Pn,s);var h=l.key+"-"+u;"replaceRule"in c?c.replaceRule(h,r[u],Me({},a,{selector:p})):c.addRule(h,r[u],Me({},a,{selector:p}))}else f&&c.addRule(u,{},a).addRule(l.key,r[u],{selector:l.selector});delete r[u]}}return r}}};var An=/[A-Z]/g,zn=/^ms-/,$n={};function Rn(e){return"-"+e.toLowerCase()}const _n=function(e){if($n.hasOwnProperty(e))return $n[e];var t=e.replace(An,Rn);return $n[e]=zn.test(t)?"-"+t:t};function In(e){var t={};for(var n in e){t[0===n.indexOf("--")?n:_n(n)]=e[n]}return e.fallbacks&&(Array.isArray(e.fallbacks)?t.fallbacks=e.fallbacks.map(In):t.fallbacks=In(e.fallbacks)),t}const Mn=function(){return{onProcessStyle:function(e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)e[t]=In(e[t]);return e}return In(e)},onChangeValue:function(e,t,n){if(0===t.indexOf("--"))return e;var r=_n(t);return t===r?e:(n.prop(r,e),null)}}};var Ln=an&&CSS?CSS.px:"px",Dn=an&&CSS?CSS.ms:"ms",Nn=an&&CSS?CSS.percent:"%";function Fn(e){var t=/(-[a-z])/g,n=function(e){return e[1].toUpperCase()},r={};for(var i in e)r[i]=e[i],r[i.replace(t,n)]=e[i];return r}var Vn=Fn({"animation-delay":Dn,"animation-duration":Dn,"background-position":Ln,"background-position-x":Ln,"background-position-y":Ln,"background-size":Ln,border:Ln,"border-bottom":Ln,"border-bottom-left-radius":Ln,"border-bottom-right-radius":Ln,"border-bottom-width":Ln,"border-left":Ln,"border-left-width":Ln,"border-radius":Ln,"border-right":Ln,"border-right-width":Ln,"border-top":Ln,"border-top-left-radius":Ln,"border-top-right-radius":Ln,"border-top-width":Ln,"border-width":Ln,"border-block":Ln,"border-block-end":Ln,"border-block-end-width":Ln,"border-block-start":Ln,"border-block-start-width":Ln,"border-block-width":Ln,"border-inline":Ln,"border-inline-end":Ln,"border-inline-end-width":Ln,"border-inline-start":Ln,"border-inline-start-width":Ln,"border-inline-width":Ln,"border-start-start-radius":Ln,"border-start-end-radius":Ln,"border-end-start-radius":Ln,"border-end-end-radius":Ln,margin:Ln,"margin-bottom":Ln,"margin-left":Ln,"margin-right":Ln,"margin-top":Ln,"margin-block":Ln,"margin-block-end":Ln,"margin-block-start":Ln,"margin-inline":Ln,"margin-inline-end":Ln,"margin-inline-start":Ln,padding:Ln,"padding-bottom":Ln,"padding-left":Ln,"padding-right":Ln,"padding-top":Ln,"padding-block":Ln,"padding-block-end":Ln,"padding-block-start":Ln,"padding-inline":Ln,"padding-inline-end":Ln,"padding-inline-start":Ln,"mask-position-x":Ln,"mask-position-y":Ln,"mask-size":Ln,height:Ln,width:Ln,"min-height":Ln,"max-height":Ln,"min-width":Ln,"max-width":Ln,bottom:Ln,left:Ln,top:Ln,right:Ln,inset:Ln,"inset-block":Ln,"inset-block-end":Ln,"inset-block-start":Ln,"inset-inline":Ln,"inset-inline-end":Ln,"inset-inline-start":Ln,"box-shadow":Ln,"text-shadow":Ln,"column-gap":Ln,"column-rule":Ln,"column-rule-width":Ln,"column-width":Ln,"font-size":Ln,"font-size-delta":Ln,"letter-spacing":Ln,"text-decoration-thickness":Ln,"text-indent":Ln,"text-stroke":Ln,"text-stroke-width":Ln,"word-spacing":Ln,motion:Ln,"motion-offset":Ln,outline:Ln,"outline-offset":Ln,"outline-width":Ln,perspective:Ln,"perspective-origin-x":Nn,"perspective-origin-y":Nn,"transform-origin":Nn,"transform-origin-x":Nn,"transform-origin-y":Nn,"transform-origin-z":Nn,"transition-delay":Dn,"transition-duration":Dn,"vertical-align":Ln,"flex-basis":Ln,"shape-margin":Ln,size:Ln,gap:Ln,grid:Ln,"grid-gap":Ln,"row-gap":Ln,"grid-row-gap":Ln,"grid-column-gap":Ln,"grid-template-rows":Ln,"grid-template-columns":Ln,"grid-auto-rows":Ln,"grid-auto-columns":Ln,"box-shadow-x":Ln,"box-shadow-y":Ln,"box-shadow-blur":Ln,"box-shadow-spread":Ln,"font-line-height":Ln,"text-shadow-x":Ln,"text-shadow-y":Ln,"text-shadow-blur":Ln});function Un(e,t,n){if(null==t)return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]=Un(e,t[r],n);else if("object"===typeof t)if("fallbacks"===e)for(var i in t)t[i]=Un(i,t[i],n);else for(var o in t)t[o]=Un(e+"-"+o,t[o],n);else if("number"===typeof t&&!1===isNaN(t)){var a=n[e]||Vn[e];return!a||0===t&&a===Ln?t.toString():"function"===typeof a?a(t).toString():""+t+a}return t}const Bn=function(e){void 0===e&&(e={});var t=Fn(e);return{onProcessStyle:function(e,n){if("style"!==n.type)return e;for(var r in e)e[r]=Un(r,e[r],t);return e},onChangeValue:function(e,n){return Un(n,e,t)}}};function Hn(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function qn(e,t){if(e){if("string"==typeof e)return Hn(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Hn(e,t):void 0}}function Wn(e){return function(e){if(Array.isArray(e))return Hn(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||qn(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var Yn="",Xn="",Kn="",Gn="",Jn=Ue&&"ontouchstart"in document.documentElement;if(Ue){var Qn={Moz:"-moz-",ms:"-ms-",O:"-o-",Webkit:"-webkit-"},Zn=document.createElement("p").style;for(var er in Qn)if(er+"Transform"in Zn){Yn=er,Xn=Qn[er];break}"Webkit"===Yn&&"msHyphens"in Zn&&(Yn="ms",Xn=Qn.ms,Gn="edge"),"Webkit"===Yn&&"-apple-trailing-word"in Zn&&(Kn="apple")}var tr=Yn,nr=Xn,rr=Kn,ir=Gn,or=Jn;var ar={noPrefill:["appearance"],supportedProperty:function(e){return"appearance"===e&&("ms"===tr?"-webkit-"+e:nr+e)}},sr={noPrefill:["color-adjust"],supportedProperty:function(e){return"color-adjust"===e&&("Webkit"===tr?nr+"print-"+e:e)}},lr=/[-\s]+(.)?/g;function cr(e,t){return t?t.toUpperCase():""}function ur(e){return e.replace(lr,cr)}function dr(e){return ur("-"+e)}var fr,pr={noPrefill:["mask"],supportedProperty:function(e,t){if(!/^mask/.test(e))return!1;if("Webkit"===tr){var n="mask-image";if(ur(n)in t)return e;if(tr+dr(n)in t)return nr+e}return e}},hr={noPrefill:["text-orientation"],supportedProperty:function(e){return"text-orientation"===e&&("apple"!==rr||or?e:nr+e)}},mr={noPrefill:["transform"],supportedProperty:function(e,t,n){return"transform"===e&&(n.transform?e:nr+e)}},gr={noPrefill:["transition"],supportedProperty:function(e,t,n){return"transition"===e&&(n.transition?e:nr+e)}},vr={noPrefill:["writing-mode"],supportedProperty:function(e){return"writing-mode"===e&&("Webkit"===tr||"ms"===tr&&"edge"!==ir?nr+e:e)}},yr={noPrefill:["user-select"],supportedProperty:function(e){return"user-select"===e&&("Moz"===tr||"ms"===tr||"apple"===rr?nr+e:e)}},br={supportedProperty:function(e,t){return!!/^break-/.test(e)&&("Webkit"===tr?"WebkitColumn"+dr(e)in t&&nr+"column-"+e:"Moz"===tr&&("page"+dr(e)in t&&"page-"+e))}},xr={supportedProperty:function(e,t){if(!/^(border|margin|padding)-inline/.test(e))return!1;if("Moz"===tr)return e;var n=e.replace("-inline","");return tr+dr(n)in t&&nr+n}},wr={supportedProperty:function(e,t){return ur(e)in t&&e}},kr={supportedProperty:function(e,t){var n=dr(e);return"-"===e[0]||"-"===e[0]&&"-"===e[1]?e:tr+n in t?nr+e:"Webkit"!==tr&&"Webkit"+n in t&&"-webkit-"+e}},jr={supportedProperty:function(e){return"scroll-snap"===e.substring(0,11)&&("ms"===tr?""+nr+e:e)}},Sr={supportedProperty:function(e){return"overscroll-behavior"===e&&("ms"===tr?nr+"scroll-chaining":e)}},Cr={"flex-grow":"flex-positive","flex-shrink":"flex-negative","flex-basis":"flex-preferred-size","justify-content":"flex-pack",order:"flex-order","align-items":"flex-align","align-content":"flex-line-pack"},Er={supportedProperty:function(e,t){var n=Cr[e];return!!n&&(tr+dr(n)in t&&nr+n)}},Tr={flex:"box-flex","flex-grow":"box-flex","flex-direction":["box-orient","box-direction"],order:"box-ordinal-group","align-items":"box-align","flex-flow":["box-orient","box-direction"],"justify-content":"box-pack"},Pr=Object.keys(Tr),Or=function(e){return nr+e},Ar={supportedProperty:function(e,t,n){var r=n.multiple;if(Pr.indexOf(e)>-1){var i=Tr[e];if(!Array.isArray(i))return tr+dr(i)in t&&nr+i;if(!r)return!1;for(var o=0;o<i.length;o++)if(!(tr+dr(i[0])in t))return!1;return i.map(Or)}return!1}},zr=[ar,sr,pr,hr,mr,gr,vr,yr,br,xr,wr,kr,jr,Sr,Er,Ar],$r=zr.filter((function(e){return e.supportedProperty})).map((function(e){return e.supportedProperty})),Rr=zr.filter((function(e){return e.noPrefill})).reduce((function(e,t){return e.push.apply(e,Wn(t.noPrefill)),e}),[]),_r={};if(Ue){fr=document.createElement("p");var Ir=window.getComputedStyle(document.documentElement,"");for(var Mr in Ir)isNaN(Mr)||(_r[Ir[Mr]]=Ir[Mr]);Rr.forEach((function(e){return delete _r[e]}))}function Lr(e,t){if(void 0===t&&(t={}),!fr)return e;if(null!=_r[e])return _r[e];"transition"!==e&&"transform"!==e||(t[e]=e in fr.style);for(var n=0;n<$r.length&&(_r[e]=$r[n](e,fr.style,t),!_r[e]);n++);try{fr.style[e]=""}catch(r){return!1}return _r[e]}var Dr,Nr={},Fr={transition:1,"transition-property":1,"-webkit-transition":1,"-webkit-transition-property":1},Vr=/(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;function Ur(e,t,n){if("var"===t)return"var";if("all"===t)return"all";if("all"===n)return", all";var r=t?Lr(t):", "+Lr(n);return r||(t||n)}function Br(e,t){var n=t;if(!Dr||"content"===e)return t;if("string"!==typeof n||!isNaN(parseInt(n,10)))return n;var r=e+n;if(null!=Nr[r])return Nr[r];try{Dr.style[e]=n}catch(i){return Nr[r]=!1,!1}if(Fr[e])n=n.replace(Vr,Ur);else if(""===Dr.style[e]&&("-ms-flex"===(n=nr+n)&&(Dr.style[e]="-ms-flexbox"),Dr.style[e]=n,""===Dr.style[e]))return Nr[r]=!1,!1;return Dr.style[e]="",Nr[r]=n,Nr[r]}Ue&&(Dr=document.createElement("p"));const Hr=function(){function e(t){for(var n in t){var r=t[n];if("fallbacks"===n&&Array.isArray(r))t[n]=r.map(e);else{var i=!1,o=Lr(n);o&&o!==n&&(i=!0);var a=!1,s=Br(o,et(r));s&&s!==r&&(a=!0),(i||a)&&(i&&delete t[n],t[o||n]=s||r)}}return t}return{onProcessRule:function(e){if("keyframes"===e.type){var t=e;t.at=function(e){return"-"===e[1]||"ms"===tr?e:"@"+nr+"keyframes"+e.substr(10)}(t.at)}},onProcessStyle:function(t,n){return"style"!==n.type?t:e(t)},onChangeValue:function(e,t){return Br(t,et(e))||e}}};const qr=function(){var e=function(e,t){return e.length===t.length?e>t?1:-1:e.length-t.length};return{onProcessStyle:function(t,n){if("style"!==n.type)return t;for(var r={},i=Object.keys(t).sort(e),o=0;o<i.length;o++)r[i[o]]=t[i[o]];return r}}};var Wr=on({plugins:[yn(),Cn(),On(),Mn(),Bn(),"undefined"===typeof window?null:Hr(),qr()]}),Yr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.disableGlobal,n=void 0!==t&&t,r=e.productionPrefix,i=void 0===r?"jss":r,o=e.seed,a=void 0===o?"":o,s=""===a?"":"".concat(a,"-"),l=0,c=function(){return l+=1};return function(e,t){var r=t.options.name;if(r&&0===r.indexOf("Mui")&&!t.options.link&&!n){if(-1!==hn.indexOf(e.key))return"Mui-".concat(e.key);var o="".concat(s).concat(r,"-").concat(e.key);return t.options.theme[pn]&&""===a?"".concat(o,"-").concat(c()):o}return"".concat(s).concat(i).concat(c())}}(),Xr={disableGeneration:!1,generateClassName:Yr,jss:Wr,sheetsCache:null,sheetsManager:new Map,sheetsRegistry:null},Kr=e.createContext(Xr);var Gr=-1e9;function Jr(e){return e&&"object"===Be(e)&&e.constructor===Object}function Qr(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{clone:!0},r=n.clone?Me({},e):e;return Jr(e)&&Jr(t)&&Object.keys(t).forEach((function(i){"__proto__"!==i&&(Jr(t[i])&&i in e?r[i]=Qr(e[i],t[i],n):r[i]=t[i])})),r}const Zr={};function ei(e,t){var n=e.state,r=e.theme,i=e.stylesOptions,o=e.stylesCreator,a=e.name;if(!i.disableGeneration){var s=un.get(i.sheetsManager,o,r);s||(s={refs:0,staticSheet:null,dynamicStyles:null},un.set(i.sheetsManager,o,r,s));var l=Me({},o.options,i,{theme:r,flip:"boolean"===typeof i.flip?i.flip:"rtl"===r.direction});l.generateId=l.serverGenerateClassName||l.generateClassName;var c=i.sheetsRegistry;if(0===s.refs){var u;i.sheetsCache&&(u=un.get(i.sheetsCache,o,r));var d=o.create(r,a);u||((u=i.jss.createStyleSheet(d,Me({link:!1},l))).attach(),i.sheetsCache&&un.set(i.sheetsCache,o,r,u)),c&&c.add(u),s.staticSheet=u,s.dynamicStyles=sn(d)}if(s.dynamicStyles){var f=i.jss.createStyleSheet(s.dynamicStyles,Me({link:!0},l));f.update(t),f.attach(),n.dynamicSheet=f,n.classes=ln({baseClasses:s.staticSheet.classes,newClasses:f.classes}),c&&c.add(f)}else n.classes=s.staticSheet.classes;s.refs+=1}}function ti(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.name,i=n.classNamePrefix,o=n.Component,a=n.defaultTheme,s=void 0===a?Zr:a,l=De(n,["name","classNamePrefix","Component","defaultTheme"]),c=function(e){var t="function"===typeof e;return{create:function(n,r){var i;try{i=t?e(n):e}catch(s){throw s}if(!r||!n.overrides||!n.overrides[r])return i;var o=n.overrides[r],a=Me({},i);return Object.keys(o).forEach((function(e){a[e]=Qr(a[e],o[e])})),a},options:{}}}(t),u=r||i||"makeStyles";c.options={index:Gr+=1,name:r,meta:u,classNamePrefix:u};return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=fn()||s,i=Me({},e.useContext(Kr),l),a=e.useRef(),u=e.useRef();!function(t,n){var r,i=e.useRef([]),o=e.useMemo((function(){return{}}),n);i.current!==o&&(i.current=o,r=t()),e.useEffect((function(){return function(){r&&r()}}),[o])}((function(){var e={name:r,state:{},stylesCreator:c,stylesOptions:i,theme:n};return ei(e,t),u.current=!1,a.current=e,function(){!function(e){var t=e.state,n=e.theme,r=e.stylesOptions,i=e.stylesCreator;if(!r.disableGeneration){var o=un.get(r.sheetsManager,i,n);o.refs-=1;var a=r.sheetsRegistry;0===o.refs&&(un.delete(r.sheetsManager,i,n),r.jss.removeStyleSheet(o.staticSheet),a&&a.remove(o.staticSheet)),t.dynamicSheet&&(r.jss.removeStyleSheet(t.dynamicSheet),a&&a.remove(t.dynamicSheet))}}(e)}}),[n,c]),e.useEffect((function(){u.current&&function(e,t){var n=e.state;n.dynamicSheet&&n.dynamicSheet.update(t)}(a.current,t),u.current=!0}));var d=function(e,t,n){var r=e.state;if(e.stylesOptions.disableGeneration)return t||{};r.cacheClasses||(r.cacheClasses={value:null,lastProp:null,lastJSS:{}});var i=!1;return r.classes!==r.cacheClasses.lastJSS&&(r.cacheClasses.lastJSS=r.classes,i=!0),t!==r.cacheClasses.lastProp&&(r.cacheClasses.lastProp=t,i=!0),i&&(r.cacheClasses.value=ln({baseClasses:r.cacheClasses.lastJSS,newClasses:t,Component:n})),r.cacheClasses.value}(a.current,t.classes,o);return d}}const ni=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(r){var i=n.defaultTheme,o=n.withTheme,a=void 0!==o&&o,s=n.name,l=De(n,["defaultTheme","withTheme","name"]);var c=s,u=ti(t,Me({defaultTheme:i,Component:r,name:s||r.displayName,classNamePrefix:c},l)),d=e.forwardRef((function(t,n){t.classes;var o,l=t.innerRef,c=De(t,["classes","innerRef"]),d=u(Me({},r.defaultProps,t)),f=c;return("string"===typeof s||a)&&(o=fn()||i,s&&(f=function(e){var t=e.theme,n=e.name,r=e.props;if(!t||!t.props||!t.props[n])return r;var i,o=t.props[n];for(i in o)void 0===r[i]&&(r[i]=o[i]);return r}({theme:o,name:s,props:c})),a&&!f.theme&&(f.theme=o)),e.createElement(r,Me({ref:l||n,classes:d},f))}));return f()(d,r),d}};var ri=["xs","sm","md","lg","xl"];function ii(e,t,n){return(t=He(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oi(e,t,n){var r;return Me({gutters:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return console.warn(["Material-UI: theme.mixins.gutters() is deprecated.","You can use the source of the mixin directly:","\n      paddingLeft: theme.spacing(2),\n      paddingRight: theme.spacing(2),\n      [theme.breakpoints.up('sm')]: {\n        paddingLeft: theme.spacing(3),\n        paddingRight: theme.spacing(3),\n      },\n      "].join("\n")),Me({paddingLeft:t(2),paddingRight:t(2)},n,ii({},e.up("sm"),Me({paddingLeft:t(3),paddingRight:t(3)},n[e.up("sm")])))},toolbar:(r={minHeight:56},ii(r,"".concat(e.up("xs")," and (orientation: landscape)"),{minHeight:48}),ii(r,e.up("sm"),{minHeight:64}),r)},n)}function ai(e){for(var t="https://mui.com/production-error/?code="+e,n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified Material-UI error #"+e+"; visit "+t+" for the full message."}const si={black:"#000",white:"#fff"};const li={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#d5d5d5",A200:"#aaaaaa",A400:"#303030",A700:"#616161"};const ci={50:"#e8eaf6",100:"#c5cae9",200:"#9fa8da",300:"#7986cb",400:"#5c6bc0",500:"#3f51b5",600:"#3949ab",700:"#303f9f",800:"#283593",900:"#1a237e",A100:"#8c9eff",A200:"#536dfe",A400:"#3d5afe",A700:"#304ffe"};const ui={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"};const di={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"};const fi={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"};const pi={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"};const hi={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"};function mi(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.min(Math.max(t,e),n)}function gi(e){if(e.type)return e;if("#"===e.charAt(0))return gi(function(e){e=e.substr(1);var t=new RegExp(".{1,".concat(e.length>=6?2:1,"}"),"g"),n=e.match(t);return n&&1===n[0].length&&(n=n.map((function(e){return e+e}))),n?"rgb".concat(4===n.length?"a":"","(").concat(n.map((function(e,t){return t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3})).join(", "),")"):""}(e));var t=e.indexOf("("),n=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla"].indexOf(n))throw new Error(ai(3,e));var r=e.substring(t+1,e.length-1).split(",");return{type:n,values:r=r.map((function(e){return parseFloat(e)}))}}function vi(e){var t=e.type,n=e.values;return-1!==t.indexOf("rgb")?n=n.map((function(e,t){return t<3?parseInt(e,10):e})):-1!==t.indexOf("hsl")&&(n[1]="".concat(n[1],"%"),n[2]="".concat(n[2],"%")),"".concat(t,"(").concat(n.join(", "),")")}function yi(e){var t="hsl"===(e=gi(e)).type?gi(function(e){var t=(e=gi(e)).values,n=t[0],r=t[1]/100,i=t[2]/100,o=r*Math.min(i,1-i),a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(e+n/30)%12;return i-o*Math.max(Math.min(t-3,9-t,1),-1)},s="rgb",l=[Math.round(255*a(0)),Math.round(255*a(8)),Math.round(255*a(4))];return"hsla"===e.type&&(s+="a",l.push(t[3])),vi({type:s,values:l})}(e)).values:e.values;return t=t.map((function(e){return(e/=255)<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)})),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function bi(e,t){if(e=gi(e),t=mi(t),-1!==e.type.indexOf("hsl"))e.values[2]*=1-t;else if(-1!==e.type.indexOf("rgb"))for(var n=0;n<3;n+=1)e.values[n]*=1-t;return vi(e)}function xi(e,t){if(e=gi(e),t=mi(t),-1!==e.type.indexOf("hsl"))e.values[2]+=(100-e.values[2])*t;else if(-1!==e.type.indexOf("rgb"))for(var n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;return vi(e)}var wi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:si.white,default:li[50]},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ki={text:{primary:si.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",hint:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:li[800],default:"#303030"},action:{active:si.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ji(e,t,n,r){var i=r.light||r,o=r.dark||1.5*r;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:"light"===t?e.light=xi(e.main,i):"dark"===t&&(e.dark=bi(e.main,o)))}function Si(e){var t=e.primary,n=void 0===t?{light:ci[300],main:ci[500],dark:ci[700]}:t,r=e.secondary,i=void 0===r?{light:ui.A200,main:ui.A400,dark:ui.A700}:r,o=e.error,a=void 0===o?{light:di[300],main:di[500],dark:di[700]}:o,s=e.warning,l=void 0===s?{light:fi[300],main:fi[500],dark:fi[700]}:s,c=e.info,u=void 0===c?{light:pi[300],main:pi[500],dark:pi[700]}:c,d=e.success,f=void 0===d?{light:hi[300],main:hi[500],dark:hi[700]}:d,p=e.type,h=void 0===p?"light":p,m=e.contrastThreshold,g=void 0===m?3:m,v=e.tonalOffset,y=void 0===v?.2:v,b=De(e,["primary","secondary","error","warning","info","success","type","contrastThreshold","tonalOffset"]);function x(e){var t=function(e,t){var n=yi(e),r=yi(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}(e,ki.text.primary)>=g?ki.text.primary:wi.text.primary;return t}var w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:700;if(!(e=Me({},e)).main&&e[t]&&(e.main=e[t]),!e.main)throw new Error(ai(4,t));if("string"!==typeof e.main)throw new Error(ai(5,JSON.stringify(e.main)));return ji(e,"light",n,y),ji(e,"dark",r,y),e.contrastText||(e.contrastText=x(e.main)),e},k={dark:ki,light:wi};return Qr(Me({common:si,type:h,primary:w(n),secondary:w(i,"A400","A200","A700"),error:w(a),warning:w(l),info:w(u),success:w(f),grey:li,contrastThreshold:g,getContrastText:x,augmentColor:w,tonalOffset:y},k[h]),b)}function Ci(e){return Math.round(1e5*e)/1e5}function Ei(e){return Ci(e)}var Ti={textTransform:"uppercase"},Pi='"Roboto", "Helvetica", "Arial", sans-serif';function Oi(e,t){var n="function"===typeof t?t(e):t,r=n.fontFamily,i=void 0===r?Pi:r,o=n.fontSize,a=void 0===o?14:o,s=n.fontWeightLight,l=void 0===s?300:s,c=n.fontWeightRegular,u=void 0===c?400:c,d=n.fontWeightMedium,f=void 0===d?500:d,p=n.fontWeightBold,h=void 0===p?700:p,m=n.htmlFontSize,g=void 0===m?16:m,v=n.allVariants,y=n.pxToRem,b=De(n,["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"]);var x=a/14,w=y||function(e){return"".concat(e/g*x,"rem")},k=function(e,t,n,r,o){return Me({fontFamily:i,fontWeight:e,fontSize:w(t),lineHeight:n},i===Pi?{letterSpacing:"".concat(Ci(r/t),"em")}:{},o,v)},j={h1:k(l,96,1.167,-1.5),h2:k(l,60,1.2,-.5),h3:k(u,48,1.167,0),h4:k(u,34,1.235,.25),h5:k(u,24,1.334,0),h6:k(f,20,1.6,.15),subtitle1:k(u,16,1.75,.15),subtitle2:k(f,14,1.57,.1),body1:k(u,16,1.5,.15),body2:k(u,14,1.43,.15),button:k(f,14,1.75,.4,Ti),caption:k(u,12,1.66,.4),overline:k(u,12,2.66,1,Ti)};return Qr(Me({htmlFontSize:g,pxToRem:w,round:Ei,fontFamily:i,fontSize:a,fontWeightLight:l,fontWeightRegular:u,fontWeightMedium:f,fontWeightBold:h},j),b,{clone:!1})}function Ai(){return["".concat(arguments.length<=0?void 0:arguments[0],"px ").concat(arguments.length<=1?void 0:arguments[1],"px ").concat(arguments.length<=2?void 0:arguments[2],"px ").concat(arguments.length<=3?void 0:arguments[3],"px rgba(0,0,0,").concat(.2,")"),"".concat(arguments.length<=4?void 0:arguments[4],"px ").concat(arguments.length<=5?void 0:arguments[5],"px ").concat(arguments.length<=6?void 0:arguments[6],"px ").concat(arguments.length<=7?void 0:arguments[7],"px rgba(0,0,0,").concat(.14,")"),"".concat(arguments.length<=8?void 0:arguments[8],"px ").concat(arguments.length<=9?void 0:arguments[9],"px ").concat(arguments.length<=10?void 0:arguments[10],"px ").concat(arguments.length<=11?void 0:arguments[11],"px rgba(0,0,0,").concat(.12,")")].join(",")}const zi=["none",Ai(0,2,1,-1,0,1,1,0,0,1,3,0),Ai(0,3,1,-2,0,2,2,0,0,1,5,0),Ai(0,3,3,-2,0,3,4,0,0,1,8,0),Ai(0,2,4,-1,0,4,5,0,0,1,10,0),Ai(0,3,5,-1,0,5,8,0,0,1,14,0),Ai(0,3,5,-1,0,6,10,0,0,1,18,0),Ai(0,4,5,-2,0,7,10,1,0,2,16,1),Ai(0,5,5,-3,0,8,10,1,0,3,14,2),Ai(0,5,6,-3,0,9,12,1,0,3,16,2),Ai(0,6,6,-3,0,10,14,1,0,4,18,3),Ai(0,6,7,-4,0,11,15,1,0,4,20,3),Ai(0,7,8,-4,0,12,17,2,0,5,22,4),Ai(0,7,8,-4,0,13,19,2,0,5,24,4),Ai(0,7,9,-4,0,14,21,2,0,5,26,4),Ai(0,8,9,-5,0,15,22,2,0,6,28,5),Ai(0,8,10,-5,0,16,24,2,0,6,30,5),Ai(0,8,11,-5,0,17,26,2,0,6,32,5),Ai(0,9,11,-5,0,18,28,2,0,7,34,6),Ai(0,9,12,-6,0,19,29,2,0,7,36,6),Ai(0,10,13,-6,0,20,31,3,0,8,38,7),Ai(0,10,13,-6,0,21,33,3,0,8,40,7),Ai(0,10,14,-6,0,22,35,3,0,8,42,7),Ai(0,11,14,-7,0,23,36,3,0,9,44,8),Ai(0,11,15,-7,0,24,38,3,0,9,46,8)];const $i={borderRadius:4};function Ri(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o,a,s=[],l=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=o.call(n)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(e){c=!0,i=e}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw i}}return s}}(e,t)||qn(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var _i={xs:0,sm:600,md:960,lg:1280,xl:1920},Ii={keys:["xs","sm","md","lg","xl"],up:function(e){return"@media (min-width:".concat(_i[e],"px)")}};const Mi=function(e,t){return t?Qr(e,t,{clone:!1}):e};var Li={m:"margin",p:"padding"},Di={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ni={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Fi=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}((function(e){if(e.length>2){if(!Ni[e])return[e];e=Ni[e]}var t=Ri(e.split(""),2),n=t[0],r=t[1],i=Li[n],o=Di[r]||"";return Array.isArray(o)?o.map((function(e){return i+e})):[i+o]})),Vi=["m","mt","mr","mb","ml","mx","my","p","pt","pr","pb","pl","px","py","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY"];function Ui(e){var t=e.spacing||8;return"number"===typeof t?function(e){return t*e}:Array.isArray(t)?function(e){return t[e]}:"function"===typeof t?t:function(){}}function Bi(e,t){return function(n){return e.reduce((function(e,r){return e[r]=function(e,t){if("string"===typeof t||null==t)return t;var n=e(Math.abs(t));return t>=0?n:"number"===typeof n?-n:"-".concat(n)}(t,n),e}),{})}}function Hi(e){var t=Ui(e.theme);return Object.keys(e).map((function(n){if(-1===Vi.indexOf(n))return null;var r=Bi(Fi(n),t),i=e[n];return function(e,t,n){if(Array.isArray(t)){var r=e.theme.breakpoints||Ii;return t.reduce((function(e,i,o){return e[r.up(r.keys[o])]=n(t[o]),e}),{})}if("object"===Be(t)){var i=e.theme.breakpoints||Ii;return Object.keys(t).reduce((function(e,r){return e[i.up(r)]=n(t[r]),e}),{})}return n(t)}(e,i,r)})).reduce(Mi,{})}Hi.propTypes={},Hi.filterProps=Vi;var qi={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Wi={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Yi(e){return"".concat(Math.round(e),"ms")}const Xi={easing:qi,duration:Wi,create:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["all"],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.duration,r=void 0===n?Wi.standard:n,i=t.easing,o=void 0===i?qi.easeInOut:i,a=t.delay,s=void 0===a?0:a;De(t,["duration","easing","delay"]);return(Array.isArray(e)?e:[e]).map((function(e){return"".concat(e," ").concat("string"===typeof r?r:Yi(r)," ").concat(o," ").concat("string"===typeof s?s:Yi(s))})).join(",")},getAutoHeightDuration:function(e){if(!e)return 0;var t=e/36;return Math.round(10*(4+15*Math.pow(t,.25)+t/5))}};const Ki={mobileStepper:1e3,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500};function Gi(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.breakpoints,n=void 0===t?{}:t,r=e.mixins,i=void 0===r?{}:r,o=e.palette,a=void 0===o?{}:o,s=e.spacing,l=e.typography,c=void 0===l?{}:l,u=De(e,["breakpoints","mixins","palette","spacing","typography"]),d=Si(a),f=function(e){var t=e.values,n=void 0===t?{xs:0,sm:600,md:960,lg:1280,xl:1920}:t,r=e.unit,i=void 0===r?"px":r,o=e.step,a=void 0===o?5:o,s=De(e,["values","unit","step"]);function l(e){var t="number"===typeof n[e]?n[e]:e;return"@media (min-width:".concat(t).concat(i,")")}function c(e,t){var r=ri.indexOf(t);return r===ri.length-1?l(e):"@media (min-width:".concat("number"===typeof n[e]?n[e]:e).concat(i,") and ")+"(max-width:".concat((-1!==r&&"number"===typeof n[ri[r+1]]?n[ri[r+1]]:t)-a/100).concat(i,")")}return Me({keys:ri,values:n,up:l,down:function(e){var t=ri.indexOf(e)+1,r=n[ri[t]];return t===ri.length?l("xs"):"@media (max-width:".concat(("number"===typeof r&&t>0?r:e)-a/100).concat(i,")")},between:c,only:function(e){return c(e,e)},width:function(e){return n[e]}},s)}(n),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8;if(e.mui)return e;var t=Ui({spacing:e}),n=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return 0===n.length?t(1):1===n.length?t(n[0]):n.map((function(e){if("string"===typeof e)return e;var n=t(e);return"number"===typeof n?"".concat(n,"px"):n})).join(" ")};return Object.defineProperty(n,"unit",{get:function(){return e}}),n.mui=!0,n}(s),h=Qr({breakpoints:f,direction:"ltr",mixins:oi(f,p,i),overrides:{},palette:d,props:{},shadows:zi,typography:Oi(d,c),spacing:p,shape:$i,transitions:Xi,zIndex:Ki},u),m=arguments.length,g=new Array(m>1?m-1:0),v=1;v<m;v++)g[v-1]=arguments[v];return h=g.reduce((function(e,t){return Qr(e,t)}),h)}const Ji=Gi();const Qi=function(e,t){return ni(e,Me({defaultTheme:Ji},t))};function Zi(e){if("string"!==typeof e)throw new Error(ai(7));return e.charAt(0).toUpperCase()+e.slice(1)}var eo={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p"},to=e.forwardRef((function(t,n){var r=t.align,i=void 0===r?"inherit":r,o=t.classes,a=t.className,s=t.color,l=void 0===s?"initial":s,c=t.component,u=t.display,d=void 0===u?"initial":u,f=t.gutterBottom,p=void 0!==f&&f,h=t.noWrap,m=void 0!==h&&h,g=t.paragraph,v=void 0!==g&&g,y=t.variant,b=void 0===y?"body1":y,x=t.variantMapping,w=void 0===x?eo:x,k=De(t,["align","classes","className","color","component","display","gutterBottom","noWrap","paragraph","variant","variantMapping"]),j=c||(v?"p":w[b]||eo[b])||"span";return e.createElement(j,Me({className:Fe(o.root,a,"inherit"!==b&&o[b],"initial"!==l&&o["color".concat(Zi(l))],m&&o.noWrap,p&&o.gutterBottom,v&&o.paragraph,"inherit"!==i&&o["align".concat(Zi(i))],"initial"!==d&&o["display".concat(Zi(d))]),ref:n},k))}));const no=Qi((function(e){return{root:{margin:0},body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,h1:e.typography.h1,h2:e.typography.h2,h3:e.typography.h3,h4:e.typography.h4,h5:e.typography.h5,h6:e.typography.h6,subtitle1:e.typography.subtitle1,subtitle2:e.typography.subtitle2,overline:e.typography.overline,srOnly:{position:"absolute",height:1,width:1,overflow:"hidden"},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:16},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextPrimary:{color:e.palette.text.primary},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main},displayInline:{display:"inline"},displayBlock:{display:"block"}}}),{name:"MuiTypography"})(to);var ro=n(173),io=n.n(ro);function oo(e){return"/"===e.charAt(0)}function ao(e,t){for(var n=t,r=n+1,i=e.length;r<i;n+=1,r+=1)e[n]=e[r];e.pop()}const so=function(e,t){void 0===t&&(t="");var n,r=e&&e.split("/")||[],i=t&&t.split("/")||[],o=e&&oo(e),a=t&&oo(t),s=o||a;if(e&&oo(e)?i=r:r.length&&(i.pop(),i=i.concat(r)),!i.length)return"/";if(i.length){var l=i[i.length-1];n="."===l||".."===l||""===l}else n=!1;for(var c=0,u=i.length;u>=0;u--){var d=i[u];"."===d?ao(i,u):".."===d?(ao(i,u),c++):c&&(ao(i,u),c--)}if(!s)for(;c--;c)i.unshift("..");!s||""===i[0]||i[0]&&oo(i[0])||i.unshift("");var f=i.join("/");return n&&"/"!==f.substr(-1)&&(f+="/"),f};var lo="Invariant failed";function co(e,t){if(!e)throw new Error(lo)}function uo(e){return"/"===e.charAt(0)?e:"/"+e}function fo(e){return"/"===e.charAt(0)?e.substr(1):e}function po(e,t){return function(e,t){return 0===e.toLowerCase().indexOf(t.toLowerCase())&&-1!=="/?#".indexOf(e.charAt(t.length))}(e,t)?e.substr(t.length):e}function ho(e){return"/"===e.charAt(e.length-1)?e.slice(0,-1):e}function mo(e){var t=e.pathname,n=e.search,r=e.hash,i=t||"/";return n&&"?"!==n&&(i+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(i+="#"===r.charAt(0)?r:"#"+r),i}function go(e,t,n,r){var i;"string"===typeof e?(i=function(e){var t=e||"/",n="",r="",i=t.indexOf("#");-1!==i&&(r=t.substr(i),t=t.substr(0,i));var o=t.indexOf("?");return-1!==o&&(n=t.substr(o),t=t.substr(0,o)),{pathname:t,search:"?"===n?"":n,hash:"#"===r?"":r}}(e),i.state=t):(void 0===(i=Me({},e)).pathname&&(i.pathname=""),i.search?"?"!==i.search.charAt(0)&&(i.search="?"+i.search):i.search="",i.hash?"#"!==i.hash.charAt(0)&&(i.hash="#"+i.hash):i.hash="",void 0!==t&&void 0===i.state&&(i.state=t));try{i.pathname=decodeURI(i.pathname)}catch(pl){throw pl instanceof URIError?new URIError('Pathname "'+i.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):pl}return n&&(i.key=n),r?i.pathname?"/"!==i.pathname.charAt(0)&&(i.pathname=so(i.pathname,r.pathname)):i.pathname=r.pathname:i.pathname||(i.pathname="/"),i}function vo(){var e=null;var t=[];return{setPrompt:function(t){return e=t,function(){e===t&&(e=null)}},confirmTransitionTo:function(t,n,r,i){if(null!=e){var o="function"===typeof e?e(t,n):e;"string"===typeof o?"function"===typeof r?r(o,i):i(!0):i(!1!==o)}else i(!0)},appendListener:function(e){var n=!0;function r(){n&&e.apply(void 0,arguments)}return t.push(r),function(){n=!1,t=t.filter((function(e){return e!==r}))}},notifyListeners:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t.forEach((function(e){return e.apply(void 0,n)}))}}}var yo=!("undefined"===typeof window||!window.document||!window.document.createElement);function bo(e,t){t(window.confirm(e))}var xo="popstate",wo="hashchange";function ko(){try{return window.history.state||{}}catch(pl){return{}}}function jo(e){void 0===e&&(e={}),yo||co(!1);var t=window.history,n=function(){var e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history}(),r=!(-1===window.navigator.userAgent.indexOf("Trident")),i=e,o=i.forceRefresh,a=void 0!==o&&o,s=i.getUserConfirmation,l=void 0===s?bo:s,c=i.keyLength,u=void 0===c?6:c,d=e.basename?ho(uo(e.basename)):"";function f(e){var t=e||{},n=t.key,r=t.state,i=window.location,o=i.pathname+i.search+i.hash;return d&&(o=po(o,d)),go(o,r,n)}function p(){return Math.random().toString(36).substr(2,u)}var h=vo();function m(e){Me(T,e),T.length=t.length,h.notifyListeners(T.location,T.action)}function g(e){(function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")})(e)||b(f(e.state))}function v(){b(f(ko()))}var y=!1;function b(e){if(y)y=!1,m();else{h.confirmTransitionTo(e,"POP",l,(function(t){t?m({action:"POP",location:e}):function(e){var t=T.location,n=w.indexOf(t.key);-1===n&&(n=0);var r=w.indexOf(e.key);-1===r&&(r=0);var i=n-r;i&&(y=!0,j(i))}(e)}))}}var x=f(ko()),w=[x.key];function k(e){return d+mo(e)}function j(e){t.go(e)}var S=0;function C(e){1===(S+=e)&&1===e?(window.addEventListener(xo,g),r&&window.addEventListener(wo,v)):0===S&&(window.removeEventListener(xo,g),r&&window.removeEventListener(wo,v))}var E=!1;var T={length:t.length,action:"POP",location:x,createHref:k,push:function(e,r){var i="PUSH",o=go(e,r,p(),T.location);h.confirmTransitionTo(o,i,l,(function(e){if(e){var r=k(o),s=o.key,l=o.state;if(n)if(t.pushState({key:s,state:l},null,r),a)window.location.href=r;else{var c=w.indexOf(T.location.key),u=w.slice(0,c+1);u.push(o.key),w=u,m({action:i,location:o})}else window.location.href=r}}))},replace:function(e,r){var i="REPLACE",o=go(e,r,p(),T.location);h.confirmTransitionTo(o,i,l,(function(e){if(e){var r=k(o),s=o.key,l=o.state;if(n)if(t.replaceState({key:s,state:l},null,r),a)window.location.replace(r);else{var c=w.indexOf(T.location.key);-1!==c&&(w[c]=o.key),m({action:i,location:o})}else window.location.replace(r)}}))},go:j,goBack:function(){j(-1)},goForward:function(){j(1)},block:function(e){void 0===e&&(e=!1);var t=h.setPrompt(e);return E||(C(1),E=!0),function(){return E&&(E=!1,C(-1)),t()}},listen:function(e){var t=h.appendListener(e);return C(1),function(){C(-1),t()}}};return T}var So="hashchange",Co={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!/"+fo(e)},decodePath:function(e){return"!"===e.charAt(0)?e.substr(1):e}},noslash:{encodePath:fo,decodePath:uo},slash:{encodePath:uo,decodePath:uo}};function Eo(e){var t=e.indexOf("#");return-1===t?e:e.slice(0,t)}function To(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)}function Po(e){window.location.replace(Eo(window.location.href)+"#"+e)}function Oo(e){void 0===e&&{},yo||co(!1);var t=window.history,n=(window.navigator.userAgent.indexOf("Firefox"),e),r=n.getUserConfirmation,i=void 0===r?bo:r,o=n.hashType,a=void 0===o?"slash":o,s=e.basename?ho(uo(e.basename)):"",l=Co[a],c=l.encodePath,u=l.decodePath;function d(){var e=u(To());return s&&po(e,s),go(e)}var f=vo();function p(e){Me(C,e),C.length=t.length,f.notifyListeners(C.location,C.action)}var h=!1,m=null;function g(){var e=To(),t=c(e);if(e!==t)Po(t);else{var n=d(),r=C.location;if(!h&&function(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash}(r,n))return;if(m===mo(n))return;(function(e){if(h)p();else{var t="POP";f.confirmTransitionTo(e,t,i,(function(n){n?p({action:t,location:e}):function(e){var t=C.location,n=x.lastIndexOf(mo(t));-1===n&&0;var r=x.lastIndexOf(mo(e));-1===r&&0;var i=n-r;i&&w(i)}(e)}))}})(n)}}var v=To(),y=c(v);v!==y&&Po(y);var b=d(),x=[mo(b)];function w(e){t.go(e)}var k=0;function j(e){1===(k+=e)&&1===e?window.addEventListener(So,g):0===k&&window.removeEventListener(So,g)}var S=!1;var C={length:t.length,action:"POP",location:b,createHref:function(e){var t=document.querySelector("base"),n="";return t&&t.getAttribute("href")&&Eo(window.location.href),n+"#"+c(s+mo(e))},push:function(e,t){var n="PUSH",r=go(e,void 0,void 0,C.location);f.confirmTransitionTo(r,n,i,(function(e){if(e){var t=mo(r),i=c(s+t);if(To()!==i){(function(e){window.location.hash=e})(i);var o=x.lastIndexOf(mo(C.location)),a=x.slice(0,o+1);a.push(t),p({action:n,location:r})}else p()}}))},replace:function(e,t){var n="REPLACE",r=go(e,void 0,void 0,C.location);f.confirmTransitionTo(r,n,i,(function(e){if(e){var t=mo(r),i=c(s+t);To()!==i&&Po(i);var o=x.indexOf(mo(C.location));-1!==o&&(x[o]=t),p({action:n,location:r})}}))},go:w,goBack:function(){w(-1)},goForward:function(){w(1)},block:function(e){void 0===e&&!1;var t=f.setPrompt(e);return S||(j(1),!0),function(){return S&&j(-1),t()}},listen:function(e){var t=f.appendListener(e);return j(1),function(){j(-1),t()}}};return C}function Ao(e,t,n){return Math.min(Math.max(e,t),n)}var zo=n(504),$o=n.n(zo),Ro=(n(681),1073741823),_o="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{};var Io=e.createContext||function(t,n){var r,i,o="__create-react-context-"+function(){var e="__global_unique_id__";return _o[e]=(_o[e]||0)+1}()+"__",a=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).emitter=function(e){var t=[];return{on:function(e){t.push(e)},off:function(e){t=t.filter((function(t){return t!==e}))},get:function(){return e},set:function(n,r){e=n,t.forEach((function(t){return t(e,r)}))}}}(t.props.value),t}Xe(t,e);var r=t.prototype;return r.getChildContext=function(){var e;return(e={})[o]=this.emitter,e},r.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var t,r=this.props.value,i=e.value;!function(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t}(r,i)?(t="function"===typeof n?n(r,i):Ro,0!==(t|=0)&&this.emitter.set(e.value,t)):t=0}},r.render=function(){return this.props.children},t}(e.Component);a.childContextTypes=((r={})[o]=io().object.isRequired,r);var s=function(e){function n(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).observedBits=void 0,t.state={value:t.getValue()},t.onUpdate=function(e,n){0!==((0|t.observedBits)&n)&&t.setState({value:t.getValue()})},t}Xe(n,e);var r=n.prototype;return r.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=void 0===t||null===t?Ro:t},r.componentDidMount=function(){this.context[o]&&this.context[o].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=void 0===e||null===e?Ro:e},r.componentWillUnmount=function(){this.context[o]&&this.context[o].off(this.onUpdate)},r.getValue=function(){return this.context[o]?this.context[o].get():t},r.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(e.Component);return s.contextTypes=((i={})[o]=io().object,i),{Provider:a,Consumer:s}},Mo=function(e){var t=Io();return t.displayName=e,t},Lo=Mo("Router-History"),Do=Mo("Router"),No=function(t){function n(e){var n;return(n=t.call(this,e)||this).state={location:e.history.location},n._isMounted=!1,n._pendingLocation=null,e.staticContext||(n.unlisten=e.history.listen((function(e){n._pendingLocation=e}))),n}Xe(n,t),n.computeRootMatch=function(e){return{path:"/",url:"/",params:{},isExact:"/"===e}};var r=n.prototype;return r.componentDidMount=function(){var e=this;this._isMounted=!0,this.unlisten&&this.unlisten(),this.props.staticContext||(this.unlisten=this.props.history.listen((function(t){e._isMounted&&e.setState({location:t})}))),this._pendingLocation&&this.setState({location:this._pendingLocation})},r.componentWillUnmount=function(){this.unlisten&&(this.unlisten(),this._isMounted=!1,this._pendingLocation=null)},r.render=function(){return e.createElement(Do.Provider,{value:{history:this.props.history,location:this.state.location,match:n.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},e.createElement(Lo.Provider,{children:this.props.children||null,value:this.props.history}))},n}(e.Component);e.Component;e.Component;var Fo={},Vo=0;function Uo(e,t){void 0===t&&(t={}),("string"===typeof t||Array.isArray(t))&&(t={path:t});var n=t,r=n.path,i=n.exact,o=void 0!==i&&i,a=n.strict,s=void 0!==a&&a,l=n.sensitive,c=void 0!==l&&l;return[].concat(r).reduce((function(t,n){if(!n&&""!==n)return null;if(t)return t;var r=function(e,t){var n=""+t.end+t.strict+t.sensitive,r=Fo[n]||(Fo[n]={});if(r[e])return r[e];var i=[],o={regexp:$o()(e,i,t),keys:i};return Vo<1e4&&(r[e]=o,Vo++),o}(n,{end:o,strict:s,sensitive:c}),i=r.regexp,a=r.keys,l=i.exec(e);if(!l)return null;var u=l[0],d=l.slice(1),f=e===u;return o&&!f?null:{path:n,url:"/"===n&&""===u?"/":u,isExact:f,params:a.reduce((function(e,t,n){return e[t.name]=d[n],e}),{})}}),null)}var Bo=function(t){function n(){return t.apply(this,arguments)||this}return Xe(n,t),n.prototype.render=function(){var t=this;return e.createElement(Do.Consumer,null,(function(n){n||co(!1);var r=t.props.location||n.location,i=Me({},n,{location:r,match:t.props.computedMatch?t.props.computedMatch:t.props.path?Uo(r.pathname,t.props):n.match}),o=t.props,a=o.children,s=o.component,l=o.render;return Array.isArray(a)&&function(t){return 0===e.Children.count(t)}(a)&&(a=null),e.createElement(Do.Provider,{value:i},i.match?a?"function"===typeof a?a(i):a:s?e.createElement(s,i):l?l(i):null:"function"===typeof a?a(i):null)}))},n}(e.Component);function Ho(e){return"/"===e.charAt(0)?e:"/"+e}function qo(e,t){if(!e)return t;var n=Ho(e);return 0!==t.pathname.indexOf(n)?t:Me({},t,{pathname:t.pathname.substr(n.length)})}function Wo(e){return"string"===typeof e?e:mo(e)}function Yo(e){return function(){co(!1)}}function Xo(){}e.Component;var Ko=function(t){function n(){return t.apply(this,arguments)||this}return Xe(n,t),n.prototype.render=function(){var t=this;return e.createElement(Do.Consumer,null,(function(n){n||co(!1);var r,i,o=t.props.location||n.location;return e.Children.forEach(t.props.children,(function(t){if(null==i&&e.isValidElement(t)){r=t;var a=t.props.path||t.props.from;i=a?Uo(o.pathname,Me({},t.props,{path:a})):n.match}})),i?e.cloneElement(r,{location:o,computedMatch:i}):null}))},n}(e.Component);var Go=e.useContext;function Jo(){return Go(Do).location}function Qo(){var e=Go(Do).match;return e?e.params:{}}var Zo=function(t){function n(){for(var e,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))||this).history=jo(e.props),e}return Xe(n,t),n.prototype.render=function(){return e.createElement(No,{history:this.history,children:this.props.children})},n}(e.Component);e.Component;var ea=function(e,t){return"function"===typeof e?e(t):e},ta=function(e,t){return"string"===typeof e?go(e,null,null,t):e},na=function(e){return e},ra=e.forwardRef;"undefined"===typeof ra&&(ra=na);var ia=ra((function(t,n){var r=t.innerRef,i=t.navigate,o=t.onClick,a=Le(t,["innerRef","navigate","onClick"]),s=a.target,l=Me({},a,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||s&&"_self"!==s||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),i())}});return l.ref=na!==ra&&n||r,e.createElement("a",l)}));var oa=ra((function(t,n){var r=t.component,i=void 0===r?ia:r,o=t.replace,a=t.to,s=t.innerRef,l=Le(t,["component","replace","to","innerRef"]);return e.createElement(Do.Consumer,null,(function(t){t||co(!1);var r=t.history,c=ta(ea(a,t.location),t.location),u=c?r.createHref(c):"",d=Me({},l,{href:u,navigate:function(){var e=ea(a,t.location),n=mo(t.location)===mo(ta(e));(o||n?r.replace:r.push)(e)}});return na!==ra?d.ref=n||s:d.innerRef=s,e.createElement(i,d)}))})),aa=function(e){return e},sa=e.forwardRef;"undefined"===typeof sa&&(sa=aa);sa((function(t,n){var r=t["aria-current"],i=void 0===r?"page":r,o=t.activeClassName,a=void 0===o?"active":o,s=t.activeStyle,l=t.className,c=t.exact,u=t.isActive,d=t.location,f=t.sensitive,p=t.strict,h=t.style,m=t.to,g=t.innerRef,v=Le(t,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return e.createElement(Do.Consumer,null,(function(t){t||co(!1);var r=d||t.location,o=ta(ea(m,r),r),y=o.pathname,b=y&&y.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),x=b?Uo(r.pathname,{path:b,exact:c,sensitive:f,strict:p}):null,w=!!(u?u(x,r):x),k="function"===typeof l?l(w):l,j="function"===typeof h?h(w):h;w&&(k=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(k,a),j=Me({},j,s));var S=Me({"aria-current":w&&i||null,className:k,style:j,to:o},v);return aa!==sa?S.ref=n||g:S.innerRef=g,e.createElement(oa,S)}))}));var la=n(579);const ca=_e`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`,ua=_e`
  0% { box-shadow: 0 0 0 0 rgba(30, 144, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(30, 144, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(30, 144, 255, 0); }
`,da=Ie.nav`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  /*
   * Dark navy glass — consistent with the dark aesthetic across every page.
   * The old rgba(128,128,128,0.5) read as muddy gray against the bg images.
   */
  background: rgba(10, 12, 22, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  justify-content: space-between;
  padding-left: 200px;
  z-index: 1000;

  @media (max-width: 1250px) {
    padding-left: 10px;
  }
`,fa=Ie.div`
  display: flex;
  align-items: center;
`,pa=Ie(oa)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  height: 100%;
`,ha=Ie.img`
  width: 60px;
  height: 60px;
  animation: ${ca} 3s ease-in-out infinite, ${ua} 2s infinite;
  transition: all 0.3s ease;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transform: ${e=>e.$ishovered?"scale(1.1)":"scale(1)"};
  filter: ${e=>e.$ishovered?"drop-shadow(0 0 8px #1e90ff)":"none"};
  margin-left: 4px;
  object-fit: cover;
  
  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`,ma=Ie.div`
  width: 60px;
  height: 60px;
  background: ${e=>e.$ishovered?"linear-gradient(135deg, #1e90ff, #0097e8)":"linear-gradient(135deg, #ffffff, #f8f9fa)"};
  color: ${e=>e.$ishovered?"white":"#1e90ff"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 4px;
  animation: ${ca} 3s ease-in-out infinite, ${ua} 2s infinite;
  transition: all 0.3s ease;
  border: 2px solid ${e=>e.$ishovered?"#1e90ff":"rgba(30, 144, 255, 0.3)"};
  transform: ${e=>e.$ishovered?"scale(1.1)":"scale(1)"};
  filter: ${e=>e.$ishovered?"drop-shadow(0 0 8px #1e90ff)":"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"};
  box-shadow: ${e=>e.$ishovered?"0 0 20px rgba(30, 144, 255, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.1)"};
  
  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`,ga=Ie.span`
  font-weight: 700;
  font-size: 20px;
  /* Use the display font (Syne) consistent with site headings */
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  letter-spacing: -0.5px;
  text-shadow: ${e=>e.$ishovered?"0 1px 2px rgba(0,0,0,0.1)":"none"};

  @media (max-width: 400px) {
    font-size: 18px;
  }
`,va=Ie.div`
  position: relative;
  display: inline-block;
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 400px) {
    padding-left: 60px;
  }
`,ya=Ie(no)`
  && {
    /* Syne for the logo wordmark — more character than Inter */
    font-family: var(--font-display, 'Syne', system-ui, sans-serif);
    font-weight: 700;
    font-size: 1.4em;
    letter-spacing: -0.01em;
    color: white;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
      font-size: 1.2em;
    }

    @media (max-width: 400px) {
      font-size: 1.05em;
    }
  }
`,ba=Ie(no)`
  && {
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    font-family: var(--font-display, 'Syne', system-ui, sans-serif);
    font-weight: 700;
    font-size: 1.4em;
    letter-spacing: -0.01em;
    /* Unified accent color */
    color: var(--color-accent, #0ea5e9);
    margin: 0;
    display: flex;
    align-items: center;
    clip-path: circle(30px at ${e=>e.$mouseX}px ${e=>e.$mouseY}px);
    opacity: ${e=>e.$ishovered?1:0};
    transition: opacity 0.2s ease;
    pointer-events: none;

    @media (max-width: 768px) {
      font-size: 1.2em;
    }

    @media (max-width: 400px) {
      font-size: 1.05em;
      left: 60px;
    }
  }
`,xa=()=>{const[t,n]=(0,e.useState)(!1),[r,i]=(0,e.useState)({x:0,y:0}),[o,a]=(0,e.useState)(!1),[s,l]=(0,e.useState)(!1),c=(0,e.useRef)(null);return(0,e.useEffect)((()=>{const e=e=>new Promise(((t,n)=>{const r=new Image;r.onload=()=>{console.log(`\u2705 Successfully loaded: ${e}`),t()},r.onerror=()=>{console.error(`\u274c Failed to load: ${e}`),n()},r.src=e})),t=[{white:"/images/mainwlogo.png",blue:"/images/mainblogo.png"},{white:"images/mainwlogo.png",blue:"images/mainblogo.png"},{white:"./images/mainwlogo.png",blue:"./images/mainblogo.png"},{white:"/images/logo-white.png",blue:"/images/logo-blue.png"},{white:"images/logo-white.png",blue:"images/logo-blue.png"},{white:"/images/mainwlogo.jpg",blue:"/images/mainblogo.jpg"},{white:"images/mainwlogo.jpg",blue:"images/mainblogo.jpg"}];(async()=>{for(const r of t)try{return await Promise.all([e(r.white),e(r.blue)]),console.log("\u2705 Found working logo paths:",r),l(!0),void a(!1)}catch(n){console.log("\u274c Failed paths:",r);continue}console.warn("\u26a0\ufe0f No logo images found, using fallback design"),a(!0),l(!1)})()}),[]),(0,la.jsx)(da,{children:(0,la.jsx)(fa,{children:(0,la.jsxs)(pa,{to:"/Home",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[o?(0,la.jsx)(ma,{$ishovered:t,children:(0,la.jsx)(ga,{$ishovered:t,children:"FC"})}):(0,la.jsx)(ha,{src:t?"images/mainblogo.png":"images/mainwlogo.png",alt:"Felipe Cantu Jr Logo",$ishovered:t,onLoad:()=>{l(!0),a(!1)},onError:()=>{console.warn("Logo image failed to load, using fallback"),a(!0),l(!1)},style:{opacity:s?1:0,transition:"all 0.3s ease"}}),(0,la.jsxs)(va,{ref:c,onMouseMove:e=>{if(c.current){const t=c.current.getBoundingClientRect();i({x:e.clientX-t.left,y:e.clientY-t.top})}},children:[(0,la.jsx)(ya,{children:"Felipe Cantu Jr"}),(0,la.jsx)(ba,{$ishovered:t,$mouseX:r.x,$mouseY:r.y,children:"Felipe Cantu Jr"})]})]})})})},wa=Ie.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;

  /* Desktop: fixed to the top-right of the viewport, matching the old Nav flex position */
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  padding: 0 10px 0 0;
  z-index: 1001;
  pointer-events: auto;

  @media (min-width: 1250px) {
    padding-right: 200px;
  }

  li {
    color: #fff;
    margin: 20px;
    position: relative;
  }

  li.contact-item {
    margin-left: 20px;
    padding: 1.5px;
  }

  /* Mobile: full-height slide-in drawer */
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: rgba(10, 12, 22, 0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.55);
    position: fixed;
    transform: ${e=>{let{open:t}=e;return t?"translateX(0)":"translateX(100%)"}};
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    padding: 5rem 0 2rem 0;
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 1300;

    li {
      padding: 0;
      width: 100%;
      margin: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    li.contact-item {
      margin-top: 1rem;
      margin-left: 0;
      padding: 0 1.5rem;
      border-bottom: none;
    }
  }
`,ka=Ie.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1.5rem 1.25rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    width: 100%;
  }
`,ja=Ie.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
`,Sa=Ie.span`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: -0.01em;
`,Ca=Ie(oa)`
  /*
   * DM Sans for nav links — pairs well with Syne headings,
   * less sterile than Arial which was set before.
   */
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent, #0ea5e9);
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.75);
    border-left: 2px solid transparent;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: white;
      background: rgba(14, 165, 233, 0.07);
      border-left-color: rgba(14, 165, 233, 0.7);
    }
  }
`,Ea=Ie(oa)`
  display: inline-block;
  background-color: var(--color-gold, #f7ab0a);
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  color: #1a1a1a;
  font-size: 0.88rem;
  font-weight: 700;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background-color: transparent;
    color: var(--color-gold, #f7ab0a);
    border-color: var(--color-gold, #f7ab0a);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(247, 171, 10, 0.22);
  }

  /*
   * Mobile: keep the pill style but adapt size/layout.
   * The old code stripped all button styles on mobile — replaced with
   * a full-width contained button that still reads as a CTA.
   */
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 0.85rem 1.5rem;
    border-radius: var(--radius-md, 12px);
    text-align: center;
    font-size: 1rem;
    background-color: var(--color-gold, #f7ab0a);
    color: #1a1a1a;
    border-color: transparent;

    &:hover {
      background-color: #e09c00;
      color: #1a1a1a;
      border-color: transparent;
      box-shadow: none;
      transform: none;
    }
  }
`,Ta=e=>{let{open:t,onClose:n}=e;return(0,la.jsx)("nav",{children:(0,la.jsxs)(wa,{id:"mobile-sidebar",open:t,children:[(0,la.jsxs)(ka,{children:[(0,la.jsx)(ja,{children:(0,la.jsx)("img",{src:"images/mainwlogo.png",alt:"FC Logo"})}),(0,la.jsx)(Sa,{children:"Felipe Cantu Jr"})]}),(0,la.jsx)("li",{children:(0,la.jsx)(Ca,{to:"/Home",children:"Home"})}),(0,la.jsx)("li",{children:(0,la.jsx)(Ca,{to:"/Blog",children:"Blogs"})}),(0,la.jsx)("li",{children:(0,la.jsx)(Ca,{to:"/Portfolio",children:"Portfolio"})}),(0,la.jsx)("li",{children:(0,la.jsx)(Ca,{to:"/about",children:"About"})}),(0,la.jsx)("li",{children:(0,la.jsx)(Ca,{to:"/Contact",children:"Contact"})}),(0,la.jsx)("li",{className:"contact-item",children:(0,la.jsx)(Ea,{to:"/get-started",children:"Get Started"})})]})})};var Pa={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Oa=e.createContext&&e.createContext(Pa),Aa=function(){return Aa=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},Aa.apply(this,arguments)},za=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n};function $a(t){return t&&t.map((function(t,n){return e.createElement(t.tag,Aa({key:n},t.attr),$a(t.child))}))}function Ra(t){return function(n){return e.createElement(_a,Aa({attr:Aa({},t.attr)},n),$a(t.child))}}function _a(t){var n=function(n){var r,i=t.attr,o=t.size,a=t.title,s=za(t,["attr","size","title"]),l=o||n.size||"1em";return n.className&&(r=n.className),t.className&&(r=(r?r+" ":"")+t.className),e.createElement("svg",Aa({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,i,s,{className:r,style:Aa(Aa({color:t.color||n.color},n.style),t.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),a&&e.createElement("title",null,a),t.children)};return void 0!==Oa?e.createElement(Oa.Consumer,null,(function(e){return n(e)})):n(Pa)}function Ia(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"}}]})(e)}function Ma(e){return Ra({tag:"svg",attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}}]})(e)}function La(e){return Ra({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"}}]})(e)}function Da(e){return Ra({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"}}]})(e)}function Na(e){return Ra({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"}}]})(e)}function Fa(e){return Ra({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"}}]})(e)}function Va(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"}}]})(e)}function Ua(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"}}]})(e)}var Ba=n(366),Ha=n.n(Ba),qa=n(740),Wa=n.n(qa);function Ya(){return Ya=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ya.apply(this,arguments)}function Xa(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ka(e,t)}function Ka(e,t){return Ka=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},Ka(e,t)}function Ga(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t.indexOf(n=o[r])>=0||(i[n]=e[n]);return i}var Ja={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},Qa={rel:["amphtml","canonical","alternate"]},Za={type:["application/ld+json"]},es={charset:"",name:["robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]},ts=Object.keys(Ja).map((function(e){return Ja[e]})),ns={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},rs=Object.keys(ns).reduce((function(e,t){return e[ns[t]]=t,e}),{}),is=function(e,t){for(var n=e.length-1;n>=0;n-=1){var r=e[n];if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},os=function(e){var t=is(e,Ja.TITLE),n=is(e,"titleTemplate");if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,(function(){return t}));var r=is(e,"defaultTitle");return t||r||void 0},as=function(e){return is(e,"onChangeClientState")||function(){}},ss=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return Ya({},e,t)}),{})},ls=function(e,t){return t.filter((function(e){return void 0!==e[Ja.BASE]})).map((function(e){return e[Ja.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),i=0;i<r.length;i+=1){var o=r[i].toLowerCase();if(-1!==e.indexOf(o)&&n[o])return t.concat(n)}return t}),[])},cs=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&console&&"function"==typeof console.warn&&console.warn("Helmet: "+e+' should be of type "Array". Instead found type "'+typeof t[e]+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var i={};n.filter((function(e){for(var n,o=Object.keys(e),a=0;a<o.length;a+=1){var s=o[a],l=s.toLowerCase();-1===t.indexOf(l)||"rel"===n&&"canonical"===e[n].toLowerCase()||"rel"===l&&"stylesheet"===e[l].toLowerCase()||(n=l),-1===t.indexOf(s)||"innerHTML"!==s&&"cssText"!==s&&"itemprop"!==s||(n=s)}if(!n||!e[n])return!1;var c=e[n].toLowerCase();return r[n]||(r[n]={}),i[n]||(i[n]={}),!r[n][c]&&(i[n][c]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var o=Object.keys(i),a=0;a<o.length;a+=1){var s=o[a],l=Ya({},r[s],i[s]);r[s]=l}return e}),[]).reverse()},us=function(e,t){if(Array.isArray(e)&&e.length)for(var n=0;n<e.length;n+=1)if(e[n][t])return!0;return!1},ds=function(e){return Array.isArray(e)?e.join(""):e},fs=function(e,t){return Array.isArray(e)?e.reduce((function(e,n){return function(e,t){for(var n=Object.keys(e),r=0;r<n.length;r+=1)if(t[n[r]]&&t[n[r]].includes(e[n[r]]))return!0;return!1}(n,t)?e.priority.push(n):e.default.push(n),e}),{priority:[],default:[]}):{default:e}},ps=function(e,t){var n;return Ya({},e,((n={})[t]=void 0,n))},hs=[Ja.NOSCRIPT,Ja.SCRIPT,Ja.STYLE],ms=function(e,t){return void 0===t&&(t=!0),!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},gs=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},vs=function(e,t){return void 0===t&&(t={}),Object.keys(e).reduce((function(t,n){return t[ns[n]||n]=e[n],t}),t)},ys=function(t,n){return n.map((function(n,r){var i,o=((i={key:r})["data-rh"]=!0,i);return Object.keys(n).forEach((function(e){var t=ns[e]||e;"innerHTML"===t||"cssText"===t?o.dangerouslySetInnerHTML={__html:n.innerHTML||n.cssText}:o[t]=n[e]})),e.createElement(t,o)}))},bs=function(t,n,r){switch(t){case Ja.TITLE:return{toComponent:function(){return r=n.titleAttributes,(i={key:t=n.title})["data-rh"]=!0,o=vs(r,i),[e.createElement(Ja.TITLE,o,t)];var t,r,i,o},toString:function(){return function(e,t,n,r){var i=gs(n),o=ds(t);return i?"<"+e+' data-rh="true" '+i+">"+ms(o,r)+"</"+e+">":"<"+e+' data-rh="true">'+ms(o,r)+"</"+e+">"}(t,n.title,n.titleAttributes,r)}};case"bodyAttributes":case"htmlAttributes":return{toComponent:function(){return vs(n)},toString:function(){return gs(n)}};default:return{toComponent:function(){return ys(t,n)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var i=Object.keys(r).filter((function(e){return!("innerHTML"===e||"cssText"===e)})).reduce((function(e,t){var i=void 0===r[t]?t:t+'="'+ms(r[t],n)+'"';return e?e+" "+i:i}),""),o=r.innerHTML||r.cssText||"",a=-1===hs.indexOf(e);return t+"<"+e+' data-rh="true" '+i+(a?"/>":">"+o+"</"+e+">")}),"")}(t,n,r)}}}},xs=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,i=e.htmlAttributes,o=e.noscriptTags,a=e.styleTags,s=e.title,l=void 0===s?"":s,c=e.titleAttributes,u=e.linkTags,d=e.metaTags,f=e.scriptTags,p={toComponent:function(){},toString:function(){return""}};if(e.prioritizeSeoTags){var h=function(e){var t=e.linkTags,n=e.scriptTags,r=e.encode,i=fs(e.metaTags,es),o=fs(t,Qa),a=fs(n,Za);return{priorityMethods:{toComponent:function(){return[].concat(ys(Ja.META,i.priority),ys(Ja.LINK,o.priority),ys(Ja.SCRIPT,a.priority))},toString:function(){return bs(Ja.META,i.priority,r)+" "+bs(Ja.LINK,o.priority,r)+" "+bs(Ja.SCRIPT,a.priority,r)}},metaTags:i.default,linkTags:o.default,scriptTags:a.default}}(e);p=h.priorityMethods,u=h.linkTags,d=h.metaTags,f=h.scriptTags}return{priority:p,base:bs(Ja.BASE,t,r),bodyAttributes:bs("bodyAttributes",n,r),htmlAttributes:bs("htmlAttributes",i,r),link:bs(Ja.LINK,u,r),meta:bs(Ja.META,d,r),noscript:bs(Ja.NOSCRIPT,o,r),script:bs(Ja.SCRIPT,f,r),style:bs(Ja.STYLE,a,r),title:bs(Ja.TITLE,{title:l,titleAttributes:c},r)}},ws=[],ks=function(e,t){var n=this;void 0===t&&(t="undefined"!=typeof document),this.instances=[],this.value={setHelmet:function(e){n.context.helmet=e},helmetInstances:{get:function(){return n.canUseDOM?ws:n.instances},add:function(e){(n.canUseDOM?ws:n.instances).push(e)},remove:function(e){var t=(n.canUseDOM?ws:n.instances).indexOf(e);(n.canUseDOM?ws:n.instances).splice(t,1)}}},this.context=e,this.canUseDOM=t,t||(e.helmet=xs({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))},js=e.createContext({}),Ss=io().shape({setHelmet:io().func,helmetInstances:io().shape({get:io().func,add:io().func,remove:io().func})}),Cs="undefined"!=typeof document,Es=function(t){function n(e){var r;return(r=t.call(this,e)||this).helmetData=new ks(r.props.context,n.canUseDOM),r}return Xa(n,t),n.prototype.render=function(){return e.createElement(js.Provider,{value:this.helmetData.value},this.props.children)},n}(e.Component);Es.canUseDOM=Cs,Es.propTypes={context:io().shape({helmet:io().shape()}),children:io().node.isRequired},Es.defaultProps={context:{}},Es.displayName="HelmetProvider";var Ts=function(e,t){var n,r=document.head||document.querySelector(Ja.HEAD),i=r.querySelectorAll(e+"[data-rh]"),o=[].slice.call(i),a=[];return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&("innerHTML"===i?r.innerHTML=t.innerHTML:"cssText"===i?r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText)):r.setAttribute(i,void 0===t[i]?"":t[i]));r.setAttribute("data-rh","true"),o.some((function(e,t){return n=t,r.isEqualNode(e)}))?o.splice(n,1):a.push(r)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return r.appendChild(e)})),{oldTags:o,newTags:a}},Ps=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute("data-rh"),i=r?r.split(","):[],o=[].concat(i),a=Object.keys(t),s=0;s<a.length;s+=1){var l=a[s],c=t[l]||"";n.getAttribute(l)!==c&&n.setAttribute(l,c),-1===i.indexOf(l)&&i.push(l);var u=o.indexOf(l);-1!==u&&o.splice(u,1)}for(var d=o.length-1;d>=0;d-=1)n.removeAttribute(o[d]);i.length===o.length?n.removeAttribute("data-rh"):n.getAttribute("data-rh")!==a.join(",")&&n.setAttribute("data-rh",a.join(","))}},Os=function(e,t){var n=e.baseTag,r=e.htmlAttributes,i=e.linkTags,o=e.metaTags,a=e.noscriptTags,s=e.onChangeClientState,l=e.scriptTags,c=e.styleTags,u=e.title,d=e.titleAttributes;Ps(Ja.BODY,e.bodyAttributes),Ps(Ja.HTML,r),function(e,t){void 0!==e&&document.title!==e&&(document.title=ds(e)),Ps(Ja.TITLE,t)}(u,d);var f={baseTag:Ts(Ja.BASE,n),linkTags:Ts(Ja.LINK,i),metaTags:Ts(Ja.META,o),noscriptTags:Ts(Ja.NOSCRIPT,a),scriptTags:Ts(Ja.SCRIPT,l),styleTags:Ts(Ja.STYLE,c)},p={},h={};Object.keys(f).forEach((function(e){var t=f[e],n=t.newTags,r=t.oldTags;n.length&&(p[e]=n),r.length&&(h[e]=f[e].oldTags)})),t&&t(),s(e,p,h)},As=null,zs=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).rendered=!1,t}Xa(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(e){return!o()(e,this.props)},n.componentDidUpdate=function(){this.emitChange()},n.componentWillUnmount=function(){this.props.context.helmetInstances.remove(this),this.emitChange()},n.emitChange=function(){var e,t,n=this.props.context,r=n.setHelmet,i=null,o=(e=n.helmetInstances.get().map((function(e){var t=Ya({},e.props);return delete t.context,t})),{baseTag:ls(["href"],e),bodyAttributes:ss("bodyAttributes",e),defer:is(e,"defer"),encode:is(e,"encodeSpecialCharacters"),htmlAttributes:ss("htmlAttributes",e),linkTags:cs(Ja.LINK,["rel","href"],e),metaTags:cs(Ja.META,["name","charset","http-equiv","property","itemprop"],e),noscriptTags:cs(Ja.NOSCRIPT,["innerHTML"],e),onChangeClientState:as(e),scriptTags:cs(Ja.SCRIPT,["src","innerHTML"],e),styleTags:cs(Ja.STYLE,["cssText"],e),title:os(e),titleAttributes:ss("titleAttributes",e),prioritizeSeoTags:us(e,"prioritizeSeoTags")});Es.canUseDOM?(t=o,As&&cancelAnimationFrame(As),t.defer?As=requestAnimationFrame((function(){Os(t,(function(){As=null}))})):(Os(t),As=null)):xs&&(i=xs(o)),r(i)},n.init=function(){this.rendered||(this.rendered=!0,this.props.context.helmetInstances.add(this),this.emitChange())},n.render=function(){return this.init(),null},t}(e.Component);zs.propTypes={context:Ss.isRequired},zs.displayName="HelmetDispatcher";var $s=["children"],Rs=["children"],_s=function(t){function n(){return t.apply(this,arguments)||this}Xa(n,t);var r=n.prototype;return r.shouldComponentUpdate=function(e){return!Ha()(ps(this.props,"helmetData"),ps(e,"helmetData"))},r.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case Ja.SCRIPT:case Ja.NOSCRIPT:return{innerHTML:t};case Ja.STYLE:return{cssText:t};default:throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")}},r.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren;return Ya({},r,((t={})[n.type]=[].concat(r[n.type]||[],[Ya({},e.newChildProps,this.mapNestedChildrenToProps(n,e.nestedChildren))]),t))},r.mapObjectTypeChildren=function(e){var t,n,r=e.child,i=e.newProps,o=e.newChildProps,a=e.nestedChildren;switch(r.type){case Ja.TITLE:return Ya({},i,((t={})[r.type]=a,t.titleAttributes=Ya({},o),t));case Ja.BODY:return Ya({},i,{bodyAttributes:Ya({},o)});case Ja.HTML:return Ya({},i,{htmlAttributes:Ya({},o)});default:return Ya({},i,((n={})[r.type]=Ya({},o),n))}},r.mapArrayTypeChildrenToProps=function(e,t){var n=Ya({},t);return Object.keys(e).forEach((function(t){var r;n=Ya({},n,((r={})[t]=e[t],r))})),n},r.warnOnInvalidChildren=function(e,t){return Wa()(ts.some((function(t){return e.type===t})),"function"==typeof e.type?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":"Only elements types "+ts.join(", ")+" are allowed. Helmet does not support rendering <"+e.type+"> elements. Refer to our API for more information."),Wa()(!t||"string"==typeof t||Array.isArray(t)&&!t.some((function(e){return"string"!=typeof e})),"Helmet expects a string as a child of <"+e.type+">. Did you forget to wrap your children in braces? ( <"+e.type+">{``}</"+e.type+"> ) Refer to our API for more information."),!0},r.mapChildrenToProps=function(t,n){var r=this,i={};return e.Children.forEach(t,(function(e){if(e&&e.props){var t=e.props,o=t.children,a=Ga(t,$s),s=Object.keys(a).reduce((function(e,t){return e[rs[t]||t]=a[t],e}),{}),l=e.type;switch("symbol"==typeof l?l=l.toString():r.warnOnInvalidChildren(e,o),l){case Ja.FRAGMENT:n=r.mapChildrenToProps(o,n);break;case Ja.LINK:case Ja.META:case Ja.NOSCRIPT:case Ja.SCRIPT:case Ja.STYLE:i=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:i,newChildProps:s,nestedChildren:o});break;default:n=r.mapObjectTypeChildren({child:e,newProps:n,newChildProps:s,nestedChildren:o})}}})),this.mapArrayTypeChildrenToProps(i,n)},r.render=function(){var t=this.props,n=t.children,r=Ga(t,Rs),i=Ya({},r),o=r.helmetData;return n&&(i=this.mapChildrenToProps(n,i)),!o||o instanceof ks||(o=new ks(o.context,o.instances)),o?e.createElement(zs,Ya({},i,{context:o.value,helmetData:void 0})):e.createElement(js.Consumer,null,(function(t){return e.createElement(zs,Ya({},i,{context:t}))}))},n}(e.Component);_s.propTypes={base:io().object,bodyAttributes:io().object,children:io().oneOfType([io().arrayOf(io().node),io().node]),defaultTitle:io().string,defer:io().bool,encodeSpecialCharacters:io().bool,htmlAttributes:io().object,link:io().arrayOf(io().object),meta:io().arrayOf(io().object),noscript:io().arrayOf(io().object),onChangeClientState:io().func,script:io().arrayOf(io().object),style:io().arrayOf(io().object),title:io().string,titleAttributes:io().object,titleTemplate:io().string,prioritizeSeoTags:io().bool,helmetData:io().object},_s.defaultProps={defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1},_s.displayName="Helmet";const Is=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"undefined"!==typeof window&&window.gtag&&window.gtag("event",e,t)};const Ms=_e`
  0% { transform: rotate(0deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(-360deg); }
`,Ls=_e`
  0% { transform: rotate(0deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(var(--radiusX)) translateY(var(--radiusY)) rotate(360deg); }
`,Ds=_e`
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.1; }
`,Ns=_e`
  0% { transform: scale(0.8); opacity: 0.8; }
  70% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(0.8); opacity: 0; }
`,Fs=_e`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`,Vs=_e`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(-360deg); }
`,Us=_e`
  0% { 
    opacity: 0; 
    transform: scale(0.5) rotate(-10deg);
  }
  100% { 
    opacity: 1; 
    transform: scale(1) rotate(0deg);
  }
`,Bs=_e`
  0% { 
    opacity: 0; 
    transform: translateY(60px);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0);
  }
`,Hs=_e`
  0% { 
    opacity: 0; 
    transform: translateX(-60px);
  }
  100% { 
    opacity: 1; 
    transform: translateX(0);
  }
`,qs=_e`
  0% { 
    opacity: 0; 
    transform: scale(0) translateY(20px);
  }
  50% {
    transform: scale(1.1) translateY(-5px);
  }
  100% { 
    opacity: 1; 
    transform: scale(1) translateY(0);
  }
`,Ws=_e`
  0% { 
    transform: scale(1.2);
    filter: blur(10px);
  }
  100% { 
    transform: scale(1);
    filter: blur(0px);
  }
`,Ys=Ie.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`,Xs=Ie.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  animation: ${Ws} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Ks=Ie.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 30, 0.85);
  padding: 2rem;
  position: relative;
  animation: fadeIn 0.8s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,Gs=Ie.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`,Js=Ie.div`
  position: absolute;
  width: ${e=>e.size};
  height: ${e=>e.size};
  border: ${e=>e.border};
  border-radius: 50%;
  opacity: ${e=>e.opacity||.2};
  /*
   * Removed margin-top: 13rem — it was pushing the ring group far below
   * the visual center of the hero. These are absolutely positioned within
   * PulsingCircles which is itself centered with translate(-50%, -50%).
   */
  animation: ${e=>"ping"===e.animation?Ns:"rotate"===e.animation?e.reverse?Vs:Fs:Ds}
    ${e=>e.duration||"2.5s"}
    ${e=>"ping"===e.animation?"ease-out":"linear"}
    infinite;

  /* Respect user's motion preference */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Qs=Ie.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
`,Zs=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 2rem;
  z-index: 2;
  position: relative;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: center;
    gap: 4rem;
  }
`,el=Ie.div`
  position: absolute;
  width: ${e=>e.width};
  height: ${e=>e.height};
  border: ${e=>e.border};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${e=>e.reverse?Vs:Fs} 
    ${e=>e.duration||"30s"} linear infinite;
  opacity: ${e=>e.opacity||.5};
`,tl=Ie.div`
  position: absolute;
  width: 100%;
  height: 100%;
`,nl=Ie.div`
  position: absolute;
  width: ${e=>e.size};
  height: ${e=>e.size};
  background: ${e=>e.color||"radial-gradient(circle, #1e90ff, #00bfff)"};
  border-radius: 50%;
  --radiusX: ${e=>e.radiusX};
  --radiusY: ${e=>e.radiusY};
  animation: ${e=>e.reverse?Ls:Ms} 
    ${e=>e.duration} linear infinite;
  animation-delay: ${e=>e.delay};
  box-shadow: 0 0 20px ${e=>e.color||"rgba(30, 144, 255, 0.7)"};
  z-index: 1;
`,rl=Ie.div`
  position: absolute;
  width: ${e=>e.size||"8px"};
  height: ${e=>e.size||"8px"};
  background: white;
  border-radius: 50%;
  --radiusX: ${e=>e.radiusX};
  --radiusY: ${e=>e.radiusY};
  animation: ${e=>e.reverse?Ls:Ms} 
    ${e=>e.duration} linear infinite;
  animation-delay: ${e=>e.delay};
  box-shadow: ${e=>e.glow||"0 0 10px white"};
  z-index: 1;
`,il=Ie.div`
  position: relative;
  width: 220px;
  height: 250px;
  z-index: 2;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: linear-gradient(135deg, rgba(0,191,255,0.3), rgba(30,144,255,0.1));
  padding: 8px;
  animation: ${Us} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`,ol=Ie.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  filter: sepia(0.1) brightness(1.05);
  transition: all 0.4s ease;
  
  &:hover {
    transform: scale(1.03) rotate(2deg);
    filter: sepia(0) brightness(1.1);
  }
`,al=Ie.div`
  max-width: 560px;
  color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  animation: ${Hs} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
`,sl=Ie.h1`
  /*
   * Syne at this size has just enough quirk to be memorable.
   * Gradient anchors at the accent blue and fades to pure white —
   * matches the color system in index.css.
   */
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  background: linear-gradient(110deg, var(--color-accent-light, #38bdf8) 0%, #ffffff 55%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${Bs} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s backwards;
`,ll=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  font-weight: 300;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.80);
  animation: ${Bs} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards;
`,cl=Ie(oa)`
  /*
   * Replaced float:right (broken in a flex column context) with
   * align-self so it naturally left-aligns under the description
   * text while still sitting at the end of the flex column flow.
   */
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  margin-top: 1.5rem;
  padding: 0.55rem 1.25rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-accent-light, #38bdf8);
  text-decoration: none;
  border: 1.5px solid rgba(14, 165, 233, 0.38);
  border-radius: 9999px;
  background: rgba(14, 165, 233, 0.08);
  transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.22s ease;

  &:hover {
    background: rgba(14, 165, 233, 0.18);
    border-color: var(--color-accent, #0ea5e9);
    color: white;
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`,ul=Ie.div`
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  display: flex;
  gap: 1.25rem;
  z-index: 3;
  /*
   * Padding gives the box-shadow glow on each icon room to render
   * without being clipped by Main's overflow:hidden. The bottom/right
   * values account for the absolute positioning offset so the visual
   * placement stays identical.
   */
  padding: 12px;
  margin: -12px;

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    margin-left: -12px;
    margin-right: -12px;
    justify-content: center;
  }
`,dl=Ie.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  animation: ${qs} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;

  &:nth-child(1) { animation-delay: 1.1s; }
  &:nth-child(2) { animation-delay: 1.25s; }
  &:nth-child(3) { animation-delay: 1.4s; }
  &:nth-child(4) { animation-delay: 1.55s; }

  &:hover {
    color: white;
    transform: translateY(-4px);
    background: ${e=>{let{href:t}=e;return t.includes("linkedin")?"rgba(0, 119, 181, 0.35)":t.includes("github")?"rgba(110, 84, 148, 0.35)":t.includes("instagram")?"rgba(225, 48, 108, 0.35)":"rgba(24, 119, 242, 0.35)"}};
    border-color: ${e=>{let{href:t}=e;return t.includes("linkedin")?"rgba(0, 119, 181, 0.7)":t.includes("github")?"rgba(110, 84, 148, 0.7)":t.includes("instagram")?"rgba(225, 48, 108, 0.7)":"rgba(24, 119, 242, 0.7)"}};
    box-shadow: ${e=>{let{href:t}=e;return t.includes("linkedin")?"0 4px 16px rgba(0, 119, 181, 0.25)":t.includes("github")?"0 4px 16px rgba(110, 84, 148, 0.25)":t.includes("instagram")?"0 4px 16px rgba(225, 48, 108, 0.25)":"0 4px 16px rgba(24, 119, 242, 0.25)"}};
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`,fl=function(){return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"Felipe Cantu Jr \u2014 Full Stack Web Developer"}),(0,la.jsx)("meta",{name:"description",content:"Full Stack Developer based in Dallas, TX. I build fast, modern web apps and websites for businesses \u2014 React, Node.js, and clean design. Available for freelance."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/"}),(0,la.jsx)("meta",{property:"og:title",content:"Felipe Cantu Jr \u2014 Full Stack Web Developer"}),(0,la.jsx)("meta",{property:"og:description",content:"Full Stack Developer based in Dallas, TX. Building modern web apps. Available for freelance projects."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsxs)(Ys,{children:[(0,la.jsx)(Xs,{src:"images/mainbg.jpg",alt:"Background"}),(0,la.jsxs)(Ks,{children:[(0,la.jsxs)(Gs,{children:[(0,la.jsx)(Js,{size:"200px",border:"2px solid rgba(247, 171, 10, 0.5)",animation:"ping"}),(0,la.jsx)(Js,{size:"300px",border:"2px solid rgba(51, 51, 51, 0.7)",animation:"rotate",duration:"40s"}),(0,la.jsx)(Js,{size:"500px",border:"3px solid rgba(51, 51, 51, 0.5)",animation:"rotate",duration:"60s",reverse:!0}),(0,la.jsx)(Js,{size:"650px",border:"4px solid rgba(247, 171, 10, 0.3)",opacity:"0.3",animation:"rotate",duration:"80s"}),(0,la.jsx)(Js,{size:"800px",border:"3px solid rgba(51, 51, 51, 0.4)",animation:"rotate",duration:"100s",reverse:!0}),(0,la.jsx)(Js,{size:"1200px",border:"4px solid rgba(247, 171, 10, 0.2)",opacity:"0.15",animation:"rotate",duration:"150s"})]}),(0,la.jsxs)(Qs,{children:[(0,la.jsx)(el,{width:"1100px",height:"900px",border:"3px dotted rgba(100, 200, 255, 0.2)",animation:"rotate",duration:"120s",reverse:!0}),(0,la.jsx)(el,{width:"600px",height:"400px",border:"2px dashed rgba(100, 200, 255, 0.4)",animation:"rotate",duration:"50s"}),(0,la.jsx)(el,{width:"450px",height:"300px",border:"2px dotted rgba(255, 255, 255, 0.3)",animation:"rotate",duration:"40s",reverse:!0}),(0,la.jsx)(el,{width:"300px",height:"200px",border:"2px solid rgba(0, 191, 255, 0.25)",animation:"rotate",duration:"30s"}),(0,la.jsxs)(tl,{children:[(0,la.jsx)(nl,{delay:"0s",size:"20px",radiusX:"550px",radiusY:"450px",duration:"60s",color:"rgba(247, 171, 10, 0.7)"}),(0,la.jsx)(nl,{delay:"30s",size:"16px",radiusX:"550px",radiusY:"450px",duration:"60s",reverse:!0,color:"rgba(100, 200, 255, 0.7)"}),(0,la.jsx)(nl,{delay:"0s",size:"16px",radiusX:"280px",radiusY:"180px",duration:"30s",color:"rgba(30, 144, 255, 0.9)"}),(0,la.jsx)(nl,{delay:"10s",size:"12px",radiusX:"280px",radiusY:"180px",duration:"30s",reverse:!0,color:"rgba(247, 171, 10, 0.8)"}),(0,la.jsx)(nl,{delay:"3s",size:"14px",radiusX:"200px",radiusY:"130px",duration:"25s",color:"rgba(100, 200, 255, 0.8)"}),(0,la.jsx)(nl,{delay:"7s",size:"10px",radiusX:"200px",radiusY:"130px",duration:"25s",reverse:!0,color:"rgba(255, 255, 255, 0.8)"}),(0,la.jsx)(nl,{delay:"5s",size:"12px",radiusX:"120px",radiusY:"80px",duration:"20s",color:"rgba(0, 191, 255, 0.8)"}),(0,la.jsx)(nl,{delay:"2s",size:"18px",radiusX:"120px",radiusY:"80px",duration:"20s",reverse:!0,color:"rgba(247, 171, 10, 0.8)"}),(0,la.jsx)(rl,{delay:"0s",radiusX:"300px",radiusY:"200px",duration:"35s",size:"10px",glow:"0 0 15px rgba(255, 255, 255, 0.8)"}),(0,la.jsx)(rl,{delay:"5s",radiusX:"300px",radiusY:"200px",duration:"35s",reverse:!0,size:"10px",glow:"0 0 15px rgba(100, 200, 255, 0.8)"}),(0,la.jsx)(rl,{delay:"2s",radiusX:"220px",radiusY:"150px",duration:"28s",size:"8px",glow:"0 0 12px rgba(247, 171, 10, 0.8)"}),(0,la.jsx)(rl,{delay:"7s",radiusX:"220px",radiusY:"150px",duration:"28s",reverse:!0,size:"8px",glow:"0 0 12px rgba(255, 255, 255, 0.8)"}),(0,la.jsx)(rl,{delay:"4s",radiusX:"150px",radiusY:"100px",duration:"22s",size:"6px",glow:"0 0 10px rgba(0, 191, 255, 0.8)"})]})]}),(0,la.jsxs)(Zs,{children:[(0,la.jsx)(il,{children:(0,la.jsx)(ol,{src:"images/avatarpic.png",alt:"Profile"})}),(0,la.jsxs)(al,{children:[(0,la.jsx)(sl,{children:"Full Stack Web Developer"}),(0,la.jsx)(ll,{children:"As a Full Stack Developer, I am a highly motivated tech enthusiast and skilled problem solver with expertise in both front-end and back-end development."}),(0,la.jsx)(cl,{to:"/about",onClick:()=>Is("cta_click",{label:"learn_more"}),children:"Learn more \xa0\u2192"})]})]}),(0,la.jsxs)(ul,{children:[(0,la.jsx)(dl,{href:"https://github.com/FelipeCantu",target:"_blank",onClick:()=>Is("social_click",{platform:"github"}),children:(0,la.jsx)(Ma,{})}),(0,la.jsx)(dl,{href:"https://linkedin.com/in/felipe-cantu-jr",target:"_blank",onClick:()=>Is("social_click",{platform:"linkedin"}),children:(0,la.jsx)(Da,{})}),(0,la.jsx)(dl,{href:"https://instagram.com/son_of_robot_",target:"_blank",onClick:()=>Is("social_click",{platform:"instagram"}),children:(0,la.jsx)(La,{})}),(0,la.jsx)(dl,{href:"https://facebook.com/profile.php?id=100064306140476",target:"_blank",onClick:()=>Is("social_click",{platform:"facebook"}),children:(0,la.jsx)(Ia,{})})]})]})]})]})},pl=!(typeof navigator>"u")&&"ReactNative"===navigator.product,hl={timeout:pl?6e4:12e4},ml=function(e){const t={...hl,..."string"==typeof e?{url:e}:e};if(t.timeout=vl(t.timeout),t.query){const{url:e,searchParams:n}=function(e){const t=e.indexOf("?");if(-1===t)return{url:e,searchParams:new URLSearchParams};const n=e.slice(0,t),r=e.slice(t+1);if(!pl)return{url:n,searchParams:new URLSearchParams(r)};if("function"!=typeof decodeURIComponent)throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");const i=new URLSearchParams;for(const o of r.split("&")){const[e,t]=o.split("=");e&&i.append(gl(e),gl(t||""))}return{url:n,searchParams:i}}(t.url);for(const[r,i]of Object.entries(t.query)){if(void 0!==i)if(Array.isArray(i))for(const e of i)n.append(r,e);else n.append(r,i);const o=n.toString();o&&(t.url=`${e}?${o}`)}}return t.method=t.body&&!t.method?"POST":(t.method||"GET").toUpperCase(),t};function gl(e){return decodeURIComponent(e.replace(/\+/g," "))}function vl(e){if(!1===e||0===e)return!1;if(e.connect||e.socket)return e;const t=Number(e);return isNaN(t)?vl(hl.timeout):{connect:t,socket:t}}const yl=/^https?:\/\//i,bl=function(e){if(!yl.test(e.url))throw new Error(`"${e.url}" is not a valid URL`)};function xl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}const wl=["request","response","progress","error","abort"],kl=["processOptions","validateOptions","interceptRequest","finalizeOptions","onRequest","onResponse","onError","onReturn","onHeaders"];function jl(e,t){const n=[],r=kl.reduce(((e,t)=>(e[t]=e[t]||[],e)),{processOptions:[ml],validateOptions:[bl]});function i(e){const n=wl.reduce(((e,t)=>(e[t]=function(){const e=Object.create(null);let t=0;return{publish:function(t){for(const n in e)e[n](t)},subscribe:function(n){const r=t++;return e[r]=n,function(){delete e[r]}}}}(),e)),{}),i=(e=>function(t,n){const r="onError"===t;let i=n;for(var o=arguments.length,a=new Array(o>2?o-2:0),s=2;s<o;s++)a[s-2]=arguments[s];for(let l=0;l<e[t].length&&(i=(0,e[t][l])(i,...a),!r||i);l++);return i})(r),o=i("processOptions",e);i("validateOptions",o);const a={options:o,channels:n,applyMiddleware:i};let s;const l=n.request.subscribe((e=>{s=t(e,((t,r)=>((e,t,r)=>{let o=e,a=t;if(!o)try{a=i("onResponse",t,r)}catch(e){a=null,o=e}o=o&&i("onError",o,r),o?n.error.publish(o):a&&n.response.publish(a)})(t,r,e)))}));n.abort.subscribe((()=>{l(),s&&s.abort()}));const c=i("onReturn",n,a);return c===n&&n.request.publish(a),c}return i.use=function(e){if(!e)throw new Error("Tried to add middleware that resolved to falsey value");if("function"==typeof e)throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");if(e.onReturn&&r.onReturn.length>0)throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");return kl.forEach((t=>{e[t]&&r[t].push(e[t])})),n.push(e),i},i.clone=()=>jl(n,t),e.forEach(i.use),i}var Sl,Cl,El=xl(function(){if(Cl)return Sl;Cl=1;var e=function(e){return e.replace(/^\s+|\s+$/g,"")};return Sl=function(t){if(!t)return{};for(var n={},r=e(t).split("\n"),i=0;i<r.length;i++){var o=r[i],a=o.indexOf(":"),s=e(o.slice(0,a)).toLowerCase(),l=e(o.slice(a+1));typeof n[s]>"u"?n[s]=l:(c=n[s],"[object Array]"===Object.prototype.toString.call(c)?n[s].push(l):n[s]=[n[s],l])}var c;return n}}());class Tl{onabort;onerror;onreadystatechange;ontimeout;readyState=0;response;responseText="";responseType="";status;statusText;withCredentials;#e;#t;#n;#r={};#i;#o={};#a;open(e,t,n){this.#e=e,this.#t=t,this.#n="",this.readyState=1,this.onreadystatechange?.(),this.#i=void 0}abort(){this.#i&&this.#i.abort()}getAllResponseHeaders(){return this.#n}setRequestHeader(e,t){this.#r[e]=t}setInit(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.#o=e,this.#a=t}send(e){const t="arraybuffer"!==this.responseType,n={...this.#o,method:this.#e,headers:this.#r,body:e};"function"==typeof AbortController&&this.#a&&(this.#i=new AbortController,typeof EventTarget<"u"&&this.#i.signal instanceof EventTarget&&(n.signal=this.#i.signal)),typeof document<"u"&&(n.credentials=this.withCredentials?"include":"omit"),fetch(this.#t,n).then((e=>(e.headers.forEach(((e,t)=>{this.#n+=`${t}: ${e}\r\n`})),this.status=e.status,this.statusText=e.statusText,this.readyState=3,this.onreadystatechange?.(),t?e.text():e.arrayBuffer()))).then((e=>{"string"==typeof e?this.responseText=e:this.response=e,this.readyState=4,this.onreadystatechange?.()})).catch((e=>{"AbortError"!==e.name?this.onerror?.(e):this.onabort?.()}))}}const Pl="function"==typeof XMLHttpRequest?"xhr":"fetch",Ol="xhr"===Pl?XMLHttpRequest:Tl,Al=(e,t)=>{const n=e.options,r=e.applyMiddleware("finalizeOptions",n),i={},o=e.applyMiddleware("interceptRequest",void 0,{adapter:Pl,context:e});if(o){const e=setTimeout(t,0,null,o);return{abort:()=>clearTimeout(e)}}let a=new Ol;a instanceof Tl&&"object"==typeof r.fetch&&a.setInit(r.fetch,r.useAbortSignal??!0);const s=r.headers,l=r.timeout;let c=!1,u=!1,d=!1;if(a.onerror=e=>{h(a instanceof Tl?e instanceof Error?e:new Error(`Request error while attempting to reach is ${r.url}`,{cause:e}):new Error(`Request error while attempting to reach is ${r.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:""}`))},a.ontimeout=e=>{h(new Error(`Request timeout while attempting to reach ${r.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:""}`))},a.onabort=()=>{p(!0),c=!0},a.onreadystatechange=function(){l&&(p(),i.socket=setTimeout((()=>f("ESOCKETTIMEDOUT")),l.socket)),!c&&a&&4===a.readyState&&0!==a.status&&function(){if(!(c||u||d)){if(0===a.status)return void h(new Error("Unknown XHR error"));p(),u=!0,t(null,{body:a.response||(""===a.responseType||"text"===a.responseType?a.responseText:""),url:r.url,method:r.method,headers:El(a.getAllResponseHeaders()),statusCode:a.status,statusMessage:a.statusText})}}()},a.open(r.method,r.url,!0),a.withCredentials=!!r.withCredentials,s&&a.setRequestHeader)for(const m in s)s.hasOwnProperty(m)&&a.setRequestHeader(m,s[m]);return r.rawBody&&(a.responseType="arraybuffer"),e.applyMiddleware("onRequest",{options:r,adapter:Pl,request:a,context:e}),a.send(r.body||null),l&&(i.connect=setTimeout((()=>f("ETIMEDOUT")),l.connect)),{abort:function(){c=!0,a&&a.abort()}};function f(t){d=!0,a.abort();const n=new Error("ESOCKETTIMEDOUT"===t?`Socket timed out on request to ${r.url}`:`Connection timed out on request to ${r.url}`);n.code=t,e.channels.error.publish(n)}function p(e){(e||c||a&&a.readyState>=2&&i.connect)&&clearTimeout(i.connect),i.socket&&clearTimeout(i.socket)}function h(e){if(u)return;p(!0),u=!0,a=null;const n=e||new Error(`Network error while attempting to reach ${r.url}`);n.isNetworkError=!0,n.request=r,t(n)}},zl=function(){return jl(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],arguments.length>1&&void 0!==arguments[1]?arguments[1]:Al)};var $l,Rl,_l,Il,Ml,Ll={exports:{}};Ml||(Ml=1,function(e,t){t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const n="color: "+this.color;t.splice(1,0,n,"color: inherit");let r=0,i=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(r++,"%c"===e&&(i=r))})),t.splice(i,0,n)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch{}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.DEBUG),e},t.useColors=function(){if(typeof window<"u"&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch{}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=(Il?_l:(Il=1,_l=function(e){function t(e){let r,i,o,a=null;function s(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];if(!s.enabled)return;const o=s,a=Number(new Date),l=a-(r||a);o.diff=l,o.prev=r,o.curr=a,r=a,n[0]=t.coerce(n[0]),"string"!=typeof n[0]&&n.unshift("%O");let c=0;n[0]=n[0].replace(/%([a-zA-Z%])/g,((e,r)=>{if("%%"===e)return"%";c++;const i=t.formatters[r];if("function"==typeof i){const t=n[c];e=i.call(o,t),n.splice(c,1),c--}return e})),t.formatArgs.call(o,n),(o.log||t.log).apply(o,n)}return s.namespace=e,s.useColors=t.useColors(),s.color=t.selectColor(e),s.extend=n,s.destroy=t.destroy,Object.defineProperty(s,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(i!==t.namespaces&&(i=t.namespaces,o=t.enabled(e)),o),set:e=>{a=e}}),"function"==typeof t.init&&t.init(s),s}function n(e,n){const r=t(this.namespace+(typeof n>"u"?":":n)+e);return r.log=this.log,r}function r(e,t){let n=0,r=0,i=-1,o=0;for(;n<e.length;)if(r<t.length&&(t[r]===e[n]||"*"===t[r]))"*"===t[r]?(i=r,o=n,r++):(n++,r++);else{if(-1===i)return!1;r=i+1,o++,n=o}for(;r<t.length&&"*"===t[r];)r++;return r===t.length}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names,...t.skips.map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){t.save(e),t.namespaces=e,t.names=[],t.skips=[];const n=("string"==typeof e?e:"").trim().replace(" ",",").split(",").filter(Boolean);for(const r of n)"-"===r[0]?t.skips.push(r.slice(1)):t.names.push(r)},t.enabled=function(e){for(const n of t.skips)if(r(e,n))return!1;for(const n of t.names)if(r(e,n))return!0;return!1},t.humanize=function(){if(Rl)return $l;Rl=1;var e=1e3,t=60*e,n=60*t,r=24*n,i=7*r;function o(e,t,n,r){var i=t>=1.5*n;return Math.round(e/n)+" "+r+(i?"s":"")}return $l=function(a,s){s=s||{};var l,c,u=typeof a;if("string"===u&&a.length>0)return function(o){if(!((o=String(o)).length>100)){var a=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);if(a){var s=parseFloat(a[1]);switch((a[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*s;case"weeks":case"week":case"w":return s*i;case"days":case"day":case"d":return s*r;case"hours":case"hour":case"hrs":case"hr":case"h":return s*n;case"minutes":case"minute":case"mins":case"min":case"m":return s*t;case"seconds":case"second":case"secs":case"sec":case"s":return s*e;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}}}(a);if("number"===u&&isFinite(a))return s.long?(l=a,(c=Math.abs(l))>=r?o(l,c,r,"day"):c>=n?o(l,c,n,"hour"):c>=t?o(l,c,t,"minute"):c>=e?o(l,c,e,"second"):l+" ms"):function(i){var o=Math.abs(i);return o>=r?Math.round(i/r)+"d":o>=n?Math.round(i/n)+"h":o>=t?Math.round(i/t)+"m":o>=e?Math.round(i/e)+"s":i+"ms"}(a);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(a))}}(),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((n=>{t[n]=e[n]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let n=0;for(let t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return t.colors[Math.abs(n)%t.colors.length]},t.enable(t.load()),t}))(t);const{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}}(Ll,Ll.exports));Object.prototype.hasOwnProperty;Error;const Dl=typeof Buffer>"u"?()=>!1:e=>Buffer.isBuffer(e);function Nl(e){return"[object Object]"===Object.prototype.toString.call(e)}function Fl(e){if(!1===Nl(e))return!1;const t=e.constructor;if(void 0===t)return!0;const n=t.prototype;return!(!1===Nl(n)||!1===n.hasOwnProperty("isPrototypeOf"))}const Vl=["boolean","string","number"];function Ul(e){return{onResponse:n=>{const r=n.headers["content-type"]||"",i=e&&e.force||-1!==r.indexOf("application/json");return n.body&&r&&i?Object.assign({},n,{body:t(n.body)}):n},processOptions:e=>Object.assign({},e,{headers:Object.assign({Accept:"application/json"},e.headers)})};function t(e){try{return JSON.parse(e)}catch(e){throw e.message=`Failed to parsed response body as JSON: ${e.message}`,e}}}let Bl={};typeof globalThis<"u"?Bl=globalThis:typeof window<"u"?Bl=window:typeof global<"u"?Bl=global:typeof self<"u"&&(Bl=self);var Hl=Bl;function ql(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).implementation||Hl.Observable;if(!e)throw new Error("`Observable` is not available in global scope, and no implementation was passed");return{onReturn:(t,n)=>new e((e=>(t.error.subscribe((t=>e.error(t))),t.progress.subscribe((t=>e.next(Object.assign({type:"progress"},t)))),t.response.subscribe((t=>{e.next(Object.assign({type:"response"},t)),e.complete()})),t.request.publish(n),()=>t.abort.publish())))}}const Wl=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.implementation||Promise;if(!t)throw new Error("`Promise` is not available in global scope, and no implementation was passed");return{onReturn:(n,r)=>new t(((t,i)=>{const o=r.options.cancelToken;o&&o.promise.then((e=>{n.abort.publish(e),i(e)})),n.error.subscribe(i),n.response.subscribe((n=>{t(e.onlyBody?n.body:n)})),setTimeout((()=>{try{n.request.publish(r)}catch(e){i(e)}}),0)}))}};class Yl{__CANCEL__=!0;message;constructor(e){this.message=e}toString(){return"Cancel"+(this.message?`: ${this.message}`:"")}}class Xl{promise;reason;constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t=null;this.promise=new Promise((e=>{t=e})),e((e=>{this.reason||(this.reason=new Yl(e),t(this.reason))}))}static source=()=>{let e;return{token:new Xl((t=>{e=t})),cancel:e}}}Wl.Cancel=Yl,Wl.CancelToken=Xl,Wl.isCancel=e=>!(!e||!e?.__CANCEL__);var Kl=(e,t,n)=>("GET"===n.method||"HEAD"===n.method)&&(e.isNetworkError||!1);function Gl(e){return 100*Math.pow(2,e)+100*Math.random()}const Jl=function(){return(e=>{const t=e.maxRetries||5,n=e.retryDelay||Gl,r=e.shouldRetry;return{onError:(e,i)=>{const o=i.options,a=o.maxRetries||t,s=o.retryDelay||n,l=o.shouldRetry||r,c=o.attemptNumber||0;if(null!==(u=o.body)&&"object"==typeof u&&"function"==typeof u.pipe||!l(e,c,o)||c>=a)return e;var u;const d=Object.assign({},i,{options:Object.assign({},o,{attemptNumber:c+1})});return setTimeout((()=>i.channels.request.publish(d)),s(c)),null}}})({shouldRetry:Kl,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}})};Jl.shouldRetry=Kl;class Ql extends Error{request;code;constructor(e,t){super(e.message),this.request=t,this.code=e.code}}Zl=function(e){return{}};var Zl,ec=function(e,t){return ec=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},ec(e,t)};function tc(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}ec(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var nc=function(){return nc=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},nc.apply(this,arguments)};function rc(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function ic(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{l(r.next(e))}catch(pl){o(pl)}}function s(e){try{l(r.throw(e))}catch(pl){o(pl)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((r=r.apply(e,t||[])).next())}))}function oc(e,t){var n,r,i,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},a=Object.create(("function"===typeof Iterator?Iterator:Object).prototype);return a.next=s(0),a.throw=s(1),a.return=s(2),"function"===typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(o=0)),o;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===s[0]||2===s[0])){o=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){o.label=s[1];break}if(6===s[0]&&o.label<i[1]){o.label=i[1],i=s;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(s);break}i[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(pl){s=[6,pl],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}Object.create;function ac(e){var t="function"===typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"===typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function sc(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(s){i={error:s}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function lc(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}function cc(e){return this instanceof cc?(this.v=e,this):new cc(e)}function uc(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,i=n.apply(e,t||[]),o=[];return r=Object.create(("function"===typeof AsyncIterator?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",(function(e){return function(t){return Promise.resolve(t).then(e,c)}})),r[Symbol.asyncIterator]=function(){return this},r;function a(e,t){i[e]&&(r[e]=function(t){return new Promise((function(n,r){o.push([e,t,n,r])>1||s(e,t)}))},t&&(r[e]=t(r[e])))}function s(e,t){try{!function(e){e.value instanceof cc?Promise.resolve(e.value.v).then(l,c):u(o[0][2],e)}(i[e](t))}catch(pl){u(o[0][3],pl)}}function l(e){s("next",e)}function c(e){s("throw",e)}function u(e,t){e(t),o.shift(),o.length&&s(o[0][0],o[0][1])}}function dc(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=ac(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}}Object.create;"function"===typeof SuppressedError&&SuppressedError;function fc(e){return"function"===typeof e}function pc(e){var t=e((function(e){Error.call(e),e.stack=(new Error).stack}));return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var hc=pc((function(e){return function(t){e(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map((function(e,t){return t+1+") "+e.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t}}));function mc(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var gc=function(){function e(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var e,t,n,r,i;if(!this.closed){this.closed=!0;var o=this._parentage;if(o)if(this._parentage=null,Array.isArray(o))try{for(var a=ac(o),s=a.next();!s.done;s=a.next()){s.value.remove(this)}}catch(p){e={error:p}}finally{try{s&&!s.done&&(t=a.return)&&t.call(a)}finally{if(e)throw e.error}}else o.remove(this);var l=this.initialTeardown;if(fc(l))try{l()}catch(pl){i=pl instanceof hc?pl.errors:[pl]}var c=this._finalizers;if(c){this._finalizers=null;try{for(var u=ac(c),d=u.next();!d.done;d=u.next()){var f=d.value;try{bc(f)}catch(h){i=null!==i&&void 0!==i?i:[],h instanceof hc?i=lc(lc([],sc(i)),sc(h.errors)):i.push(h)}}}catch(m){n={error:m}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}}if(i)throw new hc(i)}},e.prototype.add=function(t){var n;if(t&&t!==this)if(this.closed)bc(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=null!==(n=this._finalizers)&&void 0!==n?n:[]).push(t)}},e.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},e.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},e.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&mc(t,e)},e.prototype.remove=function(t){var n=this._finalizers;n&&mc(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=function(){var t=new e;return t.closed=!0,t}(),e}(),vc=gc.EMPTY;function yc(e){return e instanceof gc||e&&"closed"in e&&fc(e.remove)&&fc(e.add)&&fc(e.unsubscribe)}function bc(e){fc(e)?e():e.unsubscribe()}var xc={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},wc={setTimeout:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i=wc.delegate;return(null===i||void 0===i?void 0:i.setTimeout)?i.setTimeout.apply(i,lc([e,t],sc(n))):setTimeout.apply(void 0,lc([e,t],sc(n)))},clearTimeout:function(e){var t=wc.delegate;return((null===t||void 0===t?void 0:t.clearTimeout)||clearTimeout)(e)},delegate:void 0};function kc(e){wc.setTimeout((function(){var t=xc.onUnhandledError;if(!t)throw e;t(e)}))}function jc(){}var Sc=Cc("C",void 0,void 0);function Cc(e,t,n){return{kind:e,value:t,error:n}}var Ec=null;function Tc(e){if(xc.useDeprecatedSynchronousErrorHandling){var t=!Ec;if(t&&(Ec={errorThrown:!1,error:null}),e(),t){var n=Ec,r=n.errorThrown,i=n.error;if(Ec=null,r)throw i}}else e()}var Pc=function(e){function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,yc(t)&&t.add(n)):n.destination=Ic,n}return tc(t,e),t.create=function(e,t,n){return new $c(e,t,n)},t.prototype.next=function(e){this.isStopped?_c(function(e){return Cc("N",e,void 0)}(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?_c(Cc("E",void 0,e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?_c(Sc,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(gc),Oc=Function.prototype.bind;function Ac(e,t){return Oc.call(e,t)}var zc=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(n){Rc(n)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(n){Rc(n)}else Rc(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(t){Rc(t)}},e}(),$c=function(e){function t(t,n,r){var i,o,a=e.call(this)||this;fc(t)||!t?i={next:null!==t&&void 0!==t?t:void 0,error:null!==n&&void 0!==n?n:void 0,complete:null!==r&&void 0!==r?r:void 0}:a&&xc.useDeprecatedNextContext?((o=Object.create(t)).unsubscribe=function(){return a.unsubscribe()},i={next:t.next&&Ac(t.next,o),error:t.error&&Ac(t.error,o),complete:t.complete&&Ac(t.complete,o)}):i=t;return a.destination=new zc(i),a}return tc(t,e),t}(Pc);function Rc(e){var t;xc.useDeprecatedSynchronousErrorHandling?(t=e,xc.useDeprecatedSynchronousErrorHandling&&Ec&&(Ec.errorThrown=!0,Ec.error=t)):kc(e)}function _c(e,t){var n=xc.onStoppedNotification;n&&wc.setTimeout((function(){return n(e,t)}))}var Ic={closed:!0,next:jc,error:function(e){throw e},complete:jc},Mc="function"===typeof Symbol&&Symbol.observable||"@@observable";function Lc(e){return e}function Dc(e){return 0===e.length?Lc:1===e.length?e[0]:function(t){return e.reduce((function(e,t){return t(e)}),t)}}var Nc=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r,i=this,o=(r=e)&&r instanceof Pc||function(e){return e&&fc(e.next)&&fc(e.error)&&fc(e.complete)}(r)&&yc(r)?e:new $c(e,t,n);return Tc((function(){var e=i,t=e.operator,n=e.source;o.add(t?t.call(o,n):n?i._subscribe(o):i._trySubscribe(o))})),o},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return new(t=Fc(t))((function(t,r){var i=new $c({next:function(t){try{e(t)}catch(n){r(n),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)}))},e.prototype._subscribe=function(e){var t;return null===(t=this.source)||void 0===t?void 0:t.subscribe(e)},e.prototype[Mc]=function(){return this},e.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Dc(e)(this)},e.prototype.toPromise=function(e){var t=this;return new(e=Fc(e))((function(e,n){var r;t.subscribe((function(e){return r=e}),(function(e){return n(e)}),(function(){return e(r)}))}))},e.create=function(t){return new e(t)},e}();function Fc(e){var t;return null!==(t=null!==e&&void 0!==e?e:xc.Promise)&&void 0!==t?t:Promise}var Vc=function(e){return e&&"number"===typeof e.length&&"function"!==typeof e};function Uc(e){return fc(null===e||void 0===e?void 0:e.then)}function Bc(e){return fc(e[Mc])}function Hc(e){return Symbol.asyncIterator&&fc(null===e||void 0===e?void 0:e[Symbol.asyncIterator])}function qc(e){return new TypeError("You provided "+(null!==e&&"object"===typeof e?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}var Wc="function"===typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function Yc(e){return fc(null===e||void 0===e?void 0:e[Wc])}function Xc(e){return uc(this,arguments,(function(){var t,n,r;return oc(this,(function(i){switch(i.label){case 0:t=e.getReader(),i.label=1;case 1:i.trys.push([1,,9,10]),i.label=2;case 2:return[4,cc(t.read())];case 3:return n=i.sent(),r=n.value,n.done?[4,cc(void 0)]:[3,5];case 4:return[2,i.sent()];case 5:return[4,cc(r)];case 6:return[4,i.sent()];case 7:return i.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}}))}))}function Kc(e){return fc(null===e||void 0===e?void 0:e.getReader)}function Gc(e){if(e instanceof Nc)return e;if(null!=e){if(Bc(e))return i=e,new Nc((function(e){var t=i[Mc]();if(fc(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(Vc(e))return r=e,new Nc((function(e){for(var t=0;t<r.length&&!e.closed;t++)e.next(r[t]);e.complete()}));if(Uc(e))return n=e,new Nc((function(e){n.then((function(t){e.closed||(e.next(t),e.complete())}),(function(t){return e.error(t)})).then(null,kc)}));if(Hc(e))return Jc(e);if(Yc(e))return t=e,new Nc((function(e){var n,r;try{for(var i=ac(t),o=i.next();!o.done;o=i.next()){var a=o.value;if(e.next(a),e.closed)return}}catch(s){n={error:s}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}e.complete()}));if(Kc(e))return Jc(Xc(e))}var t,n,r,i;throw qc(e)}function Jc(e){return new Nc((function(t){(function(e,t){var n,r,i,o;return ic(this,void 0,void 0,(function(){var a,s;return oc(this,(function(l){switch(l.label){case 0:l.trys.push([0,5,6,11]),n=dc(e),l.label=1;case 1:return[4,n.next()];case 2:if((r=l.sent()).done)return[3,4];if(a=r.value,t.next(a),t.closed)return[2];l.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=l.sent(),i={error:s},[3,11];case 6:return l.trys.push([6,,9,10]),r&&!r.done&&(o=n.return)?[4,o.call(n)]:[3,8];case 7:l.sent(),l.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}}))}))})(e,t).catch((function(e){return t.error(e)}))}))}function Qc(e){return new Nc((function(t){Gc(e()).subscribe(t)}))}function Zc(e){return e&&fc(e.schedule)}function eu(e){return e[e.length-1]}function tu(e){return Zc(eu(e))?e.pop():void 0}function nu(e,t,n,r,i){void 0===r&&(r=0),void 0===i&&(i=!1);var o=t.schedule((function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()}),r);if(e.add(o),!i)return o}function ru(e){return function(t){if(function(e){return fc(null===e||void 0===e?void 0:e.lift)}(t))return t.lift((function(t){try{return e(t,this)}catch(n){this.error(n)}}));throw new TypeError("Unable to lift unknown Observable type")}}function iu(e,t,n,r,i){return new ou(e,t,n,r,i)}var ou=function(e){function t(t,n,r,i,o,a){var s=e.call(this,t)||this;return s.onFinalize=o,s.shouldUnsubscribe=a,s._next=n?function(e){try{n(e)}catch(r){t.error(r)}}:e.prototype._next,s._error=i?function(e){try{i(e)}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._error,s._complete=r?function(){try{r()}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._complete,s}return tc(t,e),t.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&(null===(t=this.onFinalize)||void 0===t||t.call(this))}},t}(Pc);function au(e,t){return void 0===t&&(t=0),ru((function(n,r){n.subscribe(iu(r,(function(n){return nu(r,e,(function(){return r.next(n)}),t)}),(function(){return nu(r,e,(function(){return r.complete()}),t)}),(function(n){return nu(r,e,(function(){return r.error(n)}),t)})))}))}function su(e,t){return void 0===t&&(t=0),ru((function(n,r){r.add(e.schedule((function(){return n.subscribe(r)}),t))}))}function lu(e,t){if(!e)throw new Error("Iterable cannot be null");return new Nc((function(n){nu(n,t,(function(){var r=e[Symbol.asyncIterator]();nu(n,t,(function(){r.next().then((function(e){e.done?n.complete():n.next(e.value)}))}),0,!0)}))}))}function cu(e,t){if(null!=e){if(Bc(e))return function(e,t){return Gc(e).pipe(su(t),au(t))}(e,t);if(Vc(e))return function(e,t){return new Nc((function(n){var r=0;return t.schedule((function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())}))}))}(e,t);if(Uc(e))return function(e,t){return Gc(e).pipe(su(t),au(t))}(e,t);if(Hc(e))return lu(e,t);if(Yc(e))return function(e,t){return new Nc((function(n){var r;return nu(n,t,(function(){r=e[Wc](),nu(n,t,(function(){var e,t,i;try{t=(e=r.next()).value,i=e.done}catch(o){return void n.error(o)}i?n.complete():n.next(t)}),0,!0)})),function(){return fc(null===r||void 0===r?void 0:r.return)&&r.return()}}))}(e,t);if(Kc(e))return function(e,t){return lu(Xc(e),t)}(e,t)}throw qc(e)}function uu(e,t){return t?cu(e,t):Gc(e)}function du(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return uu(e,tu(e))}function fu(e,t){return ru((function(n,r){var i=0;n.subscribe(iu(r,(function(n){r.next(e.call(t,n,i++))})))}))}function pu(e,t,n){return void 0===n&&(n=1/0),fc(t)?pu((function(n,r){return fu((function(e,i){return t(n,e,r,i)}))(Gc(e(n,r)))}),n):("number"===typeof t&&(n=t),ru((function(t,r){return function(e,t,n,r,i,o,a,s){var l=[],c=0,u=0,d=!1,f=function(){!d||l.length||c||t.complete()},p=function(e){return c<r?h(e):l.push(e)},h=function(e){o&&t.next(e),c++;var s=!1;Gc(n(e,u++)).subscribe(iu(t,(function(e){null===i||void 0===i||i(e),o?p(e):t.next(e)}),(function(){s=!0}),void 0,(function(){if(s)try{c--;for(var e=function(){var e=l.shift();a?nu(t,a,(function(){return h(e)})):h(e)};l.length&&c<r;)e();f()}catch(n){t.error(n)}})))};return e.subscribe(iu(t,p,(function(){d=!0,f()}))),function(){null===s||void 0===s||s()}}(t,r,e,n)})))}var hu=pc((function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}}));function mu(e,t){var n="object"===typeof t;return new Promise((function(r,i){var o,a=!1;e.subscribe({next:function(e){o=e,a=!0},error:i,complete:function(){a?r(o):n?r(t.defaultValue):i(new hu)}})}))}var gu=pc((function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),vu=function(e){function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return tc(t,e),t.prototype.lift=function(e){var t=new yu(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new gu},t.prototype.next=function(e){var t=this;Tc((function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||(t.currentObservers=Array.from(t.observers));try{for(var i=ac(t.currentObservers),o=i.next();!o.done;o=i.next()){o.value.next(e)}}catch(a){n={error:a}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}}))},t.prototype.error=function(e){var t=this;Tc((function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}}))},t.prototype.complete=function(){var e=this;Tc((function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}}))},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var e;return(null===(e=this.observers)||void 0===e?void 0:e.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this,r=n.hasError,i=n.isStopped,o=n.observers;return r||i?vc:(this.currentObservers=null,o.push(e),new gc((function(){t.currentObservers=null,mc(o,e)})))},t.prototype._checkFinalizedStatuses=function(e){var t=this,n=t.hasError,r=t.thrownError,i=t.isStopped;n?e.error(r):i&&e.complete()},t.prototype.asObservable=function(){var e=new Nc;return e.source=this,e},t.create=function(e,t){return new yu(e,t)},t}(Nc),yu=function(e){function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return tc(t,e),t.prototype.next=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.next)||void 0===n||n.call(t,e)},t.prototype.error=function(e){var t,n;null===(n=null===(t=this.destination)||void 0===t?void 0:t.error)||void 0===n||n.call(t,e)},t.prototype.complete=function(){var e,t;null===(t=null===(e=this.destination)||void 0===e?void 0:e.complete)||void 0===t||t.call(e)},t.prototype._subscribe=function(e){var t,n;return null!==(n=null===(t=this.source)||void 0===t?void 0:t.subscribe(e))&&void 0!==n?n:vc},t}(vu),bu={now:function(){return(bu.delegate||Date).now()},delegate:void 0},xu=function(e){function t(t,n,r){void 0===t&&(t=1/0),void 0===n&&(n=1/0),void 0===r&&(r=bu);var i=e.call(this)||this;return i._bufferSize=t,i._windowTime=n,i._timestampProvider=r,i._buffer=[],i._infiniteTimeWindow=!0,i._infiniteTimeWindow=n===1/0,i._bufferSize=Math.max(1,t),i._windowTime=Math.max(1,n),i}return tc(t,e),t.prototype.next=function(t){var n=this,r=n.isStopped,i=n._buffer,o=n._infiniteTimeWindow,a=n._timestampProvider,s=n._windowTime;r||(i.push(t),!o&&i.push(a.now()+s)),this._trimBuffer(),e.prototype.next.call(this,t)},t.prototype._subscribe=function(e){this._throwIfClosed(),this._trimBuffer();for(var t=this._innerSubscribe(e),n=this._infiniteTimeWindow,r=this._buffer.slice(),i=0;i<r.length&&!e.closed;i+=n?1:2)e.next(r[i]);return this._checkFinalizedStatuses(e),t},t.prototype._trimBuffer=function(){var e=this,t=e._bufferSize,n=e._timestampProvider,r=e._buffer,i=e._infiniteTimeWindow,o=(i?1:2)*t;if(t<1/0&&o<r.length&&r.splice(0,r.length-o),!i){for(var a=n.now(),s=0,l=1;l<r.length&&r[l]<=a;l+=2)s=l;s&&r.splice(0,s+1)}},t}(vu);function wu(e){void 0===e&&(e={});var t=e.connector,n=void 0===t?function(){return new vu}:t,r=e.resetOnError,i=void 0===r||r,o=e.resetOnComplete,a=void 0===o||o,s=e.resetOnRefCountZero,l=void 0===s||s;return function(e){var t,r,o,s=0,c=!1,u=!1,d=function(){null===r||void 0===r||r.unsubscribe(),r=void 0},f=function(){d(),t=o=void 0,c=u=!1},p=function(){var e=t;f(),null===e||void 0===e||e.unsubscribe()};return ru((function(e,h){s++,u||c||d();var m=o=null!==o&&void 0!==o?o:n();h.add((function(){0!==--s||u||c||(r=ku(p,l))})),m.subscribe(h),!t&&s>0&&(t=new $c({next:function(e){return m.next(e)},error:function(e){u=!0,d(),r=ku(f,i,e),m.error(e)},complete:function(){c=!0,d(),r=ku(f,a),m.complete()}}),Gc(e).subscribe(t))}))(e)}}function ku(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!0!==t){if(!1!==t){var i=new $c({next:function(){i.unsubscribe(),e()}});return Gc(t.apply(void 0,lc([],sc(n)))).subscribe(i)}}else e()}function ju(e){return ru((function(t,n){var r,i=null,o=!1;i=t.subscribe(iu(n,void 0,void 0,(function(a){r=Gc(e(a,ju(e)(t))),i?(i.unsubscribe(),i=null,r.subscribe(n)):o=!0}))),o&&(i.unsubscribe(),i=null,r.subscribe(n))}))}function Su(e){return void 0===e&&(e=1/0),pu(Lc,e)}function Cu(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Su(1)(uu(e,tu(e)))}var Eu=function(e){function t(t,n){return e.call(this)||this}return tc(t,e),t.prototype.schedule=function(e,t){return void 0===t&&(t=0),this},t}(gc),Tu={setInterval:function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i=Tu.delegate;return(null===i||void 0===i?void 0:i.setInterval)?i.setInterval.apply(i,lc([e,t],sc(n))):setInterval.apply(void 0,lc([e,t],sc(n)))},clearInterval:function(e){var t=Tu.delegate;return((null===t||void 0===t?void 0:t.clearInterval)||clearInterval)(e)},delegate:void 0},Pu=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.scheduler=t,r.work=n,r.pending=!1,r}return tc(t,e),t.prototype.schedule=function(e,t){var n;if(void 0===t&&(t=0),this.closed)return this;this.state=e;var r=this.id,i=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(i,r,t)),this.pending=!0,this.delay=t,this.id=null!==(n=this.id)&&void 0!==n?n:this.requestAsyncId(i,this.id,t),this},t.prototype.requestAsyncId=function(e,t,n){return void 0===n&&(n=0),Tu.setInterval(e.flush.bind(e,this),n)},t.prototype.recycleAsyncId=function(e,t,n){if(void 0===n&&(n=0),null!=n&&this.delay===n&&!1===this.pending)return t;null!=t&&Tu.clearInterval(t)},t.prototype.execute=function(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var n=this._execute(e,t);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},t.prototype._execute=function(e,t){var n,r=!1;try{this.work(e)}catch(pl){r=!0,n=pl||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),n},t.prototype.unsubscribe=function(){if(!this.closed){var t=this.id,n=this.scheduler,r=n.actions;this.work=this.state=this.scheduler=null,this.pending=!1,mc(r,this),null!=t&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},t}(Eu),Ou=function(){function e(t,n){void 0===n&&(n=e.now),this.schedulerActionCtor=t,this.now=n}return e.prototype.schedule=function(e,t,n){return void 0===t&&(t=0),new this.schedulerActionCtor(this,e).schedule(n,t)},e.now=bu.now,e}(),Au=function(e){function t(t,n){void 0===n&&(n=Ou.now);var r=e.call(this,t,n)||this;return r.actions=[],r._active=!1,r}return tc(t,e),t.prototype.flush=function(e){var t=this.actions;if(this._active)t.push(e);else{var n;this._active=!0;do{if(n=e.execute(e.state,e.delay))break}while(e=t.shift());if(this._active=!1,n){for(;e=t.shift();)e.unsubscribe();throw n}}},t}(Ou),zu=new Au(Pu);function $u(e,t,n){void 0===e&&(e=0),void 0===n&&(n=zu);var r=-1;return null!=t&&(Zc(t)?n=t:r=t),new Nc((function(t){var i,o=(i=e)instanceof Date&&!isNaN(i)?+e-n.now():e;o<0&&(o=0);var a=0;return n.schedule((function(){t.closed||(t.next(a++),0<=r?this.schedule(void 0,r):t.complete())}),o)}))}function Ru(e,t){var n=fc(e)?e:function(){return e},r=function(e){return e.error(n())};return new Nc(t?function(e){return t.schedule(r,0,e)}:r)}function _u(e){return ru((function(t,n){try{t.subscribe(n)}finally{n.add(e)}}))}var Iu=new Nc((function(e){return e.complete()}));function Mu(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=tu(e),r=function(e,t){return"number"===typeof eu(e)?e.pop():t}(e,1/0),i=e;return i.length?1===i.length?Gc(i[0]):Su(r)(uu(i,n)):Iu}var Lu=n(490);function Du(e,t,n){return void 0===n&&(n=Lc),function(r){Nu(t,(function(){for(var i=e.length,o=new Array(i),a=i,s=i,l=function(i){Nu(t,(function(){var l=uu(e[i],t),c=!1;l.subscribe(iu(r,(function(e){o[i]=e,c||(c=!0,s--),s||r.next(n(o.slice()))}),(function(){--a||r.complete()})))}),r)},c=0;c<i;c++)l(c)}),r)}}function Nu(e,t,n){e?nu(n,e,t):t()}var Fu=Array.isArray;var Vu=Array.isArray;function Uu(e){return fu((function(t){return function(e,t){return Vu(t)?e.apply(void 0,lc([],sc(t))):e(t)}(e,t)}))}function Bu(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=function(e){return fc(eu(e))?e.pop():void 0}(e);return n?function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Dc(e)}(Bu.apply(void 0,lc([],sc(e))),Uu(n)):ru((function(t,n){Du(lc([t],sc(function(e){return 1===e.length&&Fu(e[0])?e[0]:e}(e))))(n)}))}function Hu(e,t){return ru((function(n,r){var i=0;n.subscribe(iu(r,(function(n){return e.call(t,n,i++)&&r.next(n)})))}))}class qu extends Error{response;statusCode=400;responseBody;details;constructor(e){const t=Yu(e);super(t.message),Object.assign(this,t)}}class Wu extends Error{response;statusCode=500;responseBody;details;constructor(e){const t=Yu(e);super(t.message),Object.assign(this,t)}}function Yu(e){const t=e.body,n={response:e,statusCode:e.statusCode,responseBody:Ku(t,e),message:"",details:void 0};if(t.error&&t.message)return n.message=`${t.error} - ${t.message}`,n;if(function(e){return Xu(e)&&Xu(e.error)&&"mutationError"===e.error.type&&"string"==typeof e.error.description}(t)||function(e){return Xu(e)&&Xu(e.error)&&"actionError"===e.error.type&&"string"==typeof e.error.description}(t)){const e=t.error.items||[],r=e.slice(0,5).map((e=>e.error?.description)).filter(Boolean);let i=r.length?`:\n- ${r.join("\n- ")}`:"";return e.length>5&&(i+=`\n...and ${e.length-5} more`),n.message=`${t.error.description}${i}`,n.details=t.error,n}return t.error&&t.error.description?(n.message=t.error.description,n.details=t.error,n):(n.message=t.error||t.message||function(e){const t=e.statusMessage?` ${e.statusMessage}`:"";return`${e.method}-request to ${e.url} resulted in HTTP ${e.statusCode}${t}`}(e),n)}function Xu(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function Ku(e,t){return-1!==(t.headers["content-type"]||"").toLowerCase().indexOf("application/json")?JSON.stringify(e,null,2):e}class Gu extends Error{projectId;addOriginUrl;constructor(e){let{projectId:t}=e;super("CorsOriginError"),this.name="CorsOriginError",this.projectId=t;const n=new URL(`https://sanity.io/manage/project/${t}/api`);if(typeof location<"u"){const{origin:e}=location;n.searchParams.set("cors","add"),n.searchParams.set("origin",e),this.addOriginUrl=n,this.message=`The current origin is not allowed to connect to the Live Content API. Add it here: ${n}`}else this.message=`The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${n}`}}const Ju={onResponse:e=>{if(e.statusCode>=500)throw new Wu(e);if(e.statusCode>=400)throw new qu(e);return e}};function Qu(){const e={};return{onResponse:t=>{const n=t.headers["x-sanity-warning"],r=Array.isArray(n)?n:[n];for(const i of r)!i||e[i]||(e[i]=!0,console.warn(i));return t}}}function Zu(e){return zl([Jl({shouldRetry:ed}),...e,Qu(),{processOptions:e=>{const t=e.body;return!t||"function"==typeof t.pipe||Dl(t)||-1===Vl.indexOf(typeof t)&&!Array.isArray(t)&&!Fl(t)?e:Object.assign({},e,{body:JSON.stringify(e.body),headers:Object.assign({},e.headers,{"Content-Type":"application/json"})})}},Ul(),{onRequest:e=>{if("xhr"!==e.adapter)return;const t=e.request,n=e.context;function r(e){return t=>{const r=t.lengthComputable?t.loaded/t.total*100:-1;n.channels.progress.publish({stage:e,percent:r,total:t.total,loaded:t.loaded,lengthComputable:t.lengthComputable})}}"upload"in t&&"onprogress"in t.upload&&(t.upload.onprogress=r("upload")),"onprogress"in t&&(t.onprogress=r("download"))}},Ju,ql({implementation:Nc})])}function ed(e,t,n){if(0===n.maxRetries)return!1;const r="GET"===n.method||"HEAD"===n.method,i=(n.uri||n.url).startsWith("/data/query"),o=e.response&&(429===e.response.statusCode||502===e.response.statusCode||503===e.response.statusCode);return!(!r&&!i||!o)||Jl.shouldRetry(e,t,n)}function td(e){return"https://www.sanity.io/help/"+e}const nd=["image","file"],rd=["before","after","replace"],id=e=>{if(!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(e))throw new Error("Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters")},od=(e,t)=>{if(null===t||"object"!=typeof t||Array.isArray(t))throw new Error(`${e}() takes an object of properties`)},ad=(e,t)=>{if("string"!=typeof t||!/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(t)||t.includes(".."))throw new Error(`${e}(): "${t}" is not a valid document ID`)},sd=(e,t)=>{if(!t._id)throw new Error(`${e}() requires that the document contains an ID ("_id" property)`);ad(e,t._id)},ld=e=>{if(!e.dataset)throw new Error("`dataset` must be provided to perform queries");return e.dataset||""},cd=e=>{if("string"!=typeof e||!/^[a-z0-9._-]{1,75}$/i.test(e))throw new Error("Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.");return e},ud=e=>{if(!e["~experimental_resource"])throw new Error("`resource` must be provided to perform resource queries");const{type:t,id:n}=e["~experimental_resource"];switch(t){case"dataset":if(2!==n.split(".").length)throw new Error('Dataset resource ID must be in the format "project.dataset"');return;case"dashboard":case"media-library":case"canvas":return;default:throw new Error(`Unsupported resource type: ${t.toString()}`)}},dd=(e,t)=>{if(t["~experimental_resource"])throw new Error(`\`${e}\` does not support resource-based operations`)};const fd=e=>function(e){let t,n=!1;return function(){return n||(t=e(...arguments),n=!0),t}}((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return console.warn(e.join(" "),...n)})),pd=fd(["Because you set `withCredentials` to true, we will override your `useCdn`","setting to be false since (cookie-based) credentials are never set on the CDN"]),hd=fd(["Since you haven't set a value for `useCdn`, we will deliver content using our","global, edge-cached API-CDN. If you wish to have content delivered faster, set","`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."]),md=fd(["The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.","The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."]),gd=fd(["The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"]),vd=fd(["You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",`See ${td("js-client-browser-token")} for more information and how to hide this warning.`]),yd=fd(["You have configured Sanity client to use a token, but also provided `withCredentials: true`.","This is no longer supported - only token will be used - remove `withCredentials: true`."]),bd=fd(["Using the Sanity client without specifying an API version is deprecated.",`See ${td("js-client-api-version")}`]),xd=fd(["The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."]),wd={apiHost:"https://api.sanity.io",apiVersion:"1",useProjectHostname:!0,stega:{enabled:!1}},kd=["localhost","127.0.0.1","0.0.0.0"];function jd(e){if(Array.isArray(e)&&e.length>1&&e.includes("raw"))throw new TypeError('Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives')}const Sd=(e,t)=>{const n={...t,...e,stega:{..."boolean"==typeof t.stega?{enabled:t.stega}:t.stega||wd.stega,..."boolean"==typeof e.stega?{enabled:e.stega}:e.stega||{}}};n.apiVersion||bd();const r={...wd,...n},i=r.useProjectHostname&&!r["~experimental_resource"];if(typeof Promise>"u"){const e=td("js-client-promise-polyfill");throw new Error(`No native Promise-implementation found, polyfill needed - see ${e}`)}if(i&&!r.projectId)throw new Error("Configuration must contain `projectId`");if(r["~experimental_resource"]&&ud(r),typeof r.perspective<"u"&&jd(r.perspective),"encodeSourceMap"in r)throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?");if("encodeSourceMapAtPath"in r)throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?");if("boolean"!=typeof r.stega.enabled)throw new Error(`stega.enabled must be a boolean, received ${r.stega.enabled}`);if(r.stega.enabled&&void 0===r.stega.studioUrl)throw new Error("stega.studioUrl must be defined when stega.enabled is true");if(r.stega.enabled&&"string"!=typeof r.stega.studioUrl&&"function"!=typeof r.stega.studioUrl)throw new Error(`stega.studioUrl must be a string or a function, received ${r.stega.studioUrl}`);const o=typeof window<"u"&&window.location&&window.location.hostname,a=o&&(e=>-1!==kd.indexOf(e))(window.location.hostname),s=!!r.token;r.withCredentials&&s&&(yd(),r.withCredentials=!1),o&&a&&s&&!0!==r.ignoreBrowserTokenWarning?vd():typeof r.useCdn>"u"&&hd(),i&&(e=>{if(!/^[-a-z0-9]+$/i.test(e))throw new Error("`projectId` can only contain only a-z, 0-9 and dashes")})(r.projectId),r.dataset&&id(r.dataset),"requestTagPrefix"in r&&(r.requestTagPrefix=r.requestTagPrefix?cd(r.requestTagPrefix).replace(/\.+$/,""):void 0),r.apiVersion=`${r.apiVersion}`.replace(/^v/,""),r.isDefaultApi=r.apiHost===wd.apiHost,!0===r.useCdn&&r.withCredentials&&pd(),r.useCdn=!1!==r.useCdn&&!r.withCredentials,function(e){if("1"===e||"X"===e)return;const t=new Date(e);if(!(/^\d{4}-\d{2}-\d{2}$/.test(e)&&t instanceof Date&&t.getTime()>0))throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`")}(r.apiVersion);const l=r.apiHost.split("://",2),c=l[0],u=l[1],d=r.isDefaultApi?"apicdn.sanity.io":u;return i?(r.url=`${c}://${r.projectId}.${u}/v${r.apiVersion}`,r.cdnUrl=`${c}://${r.projectId}.${d}/v${r.apiVersion}`):(r.url=`${r.apiHost}/v${r.apiVersion}`,r.cdnUrl=r.url),r};class Cd extends Error{name="ConnectionFailedError"}class Ed extends Error{name="DisconnectError";reason;constructor(e,t){super(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}),this.reason=t}}class Td extends Error{name="ChannelError";data;constructor(e,t){super(e),this.data=t}}class Pd extends Error{name="MessageError";data;constructor(e,t){super(e,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}),this.data=t}}class Od extends Error{name="MessageParseError"}const Ad=["channelError","disconnect"];function zd(e,t){return Qc((()=>{const t=e();return(n=t)&&(n instanceof Nc||fc(n.lift)&&fc(n.subscribe))?t:du(t);var n})).pipe(pu((e=>function(e,t){return new Nc((n=>{const r=t.includes("open"),i=t.includes("reconnect");function o(t){if("data"in t){const[e,r]=$d(t);n.error(e?new Od("Unable to parse EventSource error message",{cause:r}):new Pd((r?.data).message,r))}else e.readyState===e.CLOSED?n.error(new Cd("EventSource connection failed")):i&&n.next({type:"reconnect"})}function a(){n.next({type:"open"})}function s(e){const[t,r]=$d(e);var i;t?n.error(new Od("Unable to parse EventSource message",{cause:t})):"channelError"!==e.type?"disconnect"!==e.type?n.next({type:e.type,id:e.lastEventId,...r.data?{data:r.data}:{}}):n.error(new Ed(`Server disconnected client: ${r.data?.reason||"unknown error"}`)):n.error(new Td((i=r?.data,i.error?i.error.description?i.error.description:"string"==typeof i.error?i.error:JSON.stringify(i.error,null,2):i.message||"Unknown listener error"),r.data))}e.addEventListener("error",o),r&&e.addEventListener("open",a);const l=[...new Set([...Ad,...t])].filter((e=>"error"!==e&&"open"!==e&&"reconnect"!==e));return l.forEach((t=>e.addEventListener(t,s))),()=>{e.removeEventListener("error",o),r&&e.removeEventListener("open",a),l.forEach((t=>e.removeEventListener(t,s))),e.close()}}))}(e,t))))}function $d(e){try{const t="string"==typeof e.data&&JSON.parse(e.data);return[null,{type:e.type,id:e.lastEventId,...Rd(t)?{}:{data:t}}]}catch(t){return[t,null]}}function Rd(e){for(const t in e)return!1;return!0}function _d(e){if("string"==typeof e)return{id:e};if(Array.isArray(e))return{query:"*[_id in $ids]",params:{ids:e}};if("object"==typeof e&&null!==e&&"query"in e&&"string"==typeof e.query)return"params"in e&&"object"==typeof e.params&&null!==e.params?{query:e.query,params:e.params}:{query:e.query};const t=["* Document ID (<docId>)","* Array of document IDs","* Object containing `query`"].join("\n");throw new Error(`Unknown selection - must be one of:\n\n${t}`)}class Id{selection;operations;constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.selection=e,this.operations=t}set(e){return this._assign("set",e)}setIfMissing(e){return this._assign("setIfMissing",e)}diffMatchPatch(e){return od("diffMatchPatch",e),this._assign("diffMatchPatch",e)}unset(e){if(!Array.isArray(e))throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");return this.operations=Object.assign({},this.operations,{unset:e}),this}inc(e){return this._assign("inc",e)}dec(e){return this._assign("dec",e)}insert(e,t,n){return((e,t,n)=>{const r="insert(at, selector, items)";if(-1===rd.indexOf(e)){const e=rd.map((e=>`"${e}"`)).join(", ");throw new Error(`${r} takes an "at"-argument which is one of: ${e}`)}if("string"!=typeof t)throw new Error(`${r} takes a "selector"-argument which must be a string`);if(!Array.isArray(n))throw new Error(`${r} takes an "items"-argument which must be an array`)})(e,t,n),this._assign("insert",{[e]:t,items:n})}append(e,t){return this.insert("after",`${e}[-1]`,t)}prepend(e,t){return this.insert("before",`${e}[0]`,t)}splice(e,t,n,r){const i=t<0?t-1:t,o=typeof n>"u"||-1===n?-1:Math.max(0,t+n),a=`${e}[${i}:${i<0&&o>=0?"":o}]`;return this.insert("replace",a,r||[])}ifRevisionId(e){return this.operations.ifRevisionID=e,this}serialize(){return{..._d(this.selection),...this.operations}}toJSON(){return this.serialize()}reset(){return this.operations={},this}_assign(e,t){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return od(e,t),this.operations=Object.assign({},this.operations,{[e]:Object.assign({},n&&this.operations[e]||{},t)}),this}_set(e,t){return this._assign(e,t,!1)}}class Md extends Id{#s;constructor(e,t,n){super(e,t),this.#s=n}clone(){return new Md(this.selection,{...this.operations},this.#s)}commit(e){if(!this.#s)throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");const t="string"==typeof this.selection,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return this.#s.mutate({patch:this.serialize()},n)}}class Ld extends Id{#s;constructor(e,t,n){super(e,t),this.#s=n}clone(){return new Ld(this.selection,{...this.operations},this.#s)}commit(e){if(!this.#s)throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");const t="string"==typeof this.selection,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return this.#s.mutate({patch:this.serialize()},n)}}const Dd={returnDocuments:!1};class Nd{operations;trxId;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;this.operations=e,this.trxId=t}create(e){return od("create",e),this._add({create:e})}createIfNotExists(e){const t="createIfNotExists";return od(t,e),sd(t,e),this._add({[t]:e})}createOrReplace(e){const t="createOrReplace";return od(t,e),sd(t,e),this._add({[t]:e})}delete(e){return ad("delete",e),this._add({delete:{id:e}})}transactionId(e){return e?(this.trxId=e,this):this.trxId}serialize(){return[...this.operations]}toJSON(){return this.serialize()}reset(){return this.operations=[],this}_add(e){return this.operations.push(e),this}}class Fd extends Nd{#s;constructor(e,t,n){super(e,n),this.#s=t}clone(){return new Fd([...this.operations],this.#s,this.trxId)}commit(e){if(!this.#s)throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return this.#s.mutate(this.serialize(),Object.assign({transactionId:this.trxId},Dd,e||{}))}patch(e,t){const n="function"==typeof t,r="object"==typeof e&&("query"in e||"id"in e);if("string"!=typeof e&&e instanceof Ld)return this._add({patch:e.serialize()});if(n){const n=t(new Ld(e,{},this.#s));if(!(n instanceof Ld))throw new Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}if(r){const n=new Ld(e,t||{},this.#s);return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}}class Vd extends Nd{#s;constructor(e,t,n){super(e,n),this.#s=t}clone(){return new Vd([...this.operations],this.#s,this.trxId)}commit(e){if(!this.#s)throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return this.#s.mutate(this.serialize(),Object.assign({transactionId:this.trxId},Dd,e||{}))}patch(e,t){const n="function"==typeof t;if("string"!=typeof e&&e instanceof Md)return this._add({patch:e.serialize()});if(n){const n=t(new Md(e,{},this.#s));if(!(n instanceof Md))throw new Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}}const Ud=e=>{let{query:t,params:n={},options:r={}}=e;const i=new URLSearchParams,{tag:o,includeMutations:a,returnQuery:s,...l}=r;o&&i.append("tag",o),i.append("query",t);for(const[c,u]of Object.entries(n))i.append(`$${c}`,JSON.stringify(u));for(const[c,u]of Object.entries(l))u&&i.append(c,`${u}`);return!1===s&&i.append("returnQuery","false"),!1===a&&i.append("includeMutations","false"),`?${i}`},Bd=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{dryRun:e.dryRun,returnIds:!0,returnDocuments:(t=e.returnDocuments,n=!0,!1===t?void 0:typeof t>"u"?n:t),visibility:e.visibility||"sync",autoGenerateArrayKeys:e.autoGenerateArrayKeys,skipCrossDatasetReferenceValidation:e.skipCrossDatasetReferenceValidation};var t,n},Hd=e=>"response"===e.type,qd=e=>e.body;function Wd(e,t,r,i){let o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{};const s="stega"in a?{...r||{},..."boolean"==typeof a.stega?{enabled:a.stega}:a.stega||{}}:r,l=s.enabled?(0,Lu.Q)(o):o,c=!1===a.filterResponse?e=>e:e=>e.result,{cache:u,next:d,...f}={useAbortSignal:typeof a.signal<"u",resultSourceMap:s.enabled?"withKeyArraySelector":a.resultSourceMap,...a,returnQuery:!1===a.filterResponse&&!1!==a.returnQuery},p=ef(e,t,"query",{query:i,params:l},typeof u<"u"||typeof d<"u"?{...f,fetch:{cache:u,next:d}}:f);return s.enabled?p.pipe(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Bu.apply(void 0,lc([],sc(e)))}(uu(n.e(796).then(n.bind(n,796)).then((function(e){return e.stegaEncodeSourceMap$1})).then((e=>{let{stegaEncodeSourceMap:t}=e;return t})))),fu((e=>{let[t,n]=e;const r=n(t.result,t.resultSourceMap,s);return c({...t,result:r})}))):p.pipe(fu(c))}function Yd(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return af(e,t,{uri:lf(e,"doc",n),json:!0,tag:r.tag,signal:r.signal}).pipe(Hu(Hd),fu((e=>e.body.documents&&e.body.documents[0])))}function Xd(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return af(e,t,{uri:lf(e,"doc",n.join(",")),json:!0,tag:r.tag,signal:r.signal}).pipe(Hu(Hd),fu((e=>{const t=(r=e.body.documents||[],i=e=>e._id,r.reduce(((e,t)=>(e[i(t)]=t,e)),Object.create(null)));var r,i;return n.map((e=>t[e]||null))})))}function Kd(e,t,n,r){return sd("createIfNotExists",n),tf(e,t,n,"createIfNotExists",r)}function Gd(e,t,n,r){return sd("createOrReplace",n),tf(e,t,n,"createOrReplace",r)}function Jd(e,t,n,r){return ef(e,t,"mutate",{mutations:[{delete:_d(n)}]},r)}function Qd(e,t,n,r){let i;i=n instanceof Ld||n instanceof Md?{patch:n.serialize()}:n instanceof Fd||n instanceof Vd?n.serialize():n;return ef(e,t,"mutate",{mutations:Array.isArray(i)?i:[i],transactionId:r&&r.transactionId||void 0},r)}function Zd(e,t,n,r){return ef(e,t,"actions",{actions:Array.isArray(n)?n:[n],transactionId:r&&r.transactionId||void 0,skipCrossDatasetReferenceValidation:r&&r.skipCrossDatasetReferenceValidation||void 0,dryRun:r&&r.dryRun||void 0},r)}function ef(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};const o="mutate"===n,a="actions"===n,s="query"===n,l=o||a?"":Ud(r),c=!o&&!a&&l.length<11264,u=c?l:"",d=i.returnFirst,{timeout:f,token:p,tag:h,headers:m,returnQuery:g,lastLiveEventId:v,cacheMode:y}=i;return af(e,t,{method:c?"GET":"POST",uri:lf(e,n,u),json:!0,body:c?void 0:r,query:o&&Bd(i),timeout:f,headers:m,token:p,tag:h,returnQuery:g,perspective:i.perspective,resultSourceMap:i.resultSourceMap,lastLiveEventId:Array.isArray(v)?v[0]:v,cacheMode:y,canUseCdn:s,signal:i.signal,fetch:i.fetch,useAbortSignal:i.useAbortSignal,useCdn:i.useCdn}).pipe(Hu(Hd),fu(qd),fu((e=>{if(!o)return e;const t=e.results||[];if(i.returnDocuments)return d?t[0]&&t[0].document:t.map((e=>e.document));const n=d?"documentId":"documentIds",r=d?t[0]&&t[0].id:t.map((e=>e.id));return{transactionId:e.transactionId,results:t,[n]:r}})))}function tf(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return ef(e,t,"mutate",{mutations:[{[r]:n}]},Object.assign({returnFirst:!0,returnDocuments:!0},i))}const nf=e=>void 0!==e.config().dataset&&void 0!==e.config().projectId||void 0!==e.config()["~experimental_resource"],rf=(e,t)=>nf(e)&&t.startsWith(lf(e,"query")),of=(e,t)=>t.startsWith("/data/")||rf(e,t)||((e,t)=>nf(e)&&t.startsWith(lf(e,"mutate")))(e,t)||((e,t)=>nf(e)&&t.startsWith(lf(e,"doc","")))(e,t)||((e,t)=>nf(e)&&t.startsWith(lf(e,"listen")))(e,t)||((e,t)=>nf(e)&&t.startsWith(lf(e,"history","")))(e,t);function af(e,t,n){const r=n.url||n.uri,i=e.config(),o=typeof n.canUseCdn>"u"?["GET","HEAD"].indexOf(n.method||"GET")>=0&&of(e,r):n.canUseCdn;let a=(n.useCdn??i.useCdn)&&o;const s=n.tag&&i.requestTagPrefix?[i.requestTagPrefix,n.tag].join("."):n.tag||i.requestTagPrefix;if(s&&null!==n.tag&&(n.query={tag:cd(s),...n.query}),["GET","HEAD","POST"].indexOf(n.method||"GET")>=0&&rf(e,r)){const e=n.resultSourceMap??i.resultSourceMap;void 0!==e&&!1!==e&&(n.query={resultSourceMap:e,...n.query});const t=n.perspective||i.perspective;typeof t<"u"&&("previewDrafts"===t&&gd(),jd(t),n.query={perspective:Array.isArray(t)?t.join(","):t,...n.query},(Array.isArray(t)&&t.length>0||"previewDrafts"===t||"drafts"===t)&&a&&(a=!1,md())),n.lastLiveEventId&&(n.query={...n.query,lastLiveEventId:n.lastLiveEventId}),!1===n.returnQuery&&(n.query={returnQuery:"false",...n.query}),a&&"noStale"==n.cacheMode&&(n.query={cacheMode:"noStale",...n.query})}const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n={},r=t.token||e.token;r&&(n.Authorization=`Bearer ${r}`),!t.useGlobalApi&&!e.useProjectHostname&&e.projectId&&(n["X-Sanity-Project-ID"]=e.projectId);const i=!!(typeof t.withCredentials>"u"?e.withCredentials:t.withCredentials),o=typeof t.timeout>"u"?e.timeout:t.timeout;return Object.assign({},t,{headers:Object.assign({},n,t.headers||{}),timeout:typeof o>"u"?3e5:o,proxy:t.proxy||e.proxy,json:!0,withCredentials:i,fetch:"object"==typeof t.fetch&&"object"==typeof e.fetch?{...e.fetch,...t.fetch}:t.fetch||e.fetch})}(i,Object.assign({},n,{url:cf(e,r,a)})),c=new Nc((e=>t(l,i.requester).subscribe(e)));return n.signal?c.pipe((u=n.signal,e=>new Nc((t=>{const n=()=>t.error(function(e){if(uf)return new DOMException(e?.reason??"The operation was aborted.","AbortError");const t=new Error(e?.reason??"The operation was aborted.");return t.name="AbortError",t}(u));if(u&&u.aborted)return void n();const r=e.subscribe(t);return u.addEventListener("abort",n),()=>{u.removeEventListener("abort",n),r.unsubscribe()}})))):c;var u}function sf(e,t,n){return af(e,t,n).pipe(Hu((e=>"response"===e.type)),fu((e=>e.body)))}function lf(e,t,n){const r=e.config();if(r["~experimental_resource"]){ud(r);return`${df(r)}/${void 0!==n?`${t}/${n}`:t}`.replace(/\/($|\?)/,"$1")}const i=`/${t}/${ld(r)}`;return`/data${void 0!==n?`${i}/${n}`:i}`.replace(/\/($|\?)/,"$1")}function cf(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const{url:r,cdnUrl:i}=e.config();return`${n?i:r}/${t.replace(/^\//,"")}`}const uf=!!globalThis.DOMException;const df=e=>{if(!e["~experimental_resource"])throw new Error("`resource` must be provided to perform resource queries");const{type:t,id:n}=e["~experimental_resource"];switch(t){case"dataset":{const e=n.split(".");if(2!==e.length)throw new Error('Dataset ID must be in the format "project.dataset"');return`/projects/${e[0]}/datasets/${e[1]}`}case"canvas":return`/canvases/${n}`;case"media-library":return`/media-libraries/${n}`;case"dashboard":return`/dashboards/${n}`;default:throw new Error(`Unsupported resource type: ${t.toString()}`)}};class ff{#s;#l;constructor(e,t){this.#s=e,this.#l=t}upload(e,t,n){return hf(this.#s,this.#l,e,t,n)}}class pf{#s;#l;constructor(e,t){this.#s=e,this.#l=t}upload(e,t,n){return mu(hf(this.#s,this.#l,e,t,n).pipe(Hu((e=>"response"===e.type)),fu((e=>e.body.document))))}}function hf(e,t,n,r){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};(e=>{if(-1===nd.indexOf(e))throw new Error(`Invalid asset type: ${e}. Must be one of ${nd.join(", ")}`)})(n);let o=i.extract||void 0;o&&!o.length&&(o=["none"]);const a=e.config(),s=function(e,t){return typeof File>"u"||!(t instanceof File)?e:Object.assign({filename:!1===e.preserveFilename?void 0:t.name,contentType:t.type},e)}(i,r),{tag:l,label:c,title:u,description:d,creditLine:f,filename:p,source:h}=s,m={label:c,title:u,description:d,filename:p,meta:o,creditLine:f};return h&&(m.sourceId=h.id,m.sourceName=h.name,m.sourceUrl=h.url),af(e,t,{tag:l,method:"POST",timeout:s.timeout||0,uri:mf(a,n),headers:s.contentType?{"Content-Type":s.contentType}:{},query:m,body:r})}function mf(e,t){const n="image"===t?"images":"files";if(e["~experimental_resource"]){const{type:t,id:r}=e["~experimental_resource"];switch(t){case"dataset":throw new Error("Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead.");case"canvas":return`/canvases/${r}/assets/${n}`;case"media-library":return`/media-libraries/${r}/upload`;case"dashboard":return`/dashboards/${r}/assets/${n}`;default:throw new Error(`Unsupported resource type: ${t.toString()}`)}}return`assets/${n}/${ld(e)}`}const gf=Qc((()=>n.e(165).then(n.t.bind(n,165,19)))).pipe(fu((e=>{let{default:t}=e;return t})),function(e,t,n){var r,i,o,a,s=!1;return e&&"object"===typeof e?(r=e.bufferSize,a=void 0===r?1/0:r,i=e.windowTime,t=void 0===i?1/0:i,s=void 0!==(o=e.refCount)&&o,n=e.scheduler):a=null!==e&&void 0!==e?e:1/0,wu({connector:function(){return new xu(a,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:s})}(1));function vf(){return function(e){return e.pipe(ju(((e,t)=>e instanceof Cd?Cu(du({type:"reconnect"}),$u(1e3).pipe(pu((()=>t)))):Ru((()=>e)))))}}const yf=["includePreviousRevision","includeResult","includeMutations","includeAllVersions","visibility","effectFormat","tag"],bf={includeResult:!0};function xf(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{url:r,token:i,withCredentials:o,requestTagPrefix:a}=this.config(),s=n.tag&&a?[a,n.tag].join("."):n.tag,l={...(d=n,f=bf,Object.keys(f).concat(Object.keys(d)).reduce(((e,t)=>(e[t]=typeof d[t]>"u"?f[t]:d[t],e)),{})),tag:s},c=((e,t)=>t.reduce(((t,n)=>(typeof e[n]>"u"||(t[n]=e[n]),t)),{}))(l,yf),u=`${r}${lf(this,"listen",Ud({query:e,params:t,options:{tag:s,...c}}))}`;var d,f;if(u.length>14800)return Ru((()=>new Error("Query too large for listener")));const p=l.events?l.events:["mutation"],h={};return o&&(h.withCredentials=!0),i&&(h.headers={Authorization:`Bearer ${i}`}),zd((()=>(typeof EventSource>"u"||h.headers?gf:du(EventSource)).pipe(fu((e=>new e(u,h))))),p).pipe(vf(),Hu((e=>p.includes(e.type))),fu((e=>({type:e.type,..."data"in e?e.data:{}}))))}function wf(e,t){return function(e){return t=>{let n,r=!1;const{predicate:i,...o}=e,a=t.pipe(function(e,t,n){var r=fc(e)||t||n?{next:e,error:t,complete:n}:e;return r?ru((function(e,t){var n;null===(n=r.subscribe)||void 0===n||n.call(r);var i=!0;e.subscribe(iu(t,(function(e){var n;null===(n=r.next)||void 0===n||n.call(r,e),t.next(e)}),(function(){var e;i=!1,null===(e=r.complete)||void 0===e||e.call(r),t.complete()}),(function(e){var n;i=!1,null===(n=r.error)||void 0===n||n.call(r,e),t.error(e)}),(function(){var e,t;i&&(null===(e=r.unsubscribe)||void 0===e||e.call(r)),null===(t=r.finalize)||void 0===t||t.call(r)})))})):Lc}((t=>{e.predicate(t)&&(r=!0,n=t)})),_u((()=>{r=!1,n=void 0})),wu(o));return Mu(a,new Nc((e=>{r&&e.next(n),e.complete()})))}}("function"==typeof e?{predicate:e,...t}:e)}const kf="2021-03-25";class jf{#s;constructor(e){this.#s=e}events(){let{includeDrafts:e=!1,tag:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};dd("live",this.#s.config());const{projectId:n,apiVersion:r,token:i,withCredentials:o,requestTagPrefix:a}=this.#s.config(),s=r.replace(/^v/,"");if("X"!==s&&s<kf)throw new Error(`The live events API requires API version ${kf} or later. The current API version is ${s}. Please update your API version to use this feature.`);if(e&&!i&&!o)throw new Error("The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.");const l=lf(this.#s,"live/events"),c=new URL(this.#s.getUrl(l,!1)),u=t&&a?[a,t].join("."):t;u&&c.searchParams.set("tag",u),e&&c.searchParams.set("includeDrafts","true");const d={};e&&i&&(d.headers={Authorization:`Bearer ${i}`}),e&&o&&(d.withCredentials=!0);const f=`${c.href}::${JSON.stringify(d)}`,p=Sf.get(f);if(p)return p;const h=zd((()=>(typeof EventSource>"u"||d.headers?gf:du(EventSource)).pipe(fu((e=>new e(c.href,d))))),["message","restart","welcome","reconnect","goaway"]).pipe(vf(),fu((e=>{if("message"===e.type){const{data:t,...n}=e;return{...n,tags:t.tags}}return e}))),m=function(e,t){return new Nc((n=>{const r=new AbortController,i=r.signal;return fetch(e,{...t,signal:r.signal}).then((e=>{n.next(e),n.complete()}),(e=>{i.aborted||n.error(e)})),()=>r.abort()}))}(c,{method:"OPTIONS",mode:"cors",credentials:d.withCredentials?"include":"omit",headers:d.headers}).pipe(pu((()=>Iu)),ju((()=>{throw new Gu({projectId:n})}))),g=Cu(m,h).pipe(_u((()=>Sf.delete(f))),wf({predicate:e=>"welcome"===e.type}));return Sf.set(f,g),g}}const Sf=new Map;class Cf{#s;#l;constructor(e,t){this.#s=e,this.#l=t}create(e,t){return Tf(this.#s,this.#l,"PUT",e,t)}edit(e,t){return Tf(this.#s,this.#l,"PATCH",e,t)}delete(e){return Tf(this.#s,this.#l,"DELETE",e)}list(){return sf(this.#s,this.#l,{uri:"/datasets",tag:null})}}class Ef{#s;#l;constructor(e,t){this.#s=e,this.#l=t}create(e,t){return dd("dataset",this.#s.config()),mu(Tf(this.#s,this.#l,"PUT",e,t))}edit(e,t){return dd("dataset",this.#s.config()),mu(Tf(this.#s,this.#l,"PATCH",e,t))}delete(e){return dd("dataset",this.#s.config()),mu(Tf(this.#s,this.#l,"DELETE",e))}list(){return dd("dataset",this.#s.config()),mu(sf(this.#s,this.#l,{uri:"/datasets",tag:null}))}}function Tf(e,t,n,r,i){return dd("dataset",e.config()),id(r),sf(e,t,{method:n,uri:`/datasets/${r}`,body:i,tag:null})}class Pf{#s;#l;constructor(e,t){this.#s=e,this.#l=t}list(e){dd("projects",this.#s.config());const t=!1===e?.includeMembers?"/projects?includeMembers=false":"/projects";return sf(this.#s,this.#l,{uri:t})}getById(e){return dd("projects",this.#s.config()),sf(this.#s,this.#l,{uri:`/projects/${e}`})}}class Of{#s;#l;constructor(e,t){this.#s=e,this.#l=t}list(e){dd("projects",this.#s.config());const t=!1===e?.includeMembers?"/projects?includeMembers=false":"/projects";return mu(sf(this.#s,this.#l,{uri:t}))}getById(e){return dd("projects",this.#s.config()),mu(sf(this.#s,this.#l,{uri:`/projects/${e}`}))}}class Af{#s;#l;constructor(e,t){this.#s=e,this.#l=t}getById(e){return sf(this.#s,this.#l,{uri:`/users/${e}`})}}class zf{#s;#l;constructor(e,t){this.#s=e,this.#l=t}getById(e){return mu(sf(this.#s,this.#l,{uri:`/users/${e}`}))}}class $f{assets;datasets;live;projects;users;#c;#l;listen=(()=>xf)();constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:wd;this.config(t),this.#l=e,this.assets=new ff(this,this.#l),this.datasets=new Cf(this,this.#l),this.live=new jf(this),this.projects=new Pf(this,this.#l),this.users=new Af(this,this.#l)}clone(){return new $f(this.#l,this.config())}config(e){if(void 0===e)return{...this.#c};if(this.#c&&!1===this.#c.allowReconfigure)throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return this.#c=Sd(e,this.#c||{}),this}withConfig(e){const t=this.config();return new $f(this.#l,{...t,...e,stega:{...t.stega||{},..."boolean"==typeof e?.stega?{enabled:e.stega}:e?.stega||{}}})}fetch(e,t,n){return Wd(this,this.#l,this.#c.stega,e,t,n)}getDocument(e,t){return Yd(this,this.#l,e,t)}getDocuments(e,t){return Xd(this,this.#l,e,t)}create(e,t){return tf(this,this.#l,e,"create",t)}createIfNotExists(e,t){return Kd(this,this.#l,e,t)}createOrReplace(e,t){return Gd(this,this.#l,e,t)}delete(e,t){return Jd(this,this.#l,e,t)}mutate(e,t){return Qd(this,this.#l,e,t)}patch(e,t){return new Md(e,t,this)}transaction(e){return new Vd(e,this)}action(e,t){return Zd(this,this.#l,e,t)}request(e){return sf(this,this.#l,e)}getUrl(e,t){return cf(this,e,t)}getDataUrl(e,t){return lf(this,e,t)}}class Rf{assets;datasets;live;projects;users;observable;#c;#l;listen=(()=>xf)();constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:wd;this.config(t),this.#l=e,this.assets=new pf(this,this.#l),this.datasets=new Ef(this,this.#l),this.live=new jf(this),this.projects=new Of(this,this.#l),this.users=new zf(this,this.#l),this.observable=new $f(e,t)}clone(){return new Rf(this.#l,this.config())}config(e){if(void 0===e)return{...this.#c};if(this.#c&&!1===this.#c.allowReconfigure)throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return this.observable&&this.observable.config(e),this.#c=Sd(e,this.#c||{}),this}withConfig(e){const t=this.config();return new Rf(this.#l,{...t,...e,stega:{...t.stega||{},..."boolean"==typeof e?.stega?{enabled:e.stega}:e?.stega||{}}})}fetch(e,t,n){return mu(Wd(this,this.#l,this.#c.stega,e,t,n))}getDocument(e,t){return mu(Yd(this,this.#l,e,t))}getDocuments(e,t){return mu(Xd(this,this.#l,e,t))}create(e,t){return mu(tf(this,this.#l,e,"create",t))}createIfNotExists(e,t){return mu(Kd(this,this.#l,e,t))}createOrReplace(e,t){return mu(Gd(this,this.#l,e,t))}delete(e,t){return mu(Jd(this,this.#l,e,t))}mutate(e,t){return mu(Qd(this,this.#l,e,t))}patch(e,t){return new Ld(e,t,this)}transaction(e){return new Fd(e,this)}action(e,t){return mu(Zd(this,this.#l,e,t))}request(e){return mu(sf(this,this.#l,e))}dataRequest(e,t,n){return mu(ef(this,this.#l,e,t,n))}getUrl(e,t){return cf(this,e,t)}getDataUrl(e,t){return lf(this,e,t)}}const _f=(Df=Rf,{requester:Zu(Lf=[]),createClient:e=>{const t=Zu(Lf);return new Df(((n,r)=>(r||t)({maxRedirects:0,maxRetries:e.maxRetries,retryDelay:e.retryDelay,...n})),e)}}),If=(Mf=_f.createClient,function(e){return xd(),Mf(e)});var Mf,Lf,Df;const Nf=If({projectId:"pnm3puk3",dataset:"production",useCdn:!0,apiVersion:"2022-03-07"});function Ff(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"}},{tag:"polyline",attr:{points:"12 19 5 12 12 5"}}]})(e)}function Vf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"}},{tag:"polyline",attr:{points:"12 5 19 12 12 19"}}]})(e)}function Uf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"19",x2:"12",y2:"5"}},{tag:"polyline",attr:{points:"5 12 12 5 19 12"}}]})(e)}function Bf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"}},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"}},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"}}]})(e)}function Hf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"15 18 9 12 15 6"}}]})(e)}function qf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"}}]})(e)}function Wf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"}},{tag:"polyline",attr:{points:"12 6 12 12 16 14"}}]})(e)}function Yf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}},{tag:"polyline",attr:{points:"15 3 21 3 21 9"}},{tag:"line",attr:{x1:"10",y1:"14",x2:"21",y2:"3"}}]})(e)}function Xf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"}}]})(e)}function Kf(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"}},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}},{tag:"line",attr:{x1:"11",y1:"8",x2:"11",y2:"14"}},{tag:"line",attr:{x1:"8",y1:"11",x2:"14",y2:"11"}}]})(e)}function Gf(){const[t,n]=(0,e.useState)(null),[r,i]=(0,e.useState)(!0);return(0,e.useEffect)((()=>{i(!0),Nf.fetch('*[_type == "post"]{\n                    title,\n                    slug,\n                    publishedAt,\n                    _createdAt,\n                    body,\n                    mainImage{\n                        asset->{\n                            _id,\n                            url\n                        },\n                        alt\n                    }\n                }').then((e=>{console.log("Fetched posts:",e);const t=e.map((e=>({...e,displayDate:e.publishedAt||e._createdAt,estimatedReadingTime:e.body?Math.max(1,Math.round(e.body.reduce(((e,t)=>{if("block"===t._type&&t.children){return e+t.children.filter((e=>"span"===e._type)).map((e=>e.text)).join("").length}return e}),0)/1e3)):1,excerpt:e.body?e.body.filter((e=>"block"===e._type&&e.children)).slice(0,2).map((e=>e.children.filter((e=>"span"===e._type)).map((e=>e.text)).join(""))).join(" ").substring(0,150)+"...":"Click to read this article..."}))).sort(((e,t)=>new Date(t.displayDate)-new Date(e.displayDate)));n(t),i(!1)})).catch((e=>{console.error("Error fetching posts:",e),i(!1)}))}),[]),r?(0,la.jsx)(tp,{children:(0,la.jsx)(np,{})}):t&&0!==t.length?(0,la.jsxs)(ep,{children:[(0,la.jsxs)(sp,{children:[(0,la.jsx)(lp,{children:"Recent Posts"}),(0,la.jsxs)(cp,{children:[t.length," article",1!==t.length?"s":""," available"]})]}),(0,la.jsx)(up,{children:t.map(((e,t)=>(0,la.jsx)(dp,{$index:t,children:(0,la.jsxs)(fp,{to:`/post/${e.slug.current}`,children:[(0,la.jsxs)(pp,{children:[e.mainImage?(0,la.jsx)(hp,{src:e.mainImage.asset.url,alt:e.mainImage.alt||e.title,loading:"lazy"}):(0,la.jsx)(mp,{children:(0,la.jsx)(gp,{children:"\ud83d\udcc4"})}),(0,la.jsx)(vp,{children:(0,la.jsxs)(yp,{children:[(0,la.jsx)("span",{children:"Read Article"}),(0,la.jsx)(Vf,{})]})})]}),(0,la.jsxs)(bp,{children:[(0,la.jsxs)(xp,{children:[(0,la.jsxs)(wp,{children:[(0,la.jsx)(Bf,{size:14}),(0,la.jsx)("span",{children:new Date(e.displayDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})})]}),(0,la.jsxs)(wp,{children:[(0,la.jsx)(Wf,{size:14}),(0,la.jsxs)("span",{children:[e.estimatedReadingTime," min read"]})]})]}),(0,la.jsx)(kp,{children:e.title}),e.excerpt&&(0,la.jsx)(jp,{children:e.excerpt}),(0,la.jsxs)(Sp,{children:[(0,la.jsx)("span",{children:"Continue Reading"}),(0,la.jsx)(Vf,{})]})]})]})},e.slug.current)))})]}):(0,la.jsxs)(rp,{children:[(0,la.jsx)(ip,{children:"\ud83d\udcdd"}),(0,la.jsx)(op,{children:"No Posts Yet"}),(0,la.jsx)(ap,{children:"Check back soon for new articles and insights!"})]})}const Jf=_e`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,Qf=_e`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`,Zf=_e`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
`,ep=(_e`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
`,Ie.div`
    width: 100%;
`),tp=Ie.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`,np=Ie.div`
    width: 50px;
    height: 50px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: ${Qf} 1s linear infinite;
`,rp=Ie.div`
    text-align: center;
    padding: 4rem 2rem;
    color: rgba(255, 255, 255, 0.5);
`,ip=Ie.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`,op=Ie.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
`,ap=Ie.p`
    font-size: 1rem;
    line-height: 1.6;
`,sp=Ie.div`
    text-align: center;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
    
    @media (max-width: 480px) {
        margin-bottom: 1.5rem;
    }
`,lp=Ie.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`,cp=Ie.p`
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    margin: 0;
    
    @media (max-width: 480px) {
        font-size: 0.85rem;
    }
`,up=Ie.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.8rem;
    }
`,dp=Ie.article`
    background: rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: ${Jf} 0.6s ease-out ${e=>.1*e.$index}s both;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        border-color: rgba(52, 152, 219, 0.3);
    }
    
    @media (max-width: 480px) {
        border-radius: 12px;
        
        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        }
    }
`,fp=Ie(oa)`
    display: block;
    text-decoration: none;
    color: inherit;
    height: 100%;
`,pp=Ie.div`
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    
    @media (max-width: 480px) {
        height: 140px;
    }
`,hp=Ie.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    ${dp}:hover & {
        transform: scale(1.05);
    }
`,mp=Ie.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: ${Zf} 2s infinite;
    }
`,gp=Ie.div`
    font-size: 3rem;
    opacity: 0.8;
    
    @media (max-width: 480px) {
        font-size: 2rem;
    }
`,vp=Ie.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${dp}:hover & {
        opacity: 1;
    }
`,yp=Ie.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    color: #667eea;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    transform: translateY(10px);
    transition: transform 0.3s ease;
    
    ${dp}:hover & {
        transform: translateY(0);
    }
    
    svg {
        transition: transform 0.3s ease;
    }
    
    &:hover svg {
        transform: translateX(3px);
    }
    
    @media (max-width: 480px) {
        padding: 0.5rem 0.8rem;
        font-size: 0.7rem;
        border-radius: 15px;
        gap: 0.3rem;
        
        svg {
            width: 12px;
            height: 12px;
        }
    }
`,bp=Ie.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: calc(100% - 220px);
    
    @media (max-width: 480px) {
        padding: 0.8rem;
        height: calc(100% - 140px);
    }
`,xp=Ie.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    
    @media (max-width: 480px) {
        gap: 0.5rem;
        margin-bottom: 0.6rem;
    }
`,wp=Ie.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.85rem;
    
    svg {
        color: #667eea;
    }
    
    @media (max-width: 480px) {
        font-size: 0.65rem;
        gap: 0.25rem;
        
        svg {
            width: 10px;
            height: 10px;
        }
    }
`,kp=Ie.h3`
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 0.7rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        line-height: 1.2;
    }
`,jp=Ie.p`
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.95rem;
    
    @media (max-width: 768px) {
        -webkit-line-clamp: 2;
        margin-bottom: 1rem;
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        display: none;
    }
`,Sp=Ie.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: auto;
    transition: all 0.3s ease;
    
    svg {
        transition: transform 0.3s ease;
    }
    
    ${dp}:hover & {
        color: #5a67d8;
        
        svg {
            transform: translateX(3px);
        }
    }
    
    @media (max-width: 480px) {
        font-size: 0.7rem;
        gap: 0.3rem;
        
        svg {
            width: 12px;
            height: 12px;
        }
    }
`;const Cp=_e`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Ep=(_e`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`,_e`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`),Tp=Ie.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px; /* Space for navbar */
`,Pp=Ie.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`,Op=Ie.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 30, 0.75);
    backdrop-filter: blur(1px);
  }
`,Ap=Ie.div`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`,zp=Ie.header`
  text-align: center;
  padding: 4rem 0 3rem;
  animation: ${Cp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 2rem 0 2rem;
  }
`,$p=Ie.div`
  max-width: 800px;
  margin: 0 auto;
`,Rp=Ie.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
`,_p=Ie.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`,Ip=Ie.div`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9de0);
  background-size: 300% 300%;
  border-radius: 2px;
  animation: ${Ep} 3s ease infinite;
`,Mp=Ie.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`,Lp=Ie.section`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  animation: ${Cp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 15px;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }
`,Dp=function(){return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"Blog | Felipe Cantu Jr"}),(0,la.jsx)("meta",{name:"description",content:"Explore insightful articles about web development, technology trends, and programming best practices."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/blog"}),(0,la.jsx)("meta",{property:"og:title",content:"Blog | Felipe Cantu Jr"}),(0,la.jsx)("meta",{property:"og:description",content:"Explore insightful articles about web development, technology trends, and programming best practices."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/blog"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsxs)(Tp,{children:[(0,la.jsx)(Pp,{children:(0,la.jsx)(Op,{})}),(0,la.jsxs)(Ap,{children:[(0,la.jsx)(zp,{children:(0,la.jsxs)($p,{children:[(0,la.jsxs)(Rp,{children:[(0,la.jsx)(_p,{children:"Latest Articles"}),(0,la.jsx)(Ip,{})]}),(0,la.jsx)(Mp,{children:"Discover insights about web development, technology trends, and programming best practices"})]})}),(0,la.jsx)(Lp,{children:(0,la.jsx)(Gf,{})})]})]})]})};var Np=n(138),Fp=n.n(Np);const Vp=1/60*1e3,Up="undefined"!==typeof performance?()=>performance.now():()=>Date.now(),Bp="undefined"!==typeof window?e=>window.requestAnimationFrame(e):e=>setTimeout((()=>e(Up())),Vp);let Hp=!0,qp=!1,Wp=!1;const Yp={delta:0,timestamp:0},Xp=["read","update","preRender","render","postRender"],Kp=Xp.reduce(((e,t)=>(e[t]=function(e){let t=[],n=[],r=0,i=!1,o=!1;const a=new WeakSet,s={schedule:function(e){const o=arguments.length>2&&void 0!==arguments[2]&&arguments[2]&&i,s=o?t:n;return arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&a.add(e),-1===s.indexOf(e)&&(s.push(e),o&&i&&(r=t.length)),e},cancel:e=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1),a.delete(e)},process:l=>{if(i)o=!0;else{if(i=!0,[t,n]=[n,t],n.length=0,r=t.length,r)for(let n=0;n<r;n++){const r=t[n];r(l),a.has(r)&&(s.schedule(r),e())}i=!1,o&&(o=!1,s.process(l))}}};return s}((()=>qp=!0)),e)),{}),Gp=Xp.reduce(((e,t)=>{const n=Kp[t];return e[t]=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return qp||th(),n.schedule(e,t,r)},e}),{}),Jp=Xp.reduce(((e,t)=>(e[t]=Kp[t].cancel,e)),{}),Qp=Xp.reduce(((e,t)=>(e[t]=()=>Kp[t].process(Yp),e)),{}),Zp=e=>Kp[e].process(Yp),eh=e=>{qp=!1,Yp.delta=Hp?Vp:Math.max(Math.min(e-Yp.timestamp,40),1),Yp.timestamp=e,Wp=!0,Xp.forEach(Zp),Wp=!1,qp&&(Hp=!1,Bp(eh))},th=()=>{qp=!0,Hp=!0,Wp||Bp(eh)},nh=()=>Yp,rh=Gp;var ih="undefined"!==typeof document,oh=ih?e.useLayoutEffect:e.useEffect;function ah(){var t=(0,e.useRef)(!1);return oh((function(){return t.current=!0,function(){t.current=!1}}),[]),t}var sh=(0,e.createContext)(null);function lh(t){var n=(0,e.useRef)(null);return null===n.current&&(n.current=t()),n.current}var ch=0,uh=function(){return ch++},dh=function(){return lh(uh)},fh=function(t){var n=t.children,r=t.initial,i=t.isPresent,o=t.onExitComplete,a=t.custom,s=t.presenceAffectsLayout,l=lh(ph),c=dh(),u=(0,e.useMemo)((function(){return{id:c,initial:r,isPresent:i,custom:a,onExitComplete:function(e){var t,n;l.set(e,!0);try{for(var r=ac(l.values()),i=r.next();!i.done;i=r.next()){if(!i.value)return}}catch(a){t={error:a}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}null===o||void 0===o||o()},register:function(e){return l.set(e,!1),function(){return l.delete(e)}}}}),s?void 0:[i]);return(0,e.useMemo)((function(){l.forEach((function(e,t){return l.set(t,!1)}))}),[i]),e.useEffect((function(){!i&&!l.size&&(null===o||void 0===o||o())}),[i]),e.createElement(sh.Provider,{value:u},n)};function ph(){return new Map}var hh=(0,e.createContext)({});function mh(t){return(0,e.useEffect)((function(){return function(){return t()}}),[])}var gh=function(e){return e.key||""};var vh=function(t){var n=t.children,r=t.custom,i=t.initial,o=void 0===i||i,a=t.onExitComplete,s=t.exitBeforeEnter,l=t.presenceAffectsLayout,c=void 0===l||l,u=sc(function(){var t=ah(),n=sc((0,e.useState)(0),2),r=n[0],i=n[1],o=(0,e.useCallback)((function(){t.current&&i(r+1)}),[r]);return[(0,e.useCallback)((function(){return rh.postRender(o)}),[o]),r]}(),1),d=u[0],f=(0,e.useContext)(hh).forceRender;f&&(d=f);var p=ah(),h=function(t){var n=[];return e.Children.forEach(t,(function(t){(0,e.isValidElement)(t)&&n.push(t)})),n}(n),m=h,g=new Set,v=(0,e.useRef)(m),y=(0,e.useRef)(new Map).current,b=(0,e.useRef)(!0);if(oh((function(){b.current=!1,function(e,t){e.forEach((function(e){var n=gh(e);t.set(n,e)}))}(h,y),v.current=m})),mh((function(){b.current=!0,y.clear(),g.clear()})),b.current)return e.createElement(e.Fragment,null,m.map((function(t){return e.createElement(fh,{key:gh(t),isPresent:!0,initial:!!o&&void 0,presenceAffectsLayout:c},t)})));m=lc([],sc(m),!1);for(var x=v.current.map(gh),w=h.map(gh),k=x.length,j=0;j<k;j++){var S=x[j];-1===w.indexOf(S)&&g.add(S)}return s&&g.size&&(m=[]),g.forEach((function(t){if(-1===w.indexOf(t)){var n=y.get(t);if(n){var i=x.indexOf(t);m.splice(i,0,e.createElement(fh,{key:gh(n),isPresent:!1,onExitComplete:function(){y.delete(t),g.delete(t);var e=v.current.findIndex((function(e){return e.key===t}));if(v.current.splice(e,1),!g.size){if(v.current=h,!1===p.current)return;d(),a&&a()}},custom:r,presenceAffectsLayout:c},n))}}})),m=m.map((function(t){var n=t.key;return g.has(n)?t:e.createElement(fh,{key:gh(t),isPresent:!0,presenceAffectsLayout:c},t)})),e.createElement(e.Fragment,null,g.size?m:m.map((function(t){return(0,e.cloneElement)(t)})))},yh=function(e){return{isEnabled:function(t){return e.some((function(e){return!!t[e]}))}}},bh={measureLayout:yh(["layout","layoutId","drag"]),animation:yh(["animate","exit","variants","whileHover","whileTap","whileFocus","whileDrag","whileInView"]),exit:yh(["exit"]),drag:yh(["drag","dragControls"]),focus:yh(["whileFocus"]),hover:yh(["whileHover","onHoverStart","onHoverEnd"]),tap:yh(["whileTap","onTap","onTapStart","onTapCancel"]),pan:yh(["onPan","onPanStart","onPanSessionStart","onPanEnd"]),inView:yh(["whileInView","onViewportEnter","onViewportLeave"])};var xh=(0,e.createContext)({strict:!1}),wh=Object.keys(bh),kh=wh.length;var jh=(0,e.createContext)({transformPagePoint:function(e){return e},isStatic:!1,reducedMotion:"never"}),Sh=(0,e.createContext)({});var Ch={current:null},Eh=!1;function Th(){return!Eh&&function(){if(Eh=!0,ih)if(window.matchMedia){var e=window.matchMedia("(prefers-reduced-motion)"),t=function(){return Ch.current=e.matches};e.addListener(t),t()}else Ch.current=!1}(),sc((0,e.useState)(Ch.current),1)[0]}function Ph(t,n,r,i){var o=(0,e.useContext)(xh),a=(0,e.useContext)(Sh).visualElement,s=(0,e.useContext)(sh),l=function(){var t=Th(),n=(0,e.useContext)(jh).reducedMotion;return"never"!==n&&("always"===n||t)}(),c=(0,e.useRef)(void 0);i||(i=o.renderer),!c.current&&i&&(c.current=i(t,{visualState:n,parent:a,props:r,presenceId:null===s||void 0===s?void 0:s.id,blockInitialAnimation:!1===(null===s||void 0===s?void 0:s.initial),shouldReduceMotion:l}));var u=c.current;return oh((function(){null===u||void 0===u||u.syncRender()})),(0,e.useEffect)((function(){var e;null===(e=null===u||void 0===u?void 0:u.animationState)||void 0===e||e.animateChanges()})),oh((function(){return function(){return null===u||void 0===u?void 0:u.notifyUnmount()}}),[]),u}function Oh(e){return"object"===typeof e&&Object.prototype.hasOwnProperty.call(e,"current")}function Ah(e){return Array.isArray(e)}function zh(e){return"string"===typeof e||Ah(e)}function $h(e,t,n,r,i){var o;return void 0===r&&(r={}),void 0===i&&(i={}),"function"===typeof t&&(t=t(null!==n&&void 0!==n?n:e.custom,r,i)),"string"===typeof t&&(t=null===(o=e.variants)||void 0===o?void 0:o[t]),"function"===typeof t&&(t=t(null!==n&&void 0!==n?n:e.custom,r,i)),t}function Rh(e,t,n){var r=e.getProps();return $h(r,t,null!==n&&void 0!==n?n:r.custom,function(e){var t={};return e.forEachValue((function(e,n){return t[n]=e.get()})),t}(e),function(e){var t={};return e.forEachValue((function(e,n){return t[n]=e.getVelocity()})),t}(e))}function _h(e){var t;return"function"===typeof(null===(t=e.animate)||void 0===t?void 0:t.start)||zh(e.initial)||zh(e.animate)||zh(e.whileHover)||zh(e.whileDrag)||zh(e.whileTap)||zh(e.whileFocus)||zh(e.exit)}function Ih(e){return Boolean(_h(e)||e.variants)}function Mh(t){var n=function(e,t){if(_h(e)){var n=e.initial,r=e.animate;return{initial:!1===n||zh(n)?n:void 0,animate:zh(r)?r:void 0}}return!1!==e.inherit?t:{}}(t,(0,e.useContext)(Sh)),r=n.initial,i=n.animate;return(0,e.useMemo)((function(){return{initial:r,animate:i}}),[Lh(r),Lh(i)])}function Lh(e){return Array.isArray(e)?e.join(" "):e}var Dh={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Nh=1;var Fh=(0,e.createContext)({});var Vh=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return tc(t,e),t.prototype.getSnapshotBeforeUpdate=function(){return this.updateProps(),null},t.prototype.componentDidUpdate=function(){},t.prototype.updateProps=function(){var e=this.props,t=e.visualElement,n=e.props;t&&t.setProps(n)},t.prototype.render=function(){return this.props.children},t}(e.Component);function Uh(t){var n=t.preloadedFeatures,r=t.createVisualElement,i=t.projectionNodeConstructor,o=t.useRender,a=t.useVisualState,s=t.Component;return n&&function(e){for(var t in e)null!==e[t]&&("projectionNodeConstructor"===t?bh.projectionNodeConstructor=e[t]:bh[t].Component=e[t])}(n),(0,e.forwardRef)((function(t,n){var l=function(t){var n,r=t.layoutId,i=null===(n=(0,e.useContext)(hh))||void 0===n?void 0:n.id;return i&&void 0!==r?i+"-"+r:r}(t);t=nc(nc({},t),{layoutId:l});var c=(0,e.useContext)(jh),u=null,d=Mh(t),f=c.isStatic?void 0:lh((function(){if(Dh.hasEverUpdated)return Nh++})),p=a(t,c.isStatic);return!c.isStatic&&ih&&(d.visualElement=Ph(s,p,nc(nc({},c),t),r),function(t,n,r,i){var o,a=n.layoutId,s=n.layout,l=n.drag,c=n.dragConstraints,u=n.layoutScroll,d=(0,e.useContext)(Fh);i&&r&&!(null===r||void 0===r?void 0:r.projection)&&(r.projection=new i(t,r.getLatestValues(),null===(o=r.parent)||void 0===o?void 0:o.projection),r.projection.setOptions({layoutId:a,layout:s,alwaysMeasureLayout:Boolean(l)||c&&Oh(c),visualElement:r,scheduleRender:function(){return r.scheduleRender()},animationType:"string"===typeof s?s:"both",initialPromotionConfig:d,layoutScroll:u}))}(f,t,d.visualElement,i||bh.projectionNodeConstructor),u=function(t,n){var r=[];if((0,e.useContext)(xh),!n)return null;for(var i=0;i<kh;i++){var o=wh[i],a=bh[o],s=a.isEnabled,l=a.Component;s(t)&&l&&r.push(e.createElement(l,nc({key:o},t,{visualElement:n})))}return r}(t,d.visualElement)),e.createElement(Vh,{visualElement:d.visualElement,props:nc(nc({},c),t)},u,e.createElement(Sh.Provider,{value:d},o(s,t,f,function(t,n,r){return(0,e.useCallback)((function(e){var i;e&&(null===(i=t.mount)||void 0===i||i.call(t,e)),n&&(e?n.mount(e):n.unmount()),r&&("function"===typeof r?r(e):Oh(r)&&(r.current=e))}),[n])}(p,d.visualElement,n),p,c.isStatic,d.visualElement)))}))}function Bh(e){function t(t,n){return void 0===n&&(n={}),Uh(e(t,n))}if("undefined"===typeof Proxy)return t;var n=new Map;return new Proxy(t,{get:function(e,r){return n.has(r)||n.set(r,t(r)),n.get(r)}})}var Hh=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","svg","switch","symbol","text","tspan","use","view"];function qh(e){return"string"===typeof e&&!e.includes("-")&&!!(Hh.indexOf(e)>-1||/[A-Z]/.test(e))}var Wh={};var Yh=["","X","Y","Z"],Xh=["transformPerspective","x","y","z"];function Kh(e,t){return Xh.indexOf(e)-Xh.indexOf(t)}["translate","scale","rotate","skew"].forEach((function(e){return Yh.forEach((function(t){return Xh.push(e+t)}))}));var Gh=new Set(Xh);function Jh(e){return Gh.has(e)}var Qh=new Set(["originX","originY","originZ"]);function Zh(e){return Qh.has(e)}function em(e,t){var n=t.layout,r=t.layoutId;return Jh(e)||Zh(e)||(n||void 0!==r)&&(!!Wh[e]||"opacity"===e)}var tm=function(e){return Boolean(null!==e&&"object"===typeof e&&e.getVelocity)},nm={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"};function rm(e){return e.startsWith("--")}var im=function(e,t){return t&&"number"===typeof e?t.transform(e):e};const om=(e,t)=>n=>Math.max(Math.min(n,t),e),am=e=>e%1?Number(e.toFixed(5)):e,sm=/(-)?([\d]*\.?[\d])+/g,lm=/(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi,cm=/^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;function um(e){return"string"===typeof e}const dm=e=>({test:t=>um(t)&&t.endsWith(e)&&1===t.split(" ").length,parse:parseFloat,transform:t=>`${t}${e}`}),fm=dm("deg"),pm=dm("%"),hm=dm("px"),mm=dm("vh"),gm=dm("vw"),vm=Object.assign(Object.assign({},pm),{parse:e=>pm.parse(e)/100,transform:e=>pm.transform(100*e)}),ym={test:e=>"number"===typeof e,parse:parseFloat,transform:e=>e},bm=Object.assign(Object.assign({},ym),{transform:om(0,1)}),xm=Object.assign(Object.assign({},ym),{default:1});var wm=nc(nc({},ym),{transform:Math.round}),km={borderWidth:hm,borderTopWidth:hm,borderRightWidth:hm,borderBottomWidth:hm,borderLeftWidth:hm,borderRadius:hm,radius:hm,borderTopLeftRadius:hm,borderTopRightRadius:hm,borderBottomRightRadius:hm,borderBottomLeftRadius:hm,width:hm,maxWidth:hm,height:hm,maxHeight:hm,size:hm,top:hm,right:hm,bottom:hm,left:hm,padding:hm,paddingTop:hm,paddingRight:hm,paddingBottom:hm,paddingLeft:hm,margin:hm,marginTop:hm,marginRight:hm,marginBottom:hm,marginLeft:hm,rotate:fm,rotateX:fm,rotateY:fm,rotateZ:fm,scale:xm,scaleX:xm,scaleY:xm,scaleZ:xm,skew:fm,skewX:fm,skewY:fm,distance:hm,translateX:hm,translateY:hm,translateZ:hm,x:hm,y:hm,z:hm,perspective:hm,transformPerspective:hm,opacity:bm,originX:vm,originY:vm,originZ:hm,zIndex:wm,fillOpacity:bm,strokeOpacity:bm,numOctaves:wm};function jm(e,t,n,r){var i,o=e.style,a=e.vars,s=e.transform,l=e.transformKeys,c=e.transformOrigin;l.length=0;var u=!1,d=!1,f=!0;for(var p in t){var h=t[p];if(rm(p))a[p]=h;else{var m=km[p],g=im(h,m);if(Jh(p)){if(u=!0,s[p]=g,l.push(p),!f)continue;h!==(null!==(i=m.default)&&void 0!==i?i:0)&&(f=!1)}else Zh(p)?(c[p]=g,d=!0):o[p]=g}}u?o.transform=function(e,t,n,r){var i=e.transform,o=e.transformKeys,a=t.enableHardwareAcceleration,s=void 0===a||a,l=t.allowTransformNone,c=void 0===l||l,u="";o.sort(Kh);for(var d=!1,f=o.length,p=0;p<f;p++){var h=o[p];u+="".concat(nm[h]||h,"(").concat(i[h],") "),"z"===h&&(d=!0)}return!d&&s?u+="translateZ(0)":u=u.trim(),r?u=r(i,n?"":u):c&&n&&(u="none"),u}(e,n,f,r):r?o.transform=r({},""):!t.transform&&o.transform&&(o.transform="none"),d&&(o.transformOrigin=function(e){var t=e.originX,n=void 0===t?"50%":t,r=e.originY,i=void 0===r?"50%":r,o=e.originZ,a=void 0===o?0:o;return"".concat(n," ").concat(i," ").concat(a)}(c))}var Sm=function(){return{style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}}};function Cm(e,t,n){for(var r in t)tm(t[r])||em(r,n)||(e[r]=t[r])}function Em(t,n,r){var i={};return Cm(i,t.style||{},t),Object.assign(i,function(t,n,r){var i=t.transformTemplate;return(0,e.useMemo)((function(){var e={style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}};jm(e,n,{enableHardwareAcceleration:!r},i);var t=e.style;return nc(nc({},e.vars),t)}),[n])}(t,n,r)),t.transformValues&&(i=t.transformValues(i)),i}function Tm(e,t,n){var r={},i=Em(e,t,n);return Boolean(e.drag)&&!1!==e.dragListener&&(r.draggable=!1,i.userSelect=i.WebkitUserSelect=i.WebkitTouchCallout="none",i.touchAction=!0===e.drag?"none":"pan-".concat("x"===e.drag?"y":"x")),r.style=i,r}var Pm=new Set(["initial","animate","exit","style","variants","transition","transformTemplate","transformValues","custom","inherit","layout","layoutId","layoutDependency","onLayoutAnimationStart","onLayoutAnimationComplete","onLayoutMeasure","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","drag","dragControls","dragListener","dragConstraints","dragDirectionLock","dragSnapToOrigin","_dragX","_dragY","dragElastic","dragMomentum","dragPropagation","dragTransition","whileDrag","onPan","onPanStart","onPanEnd","onPanSessionStart","onTap","onTapStart","onTapCancel","onHoverStart","onHoverEnd","whileFocus","whileTap","whileHover","whileInView","onViewportEnter","onViewportLeave","viewport","layoutScroll"]);function Om(e){return Pm.has(e)}var Am,zm=function(e){return!Om(e)};try{(Am=require("@emotion/is-prop-valid").default)&&(zm=function(e){return e.startsWith("on")?!Om(e):Am(e)})}catch(hP){}function $m(e,t,n){return"string"===typeof e?e:hm.transform(t+n*e)}var Rm={offset:"stroke-dashoffset",array:"stroke-dasharray"},_m={offset:"strokeDashoffset",array:"strokeDasharray"};function Im(e,t,n,r){var i=t.attrX,o=t.attrY,a=t.originX,s=t.originY,l=t.pathLength,c=t.pathSpacing,u=void 0===c?1:c,d=t.pathOffset,f=void 0===d?0:d;jm(e,rc(t,["attrX","attrY","originX","originY","pathLength","pathSpacing","pathOffset"]),n,r),e.attrs=e.style,e.style={};var p=e.attrs,h=e.style,m=e.dimensions;p.transform&&(m&&(h.transform=p.transform),delete p.transform),m&&(void 0!==a||void 0!==s||h.transform)&&(h.transformOrigin=function(e,t,n){var r=$m(t,e.x,e.width),i=$m(n,e.y,e.height);return"".concat(r," ").concat(i)}(m,void 0!==a?a:.5,void 0!==s?s:.5)),void 0!==i&&(p.x=i),void 0!==o&&(p.y=o),void 0!==l&&function(e,t,n,r,i){void 0===n&&(n=1),void 0===r&&(r=0),void 0===i&&(i=!0),e.pathLength=1;var o=i?Rm:_m;e[o.offset]=hm.transform(-r);var a=hm.transform(t),s=hm.transform(n);e[o.array]="".concat(a," ").concat(s)}(p,l,u,f,!1)}var Mm=function(){return nc(nc({},{style:{},transform:{},transformKeys:[],transformOrigin:{},vars:{}}),{attrs:{}})};function Lm(t,n){var r=(0,e.useMemo)((function(){var e=Mm();return Im(e,n,{enableHardwareAcceleration:!1},t.transformTemplate),nc(nc({},e.attrs),{style:nc({},e.style)})}),[n]);if(t.style){var i={};Cm(i,t.style,t),r.style=nc(nc({},i),r.style)}return r}function Dm(t){void 0===t&&(t=!1);return function(n,r,i,o,a,s){var l=a.latestValues,c=(qh(n)?Lm:Tm)(r,l,s),u=function(e,t,n){var r={};for(var i in e)(zm(i)||!0===n&&Om(i)||!t&&!Om(i)||e.draggable&&i.startsWith("onDrag"))&&(r[i]=e[i]);return r}(r,"string"===typeof n,t),d=nc(nc(nc({},u),c),{ref:o});return i&&(d["data-projection-id"]=i),(0,e.createElement)(n,d)}}var Nm=/([a-z])([A-Z])/g,Fm=function(e){return e.replace(Nm,"$1-$2").toLowerCase()};function Vm(e,t,n,r){var i=t.style,o=t.vars;for(var a in Object.assign(e.style,i,r&&r.getProjectionStyles(n)),o)e.style.setProperty(a,o[a])}var Um=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength"]);function Bm(e,t,n,r){for(var i in Vm(e,t,void 0,r),t.attrs)e.setAttribute(Um.has(i)?i:Fm(i),t.attrs[i])}function Hm(e){var t=e.style,n={};for(var r in t)(tm(t[r])||em(r,e))&&(n[r]=t[r]);return n}function qm(e){var t=Hm(e);for(var n in e){if(tm(e[n]))t["x"===n||"y"===n?"attr"+n.toUpperCase():n]=e[n]}return t}function Wm(e){return"object"===typeof e&&"function"===typeof e.start}var Ym=function(e){return Array.isArray(e)},Xm=function(e){return Ym(e)?e[e.length-1]||0:e};function Km(e){var t=tm(e)?e.get():e;return function(e){return Boolean(e&&"object"===typeof e&&e.mix&&e.toValue)}(t)?t.toValue():t}function Gm(e,t,n,r){var i=e.scrapeMotionValuesFromProps,o=e.createRenderState,a=e.onMount,s={latestValues:Qm(t,n,r,i),renderState:o()};return a&&(s.mount=function(e){return a(t,e,s)}),s}var Jm=function(t){return function(n,r){var i=(0,e.useContext)(Sh),o=(0,e.useContext)(sh);return r?Gm(t,n,i,o):lh((function(){return Gm(t,n,i,o)}))}};function Qm(e,t,n,r){var i={},o=!1===(null===n||void 0===n?void 0:n.initial),a=r(e);for(var s in a)i[s]=Km(a[s]);var l=e.initial,c=e.animate,u=_h(e),d=Ih(e);t&&d&&!u&&!1!==e.inherit&&(null!==l&&void 0!==l||(l=t.initial),null!==c&&void 0!==c||(c=t.animate));var f=o||!1===l,p=f?c:l;p&&"boolean"!==typeof p&&!Wm(p)&&(Array.isArray(p)?p:[p]).forEach((function(t){var n=$h(e,t);if(n){var r=n.transitionEnd;n.transition;var o=rc(n,["transitionEnd","transition"]);for(var a in o){var s=o[a];if(Array.isArray(s))s=s[f?s.length-1:0];null!==s&&(i[a]=s)}for(var a in r)i[a]=r[a]}}));return i}var Zm,eg={useVisualState:Jm({scrapeMotionValuesFromProps:qm,createRenderState:Mm,onMount:function(e,t,n){var r=n.renderState,i=n.latestValues;try{r.dimensions="function"===typeof t.getBBox?t.getBBox():t.getBoundingClientRect()}catch(pl){r.dimensions={x:0,y:0,width:0,height:0}}Im(r,i,{enableHardwareAcceleration:!1},e.transformTemplate),Bm(t,r)}})},tg={useVisualState:Jm({scrapeMotionValuesFromProps:Hm,createRenderState:Sm})};function ng(e,t,n,r){return void 0===r&&(r={passive:!0}),e.addEventListener(t,n,r),function(){return e.removeEventListener(t,n)}}function rg(t,n,r,i){(0,e.useEffect)((function(){var e=t.current;if(r&&e)return ng(e,n,r,i)}),[t,n,r,i])}function ig(e){return"undefined"!==typeof PointerEvent&&e instanceof PointerEvent?!("mouse"!==e.pointerType):e instanceof MouseEvent}function og(e){return!!e.touches}!function(e){e.Animate="animate",e.Hover="whileHover",e.Tap="whileTap",e.Drag="whileDrag",e.Focus="whileFocus",e.InView="whileInView",e.Exit="exit"}(Zm||(Zm={}));var ag={pageX:0,pageY:0};function sg(e,t){void 0===t&&(t="page");var n=e.touches[0]||e.changedTouches[0]||ag;return{x:n[t+"X"],y:n[t+"Y"]}}function lg(e,t){return void 0===t&&(t="page"),{x:e[t+"X"],y:e[t+"Y"]}}function cg(e,t){return void 0===t&&(t="page"),{point:og(e)?sg(e,t):lg(e,t)}}var ug=function(e,t){void 0===t&&(t=!1);var n,r=function(t){return e(t,cg(t))};return t?(n=r,function(e){var t=e instanceof MouseEvent;(!t||t&&0===e.button)&&n(e)}):r},dg={pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointercancel:"mousecancel",pointerover:"mouseover",pointerout:"mouseout",pointerenter:"mouseenter",pointerleave:"mouseleave"},fg={pointerdown:"touchstart",pointermove:"touchmove",pointerup:"touchend",pointercancel:"touchcancel"};function pg(e){return ih&&null===window.onpointerdown?e:ih&&null===window.ontouchstart?fg[e]:ih&&null===window.onmousedown?dg[e]:e}function hg(e,t,n,r){return ng(e,pg(t),ug(n,"pointerdown"===t),r)}function mg(e,t,n,r){return rg(e,pg(t),n&&ug(n,"pointerdown"===t),r)}function gg(e){var t=null;return function(){return null===t&&(t=e,function(){t=null})}}var vg=gg("dragHorizontal"),yg=gg("dragVertical");function bg(e){var t=!1;if("y"===e)t=yg();else if("x"===e)t=vg();else{var n=vg(),r=yg();n&&r?t=function(){n(),r()}:(n&&n(),r&&r())}return t}function xg(){var e=bg(!0);return!e||(e(),!1)}function wg(e,t,n){return function(r,i){var o;ig(r)&&!xg()&&(null===(o=e.animationState)||void 0===o||o.setActive(Zm.Hover,t),null===n||void 0===n||n(r,i))}}var kg=function(e,t){return!!t&&(e===t||kg(e,t.parentElement))};const jg=(e,t)=>n=>t(e(n)),Sg=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(jg)};new Set;var Cg=new WeakMap,Eg=new WeakMap,Tg=function(e){var t;null===(t=Cg.get(e.target))||void 0===t||t(e)},Pg=function(e){e.forEach(Tg)};function Og(e,t,n){var r=function(e){var t=e.root,n=rc(e,["root"]),r=t||document;Eg.has(r)||Eg.set(r,{});var i=Eg.get(r),o=JSON.stringify(n);return i[o]||(i[o]=new IntersectionObserver(Pg,nc({root:t},n))),i[o]}(t);return Cg.set(e,n),r.observe(e),function(){Cg.delete(e),r.unobserve(e)}}var Ag={some:0,all:1};function zg(t,n,r,i){var o=i.root,a=i.margin,s=i.amount,l=void 0===s?"some":s,c=i.once;(0,e.useEffect)((function(){if(t){var e={root:null===o||void 0===o?void 0:o.current,rootMargin:a,threshold:"number"===typeof l?l:Ag[l]};return Og(r.getInstance(),e,(function(e){var t,i=e.isIntersecting;if(n.isInView!==i&&(n.isInView=i,!c||i||!n.hasEnteredView)){i&&(n.hasEnteredView=!0),null===(t=r.animationState)||void 0===t||t.setActive(Zm.InView,i);var o=r.getProps(),a=i?o.onViewportEnter:o.onViewportLeave;null===a||void 0===a||a(e)}}))}}),[t,o,a,l])}function $g(t,n,r,i){var o=i.fallback,a=void 0===o||o;(0,e.useEffect)((function(){t&&a&&requestAnimationFrame((function(){var e;n.hasEnteredView=!0;var t=r.getProps().onViewportEnter;null===t||void 0===t||t(null),null===(e=r.animationState)||void 0===e||e.setActive(Zm.InView,!0)}))}),[t])}var Rg=function(e){return function(t){return e(t),null}},_g={inView:Rg((function(t){var n=t.visualElement,r=t.whileInView,i=t.onViewportEnter,o=t.onViewportLeave,a=t.viewport,s=void 0===a?{}:a,l=(0,e.useRef)({hasEnteredView:!1,isInView:!1}),c=Boolean(r||i||o);s.once&&l.current.hasEnteredView&&(c=!1),("undefined"===typeof IntersectionObserver?$g:zg)(c,l.current,n,s)})),tap:Rg((function(t){var n=t.onTap,r=t.onTapStart,i=t.onTapCancel,o=t.whileTap,a=t.visualElement,s=n||r||i||o,l=(0,e.useRef)(!1),c=(0,e.useRef)(null),u={passive:!(r||n||i||m)};function d(){var e;null===(e=c.current)||void 0===e||e.call(c),c.current=null}function f(){var e;return d(),l.current=!1,null===(e=a.animationState)||void 0===e||e.setActive(Zm.Tap,!1),!xg()}function p(e,t){f()&&(kg(a.getInstance(),e.target)?null===n||void 0===n||n(e,t):null===i||void 0===i||i(e,t))}function h(e,t){f()&&(null===i||void 0===i||i(e,t))}function m(e,t){var n;d(),l.current||(l.current=!0,c.current=Sg(hg(window,"pointerup",p,u),hg(window,"pointercancel",h,u)),null===(n=a.animationState)||void 0===n||n.setActive(Zm.Tap,!0),null===r||void 0===r||r(e,t))}mg(a,"pointerdown",s?m:void 0,u),mh(d)})),focus:Rg((function(e){var t=e.whileFocus,n=e.visualElement;rg(n,"focus",t?function(){var e;null===(e=n.animationState)||void 0===e||e.setActive(Zm.Focus,!0)}:void 0),rg(n,"blur",t?function(){var e;null===(e=n.animationState)||void 0===e||e.setActive(Zm.Focus,!1)}:void 0)})),hover:Rg((function(e){var t=e.onHoverStart,n=e.onHoverEnd,r=e.whileHover,i=e.visualElement;mg(i,"pointerenter",t||r?wg(i,!0,t):void 0,{passive:!t}),mg(i,"pointerleave",n||r?wg(i,!1,n):void 0,{passive:!n})}))};function Ig(){var t=(0,e.useContext)(sh);if(null===t)return[!0,null];var n=t.isPresent,r=t.onExitComplete,i=t.register,o=dh();(0,e.useEffect)((function(){return i(o)}),[]);return!n&&r?[!1,function(){return null===r||void 0===r?void 0:r(o)}]:[!0]}function Mg(e,t){if(!Array.isArray(t))return!1;var n=t.length;if(n!==e.length)return!1;for(var r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}const Lg=(e,t,n)=>Math.min(Math.max(n,e),t),Dg=.001;function Ng(e){let t,n,{duration:r=800,bounce:i=.25,velocity:o=0,mass:a=1}=e,s=1-i;s=Lg(.05,1,s),r=Lg(.01,10,r/1e3),s<1?(t=e=>{const t=e*s,n=t*r,i=t-o,a=Vg(e,s),l=Math.exp(-n);return Dg-i/a*l},n=e=>{const n=e*s*r,i=n*o+o,a=Math.pow(s,2)*Math.pow(e,2)*r,l=Math.exp(-n),c=Vg(Math.pow(e,2),s);return(-t(e)+Dg>0?-1:1)*((i-a)*l)/c}):(t=e=>Math.exp(-e*r)*((e-o)*r+1)-.001,n=e=>Math.exp(-e*r)*(r*r*(o-e)));const l=function(e,t,n){let r=n;for(let i=1;i<Fg;i++)r-=e(r)/t(r);return r}(t,n,5/r);if(r*=1e3,isNaN(l))return{stiffness:100,damping:10,duration:r};{const e=Math.pow(l,2)*a;return{stiffness:e,damping:2*s*Math.sqrt(a*e),duration:r}}}const Fg=12;function Vg(e,t){return e*Math.sqrt(1-t*t)}const Ug=["duration","bounce"],Bg=["stiffness","damping","mass"];function Hg(e,t){return t.some((t=>void 0!==e[t]))}function qg(e){var{from:t=0,to:n=1,restSpeed:r=2,restDelta:i}=e,o=rc(e,["from","to","restSpeed","restDelta"]);const a={done:!1,value:t};let{stiffness:s,damping:l,mass:c,velocity:u,duration:d,isResolvedFromDuration:f}=function(e){let t=Object.assign({velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1},e);if(!Hg(e,Bg)&&Hg(e,Ug)){const n=Ng(e);t=Object.assign(Object.assign(Object.assign({},t),n),{velocity:0,mass:1}),t.isResolvedFromDuration=!0}return t}(o),p=Wg,h=Wg;function m(){const e=u?-u/1e3:0,r=n-t,o=l/(2*Math.sqrt(s*c)),a=Math.sqrt(s/c)/1e3;if(void 0===i&&(i=Math.min(Math.abs(n-t)/100,.4)),o<1){const t=Vg(a,o);p=i=>{const s=Math.exp(-o*a*i);return n-s*((e+o*a*r)/t*Math.sin(t*i)+r*Math.cos(t*i))},h=n=>{const i=Math.exp(-o*a*n);return o*a*i*(Math.sin(t*n)*(e+o*a*r)/t+r*Math.cos(t*n))-i*(Math.cos(t*n)*(e+o*a*r)-t*r*Math.sin(t*n))}}else if(1===o)p=t=>n-Math.exp(-a*t)*(r+(e+a*r)*t);else{const t=a*Math.sqrt(o*o-1);p=i=>{const s=Math.exp(-o*a*i),l=Math.min(t*i,300);return n-s*((e+o*a*r)*Math.sinh(l)+t*r*Math.cosh(l))/t}}}return m(),{next:e=>{const t=p(e);if(f)a.done=e>=d;else{const o=1e3*h(e),s=Math.abs(o)<=r,l=Math.abs(n-t)<=i;a.done=s&&l}return a.value=a.done?n:t,a},flipTarget:()=>{u=-u,[t,n]=[n,t],m()}}}qg.needsInterpolation=(e,t)=>"string"===typeof e||"string"===typeof t;const Wg=e=>0,Yg=(e,t,n)=>{const r=t-e;return 0===r?1:(n-e)/r},Xg=(e,t,n)=>-n*e+n*t+e,Kg=(e,t)=>n=>Boolean(um(n)&&cm.test(n)&&n.startsWith(e)||t&&Object.prototype.hasOwnProperty.call(n,t)),Gg=(e,t,n)=>r=>{if(!um(r))return r;const[i,o,a,s]=r.match(sm);return{[e]:parseFloat(i),[t]:parseFloat(o),[n]:parseFloat(a),alpha:void 0!==s?parseFloat(s):1}},Jg=om(0,255),Qg=Object.assign(Object.assign({},ym),{transform:e=>Math.round(Jg(e))}),Zg={test:Kg("rgb","red"),parse:Gg("red","green","blue"),transform:e=>{let{red:t,green:n,blue:r,alpha:i=1}=e;return"rgba("+Qg.transform(t)+", "+Qg.transform(n)+", "+Qg.transform(r)+", "+am(bm.transform(i))+")"}};const ev={test:Kg("#"),parse:function(e){let t="",n="",r="",i="";return e.length>5?(t=e.substr(1,2),n=e.substr(3,2),r=e.substr(5,2),i=e.substr(7,2)):(t=e.substr(1,1),n=e.substr(2,1),r=e.substr(3,1),i=e.substr(4,1),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}},transform:Zg.transform},tv={test:Kg("hsl","hue"),parse:Gg("hue","saturation","lightness"),transform:e=>{let{hue:t,saturation:n,lightness:r,alpha:i=1}=e;return"hsla("+Math.round(t)+", "+pm.transform(am(n))+", "+pm.transform(am(r))+", "+am(bm.transform(i))+")"}};function nv(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function rv(e){let{hue:t,saturation:n,lightness:r,alpha:i}=e;t/=360,n/=100,r/=100;let o=0,a=0,s=0;if(n){const e=r<.5?r*(1+n):r+n-r*n,i=2*r-e;o=nv(i,e,t+1/3),a=nv(i,e,t),s=nv(i,e,t-1/3)}else o=a=s=r;return{red:Math.round(255*o),green:Math.round(255*a),blue:Math.round(255*s),alpha:i}}const iv=(e,t,n)=>{const r=e*e,i=t*t;return Math.sqrt(Math.max(0,n*(i-r)+r))},ov=[ev,Zg,tv],av=e=>ov.find((t=>t.test(e))),sv=e=>`'${e}' is not an animatable color. Use the equivalent color code instead.`,lv=(e,t)=>{let n=av(e),r=av(t);sv(e),sv(t);let i=n.parse(e),o=r.parse(t);n===tv&&(i=rv(i),n=Zg),r===tv&&(o=rv(o),r=Zg);const a=Object.assign({},i);return e=>{for(const t in a)"alpha"!==t&&(a[t]=iv(i[t],o[t],e));return a.alpha=Xg(i.alpha,o.alpha,e),n.transform(a)}},cv={test:e=>Zg.test(e)||ev.test(e)||tv.test(e),parse:e=>Zg.test(e)?Zg.parse(e):tv.test(e)?tv.parse(e):ev.parse(e),transform:e=>um(e)?e:e.hasOwnProperty("red")?Zg.transform(e):tv.transform(e)},uv="${c}",dv="${n}";function fv(e){"number"===typeof e&&(e=`${e}`);const t=[];let n=0;const r=e.match(lm);r&&(n=r.length,e=e.replace(lm,uv),t.push(...r.map(cv.parse)));const i=e.match(sm);return i&&(e=e.replace(sm,dv),t.push(...i.map(ym.parse))),{values:t,numColors:n,tokenised:e}}function pv(e){return fv(e).values}function hv(e){const{values:t,numColors:n,tokenised:r}=fv(e),i=t.length;return e=>{let t=r;for(let r=0;r<i;r++)t=t.replace(r<n?uv:dv,r<n?cv.transform(e[r]):am(e[r]));return t}}const mv=e=>"number"===typeof e?0:e;const gv={test:function(e){var t,n,r,i;return isNaN(e)&&um(e)&&(null!==(n=null===(t=e.match(sm))||void 0===t?void 0:t.length)&&void 0!==n?n:0)+(null!==(i=null===(r=e.match(lm))||void 0===r?void 0:r.length)&&void 0!==i?i:0)>0},parse:pv,createTransformer:hv,getAnimatableNone:function(e){const t=pv(e);return hv(e)(t.map(mv))}},vv=e=>"number"===typeof e;function yv(e,t){return vv(e)?n=>Xg(e,t,n):cv.test(e)?lv(e,t):kv(e,t)}const bv=(e,t)=>{const n=[...e],r=n.length,i=e.map(((e,n)=>yv(e,t[n])));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}},xv=(e,t)=>{const n=Object.assign(Object.assign({},e),t),r={};for(const i in n)void 0!==e[i]&&void 0!==t[i]&&(r[i]=yv(e[i],t[i]));return e=>{for(const t in r)n[t]=r[t](e);return n}};function wv(e){const t=gv.parse(e),n=t.length;let r=0,i=0,o=0;for(let a=0;a<n;a++)r||"number"===typeof t[a]?r++:void 0!==t[a].hue?o++:i++;return{parsed:t,numNumbers:r,numRGB:i,numHSL:o}}const kv=(e,t)=>{const n=gv.createTransformer(t),r=wv(e),i=wv(t);return r.numHSL===i.numHSL&&r.numRGB===i.numRGB&&r.numNumbers>=i.numNumbers?Sg(bv(r.parsed,i.parsed),n):n=>`${n>0?t:e}`},jv=(e,t)=>n=>Xg(e,t,n);function Sv(e,t,n){const r=[],i=n||function(e){return"number"===typeof e?jv:"string"===typeof e?cv.test(e)?lv:kv:Array.isArray(e)?bv:"object"===typeof e?xv:void 0}(e[0]),o=e.length-1;for(let a=0;a<o;a++){let n=i(e[a],e[a+1]);if(t){const e=Array.isArray(t)?t[a]:t;n=Sg(e,n)}r.push(n)}return r}function Cv(e,t){let{clamp:n=!0,ease:r,mixer:i}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const o=e.length;t.length,!r||!Array.isArray(r)||r.length,e[0]>e[o-1]&&(e=[].concat(e),t=[].concat(t),e.reverse(),t.reverse());const a=Sv(t,r,i),s=2===o?function(e,t){let[n,r]=e,[i]=t;return e=>i(Yg(n,r,e))}(e,a):function(e,t){const n=e.length,r=n-1;return i=>{let o=0,a=!1;if(i<=e[0]?a=!0:i>=e[r]&&(o=r-1,a=!0),!a){let t=1;for(;t<n&&!(e[t]>i||t===r);t++);o=t-1}const s=Yg(e[o],e[o+1],i);return t[o](s)}}(e,a);return n?t=>s(Lg(e[0],e[o-1],t)):s}const Ev=e=>t=>1-e(1-t),Tv=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,Pv=e=>t=>t*t*((e+1)*t-e),Ov=4/11,Av=8/11,zv=e=>e,$v=(Rv=2,e=>Math.pow(e,Rv));var Rv;const _v=Ev($v),Iv=Tv($v),Mv=e=>1-Math.sin(Math.acos(e)),Lv=Ev(Mv),Dv=Tv(Lv),Nv=Pv(1.525),Fv=Ev(Nv),Vv=Tv(Nv),Uv=(e=>{const t=Pv(e);return e=>(e*=2)<1?.5*t(e):.5*(2-Math.pow(2,-10*(e-1)))})(1.525),Bv=4356/361,Hv=35442/1805,qv=16061/1805,Wv=e=>{if(1===e||0===e)return e;const t=e*e;return e<Ov?7.5625*t:e<Av?9.075*t-9.9*e+3.4:e<.9?Bv*t-Hv*e+qv:10.8*e*e-20.52*e+10.72},Yv=Ev(Wv);function Xv(e,t){return e.map((()=>t||Iv)).splice(0,e.length-1)}function Kv(e){let{from:t=0,to:n=1,ease:r,offset:i,duration:o=300}=e;const a={done:!1,value:t},s=Array.isArray(n)?n:[t,n],l=function(e,t){return e.map((e=>e*t))}(i&&i.length===s.length?i:function(e){const t=e.length;return e.map(((e,n)=>0!==n?n/(t-1):0))}(s),o);function c(){return Cv(l,s,{ease:Array.isArray(r)?r:Xv(s,r)})}let u=c();return{next:e=>(a.value=u(e),a.done=e>=o,a),flipTarget:()=>{s.reverse(),u=c()}}}const Gv={keyframes:Kv,spring:qg,decay:function(e){let{velocity:t=0,from:n=0,power:r=.8,timeConstant:i=350,restDelta:o=.5,modifyTarget:a}=e;const s={done:!1,value:n};let l=r*t;const c=n+l,u=void 0===a?c:a(c);return u!==c&&(l=u-n),{next:e=>{const t=-l*Math.exp(-e/i);return s.done=!(t>o||t<-o),s.value=s.done?u:u+t,s},flipTarget:()=>{}}}};function Jv(e,t){return e-t-(arguments.length>2&&void 0!==arguments[2]?arguments[2]:0)}const Qv=e=>{const t=t=>{let{delta:n}=t;return e(n)};return{start:()=>rh.update(t,!0),stop:()=>Jp.update(t)}};function Zv(e){var t,n,{from:r,autoplay:i=!0,driver:o=Qv,elapsed:a=0,repeat:s=0,repeatType:l="loop",repeatDelay:c=0,onPlay:u,onStop:d,onComplete:f,onRepeat:p,onUpdate:h}=e,m=rc(e,["from","autoplay","driver","elapsed","repeat","repeatType","repeatDelay","onPlay","onStop","onComplete","onRepeat","onUpdate"]);let g,v,y,{to:b}=m,x=0,w=m.duration,k=!1,j=!0;const S=function(e){if(Array.isArray(e.to))return Kv;if(Gv[e.type])return Gv[e.type];const t=new Set(Object.keys(e));return t.has("ease")||t.has("duration")&&!t.has("dampingRatio")?Kv:t.has("dampingRatio")||t.has("stiffness")||t.has("mass")||t.has("damping")||t.has("restSpeed")||t.has("restDelta")?qg:Kv}(m);(null===(n=(t=S).needsInterpolation)||void 0===n?void 0:n.call(t,r,b))&&(y=Cv([0,100],[r,b],{clamp:!1}),r=0,b=100);const C=S(Object.assign(Object.assign({},m),{from:r,to:b}));function E(){x++,"reverse"===l?(j=x%2===0,a=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return arguments.length>3&&void 0!==arguments[3]&&!arguments[3]?t-(e-t)+n:Jv(t+-e,t,n)}(a,w,c,j)):(a=Jv(a,w,c),"mirror"===l&&C.flipTarget()),k=!1,p&&p()}function T(e){if(j||(e=-e),a+=e,!k){const e=C.next(Math.max(0,a));v=e.value,y&&(v=y(v)),k=j?e.done:a<=0}null===h||void 0===h||h(v),k&&(0===x&&(null!==w&&void 0!==w||(w=a)),x<s?function(e,t,n,r){return r?e>=t+n:e<=-n}(a,w,c,j)&&E():(g.stop(),f&&f()))}return i&&(null===u||void 0===u||u(),g=o(T),g.start()),{stop:()=>{null===d||void 0===d||d(),g.stop()}}}function ey(e,t){return t?e*(1e3/t):0}var ty=function(e){return 1e3*e};const ny=(e,t)=>1-3*t+3*e,ry=(e,t)=>3*t-6*e,iy=e=>3*e,oy=(e,t,n)=>((ny(t,n)*e+ry(t,n))*e+iy(t))*e,ay=(e,t,n)=>3*ny(t,n)*e*e+2*ry(t,n)*e+iy(t);const sy=.1;function ly(e,t,n,r){if(e===t&&n===r)return zv;const i=new Float32Array(11);for(let a=0;a<11;++a)i[a]=oy(a*sy,e,n);function o(t){let r=0,o=1;for(;10!==o&&i[o]<=t;++o)r+=sy;--o;const a=r+(t-i[o])/(i[o+1]-i[o])*sy,s=ay(a,e,n);return s>=.001?function(e,t,n,r){for(let i=0;i<8;++i){const i=ay(t,n,r);if(0===i)return t;t-=(oy(t,n,r)-e)/i}return t}(t,a,e,n):0===s?a:function(e,t,n,r,i){let o,a,s=0;do{a=t+(n-t)/2,o=oy(a,r,i)-e,o>0?n=a:t=a}while(Math.abs(o)>1e-7&&++s<10);return a}(t,r,r+sy,e,n)}return e=>0===e||1===e?e:oy(o(e),t,r)}var cy={linear:zv,easeIn:$v,easeInOut:Iv,easeOut:_v,circIn:Mv,circInOut:Dv,circOut:Lv,backIn:Nv,backInOut:Vv,backOut:Fv,anticipate:Uv,bounceIn:Yv,bounceInOut:e=>e<.5?.5*(1-Wv(1-2*e)):.5*Wv(2*e-1)+.5,bounceOut:Wv},uy=function(e){if(Array.isArray(e)){e.length;var t=sc(e,4);return ly(t[0],t[1],t[2],t[3])}return"string"===typeof e?("Invalid easing type '".concat(e,"'"),cy[e]):e},dy=function(e,t){return"zIndex"!==e&&(!("number"!==typeof t&&!Array.isArray(t))||!("string"!==typeof t||!gv.test(t)||t.startsWith("url(")))},fy=function(){return{type:"spring",stiffness:500,damping:25,restSpeed:10}},py=function(e){return{type:"spring",stiffness:550,damping:0===e?2*Math.sqrt(550):30,restSpeed:10}},hy=function(){return{type:"keyframes",ease:"linear",duration:.3}},my=function(e){return{type:"keyframes",duration:.8,values:e}},gy={x:fy,y:fy,z:fy,rotate:fy,rotateX:fy,rotateY:fy,rotateZ:fy,scaleX:py,scaleY:py,scale:py,opacity:hy,backgroundColor:hy,color:hy,default:py};const vy=new Set(["brightness","contrast","saturate","opacity"]);function yy(e){let[t,n]=e.slice(0,-1).split("(");if("drop-shadow"===t)return e;const[r]=n.match(sm)||[];if(!r)return e;const i=n.replace(r,"");let o=vy.has(t)?1:0;return r!==n&&(o*=100),t+"("+o+i+")"}const by=/([a-z-]*)\(.*?\)/g,xy=Object.assign(Object.assign({},gv),{getAnimatableNone:e=>{const t=e.match(by);return t?t.map(yy).join(" "):e}});var wy=nc(nc({},km),{color:cv,backgroundColor:cv,outlineColor:cv,fill:cv,stroke:cv,borderColor:cv,borderTopColor:cv,borderRightColor:cv,borderBottomColor:cv,borderLeftColor:cv,filter:xy,WebkitFilter:xy}),ky=function(e){return wy[e]};function jy(e,t){var n,r=ky(e);return r!==xy&&(r=gv),null===(n=r.getAnimatableNone)||void 0===n?void 0:n.call(r,t)}var Sy=!1;function Cy(e){var t=e.ease,n=e.times,r=e.yoyo,i=e.flip,o=e.loop,a=rc(e,["ease","times","yoyo","flip","loop"]),s=nc({},a);return n&&(s.offset=n),a.duration&&(s.duration=ty(a.duration)),a.repeatDelay&&(s.repeatDelay=ty(a.repeatDelay)),t&&(s.ease=function(e){return Array.isArray(e)&&"number"!==typeof e[0]}(t)?t.map(uy):uy(t)),"tween"===a.type&&(s.type="keyframes"),(r||o||i)&&(r?s.repeatType="reverse":o?s.repeatType="loop":i&&(s.repeatType="mirror"),s.repeat=o||r||i||a.repeat),"spring"!==a.type&&(s.type="keyframes"),s}function Ey(e,t,n){var r;return Array.isArray(t.to)&&(null!==(r=e.duration)&&void 0!==r||(e.duration=.8)),function(e){Array.isArray(e.to)&&null===e.to[0]&&(e.to=lc([],sc(e.to),!1),e.to[0]=e.from)}(t),function(e){e.when,e.delay,e.delayChildren,e.staggerChildren,e.staggerDirection,e.repeat,e.repeatType,e.repeatDelay,e.from;var t=rc(e,["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from"]);return!!Object.keys(t).length}(e)||(e=nc(nc({},e),function(e,t){var n;return n=Ym(t)?my:gy[e]||gy.default,nc({to:t},n(t))}(n,t.to))),nc(nc({},t),Cy(e))}function Ty(e,t,n,r,i){var o,a=Ay(r,e),s=null!==(o=a.from)&&void 0!==o?o:t.get(),l=dy(e,n);"none"===s&&l&&"string"===typeof n?s=jy(e,n):Py(s)&&"string"===typeof n?s=Oy(n):!Array.isArray(n)&&Py(n)&&"string"===typeof s&&(n=Oy(s));var c=dy(e,s);return"You are trying to animate ".concat(e,' from "').concat(s,'" to "').concat(n,'". ').concat(s," is not an animatable value - to enable this animation set ").concat(s," to a value animatable to ").concat(n," via the `style` property."),c&&l&&!1!==a.type?function(){var r={from:s,to:n,velocity:t.getVelocity(),onComplete:i,onUpdate:function(e){return t.set(e)}};return"inertia"===a.type||"decay"===a.type?function(e){let t,{from:n=0,velocity:r=0,min:i,max:o,power:a=.8,timeConstant:s=750,bounceStiffness:l=500,bounceDamping:c=10,restDelta:u=1,modifyTarget:d,driver:f,onUpdate:p,onComplete:h,onStop:m}=e;function g(e){return void 0!==i&&e<i||void 0!==o&&e>o}function v(e){return void 0===i?o:void 0===o||Math.abs(i-e)<Math.abs(o-e)?i:o}function y(e){null===t||void 0===t||t.stop(),t=Zv(Object.assign(Object.assign({},e),{driver:f,onUpdate:t=>{var n;null===p||void 0===p||p(t),null===(n=e.onUpdate)||void 0===n||n.call(e,t)},onComplete:h,onStop:m}))}function b(e){y(Object.assign({type:"spring",stiffness:l,damping:c,restDelta:u},e))}if(g(n))b({from:n,velocity:r,to:v(n)});else{let e=a*r+n;"undefined"!==typeof d&&(e=d(e));const t=v(e),o=t===i?-1:1;let l,c;const f=e=>{l=c,c=e,r=ey(e-l,nh().delta),(1===o&&e>t||-1===o&&e<t)&&b({from:e,to:t,velocity:r})};y({type:"decay",from:n,velocity:r,timeConstant:s,power:a,restDelta:u,modifyTarget:d,onUpdate:g(e)?f:void 0})}return{stop:()=>null===t||void 0===t?void 0:t.stop()}}(nc(nc({},r),a)):Zv(nc(nc({},Ey(a,r,e)),{onUpdate:function(e){var t;r.onUpdate(e),null===(t=a.onUpdate)||void 0===t||t.call(a,e)},onComplete:function(){var e;r.onComplete(),null===(e=a.onComplete)||void 0===e||e.call(a)}}))}:function(){var e,r,o=Xm(n);return t.set(o),i(),null===(e=null===a||void 0===a?void 0:a.onUpdate)||void 0===e||e.call(a,o),null===(r=null===a||void 0===a?void 0:a.onComplete)||void 0===r||r.call(a),{stop:function(){}}}}function Py(e){return 0===e||"string"===typeof e&&0===parseFloat(e)&&-1===e.indexOf(" ")}function Oy(e){return"number"===typeof e?0:jy("",e)}function Ay(e,t){return e[t]||e.default||e}function zy(e,t,n,r){return void 0===r&&(r={}),Sy&&(r={type:!1}),t.start((function(i){var o,a,s=Ty(e,t,n,r,i),l=function(e,t){var n,r;return null!==(r=null!==(n=(Ay(e,t)||{}).delay)&&void 0!==n?n:e.delay)&&void 0!==r?r:0}(r,e),c=function(){return a=s()};return l?o=window.setTimeout(c,ty(l)):c(),function(){clearTimeout(o),null===a||void 0===a||a.stop()}}))}var $y=function(e){return/^\-?\d*\.?\d+$/.test(e)},Ry=function(e){return/^0[^.\s]+$/.test(e)};function _y(e,t){-1===e.indexOf(t)&&e.push(t)}function Iy(e,t){var n=e.indexOf(t);n>-1&&e.splice(n,1)}var My=function(){function e(){this.subscriptions=[]}return e.prototype.add=function(e){var t=this;return _y(this.subscriptions,e),function(){return Iy(t.subscriptions,e)}},e.prototype.notify=function(e,t,n){var r=this.subscriptions.length;if(r)if(1===r)this.subscriptions[0](e,t,n);else for(var i=0;i<r;i++){var o=this.subscriptions[i];o&&o(e,t,n)}},e.prototype.getSize=function(){return this.subscriptions.length},e.prototype.clear=function(){this.subscriptions.length=0},e}(),Ly=function(){function e(e){var t,n=this;this.version="6.5.1",this.timeDelta=0,this.lastUpdated=0,this.updateSubscribers=new My,this.velocityUpdateSubscribers=new My,this.renderSubscribers=new My,this.canTrackVelocity=!1,this.updateAndNotify=function(e,t){void 0===t&&(t=!0),n.prev=n.current,n.current=e;var r=nh(),i=r.delta,o=r.timestamp;n.lastUpdated!==o&&(n.timeDelta=i,n.lastUpdated=o,rh.postRender(n.scheduleVelocityCheck)),n.prev!==n.current&&n.updateSubscribers.notify(n.current),n.velocityUpdateSubscribers.getSize()&&n.velocityUpdateSubscribers.notify(n.getVelocity()),t&&n.renderSubscribers.notify(n.current)},this.scheduleVelocityCheck=function(){return rh.postRender(n.velocityCheck)},this.velocityCheck=function(e){e.timestamp!==n.lastUpdated&&(n.prev=n.current,n.velocityUpdateSubscribers.notify(n.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=e,this.canTrackVelocity=(t=this.current,!isNaN(parseFloat(t)))}return e.prototype.onChange=function(e){return this.updateSubscribers.add(e)},e.prototype.clearListeners=function(){this.updateSubscribers.clear()},e.prototype.onRenderRequest=function(e){return e(this.get()),this.renderSubscribers.add(e)},e.prototype.attach=function(e){this.passiveEffect=e},e.prototype.set=function(e,t){void 0===t&&(t=!0),t&&this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e,t)},e.prototype.get=function(){return this.current},e.prototype.getPrevious=function(){return this.prev},e.prototype.getVelocity=function(){return this.canTrackVelocity?ey(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0},e.prototype.start=function(e){var t=this;return this.stop(),new Promise((function(n){t.hasAnimated=!0,t.stopAnimation=e(n)})).then((function(){return t.clearAnimation()}))},e.prototype.stop=function(){this.stopAnimation&&this.stopAnimation(),this.clearAnimation()},e.prototype.isAnimating=function(){return!!this.stopAnimation},e.prototype.clearAnimation=function(){this.stopAnimation=null},e.prototype.destroy=function(){this.updateSubscribers.clear(),this.renderSubscribers.clear(),this.stop()},e}();function Dy(e){return new Ly(e)}var Ny=function(e){return function(t){return t.test(e)}},Fy=[ym,hm,pm,fm,gm,mm,{test:function(e){return"auto"===e},parse:function(e){return e}}],Vy=function(e){return Fy.find(Ny(e))},Uy=lc(lc([],sc(Fy),!1),[cv,gv],!1),By=function(e){return Uy.find(Ny(e))};function Hy(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Dy(n))}function qy(e,t){var n=Rh(e,t),r=n?e.makeTargetAnimatable(n,!1):{},i=r.transitionEnd,o=void 0===i?{}:i;r.transition;var a=rc(r,["transitionEnd","transition"]);for(var s in a=nc(nc({},a),o)){Hy(e,s,Xm(a[s]))}}function Wy(e,t){if(t)return(t[e]||t.default||t).from}function Yy(e,t,n){var r;void 0===n&&(n={});var i=Rh(e,t,n.custom),o=(i||{}).transition,a=void 0===o?e.getDefaultTransition()||{}:o;n.transitionOverride&&(a=n.transitionOverride);var s=i?function(){return Xy(e,i,n)}:function(){return Promise.resolve()},l=(null===(r=e.variantChildren)||void 0===r?void 0:r.size)?function(r){void 0===r&&(r=0);var i=a.delayChildren,o=void 0===i?0:i,s=a.staggerChildren,l=a.staggerDirection;return function(e,t,n,r,i,o){void 0===n&&(n=0);void 0===r&&(r=0);void 0===i&&(i=1);var a=[],s=(e.variantChildren.size-1)*r,l=1===i?function(e){return void 0===e&&(e=0),e*r}:function(e){return void 0===e&&(e=0),s-e*r};return Array.from(e.variantChildren).sort(Ky).forEach((function(e,r){a.push(Yy(e,t,nc(nc({},o),{delay:n+l(r)})).then((function(){return e.notifyAnimationComplete(t)})))})),Promise.all(a)}(e,t,o+r,s,l,n)}:function(){return Promise.resolve()},c=a.when;if(c){var u=sc("beforeChildren"===c?[s,l]:[l,s],2),d=u[0],f=u[1];return d().then(f)}return Promise.all([s(),l(n.delay)])}function Xy(e,t,n){var r,i=void 0===n?{}:n,o=i.delay,a=void 0===o?0:o,s=i.transitionOverride,l=i.type,c=e.makeTargetAnimatable(t),u=c.transition,d=void 0===u?e.getDefaultTransition():u,f=c.transitionEnd,p=rc(c,["transition","transitionEnd"]);s&&(d=s);var h=[],m=l&&(null===(r=e.animationState)||void 0===r?void 0:r.getState()[l]);for(var g in p){var v=e.getValue(g),y=p[g];if(!(!v||void 0===y||m&&Gy(m,g))){var b=nc({delay:a},d);e.shouldReduceMotion&&Jh(g)&&(b=nc(nc({},b),{type:!1,delay:0}));var x=zy(g,v,y,b);h.push(x)}}return Promise.all(h).then((function(){f&&qy(e,f)}))}function Ky(e,t){return e.sortNodePosition(t)}function Gy(e,t){var n=e.protectedKeys,r=e.needsAnimating,i=n.hasOwnProperty(t)&&!0!==r[t];return r[t]=!1,i}var Jy=[Zm.Animate,Zm.InView,Zm.Focus,Zm.Hover,Zm.Tap,Zm.Drag,Zm.Exit],Qy=lc([],sc(Jy),!1).reverse(),Zy=Jy.length;function eb(e){return function(t){return Promise.all(t.map((function(t){var n=t.animation,r=t.options;return function(e,t,n){var r;if(void 0===n&&(n={}),e.notifyAnimationStart(t),Array.isArray(t)){var i=t.map((function(t){return Yy(e,t,n)}));r=Promise.all(i)}else if("string"===typeof t)r=Yy(e,t,n);else{var o="function"===typeof t?Rh(e,t,n.custom):t;r=Xy(e,o,n)}return r.then((function(){return e.notifyAnimationComplete(t)}))}(e,n,r)})))}}function tb(e){var t=eb(e),n=function(){var e;return(e={})[Zm.Animate]=nb(!0),e[Zm.InView]=nb(),e[Zm.Hover]=nb(),e[Zm.Tap]=nb(),e[Zm.Drag]=nb(),e[Zm.Focus]=nb(),e[Zm.Exit]=nb(),e}(),r={},i=!0,o=function(t,n){var r=Rh(e,n);if(r){r.transition;var i=r.transitionEnd,o=rc(r,["transition","transitionEnd"]);t=nc(nc(nc({},t),o),i)}return t};function a(a,s){for(var l,c=e.getProps(),u=e.getVariantContext(!0)||{},d=[],f=new Set,p={},h=1/0,m=function(t){var r=Qy[t],m=n[r],g=null!==(l=c[r])&&void 0!==l?l:u[r],v=zh(g),y=r===s?m.isActive:null;!1===y&&(h=t);var b=g===u[r]&&g!==c[r]&&v;if(b&&i&&e.manuallyAnimateOnMount&&(b=!1),m.protectedKeys=nc({},p),!m.isActive&&null===y||!g&&!m.prevProp||Wm(g)||"boolean"===typeof g)return"continue";var x=function(e,t){if("string"===typeof t)return t!==e;if(Ah(t))return!Mg(t,e);return!1}(m.prevProp,g),w=x||r===s&&m.isActive&&!b&&v||t>h&&v,k=Array.isArray(g)?g:[g],j=k.reduce(o,{});!1===y&&(j={});var S=m.prevResolvedValues,C=void 0===S?{}:S,E=nc(nc({},C),j),T=function(e){w=!0,f.delete(e),m.needsAnimating[e]=!0};for(var P in E){var O=j[P],A=C[P];p.hasOwnProperty(P)||(O!==A?Ym(O)&&Ym(A)?!Mg(O,A)||x?T(P):m.protectedKeys[P]=!0:void 0!==O?T(P):f.add(P):void 0!==O&&f.has(P)?T(P):m.protectedKeys[P]=!0)}m.prevProp=g,m.prevResolvedValues=j,m.isActive&&(p=nc(nc({},p),j)),i&&e.blockInitialAnimation&&(w=!1),w&&!b&&d.push.apply(d,lc([],sc(k.map((function(e){return{animation:e,options:nc({type:r},a)}}))),!1))},g=0;g<Zy;g++)m(g);if(r=nc({},p),f.size){var v={};f.forEach((function(t){var n=e.getBaseTarget(t);void 0!==n&&(v[t]=n)})),d.push({animation:v})}var y=Boolean(d.length);return i&&!1===c.initial&&!e.manuallyAnimateOnMount&&(y=!1),i=!1,y?t(d):Promise.resolve()}return{isAnimated:function(e){return void 0!==r[e]},animateChanges:a,setActive:function(t,r,i){var o;if(n[t].isActive===r)return Promise.resolve();null===(o=e.variantChildren)||void 0===o||o.forEach((function(e){var n;return null===(n=e.animationState)||void 0===n?void 0:n.setActive(t,r)})),n[t].isActive=r;var s=a(i,t);for(var l in n)n[l].protectedKeys={};return s},setAnimateFunction:function(n){t=n(e)},getState:function(){return n}}}function nb(e){return void 0===e&&(e=!1),{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}var rb={animation:Rg((function(t){var n=t.visualElement,r=t.animate;n.animationState||(n.animationState=tb(n)),Wm(r)&&(0,e.useEffect)((function(){return r.subscribe(n)}),[r])})),exit:Rg((function(t){var n=t.custom,r=t.visualElement,i=sc(Ig(),2),o=i[0],a=i[1],s=(0,e.useContext)(sh);(0,e.useEffect)((function(){var e,t;r.isPresent=o;var i=null===(e=r.animationState)||void 0===e?void 0:e.setActive(Zm.Exit,!o,{custom:null!==(t=null===s||void 0===s?void 0:s.custom)&&void 0!==t?t:n});!o&&(null===i||void 0===i||i.then(a))}),[o])}))};const ib=e=>e.hasOwnProperty("x")&&e.hasOwnProperty("y"),ob=e=>ib(e)&&e.hasOwnProperty("z"),ab=(e,t)=>Math.abs(e-t);function sb(e,t){if(vv(e)&&vv(t))return ab(e,t);if(ib(e)&&ib(t)){const n=ab(e.x,t.x),r=ab(e.y,t.y),i=ob(e)&&ob(t)?ab(e.z,t.z):0;return Math.sqrt(Math.pow(n,2)+Math.pow(r,2)+Math.pow(i,2))}}var lb=function(){function e(e,t,n){var r=this,i=(void 0===n?{}:n).transformPagePoint;if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.updatePoint=function(){if(r.lastMoveEvent&&r.lastMoveEventInfo){var e=db(r.lastMoveEventInfo,r.history),t=null!==r.startEvent,n=sb(e.offset,{x:0,y:0})>=3;if(t||n){var i=e.point,o=nh().timestamp;r.history.push(nc(nc({},i),{timestamp:o}));var a=r.handlers,s=a.onStart,l=a.onMove;t||(s&&s(r.lastMoveEvent,e),r.startEvent=r.lastMoveEvent),l&&l(r.lastMoveEvent,e)}}},this.handlePointerMove=function(e,t){r.lastMoveEvent=e,r.lastMoveEventInfo=cb(t,r.transformPagePoint),ig(e)&&0===e.buttons?r.handlePointerUp(e,t):rh.update(r.updatePoint,!0)},this.handlePointerUp=function(e,t){r.end();var n=r.handlers,i=n.onEnd,o=n.onSessionEnd,a=db(cb(t,r.transformPagePoint),r.history);r.startEvent&&i&&i(e,a),o&&o(e,a)},!(og(e)&&e.touches.length>1)){this.handlers=t,this.transformPagePoint=i;var o=cb(cg(e),this.transformPagePoint),a=o.point,s=nh().timestamp;this.history=[nc(nc({},a),{timestamp:s})];var l=t.onSessionStart;l&&l(e,db(o,this.history)),this.removeListeners=Sg(hg(window,"pointermove",this.handlePointerMove),hg(window,"pointerup",this.handlePointerUp),hg(window,"pointercancel",this.handlePointerUp))}}return e.prototype.updateHandlers=function(e){this.handlers=e},e.prototype.end=function(){this.removeListeners&&this.removeListeners(),Jp.update(this.updatePoint)},e}();function cb(e,t){return t?{point:t(e.point)}:e}function ub(e,t){return{x:e.x-t.x,y:e.y-t.y}}function db(e,t){var n=e.point;return{point:n,delta:ub(n,pb(t)),offset:ub(n,fb(t)),velocity:hb(t,.1)}}function fb(e){return e[0]}function pb(e){return e[e.length-1]}function hb(e,t){if(e.length<2)return{x:0,y:0};for(var n=e.length-1,r=null,i=pb(e);n>=0&&(r=e[n],!(i.timestamp-r.timestamp>ty(t)));)n--;if(!r)return{x:0,y:0};var o=(i.timestamp-r.timestamp)/1e3;if(0===o)return{x:0,y:0};var a={x:(i.x-r.x)/o,y:(i.y-r.y)/o};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function mb(e){return e.max-e.min}function gb(e,t,n){return void 0===t&&(t=0),void 0===n&&(n=.01),sb(e,t)<n}function vb(e,t,n,r){void 0===r&&(r=.5),e.origin=r,e.originPoint=Xg(t.min,t.max,e.origin),e.scale=mb(n)/mb(t),(gb(e.scale,1,1e-4)||isNaN(e.scale))&&(e.scale=1),e.translate=Xg(n.min,n.max,e.origin)-e.originPoint,(gb(e.translate)||isNaN(e.translate))&&(e.translate=0)}function yb(e,t,n,r){vb(e.x,t.x,n.x,null===r||void 0===r?void 0:r.originX),vb(e.y,t.y,n.y,null===r||void 0===r?void 0:r.originY)}function bb(e,t,n){e.min=n.min+t.min,e.max=e.min+mb(t)}function xb(e,t,n){e.min=t.min-n.min,e.max=e.min+mb(t)}function wb(e,t,n){xb(e.x,t.x,n.x),xb(e.y,t.y,n.y)}function kb(e,t,n){return{min:void 0!==t?e.min+t:void 0,max:void 0!==n?e.max+n-(e.max-e.min):void 0}}function jb(e,t){var n,r=t.min-e.min,i=t.max-e.max;return t.max-t.min<e.max-e.min&&(r=(n=sc([i,r],2))[0],i=n[1]),{min:r,max:i}}var Sb=.35;function Cb(e,t,n){return{min:Eb(e,t),max:Eb(e,n)}}function Eb(e,t){var n;return"number"===typeof e?e:null!==(n=e[t])&&void 0!==n?n:0}function Tb(e){return[e("x"),e("y")]}function Pb(e){var t=e.top;return{x:{min:e.left,max:e.right},y:{min:t,max:e.bottom}}}function Ob(e){return void 0===e||1===e}function Ab(e){var t=e.scale,n=e.scaleX,r=e.scaleY;return!Ob(t)||!Ob(n)||!Ob(r)}function zb(e){return Ab(e)||$b(e.x)||$b(e.y)||e.z||e.rotate||e.rotateX||e.rotateY}function $b(e){return e&&"0%"!==e}function Rb(e,t,n){return n+t*(e-n)}function _b(e,t,n,r,i){return void 0!==i&&(e=Rb(e,i,r)),Rb(e,n,r)+t}function Ib(e,t,n,r,i){void 0===t&&(t=0),void 0===n&&(n=1),e.min=_b(e.min,t,n,r,i),e.max=_b(e.max,t,n,r,i)}function Mb(e,t){var n=t.x,r=t.y;Ib(e.x,n.translate,n.scale,n.originPoint),Ib(e.y,r.translate,r.scale,r.originPoint)}function Lb(e,t){e.min=e.min+t,e.max=e.max+t}function Db(e,t,n){var r=sc(n,3),i=r[0],o=r[1],a=r[2],s=void 0!==t[a]?t[a]:.5,l=Xg(e.min,e.max,s);Ib(e,t[i],t[o],l,t.scale)}var Nb=["x","scaleX","originX"],Fb=["y","scaleY","originY"];function Vb(e,t){Db(e.x,t,Nb),Db(e.y,t,Fb)}function Ub(e,t){return Pb(function(e,t){if(!t)return e;var n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}(e.getBoundingClientRect(),t))}var Bb=new WeakMap,Hb=function(){function e(e){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic={x:{min:0,max:0},y:{min:0,max:0}},this.visualElement=e}return e.prototype.start=function(e,t){var n=this,r=(void 0===t?{}:t).snapToCursor,i=void 0!==r&&r;if(!1!==this.visualElement.isPresent){this.panSession=new lb(e,{onSessionStart:function(e){n.stopAnimation(),i&&n.snapToCursor(cg(e,"page").point)},onStart:function(e,t){var r,i=n.getProps(),o=i.drag,a=i.dragPropagation,s=i.onDragStart;(!o||a||(n.openGlobalLock&&n.openGlobalLock(),n.openGlobalLock=bg(o),n.openGlobalLock))&&(n.isDragging=!0,n.currentDirection=null,n.resolveConstraints(),n.visualElement.projection&&(n.visualElement.projection.isAnimationBlocked=!0,n.visualElement.projection.target=void 0),Tb((function(e){var t,r,i=n.getAxisMotionValue(e).get()||0;if(pm.test(i)){var o=null===(r=null===(t=n.visualElement.projection)||void 0===t?void 0:t.layout)||void 0===r?void 0:r.actual[e];if(o)i=mb(o)*(parseFloat(i)/100)}n.originPoint[e]=i})),null===s||void 0===s||s(e,t),null===(r=n.visualElement.animationState)||void 0===r||r.setActive(Zm.Drag,!0))},onMove:function(e,t){var r=n.getProps(),i=r.dragPropagation,o=r.dragDirectionLock,a=r.onDirectionLock,s=r.onDrag;if(i||n.openGlobalLock){var l=t.offset;if(o&&null===n.currentDirection)return n.currentDirection=function(e,t){void 0===t&&(t=10);var n=null;Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x");return n}(l),void(null!==n.currentDirection&&(null===a||void 0===a||a(n.currentDirection)));n.updateAxis("x",t.point,l),n.updateAxis("y",t.point,l),n.visualElement.syncRender(),null===s||void 0===s||s(e,t)}},onSessionEnd:function(e,t){return n.stop(e,t)}},{transformPagePoint:this.visualElement.getTransformPagePoint()})}},e.prototype.stop=function(e,t){var n=this.isDragging;if(this.cancel(),n){var r=t.velocity;this.startAnimation(r);var i=this.getProps().onDragEnd;null===i||void 0===i||i(e,t)}},e.prototype.cancel=function(){var e,t;this.isDragging=!1,this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!1),null===(e=this.panSession)||void 0===e||e.end(),this.panSession=void 0,!this.getProps().dragPropagation&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),null===(t=this.visualElement.animationState)||void 0===t||t.setActive(Zm.Drag,!1)},e.prototype.updateAxis=function(e,t,n){var r=this.getProps().drag;if(n&&qb(e,r,this.currentDirection)){var i=this.getAxisMotionValue(e),o=this.originPoint[e]+n[e];this.constraints&&this.constraints[e]&&(o=function(e,t,n){var r=t.min,i=t.max;return void 0!==r&&e<r?e=n?Xg(r,e,n.min):Math.max(e,r):void 0!==i&&e>i&&(e=n?Xg(i,e,n.max):Math.min(e,i)),e}(o,this.constraints[e],this.elastic[e])),i.set(o)}},e.prototype.resolveConstraints=function(){var e=this,t=this.getProps(),n=t.dragConstraints,r=t.dragElastic,i=(this.visualElement.projection||{}).layout,o=this.constraints;n&&Oh(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):this.constraints=!(!n||!i)&&function(e,t){var n=t.top,r=t.left,i=t.bottom,o=t.right;return{x:kb(e.x,r,o),y:kb(e.y,n,i)}}(i.actual,n),this.elastic=function(e){return void 0===e&&(e=Sb),!1===e?e=0:!0===e&&(e=Sb),{x:Cb(e,"left","right"),y:Cb(e,"top","bottom")}}(r),o!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&Tb((function(t){e.getAxisMotionValue(t)&&(e.constraints[t]=function(e,t){var n={};return void 0!==t.min&&(n.min=t.min-e.min),void 0!==t.max&&(n.max=t.max-e.min),n}(i.actual[t],e.constraints[t]))}))},e.prototype.resolveRefConstraints=function(){var e=this.getProps(),t=e.dragConstraints,n=e.onMeasureDragConstraints;if(!t||!Oh(t))return!1;var r=t.current,i=this.visualElement.projection;if(!i||!i.layout)return!1;var o=function(e,t,n){var r=Ub(e,n),i=t.scroll;return i&&(Lb(r.x,i.x),Lb(r.y,i.y)),r}(r,i.root,this.visualElement.getTransformPagePoint()),a=function(e,t){return{x:jb(e.x,t.x),y:jb(e.y,t.y)}}(i.layout.actual,o);if(n){var s=n(function(e){var t=e.x,n=e.y;return{top:n.min,right:t.max,bottom:n.max,left:t.min}}(a));this.hasMutatedConstraints=!!s,s&&(a=Pb(s))}return a},e.prototype.startAnimation=function(e){var t=this,n=this.getProps(),r=n.drag,i=n.dragMomentum,o=n.dragElastic,a=n.dragTransition,s=n.dragSnapToOrigin,l=n.onDragTransitionEnd,c=this.constraints||{},u=Tb((function(n){var l;if(qb(n,r,t.currentDirection)){var u=null!==(l=null===c||void 0===c?void 0:c[n])&&void 0!==l?l:{};s&&(u={min:0,max:0});var d=o?200:1e6,f=o?40:1e7,p=nc(nc({type:"inertia",velocity:i?e[n]:0,bounceStiffness:d,bounceDamping:f,timeConstant:750,restDelta:1,restSpeed:10},a),u);return t.startAxisValueAnimation(n,p)}}));return Promise.all(u).then(l)},e.prototype.startAxisValueAnimation=function(e,t){return zy(e,this.getAxisMotionValue(e),0,t)},e.prototype.stopAnimation=function(){var e=this;Tb((function(t){return e.getAxisMotionValue(t).stop()}))},e.prototype.getAxisMotionValue=function(e){var t,n,r="_drag"+e.toUpperCase(),i=this.visualElement.getProps()[r];return i||this.visualElement.getValue(e,null!==(n=null===(t=this.visualElement.getProps().initial)||void 0===t?void 0:t[e])&&void 0!==n?n:0)},e.prototype.snapToCursor=function(e){var t=this;Tb((function(n){if(qb(n,t.getProps().drag,t.currentDirection)){var r=t.visualElement.projection,i=t.getAxisMotionValue(n);if(r&&r.layout){var o=r.layout.actual[n],a=o.min,s=o.max;i.set(e[n]-Xg(a,s,.5))}}}))},e.prototype.scalePositionWithinConstraints=function(){var e,t=this,n=this.getProps(),r=n.drag,i=n.dragConstraints,o=this.visualElement.projection;if(Oh(i)&&o&&this.constraints){this.stopAnimation();var a={x:0,y:0};Tb((function(e){var n=t.getAxisMotionValue(e);if(n){var r=n.get();a[e]=function(e,t){var n=.5,r=mb(e),i=mb(t);return i>r?n=Yg(t.min,t.max-r,e.min):r>i&&(n=Yg(e.min,e.max-i,t.min)),Lg(0,1,n)}({min:r,max:r},t.constraints[e])}}));var s=this.visualElement.getProps().transformTemplate;this.visualElement.getInstance().style.transform=s?s({},""):"none",null===(e=o.root)||void 0===e||e.updateScroll(),o.updateLayout(),this.resolveConstraints(),Tb((function(e){if(qb(e,r,null)){var n=t.getAxisMotionValue(e),i=t.constraints[e],o=i.min,s=i.max;n.set(Xg(o,s,a[e]))}}))}},e.prototype.addListeners=function(){var e,t=this;Bb.set(this.visualElement,this);var n=hg(this.visualElement.getInstance(),"pointerdown",(function(e){var n=t.getProps(),r=n.drag,i=n.dragListener;r&&(void 0===i||i)&&t.start(e)})),r=function(){Oh(t.getProps().dragConstraints)&&(t.constraints=t.resolveRefConstraints())},i=this.visualElement.projection,o=i.addEventListener("measure",r);i&&!i.layout&&(null===(e=i.root)||void 0===e||e.updateScroll(),i.updateLayout()),r();var a=ng(window,"resize",(function(){return t.scalePositionWithinConstraints()}));return i.addEventListener("didUpdate",(function(e){var n=e.delta,r=e.hasLayoutChanged;t.isDragging&&r&&(Tb((function(e){var r=t.getAxisMotionValue(e);r&&(t.originPoint[e]+=n[e].translate,r.set(r.get()+n[e].translate))})),t.visualElement.syncRender())})),function(){a(),n(),o()}},e.prototype.getProps=function(){var e=this.visualElement.getProps(),t=e.drag,n=void 0!==t&&t,r=e.dragDirectionLock,i=void 0!==r&&r,o=e.dragPropagation,a=void 0!==o&&o,s=e.dragConstraints,l=void 0!==s&&s,c=e.dragElastic,u=void 0===c?Sb:c,d=e.dragMomentum,f=void 0===d||d;return nc(nc({},e),{drag:n,dragDirectionLock:i,dragPropagation:a,dragConstraints:l,dragElastic:u,dragMomentum:f})},e}();function qb(e,t,n){return(!0===t||t===e)&&(null===n||n===e)}var Wb={pan:Rg((function(t){var n=t.onPan,r=t.onPanStart,i=t.onPanEnd,o=t.onPanSessionStart,a=t.visualElement,s=n||r||i||o,l=(0,e.useRef)(null),c=(0,e.useContext)(jh).transformPagePoint,u={onSessionStart:o,onStart:r,onMove:n,onEnd:function(e,t){l.current=null,i&&i(e,t)}};(0,e.useEffect)((function(){null!==l.current&&l.current.updateHandlers(u)})),mg(a,"pointerdown",s&&function(e){l.current=new lb(e,u,{transformPagePoint:c})}),mh((function(){return l.current&&l.current.end()}))})),drag:Rg((function(t){var n=t.dragControls,r=t.visualElement,i=lh((function(){return new Hb(r)}));(0,e.useEffect)((function(){return n&&n.subscribe(i)}),[i,n]),(0,e.useEffect)((function(){return i.addListeners()}),[i])}))},Yb=["LayoutMeasure","BeforeLayoutMeasure","LayoutUpdate","ViewportBoxUpdate","Update","Render","AnimationComplete","LayoutAnimationComplete","AnimationStart","LayoutAnimationStart","SetAxisTarget","Unmount"];var Xb=function(e){var t=e.treeType,n=void 0===t?"":t,r=e.build,i=e.getBaseTarget,o=e.makeTargetAnimatable,a=e.measureViewportBox,s=e.render,l=e.readValueFromInstance,c=e.removeValueFromRenderState,u=e.sortNodePosition,d=e.scrapeMotionValuesFromProps;return function(e,t){var f=e.parent,p=e.props,h=e.presenceId,m=e.blockInitialAnimation,g=e.visualState,v=e.shouldReduceMotion;void 0===t&&(t={});var y,b,x=!1,w=g.latestValues,k=g.renderState,j=function(){var e=Yb.map((function(){return new My})),t={},n={clearAllListeners:function(){return e.forEach((function(e){return e.clear()}))},updatePropListeners:function(e){Yb.forEach((function(r){var i,o="on"+r,a=e[o];null===(i=t[r])||void 0===i||i.call(t),a&&(t[r]=n[o](a))}))}};return e.forEach((function(e,t){n["on"+Yb[t]]=function(t){return e.add(t)},n["notify"+Yb[t]]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return e.notify.apply(e,lc([],sc(t),!1))}})),n}(),S=new Map,C=new Map,E={},T=nc({},w);function P(){y&&x&&(O(),s(y,k,p.style,L.projection))}function O(){r(L,k,w,t,p)}function A(){j.notifyUpdate(w)}function z(e,t){var n=t.onChange((function(t){w[e]=t,p.onUpdate&&rh.update(A,!1,!0)})),r=t.onRenderRequest(L.scheduleRender);C.set(e,(function(){n(),r()}))}var $=d(p);for(var R in $){var _=$[R];void 0!==w[R]&&tm(_)&&_.set(w[R],!1)}var I=_h(p),M=Ih(p),L=nc(nc({treeType:n,current:null,depth:f?f.depth+1:0,parent:f,children:new Set,presenceId:h,shouldReduceMotion:v,variantChildren:M?new Set:void 0,isVisible:void 0,manuallyAnimateOnMount:Boolean(null===f||void 0===f?void 0:f.isMounted()),blockInitialAnimation:m,isMounted:function(){return Boolean(y)},mount:function(e){x=!0,y=L.current=e,L.projection&&L.projection.mount(e),M&&f&&!I&&(b=null===f||void 0===f?void 0:f.addVariantChild(L)),S.forEach((function(e,t){return z(t,e)})),null===f||void 0===f||f.children.add(L),L.setProps(p)},unmount:function(){var e;null===(e=L.projection)||void 0===e||e.unmount(),Jp.update(A),Jp.render(P),C.forEach((function(e){return e()})),null===b||void 0===b||b(),null===f||void 0===f||f.children.delete(L),j.clearAllListeners(),y=void 0,x=!1},addVariantChild:function(e){var t,n=L.getClosestVariantNode();if(n)return null===(t=n.variantChildren)||void 0===t||t.add(e),function(){return n.variantChildren.delete(e)}},sortNodePosition:function(e){return u&&n===e.treeType?u(L.getInstance(),e.getInstance()):0},getClosestVariantNode:function(){return M?L:null===f||void 0===f?void 0:f.getClosestVariantNode()},getLayoutId:function(){return p.layoutId},getInstance:function(){return y},getStaticValue:function(e){return w[e]},setStaticValue:function(e,t){return w[e]=t},getLatestValues:function(){return w},setVisibility:function(e){L.isVisible!==e&&(L.isVisible=e,L.scheduleRender())},makeTargetAnimatable:function(e,t){return void 0===t&&(t=!0),o(L,e,p,t)},measureViewportBox:function(){return a(y,p)},addValue:function(e,t){L.hasValue(e)&&L.removeValue(e),S.set(e,t),w[e]=t.get(),z(e,t)},removeValue:function(e){var t;S.delete(e),null===(t=C.get(e))||void 0===t||t(),C.delete(e),delete w[e],c(e,k)},hasValue:function(e){return S.has(e)},getValue:function(e,t){var n=S.get(e);return void 0===n&&void 0!==t&&(n=Dy(t),L.addValue(e,n)),n},forEachValue:function(e){return S.forEach(e)},readValue:function(e){var n;return null!==(n=w[e])&&void 0!==n?n:l(y,e,t)},setBaseTarget:function(e,t){T[e]=t},getBaseTarget:function(e){if(i){var t=i(p,e);if(void 0!==t&&!tm(t))return t}return T[e]}},j),{build:function(){return O(),k},scheduleRender:function(){rh.render(P,!1,!0)},syncRender:P,setProps:function(e){(e.transformTemplate||p.transformTemplate)&&L.scheduleRender(),p=e,j.updatePropListeners(e),E=function(e,t,n){var r;for(var i in t){var o=t[i],a=n[i];if(tm(o))e.addValue(i,o);else if(tm(a))e.addValue(i,Dy(o));else if(a!==o)if(e.hasValue(i)){var s=e.getValue(i);!s.hasAnimated&&s.set(o)}else e.addValue(i,Dy(null!==(r=e.getStaticValue(i))&&void 0!==r?r:o))}for(var i in n)void 0===t[i]&&e.removeValue(i);return t}(L,d(p),E)},getProps:function(){return p},getVariant:function(e){var t;return null===(t=p.variants)||void 0===t?void 0:t[e]},getDefaultTransition:function(){return p.transition},getTransformPagePoint:function(){return p.transformPagePoint},getVariantContext:function(e){if(void 0===e&&(e=!1),e)return null===f||void 0===f?void 0:f.getVariantContext();if(!I){var t=(null===f||void 0===f?void 0:f.getVariantContext())||{};return void 0!==p.initial&&(t.initial=p.initial),t}for(var n={},r=0;r<Gb;r++){var i=Kb[r],o=p[i];(zh(o)||!1===o)&&(n[i]=o)}return n}});return L}},Kb=lc(["initial"],sc(Jy),!1),Gb=Kb.length;function Jb(e){return"string"===typeof e&&e.startsWith("var(--")}var Qb=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function Zb(e,t,n){void 0===n&&(n=1),'Max CSS variable fallback depth detected in property "'.concat(e,'". This may indicate a circular fallback dependency.');var r=sc(function(e){var t=Qb.exec(e);if(!t)return[,];var n=sc(t,3);return[n[1],n[2]]}(e),2),i=r[0],o=r[1];if(i){var a=window.getComputedStyle(t).getPropertyValue(i);return a?a.trim():Jb(o)?Zb(o,t,n+1):o}}var ex,tx=new Set(["width","height","top","left","right","bottom","x","y"]),nx=function(e){return tx.has(e)},rx=function(e,t){e.set(t,!1),e.set(t)},ix=function(e){return e===ym||e===hm};!function(e){e.width="width",e.height="height",e.left="left",e.right="right",e.top="top",e.bottom="bottom"}(ex||(ex={}));var ox=function(e,t){return parseFloat(e.split(", ")[t])},ax=function(e,t){return function(n,r){var i=r.transform;if("none"===i||!i)return 0;var o=i.match(/^matrix3d\((.+)\)$/);if(o)return ox(o[1],t);var a=i.match(/^matrix\((.+)\)$/);return a?ox(a[1],e):0}},sx=new Set(["x","y","z"]),lx=Xh.filter((function(e){return!sx.has(e)}));var cx={width:function(e,t){var n=e.x,r=t.paddingLeft,i=void 0===r?"0":r,o=t.paddingRight,a=void 0===o?"0":o;return n.max-n.min-parseFloat(i)-parseFloat(a)},height:function(e,t){var n=e.y,r=t.paddingTop,i=void 0===r?"0":r,o=t.paddingBottom,a=void 0===o?"0":o;return n.max-n.min-parseFloat(i)-parseFloat(a)},top:function(e,t){var n=t.top;return parseFloat(n)},left:function(e,t){var n=t.left;return parseFloat(n)},bottom:function(e,t){var n=e.y,r=t.top;return parseFloat(r)+(n.max-n.min)},right:function(e,t){var n=e.x,r=t.left;return parseFloat(r)+(n.max-n.min)},x:ax(4,13),y:ax(5,14)},ux=function(e,t,n,r){void 0===n&&(n={}),void 0===r&&(r={}),t=nc({},t),r=nc({},r);var i=Object.keys(t).filter(nx),o=[],a=!1,s=[];if(i.forEach((function(i){var l=e.getValue(i);if(e.hasValue(i)){var c,u=n[i],d=Vy(u),f=t[i];if(Ym(f)){var p=f.length,h=null===f[0]?1:0;u=f[h],d=Vy(u);for(var m=h;m<p;m++)c?Vy(f[m]):(c=Vy(f[m]))===d||ix(d)&&ix(c)}else c=Vy(f);if(d!==c)if(ix(d)&&ix(c)){var g=l.get();"string"===typeof g&&l.set(parseFloat(g)),"string"===typeof f?t[i]=parseFloat(f):Array.isArray(f)&&c===hm&&(t[i]=f.map(parseFloat))}else(null===d||void 0===d?void 0:d.transform)&&(null===c||void 0===c?void 0:c.transform)&&(0===u||0===f)?0===u?l.set(c.transform(u)):t[i]=d.transform(f):(a||(o=function(e){var t=[];return lx.forEach((function(n){var r=e.getValue(n);void 0!==r&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))})),t.length&&e.syncRender(),t}(e),a=!0),s.push(i),r[i]=void 0!==r[i]?r[i]:t[i],rx(l,f))}})),s.length){var l=s.indexOf("height")>=0?window.pageYOffset:null,c=function(e,t,n){var r=t.measureViewportBox(),i=t.getInstance(),o=getComputedStyle(i),a=o.display,s={};"none"===a&&t.setStaticValue("display",e.display||"block"),n.forEach((function(e){s[e]=cx[e](r,o)})),t.syncRender();var l=t.measureViewportBox();return n.forEach((function(n){var r=t.getValue(n);rx(r,s[n]),e[n]=cx[n](l,o)})),e}(t,e,s);return o.length&&o.forEach((function(t){var n=sc(t,2),r=n[0],i=n[1];e.getValue(r).set(i)})),e.syncRender(),null!==l&&window.scrollTo({top:l}),{target:c,transitionEnd:r}}return{target:t,transitionEnd:r}};function dx(e,t,n,r){return function(e){return Object.keys(e).some(nx)}(t)?ux(e,t,n,r):{target:t,transitionEnd:r}}var fx=function(e,t,n,r){var i=function(e,t,n){var r,i=rc(t,[]),o=e.getInstance();if(!(o instanceof Element))return{target:i,transitionEnd:n};for(var a in n&&(n=nc({},n)),e.forEachValue((function(e){var t=e.get();if(Jb(t)){var n=Zb(t,o);n&&e.set(n)}})),i){var s=i[a];if(Jb(s)){var l=Zb(s,o);l&&(i[a]=l,n&&(null!==(r=n[a])&&void 0!==r||(n[a]=s)))}}return{target:i,transitionEnd:n}}(e,t,r);return dx(e,t=i.target,n,r=i.transitionEnd)};var px={treeType:"dom",readValueFromInstance:function(e,t){if(Jh(t)){var n=ky(t);return n&&n.default||0}var r,i=(r=e,window.getComputedStyle(r));return(rm(t)?i.getPropertyValue(t):i[t])||0},sortNodePosition:function(e,t){return 2&e.compareDocumentPosition(t)?1:-1},getBaseTarget:function(e,t){var n;return null===(n=e.style)||void 0===n?void 0:n[t]},measureViewportBox:function(e,t){return Ub(e,t.transformPagePoint)},resetTransform:function(e,t,n){var r=n.transformTemplate;t.style.transform=r?r({},""):"none",e.scheduleRender()},restoreTransform:function(e,t){e.style.transform=t.style.transform},removeValueFromRenderState:function(e,t){var n=t.vars,r=t.style;delete n[e],delete r[e]},makeTargetAnimatable:function(e,t,n,r){var i=n.transformValues;void 0===r&&(r=!0);var o=t.transition,a=t.transitionEnd,s=rc(t,["transition","transitionEnd"]),l=function(e,t,n){var r,i,o={};for(var a in e)o[a]=null!==(r=Wy(a,t))&&void 0!==r?r:null===(i=n.getValue(a))||void 0===i?void 0:i.get();return o}(s,o||{},e);if(i&&(a&&(a=i(a)),s&&(s=i(s)),l&&(l=i(l))),r){!function(e,t,n){var r,i,o,a,s=Object.keys(t).filter((function(t){return!e.hasValue(t)})),l=s.length;if(l)for(var c=0;c<l;c++){var u=s[c],d=t[u],f=null;Array.isArray(d)&&(f=d[0]),null===f&&(f=null!==(i=null!==(r=n[u])&&void 0!==r?r:e.readValue(u))&&void 0!==i?i:t[u]),void 0!==f&&null!==f&&("string"===typeof f&&($y(f)||Ry(f))?f=parseFloat(f):!By(f)&&gv.test(d)&&(f=jy(u,d)),e.addValue(u,Dy(f)),null!==(o=(a=n)[u])&&void 0!==o||(a[u]=f),e.setBaseTarget(u,f))}}(e,s,l);var c=fx(e,s,l,a);a=c.transitionEnd,s=c.target}return nc({transition:o,transitionEnd:a},s)},scrapeMotionValuesFromProps:Hm,build:function(e,t,n,r,i){void 0!==e.isVisible&&(t.style.visibility=e.isVisible?"visible":"hidden"),jm(t,n,r,i.transformTemplate)},render:Vm},hx=Xb(px),mx=Xb(nc(nc({},px),{getBaseTarget:function(e,t){return e[t]},readValueFromInstance:function(e,t){var n;return Jh(t)?(null===(n=ky(t))||void 0===n?void 0:n.default)||0:(t=Um.has(t)?t:Fm(t),e.getAttribute(t))},scrapeMotionValuesFromProps:qm,build:function(e,t,n,r,i){Im(t,n,r,i.transformTemplate)},render:Bm})),gx=function(e,t){return qh(e)?mx(t,{enableHardwareAcceleration:!1}):hx(t,{enableHardwareAcceleration:!0})};function vx(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}var yx={correct:function(e,t){if(!t.target)return e;if("string"===typeof e){if(!hm.test(e))return e;e=parseFloat(e)}var n=vx(e,t.target.x),r=vx(e,t.target.y);return"".concat(n,"% ").concat(r,"%")}},bx="_$css",xx={correct:function(e,t){var n=t.treeScale,r=t.projectionDelta,i=e,o=e.includes("var("),a=[];o&&(e=e.replace(Qb,(function(e){return a.push(e),bx})));var s=gv.parse(e);if(s.length>5)return i;var l=gv.createTransformer(e),c="number"!==typeof s[0]?1:0,u=r.x.scale*n.x,d=r.y.scale*n.y;s[0+c]/=u,s[1+c]/=d;var f=Xg(u,d,.5);"number"===typeof s[2+c]&&(s[2+c]/=f),"number"===typeof s[3+c]&&(s[3+c]/=f);var p=l(s);if(o){var h=0;p=p.replace(bx,(function(){var e=a[h];return h++,e}))}return p}},wx=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return tc(t,e),t.prototype.componentDidMount=function(){var e,t=this,n=this.props,r=n.visualElement,i=n.layoutGroup,o=n.switchLayoutGroup,a=n.layoutId,s=r.projection;e=kx,Object.assign(Wh,e),s&&((null===i||void 0===i?void 0:i.group)&&i.group.add(s),(null===o||void 0===o?void 0:o.register)&&a&&o.register(s),s.root.didUpdate(),s.addEventListener("animationComplete",(function(){t.safeToRemove()})),s.setOptions(nc(nc({},s.options),{onExitComplete:function(){return t.safeToRemove()}}))),Dh.hasEverUpdated=!0},t.prototype.getSnapshotBeforeUpdate=function(e){var t=this,n=this.props,r=n.layoutDependency,i=n.visualElement,o=n.drag,a=n.isPresent,s=i.projection;return s?(s.isPresent=a,o||e.layoutDependency!==r||void 0===r?s.willUpdate():this.safeToRemove(),e.isPresent!==a&&(a?s.promote():s.relegate()||rh.postRender((function(){var e;(null===(e=s.getStack())||void 0===e?void 0:e.members.length)||t.safeToRemove()}))),null):null},t.prototype.componentDidUpdate=function(){var e=this.props.visualElement.projection;e&&(e.root.didUpdate(),!e.currentAnimation&&e.isLead()&&this.safeToRemove())},t.prototype.componentWillUnmount=function(){var e=this.props,t=e.visualElement,n=e.layoutGroup,r=e.switchLayoutGroup,i=t.projection;i&&(i.scheduleCheckAfterUnmount(),(null===n||void 0===n?void 0:n.group)&&n.group.remove(i),(null===r||void 0===r?void 0:r.deregister)&&r.deregister(i))},t.prototype.safeToRemove=function(){var e=this.props.safeToRemove;null===e||void 0===e||e()},t.prototype.render=function(){return null},t}(e.Component);var kx={borderRadius:nc(nc({},yx),{applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]}),borderTopLeftRadius:yx,borderTopRightRadius:yx,borderBottomLeftRadius:yx,borderBottomRightRadius:yx,boxShadow:xx},jx={measureLayout:function(t){var n=sc(Ig(),2),r=n[0],i=n[1],o=(0,e.useContext)(hh);return e.createElement(wx,nc({},t,{layoutGroup:o,switchLayoutGroup:(0,e.useContext)(Fh),isPresent:r,safeToRemove:i}))}};var Sx=["TopLeft","TopRight","BottomLeft","BottomRight"],Cx=Sx.length,Ex=function(e){return"string"===typeof e?parseFloat(e):e},Tx=function(e){return"number"===typeof e||hm.test(e)};function Px(e,t){var n;return null!==(n=e[t])&&void 0!==n?n:e.borderRadius}var Ox=zx(0,.5,Lv),Ax=zx(.5,.95,zv);function zx(e,t,n){return function(r){return r<e?0:r>t?1:n(Yg(e,t,r))}}function $x(e,t){e.min=t.min,e.max=t.max}function Rx(e,t){$x(e.x,t.x),$x(e.y,t.y)}function _x(e,t,n,r,i){return e=Rb(e-=t,1/n,r),void 0!==i&&(e=Rb(e,1/i,r)),e}function Ix(e,t,n,r,i){var o=sc(n,3),a=o[0],s=o[1],l=o[2];!function(e,t,n,r,i,o,a){if(void 0===t&&(t=0),void 0===n&&(n=1),void 0===r&&(r=.5),void 0===o&&(o=e),void 0===a&&(a=e),pm.test(t)&&(t=parseFloat(t),t=Xg(a.min,a.max,t/100)-a.min),"number"===typeof t){var s=Xg(o.min,o.max,r);e===o&&(s-=t),e.min=_x(e.min,t,n,s,i),e.max=_x(e.max,t,n,s,i)}}(e,t[a],t[s],t[l],t.scale,r,i)}var Mx=["x","scaleX","originX"],Lx=["y","scaleY","originY"];function Dx(e,t,n,r){Ix(e.x,t,Mx,null===n||void 0===n?void 0:n.x,null===r||void 0===r?void 0:r.x),Ix(e.y,t,Lx,null===n||void 0===n?void 0:n.y,null===r||void 0===r?void 0:r.y)}function Nx(e){return 0===e.translate&&1===e.scale}function Fx(e){return Nx(e.x)&&Nx(e.y)}function Vx(e,t){return e.x.min===t.x.min&&e.x.max===t.x.max&&e.y.min===t.y.min&&e.y.max===t.y.max}var Ux=function(){function e(){this.members=[]}return e.prototype.add=function(e){_y(this.members,e),e.scheduleRender()},e.prototype.remove=function(e){if(Iy(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){var t=this.members[this.members.length-1];t&&this.promote(t)}},e.prototype.relegate=function(e){var t,n=this.members.findIndex((function(t){return e===t}));if(0===n)return!1;for(var r=n;r>=0;r--){var i=this.members[r];if(!1!==i.isPresent){t=i;break}}return!!t&&(this.promote(t),!0)},e.prototype.promote=function(e,t){var n,r=this.lead;e!==r&&(this.prevLead=r,this.lead=e,e.show(),r&&(r.instance&&r.scheduleRender(),e.scheduleRender(),e.resumeFrom=r,t&&(e.resumeFrom.preserveOpacity=!0),r.snapshot&&(e.snapshot=r.snapshot,e.snapshot.latestValues=r.animationValues||r.latestValues,e.snapshot.isShared=!0),(null===(n=e.root)||void 0===n?void 0:n.isUpdating)&&(e.isLayoutDirty=!0),!1===e.options.crossfade&&r.hide()))},e.prototype.exitAnimationComplete=function(){this.members.forEach((function(e){var t,n,r,i,o;null===(n=(t=e.options).onExitComplete)||void 0===n||n.call(t),null===(o=null===(r=e.resumingFrom)||void 0===r?void 0:(i=r.options).onExitComplete)||void 0===o||o.call(i)}))},e.prototype.scheduleRender=function(){this.members.forEach((function(e){e.instance&&e.scheduleRender(!1)}))},e.prototype.removeLeadSnapshot=function(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)},e}();function Bx(e,t,n){var r=e.x.translate/t.x,i=e.y.translate/t.y,o="translate3d(".concat(r,"px, ").concat(i,"px, 0) ");if(o+="scale(".concat(1/t.x,", ").concat(1/t.y,") "),n){var a=n.rotate,s=n.rotateX,l=n.rotateY;a&&(o+="rotate(".concat(a,"deg) ")),s&&(o+="rotateX(".concat(s,"deg) ")),l&&(o+="rotateY(".concat(l,"deg) "))}var c=e.x.scale*t.x,u=e.y.scale*t.y;return"translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)"===(o+="scale(".concat(c,", ").concat(u,")"))?"none":o}var Hx=function(e,t){return e.depth-t.depth},qx=function(){function e(){this.children=[],this.isDirty=!1}return e.prototype.add=function(e){_y(this.children,e),this.isDirty=!0},e.prototype.remove=function(e){Iy(this.children,e),this.isDirty=!0},e.prototype.forEach=function(e){this.isDirty&&this.children.sort(Hx),this.isDirty=!1,this.children.forEach(e)},e}();function Wx(e){var t=e.attachResizeListener,n=e.defaultParent,r=e.measureScroll,i=e.checkIsScrollRoot,o=e.resetTransform;return function(){function e(e,t,r){var i=this;void 0===t&&(t={}),void 0===r&&(r=null===n||void 0===n?void 0:n()),this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.potentialNodes=new Map,this.checkUpdateFailed=function(){i.isUpdating&&(i.isUpdating=!1,i.clearAllSnapshots())},this.updateProjection=function(){i.nodes.forEach(Zx),i.nodes.forEach(ew)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.id=e,this.latestValues=t,this.root=r?r.root||r:this,this.path=r?lc(lc([],sc(r.path),!1),[r],!1):[],this.parent=r,this.depth=r?r.depth+1:0,e&&this.root.registerPotentialNode(e,this);for(var o=0;o<this.path.length;o++)this.path[o].shouldResetTransform=!0;this.root===this&&(this.nodes=new qx)}return e.prototype.addEventListener=function(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new My),this.eventHandlers.get(e).add(t)},e.prototype.notifyListeners=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=this.eventHandlers.get(e);null===r||void 0===r||r.notify.apply(r,lc([],sc(t),!1))},e.prototype.hasListeners=function(e){return this.eventHandlers.has(e)},e.prototype.registerPotentialNode=function(e,t){this.potentialNodes.set(e,t)},e.prototype.mount=function(e,n){var r,i=this;if(void 0===n&&(n=!1),!this.instance){this.isSVG=e instanceof SVGElement&&"svg"!==e.tagName,this.instance=e;var o=this.options,a=o.layoutId,s=o.layout,l=o.visualElement;if(l&&!l.getInstance()&&l.mount(e),this.root.nodes.add(this),null===(r=this.parent)||void 0===r||r.children.add(this),this.id&&this.root.potentialNodes.delete(this.id),n&&(s||a)&&(this.isLayoutDirty=!0),t){var c,u=function(){return i.root.updateBlockedByResize=!1};t(e,(function(){i.root.updateBlockedByResize=!0,clearTimeout(c),c=window.setTimeout(u,250),Dh.hasAnimatedSinceResize&&(Dh.hasAnimatedSinceResize=!1,i.nodes.forEach(Qx))}))}a&&this.root.registerSharedNode(a,this),!1!==this.options.animate&&l&&(a||s)&&this.addEventListener("didUpdate",(function(e){var t,n,r,o,a,s=e.delta,c=e.hasLayoutChanged,u=e.hasRelativeTargetChanged,d=e.layout;if(i.isTreeAnimationBlocked())return i.target=void 0,void(i.relativeTarget=void 0);var f=null!==(n=null!==(t=i.options.transition)&&void 0!==t?t:l.getDefaultTransition())&&void 0!==n?n:aw,p=l.getProps(),h=p.onLayoutAnimationStart,m=p.onLayoutAnimationComplete,g=!i.targetLayout||!Vx(i.targetLayout,d)||u,v=!c&&u;if((null===(r=i.resumeFrom)||void 0===r?void 0:r.instance)||v||c&&(g||!i.currentAnimation)){i.resumeFrom&&(i.resumingFrom=i.resumeFrom,i.resumingFrom.resumingFrom=void 0),i.setAnimationOrigin(s,v);var y=nc(nc({},Ay(f,"layout")),{onPlay:h,onComplete:m});l.shouldReduceMotion&&(y.delay=0,y.type=!1),i.startAnimation(y)}else c||0!==i.animationProgress||i.finishAnimation(),i.isLead()&&(null===(a=(o=i.options).onExitComplete)||void 0===a||a.call(o));i.targetLayout=d}))}},e.prototype.unmount=function(){var e,t;this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this),null===(e=this.getStack())||void 0===e||e.remove(this),null===(t=this.parent)||void 0===t||t.children.delete(this),this.instance=void 0,Jp.preRender(this.updateProjection)},e.prototype.blockUpdate=function(){this.updateManuallyBlocked=!0},e.prototype.unblockUpdate=function(){this.updateManuallyBlocked=!1},e.prototype.isUpdateBlocked=function(){return this.updateManuallyBlocked||this.updateBlockedByResize},e.prototype.isTreeAnimationBlocked=function(){var e;return this.isAnimationBlocked||(null===(e=this.parent)||void 0===e?void 0:e.isTreeAnimationBlocked())||!1},e.prototype.startUpdate=function(){var e;this.isUpdateBlocked()||(this.isUpdating=!0,null===(e=this.nodes)||void 0===e||e.forEach(tw))},e.prototype.willUpdate=function(e){var t,n,r;if(void 0===e&&(e=!0),this.root.isUpdateBlocked())null===(n=(t=this.options).onExitComplete)||void 0===n||n.call(t);else if(!this.root.isUpdating&&this.root.startUpdate(),!this.isLayoutDirty){this.isLayoutDirty=!0;for(var i=0;i<this.path.length;i++){var o=this.path[i];o.shouldResetTransform=!0,o.updateScroll()}var a=this.options,s=a.layoutId,l=a.layout;if(void 0!==s||l){var c=null===(r=this.options.visualElement)||void 0===r?void 0:r.getProps().transformTemplate;this.prevTransformTemplateValue=null===c||void 0===c?void 0:c(this.latestValues,""),this.updateSnapshot(),e&&this.notifyListeners("willUpdate")}}},e.prototype.didUpdate=function(){if(this.isUpdateBlocked())return this.unblockUpdate(),this.clearAllSnapshots(),void this.nodes.forEach(Gx);this.isUpdating&&(this.isUpdating=!1,this.potentialNodes.size&&(this.potentialNodes.forEach(sw),this.potentialNodes.clear()),this.nodes.forEach(Jx),this.nodes.forEach(Yx),this.nodes.forEach(Xx),this.clearAllSnapshots(),Qp.update(),Qp.preRender(),Qp.render())},e.prototype.clearAllSnapshots=function(){this.nodes.forEach(Kx),this.sharedNodes.forEach(nw)},e.prototype.scheduleUpdateProjection=function(){rh.preRender(this.updateProjection,!1,!0)},e.prototype.scheduleCheckAfterUnmount=function(){var e=this;rh.postRender((function(){e.isLayoutDirty?e.root.didUpdate():e.root.checkUpdateFailed()}))},e.prototype.updateSnapshot=function(){if(!this.snapshot&&this.instance){var e=this.measure(),t=this.removeTransform(this.removeElementScroll(e));cw(t),this.snapshot={measured:e,layout:t,latestValues:{}}}},e.prototype.updateLayout=function(){var e;if(this.instance&&(this.updateScroll(),this.options.alwaysMeasureLayout&&this.isLead()||this.isLayoutDirty)){if(this.resumeFrom&&!this.resumeFrom.instance)for(var t=0;t<this.path.length;t++){this.path[t].updateScroll()}var n=this.measure();cw(n);var r=this.layout;this.layout={measured:n,actual:this.removeElementScroll(n)},this.layoutCorrected={x:{min:0,max:0},y:{min:0,max:0}},this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.actual),null===(e=this.options.visualElement)||void 0===e||e.notifyLayoutMeasure(this.layout.actual,null===r||void 0===r?void 0:r.actual)}},e.prototype.updateScroll=function(){this.options.layoutScroll&&this.instance&&(this.isScrollRoot=i(this.instance),this.scroll=r(this.instance))},e.prototype.resetTransform=function(){var e;if(o){var t=this.isLayoutDirty||this.shouldResetTransform,n=this.projectionDelta&&!Fx(this.projectionDelta),r=null===(e=this.options.visualElement)||void 0===e?void 0:e.getProps().transformTemplate,i=null===r||void 0===r?void 0:r(this.latestValues,""),a=i!==this.prevTransformTemplateValue;t&&(n||zb(this.latestValues)||a)&&(o(this.instance,i),this.shouldResetTransform=!1,this.scheduleRender())}},e.prototype.measure=function(){var e=this.options.visualElement;if(!e)return{x:{min:0,max:0},y:{min:0,max:0}};var t=e.measureViewportBox(),n=this.root.scroll;return n&&(Lb(t.x,n.x),Lb(t.y,n.y)),t},e.prototype.removeElementScroll=function(e){var t={x:{min:0,max:0},y:{min:0,max:0}};Rx(t,e);for(var n=0;n<this.path.length;n++){var r=this.path[n],i=r.scroll,o=r.options,a=r.isScrollRoot;if(r!==this.root&&i&&o.layoutScroll){if(a){Rx(t,e);var s=this.root.scroll;s&&(Lb(t.x,-s.x),Lb(t.y,-s.y))}Lb(t.x,i.x),Lb(t.y,i.y)}}return t},e.prototype.applyTransform=function(e,t){void 0===t&&(t=!1);var n={x:{min:0,max:0},y:{min:0,max:0}};Rx(n,e);for(var r=0;r<this.path.length;r++){var i=this.path[r];!t&&i.options.layoutScroll&&i.scroll&&i!==i.root&&Vb(n,{x:-i.scroll.x,y:-i.scroll.y}),zb(i.latestValues)&&Vb(n,i.latestValues)}return zb(this.latestValues)&&Vb(n,this.latestValues),n},e.prototype.removeTransform=function(e){var t,n={x:{min:0,max:0},y:{min:0,max:0}};Rx(n,e);for(var r=0;r<this.path.length;r++){var i=this.path[r];if(i.instance&&zb(i.latestValues)){Ab(i.latestValues)&&i.updateSnapshot();var o={x:{min:0,max:0},y:{min:0,max:0}};Rx(o,i.measure()),Dx(n,i.latestValues,null===(t=i.snapshot)||void 0===t?void 0:t.layout,o)}}return zb(this.latestValues)&&Dx(n,this.latestValues),n},e.prototype.setTargetDelta=function(e){this.targetDelta=e,this.root.scheduleUpdateProjection()},e.prototype.setOptions=function(e){var t;this.options=nc(nc(nc({},this.options),e),{crossfade:null===(t=e.crossfade)||void 0===t||t})},e.prototype.clearMeasurements=function(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1},e.prototype.resolveTargetDelta=function(){var e,t,n,r,i=this.options,o=i.layout,a=i.layoutId;this.layout&&(o||a)&&(this.targetDelta||this.relativeTarget||(this.relativeParent=this.getClosestProjectingParent(),this.relativeParent&&this.relativeParent.layout&&(this.relativeTarget={x:{min:0,max:0},y:{min:0,max:0}},this.relativeTargetOrigin={x:{min:0,max:0},y:{min:0,max:0}},wb(this.relativeTargetOrigin,this.layout.actual,this.relativeParent.layout.actual),Rx(this.relativeTarget,this.relativeTargetOrigin))),(this.relativeTarget||this.targetDelta)&&(this.target||(this.target={x:{min:0,max:0},y:{min:0,max:0}},this.targetWithTransforms={x:{min:0,max:0},y:{min:0,max:0}}),this.relativeTarget&&this.relativeTargetOrigin&&(null===(e=this.relativeParent)||void 0===e?void 0:e.target)?(t=this.target,n=this.relativeTarget,r=this.relativeParent.target,bb(t.x,n.x,r.x),bb(t.y,n.y,r.y)):this.targetDelta?(Boolean(this.resumingFrom)?this.target=this.applyTransform(this.layout.actual):Rx(this.target,this.layout.actual),Mb(this.target,this.targetDelta)):Rx(this.target,this.layout.actual),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.relativeParent=this.getClosestProjectingParent(),this.relativeParent&&Boolean(this.relativeParent.resumingFrom)===Boolean(this.resumingFrom)&&!this.relativeParent.options.layoutScroll&&this.relativeParent.target&&(this.relativeTarget={x:{min:0,max:0},y:{min:0,max:0}},this.relativeTargetOrigin={x:{min:0,max:0},y:{min:0,max:0}},wb(this.relativeTargetOrigin,this.target,this.relativeParent.target),Rx(this.relativeTarget,this.relativeTargetOrigin)))))},e.prototype.getClosestProjectingParent=function(){if(this.parent&&!zb(this.parent.latestValues))return(this.parent.relativeTarget||this.parent.targetDelta)&&this.parent.layout?this.parent:this.parent.getClosestProjectingParent()},e.prototype.calcProjection=function(){var e,t=this.options,n=t.layout,r=t.layoutId;if(this.isTreeAnimating=Boolean((null===(e=this.parent)||void 0===e?void 0:e.isTreeAnimating)||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),this.layout&&(n||r)){var i=this.getLead();Rx(this.layoutCorrected,this.layout.actual),function(e,t,n,r){var i,o;void 0===r&&(r=!1);var a=n.length;if(a){var s,l;t.x=t.y=1;for(var c=0;c<a;c++)l=(s=n[c]).projectionDelta,"contents"!==(null===(o=null===(i=s.instance)||void 0===i?void 0:i.style)||void 0===o?void 0:o.display)&&(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&Vb(e,{x:-s.scroll.x,y:-s.scroll.y}),l&&(t.x*=l.x.scale,t.y*=l.y.scale,Mb(e,l)),r&&zb(s.latestValues)&&Vb(e,s.latestValues))}}(this.layoutCorrected,this.treeScale,this.path,Boolean(this.resumingFrom)||this!==i);var o=i.target;if(o){this.projectionDelta||(this.projectionDelta={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}},this.projectionDeltaWithTransform={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}});var a=this.treeScale.x,s=this.treeScale.y,l=this.projectionTransform;yb(this.projectionDelta,this.layoutCorrected,o,this.latestValues),this.projectionTransform=Bx(this.projectionDelta,this.treeScale),this.projectionTransform===l&&this.treeScale.x===a&&this.treeScale.y===s||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",o))}}},e.prototype.hide=function(){this.isVisible=!1},e.prototype.show=function(){this.isVisible=!0},e.prototype.scheduleRender=function(e){var t,n,r;void 0===e&&(e=!0),null===(n=(t=this.options).scheduleRender)||void 0===n||n.call(t),e&&(null===(r=this.getStack())||void 0===r||r.scheduleRender()),this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)},e.prototype.setAnimationOrigin=function(e,t){var n,r=this;void 0===t&&(t=!1);var i=this.snapshot,o=(null===i||void 0===i?void 0:i.latestValues)||{},a=nc({},this.latestValues),s={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};this.relativeTarget=this.relativeTargetOrigin=void 0,this.attemptToResolveRelativeTarget=!t;var l={x:{min:0,max:0},y:{min:0,max:0}},c=null===i||void 0===i?void 0:i.isShared,u=((null===(n=this.getStack())||void 0===n?void 0:n.members.length)||0)<=1,d=Boolean(c&&!u&&!0===this.options.crossfade&&!this.path.some(ow));this.animationProgress=0,this.mixTargetDelta=function(t){var n,i=t/1e3;rw(s.x,e.x,i),rw(s.y,e.y,i),r.setTargetDelta(s),r.relativeTarget&&r.relativeTargetOrigin&&r.layout&&(null===(n=r.relativeParent)||void 0===n?void 0:n.layout)&&(wb(l,r.layout.actual,r.relativeParent.layout.actual),function(e,t,n,r){iw(e.x,t.x,n.x,r),iw(e.y,t.y,n.y,r)}(r.relativeTarget,r.relativeTargetOrigin,l,i)),c&&(r.animationValues=a,function(e,t,n,r,i,o){var a,s,l,c;i?(e.opacity=Xg(0,null!==(a=n.opacity)&&void 0!==a?a:1,Ox(r)),e.opacityExit=Xg(null!==(s=t.opacity)&&void 0!==s?s:1,0,Ax(r))):o&&(e.opacity=Xg(null!==(l=t.opacity)&&void 0!==l?l:1,null!==(c=n.opacity)&&void 0!==c?c:1,r));for(var u=0;u<Cx;u++){var d="border".concat(Sx[u],"Radius"),f=Px(t,d),p=Px(n,d);void 0===f&&void 0===p||(f||(f=0),p||(p=0),0===f||0===p||Tx(f)===Tx(p)?(e[d]=Math.max(Xg(Ex(f),Ex(p),r),0),(pm.test(p)||pm.test(f))&&(e[d]+="%")):e[d]=p)}(t.rotate||n.rotate)&&(e.rotate=Xg(t.rotate||0,n.rotate||0,r))}(a,o,r.latestValues,i,d,u)),r.root.scheduleUpdateProjection(),r.scheduleRender(),r.animationProgress=i},this.mixTargetDelta(0)},e.prototype.startAnimation=function(e){var t,n,r=this;this.notifyListeners("animationStart"),null===(t=this.currentAnimation)||void 0===t||t.stop(),this.resumingFrom&&(null===(n=this.resumingFrom.currentAnimation)||void 0===n||n.stop()),this.pendingAnimation&&(Jp.update(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=rh.update((function(){Dh.hasAnimatedSinceResize=!0,r.currentAnimation=function(e,t,n){void 0===n&&(n={});var r=tm(e)?e:Dy(e);return zy("",r,t,n),{stop:function(){return r.stop()},isAnimating:function(){return r.isAnimating()}}}(0,1e3,nc(nc({},e),{onUpdate:function(t){var n;r.mixTargetDelta(t),null===(n=e.onUpdate)||void 0===n||n.call(e,t)},onComplete:function(){var t;null===(t=e.onComplete)||void 0===t||t.call(e),r.completeAnimation()}})),r.resumingFrom&&(r.resumingFrom.currentAnimation=r.currentAnimation),r.pendingAnimation=void 0}))},e.prototype.completeAnimation=function(){var e;this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0),null===(e=this.getStack())||void 0===e||e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")},e.prototype.finishAnimation=function(){var e;this.currentAnimation&&(null===(e=this.mixTargetDelta)||void 0===e||e.call(this,1e3),this.currentAnimation.stop()),this.completeAnimation()},e.prototype.applyTransformsToTarget=function(){var e=this.getLead(),t=e.targetWithTransforms,n=e.target,r=e.layout,i=e.latestValues;t&&n&&r&&(Rx(t,n),Vb(t,i),yb(this.projectionDeltaWithTransform,this.layoutCorrected,t,i))},e.prototype.registerSharedNode=function(e,t){var n,r,i;this.sharedNodes.has(e)||this.sharedNodes.set(e,new Ux),this.sharedNodes.get(e).add(t),t.promote({transition:null===(n=t.options.initialPromotionConfig)||void 0===n?void 0:n.transition,preserveFollowOpacity:null===(i=null===(r=t.options.initialPromotionConfig)||void 0===r?void 0:r.shouldPreserveFollowOpacity)||void 0===i?void 0:i.call(r,t)})},e.prototype.isLead=function(){var e=this.getStack();return!e||e.lead===this},e.prototype.getLead=function(){var e;return this.options.layoutId&&(null===(e=this.getStack())||void 0===e?void 0:e.lead)||this},e.prototype.getPrevLead=function(){var e;return this.options.layoutId?null===(e=this.getStack())||void 0===e?void 0:e.prevLead:void 0},e.prototype.getStack=function(){var e=this.options.layoutId;if(e)return this.root.sharedNodes.get(e)},e.prototype.promote=function(e){var t=void 0===e?{}:e,n=t.needsReset,r=t.transition,i=t.preserveFollowOpacity,o=this.getStack();o&&o.promote(this,i),n&&(this.projectionDelta=void 0,this.needsReset=!0),r&&this.setOptions({transition:r})},e.prototype.relegate=function(){var e=this.getStack();return!!e&&e.relegate(this)},e.prototype.resetRotation=function(){var e=this.options.visualElement;if(e){for(var t=!1,n={},r=0;r<Yh.length;r++){var i="rotate"+Yh[r];e.getStaticValue(i)&&(t=!0,n[i]=e.getStaticValue(i),e.setStaticValue(i,0))}if(t){for(var i in null===e||void 0===e||e.syncRender(),n)e.setStaticValue(i,n[i]);e.scheduleRender()}}},e.prototype.getProjectionStyles=function(e){var t,n,r,i,o,a;void 0===e&&(e={});var s={};if(!this.instance||this.isSVG)return s;if(!this.isVisible)return{visibility:"hidden"};s.visibility="";var l=null===(t=this.options.visualElement)||void 0===t?void 0:t.getProps().transformTemplate;if(this.needsReset)return this.needsReset=!1,s.opacity="",s.pointerEvents=Km(e.pointerEvents)||"",s.transform=l?l(this.latestValues,""):"none",s;var c=this.getLead();if(!this.projectionDelta||!this.layout||!c.target){var u={};return this.options.layoutId&&(u.opacity=null!==(n=this.latestValues.opacity)&&void 0!==n?n:1,u.pointerEvents=Km(e.pointerEvents)||""),this.hasProjected&&!zb(this.latestValues)&&(u.transform=l?l({},""):"none",this.hasProjected=!1),u}var d=c.animationValues||c.latestValues;this.applyTransformsToTarget(),s.transform=Bx(this.projectionDeltaWithTransform,this.treeScale,d),l&&(s.transform=l(d,s.transform));var f=this.projectionDelta,p=f.x,h=f.y;for(var m in s.transformOrigin="".concat(100*p.origin,"% ").concat(100*h.origin,"% 0"),c.animationValues?s.opacity=c===this?null!==(i=null!==(r=d.opacity)&&void 0!==r?r:this.latestValues.opacity)&&void 0!==i?i:1:this.preserveOpacity?this.latestValues.opacity:d.opacityExit:s.opacity=c===this?null!==(o=d.opacity)&&void 0!==o?o:"":null!==(a=d.opacityExit)&&void 0!==a?a:0,Wh)if(void 0!==d[m]){var g=Wh[m],v=g.correct,y=g.applyTo,b=v(d[m],c);if(y)for(var x=y.length,w=0;w<x;w++)s[y[w]]=b;else s[m]=b}return this.options.layoutId&&(s.pointerEvents=c===this?Km(e.pointerEvents)||"":"none"),s},e.prototype.clearSnapshot=function(){this.resumeFrom=this.snapshot=void 0},e.prototype.resetTree=function(){this.root.nodes.forEach((function(e){var t;return null===(t=e.currentAnimation)||void 0===t?void 0:t.stop()})),this.root.nodes.forEach(Gx),this.root.sharedNodes.clear()},e}()}function Yx(e){e.updateLayout()}function Xx(e){var t,n,r,i,o=null!==(n=null===(t=e.resumeFrom)||void 0===t?void 0:t.snapshot)&&void 0!==n?n:e.snapshot;if(e.isLead()&&e.layout&&o&&e.hasListeners("didUpdate")){var a=e.layout,s=a.actual,l=a.measured;"size"===e.options.animationType?Tb((function(e){var t=o.isShared?o.measured[e]:o.layout[e],n=mb(t);t.min=s[e].min,t.max=t.min+n})):"position"===e.options.animationType&&Tb((function(e){var t=o.isShared?o.measured[e]:o.layout[e],n=mb(s[e]);t.max=t.min+n}));var c={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};yb(c,s,o.layout);var u={x:{translate:0,scale:1,origin:0,originPoint:0},y:{translate:0,scale:1,origin:0,originPoint:0}};o.isShared?yb(u,e.applyTransform(l,!0),o.measured):yb(u,s,o.layout);var d=!Fx(c),f=!1;if(!e.resumeFrom&&(e.relativeParent=e.getClosestProjectingParent(),e.relativeParent&&!e.relativeParent.resumeFrom)){var p=e.relativeParent,h=p.snapshot,m=p.layout;if(h&&m){var g={x:{min:0,max:0},y:{min:0,max:0}};wb(g,o.layout,h.layout);var v={x:{min:0,max:0},y:{min:0,max:0}};wb(v,s,m.actual),Vx(g,v)||(f=!0)}}e.notifyListeners("didUpdate",{layout:s,snapshot:o,delta:u,layoutDelta:c,hasLayoutChanged:d,hasRelativeTargetChanged:f})}else e.isLead()&&(null===(i=(r=e.options).onExitComplete)||void 0===i||i.call(r));e.options.transition=void 0}function Kx(e){e.clearSnapshot()}function Gx(e){e.clearMeasurements()}function Jx(e){var t=e.options.visualElement;(null===t||void 0===t?void 0:t.getProps().onBeforeLayoutMeasure)&&t.notifyBeforeLayoutMeasure(),e.resetTransform()}function Qx(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0}function Zx(e){e.resolveTargetDelta()}function ew(e){e.calcProjection()}function tw(e){e.resetRotation()}function nw(e){e.removeLeadSnapshot()}function rw(e,t,n){e.translate=Xg(t.translate,0,n),e.scale=Xg(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function iw(e,t,n,r){e.min=Xg(t.min,n.min,r),e.max=Xg(t.max,n.max,r)}function ow(e){return e.animationValues&&void 0!==e.animationValues.opacityExit}var aw={duration:.45,ease:[.4,0,.1,1]};function sw(e,t){for(var n=e.root,r=e.path.length-1;r>=0;r--)if(Boolean(e.path[r].instance)){n=e.path[r];break}var i=(n&&n!==e.root?n.instance:document).querySelector('[data-projection-id="'.concat(t,'"]'));i&&e.mount(i,!0)}function lw(e){e.min=Math.round(e.min),e.max=Math.round(e.max)}function cw(e){lw(e.x),lw(e.y)}var uw=Wx({attachResizeListener:function(e,t){return ng(e,"resize",t)},measureScroll:function(){return{x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}},checkIsScrollRoot:function(){return!0}}),dw={current:void 0},fw=Wx({measureScroll:function(e){return{x:e.scrollLeft,y:e.scrollTop}},defaultParent:function(){if(!dw.current){var e=new uw(0,{});e.mount(window),e.setOptions({layoutScroll:!0}),dw.current=e}return dw.current},resetTransform:function(e,t){e.style.transform=null!==t&&void 0!==t?t:"none"},checkIsScrollRoot:function(e){return Boolean("fixed"===window.getComputedStyle(e).position)}}),pw=nc(nc(nc(nc({},rb),_g),Wb),jx),hw=Bh((function(e,t){return function(e,t,n,r,i){var o=t.forwardMotionProps,a=void 0!==o&&o,s=qh(e)?eg:tg;return nc(nc({},s),{preloadedFeatures:n,useRender:Dm(a),createVisualElement:r,projectionNodeConstructor:i,Component:e})}(e,t,pw,gx,fw)}));const mw=Fp()(Nf);const gw={enter:e=>{let{position:t,direction:n,sideX:r}=e;return"center"===t?{x:n>0?1.2*r:1.2*-r,scale:.8,opacity:0,rotateY:n>0?20:-20,filter:"blur(6px) saturate(0.5)",zIndex:2}:{x:"prev"===t?1.8*-r:1.8*r,opacity:0,scale:.78,rotateY:"prev"===t?10:-10,filter:"blur(0px) saturate(0.9)",zIndex:1}},center:e=>{let{position:t,sideX:n}=e;return"center"===t?{x:0,scale:1,opacity:1,rotateY:0,filter:"blur(0px) saturate(1)",zIndex:3,transition:{type:"spring",stiffness:300,damping:30}}:"prev"===t?{x:-n,scale:.78,opacity:.85,rotateY:10,filter:"blur(0px) saturate(0.9)",zIndex:1,transition:{type:"spring",stiffness:300,damping:30}}:{x:n,scale:.78,opacity:.85,rotateY:-10,filter:"blur(0px) saturate(0.9)",zIndex:1,transition:{type:"spring",stiffness:300,damping:30}}},exit:e=>{let{position:t,direction:n,sideX:r}=e;return"center"===t?{x:n>0?1.2*-r:1.2*r,scale:.8,opacity:0,rotateY:n>0?-20:20,filter:"blur(6px) saturate(0.5)",zIndex:2,transition:{type:"spring",stiffness:300,damping:30}}:{x:"prev"===t?1.8*-r:1.8*r,opacity:0,scale:.65,filter:"blur(4px) saturate(0.5)",zIndex:0,transition:{duration:.2}}}};function vw(e){return{web:"#3498db",mobile:"#9b59b6",design:"#e67e22",desktop:"#1abc9c"}[e]||"#3498db"}const yw={web:"Web",mobile:"Mobile",design:"Design",desktop:"Desktop App"};function bw(e){let{project:t,position:n,direction:r,layoutKey:i,sideX:o}=e;const a="center"===n,s=Go(Lo);return(0,la.jsx)(Mw,{custom:{position:n,direction:r,sideX:o},variants:gw,initial:"enter",animate:"center",exit:"exit",$position:n,onClick:()=>{var e;a&&null!==(e=t.slug)&&void 0!==e&&e.current&&s.push(`/project/${t.slug.current}`)},children:(0,la.jsxs)(Lw,{children:[t.image?(0,la.jsx)(Dw,{src:(l=t.image,mw.image(l)).width(800).auto("format").fit("crop").url(),alt:t.title,loading:"lazy"}):(0,la.jsx)(Nw,{}),(0,la.jsxs)(Fw,{"data-slide-panel":!0,children:[(0,la.jsx)(Vw,{children:Array.isArray(t.projectType)?t.projectType.filter((e=>yw[e])).map(((e,t)=>(0,la.jsx)(Uw,{$color:vw(e),children:yw[e]},t))):yw[t.projectType]?(0,la.jsx)(Uw,{$color:vw(t.projectType),children:yw[t.projectType]}):null}),(0,la.jsx)(Bw,{children:t.title}),(t.excerpt||t.description)&&(0,la.jsx)(Hw,{children:t.excerpt||t.description}),(0,la.jsxs)(qw,{children:[t.place&&(0,la.jsx)(Yw,{children:t.place}),t.place&&t.date&&(0,la.jsx)(Ww,{children:"\xb7"}),t.date&&(0,la.jsx)(Yw,{children:new Date(t.date).getFullYear()})]}),t.tags&&t.tags.length>0&&(0,la.jsx)(Xw,{children:t.tags.map(((e,t)=>(0,la.jsx)(Kw,{children:e},t)))})]})]})},i);var l}function xw(){const[t,n]=(0,e.useState)(null),[r,i]=(0,e.useState)("all"),[o,a]=(0,e.useState)(!0),[s,l]=(0,e.useState)(0),[c,u]=(0,e.useState)(1),[d,f]=(0,e.useState)(!1),p=function(){const t=()=>.5*window.innerWidth,[n,r]=(0,e.useState)(t);return(0,e.useEffect)((()=>{const e=()=>r(t());return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),n}(),h=(0,e.useRef)(null);(0,e.useEffect)((()=>{a(!0),l(0),Nf.fetch('*[_type == "project" &&\n        ($projectTypeFilter == "all" || $projectTypeFilter in projectType)] | order(featured desc, order asc, date desc){\n          title,\n          slug,\n          date,\n          place,\n          excerpt,\n          description,\n          projectType,\n          link,\n          githubLink,\n          "github": github,\n          tags,\n          image {\n            asset -> {\n              _id,\n              url,\n              metadata { dimensions }\n            }\n          }\n        }',{projectTypeFilter:r}).then((e=>{n(e),a(!1)})).catch(console.error)}),[r]);const m=t?t.length:0,g=(0,e.useCallback)((()=>{u(1),l((e=>(e+1)%m))}),[m]),v=(0,e.useCallback)((()=>{u(-1),l((e=>(e-1+m)%m))}),[m]),y=(0,e.useCallback)((e=>{u(e>s?1:-1),l(e)}),[s]);(0,e.useEffect)((()=>(!d&&m>1&&(h.current=setInterval(g,4e3)),()=>clearInterval(h.current))),[d,g,m]);const b=m>0?(s-1+m)%m:0,x=m>0?(s+1)%m:0;return o?(0,la.jsx)(Tw,{}):t&&0!==t.length?(0,la.jsxs)(jw,{children:[(0,la.jsxs)(Sw,{children:[(0,la.jsx)(Cw,{children:"My Portfolio"}),(0,la.jsx)(Ew,{children:"Full-stack development meets creative design. (React, JavaScript, Figma)"})]}),(0,la.jsx)(ww,{projectTypeFilter:r,setProjectTypeFilter:i}),(0,la.jsxs)(Rw,{onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:[(0,la.jsxs)(_w,{children:[(0,la.jsx)(Iw,{children:(0,la.jsxs)(vh,{custom:{direction:c,sideX:p},children:[m>1&&(0,la.jsx)(bw,{layoutKey:`prev-${b}-${r}`,project:t[b],position:"prev",direction:c,sideX:p},`prev-${b}-${r}`),(0,la.jsx)(bw,{layoutKey:`center-${s}-${r}`,project:t[s],position:"center",direction:c,sideX:p},`center-${s}-${r}`),m>1&&(0,la.jsx)(bw,{layoutKey:`next-${x}-${r}`,project:t[x],position:"next",direction:c,sideX:p},`next-${x}-${r}`)]})}),m>1&&(0,la.jsxs)(la.Fragment,{children:[(0,la.jsx)(Gw,{$side:"left",onClick:v,"aria-label":"Previous project",children:(0,la.jsx)(Hf,{size:28})}),(0,la.jsx)(Gw,{$side:"right",onClick:g,"aria-label":"Next project",children:(0,la.jsx)(qf,{size:28})})]})]}),m>1&&(0,la.jsx)(Jw,{children:t.map(((e,t)=>(0,la.jsx)(Qw,{$active:t===s,onClick:()=>y(t),"aria-label":`Go to project ${t+1}`},t)))}),(0,la.jsxs)(Zw,{children:[s+1," / ",m]})]})]}):(0,la.jsxs)(jw,{children:[(0,la.jsx)(ww,{projectTypeFilter:r,setProjectTypeFilter:i}),(0,la.jsx)(Pw,{children:"No projects found for this filter."})]})}function ww(e){let{projectTypeFilter:t,setProjectTypeFilter:n}=e;return(0,la.jsxs)(Ow,{children:[(0,la.jsx)(Aw,{children:"Filter Projects:"}),(0,la.jsx)(zw,{children:[{value:"all",label:"All"},{value:"web",label:"Web"},{value:"mobile",label:"Mobile"},{value:"design",label:"Design"},{value:"desktop",label:"Desktop"}].map((e=>{let{value:r,label:i}=e;return(0,la.jsx)($w,{selected:t===r,onClick:()=>n(r),children:i},r)}))})]})}const kw=_e`
  to { transform: rotate(360deg); }
`,jw=(_e`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`,Ie.div`
  width: 100%;
  /*
   * Top padding accounts for the fixed 60px navbar.
   * Reduced breathing room from 2.5rem → 1.5rem now that the
   * portfolio header is compact — gets the carousel closer to the fold.
   */
  padding: calc(var(--navbar-h, 60px) + 1.5rem) 0 4rem;
`),Sw=Ie.header`
  text-align: center;
  padding: 0 2rem 1.25rem;
  max-width: 680px;
  margin: 0 auto;
`,Cw=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 0.5rem;
`,Ew=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.8rem, 1.2vw, 0.92rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.50);
  line-height: 1.6;
  margin: 0;
`,Tw=Ie.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 100%;

  &::after {
    content: "";
    width: 52px;
    height: 52px;
    border: 4px solid rgba(52, 152, 219, 0.15);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: ${kw} 0.9s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
  }
`,Pw=Ie.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.1rem;
  padding: 4rem 0;
`,Ow=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*
   * Reduced from 2.5rem — filters sit between the compact header
   * and the carousel; they don't need heavyweight spacing.
   */
  margin-bottom: 1.5rem;
  gap: 0.65rem;
  padding: 0 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
`,Aw=Ie.h3`
  /*
   * Demoted to a small eyebrow label — the portfolio title above already
   * provides the heading hierarchy. "Filter Projects:" read too heavy.
   */
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.40);
  margin: 0;
`,zw=Ie.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`,$w=Ie.button`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease;
  /* Unified to the single accent blue from CSS vars */
  background-color: ${e=>{let{selected:t}=e;return t?"rgba(14, 165, 233, 0.85)":"rgba(255, 255, 255, 0.07)"}};
  color: ${e=>{let{selected:t}=e;return t?"white":"rgba(255,255,255,0.60)"}};
  border: 1.5px solid ${e=>{let{selected:t}=e;return t?"transparent":"rgba(255, 255, 255, 0.10)"}};
  box-shadow: ${e=>{let{selected:t}=e;return t?"0 4px 16px rgba(14, 165, 233, 0.30)":"none"}};
  backdrop-filter: blur(8px);

  &:hover {
    background-color: ${e=>{let{selected:t}=e;return t?"rgba(14, 165, 233, 0.95)":"rgba(255, 255, 255, 0.12)"}};
    border-color: ${e=>{let{selected:t}=e;return t?"transparent":"rgba(14, 165, 233, 0.45)"}};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.85rem;
    font-size: 0.78rem;
  }
`,Rw=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Reduced from 2rem — tighter gap between stage, dots, and counter */
  gap: 1rem;
  width: 100%;
  overflow-x: clip;
`,_w=Ie.div`
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1200px;
  perspective-origin: 50% 50%;

  /*
   * Reduced card width from 60vw → 44vw so the carousel reads
   * as a gallery panel, not a billboard. Max-height prevents the
   * stage from growing excessively on ultra-wide screens.
   */
  height: min(calc(44vw * 9 / 16), 420px);

  @media (max-width: 768px) {
    height: calc(70vw * 9 / 16);
  }

  @media (max-width: 600px) {
    height: calc(88vw * 3 / 4);
  }
`,Iw=Ie.div`
  position: relative;
  width: 100%;
  height: 100%;
`,Mw=Ie(hw.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  /*
   * Card width stepped down from 60vw → 44vw (capped at 680px)
   * to match the reduced PerspectiveStage height and keep the
   * carousel proportional rather than billboard-sized.
   */
  width: min(44vw, 680px);
  height: min(calc(44vw * 9 / 16), 382px);
  margin-left: calc(min(44vw, 680px) / -2);
  margin-top: calc(min(calc(44vw * 9 / 16), 382px) / -2);

  @media (max-width: 768px) {
    width: 70vw;
    height: calc(70vw * 9 / 16);
    margin-left: -35vw;
    margin-top: calc(-70vw * 9 / 32);
  }

  @media (max-width: 600px) {
    width: 88vw;
    height: calc(88vw * 3 / 4);
    margin-left: -44vw;
    margin-top: calc(-88vw * 3 / 8);
  }

  will-change: transform, opacity, filter;
  border-radius: 20px;
  overflow: hidden;
  background: #07070f;
  cursor: pointer;

  /*
   * Shadows removed per design revision — card depth is now conveyed
   * through scale, opacity, and rotateY on the side cards alone.
   * A hairline border keeps the card edge readable against dark backgrounds.
   */
  border: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 600px) {
    ${e=>{let{$position:t}=e;return("prev"===t||"next"===t)&&ye`
        display: none;
      `}}
  }
`,Lw=Ie.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: #07070f;

  &:hover img {
    transform: scale(1.04);
  }

  &:hover [data-slide-panel] {
    transform: translateY(0);
  }
`,Dw=Ie.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1);
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
`,Nw=Ie.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(52, 152, 219, 0.18),
    rgba(155, 89, 182, 0.18)
  );
`,Fw=Ie.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 2.5rem 1.4rem 1.25rem;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(4, 4, 14, 0.92) 20%,
    rgba(4, 4, 14, 0.98) 100%
  );
  transform: translateY(calc(100% - 3.6rem));
  transition: transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  @media (max-width: 768px) {
    transform: translateY(calc(100% - 3.2rem));
    padding: 2rem 1.1rem 1rem;
    gap: 0.45rem;
  }

  @media (max-width: 600px) {
    transform: translateY(0);
    padding: 1.75rem 1rem 0.75rem;
    gap: 0.3rem;
  }
`,Vw=Ie.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
`,Uw=Ie.span`
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${e=>{let{$color:t}=e;return t}};
`,Bw=Ie.p`
  margin: 0;
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
  line-height: 1.2;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`,Hw=Ie.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 400;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    font-size: 0.75rem;
  }
`,qw=Ie.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`,Ww=Ie.span`
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.7rem;
`,Yw=Ie.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  letter-spacing: 0.01em;
`,Xw=Ie.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.1rem;
  overflow: hidden;
  max-height: 3.5rem;

  @media (max-width: 768px) {
    max-height: 2rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`,Kw=Ie.span`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.22rem 0.55rem;
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 500;
  font-family: inherit;
  letter-spacing: 0.01em;
`,Gw=Ie.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${e=>{let{$side:t}=e;return"left"===t?"left: 12px;":"right: 12px;"}}

  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 12, 22, 0.75);
  backdrop-filter: blur(14px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  &:hover {
    background: rgba(14, 165, 233, 0.35);
    border-color: rgba(14, 165, 233, 0.65);
    box-shadow: 0 0 24px rgba(14, 165, 233, 0.35);
    transform: translateY(-50%);
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${e=>{let{$side:t}=e;return"left"===t?"left: 8px;":"right: 8px;"}}
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    ${e=>{let{$side:t}=e;return"left"===t?"left: 6px;":"right: 6px;"}}
  }
`,Jw=Ie.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,Qw=Ie.button`
  height: 8px;
  width: ${e=>{let{$active:t}=e;return t?"28px":"8px"}};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${e=>{let{$active:t}=e;return t?"linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))":"rgba(255,255,255,0.22)"}};
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s ease;
  box-shadow: ${e=>{let{$active:t}=e;return t?"0 0 8px rgba(14, 165, 233, 0.55)":"none"}};

  &:hover {
    background: ${e=>{let{$active:t}=e;return t?"linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))":"rgba(255,255,255,0.45)"}};
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }
`,Zw=Ie.p`
  margin: 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.05em;
  font-weight: 500;
`;const ek=()=>{const[t,n]=(0,e.useState)(!1),r=()=>{window.pageYOffset>300?n(!0):n(!1)};return(0,e.useEffect)((()=>(window.addEventListener("scroll",r),()=>window.removeEventListener("scroll",r))),[]),(0,la.jsx)(ok,{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},style:{opacity:t?1:0},children:(0,la.jsx)(Uf,{size:24})})},tk=Ie.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;

  @media (max-width: 480px) {
    padding-top: 70px;
  }
`,nk=Ie.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`,rk=Ie.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 30, 0.75);
    backdrop-filter: blur(1px);
  }
`,ik=Ie.section`
  width: 100%;
  overflow-x: clip;
  padding-bottom: 4rem;
`,ok=Ie.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`,ak=function(){return(0,la.jsxs)(tk,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"Portfolio | Felipe Cantu Jr"}),(0,la.jsx)("meta",{name:"description",content:"A collection of full-stack projects by Felipe Cantu Jr \u2014 React, JavaScript, and Figma."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/portfolio"}),(0,la.jsx)("meta",{property:"og:title",content:"Portfolio | Felipe Cantu Jr"}),(0,la.jsx)("meta",{property:"og:description",content:"A collection of full-stack projects by Felipe Cantu Jr \u2014 React, JavaScript, and Figma."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/portfolio"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsx)(nk,{children:(0,la.jsx)(rk,{})}),(0,la.jsx)(ek,{}),(0,la.jsx)(ik,{children:(0,la.jsx)(xw,{})})]})},sk={_origin:"https://api.emailjs.com"},lk=(e,t,n)=>{if(!e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!n)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";return!0};class ck{constructor(e){this.status=e?e.status:0,this.text=e?e.responseText:"Network Error"}}const uk=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(((r,i)=>{const o=new XMLHttpRequest;o.addEventListener("load",(e=>{let{target:t}=e;const n=new ck(t);200===n.status||"OK"===n.text?r(n):i(n)})),o.addEventListener("error",(e=>{let{target:t}=e;i(new ck(t))})),o.open("POST",sk._origin+e,!0),Object.keys(n).forEach((e=>{o.setRequestHeader(e,n[e])})),o.send(t)}))},dk=(e,t,n,r)=>{const i=r||sk._userID;lk(i,e,t);const o={lib_version:"3.12.1",user_id:i,service_id:e,template_id:t,template_params:n};return uk("/api/v1.0/email/send",JSON.stringify(o),{"Content-type":"application/json"})},fk=(e,t,n,r)=>{const i=r||sk._userID,o=(e=>{let t;if(t="string"===typeof e?document.querySelector(e):e,!t||"FORM"!==t.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of form";return t})(n);lk(i,e,t);const a=new FormData(o);return a.append("lib_version","3.12.1"),a.append("service_id",e),a.append("template_id",t),a.append("user_id",i),uk("/api/v1.0/email/send-form",a)},pk=_e`
    from {
        transform: translateY(-100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`,hk=_e`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`,mk=Ie.div`
    width: 70%;
    height: 100%;
    margin: 100px auto;
    position: relative;
    
    form {
        display: grid;
        width: 100%;
        gap: 15px;
    }
    
    label {
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
    }
    
    input, textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        
        &:focus {
            outline: none;
            border-color: #0077b5;
            box-shadow: 0 0 0 3px rgba(0, 119, 181, 0.1);
        }
    }
    
    input {
        height: 45px;
    }
    
    textarea {
        height: 120px;
        resize: vertical;
        font-family: inherit;
    }
    
    @media (max-width: 1126px) {
        margin: auto;
        height: 100%;
        padding: 40px 20px;
        width: 90%;
    }
`,gk=Ie.button`
    background-color: #3498db;
    color: white;
    padding: 12px 30px;
    cursor: pointer;
    border: 2px solid #3498db;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover:not(:disabled) {
        background-color: transparent;
        color: #3498db;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    @media (max-width: 1126px) {
        z-index: 12;
    }
`,vk=Ie.div`
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    animation: ${pk} 0.5s ease-out;
    z-index: 1000;
    max-width: 400px;
    min-width: 300px;
    
    @media (max-width: 768px) {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
        min-width: auto;
    }
`,yk=Ie(vk)`
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    border-left: 5px solid #2e7d32;
`,bk=Ie(vk)`
    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
    color: white;
    border-left: 5px solid #c62828;
`,xk=Ie.div`
    font-size: 24px;
    font-weight: bold;
    margin-right: 12px;
    animation: ${hk} 2s infinite;
    min-width: 24px;
`,wk=Ie.div`
    flex: 1;
`,kk=Ie.h4`
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
`,jk=Ie.p`
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
`,Sk=Ie.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    margin-left: 12px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
        opacity: 1;
    }
`,Ck=()=>{const t=(0,e.useRef)(),[n,r]=(0,e.useState)(!1),[i,o]=(0,e.useState)(!1),[a,s]=(0,e.useState)(!1);return(0,la.jsxs)(mk,{children:[(0,la.jsxs)("form",{ref:t,onSubmit:async e=>{e.preventDefault(),r(!0),s(!1);try{const e=t.current.elements,n=e.user_name.value,r=e.user_email.value,i=e.message.value;await fk("service_qergbjn","template_purd9i6",t.current,"sfy94T_0JRB3qPReX"),await dk("service_qergbjn","template_u6wlz5m",{to_email:r,to_name:n,from_name:"Felipe Cantu Jr",user_message:i},"sfy94T_0JRB3qPReX"),console.log("Emails sent successfully!"),o(!0),Is("contact_form_submit"),t.current.reset(),setTimeout((()=>o(!1)),5e3)}catch(n){console.error("Failed to send email:",n),s(!0),setTimeout((()=>s(!1)),5e3)}finally{r(!1)}},children:[(0,la.jsx)("label",{children:"Name"}),(0,la.jsx)("input",{type:"text",name:"user_name",required:!0}),(0,la.jsx)("label",{children:"Email"}),(0,la.jsx)("input",{type:"email",name:"user_email",required:!0}),(0,la.jsx)("label",{children:"Message"}),(0,la.jsx)("textarea",{name:"message",required:!0}),(0,la.jsx)(gk,{type:"submit",disabled:n,children:n?"Sending...":"Send Message"})]}),i&&(0,la.jsxs)(yk,{children:[(0,la.jsx)(xk,{children:"\u2713"}),(0,la.jsxs)(wk,{children:[(0,la.jsx)(kk,{children:"Message Sent Successfully!"}),(0,la.jsx)(jk,{children:"Thank you for reaching out. We've received your message and will get back to you soon."})]}),(0,la.jsx)(Sk,{onClick:()=>o(!1),children:"\xd7"})]}),a&&(0,la.jsxs)(bk,{children:[(0,la.jsx)(xk,{children:"\u26a0"}),(0,la.jsxs)(wk,{children:[(0,la.jsx)(kk,{children:"Failed to Send Message"}),(0,la.jsx)(jk,{children:"Sorry, there was an error sending your message. Please try again or contact us directly."})]}),(0,la.jsx)(Sk,{onClick:()=>s(!1),children:"\xd7"})]})]})};const Ek=[{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 288 512"},child:[{tag:"path",attr:{d:"M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z"}}]})(e)},label:"Address",value:"Dallas, TX",href:null},{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"}}]})(e)},label:"Phone",value:"817-999-7951",href:"tel:817-999-7951"},{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}}]})(e)},label:"Email",value:"cantujr.felipe@gmail.com",href:"mailto:cantujr.felipe@gmail.com"}],Tk=[{href:"https://github.com/FelipeCantu",icon:Ma,label:"GitHub",color:"#6e5494"},{href:"https://www.linkedin.com/in/felipe-cantu-jr/",icon:Da,label:"LinkedIn",color:"#0077b5"},{href:"https://www.instagram.com/son_of_robot_/",icon:La,label:"Instagram",color:"#e4405f"},{href:"https://www.facebook.com/profile.php?id=100064306140476",icon:Ia,label:"Facebook",color:"#1877f2"}];const Pk=Ie.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: calc(80px + 1rem); /* Increased space for mobile navbar */

  @media (min-width: 640px) {
    padding: 2rem 1rem;
    padding-top: calc(70px + 2rem); /* Adjusted for tablet */
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    padding-top: calc(60px + 2rem);
  }
`,Ok=Ie.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`,Ak=Ie.div`
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`,zk=Ie.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`,$k=Ie.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`,Rk=Ie.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    border-radius: 20px;
  }
`,_k=Ie.section`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }

  @media (min-width: 1280px) {
    padding: 3rem;
  }
`,Ik=Ie.div`
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`,Mk=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  margin: 0 0 0.45rem;
`,Lk=Ie.p`
  font-size: 0.875rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.65;
  margin: 0 0 0.75rem;
`,Dk=Ie.p`
  margin: 0;
`,Nk=Ie(oa)`
  display: inline-block;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent-light, #38bdf8);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(14, 165, 233, 0.4);
  transition: color 0.2s ease, text-decoration-color 0.2s ease;

  &:hover {
    color: white;
    text-decoration-color: rgba(14, 165, 233, 0.9);
  }
`,Fk=Ie.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`,Vk=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  line-height: 1.1;
`,Uk=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  font-weight: 300;
`,Bk=Ie.div`
  input, textarea, select {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    color: white !important;
    background: rgba(255, 255, 255, 0.07) !important;
    border: 1px solid rgba(255, 255, 255, 0.14) !important;
    border-radius: var(--radius-sm, 6px) !important;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease !important;
    &::placeholder { color: rgba(255, 255, 255, 0.35) !important; }
    &:focus {
      border-color: var(--color-accent, #0ea5e9) !important;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18) !important;
      background: rgba(255, 255, 255, 0.10) !important;
      outline: none !important;
    }
  }
  label {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    color: rgba(255, 255, 255, 0.82) !important;
    font-weight: 500 !important;
    font-size: 0.88rem !important;
    letter-spacing: 0.02em !important;
  }
  button[type="submit"] {
    font-family: var(--font-body, 'DM Sans', system-ui, sans-serif) !important;
    background-color: var(--color-accent, #0ea5e9) !important;
    color: white !important;
    border: 2px solid var(--color-accent, #0ea5e9) !important;
    font-weight: 700 !important;
    letter-spacing: 0.03em !important;
    transition: all 0.25s ease !important;
    border-radius: 9999px !important;
    &:hover:not(:disabled) {
      background-color: transparent !important;
      color: var(--color-accent-light, #38bdf8) !important;
      border-color: var(--color-accent, #0ea5e9) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 16px rgba(14, 165, 233, 0.22) !important;
    }
  }
`,Hk=Ie.section`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }

  @media (min-width: 1280px) {
    padding: 3rem;
  }
`,qk=Ie.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`,Wk=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  position: relative;
  padding-bottom: 1rem;
  line-height: 1.1;
`,Yk=Ie.span`
  position: absolute;
  bottom: 0;
  left: 0;
  /* Unified accent — matches the single blue defined in CSS vars */
  width: 3rem;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8));
  border-radius: 2px;
`,Xk=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  font-weight: 300;
`,Kk=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }
`,Gk=Ie.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md, 12px);
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  /* Shimmer sweep on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent);
    transition: left 0.55s ease;
    pointer-events: none;
  }

  &:hover {
    background: rgba(14, 165, 233, 0.06);
    border-color: rgba(14, 165, 233, 0.25);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }
`,Jk=Ie.a`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-3px);
  }
`,Qk=Ie.div`
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-3px);
  }
`,Zk=Ie.div`
  flex-shrink: 0;
  margin-top: 0.125rem;
  transition: transform 0.3s ease;

  svg {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--color-accent-light, #38bdf8);
    transition: color 0.3s ease;

    @media (min-width: 640px) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  ${Gk}:hover & {
    transform: scale(1.15) rotate(5deg);

    svg {
      color: var(--color-accent, #0ea5e9);
    }
  }
`,ej=Ie.div`
  min-width: 0;
  flex: 1;
`,tj=Ie.h3`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-accent-light, #38bdf8);
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  transition: color 0.3s ease;

  ${Gk}:hover & {
    color: var(--color-accent, #0ea5e9);
  }
`,nj=Ie.p`
  color: white;
  font-size: 0.9rem;
  word-break: break-word;
  margin: 0;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`,rj=Ie.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (min-width: 640px) {
    padding-top: 2rem;
  }
`,ij=Ie.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`,oj=Ie.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  @media (min-width: 640px) {
    gap: 1.25rem;
  }
`,aj=Ie.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${e=>e.$hoverColor||"#3b82f6"};
    transform: scale(0);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: ${e=>e.$hoverColor||"#3b82f6"};
    
    &::before {
      transform: scale(1);
    }
    
    &::after {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`,sj=Ie.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  svg {
    width: 1rem;
    height: 1rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

    @media (min-width: 640px) {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  ${aj}:hover & svg {
    transform: scale(1.2) rotate(5deg);
    color: white;
  }
`,lj=function(){return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"Contact \u2014 Felipe Cantu Jr"}),(0,la.jsx)("meta",{name:"description",content:"Get in touch with Felipe Cantu Jr, Full Stack Web Developer in Dallas, TX. Available for freelance projects, collaborations, and general inquiries."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/contact"}),(0,la.jsx)("meta",{property:"og:title",content:"Contact \u2014 Felipe Cantu Jr"}),(0,la.jsx)("meta",{property:"og:description",content:"Get in touch with Felipe Cantu Jr. Available for freelance projects and collaborations."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/contact"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsxs)(Pk,{children:[(0,la.jsxs)(Ok,{children:[(0,la.jsx)(Ak,{}),(0,la.jsx)(zk,{})]}),(0,la.jsx)($k,{children:(0,la.jsxs)(Rk,{children:[(0,la.jsxs)(_k,{children:[(0,la.jsxs)(Fk,{children:[(0,la.jsx)(Vk,{children:"Say Hello"}),(0,la.jsx)(Uk,{children:"Have a question or just want to connect? Send me a message and I'll get back to you soon."}),(0,la.jsxs)(Ik,{children:[(0,la.jsx)(Mk,{children:"Let's Collaborate"}),(0,la.jsx)(Lk,{children:"Open to working with other developers\u2014if you're building something interesting, I'd love to hear about it."}),(0,la.jsx)(Dk,{children:(0,la.jsxs)(Nk,{to:"/get-started",onClick:()=>Is("cta_click",{label:"start_project_contact"}),children:["Start a project ",(0,la.jsx)(Fa,{style:{display:"inline",verticalAlign:"middle",fontSize:"0.8em"}})]})})]})]}),(0,la.jsx)(Bk,{children:(0,la.jsx)(Ck,{})})]}),(0,la.jsxs)(Hk,{children:[(0,la.jsxs)(qk,{children:[(0,la.jsxs)(Wk,{children:["Find Me Here",(0,la.jsx)(Yk,{})]}),(0,la.jsx)(Xk,{children:"Prefer a direct line? Here's where you can reach me."})]}),(0,la.jsx)(Kk,{children:Ek.map(((e,t)=>{const n=e.icon,r=(0,la.jsxs)(Gk,{children:[(0,la.jsx)(Zk,{children:(0,la.jsx)(n,{})}),(0,la.jsxs)(ej,{children:[(0,la.jsx)(tj,{children:e.label}),(0,la.jsx)(nj,{children:e.value})]})]});return e.href?(0,la.jsx)(Jk,{href:e.href,"aria-label":`${e.label}: ${e.value}`,children:r},t):(0,la.jsx)(Qk,{children:r},t)}))}),(0,la.jsxs)(rj,{children:[(0,la.jsx)(ij,{children:"Connect With Me"}),(0,la.jsx)(oj,{children:Tk.map(((e,t)=>(0,la.jsx)(aj,{href:e.href,target:"_blank",rel:"noopener noreferrer","aria-label":e.label,$hoverColor:e.color,children:(0,la.jsx)(sj,{children:(0,la.jsx)(e.icon,{})})},t)))})]})]})]})})]})]})},cj=[{id:"web-app",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"}}]})(e)},label:"Web Application",sub:"Full-stack web platform"},{id:"website",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"}}]})(e)},label:"Website / Landing Page",sub:"Marketing or portfolio site"},{id:"mobile",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"}}]})(e)},label:"Mobile App",sub:"iOS / Android application"},{id:"ecommerce",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"}}]})(e)},label:"E-Commerce",sub:"Online store or marketplace"},{id:"design",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M167.02 309.34c-40.12 2.58-76.53 17.86-97.19 72.3-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.11-.65-6.08-.97-9.13l-88.01-73.34zM457.89 0c-15.16 0-29.37 6.71-40.21 16.45C213.27 199.05 192 203.34 192 257.09c0 13.7 3.25 26.76 8.73 38.7l63.82 53.18c7.21 1.8 14.64 3.03 22.39 3.03 62.11 0 98.11-45.47 211.16-256.46 7.38-14.35 13.9-29.85 13.9-45.99C512 20.64 486 0 457.89 0z"}}]})(e)},label:"UI/UX Design",sub:"Design system or prototype"},{id:"other",icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"}}]})(e)},label:"Something Else",sub:"Let's talk about it"}],uj=["Under $1,000","$1k\u2013$5k","$5k\u2013$15k","$15k+","Let's Discuss"],dj=["ASAP","1\u20133 Months","3\u20136 Months","6+ Months","Flexible"],fj=["User Authentication","Admin Dashboard","Payment Integration","API Integration","Real-time Features","Database Design","Mobile Responsive","SEO Optimization","CMS Integration","Analytics","Email Notifications","3rd-Party Integrations"],pj=["Mon","Tue","Wed","Thu","Fri"],hj=["Morning (9am\u201312pm)","Afternoon (12pm\u20135pm)","Evening (5pm\u20138pm)"],mj=["About You","Project Type","Scope","Requirements","Schedule"],gj={enter:e=>({x:e>0?50:-50,opacity:0}),center:{x:0,opacity:1,transition:{type:"spring",stiffness:300,damping:30}},exit:e=>({x:e>0?-50:50,opacity:0,transition:{duration:.18}})};function vj(e){const t=e.features.length?e.features.join(", "):"None selected",n=e.preferredDays.length?e.preferredDays.join(", "):"No preference";return`\nCLIENT INTAKE SUMMARY\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nABOUT\nName:     ${e.name}\nEmail:    ${e.email}\nCompany:  ${e.company||"\u2014"}\n\nPROJECT\nType:     ${e.projectType}\n\nSCOPE\nDescription:\n${e.description}\n\nBudget:   ${e.budget}\nTimeline: ${e.timeline}\n\nREQUIREMENTS\nFeatures: ${t}\nTech Notes:\n${e.techNotes||"\u2014"}\n\nSCHEDULING\nPreferred Days: ${n}\nPreferred Time: ${e.preferredTime||"No preference"}\nAdditional Notes:\n${e.additionalNotes||"\u2014"}\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  `.trim()}function yj(e,t){return 1===e?""!==t.name.trim()&&""!==t.email.trim():2===e?""!==t.projectType:3!==e||""!==t.description.trim()&&""!==t.budget&&""!==t.timeline}function bj(t){let{step:n}=t;return(0,la.jsx)(Oj,{role:"list","aria-label":"Wizard progress",children:mj.map(((t,r)=>{const i=r+1,o=i<n,a=i===n;return(0,la.jsxs)(e.Fragment,{children:[r>0&&(0,la.jsx)($j,{$filled:o,"aria-hidden":"true"}),(0,la.jsxs)(Aj,{role:"listitem","aria-current":a?"step":void 0,children:[(0,la.jsx)(zj,{$completed:o,$active:a,"aria-hidden":"true",children:o?(0,la.jsx)(Ua,{size:10}):i}),(0,la.jsx)(Rj,{$active:a,$completed:o,children:t})]})]},i)}))})}function xj(e){let{data:t,set:n}=e;return(0,la.jsxs)(Ij,{children:[(0,la.jsx)(Mj,{children:"About You"}),(0,la.jsx)(Lj,{children:"Let's start with some basic information."}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-name",children:["Full Name ",(0,la.jsx)(Fj,{children:"*"})]}),(0,la.jsx)(Bj,{id:"wizard-name",type:"text",placeholder:"e.g. Jane Smith",value:t.name,onChange:e=>n("name",e.target.value),autoComplete:"name",required:!0})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-email",children:["Email Address ",(0,la.jsx)(Fj,{children:"*"})]}),(0,la.jsx)(Bj,{id:"wizard-email",type:"email",placeholder:"e.g. jane@company.com",value:t.email,onChange:e=>n("email",e.target.value),autoComplete:"email",required:!0})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-company",children:["Company / Organization ",(0,la.jsx)(Vj,{children:"(optional)"})]}),(0,la.jsx)(Bj,{id:"wizard-company",type:"text",placeholder:"e.g. Acme Inc.",value:t.company,onChange:e=>n("company",e.target.value),autoComplete:"organization"})]})]})}function wj(e){let{data:t,set:n}=e;return(0,la.jsxs)(Ij,{children:[(0,la.jsx)(Mj,{children:"What Are You Building?"}),(0,la.jsx)(Lj,{children:"Select the option that best describes your project."}),(0,la.jsx)(qj,{role:"radiogroup","aria-label":"Project type",children:cj.map((e=>{let{id:r,icon:i,label:o,sub:a}=e;const s=t.projectType===r;return(0,la.jsxs)(Wj,{$selected:s,onClick:()=>n("projectType",r),role:"radio","aria-checked":s,tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n("projectType",r))},children:[(0,la.jsx)(Yj,{$selected:s,children:(0,la.jsx)(i,{})}),(0,la.jsx)(Xj,{children:o}),(0,la.jsx)(Kj,{children:a})]},r)}))})]})}function kj(e){let{data:t,set:n}=e;return(0,la.jsxs)(Ij,{children:[(0,la.jsx)(Mj,{children:"Project Scope"}),(0,la.jsx)(Lj,{children:"Help me understand what you need built."}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-desc",children:["Project Description ",(0,la.jsx)(Fj,{children:"*"})]}),(0,la.jsx)(Hj,{id:"wizard-desc",rows:4,placeholder:"Describe what you want to build, who it's for, and what problem it solves\u2026",value:t.description,onChange:e=>n("description",e.target.value),required:!0})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{children:["Budget Range ",(0,la.jsx)(Fj,{children:"*"})]}),(0,la.jsx)(Gj,{role:"radiogroup","aria-label":"Budget range",children:uj.map((e=>(0,la.jsx)(Jj,{$active:t.budget===e,onClick:()=>n("budget",e),role:"radio","aria-checked":t.budget===e,tabIndex:0,onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),n("budget",e))},children:e},e)))})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{children:["Timeline ",(0,la.jsx)(Fj,{children:"*"})]}),(0,la.jsx)(Gj,{role:"radiogroup","aria-label":"Timeline",children:dj.map((e=>(0,la.jsx)(Jj,{$active:t.timeline===e,onClick:()=>n("timeline",e),role:"radio","aria-checked":t.timeline===e,tabIndex:0,onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),n("timeline",e))},children:e},e)))})]})]})}function jj(e){let{data:t,set:n,toggleArrayItem:r}=e;return(0,la.jsxs)(Ij,{children:[(0,la.jsx)(Mj,{children:"Key Requirements"}),(0,la.jsx)(Lj,{children:"Select every feature or capability your project needs."}),(0,la.jsxs)(Dj,{children:[(0,la.jsx)(Nj,{children:"Features & Capabilities"}),(0,la.jsx)(Qj,{role:"group","aria-label":"Feature selection",children:fj.map((e=>{const n=t.features.includes(e);return(0,la.jsxs)(Zj,{$active:n,onClick:()=>r("features",e),role:"checkbox","aria-checked":n,tabIndex:0,onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),r("features",e))},children:[n&&(0,la.jsx)(Ua,{size:9,style:{flexShrink:0}}),e]},e)}))})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-tech",children:["Technical Notes ",(0,la.jsx)(Vj,{children:"(optional)"})]}),(0,la.jsx)(Hj,{id:"wizard-tech",rows:3,placeholder:"Preferred stack, existing systems to integrate with, specific constraints\u2026",value:t.techNotes,onChange:e=>n("techNotes",e.target.value)})]})]})}function Sj(e){let{data:t,set:n,toggleArrayItem:r}=e;return(0,la.jsxs)(Ij,{children:[(0,la.jsx)(Mj,{children:"Schedule a Call"}),(0,la.jsx)(Lj,{children:"Tell me when you're generally available and I'll reach out to confirm."}),(0,la.jsxs)(Dj,{children:[(0,la.jsx)(Nj,{children:"Preferred Days"}),(0,la.jsx)(Gj,{role:"group","aria-label":"Preferred days",children:pj.map((e=>{const n=t.preferredDays.includes(e);return(0,la.jsx)(Jj,{$active:n,onClick:()=>r("preferredDays",e),role:"checkbox","aria-checked":n,tabIndex:0,onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),r("preferredDays",e))},children:e},e)}))})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsx)(Nj,{children:"Preferred Time"}),(0,la.jsx)(Gj,{role:"radiogroup","aria-label":"Preferred time of day",children:hj.map((e=>(0,la.jsx)(Jj,{$active:t.preferredTime===e,onClick:()=>n("preferredTime",t.preferredTime===e?"":e),role:"radio","aria-checked":t.preferredTime===e,tabIndex:0,onKeyDown:r=>{"Enter"!==r.key&&" "!==r.key||(r.preventDefault(),n("preferredTime",t.preferredTime===e?"":e))},children:e},e)))})]}),(0,la.jsxs)(Dj,{children:[(0,la.jsxs)(Nj,{htmlFor:"wizard-notes",children:["Anything else? ",(0,la.jsx)(Vj,{children:"(optional)"})]}),(0,la.jsx)(Hj,{id:"wizard-notes",rows:3,placeholder:"Specific questions, context, or anything I should know before our call\u2026",value:t.additionalNotes,onChange:e=>n("additionalNotes",e.target.value)})]})]})}function Cj(e){let{firstName:t}=e;return(0,la.jsxs)(sS,{as:hw.div,initial:{opacity:0,scale:.94},animate:{opacity:1,scale:1},transition:{type:"spring",stiffness:260,damping:24},children:[(0,la.jsx)(lS,{children:(0,la.jsx)(Va,{size:52})}),(0,la.jsxs)(cS,{children:["You're all set, ",t,"!"]}),(0,la.jsxs)(uS,{children:["Your intake form has been received. I'll review your project details and follow up within ",(0,la.jsx)("strong",{children:"24 hours"})," to confirm a time that works for both of us."]}),(0,la.jsx)(dS,{children:"Check your inbox \u2014 a confirmation copy has been sent to you."})]})}const Ej=_e`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`,Tj=_e`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.05); }
`,Pj=Ie.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
`,Oj=Ie.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 1.5rem 1.75rem;
  gap: 0;
`,Aj=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
  padding: 4px;
`,zj=Ie.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${e=>{let{$completed:t}=e;return t&&ye`
      background: #3498db;
      color: white;
      border: none;
    `}}

  ${e=>{let{$active:t}=e;return t&&ye`
      background: #3498db;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      box-shadow: inset 0 0 0 2px #3498db;
    `}}

  ${e=>{let{$completed:t,$active:n}=e;return!t&&!n&&ye`
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.12);
    `}}
`,$j=Ie.div`
  height: 2px;
  flex: 1;
  min-width: 20px;
  max-width: 60px;
  margin-top: 15px;
  background: ${e=>{let{$filled:t}=e;return t?"#3498db":"rgba(255, 255, 255, 0.1)"}};
  transition: background 0.4s ease;
  transform-origin: left;

  @media (min-width: 480px) {
    min-width: 32px;
    max-width: 80px;
  }
`,Rj=Ie.span`
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-align: center;
  white-space: nowrap;
  transition: color 0.3s ease;

  color: ${e=>{let{$active:t,$completed:n}=e;return t?"#3498db":n?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.3)"}};

  @media (max-width: 479px) {
    display: none;
  }

  @media (min-width: 480px) {
    font-size: 0.65rem;
  }
`,_j=Ie.div`
  padding: 0 0 0.5rem;
`,Ij=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`,Mj=Ie.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.25;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`,Lj=Ie.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  margin: -0.75rem 0 0;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.9rem;
  }
`,Dj=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,Nj=Ie.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.03em;
  text-transform: uppercase;
`,Fj=Ie.span`
  color: #e74c3c;
  margin-left: 2px;
`,Vj=Ie.span`
  font-weight: 400;
  text-transform: none;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.75rem;
  margin-left: 4px;
`,Uj=ye`
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.28);
  }

  &:focus {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.08);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.18);
  }
`,Bj=Ie.input`
  ${Uj}
  padding: 0.65rem 0.875rem;
  height: 44px;
`,Hj=Ie.textarea`
  ${Uj}
  padding: 0.7rem 0.875rem;
  resize: vertical;
  line-height: 1.55;
  min-height: 80px;
`,qj=Ie.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  /* Padding gives TypeCard's translateY(-2px) hover room to paint beyond the
     grid boundary. The negative margin cancels the layout-space the padding
     would otherwise add, keeping alignment with surrounding content. */
  overflow: visible;
  padding: 4px;
  margin: -4px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`,Wj=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  border-radius: 10px;
  border: 1.5px solid
    ${e=>{let{$selected:t}=e;return t?"#3498db":"rgba(255, 255, 255, 0.08)"}};
  background: ${e=>{let{$selected:t}=e;return t?"rgba(52, 152, 219, 0.12)":"rgba(255, 255, 255, 0.04)"}};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: ${e=>{let{$selected:t}=e;return t?"#3498db":"rgba(255, 255, 255, 0.2)"}};
    background: ${e=>{let{$selected:t}=e;return t?"rgba(52, 152, 219, 0.15)":"rgba(255, 255, 255, 0.07)"}};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`,Yj=Ie.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background: ${e=>{let{$selected:t}=e;return t?"linear-gradient(135deg, rgba(52,152,219,0.3), rgba(155,89,182,0.3))":"rgba(255,255,255,0.07)"}};
  color: ${e=>{let{$selected:t}=e;return t?"#3498db":"rgba(255,255,255,0.55)"}};
  transition: all 0.2s ease;

  ${Wj}:hover & {
    color: ${e=>{let{$selected:t}=e;return t?"#3498db":"rgba(255,255,255,0.8)"}};
  }
`,Xj=Ie.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
`,Kj=Ie.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.3;
`,Gj=Ie.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,Jj=Ie.div`
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1.5px solid
    ${e=>{let{$active:t}=e;return t?"#3498db":"rgba(255, 255, 255, 0.12)"}};
  background: ${e=>{let{$active:t}=e;return t?"rgba(52, 152, 219, 0.2)":"rgba(255, 255, 255, 0.05)"}};
  color: ${e=>{let{$active:t}=e;return t?"#5dade2":"rgba(255,255,255,0.65)"}};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${e=>{let{$active:t}=e;return t?"#3498db":"rgba(255,255,255,0.25)"}};
    background: ${e=>{let{$active:t}=e;return t?"rgba(52,152,219,0.28)":"rgba(255,255,255,0.09)"}};
    color: ${e=>{let{$active:t}=e;return t?"#5dade2":"rgba(255,255,255,0.85)"}};
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`,Qj=Ie.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,Zj=Ie.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1.5px solid
    ${e=>{let{$active:t}=e;return t?"rgba(52,152,219,0.6)":"rgba(255,255,255,0.1)"}};
  background: ${e=>{let{$active:t}=e;return t?"rgba(52, 152, 219, 0.15)":"rgba(255, 255, 255, 0.04)"}};
  color: ${e=>{let{$active:t}=e;return t?"#5dade2":"rgba(255,255,255,0.6)"}};
  transition: all 0.18s ease;

  &:hover {
    border-color: ${e=>{let{$active:t}=e;return t?"rgba(52,152,219,0.8)":"rgba(255,255,255,0.22)"}};
    background: ${e=>{let{$active:t}=e;return t?"rgba(52,152,219,0.22)":"rgba(255,255,255,0.08)"}};
    color: ${e=>{let{$active:t}=e;return t?"#5dade2":"rgba(255,255,255,0.85)"}};
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`,eS=Ie.div`
  margin: 0.5rem 0;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  background: rgba(231, 76, 60, 0.15);
  border: 1px solid rgba(231, 76, 60, 0.35);
  color: #e74c3c;
  font-size: 0.83rem;
  line-height: 1.45;
`,tS=Ie.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 0.75rem;
`,nS=ye`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  user-select: none;
  min-height: 42px;

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }
`,rS=Ie.button`
  ${nS}
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.06);
    color: white;
  }
`,iS=Ie.button`
  ${nS}
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  margin-left: auto;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2eaadc, #2471a3);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.38);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`,oS=Ie.button`
  ${nS}
  background: #3498db;
  color: white;
  border: 2px solid #3498db;
  margin-left: auto;
  padding: 0.625rem 1.5rem;
  border-radius: 30px;

  &:hover:not(:disabled) {
    background: transparent;
    color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`,aS=Ie.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${Ej} 0.7s linear infinite;
  flex-shrink: 0;
`,sS=Ie.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  gap: 1.25rem;

  @media (min-width: 640px) {
    padding: 3.5rem 2rem;
  }
`,lS=Ie.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(52,152,219,0.25), rgba(155,89,182,0.25));
  border: 1.5px solid rgba(52, 152, 219, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  animation: ${Tj} 2.5s ease-in-out infinite;
  flex-shrink: 0;
`,cS=Ie.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 1.9rem;
  }
`,uS=Ie.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.65;
  margin: 0;
  max-width: 420px;

  strong {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }
`,dS=Ie.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
  line-height: 1.5;
`,fS=function(){const[t,n]=(0,e.useState)(1),[r,i]=(0,e.useState)(1),[o,a]=(0,e.useState)(!1),[s,l]=(0,e.useState)(!1),[c,u]=(0,e.useState)(""),[d,f]=(0,e.useState)({name:"",email:"",company:"",projectType:"",description:"",budget:"",timeline:"",features:[],techNotes:"",preferredDays:[],preferredTime:"",additionalNotes:""}),p=(e,t)=>f((n=>({...n,[e]:t}))),h=(e,t)=>{f((n=>{const r=n[e];return{...n,[e]:r.includes(t)?r.filter((e=>e!==t)):[...r,t]}}))},m=d.name.trim().split(" ")[0]||"there";return o?(0,la.jsx)(Cj,{firstName:m}):(0,la.jsxs)(Pj,{children:[(0,la.jsx)(bj,{step:t}),(0,la.jsx)(_j,{children:(0,la.jsx)(vh,{custom:r,mode:"wait",children:(0,la.jsxs)(hw.div,{custom:r,variants:gj,initial:"enter",animate:"center",exit:"exit",style:{width:"100%"},children:[1===t&&(0,la.jsx)(xj,{data:d,set:p}),2===t&&(0,la.jsx)(wj,{data:d,set:p}),3===t&&(0,la.jsx)(kj,{data:d,set:p,toggleArrayItem:h}),4===t&&(0,la.jsx)(jj,{data:d,set:p,toggleArrayItem:h}),5===t&&(0,la.jsx)(Sj,{data:d,set:p,toggleArrayItem:h})]},t)})}),c&&(0,la.jsx)(eS,{children:c}),(0,la.jsxs)(tS,{children:[(0,la.jsxs)(rS,{onClick:()=>{i(-1),n((e=>e-1))},disabled:1===t,"aria-label":"Go back",children:[(0,la.jsx)(Na,{}),"Back"]}),t<5?(0,la.jsxs)(iS,{onClick:()=>{yj(t,d)&&(i(1),n((e=>e+1)))},disabled:!yj(t,d),"aria-label":"Continue to next step",children:["Next",(0,la.jsx)(Fa,{})]}):(0,la.jsx)(oS,{onClick:async()=>{l(!0),u("");try{await dk("service_qergbjn","template_purd9i6",{user_name:d.name,user_email:d.email,message:vj(d)},"sfy94T_0JRB3qPReX"),a(!0),Is("get_started_submit",{project_type:d.projectType})}catch(e){console.error("EmailJS error:",e),u("Something went wrong. Please try again or email me directly.")}finally{l(!1)}},disabled:s,"aria-label":"Submit and book a call",children:s?(0,la.jsxs)(la.Fragment,{children:[(0,la.jsx)(aS,{}),"Sending\u2026"]}):(0,la.jsxs)(la.Fragment,{children:["Book a Call",(0,la.jsx)(Ua,{})]})})]})]})};const pS=Ie.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  padding-top: calc(80px + 1rem);

  @media (min-width: 640px) {
    padding: 2rem 1rem;
    padding-top: calc(70px + 2rem);
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    padding-top: calc(60px + 2rem);
  }
`,hS=Ie.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`,mS=Ie.div`
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`,gS=Ie.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`,vS=Ie.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,yS=Ie.div`
  text-align: center;
`,bS=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light, #38bdf8);
  margin: 0 0 0.75rem;
`,xS=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(2rem, 4.5vw, 2.85rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  margin: 0 0 0.75rem;
  line-height: 1.1;
`,wS=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.60);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  margin: 0 auto;
  max-width: 500px;
`,kS=Ie.div`
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(20px);
    z-index: -1;
    pointer-events: none;
  }

  @media (min-width: 640px) {
    padding: 2.5rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`,jS=function(){return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"Start a Project \u2014 Felipe Cantu Jr"}),(0,la.jsx)("meta",{name:"description",content:"Ready to build something? Tell me about your project and schedule a free discovery call with Felipe Cantu Jr, Full Stack Web Developer in Dallas, TX."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/get-started"}),(0,la.jsx)("meta",{property:"og:title",content:"Start a Project \u2014 Felipe Cantu Jr"}),(0,la.jsx)("meta",{property:"og:description",content:"Ready to build something? Tell me about your project and schedule a free discovery call."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/get-started"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsxs)(pS,{children:[(0,la.jsxs)(hS,{children:[(0,la.jsx)(mS,{}),(0,la.jsx)(gS,{})]}),(0,la.jsxs)(vS,{children:[(0,la.jsxs)(yS,{children:[(0,la.jsx)(bS,{children:"Let's Build Something"}),(0,la.jsx)(xS,{children:"Start Your Project"}),(0,la.jsx)(wS,{children:"Answer a few quick questions and I'll reach out within 24 hours to schedule a discovery call."})]}),(0,la.jsx)(kS,{children:(0,la.jsx)(fS,{})})]})]})]})};var SS=n(760),CS=n.n(SS);const ES=Fp()(Nf);function TS(e){return ES.image(e)}const PS={types:{block:e=>{const{style:t="normal"}=e.node;return"h1"===t?(0,la.jsx)(ZS,{children:e.children}):"h2"===t?(0,la.jsx)(eC,{children:e.children}):"h3"===t?(0,la.jsx)(tC,{children:e.children}):"h4"===t?(0,la.jsx)(nC,{children:e.children}):"blockquote"===t?(0,la.jsx)(iC,{children:e.children}):(0,la.jsx)(rC,{children:e.children})},image:e=>{let{node:t}=e;return(0,la.jsxs)(hC,{children:[(0,la.jsx)("img",{src:TS(t.asset).url(),alt:t.alt||"Article image",className:"block-content-image"}),t.caption&&(0,la.jsx)("p",{className:"block-content-caption",children:t.caption})]})}},marks:{strong:e=>(0,la.jsx)(oC,{children:e.children}),em:e=>(0,la.jsx)(aC,{children:e.children}),underline:e=>(0,la.jsx)(sC,{children:e.children}),"strike-through":e=>(0,la.jsx)(lC,{children:e.children}),code:e=>(0,la.jsx)(cC,{children:e.children}),link:e=>(0,la.jsx)(uC,{href:e.mark.href,target:"_blank",rel:"noopener noreferrer",children:e.children})},list:e=>{const{type:t}=e;return"bullet"===t?(0,la.jsx)(dC,{children:e.children}):"number"===t?(0,la.jsx)(fC,{children:e.children}):(0,la.jsx)("ul",{children:e.children})},listItem:e=>(0,la.jsx)(pC,{children:e.children})};function OS(){var t,n,r,i;const[o,a]=(0,e.useState)(null),[s,l]=(0,e.useState)(!0),{slug:c}=Qo();return(0,e.useEffect)((()=>{l(!0),Nf.fetch(`*[slug.current == "${c}"]{\n          title,\n          _id,\n          slug,\n          excerpt,\n          publishedAt,\n          _createdAt,\n          mainImage{\n              asset->{\n                  _id,\n                  url\n              },\n              alt\n          },\n          body,\n          "name": author->name,\n          "authorImage": author->image\n      }`).then((e=>{if(e&&e[0]){var t,n;const r=e[0],i=r.body?r.body.reduce(((e,t)=>{if("block"===t._type&&t.children){return e+t.children.filter((e=>"span"===e._type)).map((e=>e.text)).join("").split(" ").length}return e}),0):0;r.estimatedReadingTime=Math.max(1,Math.round(i/200)),r.displayDate=r.publishedAt||r._createdAt;const o=null===(t=r.body)||void 0===t?void 0:t.find((e=>"block"===e._type&&e.children)),s=(null===o||void 0===o||null===(n=o.children)||void 0===n?void 0:n.filter((e=>"span"===e._type)).map((e=>e.text)).join(""))||"";r.metaDescription=r.excerpt||(s?s.slice(0,155):`Read "${r.title}" \u2014 an article about web development by Felipe Cantu Jr.`),a(r)}l(!1)})).catch((e=>{console.error("Error fetching post:",e),l(!1)}))}),[c]),s?(0,la.jsxs)(RS,{children:[(0,la.jsx)(IS,{children:(0,la.jsx)(MS,{})}),(0,la.jsxs)(mC,{children:[(0,la.jsx)(gC,{}),(0,la.jsx)(vC,{children:"Loading article..."})]})]}):o?(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsxs)("title",{children:[o.title," | Felipe Cantu Jr"]}),(0,la.jsx)("meta",{name:"description",content:o.metaDescription}),(0,la.jsx)("link",{rel:"canonical",href:`https://felipecantujr.com/post/${c}`}),(0,la.jsx)("meta",{property:"og:title",content:`${o.title} | Felipe Cantu Jr`}),(0,la.jsx)("meta",{property:"og:description",content:o.metaDescription}),(0,la.jsx)("meta",{property:"og:url",content:`https://felipecantujr.com/post/${c}`}),(0,la.jsx)("meta",{property:"og:type",content:"article"}),(null===(t=o.mainImage)||void 0===t||null===(n=t.asset)||void 0===n?void 0:n.url)&&(0,la.jsx)("meta",{property:"og:image",content:o.mainImage.asset.url}),(0,la.jsx)("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:o.title,description:o.metaDescription,url:`https://felipecantujr.com/post/${c}`,author:{"@type":"Person",name:"Felipe Cantu Jr",url:"https://felipecantujr.com"},publisher:{"@type":"Person",name:"Felipe Cantu Jr",url:"https://felipecantujr.com"},...(null===(r=o.mainImage)||void 0===r||null===(i=r.asset)||void 0===i?void 0:i.url)&&{image:o.mainImage.asset.url},...o.displayDate&&{datePublished:o.displayDate}})})]}),(0,la.jsxs)($S,{children:[(0,la.jsx)(IS,{children:(0,la.jsx)(MS,{})}),(0,la.jsxs)(LS,{children:[(0,la.jsxs)(DS,{to:"/blog",children:[(0,la.jsx)(Ff,{}),(0,la.jsx)("span",{children:"Back to Blog"})]}),(0,la.jsxs)(NS,{children:[(0,la.jsxs)(FS,{children:[o.mainImage&&(0,la.jsxs)(VS,{children:[(0,la.jsx)("img",{src:o.mainImage.asset.url,alt:o.mainImage.alt||o.title}),(0,la.jsx)(US,{})]}),(0,la.jsxs)(BS,{$hasImage:!!o.mainImage,children:[(0,la.jsx)(HS,{children:o.authorImage&&o.name&&(0,la.jsxs)(qS,{children:[(0,la.jsx)(WS,{children:(0,la.jsx)("img",{src:TS(o.authorImage).url(),alt:o.name})}),(0,la.jsxs)(YS,{children:[(0,la.jsx)(XS,{children:o.name}),(0,la.jsxs)(KS,{children:[(0,la.jsxs)(GS,{children:[(0,la.jsx)(Bf,{size:14}),(0,la.jsx)("span",{children:new Date(o.displayDate).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})})]}),(0,la.jsxs)(GS,{children:[(0,la.jsx)(Wf,{size:14}),(0,la.jsxs)("span",{children:[o.estimatedReadingTime," min read"]})]})]})]})]})}),(0,la.jsx)(JS,{children:o.title})]})]}),(0,la.jsx)(QS,{children:(0,la.jsx)(CS(),{blocks:o.body,projectId:"r99w5jgb",dataset:"production",serializers:PS})})]})]})]})]}):(0,la.jsxs)(_S,{children:[(0,la.jsx)(IS,{children:(0,la.jsx)(MS,{})}),(0,la.jsxs)(yC,{children:[(0,la.jsx)(bC,{children:"\ud83d\udcc4"}),(0,la.jsx)(xC,{children:"Article Not Found"}),(0,la.jsx)(wC,{children:"The article you're looking for doesn't exist or has been moved."}),(0,la.jsxs)(DS,{to:"/blog",children:[(0,la.jsx)(Ff,{}),(0,la.jsx)("span",{children:"Back to Blog"})]})]})]})}const AS=_e`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,zS=_e`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,$S=(_e`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`,Ie.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  z-index: 1;
`),RS=Ie($S)`
  display: flex;
  align-items: center;
  justify-content: center;
`,_S=Ie($S)`
  display: flex;
  align-items: center;
  justify-content: center;
`,IS=Ie.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`,MS=Ie.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 30, 0.75);
    backdrop-filter: blur(1px);
  }
`,LS=Ie.div`
  position: relative;
  z-index: 10;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`,DS=Ie(oa)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }
`,NS=Ie.article`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  animation: ${AS} 0.8s ease-out;
  margin-bottom: 2rem;
`,FS=Ie.header`
  position: relative;
`,VS=Ie.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`,US=Ie.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
`,BS=Ie.div`
  padding: ${e=>e.$hasImage?"2rem":"3rem 2rem 2rem"};
  
  @media (max-width: 768px) {
    padding: ${e=>e.$hasImage?"1.5rem":"2rem 1.5rem 1.5rem"};
  }
`,HS=Ie.div`
  margin-bottom: 1.5rem;
`,qS=Ie.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`,WS=Ie.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,YS=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,XS=Ie.h3`
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`,KS=Ie.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`,GS=Ie.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #6b7280;
  font-size: 0.9rem;
  
  svg {
    color: #667eea;
  }
`,JS=Ie.h1`
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`,QS=Ie.div`
  padding: 0 2rem 3rem;
  color: #374151;
  line-height: 1.8;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem;
    font-size: 1rem;
  }
`,ZS=Ie.h1`
  color: #1f2937;
  font-weight: 800;
  font-size: 2.25rem;
  margin: 2.5rem 0 1.5rem 0;
  line-height: 1.2;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,eC=Ie.h2`
  color: #1f2937;
  font-weight: 700;
  font-size: 1.875rem;
  margin: 2rem 0 1rem 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`,tC=Ie.h3`
  color: #1f2937;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1.75rem 0 1rem 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
`,nC=Ie.h4`
  color: #1f2937;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`,rC=Ie.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  
  &:last-child {
    margin-bottom: 0;
  }
`,iC=Ie.blockquote`
  border-left: 4px solid #667eea;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  font-style: italic;
  color: #4b5563;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(102, 126, 234, 0.02));
  border-radius: 0 12px 12px 0;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #667eea;
    opacity: 0.3;
    font-family: Georgia, serif;
  }
  
  p {
    margin-bottom: 0;
    font-size: 1.125rem;
  }
`,oC=Ie.strong`
  font-weight: 700;
  color: #1f2937;
`,aC=Ie.em`
  font-style: italic;
  color: #4b5563;
`,sC=Ie.span`
  text-decoration: underline;
  text-decoration-color: #667eea;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
`,lC=Ie.span`
  text-decoration: line-through;
  text-decoration-color: #ef4444;
  opacity: 0.7;
`,cC=Ie.code`
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875em;
  color: #667eea;
  border: 1px solid #e5e7eb;
`,uC=Ie.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    color: #5a67d8;
    border-bottom-color: #5a67d8;
    background: rgba(102, 126, 234, 0.05);
    padding: 0 2px;
    border-radius: 3px;
  }
`,dC=Ie.ul`
  margin: 1.5rem 0;
  padding-left: 2rem;
  list-style: none;
  
  li {
    position: relative;
    margin-bottom: 0.75rem;
    line-height: 1.7;
    
    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      position: absolute;
      left: -1.5rem;
      font-size: 1.2em;
    }
  }
`,fC=Ie.ol`
  margin: 1.5rem 0;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.7;
    
    &::marker {
      color: #667eea;
      font-weight: 600;
    }
  }
`,pC=Ie.li`
  margin-bottom: 0.75rem;
  line-height: 1.7;
`,hC=Ie.div`
  text-align: center;
  margin: 2.5rem 0;
  
  img.block-content-image {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  p.block-content-caption {
    font-size: 0.9rem;
    color: #6b7280;
    font-style: italic;
    margin-top: 1rem;
    padding: 0 1rem;
    line-height: 1.5;
  }
`,mC=Ie.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
`,gC=Ie.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${zS} 1s linear infinite;
  margin: 0 auto 1rem;
`,vC=Ie.p`
  font-size: 1.1rem;
  font-weight: 500;
`,yC=Ie.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 2rem;
`,bC=Ie.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`,xC=Ie.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`,wC=Ie.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`,kC=Fp()(Nf);const jC={web:"#3498db",mobile:"#9b59b6",design:"#e67e22",desktop:"#1abc9c"},SC={web:"Web",mobile:"Mobile",design:"Design",desktop:"Desktop App"},CC={inProgress:{bg:"rgba(243, 156, 18, 0.15)",text:"#f39c12",border:"rgba(243, 156, 18, 0.35)",label:"In Progress"},completed:{bg:"rgba(46, 204, 113, 0.15)",text:"#2ecc71",border:"rgba(46, 204, 113, 0.35)",label:"Completed"},archived:{bg:"rgba(149, 165, 166, 0.15)",text:"#95a5a6",border:"rgba(149, 165, 166, 0.35)",label:"Archived"}},EC={types:{block:e=>{const{style:t="normal"}=e.node;return"h1"===t?(0,la.jsx)(cE,{children:e.children}):"h2"===t?(0,la.jsx)(uE,{children:e.children}):"h3"===t?(0,la.jsx)(dE,{children:e.children}):"h4"===t?(0,la.jsx)(fE,{children:e.children}):"blockquote"===t?(0,la.jsx)(hE,{children:e.children}):(0,la.jsx)(pE,{children:e.children})},image:e=>{let{node:t}=e;return(0,la.jsxs)(bE,{children:[(0,la.jsx)("img",{src:(n=t.asset,kC.image(n)).url(),alt:t.alt||"Project image"}),t.caption&&(0,la.jsx)("span",{className:"caption",children:t.caption})]});var n}},marks:{strong:e=>(0,la.jsx)("strong",{children:e.children}),em:e=>(0,la.jsx)("em",{children:e.children}),link:e=>(0,la.jsx)(mE,{href:e.mark.href,target:"_blank",rel:"noopener noreferrer",children:e.children})},list:e=>"bullet"===e.type?(0,la.jsx)(gE,{children:e.children}):(0,la.jsx)(vE,{children:e.children}),listItem:e=>(0,la.jsx)(yE,{children:e.children})};function TC(){var t,n,r,i,o,a,s,l,c,u;const[d,f]=(0,e.useState)(null),[p,h]=(0,e.useState)(!0),[m,g]=(0,e.useState)(null),{slug:v}=Qo();function y(e,t){g({src:e,alt:t}),document.body.style.overflow="hidden"}function b(){g(null),document.body.style.overflow=""}if((0,e.useEffect)((()=>{h(!0),Nf.fetch('*[_type == "project" && slug.current == $slug][0]{\n          title,\n          slug,\n          excerpt,\n          body,\n          projectType,\n          status,\n          featured,\n          date,\n          place,\n          tags,\n          link,\n          githubLink,\n          image {\n            asset->{ _id, url },\n            alt\n          },\n          gallery[] {\n            asset->{ _id, url },\n            alt,\n            caption\n          }\n        }',{slug:v}).then((e=>{f(e||null),h(!1)})).catch((e=>{console.error("Error fetching project:",e),h(!1)}))}),[v]),(0,e.useEffect)((()=>{if(m)return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e);function e(e){"Escape"===e.key&&b()}}),[m]),p)return(0,la.jsxs)(AC,{children:[(0,la.jsx)(zC,{}),(0,la.jsxs)(RC,{children:[(0,la.jsx)(_C,{}),(0,la.jsx)(IC,{children:"Loading project..."})]})]});if(!d)return(0,la.jsxs)(AC,{children:[(0,la.jsx)(zC,{}),(0,la.jsx)(MC,{children:(0,la.jsxs)(LC,{children:[(0,la.jsx)(DC,{"aria-hidden":"true",children:"404"}),(0,la.jsx)(NC,{children:"Project Not Found"}),(0,la.jsx)(FC,{children:"This project doesn't exist or may have been removed."}),(0,la.jsxs)(VC,{to:"/portfolio",children:[(0,la.jsx)(Ff,{"aria-hidden":"true"}),(0,la.jsx)("span",{children:"Back to Portfolio"})]})]})})]});Array.isArray(d.projectType)?d.projectType[0]:d.projectType;const x=CC[d.status]||CC.completed,w=d.githubLink,k=d.date?new Date(d.date+"-01").toLocaleDateString("en-US",{month:"long",year:"numeric"}):null;return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsxs)("title",{children:[d.title," | Felipe Cantu Jr"]}),(0,la.jsx)("meta",{name:"description",content:d.excerpt||`${d.title} \u2014 a ${(Array.isArray(d.projectType)?d.projectType.join("/"):d.projectType)||"web"} project by Felipe Cantu Jr, Full Stack Developer in Dallas, TX.${null!==(t=d.tags)&&void 0!==t&&t.length?` Built with ${d.tags.slice(0,3).join(", ")}.`:""}`}),(0,la.jsx)("link",{rel:"canonical",href:`https://felipecantujr.com/project/${v}`}),(0,la.jsx)("meta",{property:"og:title",content:`${d.title} | Felipe Cantu Jr`}),(0,la.jsx)("meta",{property:"og:description",content:d.excerpt||`${d.title} \u2014 a project by Felipe Cantu Jr.`}),(0,la.jsx)("meta",{property:"og:url",content:`https://felipecantujr.com/project/${v}`}),(0,la.jsx)("meta",{property:"og:type",content:"website"}),(null===(n=d.image)||void 0===n||null===(r=n.asset)||void 0===r?void 0:r.url)&&(0,la.jsx)("meta",{property:"og:image",content:d.image.asset.url}),(0,la.jsx)("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"CreativeWork",name:d.title,description:d.excerpt||`${d.title} \u2014 a project by Felipe Cantu Jr.`,url:`https://felipecantujr.com/project/${v}`,author:{"@type":"Person",name:"Felipe Cantu Jr",url:"https://felipecantujr.com"},...(null===(i=d.image)||void 0===i||null===(o=i.asset)||void 0===o?void 0:o.url)&&{image:d.image.asset.url},...(null===(a=d.tags)||void 0===a?void 0:a.length)&&{keywords:d.tags.join(", ")},...d.date&&{dateCreated:d.date},...d.link&&{sameAs:d.link}})})]}),(0,la.jsxs)(AC,{children:[(0,la.jsx)(zC,{}),(0,la.jsxs)($C,{children:[(0,la.jsxs)(VC,{to:"/portfolio",children:[(0,la.jsx)(Ff,{"aria-hidden":"true"}),(0,la.jsx)("span",{children:"Back to Portfolio"})]}),(0,la.jsxs)(UC,{children:[(null===(s=d.image)||void 0===s||null===(l=s.asset)||void 0===l?void 0:l.url)&&(0,la.jsxs)(BC,{onClick:()=>y(d.image.asset.url,d.image.alt||d.title),style:{cursor:"pointer"},children:[(0,la.jsx)("img",{src:d.image.asset.url,alt:d.image.alt||d.title}),(0,la.jsx)(qC,{}),(0,la.jsx)(HC,{"aria-hidden":"true",children:(0,la.jsx)(Kf,{size:22})})]}),(0,la.jsxs)(YC,{$hasImage:!(null===(c=d.image)||void 0===c||null===(u=c.asset)||void 0===u||!u.url),children:[(0,la.jsx)(WC,{}),(0,la.jsxs)(XC,{children:[Array.isArray(d.projectType)?d.projectType.filter((e=>SC[e])).map(((e,t)=>(0,la.jsx)(KC,{$color:jC[e],children:SC[e]},t))):SC[d.projectType]?(0,la.jsx)(KC,{$color:jC[d.projectType],children:SC[d.projectType]}):null,d.status&&(0,la.jsx)(GC,{$cfg:x,children:x.label}),d.featured&&(0,la.jsx)(JC,{children:"Featured"})]}),(0,la.jsx)(QC,{children:d.title}),d.excerpt&&(0,la.jsx)(ZC,{children:d.excerpt}),(k||d.place)&&(0,la.jsxs)(eE,{children:[k&&(0,la.jsxs)(tE,{children:[(0,la.jsx)(Bf,{size:14,"aria-hidden":"true"}),(0,la.jsx)("span",{children:k})]}),d.place&&(0,la.jsxs)(tE,{children:[(0,la.jsx)(Xf,{size:14,"aria-hidden":"true"}),(0,la.jsx)("span",{children:d.place})]})]}),d.tags&&d.tags.length>0&&(0,la.jsx)(nE,{children:d.tags.map(((e,t)=>(0,la.jsx)(rE,{children:e},t)))}),(w||d.link)&&(0,la.jsxs)(iE,{children:[w&&(0,la.jsxs)(oE,{href:w,target:"_blank",rel:"noopener noreferrer",$variant:"ghost","aria-label":"View source on GitHub",children:[(0,la.jsx)(Ma,{size:16,"aria-hidden":"true"}),(0,la.jsx)("span",{children:"View on GitHub"})]}),d.link&&(0,la.jsxs)(oE,{href:d.link,target:"_blank",rel:"noopener noreferrer",$variant:"primary","aria-label":"Open live demo",children:[(0,la.jsx)(Yf,{size:15,"aria-hidden":"true"}),(0,la.jsx)("span",{children:"Visit Live Site"})]})]})]}),d.body&&d.body.length>0&&(0,la.jsxs)(sE,{children:[(0,la.jsx)(aE,{}),(0,la.jsx)(lE,{children:(0,la.jsx)(CS(),{blocks:d.body,projectId:"pnm3puk3",dataset:"production",serializers:EC})})]}),d.gallery&&d.gallery.length>0&&(0,la.jsxs)(xE,{children:[(0,la.jsx)(aE,{}),(0,la.jsxs)(wE,{children:[(0,la.jsx)(kE,{children:"Gallery"}),(0,la.jsxs)(jE,{children:[d.gallery.length," images"]})]}),(0,la.jsx)(SE,{children:d.gallery.map(((e,t)=>{var n,r;return(0,la.jsxs)(CE,{onClick:()=>{var n;return y(null===(n=e.asset)||void 0===n?void 0:n.url,e.alt||`${d.title} screenshot ${t+1}`)},style:{cursor:"pointer"},children:[(0,la.jsx)("img",{src:null===(r=e.asset)||void 0===r?void 0:r.url,alt:e.alt||`${d.title} screenshot ${t+1}`,loading:"lazy"}),(0,la.jsx)(EE,{"aria-hidden":"true",children:(0,la.jsx)(Kf,{size:28})}),e.caption&&(0,la.jsx)(TE,{children:e.caption})]},(null===(n=e.asset)||void 0===n?void 0:n._id)||t)}))})]})]})]})]}),m&&(0,la.jsx)(PE,{onClick:b,children:(0,la.jsxs)(OE,{onClick:e=>e.stopPropagation(),children:[(0,la.jsx)(AE,{onClick:b,"aria-label":"Close",children:"\u2715"}),(0,la.jsx)(zE,{src:m.src,alt:m.alt})]})})]})}const PC=_e`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,OC=_e`
  to { transform: rotate(360deg); }
`,AC=(_e`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,_e`
  0%   { left: -100%; }
  100% { left: 100%; }
`,Ie.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;

  @media (max-width: 480px) {
    padding-top: 70px;
  }
`),zC=Ie.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("/images/mainbg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(20, 20, 30, 0.78);
    backdrop-filter: blur(1px);
  }
`,$C=Ie.div`
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem 2.5rem;
  }
`,RC=Ie.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  gap: 1.25rem;
`,_C=Ie.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid rgba(52, 152, 219, 0.18);
  border-top-color: #3498db;
  animation: ${OC} 0.85s ease-in-out infinite;
`,IC=Ie.p`
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  margin: 0;
`,MC=Ie.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  padding: 2rem;
`,LC=Ie.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  padding: 3rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 420px;
  width: 100%;
  animation: ${PC} 0.6s ease-out;
`,DC=Ie.span`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`,NC=Ie.h2`
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
`,FC=Ie.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`,VC=Ie(oa)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.75rem;
  padding: 0.55rem 1.2rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 9999px;
  transition: background 0.22s ease, border-color 0.22s ease,
              transform 0.22s ease, color 0.22s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    border-color: rgba(255, 255, 255, 0.20);
    transform: translateX(-4px);
    color: white;
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  svg {
    flex-shrink: 0;
  }
`,UC=Ie.article`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05);
  animation: ${PC} 0.65s ease-out;
`,BC=Ie.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    max-height: 520px;
    object-fit: contain;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.04);
  }
`,HC=Ie.div`
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${BC}:hover & {
    opacity: 1;
  }
`,qC=Ie.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(
    to top,
    rgba(14, 14, 22, 0.85) 0%,
    rgba(14, 14, 22, 0.4) 50%,
    transparent 100%
  );
  pointer-events: none;
`,WC=Ie.div`
  width: 52px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8));
  margin-bottom: 1.25rem;
`,YC=Ie.div`
  padding: ${e=>{let{$hasImage:t}=e;return t?"1.75rem 2.5rem 2rem":"2.5rem 2.5rem 2rem"}};

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem 1.5rem;
  }
`,XC=Ie.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`,KC=Ie.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{$color:t}=e;return t}};
  background: ${e=>{let{$color:t}=e;return t}}1a;
  border: 1px solid ${e=>{let{$color:t}=e;return t}}45;
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`,GC=Ie.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${e=>{let{$cfg:t}=e;return t.text}};
  background: ${e=>{let{$cfg:t}=e;return t.bg}};
  border: 1px solid ${e=>{let{$cfg:t}=e;return t.border}};
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`,JC=Ie.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffd93d;
  background: rgba(255, 217, 61, 0.12);
  border: 1px solid rgba(255, 217, 61, 0.3);
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`,QC=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 0.85rem;
  letter-spacing: -0.025em;
`,ZC=Ie.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0 0 1.25rem;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,eE=Ie.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`,tE=Ie.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.88rem;

  svg {
    color: var(--color-accent-light, #38bdf8);
    flex-shrink: 0;
  }
`,nE=Ie.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.6rem;
`,rE=Ie.span`
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.28rem 0.7rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: rgba(52, 152, 219, 0.12);
    border-color: rgba(52, 152, 219, 0.3);
    color: rgba(255, 255, 255, 0.9);
  }
`,iE=Ie.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.35rem 0.25rem 0.5rem;
`,oE=Ie.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${e=>{let{$variant:t}=e;return"primary"===t?"0.6rem 1.5rem":"0.6rem 1.35rem"}};
  border-radius: 9999px;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease,
              transform 0.22s ease, box-shadow 0.22s ease;
  white-space: nowrap;
  position: relative;
  overflow: ${e=>{let{$variant:t}=e;return"primary"===t?"visible":"hidden"}};

  background: ${e=>{let{$variant:t}=e;return"primary"===t?"var(--color-accent, #0ea5e9)":"rgba(255, 255, 255, 0.07)"}};
  color: white;
  border: ${e=>{let{$variant:t}=e;return"primary"===t?"2px solid var(--color-accent, #0ea5e9)":"1px solid rgba(255, 255, 255, 0.14)"}};

  /* Shimmer layer — ghost variant only */
  &::before {
    content: "";
    display: ${e=>{let{$variant:t}=e;return"primary"===t?"none":"block"}};
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${e=>{let{$variant:t}=e;return"primary"===t?"transparent":"rgba(255, 255, 255, 0.12)"}};
    color: ${e=>{let{$variant:t}=e;return"primary"===t?"var(--color-accent-light, #38bdf8)":"white"}};
    border-color: ${e=>{let{$variant:t}=e;return"primary"===t?"var(--color-accent, #0ea5e9)":"rgba(255, 255, 255, 0.25)"}};
    transform: translateY(-2px);
    box-shadow: ${e=>{let{$variant:t}=e;return"primary"===t?"0 6px 20px rgba(14, 165, 233, 0.22)":"0 6px 20px rgba(0, 0, 0, 0.25)"}};

    &::before {
      left: 150%;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(0);
  }
`,aE=Ie.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0;
`,sE=Ie.div``,lE=Ie.div`
  padding: 2rem 2.5rem 2.5rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem 1.75rem;
  }
`,cE=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  font-weight: 800;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid rgba(14, 165, 233, 0.35);
  letter-spacing: -0.02em;
`,uE=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 1.45rem);
  font-weight: 700;
  margin: 2rem 0 0.75rem;
  letter-spacing: -0.015em;
`,dE=Ie.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.75rem 0 0.65rem;
`,fE=Ie.h4`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
`,pE=Ie.p`
  margin-bottom: 1.4rem;
  &:last-child {
    margin-bottom: 0;
  }
`,hE=Ie.blockquote`
  border-left: 3px solid var(--color-accent, #0ea5e9);
  padding: 1rem 1.5rem;
  margin: 1.75rem 0;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(14, 165, 233, 0.06);
  border-radius: 0 10px 10px 0;
`,mE=Ie.a`
  color: var(--color-accent-light, #38bdf8);
  font-weight: 500;
  text-underline-offset: 3px;
  transition: color 0.18s ease;

  &:hover {
    color: white;
  }
`,gE=Ie.ul`
  margin: 1.25rem 0;
  padding-left: 1.5rem;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 0.6rem;
  }

  li::before {
    content: "";
    position: absolute;
    left: -1.1rem;
    top: 0.6em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent, #0ea5e9);
  }
`,vE=Ie.ol`
  margin: 1.25rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.6rem;
  }

  li::marker {
    color: var(--color-accent, #0ea5e9);
    font-weight: 600;
  }
`,yE=Ie.li`
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
`,bE=Ie.figure`
  text-align: center;
  margin: 2rem 0;

  img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .caption {
    display: block;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    font-style: italic;
    margin-top: 0.75rem;
  }
`,xE=Ie.div``,wE=Ie.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1.75rem 2.5rem 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem 0.75rem;
  }
`,kE=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
`,jE=Ie.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.82rem;
  font-weight: 400;
`,SE=Ie.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.85rem;
  padding: 0 2.5rem 2.5rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 1.75rem;
    gap: 0.65rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 1.25rem 1.5rem;
  }
`,CE=Ie.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Shimmer on hover */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.06),
      transparent
    );
    transition: left 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.14);

    img {
      transform: scale(1.05);
    }

    &::after {
      left: 150%;
    }
  }
`,EE=Ie.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;

  ${CE}:hover & {
    opacity: 1;
  }
`,TE=Ie.p`
  margin: 0;
  padding: 0.55rem 0.8rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  font-style: italic;
  background: rgba(0, 0, 0, 0.25);
`,PE=Ie.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: zoom-out;
`,OE=Ie.div`
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  cursor: default;
`,AE=Ie.button`
  position: absolute;
  top: -2.25rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  opacity: 0.75;
  transition: opacity 0.18s ease;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
    outline-offset: 3px;
    border-radius: 4px;
  }
`,zE=Ie.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
`;const $E={hidden:{opacity:0,x:-52,filter:"blur(4px)"},visible:{opacity:1,x:0,filter:"blur(0px)",transition:{duration:.75,ease:[.22,1,.36,1]}}},RE={hidden:{opacity:0,x:52,filter:"blur(4px)"},visible:{opacity:1,x:0,filter:"blur(0px)",transition:{duration:.75,ease:[.22,1,.36,1]}}},_E={hidden:{opacity:0,y:32,filter:"blur(4px)"},visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.7,ease:[.22,1,.36,1]}}},IE={hidden:{},visible:{transition:{staggerChildren:.09,delayChildren:.15}}},ME={hidden:{opacity:0,scale:.65,y:10},visible:{opacity:1,scale:1,y:0,transition:{type:"spring",stiffness:320,damping:22}}},LE={hidden:{opacity:0,y:24},visible:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}}},DE=[{label:"React",color:"var(--color-accent)",glow:.85,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"}}]})(e)}},{label:"Next.js",color:"var(--color-accent-light)",glow:.8,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"}}]})(e)}},{label:"TypeScript",color:"var(--color-gold)",glow:.9,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"}}]})(e)}},{label:"Node",color:"var(--color-accent-light)",glow:.6,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"}}]})(e)}},{label:"Django",color:"var(--color-accent)",glow:.65,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z"}}]})(e)}},{label:"Firebase",color:"var(--color-gold)",glow:.7,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"}}]})(e)}},{label:"Mongo",color:"var(--color-accent)",glow:.55,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"}}]})(e)}},{label:"Figma",color:"var(--color-gold)",glow:.75,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"}}]})(e)}},{label:"Tailwind",color:"var(--color-accent-light)",glow:.5,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"}}]})(e)}},{label:"Three.js",color:"var(--color-accent)",glow:.7,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"}}]})(e)}},{label:"Sanity",color:"var(--color-gold)",glow:.65,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M7.394 7.31a5.745 5.745 0 0 1-.833-.68c-.913-.91-1.38-2.067-1.38-3.568v-.575C6.699.929 9.039 0 11.828 0c5.394 0 8.515 2.8 9.285 6.74H16.22c-.54-1.554-1.89-2.764-4.352-2.764-2.422 0-4.136 1.276-4.473 3.334h-.002ZM4.683 3.062c0 3.236 2.034 5.162 6.106 6.177l4.316.983c3.854.87 6.2 3.03 6.2 6.55a6.61 6.61 0 0 1-1.436 4.239c0-3.511-1.85-5.409-6.31-6.55l-4.236-.946c-3.393-.76-6.011-2.536-6.011-6.36a6.578 6.578 0 0 1 1.37-4.093ZM17.18 16.484c-.292 2.235-2.092 3.495-4.698 3.495-2.314 0-4.048-.946-4.703-2.99H2.694C3.518 21.44 7.224 24 12.519 24c2.828 0 5.277-.87 6.85-2.439v-.55c0-1.66-.433-2.876-1.342-3.816a5.508 5.508 0 0 0-.847-.71v-.001Z"}}]})(e)}},{label:"Python",color:"var(--color-accent-light)",glow:.75,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"}}]})(e)}},{label:"Linux",color:"var(--color-gold)",glow:.6,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"}}]})(e)}},{label:"Git",color:"var(--color-accent)",glow:.8,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"}}]})(e)}},{label:"Vercel",color:"var(--color-accent-light)",glow:.7,Icon:function(e){return Ra({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M24 22.525H0l12-21.05 12 21.05z"}}]})(e)}}],NE=[{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}}]})(e)},title:"Plain English only.",body:"No jargon, no disappearing. I'll explain what I'm building, why it matters, and what you need to know, in language that actually makes sense."},{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}},{tag:"line",attr:{x1:"3",y1:"9",x2:"21",y2:"9"}},{tag:"line",attr:{x1:"9",y1:"21",x2:"9",y2:"9"}}]})(e)},title:"Start small, trust first.",body:"Not sure if we're a good fit? We begin with one small piece of your project. When you see the work, you'll know if you want to move forward."},{icon:function(e){return Ra({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"16 18 22 12 16 6"}},{tag:"polyline",attr:{points:"8 6 2 12 8 18"}}]})(e)},title:"One person. Full stack.",body:"Design, development, databases, security. I handle all of it. One contact, no gaps, no finger-pointing between people."}],FE=[{number:"01",title:"Discovery",body:"We talk through your idea, goals, and audience. No jargon, just figuring out what you actually need."},{number:"02",title:"Planning",body:"I map out scope, timeline, and the right stack before a single line of code is written."},{number:"03",title:"Design",body:"Mobile-first UI built around your brand. Clean and easy to use on phones, tablets, and desktops."},{number:"04",title:"Development",body:"Front end, back end, databases, and third-party integrations, all handled by one person."},{number:"05",title:"Security",body:"Auth, input validation, HTTPS, protected routes, and safe data handling baked in from the start, not bolted on at the end."},{number:"06",title:"SEO",body:"Meta tags, structured data, page speed, and a sitemap so Google can actually find you from day one."},{number:"07",title:"Analytics",body:"GA4 setup and conversion tracking so you know who's visiting, what they're doing, and what's working."},{number:"08",title:"Launch & Support",body:"Deployment, final QA, and I stay available after go-live to make sure everything keeps working."}],VE=["intro","story","skills","values","cta"],UE=["Intro","Story","Skills","Values","Let's talk"];_e`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;const BE=_e`
  0%   { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`,HE=(_e`
  0%, 100% { opacity: 0.60; }
  50%       { opacity: 1; }
`,_e`
  0%, 100% { transform: translateY(0px)   rotate(var(--rot)); }
  50%       { transform: translateY(-8px)  rotate(calc(var(--rot) + 1.5deg)); }
`),qE=_e`
  0%, 100% { transform: translateY(0px)   rotate(var(--rot)); }
  50%       { transform: translateY(-12px) rotate(calc(var(--rot) - 1deg)); }
`,WE=_e`
  0%, 100% { transform: translateY(0px)  rotate(var(--rot)); }
  60%       { transform: translateY(-6px) rotate(calc(var(--rot) + 2deg)); }
`,YE=_e`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
`,XE=_e`
  0%   { left: -100%; }
  100% { left: 200%; }
`,KE=Ie.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`,GE=Ie.div`
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`,JE=Ie.div`
  position: absolute;
  inset: 0;
  background-color: rgba(10, 12, 22, 0.85);
`,QE=Ie.div`
  position: relative;
  z-index: 10;
  height: calc(100vh - var(--navbar-h, 60px));
  margin-top: var(--navbar-h, 60px);
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* Use smooth scrolling for programmatic scrollIntoView calls */
  scroll-behavior: smooth;

  /*
   * 100vh on mobile browsers includes the browser chrome (address bar, toolbar),
   * which can cause the bottom of the last snap section to be obscured.
   * 100dvh (dynamic viewport height) tracks the *actual* visible area as the
   * browser UI shows/hides during scroll. Progressive enhancement via @supports
   * so older browsers fall back to 100vh without breaking.
   */
  @supports (height: 100dvh) {
    height: calc(100dvh - var(--navbar-h, 60px));
  }
`,ZE=Ie.section`
  position: relative;
  min-height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 70% at 50% 50%,
      transparent 40%,
      rgba(0, 0, 0, 0.38) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* All direct children sit above the vignette */
  > * {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 480px) {
    padding: 0.75rem;
  }

  @media (min-width: 640px) {
    padding: 1.25rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem 3rem;
  }
`,eT=Ie.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  min-height: 0;
  border-radius: 26px;

  @media (max-width: 899px) {
    min-height: ${e=>{let{$tall:t}=e;return t?"min(75vh, 620px)":"0"}};
  }

  @media (min-width: 900px) {
    height: calc(100vh - var(--navbar-h, 60px) - 4rem);
  }
  /* Gradient border: ::before creates the 1px-padded gradient shell */
  isolation: isolate;
  display: flex;
  align-items: stretch;

  /* ── Layer 1: Gradient border shell ─────────────────────────────────────── */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px; /* border thickness */
    background: conic-gradient(
      from 225deg at 20% 20%,
      rgba(14, 165, 233, 0.55)   0deg,
      rgba(56, 189, 248, 0.40)  70deg,
      rgba(255, 255, 255, 0.06) 160deg,
      rgba(255, 255, 255, 0.03) 220deg,
      rgba(56, 189, 248, 0.28)  290deg,
      rgba(14, 165, 233, 0.18)  340deg,
      rgba(14, 165, 233, 0.55)  360deg
    );
    /*
     * Mask technique: the gradient shows only where the padding is.
     * This gives a true gradient border without overflow tricks.
     */
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 4;
    transition: opacity 0.4s ease;
  }

  /* ── Layer 2: Animated diagonal grain ───────────────────────────────────── */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /*
     * A fine diagonal repeating-linear-gradient mimics the halftone grain of
     * film stock. At 4% opacity it is completely subliminal — visible only
     * when looking closely, but it kills the "flat digital rectangle" feeling.
     */
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.014) 3px,
      rgba(255, 255, 255, 0.014) 4px
    );
    background-size: 200% 200%;
    animation: ${BE} 28s linear infinite alternate;
    pointer-events: none;
    z-index: 1;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  /* ── The actual glass fill — inner wrapper semantics ────────────────────── */
  /*
   * overflow: visible so child hover transforms (translateX on ValueCard,
   * translateY on DashCell, SkillChip) are never clipped by the panel edge.
   * The glass background and border-radius still render correctly without
   * overflow:hidden — backgrounds are clipped to border-radius natively.
   */
  overflow: visible;
  background: rgba(8, 10, 20, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);

  /*
   * Three shadow layers:
   *  1. Deep cast shadow — depth on the stage
   *  2. Inset top highlight — simulates a glass edge catching ceiling light
   *  3. Inset bottom shadow — grounds the panel
   */
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 0 -1px 0 rgba(0, 0, 0, 0.40);
`,tT=Ie.div`
  position: relative;
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: ${e=>{let{$reverse:t}=e;return t?"row-reverse":"row"}};

  @media (max-width: 899px) {
    flex-direction: ${e=>{let{$mobileColumn:t}=e;return t?"column":"inherit"}};
    ${e=>{let{$mobileOverlay:t,$mobileMinH:n}=e;return t&&`\n      overflow: hidden;\n      border-radius: 20px;\n      min-height: ${n||"min(95vw, 560px)"};\n    `}}
  }
`,nT=Ie.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: ${e=>{let{$scrollable:t}=e;return t?"flex-start":"center"}};

  @media (min-width: 480px) {
    padding: 0.75rem;
  }
  /*
   * overflow-y: auto (not "hidden auto") — using the shorthand "hidden auto"
   * sets overflow-x: hidden which creates a scroll port that hard-clips painted
   * content at the container boundary on ALL sides, including the bottom edge.
   * This was causing the last row of process cards to be cut off even though
   * overflow-y was set to allow scrolling. Using overflow-y: auto alone lets
   * the cross axis (x) remain at its initial value ("visible" resolved to "auto"
   * by the spec only when y is also overflow), which avoids the clipping.
   */
  overflow-y: ${e=>{let{$scrollable:t}=e;return t?"auto":"visible"}};

  ${e=>{let{$scrollable:t}=e;return t&&"\n    &::-webkit-scrollbar { width: 3px; }\n    &::-webkit-scrollbar-track { background: transparent; }\n    &::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.20); border-radius: 2px; }\n  "}}

  @media (min-width: 900px) {
    padding: ${e=>{let{$scrollable:t}=e;return t?"2.5rem 2.5rem 2.5rem 3rem":"3rem 3rem 3rem 3.5rem"}};
    flex: 0 0 50%;
  }

  @media (max-width: 899px) {
    ${e=>{let{$photoBg:t}=e;return t&&"\n      position: absolute;\n      inset: 0;\n      flex: none;\n      width: 100%;\n      height: 100%;\n      z-index: 0;\n      padding: 0;\n      overflow: hidden;\n    "}}
    ${e=>{let{$textOverlay:t}=e;return t&&"\n      position: relative;\n      z-index: 2;\n      flex: 1;\n      width: 100%;\n      background: linear-gradient(to bottom, rgba(4, 4, 14, 0.55) 0%, rgba(4, 4, 14, 0.85) 100%);\n      padding: 1.5rem 1.25rem;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n    "}}
  }
`,rT=Ie.div`
  flex: 1;
  padding: ${e=>{let{$photo:t}=e;return t?"0":"0.5rem"}};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${e=>{let{$photo:t,$collage:n}=e;return t||n?"stretch":"center"}};

  @media (min-width: 480px) {
    padding: ${e=>{let{$photo:t}=e;return t?"0":"0.75rem"}};
  }
  overflow: ${e=>{let{$photo:t}=e;return t?"hidden":"visible"}};

  @media (min-width: 900px) {
    padding: ${e=>{let{$photo:t}=e;return t?"0":"3rem 3.5rem 3rem 2.5rem"}};
    flex: 1;

    /*
     * Gradient separator — suppressed when used as a full-bleed photo container
     * so the image sits flush against the panel edge with no hairline.
     */
    border-left: none;
    box-shadow: -1px 0 0 0 transparent;
    background-image: ${e=>{let{$photo:t}=e;return t?"none":"linear-gradient(\n      180deg,\n      transparent 0%,\n      rgba(14, 165, 233, 0.12) 25%,\n      rgba(255, 255, 255, 0.07) 50%,\n      rgba(14, 165, 233, 0.08) 75%,\n      transparent 100%\n    )"}};
    background-repeat: no-repeat;
    background-size: 1px 100%;
    background-position: left center;
    padding-left: ${e=>{let{$photo:t}=e;return t?"0":"calc(2.5rem + 1px)"}};
  }

  @media (max-width: 899px) {
    ${e=>{let{$photo:t}=e;return t&&"\n      position: absolute;\n      inset: 0;\n      flex: none;\n      width: 100%;\n      height: 100%;\n      z-index: 0;\n      padding: 0;\n      overflow: hidden;\n    "}}
    ${e=>{let{$textOverlay:t}=e;return t&&"\n      position: relative;\n      z-index: 2;\n      flex: 1;\n      width: 100%;\n      background: linear-gradient(to bottom, rgba(4, 4, 14, 0.55) 0%, rgba(4, 4, 14, 0.85) 100%);\n      padding: 1.5rem 1.25rem;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n    "}}
  }
`,iT=Ie.nav`
  position: fixed;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: calc(var(--navbar-h, 60px) / 2);
`,oT=Ie.button`
  width: ${e=>{let{$active:t}=e;return t?"10px":"7px"}};
  height: ${e=>{let{$active:t}=e;return t?"10px":"7px"}};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${e=>{let{$active:t}=e;return t?"var(--color-accent-light, #38bdf8)":"rgba(255, 255, 255, 0.28)"}};
  box-shadow: ${e=>{let{$active:t}=e;return t?"0 0 10px var(--color-accent-light, #38bdf8)":"none"}};
  transition: background 0.25s ease, width 0.25s ease, height 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.65);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`,aT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--color-accent-light, #38bdf8);
  margin: 0 0 0.25rem;

  @media (min-width: 900px) {
    font-size: 0.7rem;
    margin: 0 0 0.9rem;
  }
`,sT=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(0.95rem, 3vw, 2.2rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  padding-bottom: 0.08em;
  overflow: visible;

  @media (min-width: 900px) {
    font-size: clamp(1.5rem, 3.2vw, 2.2rem);
    margin: 0 0 2rem;
  }
`,lT=Ie.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.2rem, 4.5vw, 5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: white;
  margin: 0 0 0.5rem;
  padding-bottom: 0.1em;
  overflow: visible;

  @media (min-width: 900px) {
    margin: 0 0 1.25rem;
  }
`,cT=Ie.span`
  display: block;
  background: linear-gradient(
    100deg,
    var(--color-accent-light, #38bdf8) 0%,
    rgba(255, 255, 255, 0.55) 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`,uT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.68rem, 1.8vw, 1.15rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  width: 100%;
  max-width: 480px;
  margin: 0 0 0.35rem;

  @media (min-width: 900px) {
    line-height: 1.75;
    margin: 0 0 1.75rem;
  }
`,dT=Ie.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  padding-top: 2px;

  @media (min-width: 900px) {
    justify-content: flex-start;
    gap: 0.55rem;
    padding-top: 4px;
  }
`,fT=Ie.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.18rem 0.5rem;

  @media (min-width: 900px) {
    font-size: 0.76rem;
    padding: 0.32rem 0.85rem;
  }
  border-radius: var(--radius-full, 9999px);
  background: ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.10)":"rgba(14,165,233,0.10)"}};
  border: 1px solid ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.35)":"rgba(14,165,233,0.30)"}};
  color: ${e=>{let{$gold:t}=e;return t?"var(--color-gold, #f7ab0a)":"var(--color-accent-light, #38bdf8)"}};
`,pT=Ie.div`
  position: relative;
  width: 480px;
  height: 460px;
  flex-shrink: 0;

  @media (max-width: 899px) {
    width: 100%;
    height: 100%;
  }
`,hT=Ie.div`
  position: absolute;
  width: ${e=>{let{$w:t}=e;return t}};
  height: ${e=>{let{$h:t}=e;return t}};
  top: ${e=>{let{$top:t}=e;return t}};
  left: ${e=>{let{$left:t}=e;return t}};
  border-radius: ${e=>{let{$radius:t}=e;return t||"12px"}};
  overflow: hidden;
  z-index: ${e=>{let{$z:t}=e;return t||1}};
  --rot: ${e=>{let{$rotate:t}=e;return t||"0deg"}};
  transform: rotate(var(--rot));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.4);
  /* Opacity prop used only by the CTA background decor pieces */
  opacity: ${e=>{let{$opacity:t}=e;return t||1}};
  pointer-events: ${e=>{let{$opacity:t}=e;return t?"none":"auto"}};
  animation: ${e=>{let{$delay:t}=e;const n=parseFloat(t||"0");return n<.2?HE:n<.5?qE:WE}} ${e=>{let{$delay:t}=e;const n=parseFloat(t||"0");return n<.2?"6s":n<.5?"8s":"7s"}} ease-in-out infinite;
  animation-delay: ${e=>{let{$delay:t}=e;return t||"0s"}};
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    z-index: 10;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7),
      0 0 0 2px var(--color-accent, #0ea5e9);
    transform: rotate(0deg) scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(var(--rot));
  }
`,mT=Ie.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${e=>{let{$pos:t}=e;return t||"center"}};
  display: block;
  transition: transform 0.5s ease;

  ${hT}:hover & {
    transform: scale(1.08);
  }
`,gT=Ie.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid ${e=>{let{$color:t}=e;return t||"var(--color-accent)"}};
  opacity: 0.45;
  pointer-events: none;
  transition: opacity 0.3s ease;

  ${hT}:hover & {
    opacity: 0.85;
  }
`,vT=Ie.div`
  position: absolute;
  top: ${e=>{let{$top:t}=e;return t}};
  left: ${e=>{let{$left:t}=e;return t}};
  width: ${e=>{let{$w:t}=e;return t}};
  height: 1.5px;
  background: linear-gradient(
    90deg,
    rgba(14, 165, 233, 0.5),
    rgba(56, 189, 248, 0.4)
  );
  transform-origin: left center;
  transform: rotate(${e=>{let{$angle:t}=e;return t||"0deg"}});
  border-radius: 1px;
  pointer-events: none;
`,yT=Ie.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 80px;

  @media (min-width: 900px) {
    min-height: 200px;
  }
  /*
   * Ensure the photo container stretches to fill the SplitLeft column
   * on desktop. overflow:hidden clips the image to the border-radius.
   */
  overflow: hidden;
  /* Side-by-side on all screen sizes: round the outer edge of the photo panel */
  @media (min-width: 900px) {
    border-radius: ${e=>{let{$mirror:t}=e;return t?"25px 0 0 25px":"0 25px 25px 0"}};
  }

  @media (max-width: 899px) {
    border-radius: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    /* Slight desaturate gives the photo an editorial feel */
    filter: saturate(0.88) contrast(1.05);
    transition: filter 0.4s ease;
  }

  &:hover img {
    filter: saturate(1) contrast(1);
  }
`,bT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.68rem, 1.6vw, 1.02rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.73);
  max-width: 54ch;
  margin: 0 0 0.4rem;

  @media (min-width: 900px) {
    line-height: 1.85;
    margin: 0 0 1.35rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,xT=(Ie.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  list-style: none;
  /* top padding gives the translateY(-3px) hover room to breathe */
  padding: 4px 0 0;
  margin: 0;
`,Ie.span`
  display: inline-block;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full, 9999px);
  background: ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.07)":"rgba(14,165,233,0.07)"}};
  border: 1px solid ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.28)":"rgba(14,165,233,0.25)"}};
  color: ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.90)":"rgba(56,189,248,0.90)"}};
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.14)":"rgba(14,165,233,0.14)"}};
    border-color: ${e=>{let{$gold:t}=e;return t?"rgba(247,171,10,0.55)":"rgba(14,165,233,0.50)"}};
  }
`,Ie.ol`
  list-style: none;
  margin: 0;
  /* Reduced from 3rem — the 3rem dead-space at the bottom was eating into the
   * visible scroll area and making the last card row appear cut off. 1rem is
   * enough breathing room at the scroll terminus. */
  padding: 0 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  align-items: stretch;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`),wT=Ie.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  gap: 0.3rem;
  padding: 0.3rem 0.45rem;

  @media (min-width: 900px) {
    gap: 0.5rem;
    padding: 0.55rem 0.8rem;
  }
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    background: rgba(14, 165, 233, 0.08);
    border-color: rgba(14, 165, 233, 0.35);
    transform: translateY(1px);
  }
`,kT=Ie.span`
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  /* Circle reads as a counter, not a nested mini-card — avoids rectangle-in-rectangle */
  border-radius: 50%;
  /* Nudge down slightly so the vertical center aligns with the title baseline */
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 165, 233, 0.14);
  border: 1px solid rgba(14, 165, 233, 0.30);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-accent-light, #38bdf8);
`,jT=Ie.div`
  display: flex;
  flex-direction: column;
  /* Pin title and body to the top of the column regardless of card height */
  justify-content: flex-start;
  flex: 1;
  min-width: 0; /* prevents text overflow from stretching the flex child */
`,ST=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.1rem;
  letter-spacing: 0.01em;
  line-height: 1.2;

  @media (min-width: 900px) {
    font-size: 0.875rem;
    margin: 0 0 0.2rem;
  }
`,CT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.58);
  margin: 0;
  line-height: 1.35;

  @media (min-width: 900px) {
    font-size: 0.70rem;
    line-height: 1.4;
  }
`,ET=Ie.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* top padding gives DashCell translateY(-2px) hover room */
  padding-top: 4px;

  /*
   * On mobile the 320px cap would leave dead space on wider narrow screens
   * (e.g. 360–480px). Let it fill the available column width instead.
   */
  @media (max-width: 899px) {
    max-width: 100%;
  }
`,TT=Ie.p`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.68rem;
  color: rgba(56, 189, 248, 0.45);
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem;
`,PT=Ie.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;

  @media (min-width: 900px) {
    gap: 0.6rem;
  }
`,OT=Ie.div`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${e=>{let{$color:t}=e;return t}}22;
  border-radius: 8px;
  padding: 0.35rem 0.3rem 0.3rem;

  @media (min-width: 900px) {
    border-radius: 10px;
    padding: 0.7rem 0.6rem 0.6rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  overflow: hidden;
  animation: ${YE} ${e=>{let{$delay:t}=e;return 3+4*parseFloat(t)+"s"}}
    ease-in-out infinite;
  animation-delay: ${e=>{let{$delay:t}=e;return t}};
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  /* Glow bleed from the top — simulates an active signal */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>{let{$color:t}=e;return t}};
    opacity: ${e=>{let{$glow:t}=e;return t}};
    border-radius: 10px 10px 0 0;
  }

  &:hover,
  &:focus {
    background: rgba(14, 165, 233, 0.10);
    border-color: rgba(56, 189, 248, 0.50);
    transform: translateY(-2px);
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,AT=Ie.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.62rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.04em;
  text-align: center;
`,zT=Ie.div`
  height: 4px;
  border-radius: 2px;
  background: ${e=>{let{$color:t}=e;return t}}33;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${e=>{let{$fill:t}=e;return`${Math.round(100*t)}%`}};
    background: ${e=>{let{$color:t}=e;return t}};
    border-radius: 2px;
    opacity: 0.85;
  }
`,$T=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  transition: opacity 0.25s ease, transform 0.25s ease;

  ${OT}:hover &,
  ${OT}:focus & {
    opacity: 0;
    transform: scale(0.8);
  }
`,RT=Ie.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-light, #38bdf8);
  opacity: 0;
  transform: scale(1.2) rotate(-10deg);
  transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.9));

  /* radial spotlight behind the logo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(14, 165, 233, 0.22) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  ${OT}:hover &,
  ${OT}:focus & {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`,_T=Ie.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  @media (min-width: 900px) {
    gap: 1rem;
  }
  width: 100%;
  /*
   * 6px right padding ensures the translateX(4px) on ValueCard:hover
   * is never visually tight against the right boundary.
   */
  padding-right: 6px;
`,IT=Ie.article`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.5rem 0.65rem 0.5rem 0.85rem;

  @media (min-width: 900px) {
    border-radius: var(--radius-lg, 20px);
    padding: 1.1rem 1.25rem 1.1rem 1.6rem;
  }
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 165, 233, 0.08),
      transparent
    );
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(14, 165, 233, 0.30);
    background: linear-gradient(
      135deg,
      rgba(14, 165, 233, 0.07) 0%,
      rgba(56, 189, 248, 0.04) 100%
    );
    transform: translateX(4px);

    &::after {
      animation: ${XE} 0.6s ease forwards;
    }
  }
`,MT=Ie.div`
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(
    180deg,
    var(--color-accent, #0ea5e9) 0%,
    var(--color-accent-light, #38bdf8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease, top 0.35s ease, bottom 0.35s ease;

  ${IT}:hover & {
    opacity: 1;
    top: 0;
    bottom: 0;
  }
`,LT=Ie.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 8px;
  background: rgba(14, 165, 233, 0.10);
  border: 1px solid rgba(14, 165, 233, 0.20);
  color: var(--color-accent-light, #38bdf8);
  margin-bottom: 0.3rem;

  @media (min-width: 900px) {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md, 12px);
    margin-bottom: 0.65rem;
  }
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  ${IT}:hover & {
    background: rgba(14, 165, 233, 0.18);
    border-color: rgba(56, 189, 248, 0.40);
    color: var(--color-accent-light, #38bdf8);
  }
`,DT=Ie.h3`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.01em;
  margin: 0 0 0.15rem;

  @media (min-width: 900px) {
    font-size: 1rem;
    margin: 0 0 0.4rem;
  }
`,NT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.65rem;
  font-weight: 300;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.62);
  margin: 0;

  @media (min-width: 900px) {
    font-size: 0.85rem;
    line-height: 1.65;
  }
`,FT=Ie.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`,VT=Ie.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
`,UT=Ie.div`
  position: relative;
  width: 100%;
  background: rgba(8, 10, 20, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);
  border-radius: 26px;
  padding: 3rem 2.5rem;
  text-align: center;
  isolation: isolate;

  /*
   * Gradient border — identical mask technique used on SectionGlass.
   * The conic-gradient is clipped to a 1px inset via the xor mask composite,
   * producing a border that glows brighter at the top-left origin point and
   * fades around the panel perimeter.
   */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from 225deg at 20% 20%,
      rgba(14, 165, 233, 0.55)   0deg,
      rgba(56, 189, 248, 0.40)  70deg,
      rgba(255, 255, 255, 0.06) 160deg,
      rgba(255, 255, 255, 0.03) 220deg,
      rgba(56, 189, 248, 0.28)  290deg,
      rgba(14, 165, 233, 0.18)  340deg,
      rgba(14, 165, 233, 0.55)  360deg
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 4;
  }

  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* All direct children sit above the ::before border layer */
  > * {
    position: relative;
    z-index: 3;
  }

  /*
   * 3rem all-around is too generous on a 390px screen — compress to give
   * the CTA content more breathing room without the padded walls closing in.
   */
  @media (max-width: 639px) {
    padding: 1.75rem 1.25rem;
  }

  @media (max-width: 390px) {
    padding: 1.25rem 1rem;
  }

  @media (min-width: 640px) {
    padding: 4rem 3.5rem;
  }
`,BT=Ie.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(14, 165, 233, 0.20) 15%,
    rgba(56, 189, 248, 0.70) 42%,
    rgba(255, 255, 255, 0.90) 50%,
    rgba(56, 189, 248, 0.70) 58%,
    rgba(14, 165, 233, 0.20) 85%,
    transparent 100%
  );
  margin: 0 auto 1.75rem;

  /* Blue center node */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent-light, #38bdf8);
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.70);
  }
`,HT=Ie.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.4rem, 6vw, 2.8rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0.5rem 0 0.75rem;
  padding-bottom: 0.1em;
  overflow: visible;
`,qT=Ie.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.88rem, 2.5vw, 1.1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 auto 1.25rem;

  @media (min-width: 640px) {
    margin-bottom: 2.25rem;
  }
`,WT=Ie.nav`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
  padding: 0.25rem 0;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    gap: 0.75rem;
  }
`,YT="\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.75rem 1.75rem;\n  border-radius: 12px;\n  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);\n  font-size: 0.9rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-decoration: none;\n  white-space: nowrap;\n  transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease,\n              transform 0.22s ease, box-shadow 0.22s ease;\n\n  &:focus-visible {\n    outline: 2px solid var(--color-accent, #0ea5e9);\n    outline-offset: 3px;\n  }\n\n  svg {\n    flex-shrink: 0;\n    transition: transform 0.2s ease;\n  }\n\n  &:hover svg {\n    transform: translateX(3px);\n  }\n",XT=Ie(oa)`
  ${YT}
  background: var(--color-accent, #0ea5e9);
  border: 2px solid var(--color-accent, #0ea5e9);
  color: white;

  &:hover {
    background: transparent;
    color: var(--color-accent-light, #38bdf8);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.30);
  }
`,KT=Ie(oa)`
  ${YT}
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.82);

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    border-color: rgba(255, 255, 255, 0.30);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  }
`,GT=Ie.div`
  display: none;
  @media (min-width: 900px) {
    display: contents;
  }
`,JT=Ie.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem 1rem 0.75rem;
  gap: 0.75rem;
  min-height: min(95vw, 520px);
  @media (min-width: 900px) {
    display: none;
  }
`,QT=Ie.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`,ZT=Ie.button`
  flex: 1;
  padding: 0.55rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.8rem;
  font-weight: ${e=>{let{$active:t}=e;return t?700:500}};
  letter-spacing: 0.03em;
  color: ${e=>{let{$active:t}=e;return t?"var(--color-accent-light, #38bdf8)":"rgba(255,255,255,0.40)"}};
  transition: color 0.22s ease;
`,eP=Ie.div`
  position: absolute;
  bottom: -1px;
  left: ${e=>{let{$index:t}=e;return 0===t?"0%":"50%"}};
  width: 50%;
  height: 2px;
  background: var(--color-accent-light, #38bdf8);
  border-radius: 1px;
  box-shadow: 0 0 8px var(--color-accent, #0ea5e9);
  transition: left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
`,tP=Ie(hw.div)`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  &:active { cursor: grabbing; }
  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.2); border-radius: 2px; }
`,nP=Ie.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  padding-bottom: 0.25rem;
`,rP=Ie.button`
  width: ${e=>{let{$active:t}=e;return t?"22px":"6px"}};
  height: 6px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${e=>{let{$active:t}=e;return t?"linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))":"rgba(255,255,255,0.20)"}};
  box-shadow: ${e=>{let{$active:t}=e;return t?"0 0 6px rgba(14,165,233,0.5)":"none"}};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.22s ease;
`,iP=function(){const[t,n]=(0,e.useState)(0),r=(0,e.useRef)([]),[i,o]=(0,e.useState)(0),[a,s]=(0,e.useState)(1),l=e=>{s(e>i?1:-1),o(e)};(0,e.useEffect)((()=>{const e=[];return r.current.forEach(((t,r)=>{if(!t)return;const i=new IntersectionObserver((e=>{let[t]=e;t.isIntersecting&&n(r)}),{threshold:.51});i.observe(t),e.push(i)})),()=>e.forEach((e=>e.disconnect()))}),[]);const c=e=>t=>{r.current[e]=t};return(0,la.jsxs)(la.Fragment,{children:[(0,la.jsxs)(_s,{children:[(0,la.jsx)("title",{children:"About | Felipe Cantu Jr"}),(0,la.jsx)("meta",{name:"description",content:"Full-Stack Developer & Designer based in Dallas, TX. Passionate about building things that look as good as they work."}),(0,la.jsx)("link",{rel:"canonical",href:"https://felipecantujr.com/about"}),(0,la.jsx)("meta",{property:"og:title",content:"About | Felipe Cantu Jr"}),(0,la.jsx)("meta",{property:"og:description",content:"Full-Stack Developer & Designer based in Dallas, TX. Passionate about building things that look as good as they work."}),(0,la.jsx)("meta",{property:"og:url",content:"https://felipecantujr.com/about"}),(0,la.jsx)("meta",{property:"og:type",content:"website"})]}),(0,la.jsxs)(KE,{"aria-hidden":"true",children:[(0,la.jsx)(GE,{}),(0,la.jsx)(JE,{})]}),(0,la.jsx)(iT,{"aria-label":"Page sections",children:VE.map(((e,n)=>(0,la.jsx)(oT,{$active:t===n,onClick:()=>(e=>{var t;null===(t=r.current[e])||void 0===t||t.scrollIntoView({behavior:"smooth"})})(n),"aria-label":`Go to ${UE[n]} section`,"aria-current":t===n?"true":void 0},e)))}),(0,la.jsxs)(QE,{children:[(0,la.jsx)(ZE,{id:"intro",ref:c(0),"aria-label":"Introduction",children:(0,la.jsx)(eT,{$tall:!0,children:(0,la.jsxs)(tT,{$mobileColumn:!0,children:[(0,la.jsxs)(nT,{as:hw.div,variants:$E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},style:{alignItems:"center",textAlign:"center"},children:[(0,la.jsx)(aT,{children:"Full-Stack Developer & Designer"}),(0,la.jsxs)(lT,{children:["Felipe",(0,la.jsx)("br",{}),(0,la.jsx)(cT,{children:"Cantu Jr"})]}),(0,la.jsx)(uT,{children:"If you've got an idea for a website or an application, I'll take it from concept to completion: design, development, and everything in between. Working with one person from start to finish means nothing falls through the cracks."}),(0,la.jsxs)(dT,{children:[(0,la.jsx)(fT,{children:"Dallas, TX"}),(0,la.jsx)(fT,{$gold:!0,children:"Available for work"})]})]}),(0,la.jsx)(rT,{$collage:!0,as:hw.div,variants:RE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},"aria-hidden":"true",children:(0,la.jsxs)(pT,{children:[(0,la.jsx)(vT,{$top:"38%",$left:"32%",$w:"80px",$angle:"-25deg"}),(0,la.jsx)(vT,{$top:"55%",$left:"52%",$w:"60px",$angle:"40deg"}),(0,la.jsx)(vT,{$top:"22%",$left:"55%",$w:"50px",$angle:"15deg"}),(0,la.jsxs)(hT,{$w:"45.83%",$h:"60.87%",$top:"10%",$left:"5%",$rotate:"-6deg",$z:"3",$delay:"0s",$radius:"18px 4px 18px 4px",children:[(0,la.jsx)(mT,{src:"images/small2.jpg",alt:"",$pos:"center top"}),(0,la.jsx)(gT,{$color:"var(--color-accent)"})]}),(0,la.jsxs)(hT,{$w:"40.63%",$h:"33.70%",$top:"4%",$left:"48%",$rotate:"7deg",$z:"2",$delay:"0.15s",$radius:"4px 16px 4px 16px",children:[(0,la.jsx)(mT,{src:"images/small1.jpg",alt:"",$pos:"center 30%"}),(0,la.jsx)(gT,{$color:"var(--color-gold)"})]}),(0,la.jsxs)(hT,{$w:"29.17%",$h:"30.43%",$top:"58%",$left:"2%",$rotate:"12deg",$z:"4",$delay:"0.3s",$radius:"4px 20px 4px 20px",children:[(0,la.jsx)(mT,{src:"images/small3.jpg",alt:"",$pos:"center"}),(0,la.jsx)(gT,{$color:"var(--color-accent-light, #38bdf8)"})]}),(0,la.jsxs)(hT,{$w:"50%",$h:"32.17%",$top:"65%",$left:"30%",$rotate:"-4deg",$z:"3",$delay:"0.45s",$radius:"16px 4px 16px 4px",children:[(0,la.jsx)(mT,{src:"images/felipe.jpg",alt:"",$pos:"center 60%"}),(0,la.jsx)(gT,{$color:"var(--color-gold)"})]}),(0,la.jsxs)(hT,{$w:"32.29%",$h:"44.57%",$top:"38%",$left:"62%",$rotate:"9deg",$z:"2",$delay:"0.6s",$radius:"20px 4px 20px 4px",children:[(0,la.jsx)(mT,{src:"images/small4.jpg",alt:"",$pos:"center 20%"}),(0,la.jsx)(gT,{$color:"var(--color-accent)"})]})]})})]})})}),(0,la.jsx)(ZE,{id:"story",ref:c(1),"aria-label":"Personal story",children:(0,la.jsx)(eT,{children:(0,la.jsxs)(tT,{$reverse:!0,$mobileOverlay:!0,children:[(0,la.jsx)(nT,{$photoBg:!0,as:hw.div,variants:$E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},"aria-hidden":"true",style:{padding:0,overflow:"hidden"},children:(0,la.jsx)(yT,{children:(0,la.jsx)("img",{src:"images/big.jpg",alt:"Felipe Cantu Jr"})})}),(0,la.jsxs)(rT,{$textOverlay:!0,as:hw.div,variants:RE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},style:{alignItems:"center",textAlign:"center",fontSize:"0.8em"},children:[(0,la.jsx)(aT,{children:"The story"}),(0,la.jsx)(sT,{children:"Rooted in Port Isabel, TX."}),(0,la.jsx)(bT,{children:"I grew up in Port Isabel, Texas, a small coastal town where I learned early that hard work and treating people right matter more than anything. I've carried that mindset with me into every project since."}),(0,la.jsx)(bT,{children:"I know hiring a developer can feel overwhelming. There's often the worry of getting buried in jargon, losing touch with someone along the way, or starting a project that never quite reaches the finish line. I've structured my work to avoid those problems. We start with a small, focused piece of work, something real, so you can see how I work before deciding whether to move forward."}),(0,la.jsx)(bT,{children:"When I'm not coding, I spend time with my wife and three kids. They're my foundation and the reason I show up ready every day. I also play guitar, skateboard, and am a longtime fan of Doctor Who. I believe things can always be better. It just takes someone willing to figure out how."})]})]})})}),(0,la.jsx)(ZE,{id:"skills",ref:c(2),"aria-label":"Technical skills",children:(0,la.jsxs)(eT,{children:[(0,la.jsx)(GT,{children:(0,la.jsxs)(tT,{children:[(0,la.jsxs)(nT,{$scrollable:!0,as:hw.div,variants:$E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},children:[(0,la.jsx)(aT,{children:"How it works"}),(0,la.jsx)(sT,{children:"From idea to launch."}),(0,la.jsx)(hw.div,{variants:IE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.3},children:(0,la.jsx)(xT,{children:FE.map((e=>(0,la.jsx)(hw.div,{variants:ME,children:(0,la.jsxs)(wT,{children:[(0,la.jsx)(kT,{children:e.number}),(0,la.jsxs)(jT,{children:[(0,la.jsx)(ST,{children:e.title}),(0,la.jsx)(CT,{children:e.body})]})]})},e.number)))})})]}),(0,la.jsx)(rT,{as:hw.div,variants:RE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},"aria-hidden":"true",children:(0,la.jsxs)(ET,{children:[(0,la.jsx)(TT,{children:"// skill_matrix.exe"}),(0,la.jsx)(PT,{children:DE.map(((e,t)=>{const n=e.Icon;return(0,la.jsxs)(OT,{$color:e.color,$glow:e.glow,$delay:.08*t+"s",children:[(0,la.jsxs)($T,{children:[(0,la.jsx)(AT,{children:e.label}),(0,la.jsx)(zT,{$color:e.color,$fill:e.glow})]}),(0,la.jsx)(RT,{$color:e.color,children:(0,la.jsx)(n,{size:46})})]},e.label)}))})]})})]})}),(0,la.jsxs)(JT,{children:[(0,la.jsxs)(QT,{children:[(0,la.jsx)(ZT,{$active:0===i,onClick:()=>l(0),children:"Process"}),(0,la.jsx)(ZT,{$active:1===i,onClick:()=>l(1),children:"Skills"}),(0,la.jsx)(eP,{$index:i})]}),(0,la.jsx)(vh,{mode:"wait",initial:!1,children:(0,la.jsx)(tP,{initial:{x:44*a,opacity:0,scale:.94,rotateY:10*a,filter:"blur(14px)",transformPerspective:900},animate:{x:0,opacity:1,scale:1,rotateY:0,filter:"blur(0px)",transformPerspective:900,transition:{duration:.6,ease:[.16,1,.3,1],opacity:{duration:.22,ease:"easeOut"},filter:{duration:.45,ease:[.16,1,.3,1]},rotateY:{duration:.6,ease:[.16,1,.3,1]},scale:{duration:.6,ease:[.16,1,.3,1]}}},exit:{x:-44*a,opacity:0,scale:.94,rotateY:-10*a,filter:"blur(14px)",transformPerspective:900,transition:{duration:.2,ease:[.55,0,1,.45]}},drag:"x",dragConstraints:{left:0,right:0},dragElastic:.08,onDragEnd:(e,t)=>{t.offset.x<-50&&0===i&&l(1),t.offset.x>50&&1===i&&l(0)},children:0===i?(0,la.jsxs)(la.Fragment,{children:[(0,la.jsx)(aT,{children:"How it works"}),(0,la.jsx)(sT,{children:"From idea to launch."}),(0,la.jsx)(xT,{style:{gridTemplateColumns:"1fr"},children:FE.map((e=>(0,la.jsx)(hw.div,{variants:ME,initial:"hidden",animate:"visible",children:(0,la.jsxs)(wT,{children:[(0,la.jsx)(kT,{children:e.number}),(0,la.jsxs)(jT,{children:[(0,la.jsx)(ST,{children:e.title}),(0,la.jsx)(CT,{children:e.body})]})]})},e.number)))})]}):(0,la.jsxs)(la.Fragment,{children:[(0,la.jsx)(aT,{children:"Tech stack"}),(0,la.jsx)(sT,{children:"Tools I use."}),(0,la.jsxs)(ET,{children:[(0,la.jsx)(TT,{children:"// skill_matrix.exe"}),(0,la.jsx)(PT,{as:hw.div,variants:IE,initial:"hidden",animate:"visible",children:DE.map(((e,t)=>{const n=e.Icon;return(0,la.jsx)(hw.div,{variants:ME,children:(0,la.jsxs)(OT,{$color:e.color,$glow:e.glow,$delay:.08*t+"s",tabIndex:0,children:[(0,la.jsxs)($T,{children:[(0,la.jsx)(AT,{children:e.label}),(0,la.jsx)(zT,{$color:e.color,$fill:e.glow})]}),(0,la.jsx)(RT,{$color:e.color,children:(0,la.jsx)(n,{size:46})})]})},e.label)}))})]})]})},i)}),(0,la.jsxs)(nP,{children:[(0,la.jsx)(rP,{$active:0===i,onClick:()=>l(0),"aria-label":"Process tab"}),(0,la.jsx)(rP,{$active:1===i,onClick:()=>l(1),"aria-label":"Skills tab"})]})]})]})}),(0,la.jsx)(ZE,{id:"values",ref:c(3),"aria-label":"Work philosophy",children:(0,la.jsx)(eT,{children:(0,la.jsxs)(tT,{$reverse:!0,$mobileOverlay:!0,$mobileMinH:"min(115vw, 680px)",children:[(0,la.jsxs)(nT,{$textOverlay:!0,as:hw.div,variants:IE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.35},children:[(0,la.jsxs)(hw.div,{variants:$E,children:[(0,la.jsx)(aT,{children:"How I work"}),(0,la.jsx)(sT,{style:{marginBottom:"1.75rem"},children:"Why I do this differently."})]}),(0,la.jsx)(_T,{children:NE.map((e=>{const t=e.icon;return(0,la.jsx)(hw.div,{variants:LE,children:(0,la.jsxs)(IT,{children:[(0,la.jsx)(MT,{}),(0,la.jsx)(LT,{"aria-hidden":"true",children:(0,la.jsx)(t,{size:18})}),(0,la.jsx)(DT,{children:e.title}),(0,la.jsx)(NT,{children:e.body})]})},e.title)}))})]}),(0,la.jsx)(rT,{$photo:!0,as:hw.div,variants:RE,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.4},"aria-hidden":"true",children:(0,la.jsx)(yT,{$mirror:!0,children:(0,la.jsx)("img",{src:"images/big2.jpg",alt:""})})})]})})}),(0,la.jsxs)(ZE,{id:"cta",ref:c(4),"aria-label":"Call to action",children:[(0,la.jsx)(FT,{"aria-hidden":"true"}),(0,la.jsx)(VT,{children:(0,la.jsxs)(UT,{children:[(0,la.jsxs)(hw.div,{variants:_E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.5},transition:{delay:0},children:[(0,la.jsx)(aT,{style:{marginBottom:"0.5rem"},children:"Let's work together"}),(0,la.jsx)(BT,{})]}),(0,la.jsx)(hw.div,{variants:_E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.5},transition:{delay:.1},children:(0,la.jsx)(HT,{children:"Ready to build something?"})}),(0,la.jsx)(hw.div,{variants:_E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.5},transition:{delay:.2},children:(0,la.jsx)(qT,{children:"Whether you have a full brief or just a rough idea, let's talk. I'll tell you what's possible and how we can get started."})}),(0,la.jsx)(hw.div,{variants:_E,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.5},transition:{delay:.3},children:(0,la.jsxs)(WT,{children:[(0,la.jsxs)(XT,{to:"/contact",children:["Get in touch",(0,la.jsx)(Vf,{"aria-hidden":"true"})]}),(0,la.jsxs)(KT,{to:"/portfolio",children:["See my work",(0,la.jsx)(Vf,{"aria-hidden":"true"})]})]})})]})})]})]})]})},oP=e=>{let{loadingText:t="Loading Application",statusText:n="Initializing components..."}=e;return(0,la.jsxs)("div",{className:"loading-container",children:[(0,la.jsxs)("div",{className:"glass-card",children:[(0,la.jsxs)("div",{className:"loader-wrapper",children:[(0,la.jsx)("div",{className:"loading-ring"}),(0,la.jsx)("div",{className:"logo-inner",children:(0,la.jsx)("img",{className:"logo-image",src:"images/mainwlogo.png",alt:"Company Logo"})})]}),(0,la.jsxs)("div",{className:"text-content",children:[(0,la.jsx)("h1",{className:"loading-text",children:t}),(0,la.jsxs)("div",{className:"progress-wrapper",children:[(0,la.jsx)("div",{className:"progress-bar",children:(0,la.jsx)("div",{className:"progress-line"})}),(0,la.jsx)("p",{className:"status-text",children:n})]})]})]}),(0,la.jsx)("style",{jsx:!0,children:"\n        @keyframes ringRotate {\n          0% { transform: rotate(0deg); border-top-color: #00bfff; }\n          50% { border-top-color: #f7ab0a; }\n          100% { transform: rotate(360deg); border-top-color: #00bfff; }\n        }\n        \n        @keyframes logoBreathe {\n          0%, 100% { transform: scale(1); opacity: 0.9; }\n          50% { transform: scale(1.05); opacity: 1; }\n        }\n        \n        @keyframes progressFlow {\n          0% { left: -100%; }\n          100% { left: 100%; }\n        }\n        \n        @keyframes fadeInUp {\n          from { opacity: 0; transform: translateY(20px); }\n          to { opacity: 1; transform: translateY(0); }\n        }\n\n        .loading-container {\n          position: fixed;\n          inset: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          background-image:\n            linear-gradient(rgba(20, 20, 30, 0.75), rgba(20, 20, 30, 0.75)),\n            url('images/mainbg.jpg');\n          background-size: cover;\n          background-position: center;\n          overflow: hidden;\n          z-index: 9999;\n          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\n        }\n\n\n        .glass-card {\n          position: relative;\n          z-index: 2;\n          background: rgba(255, 255, 255, 0.03);\n          backdrop-filter: blur(20px);\n          border: 1px solid rgba(255, 255, 255, 0.08);\n          border-radius: 40px;\n          padding: 4rem;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          gap: 2.5rem;\n          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);\n          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n\n        .loader-wrapper {\n          position: relative;\n          width: 140px;\n          height: 140px;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        .loading-ring {\n          position: absolute;\n          inset: 0;\n          border: 3px solid rgba(255, 255, 255, 0.05);\n          border-top: 3px solid #00bfff;\n          border-radius: 50%;\n          animation: ringRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n        }\n\n        .logo-inner {\n          width: 70px;\n          height: 70px;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          animation: logoBreathe 3s ease-in-out infinite;\n        }\n\n        .logo-image {\n          width: 100%;\n          height: 100%;\n          object-fit: contain;\n          filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.3));\n        }\n\n        .text-content {\n          text-align: center;\n          display: flex;\n          flex-direction: column;\n          gap: 1.5rem;\n        }\n\n        .loading-text {\n          color: white;\n          font-size: 1.75rem;\n          font-weight: 600;\n          letter-spacing: -0.02em;\n          margin: 0;\n          background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.7));\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n        }\n\n        .progress-wrapper {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          gap: 0.75rem;\n        }\n\n        .progress-bar {\n          width: 200px;\n          height: 3px;\n          background: rgba(255, 255, 255, 0.05);\n          border-radius: 10px;\n          overflow: hidden;\n          position: relative;\n        }\n\n        .progress-line {\n          position: absolute;\n          height: 100%;\n          width: 40%;\n          background: linear-gradient(90deg, transparent, #00bfff, transparent);\n          animation: progressFlow 2s linear infinite;\n        }\n\n        .status-text {\n          color: rgba(255, 255, 255, 0.4);\n          font-size: 0.9rem;\n          font-weight: 400;\n          margin: 0;\n          letter-spacing: 0.02em;\n          text-transform: uppercase;\n        }\n\n      "})]})},aP=(function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];var o=ye.apply(void 0,[t].concat(r)),a="sc-global-"+je(JSON.stringify(o)),s=new Re(o,a);function l(t){var n=ae(),r=se(),i=(0,e.useContext)(Oe),o=(0,e.useRef)(n.allocateGSInstance(a)).current;return n.server&&c(o,t,n,i,r),(0,e.useLayoutEffect)((function(){if(!n.server)return c(o,t,n,i,r),function(){return s.removeStyles(o,n)}}),[o,t,n,i,r]),null}function c(e,t,n,r,i){if(s.isStatic)s.renderStyles(e,S,n,i);else{var o=p({},t,{theme:be(t,r,l.defaultProps)});s.renderStyles(e,o,n,i)}}return e.memo(l)})`
  /*
   * Minimal global overrides — typography, spacing, and color tokens
   * live in index.css. This only handles layout concerns for the app shell.
   */
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  * {
    box-sizing: border-box;
    max-width: 100%;
  }

  /* Ensure all headings use the display font set in index.css */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  }
`;function sP(){const[t,n]=(0,e.useState)(!1),[r,i]=(0,e.useState)(""),[o,a]=(0,e.useState)(!0),[s,l]=(0,e.useState)(!1),c=Jo();(0,e.useEffect)((()=>{l(!1)}),[c.pathname]);return(0,e.useEffect)((()=>{if(o)return void a(!1);if(c.pathname.startsWith("/post/")||c.pathname.startsWith("/project/"))return;n(!0),i((e=>{const t=e.split("?")[0].replace(/\/$/,"").toLowerCase()||"/";switch(t){case"/":case"/home":return{title:"Loading Home",status:"Preparing workspace..."};case"/blog":return{title:"Loading Blog",status:"Fetching articles..."};case"/portfolio":return{title:"Loading Portfolio",status:"Showcasing projects..."};case"/contact":return{title:"Loading Contact",status:"Let's communicate..."};case"/about":return{title:"About Me",status:"Loading..."};case"/get-started":return{title:"Start a Project",status:"Preparing your intake form..."};default:return t.startsWith("/post/")?{title:"Loading Article",status:"Retrieving content..."}:t.startsWith("/project/")?{title:"Loading Project",status:"Fetching project details..."}:{title:"Loading Page",status:"Preparing content..."}}})(c.pathname));const e=setTimeout((()=>{n(!1)}),1e3);return()=>clearTimeout(e)}),[c.pathname,o]),t?(0,la.jsx)(oP,{loadingText:r.title,statusText:r.status}):(0,la.jsxs)(lP,{children:[(0,la.jsx)(xa,{}),(0,la.jsx)(dP,{$open:s,onClick:()=>l(!1)}),(0,la.jsx)(Ta,{open:s,onClose:()=>l(!1)}),(0,la.jsxs)(fP,{$open:s,onClick:()=>l((e=>!e)),"aria-label":s?"Close navigation menu":"Open navigation menu","aria-expanded":s,"aria-controls":"mobile-sidebar",children:[(0,la.jsx)("span",{}),(0,la.jsx)("span",{}),(0,la.jsx)("span",{})]}),(0,la.jsx)(cP,{children:(0,la.jsxs)(Ko,{children:[(0,la.jsx)(Bo,{exact:!0,path:"/",component:fl}),(0,la.jsx)(Bo,{path:"/home",component:fl}),(0,la.jsx)(Bo,{path:"/blog",component:Dp}),(0,la.jsx)(Bo,{path:"/portfolio",render:()=>(0,la.jsx)(uP,{children:(0,la.jsx)(ak,{})})}),(0,la.jsx)(Bo,{path:"/contact",component:lj}),(0,la.jsx)(Bo,{path:"/about",component:iP}),(0,la.jsx)(Bo,{path:"/get-started",component:jS}),(0,la.jsx)(Bo,{path:"/post/:slug",component:OS}),(0,la.jsx)(Bo,{path:"/project/:slug",component:TC})]})})]})}const lP=Ie.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`,cP=Ie.main`
  flex: 1;
  width: 100%;
  position: relative;
`,uP=Ie.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
`,dP=Ie.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1299;
    background: rgba(0, 0, 0, 0.55);
    opacity: ${e=>{let{$open:t}=e;return t?1:0}};
    pointer-events: ${e=>{let{$open:t}=e;return t?"auto":"none"}};
    transition: opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  }
`,fP=Ie.button`
  /* Hidden on desktop — desktop nav links are always visible */
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 10px;
    right: 12px;
    width: 44px;
    height: 44px;
    padding: 12px 10px;
    background: rgba(10, 12, 22, 0.65);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    cursor: pointer;
    z-index: 1400;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    transition:
      background 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;

    &:hover {
      background: rgba(14, 165, 233, 0.15);
      border-color: rgba(14, 165, 233, 0.45);
      box-shadow: 0 4px 20px rgba(14, 165, 233, 0.18);
    }
  }

  span {
    display: block;
    width: 1.5rem;
    height: 2px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    transform-origin: center center;
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity   0.3s cubic-bezier(0.4, 0, 0.2, 1),
      width     0.3s cubic-bezier(0.4, 0, 0.2, 1);

    /* Shorter middle bar for a subtle staggered look */
    &:nth-child(2) {
      width: ${e=>{let{$open:t}=e;return t?"1.5rem":"1.1rem"}};
      align-self: flex-end;
      opacity: ${e=>{let{$open:t}=e;return t?0:1}};
    }

    &:nth-child(1) {
      transform: ${e=>{let{$open:t}=e;return t?"translateY(9px) rotate(45deg)":"none"}};
    }

    &:nth-child(3) {
      transform: ${e=>{let{$open:t}=e;return t?"translateY(-9px) rotate(-45deg)":"none"}};
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
    border-radius: 10px;
  }
`,pP=function(){return(0,la.jsxs)(Zo,{children:[(0,la.jsx)(aP,{}),(0,la.jsx)(sP,{})]})};t.render((0,la.jsx)(e.StrictMode,{children:(0,la.jsx)(Es,{children:(0,la.jsx)(pP,{})})}),document.getElementById("root"))})()})();
//# sourceMappingURL=main.7446e2a5.js.map