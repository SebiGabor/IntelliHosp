(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=window,Yt=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Gt=Symbol(),de=new WeakMap;let Ve=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==Gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(Yt&&t===void 0){const o=r!==void 0&&r.length===1;o&&(t=de.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&de.set(r,t))}return t}toString(){return this.cssText}};const cr=e=>new Ve(typeof e=="string"?e:e+"",void 0,Gt),gt=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new Ve(r,e,Gt)},hr=(e,t)=>{Yt?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{const o=document.createElement("style"),s=lt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,e.appendChild(o)})},ce=Yt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const o of t.cssRules)r+=o.cssText;return cr(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var At;const ct=window,he=ct.trustedTypes,ur=he?he.emptyScript:"",ue=ct.reactiveElementPolyfillSupport,It={toAttribute(e,t){switch(t){case Boolean:e=e?ur:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},je=(e,t)=>t!==e&&(t==t||e==e),Et={attribute:!0,type:String,converter:It,reflect:!1,hasChanged:je};let O=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var r;this.finalize(),((r=this.h)!==null&&r!==void 0?r:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((r,o)=>{const s=this._$Ep(o,r);s!==void 0&&(this._$Ev.set(s,o),t.push(s))}),t}static createProperty(t,r=Et){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(t,r),!r.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,o,r);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,r,o){return{get(){return this[r]},set(s){const i=this[t];this[r]=s,this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Et}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const r=this.properties,o=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(const s of o)this.createProperty(s,r[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)r.unshift(ce(s))}else t!==void 0&&r.push(ce(t));return r}static _$Ep(t,r){const o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(r=>r(this))}addController(t){var r,o;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var t;const r=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return hr(r,this.constructor.elementStyles),r}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostConnected)===null||o===void 0?void 0:o.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostDisconnected)===null||o===void 0?void 0:o.call(r)})}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$EO(t,r,o=Et){var s;const i=this.constructor._$Ep(t,o);if(i!==void 0&&o.reflect===!0){const n=(((s=o.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?o.converter:It).toAttribute(r,o.type);this._$El=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$El=null}}_$AK(t,r){var o;const s=this.constructor,i=s._$Ev.get(t);if(i!==void 0&&this._$El!==i){const n=s.getPropertyOptions(i),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?n.converter:It;this._$El=i,this[i]=c.fromAttribute(r,n.type),this._$El=null}}requestUpdate(t,r,o){let s=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||je)(this[t],r)?(this._$AL.has(t)||this._$AL.set(t,r),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,i)=>this[i]=s),this._$Ei=void 0);let r=!1;const o=this._$AL;try{r=this.shouldUpdate(o),r?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var i;return(i=s.hostUpdate)===null||i===void 0?void 0:i.call(s)}),this.update(o)):this._$Ek()}catch(s){throw r=!1,this._$Ek(),s}r&&this._$AE(o)}willUpdate(t){}_$AE(t){var r;(r=this._$ES)===null||r===void 0||r.forEach(o=>{var s;return(s=o.hostUpdated)===null||s===void 0?void 0:s.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((r,o)=>this._$EO(o,this[o],r)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};O.finalized=!0,O.elementProperties=new Map,O.elementStyles=[],O.shadowRootOptions={mode:"open"},ue?.({ReactiveElement:O}),((At=ct.reactiveElementVersions)!==null&&At!==void 0?At:ct.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xt;const ht=window,M=ht.trustedTypes,pe=M?M.createPolicy("lit-html",{createHTML:e=>e}):void 0,Dt="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,Fe="?"+A,pr=`<${Fe}>`,H=document,G=()=>H.createComment(""),X=e=>e===null||typeof e!="object"&&typeof e!="function",qe=Array.isArray,vr=e=>qe(e)||typeof e?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,fe=/>/g,C=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ge=/"/g,We=/^(?:script|style|textarea|title)$/i,fr=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),Q=fr(1),B=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),me=new WeakMap,T=H.createTreeWalker(H,129,null,!1),br=(e,t)=>{const r=e.length-1,o=[];let s,i=t===2?"<svg>":"",n=q;for(let a=0;a<r;a++){const l=e[a];let u,d,p=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===q?d[1]==="!--"?n=ve:d[1]!==void 0?n=fe:d[2]!==void 0?(We.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=C):d[3]!==void 0&&(n=C):n===C?d[0]===">"?(n=s??q,p=-1):d[1]===void 0?p=-2:(p=n.lastIndex-d[2].length,u=d[1],n=d[3]===void 0?C:d[3]==='"'?ge:be):n===ge||n===be?n=C:n===ve||n===fe?n=q:(n=C,s=void 0);const _=n===C&&e[a+1].startsWith("/>")?" ":"";i+=n===q?l+pr:p>=0?(o.push(u),l.slice(0,p)+Dt+l.slice(p)+A+_):l+A+(p===-2?(o.push(void 0),a):_)}const c=i+(e[r]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[pe!==void 0?pe.createHTML(c):c,o]};let Vt=class Ke{constructor({strings:t,_$litType$:r},o){let s;this.parts=[];let i=0,n=0;const c=t.length-1,a=this.parts,[l,u]=br(t,r);if(this.el=Ke.createElement(l,o),T.currentNode=this.el.content,r===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(s=T.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const d=[];for(const p of s.getAttributeNames())if(p.endsWith(Dt)||p.startsWith(A)){const m=u[n++];if(d.push(p),m!==void 0){const _=s.getAttribute(m.toLowerCase()+Dt).split(A),it=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:it[2],strings:_,ctor:it[1]==="."?mr:it[1]==="?"?$r:it[1]==="@"?yr:mt})}else a.push({type:6,index:i})}for(const p of d)s.removeAttribute(p)}if(We.test(s.tagName)){const d=s.textContent.split(A),p=d.length-1;if(p>0){s.textContent=M?M.emptyScript:"";for(let m=0;m<p;m++)s.append(d[m],G()),T.nextNode(),a.push({type:2,index:++i});s.append(d[p],G())}}}else if(s.nodeType===8)if(s.data===Fe)a.push({type:2,index:i});else{let d=-1;for(;(d=s.data.indexOf(A,d+1))!==-1;)a.push({type:7,index:i}),d+=A.length-1}i++}}static createElement(t,r){const o=H.createElement("template");return o.innerHTML=t,o}};function I(e,t,r=e,o){var s,i,n,c;if(t===B)return t;let a=o!==void 0?(s=r._$Co)===null||s===void 0?void 0:s[o]:r._$Cl;const l=X(t)?void 0:t._$litDirective$;return a?.constructor!==l&&((i=a?._$AO)===null||i===void 0||i.call(a,!1),l===void 0?a=void 0:(a=new l(e),a._$AT(e,r,o)),o!==void 0?((n=(c=r)._$Co)!==null&&n!==void 0?n:c._$Co=[])[o]=a:r._$Cl=a),a!==void 0&&(t=I(e,a._$AS(e,t.values),a,o)),t}let gr=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var r;const{el:{content:o},parts:s}=this._$AD,i=((r=t?.creationScope)!==null&&r!==void 0?r:H).importNode(o,!0);T.currentNode=i;let n=T.nextNode(),c=0,a=0,l=s[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new Xt(n,n.nextSibling,this,t):l.type===1?u=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(u=new wr(n,this,t)),this._$AV.push(u),l=s[++a]}c!==l?.index&&(n=T.nextNode(),c++)}return i}v(t){let r=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}},Xt=class Ze{constructor(t,r,o,s){var i;this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=s,this._$Cp=(i=s?.isConnected)===null||i===void 0||i}get _$AU(){var t,r;return(r=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&r!==void 0?r:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=I(this,t,r),X(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==B&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):vr(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==g&&X(this._$AH)?this._$AA.nextSibling.data=t:this.$(H.createTextNode(t)),this._$AH=t}g(t){var r;const{values:o,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Vt.createElement(s.h,this.options)),s);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===i)this._$AH.v(o);else{const n=new gr(i,this),c=n.u(this.options);n.v(o),this.$(c),this._$AH=n}}_$AC(t){let r=me.get(t.strings);return r===void 0&&me.set(t.strings,r=new Vt(t)),r}T(t){qe(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let o,s=0;for(const i of t)s===r.length?r.push(o=new Ze(this.k(G()),this.k(G()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,r);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var r;this._$AM===void 0&&(this._$Cp=t,(r=this._$AP)===null||r===void 0||r.call(this,t))}},mt=class{constructor(t,r,o,s,i){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=g}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,r=this,o,s){const i=this.strings;let n=!1;if(i===void 0)t=I(this,t,r,0),n=!X(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const c=t;let a,l;for(t=i[0],a=0;a<i.length-1;a++)l=I(this,c[o+a],r,a),l===B&&(l=this._$AH[a]),n||(n=!X(l)||l!==this._$AH[a]),l===g?t=g:t!==g&&(t+=(l??"")+i[a+1]),this._$AH[a]=l}n&&!s&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mr=class extends mt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}};const _r=M?M.emptyScript:"";let $r=class extends mt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==g?this.element.setAttribute(this.name,_r):this.element.removeAttribute(this.name)}};class yr extends mt{constructor(t,r,o,s,i){super(t,r,o,s,i),this.type=5}_$AI(t,r=this){var o;if((t=(o=I(this,t,r,0))!==null&&o!==void 0?o:g)===B)return;const s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r,o;typeof this._$AH=="function"?this._$AH.call((o=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}let wr=class{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}};const _e=ht.litHtmlPolyfillSupport;_e?.(Vt,Xt),((xt=ht.litHtmlVersions)!==null&&xt!==void 0?xt:ht.litHtmlVersions=[]).push("2.7.2");const Ar=(e,t,r)=>{var o,s;const i=(o=r?.renderBefore)!==null&&o!==void 0?o:t;let n=i._$litPart$;if(n===void 0){const c=(s=r?.renderBefore)!==null&&s!==void 0?s:null;i._$litPart$=n=new Xt(t.insertBefore(G(),c),c,void 0,r??{})}return n._$AI(e),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var St,kt;let P=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,r;const o=super.createRenderRoot();return(t=(r=this.renderOptions).renderBefore)!==null&&t!==void 0||(r.renderBefore=o.firstChild),o}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ar(r,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return B}};P.finalized=!0,P._$litElement$=!0,(St=globalThis.litElementHydrateSupport)===null||St===void 0||St.call(globalThis,{LitElement:P});const $e=globalThis.litElementPolyfillSupport;$e?.({LitElement:P});((kt=globalThis.litElementVersions)!==null&&kt!==void 0?kt:globalThis.litElementVersions=[]).push("3.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt=e=>t=>typeof t=="function"?((r,o)=>(customElements.define(r,o),o))(e,t):((r,o)=>{const{kind:s,elements:i}=o;return{kind:s,elements:i,finisher(n){customElements.define(r,n)}}})(e,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Er=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function te(e){return(t,r)=>r!==void 0?((o,s,i)=>{s.constructor.createProperty(i,o)})(e,t,r):Er(e,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Pt;((Pt=window.HTMLSlotElement)===null||Pt===void 0?void 0:Pt.prototype.assignedElements)!=null;const xr="modulepreload",Cr=function(e){return"/"+e},ye={},Je=function(t,r,o){if(!r||r.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(r.map(i=>{if(i=Cr(i),i in ye)return;ye[i]=!0;const n=i.endsWith(".css"),c=n?'[rel="stylesheet"]':"";if(!!o)for(let u=s.length-1;u>=0;u--){const d=s[u];if(d.href===i&&(!n||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const l=document.createElement("link");if(l.rel=n?"stylesheet":xr,n||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),n)return new Promise((u,d)=>{l.addEventListener("load",u),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t()).catch(i=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i})},ee=Symbol.for("app-tools::log::1.x");globalThis[ee]={setDebug:Sr,debug:"window"in globalThis?new URL(window.location.href).searchParams.has("app-tools-debug"):!1};function Sr(e){globalThis[ee].debug=!!e}function kr(e,t){globalThis[ee].debug&&(console.groupCollapsed(`[app-tools] ${e}`),t&&console.log(t),console.groupEnd())}function Pr(e){return(t,r)=>{kr(`${e}: ${t}`,r)}}const w=Pr("router");class Ur extends Event{constructor(t){super("route-changed"),this.context=t}}class we extends EventTarget{context={params:{},query:{},title:"",url:new URL(window.location.href)};constructor(t){super(),this.config=t,this.routes=t.routes.map(r=>({...r,urlPattern:new URLPattern({pathname:r.path,baseURL:window.location.href,search:"*",hash:"*"})})),w("Initialized routes",this.routes),queueMicrotask(()=>{this.navigate(new URL(window.location.href))}),window.addEventListener("popstate",this._onPopState),window.addEventListener("click",this._onAnchorClick)}uninstall(){window.removeEventListener("popstate",this._onPopState),window.removeEventListener("click",this._onAnchorClick)}get url(){return new URL(window.location.href)}get fallback(){return new URL(this.config?.fallback||this.baseUrl.href.substring(window.location.origin.length),this.baseUrl)}get baseUrl(){return new URL("./",document.baseURI)}render(){return w(`Rendering route ${this.context.url.pathname}${this.context.url.search}${this.context.url.hash}`,{context:this.context,route:this.route}),this.route?.render?.(this.context)}_matchRoute(t){for(const r of this.routes){const o=r.urlPattern.exec(t);if(o){const{title:s}=r,i=Object.fromEntries(new URLSearchParams(t.search)),n=o?.pathname?.groups??{};return this.context={url:t,title:typeof s=="function"?s({params:n,query:i,url:t}):s,params:n,query:i},r}}return w(`No route matched for ${t.pathname}${t.search}${t.hash}`,t),null}_notifyUrlChanged(){this.dispatchEvent(new Ur(this.context))}_onPopState=()=>{this.navigate(new URL(window.location.href),{backNav:!0})};_onAnchorClick=t=>{if(t.defaultPrevented||t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey)return;const r=t.composedPath().find(i=>i.tagName==="A");if(!r||!r.href)return;const o=new URL(r.href);if(this.url.href===o.href||o.host!==window.location.host||r.hasAttribute("download")||r.href.includes("mailto:"))return;const s=r.getAttribute("target");s&&s!==""&&s!=="_self"||(t.preventDefault(),this.navigate(o))};_collectPlugins(t){return[...this.config?.plugins??[],...t?.plugins??[]]}async navigate(t,r={}){typeof t=="string"&&(t=new URL(t,this.baseUrl));let o=this._matchRoute(t)||this._matchRoute(this.fallback);w(`Navigating to ${t.pathname}${t.search}${t.hash}`,{context:this.context,route:this.route});let s=this._collectPlugins(o);for(const i of s)try{const n=await i?.shouldNavigate?.(this.context);n&&(await n.condition()||(t=new URL(n.redirect,this.baseUrl),o=this._matchRoute(t)||this._matchRoute(this.fallback),s=this._collectPlugins(o),w("Redirecting",{context:this.context,route:this.route})))}catch(n){throw w(`Plugin "${i.name}" error on shouldNavigate hook`,n),n}if(this.route=o,!this.route)throw new Error(`[ROUTER] No route or fallback matched for url ${t}`);for(const i of s)try{await i?.beforeNavigation?.(this.context)}catch(n){throw w(`Plugin "${i.name}" error on beforeNavigation hook`,n),n}r.backNav||window.history.pushState(null,"",`${t.pathname}${t.search}${t.hash}`),document.title=this.context.title,this._notifyUrlChanged();for(const i of s)try{await i?.afterNavigation?.(this.context)}catch(n){throw w(`Plugin "${i.name}" error on afterNavigation hook`,n),n}}}function Lr(e){return{name:"lazy",beforeNavigation:()=>{e()}}}globalThis.URLPattern||await Je(()=>import("./index-d961e0b8.js"),[]);const Or="/",L=new we({routes:[{path:ut(),title:"Home",render:()=>Q`<app-home></app-home>`},{path:ut("about"),title:"About",plugins:[Lr(()=>Je(()=>import("./app-about-54b3f4dd.js"),[]))],render:()=>Q`<app-about></app-about>`}]})??new we;function ut(e){var t=Or;return e&&(t=t+e),t}var dt=window,re=dt.ShadowRoot&&(dt.ShadyCSS===void 0||dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),Ae=new WeakMap,Ye=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(re&&t===void 0){const o=r!==void 0&&r.length===1;o&&(t=Ae.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Ae.set(r,t))}return t}toString(){return this.cssText}},Rr=e=>new Ye(typeof e=="string"?e:e+"",void 0,oe),ot=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new Ye(r,e,oe)},Nr=(e,t)=>{re?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{const o=document.createElement("style"),s=dt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,e.appendChild(o)})},Ee=re?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const o of t.cssRules)r+=o.cssText;return Rr(r)})(e):e,Ut,pt=window,xe=pt.trustedTypes,Tr=xe?xe.emptyScript:"",Ce=pt.reactiveElementPolyfillSupport,jt={toAttribute(e,t){switch(t){case Boolean:e=e?Tr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},Ge=(e,t)=>t!==e&&(t==t||e==e),Lt={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Ge},R=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,r)=>{const o=this._$Ep(r,t);o!==void 0&&(this._$Ev.set(o,r),e.push(o))}),e}static createProperty(e,t=Lt){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Lt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of r)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(Ee(o))}else e!==void 0&&t.push(Ee(e));return t}static _$Ep(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Nr(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$EO(e,t,r=Lt){var o;const s=this.constructor._$Ep(e,r);if(s!==void 0&&r.reflect===!0){const i=(((o=r.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?r.converter:jt).toAttribute(t,r.type);this._$El=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$El=null}}_$AK(e,t){var r;const o=this.constructor,s=o._$Ev.get(e);if(s!==void 0&&this._$El!==s){const i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:((r=i.converter)===null||r===void 0?void 0:r.fromAttribute)!==void 0?i.converter:jt;this._$El=s,this[s]=n.fromAttribute(t,i.type),this._$El=null}}requestUpdate(e,t,r){let o=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||Ge)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,r))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,s)=>this[s]=o),this._$Ei=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var s;return(s=o.hostUpdate)===null||s===void 0?void 0:s.call(o)}),this.update(r)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostUpdated)===null||o===void 0?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,r)=>this._$EO(r,this[r],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};R.finalized=!0,R.elementProperties=new Map,R.elementStyles=[],R.shadowRootOptions={mode:"open"},Ce?.({ReactiveElement:R}),((Ut=pt.reactiveElementVersions)!==null&&Ut!==void 0?Ut:pt.reactiveElementVersions=[]).push("1.6.1");var Ot,vt=window,D=vt.trustedTypes,Se=D?D.createPolicy("lit-html",{createHTML:e=>e}):void 0,E=`lit$${(Math.random()+"").slice(9)}$`,Xe="?"+E,zr=`<${Xe}>`,V=document,tt=(e="")=>V.createComment(e),et=e=>e===null||typeof e!="object"&&typeof e!="function",Qe=Array.isArray,Mr=e=>Qe(e)||typeof e?.[Symbol.iterator]=="function",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Pe=/>/g,S=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Le=/"/g,tr=/^(?:script|style|textarea|title)$/i,Hr=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),se=Hr(1),U=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Oe=new WeakMap,z=V.createTreeWalker(V,129,null,!1),Br=(e,t)=>{const r=e.length-1,o=[];let s,i=t===2?"<svg>":"",n=W;for(let a=0;a<r;a++){const l=e[a];let u,d,p=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===W?d[1]==="!--"?n=ke:d[1]!==void 0?n=Pe:d[2]!==void 0?(tr.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=S):d[3]!==void 0&&(n=S):n===S?d[0]===">"?(n=s??W,p=-1):d[1]===void 0?p=-2:(p=n.lastIndex-d[2].length,u=d[1],n=d[3]===void 0?S:d[3]==='"'?Le:Ue):n===Le||n===Ue?n=S:n===ke||n===Pe?n=W:(n=S,s=void 0);const _=n===S&&e[a+1].startsWith("/>")?" ":"";i+=n===W?l+zr:p>=0?(o.push(u),l.slice(0,p)+"$lit$"+l.slice(p)+E+_):l+E+(p===-2?(o.push(void 0),a):_)}const c=i+(e[r]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Se!==void 0?Se.createHTML(c):c,o]},ft=class{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let s=0,i=0;const n=e.length-1,c=this.parts,[a,l]=Br(e,t);if(this.el=ft.createElement(a,r),z.currentNode=this.el.content,t===2){const u=this.el.content,d=u.firstChild;d.remove(),u.append(...d.childNodes)}for(;(o=z.nextNode())!==null&&c.length<n;){if(o.nodeType===1){if(o.hasAttributes()){const u=[];for(const d of o.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(E)){const p=l[i++];if(u.push(d),p!==void 0){const m=o.getAttribute(p.toLowerCase()+"$lit$").split(E),_=/([.?@])?(.*)/.exec(p);c.push({type:1,index:s,name:_[2],strings:m,ctor:_[1]==="."?Dr:_[1]==="?"?jr:_[1]==="@"?Fr:$t})}else c.push({type:6,index:s})}for(const d of u)o.removeAttribute(d)}if(tr.test(o.tagName)){const u=o.textContent.split(E),d=u.length-1;if(d>0){o.textContent=D?D.emptyScript:"";for(let p=0;p<d;p++)o.append(u[p],tt()),z.nextNode(),c.push({type:2,index:++s});o.append(u[d],tt())}}}else if(o.nodeType===8)if(o.data===Xe)c.push({type:2,index:s});else{let u=-1;for(;(u=o.data.indexOf(E,u+1))!==-1;)c.push({type:7,index:s}),u+=E.length-1}s++}}static createElement(e,t){const r=V.createElement("template");return r.innerHTML=e,r}};function j(e,t,r=e,o){var s,i,n,c;if(t===U)return t;let a=o!==void 0?(s=r._$Co)===null||s===void 0?void 0:s[o]:r._$Cl;const l=et(t)?void 0:t._$litDirective$;return a?.constructor!==l&&((i=a?._$AO)===null||i===void 0||i.call(a,!1),l===void 0?a=void 0:(a=new l(e),a._$AT(e,r,o)),o!==void 0?((n=(c=r)._$Co)!==null&&n!==void 0?n:c._$Co=[])[o]=a:r._$Cl=a),a!==void 0&&(t=j(e,a._$AS(e,t.values),a,o)),t}var Ir=class{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:r},parts:o}=this._$AD,s=((t=e?.creationScope)!==null&&t!==void 0?t:V).importNode(r,!0);z.currentNode=s;let i=z.nextNode(),n=0,c=0,a=o[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new _t(i,i.nextSibling,this,e):a.type===1?l=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(l=new qr(i,this,e)),this.u.push(l),a=o[++c]}n!==a?.index&&(i=z.nextNode(),n++)}return s}p(e){let t=0;for(const r of this.u)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},_t=class{constructor(e,t,r,o){var s;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cm=(s=o?.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),et(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==U&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Mr(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==b&&et(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){var t;const{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ft.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.p(r);else{const i=new Ir(s,this),n=i.v(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let t=Oe.get(e.strings);return t===void 0&&Oe.set(e.strings,t=new ft(e)),t}k(e){Qe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const s of e)o===t.length?t.push(r=new _t(this.O(tt()),this.O(tt()),this,this.options)):r=t[o],r._$AI(s),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cm=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},$t=class{constructor(e,t,r,o,s){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,o){const s=this.strings;let i=!1;if(s===void 0)e=j(this,e,t,0),i=!et(e)||e!==this._$AH&&e!==U,i&&(this._$AH=e);else{const n=e;let c,a;for(e=s[0],c=0;c<s.length-1;c++)a=j(this,n[r+c],t,c),a===U&&(a=this._$AH[c]),i||(i=!et(a)||a!==this._$AH[c]),a===b?e=b:e!==b&&(e+=(a??"")+s[c+1]),this._$AH[c]=a}i&&!o&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends $t{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}},Vr=D?D.emptyScript:"",jr=class extends $t{constructor(){super(...arguments),this.type=4}j(e){e&&e!==b?this.element.setAttribute(this.name,Vr):this.element.removeAttribute(this.name)}},Fr=class extends $t{constructor(e,t,r,o,s){super(e,t,r,o,s),this.type=5}_$AI(e,t=this){var r;if((e=(r=j(this,e,t,0))!==null&&r!==void 0?r:b)===U)return;const o=this._$AH,s=e===b&&o!==b||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==b&&(o===b||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}},qr=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}},Re=vt.litHtmlPolyfillSupport;Re?.(ft,_t),((Ot=vt.litHtmlVersions)!==null&&Ot!==void 0?Ot:vt.litHtmlVersions=[]).push("2.6.1");var Wr=(e,t,r)=>{var o,s;const i=(o=r?.renderBefore)!==null&&o!==void 0?o:t;let n=i._$litPart$;if(n===void 0){const c=(s=r?.renderBefore)!==null&&s!==void 0?s:null;i._$litPart$=n=new _t(t.insertBefore(tt(),c),c,void 0,r??{})}return n._$AI(e),n},Rt,Nt,Y=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Wr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return U}};Y.finalized=!0,Y._$litElement$=!0,(Rt=globalThis.litElementHydrateSupport)===null||Rt===void 0||Rt.call(globalThis,{LitElement:Y});var Ne=globalThis.litElementPolyfillSupport;Ne?.({LitElement:Y});((Nt=globalThis.litElementVersions)!==null&&Nt!==void 0?Nt:globalThis.litElementVersions=[]).push("3.2.0");/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var yt=ot`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Kr=ot`
  ${yt}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,er=class{constructor(e,...t){this.slotNames=[],(this.host=e).addController(this),this.slotNames=t,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(e){const t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()}},Zr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Jr=e=>(...t)=>({_$litDirective$:e,values:t}),Yr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var rr=Jr(class extends Yr{constructor(e){var t;if(super(e),e.type!==Zr.ATTRIBUTE||e.name!=="class"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var r,o;if(this.nt===void 0){this.nt=new Set,e.strings!==void 0&&(this.st=new Set(e.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!(!((r=this.st)===null||r===void 0)&&r.has(i))&&this.nt.add(i);return this.render(t)}const s=e.element.classList;this.nt.forEach(i=>{i in t||(s.remove(i),this.nt.delete(i))});for(const i in t){const n=!!t[i];n===this.nt.has(i)||!((o=this.st)===null||o===void 0)&&o.has(i)||(n?(s.add(i),this.nt.add(i)):(s.remove(i),this.nt.delete(i)))}return U}});/*! Bundled license information:

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var or=Object.defineProperty,Gr=Object.defineProperties,Xr=Object.getOwnPropertyDescriptor,Qr=Object.getOwnPropertyDescriptors,Te=Object.getOwnPropertySymbols,to=Object.prototype.hasOwnProperty,eo=Object.prototype.propertyIsEnumerable,ze=(e,t,r)=>t in e?or(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,x=(e,t)=>{for(var r in t||(t={}))to.call(t,r)&&ze(e,r,t[r]);if(Te)for(var r of Te(t))eo.call(t,r)&&ze(e,r,t[r]);return e},st=(e,t)=>Gr(e,Qr(t)),h=(e,t,r,o)=>{for(var s=o>1?void 0:o?Xr(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&or(t,r,s),s},wt=e=>t=>typeof t=="function"?((r,o)=>(customElements.define(r,o),o))(e,t):((r,o)=>{const{kind:s,elements:i}=o;return{kind:s,elements:i,finisher(n){customElements.define(r,n)}}})(e,t),ro=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?st(x({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function f(e){return(t,r)=>r!==void 0?((o,s,i)=>{s.constructor.createProperty(i,o)})(e,t,r):ro(e,t)}function ie(e){return f(st(x({},e),{state:!0}))}var oo=({finisher:e,descriptor:t})=>(r,o)=>{var s;if(o===void 0){const i=(s=r.originalKey)!==null&&s!==void 0?s:r.key,n=t!=null?{kind:"method",placement:"prototype",key:i,descriptor:t(r.key)}:st(x({},r),{key:i});return e!=null&&(n.finisher=function(c){e(c,i)}),n}{const i=r.constructor;t!==void 0&&Object.defineProperty(r,o,t(o)),e?.(i,o)}};function so(e,t){return oo({descriptor:r=>{const o={get(){var s,i;return(i=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(e))!==null&&i!==void 0?i:null},enumerable:!0,configurable:!0};if(t){const s=typeof r=="symbol"?Symbol():"__"+r;o.get=function(){var i,n;return this[s]===void 0&&(this[s]=(n=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(e))!==null&&n!==void 0?n:null),this[s]}}return o}})}var Tt;((Tt=window.HTMLSlotElement)===null||Tt===void 0?void 0:Tt.prototype.assignedElements)!=null;var F=class extends Y{emit(e,t){const r=new CustomEvent(e,x({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(r),r}};h([f()],F.prototype,"dir",2);h([f()],F.prototype,"lang",2);/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var Ft=class extends F{constructor(){super(...arguments),this.hasSlotController=new er(this,"footer","header","image")}render(){return se`
      <div
        part="base"
        class=${rr({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Ft.styles=Kr;Ft=h([wt("sl-card")],Ft);var K=new WeakMap,Z=new WeakMap,zt=new WeakSet,nt=new WeakMap,io=class{constructor(e,t){(this.host=e).addController(this),this.options=x({form:r=>{if(r.hasAttribute("form")&&r.getAttribute("form")!==""){const o=r.getRootNode(),s=r.getAttribute("form");if(s)return o.getElementById(s)}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var o;return(o=r.disabled)!=null?o:!1},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0,setValue:(r,o)=>r.value=o,assumeInteractionOn:["sl-input"]},t),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this),this.handleInteraction=this.handleInteraction.bind(this)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),nt.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),nt.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,K.has(this.form)?K.get(this.form).add(this.host):K.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Z.has(this.form)||(Z.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())):this.form=void 0}detachForm(){var e;this.form&&((e=K.get(this.form))==null||e.delete(this.host),this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Z.has(this.form)&&(this.form.reportValidity=Z.get(this.form),Z.delete(this.form))),this.form=void 0}handleFormData(e){const t=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host),s=this.host.tagName.toLowerCase()==="sl-button";!t&&!s&&typeof r=="string"&&r.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(i=>{e.formData.append(r,i.toString())}):e.formData.append(r,o.toString()))}handleFormSubmit(e){var t;const r=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((t=K.get(this.form))==null||t.forEach(s=>{this.setUserInteracted(s,!0)})),this.form&&!this.form.noValidate&&!r&&!o(this.host)&&(e.preventDefault(),e.stopImmediatePropagation())}handleFormReset(){this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),nt.set(this.host,[])}handleInteraction(e){const t=nt.get(this.host);t.includes(e.type)||t.push(e.type),t.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)}reportFormValidity(){if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const t of e)if(typeof t.reportValidity=="function"&&!t.reportValidity())return!1}return!0}setUserInteracted(e,t){t?zt.add(e):zt.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const r=document.createElement("button");r.type=e,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",t&&(r.name=t.name,r.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{t.hasAttribute(o)&&r.setAttribute(o,t.getAttribute(o))})),this.form.append(r),r.click(),r.remove()}}getForm(){var e;return(e=this.form)!=null?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,r=!!zt.has(t),o=!!t.required;t.toggleAttribute("data-required",o),t.toggleAttribute("data-optional",!o),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&r),t.toggleAttribute("data-user-valid",e&&r)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e?.preventDefault()}},ne=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(st(x({},ne),{valid:!1,valueMissing:!0}));Object.freeze(st(x({},ne),{valid:!1,customError:!0}));var no=ot`
  ${yt}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,sr=Symbol.for(""),ao=e=>{if(e?.r===sr)return e?._$litStatic$},Me=(e,...t)=>({_$litStatic$:t.reduce((r,o,s)=>r+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[s+1],e[0]),r:sr}),He=new Map,lo=e=>(t,...r)=>{const o=r.length;let s,i;const n=[],c=[];let a,l=0,u=!1;for(;l<o;){for(a=t[l];l<o&&(i=r[l],(s=ao(i))!==void 0);)a+=s+t[++l],u=!0;c.push(i),n.push(a),l++}if(l===o&&n.push(t[o]),u){const d=n.join("$$lit$$");(t=He.get(d))===void 0&&(n.raw=n,He.set(d,t=n)),r=c}return e(t,...r)},Mt=lo(se);/*! Bundled license information:

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var y=e=>e??b;/*! Bundled license information:

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/var qt=new Set,co=new MutationObserver(ar),N=new Map,ir=document.documentElement.dir||"ltr",nr=document.documentElement.lang||navigator.language,k;co.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function ho(...e){e.map(t=>{const r=t.$code.toLowerCase();N.has(r)?N.set(r,Object.assign(Object.assign({},N.get(r)),t)):N.set(r,t),k||(k=t)}),ar()}function ar(){ir=document.documentElement.dir||"ltr",nr=document.documentElement.lang||navigator.language,[...qt.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var uo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){qt.add(this.host)}hostDisconnected(){qt.delete(this.host)}dir(){return`${this.host.dir||ir}`.toLowerCase()}lang(){return`${this.host.lang||nr}`.toLowerCase()}getTranslationData(e){var t,r;const o=new Intl.Locale(e),s=o?.language.toLowerCase(),i=(r=(t=o?.region)===null||t===void 0?void 0:t.toLowerCase())!==null&&r!==void 0?r:"",n=N.get(`${s}-${i}`),c=N.get(s);return{locale:o,language:s,region:i,primary:n,secondary:c}}exists(e,t){var r;const{primary:o,secondary:s}=this.getTranslationData((r=t.lang)!==null&&r!==void 0?r:this.lang());return t=Object.assign({includeFallback:!1},t),!!(o&&o[e]||s&&s[e]||t.includeFallback&&k&&k[e])}term(e,...t){const{primary:r,secondary:o}=this.getTranslationData(this.lang());let s;if(r&&r[e])s=r[e];else if(o&&o[e])s=o[e];else if(k&&k[e])s=k[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...t):s}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,t)}},lr=class extends uo{},po={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copy:"Copy",currentValue:"Current value",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};ho(po);function ae(e,t){const r=x({waitUntilFirstUpdate:!1},t);return(o,s)=>{const{update:i}=o,n=Array.isArray(e)?e:[e];o.update=function(c){n.forEach(a=>{const l=a;if(c.has(l)){const u=c.get(l),d=this[l];u!==d&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,d)}}),i.call(this,c)}}}var v=class extends F{constructor(){super(...arguments),this.formControlController=new io(this,{form:e=>{if(e.hasAttribute("form")){const t=e.getRootNode(),r=e.getAttribute("form");return t.getElementById(r)}return e.closest("form")},assumeInteractionOn:["click"]}),this.hasSlotController=new er(this,"[default]","prefix","suffix"),this.localize=new lr(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:ne}get validationMessage(){return this.isButton()?this.button.validationMessage:""}connectedCallback(){super.connectedCallback(),this.handleHostClick=this.handleHostClick.bind(this),this.addEventListener("click",this.handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick)}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleHostClick(e){(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){const e=this.isLink(),t=e?Me`a`:Me`button`;return Mt`
      <${t}
        part="base"
        class=${rr({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${y(e?void 0:this.disabled)}
        type=${y(e?void 0:this.type)}
        title=${this.title}
        name=${y(e?void 0:this.name)}
        value=${y(e?void 0:this.value)}
        href=${y(e?this.href:void 0)}
        target=${y(e?this.target:void 0)}
        download=${y(e?this.download:void 0)}
        rel=${y(e?this.rel:void 0)}
        role=${y(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Mt` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Mt`<sl-spinner></sl-spinner>`:""}
      </${t}>
    `}};v.styles=no;h([so(".button")],v.prototype,"button",2);h([ie()],v.prototype,"hasFocus",2);h([ie()],v.prototype,"invalid",2);h([f()],v.prototype,"title",2);h([f({reflect:!0})],v.prototype,"variant",2);h([f({reflect:!0})],v.prototype,"size",2);h([f({type:Boolean,reflect:!0})],v.prototype,"caret",2);h([f({type:Boolean,reflect:!0})],v.prototype,"disabled",2);h([f({type:Boolean,reflect:!0})],v.prototype,"loading",2);h([f({type:Boolean,reflect:!0})],v.prototype,"outline",2);h([f({type:Boolean,reflect:!0})],v.prototype,"pill",2);h([f({type:Boolean,reflect:!0})],v.prototype,"circle",2);h([f()],v.prototype,"type",2);h([f()],v.prototype,"name",2);h([f()],v.prototype,"value",2);h([f()],v.prototype,"href",2);h([f()],v.prototype,"target",2);h([f()],v.prototype,"rel",2);h([f()],v.prototype,"download",2);h([f()],v.prototype,"form",2);h([f({attribute:"formaction"})],v.prototype,"formAction",2);h([f({attribute:"formenctype"})],v.prototype,"formEnctype",2);h([f({attribute:"formmethod"})],v.prototype,"formMethod",2);h([f({attribute:"formnovalidate",type:Boolean})],v.prototype,"formNoValidate",2);h([f({attribute:"formtarget"})],v.prototype,"formTarget",2);h([ae("disabled",{waitUntilFirstUpdate:!0})],v.prototype,"handleDisabledChange",1);v=h([wt("sl-button")],v);var vo=ot`
  ${yt}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,Wt=class extends F{constructor(){super(...arguments),this.localize=new lr(this)}render(){return se`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Wt.styles=vo;Wt=h([wt("sl-spinner")],Wt);var Kt="";function Be(e){Kt=e}function fo(e=""){if(!Kt){const t=[...document.getElementsByTagName("script")],r=t.find(o=>o.hasAttribute("data-shoelace"));if(r)Be(r.getAttribute("data-shoelace"));else{const o=t.find(i=>/shoelace(\.min)?\.js($|\?)/.test(i.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(i.src));let s="";o&&(s=o.getAttribute("src")),Be(s.split("/").slice(0,-1).join("/"))}}return Kt.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var bo={name:"default",resolver:e=>fo(`assets/icons/${e}.svg`)},go=bo,Ie={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},mo={name:"system",resolver:e=>e in Ie?`data:image/svg+xml,${encodeURIComponent(Ie[e])}`:""},_o=mo,$o=[go,_o],Zt=[];function yo(e){Zt.push(e)}function wo(e){Zt=Zt.filter(t=>t!==e)}function De(e){return $o.find(t=>t.name===e)}var Ao=ot`
  ${yt}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,J=Symbol(),at=Symbol(),Ht,Bt=new Map,$=class extends F{constructor(){super(...arguments),this.svg=null,this.label="",this.library="default"}static async resolveIcon(e){var t;let r;try{if(r=await fetch(e,{mode:"cors"}),!r.ok)return r.status===410?J:at}catch{return at}try{const o=document.createElement("div");o.innerHTML=await r.text();const s=o.firstElementChild;if(((t=s?.tagName)==null?void 0:t.toLowerCase())!=="svg")return J;Ht||(Ht=new DOMParser);const n=Ht.parseFromString(s.outerHTML,"text/html").body.querySelector("svg");return n?(n.part.add("svg"),document.adoptNode(n)):J}catch{return J}}connectedCallback(){super.connectedCallback(),yo(this)}firstUpdated(){this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),wo(this)}getUrl(){const e=De(this.library);return this.name&&e?e.resolver(this.name):this.src}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const t=De(this.library),r=this.getUrl();if(!r){this.svg=null;return}let o=Bt.get(r);o||(o=$.resolveIcon(r),Bt.set(r,o));const s=await o;if(s===at&&Bt.delete(r),r===this.getUrl())switch(s){case at:case J:this.svg=null,this.emit("sl-error");break;default:this.svg=s.cloneNode(!0),(e=t?.mutator)==null||e.call(t,this.svg),this.emit("sl-load")}}render(){return this.svg}};$.styles=Ao;h([ie()],$.prototype,"svg",2);h([f({reflect:!0})],$.prototype,"name",2);h([f()],$.prototype,"src",2);h([f()],$.prototype,"label",2);h([f({reflect:!0})],$.prototype,"library",2);h([ae("label")],$.prototype,"handleLabelChange",1);h([ae(["name","src","library"])],$.prototype,"setIcon",1);$=h([wt("sl-icon")],$);const Eo=gt`
  @media(min-width: 1000px) {
    sl-card {
      max-width: 70vw;
    }
  }

  main {
    margin-top: 80px;
  }
`;var xo=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,dr=(e,t,r,o)=>{for(var s=o>1?void 0:o?Co(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&xo(t,r,s),s};let bt=class extends P{constructor(){super(...arguments),this.message="Bine ai venit la IntelliHosp!"}async firstUpdated(){console.log("Aceasta este pagina de start a aplicației IntelliHosp!")}render(){return Q`
      <app-header></app-header>

      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
            <div slot="header">
              <h2>${this.message}</h2>
            </div>

            <p>
              IntelliHosp este o aplicație web care își propune să faciliteze gestionarea informațiilor medicale și a planurilor de îngrijire a pacienților.
            </p>

          </sl-card>

          <sl-button href="${ut("about")}" variant="primary">Despre aplicație</sl-button>
        </div>
      </main>
    `}};bt.styles=[Eo,gt`
    #welcomeBar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    #welcomeCard,
    #infoCard {
      padding: 18px;
      padding-top: 0px;
    }

    sl-card::part(footer) {
      display: flex;
      justify-content: flex-end;
    }

    @media(min-width: 750px) {
      sl-card {
        width: 70vw;
      }
    }


    @media (horizontal-viewport-segments: 2) {
      #welcomeBar {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }

      #welcomeCard {
        margin-right: 64px;
      }
    }
  `];dr([te()],bt.prototype,"message",2);bt=dr([Qt("app-home")],bt);var So=Object.defineProperty,ko=Object.getOwnPropertyDescriptor,le=(e,t,r,o)=>{for(var s=o>1?void 0:o?ko(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&So(t,r,s),s};let rt=class extends P{constructor(){super(...arguments),this.title="IntelliHosp",this.enableBack=!1}render(){return Q`
      <header>

        <div id="back-button-block">
          ${this.enableBack?Q`<sl-button href="${ut()}">
            Back
          </sl-button>`:null}

          <h1>${this.title}</h1>
        </div>
      </header>
    `}};rt.styles=gt`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--app-color-primary);
      color: white;
      height: 4em;
      padding-left: 16px;
      padding-top: 12px;

      position: fixed;
      left: env(titlebar-area-x, 0);
      top: env(titlebar-area-y, 0);
      height: env(titlebar-area-height, 50px);
      width: env(titlebar-area-width, 100%);
      -webkit-app-region: drag;
    }

    header h1 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 20px;
      font-weight: bold;
    }

    nav a {
      margin-left: 10px;
    }

    #back-button-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 12em;
    }

    @media(prefers-color-scheme: light) {
      header {
        color: black;
      }

      nav a {
        color: initial;
      }
    }
  `;le([te({type:String})],rt.prototype,"title",2);le([te({type:Boolean})],rt.prototype,"enableBack",2);rt=le([Qt("app-header")],rt);var Po=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,Lo=(e,t,r,o)=>{for(var s=o>1?void 0:o?Uo(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&Po(t,r,s),s};let Jt=class extends P{firstUpdated(){L!=null?L.addEventListener("route-changed",()=>{"startViewTransition"in document?document.startViewTransition(()=>{this.addEventListener("updateComplete",()=>{console.log("Update complete!")}),this.requestUpdate()}):(this.addEventListener("updateComplete",()=>{console.log("Update complete!")}),this.requestUpdate())}):console.error("Router is not defined")}render(){if(L!=null)return L.render();console.error("Router is not defined")}};Jt.styles=gt`
    main {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 16px;
    }
  `;Jt=Lo([Qt("app-index")],Jt);export{Eo as a,Qt as e,gt as i,P as s,Q as x};
//# sourceMappingURL=index-c880d41f.js.map
