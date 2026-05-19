function t(t,e,r,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,s);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(n=(o<3?a(n):o>3?a(e,r,n):a(e,r))||n);return o>3&&n&&Object.defineProperty(e,r,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&a.set(e,t))}return t}toString(){return this.cssText}};const n=t=>new o("string"==typeof t?t:t+"",void 0,s),l=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new o(r,t,s)},d=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return n(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,v=globalThis,g=v.trustedTypes,b=g?g.emptyScript:"",x=v.reactiveElementPolyfillSupport,y=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},$=(t,e)=>!c(t,e),_={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...f(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(r)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=r.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(void 0!==s&&!0===r.reflect){const a=(void 0!==r.converter?.toAttribute?r.converter:w).toAttribute(e,r.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const r=this.constructor,s=r._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=r.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,r,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??$)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:a},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,r,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,x?.({ReactiveElement:A}),(v.reactiveElementVersions??=[]).push("2.1.2");const M=globalThis,C=t=>t,P=M.trustedTypes,E=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,q="?"+U,O=`<${q}>`,B=document,j=()=>B.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,G="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,F=/>/g,V=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,K=/"/g,X=/^(?:script|style|textarea|title)$/i,J=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),it=new WeakMap,rt=B.createTreeWalker(B,129);function st(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const at=(t,e)=>{const r=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=W;for(let e=0;e<r;e++){const r=t[e];let l,d,c=-1,h=0;for(;h<r.length&&(n.lastIndex=h,d=n.exec(r),null!==d);)h=n.lastIndex,n===W?"!--"===d[1]?n=Q:void 0!==d[1]?n=F:void 0!==d[2]?(X.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=V):void 0!==d[3]&&(n=V):n===V?">"===d[0]?(n=a??W,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=void 0===d[3]?V:'"'===d[3]?K:Y):n===K||n===Y?n=V:n===Q||n===F?n=W:(n=V,a=void 0);const p=n===V&&t[e+1].startsWith("/>")?" ":"";o+=n===W?r+O:c>=0?(s.push(l),r.slice(0,c)+T+r.slice(c)+U+p):r+U+(-2===c?e:p)}return[st(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class S{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let a=0,o=0;const n=t.length-1,l=this.parts,[d,c]=at(t,e);if(this.el=S.createElement(d,r),rt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=rt.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=c[o++],r=s.getAttribute(t).split(U),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:r,ctor:"."===n[1]?I:"?"===n[1]?L:"@"===n[1]?z:H}),s.removeAttribute(t)}else t.startsWith(U)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(X.test(s.tagName)){const t=s.textContent.split(U),e=t.length-1;if(e>0){s.textContent=P?P.emptyScript:"";for(let r=0;r<e;r++)s.append(t[r],j()),rt.nextNode(),l.push({type:2,index:++a});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===q)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(U,t+1));)l.push({type:7,index:a}),t+=U.length-1}a++}}static createElement(t,e){const r=B.createElement("template");return r.innerHTML=t,r}}function ot(t,e,r=t,s){if(e===tt)return e;let a=void 0!==s?r._$Co?.[s]:r._$Cl;const o=D(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,r,s)),void 0!==s?(r._$Co??=[])[s]=a:r._$Cl=a),void 0!==a&&(e=ot(t,a._$AS(t,e.values),a,s)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??B).importNode(e,!0);rt.currentNode=s;let a=rt.nextNode(),o=0,n=0,l=r[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new k(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new Z(a,this,t)),this._$AV.push(e),l=r[++n]}o!==l?.index&&(a=rt.nextNode(),o++)}return rt.currentNode=B,s}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ot(this,t,e),D(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=S.createElement(st(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new R(s,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=it.get(t.strings);return void 0===e&&it.set(t.strings,e=new S(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const a of t)s===e.length?e.push(r=new k(this.O(j()),this.O(j()),this,this.options)):r=e[s],r._$AI(a),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,a){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=et}_$AI(t,e=this,r,s){const a=this.strings;let o=!1;if(void 0===a)t=ot(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==tt,o&&(this._$AH=t);else{const s=t;let n,l;for(t=a[0],n=0;n<a.length-1;n++)l=ot(this,s[r+n],e,n),l===tt&&(l=this._$AH[n]),o||=!D(l)||l!==this._$AH[n],l===et?t=et:t!==et&&(t+=(l??"")+a[n+1]),this._$AH[n]=l}o&&!s&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class z extends H{constructor(t,e,r,s,a){super(t,e,r,s,a),this.type=5}_$AI(t,e=this){if((t=ot(this,t,e,0)??et)===tt)return;const r=this._$AH,s=t===et&&r!==et||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==et&&(r===et||s);s&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ot(this,t)}}const nt=M.litHtmlPolyfillSupport;nt?.(S,k),(M.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class i extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const s=r?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=r?.renderBefore??null;s._$litPart$=a=new k(e.insertBefore(j(),t),t,void 0,r??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}}i._$litElement$=!0,i.finalized=!0,lt.litElementHydrateSupport?.({LitElement:i});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:i}),(lt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:$},pt=(t=ht,e,r)=>{const{kind:s,metadata:a}=r;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(r.name,t),"accessor"===s){const{name:s}=r;return{set(r){const a=e.get.call(this);e.set.call(this,r),this.requestUpdate(s,a,t,!0,r)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=r;return function(r){const a=this[s];e.call(this,r),this.requestUpdate(s,a,t,!0,r)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,r)=>"object"==typeof r?pt(t,e,r):((t,e,r)=>{const s=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),s?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}function ft(t){return ut({...t,state:!0,attribute:!1})}const mt="#1d2026",vt="#23272f",gt="#ecedef",bt="rgba(236,237,239,0.55)",xt="rgba(255,255,255,0.07)",yt="rgba(255,255,255,0.16)",wt="rgba(255,255,255,0.05)",$t="#e08a4a",_t="#1b0f06",kt="rgba(255,255,255,0.12)",zt="rgba(255,255,255,0.04)",At="rgba(224,138,74,0.12)",St="14px",Mt=l`
  :host {
    --hf-bg: ${n("#16181d")};
    --hf-surface: ${n(mt)};
    --hf-surface-alt: ${n(vt)};
    --hf-text: ${n(gt)};
    --hf-text-dim: ${n(bt)};
    --hf-border: ${n(xt)};
    --hf-border-active: ${n(yt)};
    --hf-divider: ${n(wt)};
    --hf-accent: ${n($t)};
    --hf-accent-text: ${n(_t)};
    --hf-slider-track: ${n(kt)};
    --hf-input: ${n(zt)};
    --hf-selected: ${n(At)};
    --hf-radius: ${n(St)};
    --hf-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
`;function It(t,e={}){return(r={})=>{const s=r.size??20,a=r.stroke??"currentColor",o=r.sw??e.sw??1.7;return J`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke=${a} stroke-width=${o} stroke-linecap="round" stroke-linejoin="round"><path d=${t} /></svg>`}}function Ct(t){return(e={})=>{const r=e.size??20,s=e.fill??"currentColor";return J`<svg width=${r} height=${r} viewBox="0 0 24 24" fill=${s} stroke="none"><path d=${t} /></svg>`}}const Pt={play:Ct("M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z"),pause:(t={})=>{const e=t.size??20,r=t.fill??"currentColor";return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${r} stroke="none">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>`},prev:Ct("M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z"),next:Ct("M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z"),shuffle:It("M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5"),rep:It("M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3"),rep1:(t={})=>{const e=t.size??20,r=t.stroke??"currentColor",s=t.sw??1.7;return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${r} stroke-width=${s} stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />
      <text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none">1</text>
    </svg>`},queue:It("M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2"),search:It("M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7"),home:It("M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z"),speaker:It("M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14"),group:It("M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4"),dot3:(t={})=>{const e=t.size??20,r=t.fill??"currentColor";return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${r} stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>`},x:It("M6 6l12 12 M18 6L6 18"),chev:It("M9 6l6 6-6 6"),chevL:It("M15 6l-6 6 6 6"),chevD:It("M6 9l6 6 6-6"),plus:It("M12 5v14 M5 12h14"),check:It("M5 12l4 4 10-10"),drag:(t={})=>{const e=t.size??20,r=t.fill??"currentColor";return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${r} stroke="none">
      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
    </svg>`},trash:It("M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"),top:It("M12 19V7 M6 13l6-6 6 6 M5 4h14"),playNext:It("M5 5l10 7-10 7V5z M19 6v12",{sw:2}),radio:It("M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14"),list:It("M4 6h16 M4 12h16 M4 18h16"),album:(t={})=>{const e=t.size??20,r=t.stroke??"currentColor",s=t.sw??1.6;return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${r} stroke-width=${s} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>`},artist:(t={})=>{const e=t.size??20,r=t.stroke??"currentColor",s=t.sw??1.7;return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${r} stroke-width=${s} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>`},note:It("M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"),heart:It("M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z"),filter:It("M4 5h16l-6 8v6l-4-2v-4L4 5z"),sun:(t={})=>{const e=t.size??14,r=t.stroke??"currentColor",s=t.sw??1.7;return J`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${r} stroke-width=${s} stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>`},moon:It("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z")},Et=[{id:"al1",name:"Mordechai",artist:"Khruangbin",h1:22,h2:350,year:2020},{id:"al2",name:"Salad Days",artist:"Mac DeMarco",h1:142,h2:80,year:2014},{id:"al3",name:"Awake",artist:"Tycho",h1:200,h2:280,year:2014},{id:"al4",name:"Migration",artist:"Bonobo",h1:32,h2:210,year:2017},{id:"al5",name:"Crush",artist:"Floating Points",h1:320,h2:18,year:2019},{id:"al6",name:"Pang",artist:"Caroline Polachek",h1:290,h2:340,year:2019},{id:"al7",name:"Mood Valiant",artist:"Hiatus Kaiyote",h1:12,h2:330,year:2021},{id:"al8",name:"In Colour",artist:"Jamie xx",h1:50,h2:200,year:2015},{id:"al9",name:"Spaces",artist:"Nils Frahm",h1:220,h2:240,year:2013},{id:"al10",name:"Untitled (Black Is)",artist:"SAULT",h1:0,h2:18,year:2020},{id:"al11",name:"French Kiwi Juice",artist:"FKJ",h1:175,h2:90,year:2017},{id:"al12",name:"Oncle Jazz",artist:"Men I Trust",h1:195,h2:250,year:2019},{id:"al13",name:"U.F.O.F.",artist:"Big Thief",h1:100,h2:175,year:2019},{id:"al14",name:"Bloom",artist:"Beach House",h1:280,h2:200,year:2012},{id:"al15",name:"Skiptracing",artist:"Mild High Club",h1:36,h2:5,year:2016},{id:"al16",name:"A Moment Apart",artist:"ODESZA",h1:245,h2:300,year:2017},{id:"al17",name:"Punisher",artist:"Phoebe Bridgers",h1:215,h2:245,year:2020},{id:"al18",name:"Vulture Prince",artist:"Arooj Aftab",h1:18,h2:28,year:2021}],Tt=["Pelota","White Gloves","A Walk","Cirrus","Birth","Welcome To My Island","Red Room","Loud Places","Says","Wildfires","Skyline","Tides","Lemon Twigs","Last Light","Mountain at My Gates","Slow Burn","Vega","Daydream","Mirror Maru","Late Night","Soft Universe","Ondas","Reverie","Long Way Home","Eclipse","Powder Blue","Dreamcaster","After Hours","Ember"].map((t,e)=>{const r=Et[e%Et.length];return{id:`tr${e+1}`,name:t,artist:r.artist,album:r.name,albumId:r.id,durationSec:120+47*e%240}}),Ht=[{id:"spotify",name:"Spotify",glyph:"S",brandHue:140,accounts:[{id:"sp-main",name:"tom@home",tier:"Premium",email:"tom@home.local"},{id:"sp-shared",name:"Family · shared",tier:"Family",email:"fam@home.local"}]},{id:"apple",name:"Apple Music",glyph:"",brandHue:0,accounts:[{id:"ap-tom",name:"tom@icloud",tier:"Individual",email:"tom@icloud.com"}]},{id:"soundcloud",name:"SoundCloud",glyph:"~",brandHue:25,accounts:[{id:"sc-tom",name:"@tom_listens",tier:"Go+",email:"tom@sc.local"}]}];function Lt(t){const e=Math.max(0,Math.floor(t)),r=e%60;return`${Math.floor(e/60)}:${r<10?`0${r}`:r}`}function Ut(t,e={}){const{angle:r=135,lift:s=0}=e;if(!t)return"linear-gradient(135deg,#444,#222)";return`linear-gradient(${r}deg, oklch(${56+s}% 0.18 ${t.h1??200}), oklch(${30+s}% 0.16 ${t.h2??280}))`}const qt={albums:Et,tracks:Tt,playlists:[{id:"pl1",name:"Deep Focus",owner:"Music Assistant",trackCount:86,h1:220,h2:280,mood:"instrumental·calm"},{id:"pl2",name:"Late-Night Drive",owner:"you",trackCount:42,h1:260,h2:340,mood:"atmospheric·downtempo"},{id:"pl3",name:"Sunday Cooking",owner:"you",trackCount:58,h1:30,h2:18,mood:"soul·jazz"},{id:"pl4",name:"Mellow Mornings",owner:"Editorial",trackCount:64,h1:50,h2:30,mood:"acoustic·warm"},{id:"pl5",name:"Workout",owner:"you",trackCount:38,h1:0,h2:340,mood:"high tempo·electronic"},{id:"pl6",name:"Liked Songs",owner:"you",trackCount:312,h1:130,h2:180,mood:"your favorites"},{id:"pl7",name:"Patio Sessions",owner:"you",trackCount:51,h1:180,h2:220,mood:"summer·chill"},{id:"pl8",name:"Discover Weekly",owner:"Editorial",trackCount:30,h1:290,h2:200,mood:"new finds"}],radioStations:[{id:"rd1",name:"KCRW · Eclectic 24",genre:"Eclectic",h1:12,h2:340},{id:"rd2",name:"NTS Radio 1",genre:"Underground",h1:30,h2:12},{id:"rd3",name:"BBC 6 Music",genre:"Alternative",h1:200,h2:250},{id:"rd4",name:"WWOZ New Orleans",genre:"Jazz · Blues",h1:38,h2:5},{id:"rd5",name:"Worldwide FM",genre:"Global",h1:165,h2:220}],providers:Ht,speakers:[{id:"sp1",name:"Living Room",room:"Living Room",model:"Sonos Era 300",volume:38},{id:"sp2",name:"Kitchen",room:"Kitchen",model:"Sonos One",volume:28},{id:"sp3",name:"Bedroom",room:"Bedroom",model:"HomePod mini",volume:18},{id:"sp4",name:"Office",room:"Office",model:"WiiM Pro + KEF",volume:45},{id:"sp5",name:"Patio",room:"Outside",model:"Sonos Move 2",volume:60},{id:"sp6",name:"Bathroom",room:"Bathroom",model:"HomePod mini",volume:22}],initialQueue:["tr1","tr5","tr12","tr18","tr9","tr3","tr22","tr7","tr15","tr27","tr2","tr11"],artistList:["Khruangbin","Mac DeMarco","Tycho","Bonobo","Floating Points","Caroline Polachek","Hiatus Kaiyote","Jamie xx","Nils Frahm","SAULT","FKJ","Men I Trust","Big Thief","Beach House","Mild High Club","ODESZA","Phoebe Bridgers","Vulfpeck","Yussef Dayes","Arooj Aftab"],fmtTime:Lt,albumById:function(t){return Et.find(e=>e.id===t)},trackById:function(t){return Tt.find(e=>e.id===t)},providerById:function(t){return Ht.find(e=>e.id===t)},artGradient:Ut};const Ot="__hass__";function Bt(t,e,r){return{queue:t.slice(),currentIdx:0,position:e,playing:!0,shuffle:!1,repeat:"off",groupVolume:r}}class Store extends EventTarget{constructor(){super(),this.tab="player",this.browser={crumbs:[{kind:"root",label:"Sources"}],providerId:null,accountId:null,sub:"playlists",detailId:null},this.search={query:"",filter:"all"},this.selectedTracks=new Set,this.multiMode=!1,this.groupingSheet={open:!1,leadId:null},this._tickInterval=null,this._zones=[],this._isHassMode=!1,this.diagnosticNotes=[],this.speakers=qt.speakers.map(t=>({...t,leadId:t.id}));const t=this.speakers.find(t=>"sp2"===t.id);t&&(t.leadId="sp1"),this.players={sp1:{...Bt(qt.initialQueue,48,38),playing:!0},sp5:{...Bt(["tr3","tr18","tr7","tr12","tr22"],14,60),playing:!0,shuffle:!0}},this.activeLeadId="sp1",this._startTick()}get groups(){var t;const e={};for(const r of this.speakers)(e[t=r.leadId]??(e[t]=[])).push(r);return Object.keys(e).map(t=>{const r=e[t],s=r.find(e=>e.id===t)??r[0],a=this.players[t],o=1===r.length?s.name:r.map(t=>t.name).join(" + ");return{leadId:t,lead:s,members:r,name:o,player:a,playing:!!a?.playing,isActive:t===this.activeLeadId,isIdle:!a}}).sort((t,e)=>t.isActive!==e.isActive?t.isActive?-1:1:t.isIdle!==e.isIdle?t.isIdle?1:-1:t.lead.name.localeCompare(e.lead.name))}get activePlayer(){return this.players[this.activeLeadId]??Bt(qt.initialQueue,0,30)}get activeGroup(){return this.groups.find(t=>t.leadId===this.activeLeadId)}get currentTrack(){const t=this.activePlayer,e=t.queue[t.currentIdx];if(e===Ot&&this._hass){const t=this._zones.find(t=>t.wiim===this.activeLeadId);if(t){const e=function(t,e){const r=t.states?.[e];if(!r)return null;const s=r.attributes,a=s.media_title??"";return a?{id:Ot,name:a,artist:s.media_artist??"",album:s.media_album_name??"",albumId:Ot,durationSec:"number"==typeof s.media_duration?s.media_duration:0}:null}(this._hass,t.ma);if(e)return e}}return(e?qt.trackById(e):void 0)??qt.tracks[0]}get currentAlbum(){const t=this.activePlayer;if(t.queue[t.currentIdx]===Ot&&this._hass){const t=this._zones.find(t=>t.wiim===this.activeLeadId);if(t){const e=function(t,e){const r=t.states?.[e];if(!r)return null;const s=r.attributes,a=s.media_album_name??"",o=s.entity_picture??void 0;return{id:Ot,name:a,artist:s.media_artist??"",h1:220,h2:280,year:0,imageUrl:o}}(this._hass,t.ma);if(e)return e}}const e=qt.albumById(this.currentTrack.albumId);if(!e)throw new Error(`Missing album for track ${this.currentTrack.id}`);return e}setHass(t){this._hass=t,this._deriveFromHass(),this._emit()}setConfig(t){t.zones&&t.zones.length>0?this._zones=t.zones:this._zones=[],this._hass&&(this._deriveFromHass(),this._emit())}_deriveFromHass(){if(!this._hass)return;let t;if(this._zones.length>0&&this._isHassMode)t=this._zones,this.diagnosticNotes=["using explicit config.zones from card YAML"];else{const e=function(t){const e=t.states??{},r=[],s=[],a=Object.values(e).filter(t=>{if(!t.entity_id.startsWith("media_player."))return!1;const e=t.attributes.group_role;return"master"===e||"slave"===e||"solo"===e});s.push(`pass 1 (group_role): ${a.length} candidate WiiM device entities`);for(const t of a){const a=t.entity_id.replace(/^media_player\./,""),o=[`media_player.${a}_2`,`media_player.${a}_ma`],n=o.find(t=>void 0!==e[t]);if(!n){s.push(`  ${t.entity_id}: no MA pair at ${o.join(" / ")}`);continue}const l=t.attributes.friendly_name??a;r.push({name:l,wiim:t.entity_id,ma:n}),s.push(`  ${t.entity_id} → ${n} as "${l}"`)}if(0===r.length){s.push("pass 2 (fallback name-pair scan, since pass 1 was empty):");const t=Object.values(e).filter(t=>t.entity_id.startsWith("media_player."));s.push(`  ${t.length} total media_player entities in hass`);for(const a of t){const t=a.entity_id;if(t.endsWith("_2")||t.endsWith("_ma")||t.endsWith("_group_master"))continue;const o=t.replace(/^media_player\./,""),n=[`media_player.${o}_2`,`media_player.${o}_ma`].find(t=>void 0!==e[t]);if(!n)continue;const l=a.attributes.friendly_name??o;r.push({name:l,wiim:t,ma:n}),s.push(`  ${t} → ${n} as "${l}" (no group_role attr)`)}}return r.sort((t,e)=>t.name.localeCompare(e.name)),s.push(`final: ${r.length} zone(s) discovered`),{zones:r,notes:s}}(this._hass);t=e.zones,this.diagnosticNotes=e.notes,console.debug("[homefront-music-card] zone discovery:\n"+e.notes.join("\n"))}if(0===t.length)return void console.warn("[homefront-music-card] No zones discovered — staying in mock mode. See store.diagnosticNotes for details.");this._isHassMode||(this._isHassMode=!0,this._stopTick()),this._zones=t;const e=function(t,e){const r=t.states??{},s=[];for(const t of e){const e=r[t.wiim];if(!e)continue;const a=e.attributes,o=a.group_role,n=a.group_members??[];let l=t.wiim;if("slave"===o){const t=n.find(t=>{const e=r[t];return"master"===e?.attributes?.group_role});t&&(l=t)}const d="number"==typeof a.volume_level?a.volume_level:0;s.push({id:t.wiim,name:t.name,room:t.name,model:a.device_model??"WiiM",volume:Math.round(100*d),leadId:l})}return s}(this._hass,t);if(this.speakers=e,this.players=function(t,e,r){const s=t.states??{},a={},o=new Set(r.map(t=>t.leadId));for(const t of o){const o=e.find(e=>e.wiim===t);if(!o)continue;const n=s[o.ma];if(!n)continue;const l=n.attributes,d=r.filter(e=>e.leadId===t),c=0===d.length?0:Math.round(d.reduce((t,e)=>t+e.volume,0)/d.length),h=l.repeat??"off",p="playing"===n.state||"paused"===n.state;a[t]={queue:p?[Ot]:[],currentIdx:0,position:"number"==typeof l.media_position?l.media_position:0,playing:"playing"===n.state,shuffle:!!l.shuffle,repeat:h,groupVolume:c}}return a}(this._hass,t,e),!e.find(t=>t.id===this.activeLeadId)){const t=e.find(t=>t.id===t.leadId)??e[0];t&&(this.activeLeadId=t.id)}}get isHassMode(){return this._isHassMode}_stopTick(){null!==this._tickInterval&&(window.clearInterval(this._tickInterval),this._tickInterval=null)}_emit(){this.dispatchEvent(new Event("change"))}setTab(t){this.tab!==t&&(this.tab=t,this._emit())}setActiveLead(t){this.players[t]||(this.players[t]=Bt(qt.initialQueue,0,30)),this.activeLeadId=t,this._emit()}_patchActive(t){const e=this.players[this.activeLeadId]??Bt(qt.initialQueue,0,30);this.players[this.activeLeadId]={...e,...t},this._emit()}setPlaying(t){this._patchActive({playing:t})}togglePlaying(){this._patchActive({playing:!this.activePlayer.playing})}setShuffle(t){this._patchActive({shuffle:t})}toggleShuffle(){this._patchActive({shuffle:!this.activePlayer.shuffle})}setRepeat(t){this._patchActive({repeat:t})}cycleRepeat(){const t=this.activePlayer.repeat,e="off"===t?"all":"all"===t?"one":"off";this._patchActive({repeat:e})}setPosition(t){this._patchActive({position:t})}next(){const t=this.activePlayer;this._patchActive({currentIdx:Math.min(t.queue.length-1,t.currentIdx+1),position:0})}prev(){const t=this.activePlayer;t.position>3?this._patchActive({position:0}):this._patchActive({currentIdx:Math.max(0,t.currentIdx-1),position:0})}setSpeakerVol(t,e){const r=this.speakers.find(e=>e.id===t);r&&(r.volume=e,this._emit())}setGroupVolumeFor(t,e){const r=this.players[t];r&&(this.players[t]={...r,groupVolume:e});for(const r of this.speakers)r.leadId===t&&(r.volume=e);this._emit()}setGroupVolume(t){this.setGroupVolumeFor(this.activeLeadId,t)}ungroupSpeaker(t){const e=this.speakers.find(e=>e.id===t);e&&(e.leadId=t,this._emit())}toggleGroupPlay(t){const e=this.players[t];e&&(this.players[t]={...e,playing:!e.playing},this._emit())}startSoloPlayback(t){this.players[t]=Bt(qt.initialQueue,0,30),this.activeLeadId=t,this._emit()}openGroupingSheet(t){this.groupingSheet={open:!0,leadId:t},this._emit()}closeGroupingSheet(){this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}commitGroupMembers(t,e){const r=new Set(e),s=r.has(t)?t:e[0]??null;if(this.speakers=this.speakers.map(e=>{const a=e.leadId===t;return r.has(e.id)?{...e,leadId:s??e.id}:a?{...e,leadId:e.id}:e}),s){if(s!==t){const e=this.players[t]??Bt(qt.initialQueue,0,30);this.players[s]=e,delete this.players[t]}}else delete this.players[t];for(const t of e)t!==s&&delete this.players[t];if(this.activeLeadId===t)if(s)this.activeLeadId=s;else{const t=this.speakers.find(t=>t.leadId===t.id);t&&(this.activeLeadId=t.id)}this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}setQueue(t){this._patchActive({queue:t})}removeFromQueue(t){const e=this.activePlayer,r=e.queue.slice();r.splice(t,1);const s=t<e.currentIdx?e.currentIdx-1:e.currentIdx;this._patchActive({queue:r,currentIdx:s})}moveQueue(t,e){if(t===e)return;const r=this.activePlayer,s=r.queue.slice(),[a]=s.splice(t,1);if(void 0===a)return;s.splice(e,0,a);let o=r.currentIdx;t===o?o=e:t<o&&e>=o?o-=1:t>o&&e<=o&&(o+=1),this._patchActive({queue:s,currentIdx:o})}playTrackAt(t){this._patchActive({currentIdx:t,position:0,playing:!0})}moveToTop(t){this.moveQueue(t,this.activePlayer.currentIdx+1)}clearQueue(){const t=this.activePlayer;this._patchActive({queue:t.queue.slice(0,t.currentIdx+1)})}removeBulk(t){const e=this.activePlayer,r=e.queue.filter((e,r)=>!t.has(r));this.players[this.activeLeadId]={...e,queue:r},this.selectedTracks=new Set,this.multiMode=!1,this._emit()}browserGo(t){this.browser={...this.browser,...t},this._emit()}pushCrumb(t,e={}){this.browser={...this.browser,...e,crumbs:[...this.browser.crumbs,t]},this._emit()}popToCrumb(t){const e=this.browser.crumbs.slice(0,t+1),r=e[e.length-1];let s={...this.browser,crumbs:e};"root"===r?.kind?s={...s,providerId:null,accountId:null,detailId:null}:"provider"===r?.kind?s={...s,accountId:null,detailId:null}:"account"===r?.kind&&(s={...s,detailId:null}),this.browser=s,this._emit()}setSearch(t){this.search={...this.search,...t},this._emit()}setSelectedTracks(t){this.selectedTracks=t,this._emit()}setMultiMode(t){this.multiMode=t,t||(this.selectedTracks=new Set),this._emit()}_startTick(){this._tickInterval=window.setInterval(()=>this._tick(),1e3)}_tick(){let t=!1;for(const e of Object.keys(this.players)){const r=this.players[e];if(!r.playing)continue;const s=r.queue[r.currentIdx];if(!s)continue;const a=qt.trackById(s);a&&(r.position+1>=a.durationSec?this.players[e]={...r,position:0,currentIdx:Math.min(r.queue.length-1,r.currentIdx+1)}:this.players[e]={...r,position:r.position+1},t=!0)}t&&this._emit()}dispose(){this._stopTick()}}class StoreController{constructor(t,e){this.host=t,this.store=e,this._onChange=()=>{this.host.requestUpdate()},t.addController(this)}hostConnected(){this.store.addEventListener("change",this._onChange)}hostDisconnected(){this.store.removeEventListener("change",this._onChange)}}let Rt=class extends i{constructor(){super(...arguments),this.size=48,this.radius=8,this.boxShadow=""}render(){const t="number"==typeof this.size?this.size:/^\d+(\.\d+)?$/.test(this.size)?Number(this.size):null,e=null!==t?`${t}px`:this.size,r=null!==t?.34*t:16,s=Ut(this.obj),a=`width:${e};height:${e};border-radius:${this.radius}px;background:${s};${this.boxShadow?`box-shadow:${this.boxShadow}`:""}`;return J`
      <div class="art" style=${a}>
        ${this.imageUrl?J`<img src=${this.imageUrl} alt="" loading="lazy" />`:""}
        ${this.glyph?J`<div class="glyph" style="font-size:${r}px">${this.glyph}</div>`:""}
        <div class="scan"></div>
      </div>
    `}};Rt.styles=l`
    :host {
      display: inline-block;
      flex: none;
      line-height: 0;
    }
    .art {
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.18),
        inset 0 -8px 18px rgba(0, 0, 0, 0.18);
    }
    .scan {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 40%);
      pointer-events: none;
    }
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .glyph {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 700;
      letter-spacing: -0.03em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      line-height: 1;
    }
  `,t([ut({attribute:!1})],Rt.prototype,"obj",void 0),t([ut()],Rt.prototype,"size",void 0),t([ut({type:Number})],Rt.prototype,"radius",void 0),t([ut({attribute:!1})],Rt.prototype,"glyph",void 0),t([ut()],Rt.prototype,"boxShadow",void 0),t([ut({attribute:"image-url"})],Rt.prototype,"imageUrl",void 0),Rt=t([ct("hf-album-art")],Rt);let jt=class extends i{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.color="#fff",this.track="rgba(255,255,255,0.18)",this.trackHeight=4,this.thumb=14,this.ariaLabel="",this._onInput=t=>{const e=Number(t.target.value);this.value=e,this.dispatchEvent(new CustomEvent("hf-input",{detail:e,bubbles:!0,composed:!0}))}}render(){const t=(this.value-this.min)/(this.max-this.min)*100;return this.style.setProperty("--hf-pct",`${t}%`),this.style.setProperty("--hf-color",this.color),this.style.setProperty("--hf-track",this.track),this.style.setProperty("--hf-track-h",`${this.trackHeight}px`),this.style.setProperty("--hf-thumb",`${this.thumb}px`),J`<input
      type="range"
      min=${this.min}
      max=${this.max}
      .value=${String(this.value)}
      aria-label=${this.ariaLabel||"Slider"}
      @input=${this._onInput}
    />`}};jt.styles=l`
    :host {
      --hf-pct: 0%;
      --hf-color: #fff;
      --hf-track: rgba(255, 255, 255, 0.18);
      --hf-track-h: 4px;
      --hf-thumb: 14px;
      display: block;
      width: 100%;
      padding: 8px 0;
    }
    input[type='range'] {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      outline: none;
      margin: 0;
      display: block;
      height: var(--hf-thumb);
    }
    input[type='range']::-webkit-slider-runnable-track {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: linear-gradient(
        to right,
        var(--hf-color) 0%,
        var(--hf-color) var(--hf-pct),
        var(--hf-track) var(--hf-pct),
        var(--hf-track) 100%
      );
    }
    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      width: var(--hf-thumb);
      height: var(--hf-thumb);
      border-radius: 50%;
      background: var(--hf-color);
      border: 0;
      margin-top: calc((var(--hf-track-h) - var(--hf-thumb)) / 2);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    input[type='range']::-moz-range-track {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: var(--hf-track);
    }
    input[type='range']::-moz-range-progress {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: var(--hf-color);
    }
    input[type='range']::-moz-range-thumb {
      width: var(--hf-thumb);
      height: var(--hf-thumb);
      border-radius: 50%;
      background: var(--hf-color);
      border: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  `,t([ut({type:Number})],jt.prototype,"value",void 0),t([ut({type:Number})],jt.prototype,"min",void 0),t([ut({type:Number})],jt.prototype,"max",void 0),t([ut()],jt.prototype,"color",void 0),t([ut()],jt.prototype,"track",void 0),t([ut({type:Number,attribute:"track-height"})],jt.prototype,"trackHeight",void 0),t([ut({type:Number})],jt.prototype,"thumb",void 0),t([ut({attribute:"aria-label"})],jt.prototype,"ariaLabel",void 0),jt=t([ct("hf-slider")],jt);let Dt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return J``;const t=this.store,e=t.currentTrack,r=t.currentAlbum,s=t.activePlayer,a=t.activeGroup,o=t.groups.filter(t=>!t.isActive&&t.playing).length,n=r.imageUrl;return J`
      <div class="art-wrap">
        <hf-album-art
          .obj=${r}
          size="100%"
          radius="18"
          boxShadow="0 18px 40px rgba(0,0,0,0.35)"
          .imageUrl=${n}
        ></hf-album-art>
      </div>
      <div class="meta">
        <div class="eyebrow">
          ${s.shuffle?"Shuffle":"Now Playing"} · ${r.name}
        </div>
        <div class="title">${e.name}</div>
        <div class="artist">${e.artist}</div>
      </div>
      <div class="scrubber">
        <hf-slider
          .value=${s.position}
          .min=${0}
          .max=${e.durationSec}
          .color=${$t}
          .track=${kt}
          @hf-input=${e=>t.setPosition(e.detail)}
        ></hf-slider>
        <div class="times">
          <span>${Lt(s.position)}</span>
          <span>-${Lt(e.durationSec-s.position)}</span>
        </div>
      </div>
      <div class="transport">
        <button
          class="icon-btn"
          aria-pressed=${s.shuffle}
          aria-label="Shuffle"
          @click=${()=>t.toggleShuffle()}
        >
          ${Pt.shuffle({size:18})}
        </button>
        <button class="icon-btn" aria-label="Previous" @click=${()=>t.prev()}>
          ${Pt.prev({size:22})}
        </button>
        <button
          class="play-btn"
          aria-label=${s.playing?"Pause":"Play"}
          @click=${()=>t.togglePlaying()}
        >
          ${s.playing?Pt.pause({size:22}):Pt.play({size:22})}
        </button>
        <button class="icon-btn" aria-label="Next" @click=${()=>t.next()}>
          ${Pt.next({size:22})}
        </button>
        <button
          class="icon-btn"
          aria-pressed=${"off"!==s.repeat}
          aria-label="Repeat"
          @click=${()=>t.cycleRepeat()}
        >
          ${"one"===s.repeat?Pt.rep1({size:18}):Pt.rep({size:18})}
        </button>
      </div>
      <div class="output">
        <button class="output-main" type="button" @click=${()=>t.setTab("group")}>
          ${Pt.speaker({size:16,stroke:$t})}
          <div style="flex:1; min-width:0">
            <div class="output-name">${a?.name??"No output"}</div>
            <div class="output-sub">
              ${(a?.members.length??0)>1?J`Grouped · ${a?.members.length} speakers · `:""}
              Volume ${s.groupVolume}
              ${o>0?J` · ${o} other group${o>1?"s":""}
                  playing`:""}
            </div>
          </div>
        </button>
        <button
          class="output-group-btn"
          type="button"
          @click=${()=>t.openGroupingSheet(t.activeLeadId)}
        >
          ${Pt.group({size:13})} Group
        </button>
      </div>
    `}};Dt.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      padding: 8px 16px 16px;
      color: var(--hf-text, #ecedef);
      font-family: var(--hf-font, sans-serif);
      box-sizing: border-box;
    }
    .art-wrap {
      margin: 8px auto 16px;
      aspect-ratio: 1 / 1;
      max-width: 280px;
      width: 92%;
    }
    hf-album-art {
      display: block;
      width: 100%;
      height: 100%;
    }
    .meta {
      text-align: center;
      padding: 0 8px;
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 6px;
      letter-spacing: -0.01em;
    }
    .artist {
      font-size: 13px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .scrubber {
      padding: 14px 4px 0;
    }
    .times {
      display: flex;
      justify-content: space-between;
      margin-top: -2px;
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .transport {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 12px 0 4px;
    }
    .icon-btn {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      padding: 0;
      background: transparent;
      border: 0;
      color: var(--hf-text);
      cursor: pointer;
      display: grid;
      place-items: center;
      font: inherit;
    }
    .icon-btn[aria-pressed='true'] {
      color: var(--hf-accent);
    }
    .play-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    }
    .output {
      margin-top: 12px;
      display: flex;
      align-items: stretch;
      background: var(--hf-surface-alt);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      overflow: hidden;
    }
    .output-main {
      flex: 1;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: transparent;
      border: 0;
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      text-align: left;
      min-width: 0;
    }
    .output-name {
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .output-sub {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .output-group-btn {
      padding: 0 14px;
      background: transparent;
      border: 0;
      border-left: 1px solid var(--hf-border);
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 600;
    }
  `,t([ut({attribute:!1})],Dt.prototype,"store",void 0),Dt=t([ct("hf-player-tab")],Dt);const Nt=[{id:"playlists",label:"Playlists"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"tracks",label:"Tracks"},{id:"radio",label:"Radio"}];let Gt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){return this.store?J`${this._renderCrumbs()} ${this._renderBody()}`:J``}_renderCrumbs(){const t=this.store.browser.crumbs;return J`
      <div class="crumbs">
        ${t.map((e,r)=>{const s=r===t.length-1;return J`
            <button
              class="crumb-btn"
              data-current=${s}
              @click=${()=>this.store.popToCrumb(r)}
            >
              ${e.label}
            </button>
            ${r<t.length-1?J`<span aria-hidden="true">${Pt.chev({size:11})}</span>`:""}
          `})}
      </div>
    `}_renderBody(){const{providerId:t,accountId:e,sub:r,detailId:s}=this.store.browser;if(!t)return this._renderProviders();const a=qt.providerById(t);return a?e?s?this._renderDetail(s):this._renderTypeView(r):this._renderAccounts(a):J``}_renderProviders(){return J`
      <div class="body">
        <div class="section-label">Connected sources</div>
        <div class="stack">
          ${qt.providers.map(t=>this._renderProviderTile(t))}
        </div>
      </div>
    `}_renderProviderTile(t){const e=`linear-gradient(135deg, oklch(72% 0.18 ${t.brandHue}), oklch(48% 0.16 ${(t.brandHue+30)%360}))`;return J`
      <button
        class="provider-tile"
        @click=${()=>this.store.pushCrumb({kind:"provider",label:t.name},{providerId:t.id})}
      >
        <div class="provider-glyph" style=${`background:${e}`}>
          ${t.glyph||t.name[0]}
        </div>
        <div class="provider-info">
          <div class="provider-name">${t.name}</div>
          <div class="provider-sub">
            ${t.accounts.length} account${t.accounts.length>1?"s":""} · connected
          </div>
        </div>
        ${Pt.chev({size:16})}
      </button>
    `}_renderAccounts(t){return J`
      <div class="body">
        <div class="section-label">${t.name} · choose an account</div>
        <div class="stack">
          ${t.accounts.map(t=>this._renderAccountTile(t))}
        </div>
      </div>
    `}_renderAccountTile(t){const e=t.name.replace(/[^a-zA-Z]/g,"").slice(0,2).toUpperCase();return J`
      <button
        class="account-tile"
        @click=${()=>this.store.pushCrumb({kind:"account",label:t.name},{accountId:t.id,sub:"playlists",detailId:null})}
      >
        <div class="account-avatar" style=${"background:conic-gradient(from 220deg, var(--hf-accent), oklch(70% 0.14 220))"}>${e}</div>
        <div style="flex:1; min-width:0">
          <div class="account-name">${t.name}</div>
          <div class="account-sub">${t.tier}</div>
        </div>
        ${Pt.chev({size:16})}
      </button>
    `}_renderTypeView(t){return J`
      <div class="subtabs">
        ${Nt.map(e=>J`
            <button
              class="subtab"
              data-active=${t===e.id}
              @click=${()=>this.store.browserGo({sub:e.id})}
            >
              ${e.label}
            </button>
          `)}
      </div>
      <div class="body">${this._renderTypeBody(t)}</div>
    `}_renderTypeBody(t){return"playlists"===t?J`
        <div class="grid2">
          ${qt.playlists.map(t=>J`
              <button
                class="art-tile"
                @click=${()=>this.store.pushCrumb({kind:"detail",label:t.name},{detailId:t.id})}
              >
                <hf-album-art
                  .obj=${t}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${t.name}</div>
                  <div class="art-tile-sub">${t.trackCount} tracks</div>
                </div>
              </button>
            `)}
        </div>
      `:"albums"===t?J`
        <div class="grid2">
          ${qt.albums.map(t=>J`
              <button
                class="art-tile"
                @click=${()=>this.store.pushCrumb({kind:"detail",label:t.name},{detailId:t.id})}
              >
                <hf-album-art
                  .obj=${t}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${t.name}</div>
                  <div class="art-tile-sub">${t.artist}</div>
                </div>
              </button>
            `)}
        </div>
      `:"artists"===t?J`
        <div>
          ${qt.artistList.slice(0,12).map((t,e)=>J`
              <button class="artist-row">
                <div
                  class="artist-avatar"
                  style=${`background: conic-gradient(from ${40*e}deg, oklch(70% 0.18 ${30*e}), oklch(46% 0.16 ${(30*e+60)%360}))`}
                ></div>
                <div class="artist-name">${t}</div>
                <div class="artist-tag">Artist</div>
              </button>
            `)}
        </div>
      `:"tracks"===t?J`
        <div>
          ${qt.tracks.slice(0,12).map((t,e)=>this._renderTrackRow(t,e+1))}
        </div>
      `:J`
      <div class="stack">
        ${qt.radioStations.map(t=>J`
            <button class="radio-row">
              <hf-album-art
                .obj=${t}
                size="44"
                radius="10"
                .glyph=${Pt.radio({size:18,stroke:"#fff"})}
              ></hf-album-art>
              <div style="flex:1; min-width:0">
                <div class="track-name">${t.name}</div>
                <div class="track-sub">${t.genre}</div>
              </div>
              ${Pt.play({size:16})}
            </button>
          `)}
      </div>
    `}_renderTrackRow(t,e){const r=qt.albumById(t.albumId);return J`
      <button class="track-row">
        ${null!=e?J`<div class="track-index">${e}</div>`:""}
        <hf-album-art .obj=${r} size="36" radius="6"></hf-album-art>
        <div class="track-meta">
          <div class="track-name">${t.name}</div>
          <div class="track-sub">${t.artist} · ${t.album}</div>
        </div>
        <div class="track-time">${Lt(t.durationSec)}</div>
      </button>
    `}_renderDetail(t){const e=qt.playlists.find(e=>e.id===t),r=qt.albums.find(e=>e.id===t),s=e??r;if(!s)return J``;const a=!!e;return J`
      <div>
        <div class="detail-header">
          <hf-album-art
            .obj=${s}
            size="112"
            radius="14"
            boxShadow="0 12px 24px rgba(0,0,0,0.28)"
          ></hf-album-art>
          <div class="detail-meta">
            <div class="detail-kind">${a?"Playlist":"Album"}</div>
            <div class="detail-title">${s.name}</div>
            <div class="detail-sub">
              ${a?`${s.owner} · ${s.trackCount} tracks`:`${s.artist} · ${s.year}`}
            </div>
            <div class="detail-actions">
              <button class="pill-btn primary">${Pt.play({size:13})} Play</button>
              <button class="pill-btn">${Pt.plus({size:13})} Queue</button>
            </div>
          </div>
        </div>
        <div class="body">
          ${qt.tracks.slice(0,10).map((t,e)=>this._renderTrackRow(t,e+1))}
        </div>
      </div>
    `}};Gt.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      padding-bottom: 12px;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .crumbs {
      padding: 10px 14px 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      color: var(--hf-text-dim);
      font-size: 12px;
    }
    .crumb-btn {
      background: transparent;
      border: 0;
      padding: 3px 6px;
      border-radius: 6px;
      color: var(--hf-text-dim);
      font-weight: 500;
      cursor: pointer;
      font-size: 12px;
      font: inherit;
    }
    .crumb-btn[data-current='true'] {
      color: var(--hf-text);
      font-weight: 600;
    }
    .section-label {
      padding: 4px 4px 6px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .body {
      padding: 0 14px 16px;
    }
    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .provider-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
      width: 100%;
    }
    .provider-glyph {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 26px;
      flex: none;
      box-shadow: inset 0 -8px 18px rgba(0, 0, 0, 0.18);
    }
    .provider-info {
      min-width: 0;
      flex: 1;
    }
    .provider-name {
      font-weight: 600;
      font-size: 15px;
    }
    .provider-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .account-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
      width: 100%;
    }
    .account-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 13px;
    }
    .account-name {
      font-weight: 600;
      font-size: 14px;
    }
    .account-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .subtabs {
      display: flex;
      gap: 4px;
      padding: 4px 14px 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .subtabs::-webkit-scrollbar {
      display: none;
    }
    .subtab {
      background: transparent;
      color: var(--hf-text-dim);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .subtab[data-active='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .art-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
    }
    .art-tile-name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .art-tile-sub {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--hf-divider);
      width: 100%;
      cursor: pointer;
      font: inherit;
    }
    .artist-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .artist-name {
      font-size: 14px;
      color: var(--hf-text);
      font-weight: 500;
    }
    .artist-tag {
      margin-left: auto;
      color: var(--hf-text-dim);
      font-size: 11px;
    }
    .track-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--hf-divider);
      width: 100%;
      cursor: pointer;
      color: var(--hf-text);
      text-align: left;
      font: inherit;
    }
    .track-index {
      width: 18px;
      text-align: right;
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .track-meta {
      flex: 1;
      min-width: 0;
    }
    .track-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-time {
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .radio-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      width: 100%;
      cursor: pointer;
      font: inherit;
      color: var(--hf-text);
    }
    .detail-header {
      padding: 8px 14px 16px;
      display: flex;
      gap: 14px;
      align-items: flex-end;
    }
    .detail-meta {
      min-width: 0;
      flex: 1;
    }
    .detail-kind {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .detail-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin-top: 4px;
      line-height: 1.1;
    }
    .detail-sub {
      font-size: 12px;
      color: var(--hf-text-dim);
      margin-top: 6px;
    }
    .detail-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      color: var(--hf-text);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 7px 14px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      font: inherit;
    }
    .pill-btn.primary {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
    }
  `,t([ut({attribute:!1})],Gt.prototype,"store",void 0),Gt=t([ct("hf-browse-tab")],Gt);const Wt=[{id:"all",label:"All"},{id:"tracks",label:"Tracks"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"playlists",label:"Playlists"}],Qt=["khruangbin","jazz","deep focus","ambient","tycho","discover weekly"];let Ft=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return J``;const t=this.store,e=t.search.query.trim().toLowerCase(),r=t.search.filter,s=e?this._matchesFor(e):null;return J`
      <div class="top">
        <div class="input-wrap">
          ${Pt.search({size:16})}
          <input
            .value=${t.search.query}
            placeholder="Search Spotify, Apple Music, SoundCloud…"
            @input=${e=>t.setSearch({query:e.target.value})}
          />
          ${t.search.query?J`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${()=>t.setSearch({query:""})}
                >
                  ${Pt.x({size:14})}
                </button>
              `:""}
        </div>
        <div class="filters">
          ${Wt.map(e=>J`
              <button
                class="filter"
                data-active=${r===e.id}
                @click=${()=>t.setSearch({filter:e.id})}
              >
                ${e.label}
              </button>
            `)}
        </div>
      </div>

      <div class="scroll">
        ${s?this._renderResults(s,r):this._renderSuggestions()}
      </div>
    `}_matchesFor(t){const e=e=>e.toLowerCase().includes(t);return{tracks:qt.tracks.filter(t=>e(t.name)||e(t.artist)),albums:qt.albums.filter(t=>e(t.name)||e(t.artist)),artists:qt.artistList.filter(e),playlists:qt.playlists.filter(t=>e(t.name))}}_renderResults(t,e){return J`
      <div class="body">
        ${qt.providers.map(r=>this._renderProviderSection(r,t,e))}
      </div>
    `}_renderProviderSection(t,e,r){let s=e.tracks.slice(0,4),a=e.albums.slice(0,2),o=e.artists.slice(0,2),n=e.playlists.slice(0,2);"apple"===t.id?(s=e.tracks.slice(1,4),a=e.albums.slice(2,4)):"soundcloud"===t.id&&(s=e.tracks.slice(2,5),a=[]),"tracks"===r?(a=[],o=[],n=[]):"albums"===r?(s=[],o=[],n=[]):"artists"===r?(s=[],a=[],n=[]):"playlists"===r&&(s=[],a=[],o=[]);const l=s.length+a.length+o.length+n.length;if(0===l)return J``;const d=`linear-gradient(135deg, oklch(70% 0.18 ${t.brandHue}), oklch(46% 0.16 ${(t.brandHue+30)%360}))`;return J`
      <div class="section">
        <div class="section-head">
          <div class="provider-glyph-sm" style=${`background:${d}`}>
            ${t.glyph||t.name[0]}
          </div>
          <div class="provider-name">${t.name}</div>
          <div class="result-count">
            ${l} result${l>1?"s":""}
          </div>
        </div>

        ${s.length>0?J`
              <div style="margin-bottom:6px">
                <div class="small-label">Tracks</div>
                ${s.map(t=>{const e=qt.albumById(t.albumId);return J`
                    <div class="track-row">
                      <hf-album-art .obj=${e} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${t.name}</div>
                        <div class="row-sub">${t.artist} · ${t.album}</div>
                      </div>
                      <div class="row-time">${Lt(t.durationSec)}</div>
                    </div>
                  `})}
              </div>
            `:""}

        ${a.length>0?J`
              <div style="margin-bottom:6px">
                <div class="small-label">Albums</div>
                <div class="album-row">
                  ${a.map(t=>J`
                      <div class="album-card">
                        <hf-album-art .obj=${t} size="96" radius="8"></hf-album-art>
                        <div class="album-name">${t.name}</div>
                        <div class="album-artist">${t.artist}</div>
                      </div>
                    `)}
                </div>
              </div>
            `:""}

        ${o.length>0?J`
              <div style="margin-bottom:6px">
                <div class="small-label">Artists</div>
                ${o.map((t,e)=>J`
                    <div class="artist-row">
                      <div
                        class="artist-avatar"
                        style=${`background: conic-gradient(from ${60*e}deg, oklch(70% 0.18 ${40*e}), oklch(46% 0.16 ${(40*e+60)%360}))`}
                      ></div>
                      <div class="row-name">${t}</div>
                      <div class="row-time">Artist</div>
                    </div>
                  `)}
              </div>
            `:""}

        ${n.length>0?J`
              <div>
                <div class="small-label">Playlists</div>
                ${n.map(t=>J`
                    <div class="playlist-row">
                      <hf-album-art .obj=${t} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${t.name}</div>
                        <div class="row-sub">${t.trackCount} tracks</div>
                      </div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}_renderSuggestions(){return J`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${Qt.map(t=>J`
              <button
                class="suggest-pill"
                @click=${()=>this.store.setSearch({query:t})}
              >
                ${t}
              </button>
            `)}
        </div>
        <div class="small-label">Recent</div>
        ${qt.tracks.slice(0,4).map(t=>{const e=qt.albumById(t.albumId);return J`
            <div class="track-row">
              <hf-album-art .obj=${e} size="36" radius="6"></hf-album-art>
              <div class="row-meta">
                <div class="row-name">${t.name}</div>
                <div class="row-sub">${t.artist} · ${t.album}</div>
              </div>
              <div class="row-time">${Lt(t.durationSec)}</div>
            </div>
          `})}
      </div>
    `}};Ft.styles=l`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .top {
      padding: 14px 14px 8px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .input-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--hf-input);
      border-radius: 999px;
      padding: 8px 12px;
      border: 1px solid var(--hf-border);
    }
    input {
      flex: 1;
      background: transparent;
      border: 0;
      outline: 0;
      color: var(--hf-text);
      font-size: 13.5px;
      font: inherit;
    }
    .clear-btn {
      background: transparent;
      border: 0;
      padding: 2px;
      cursor: pointer;
      color: var(--hf-text-dim);
    }
    .filters {
      display: flex;
      gap: 6px;
      margin-top: 10px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .filters::-webkit-scrollbar {
      display: none;
    }
    .filter {
      background: transparent;
      color: var(--hf-text-dim);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .filter[data-active='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .scroll {
      flex: 1;
      overflow-y: auto;
    }
    .body {
      padding: 10px 14px 16px;
    }
    .small-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
      margin-bottom: 4px;
    }
    .section {
      margin-bottom: 16px;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0 8px;
    }
    .provider-glyph-sm {
      width: 18px;
      height: 18px;
      border-radius: 5px;
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 10px;
    }
    .provider-name {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .result-count {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-left: auto;
    }
    .album-row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0;
      scrollbar-width: none;
    }
    .album-row::-webkit-scrollbar {
      display: none;
    }
    .album-card {
      width: 96px;
      flex: none;
    }
    .album-name {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .album-artist {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .artist-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .playlist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .track-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .row-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-time {
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .row-meta {
      flex: 1;
      min-width: 0;
    }
    .suggestions {
      padding: 14px 14px;
    }
    .suggest-pill {
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      font-size: 12px;
      font-weight: 500;
    }
    .suggest-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }
  `,t([ut({attribute:!1})],Ft.prototype,"store",void 0),Ft=t([ct("hf-search-tab")],Ft);let Vt=class extends i{constructor(){super(...arguments),this.rowHeight=56,this.actionBg="#e0413a",this._dx=0,this._dragging=!1,this._startX=null,this._startDx=0,this._onDown=t=>{const e="touches"in t?t.touches[0].clientX:t.clientX;this._startX=e,this._startDx=this._dx,this._dragging=!0},this._onMove=t=>{if(null===this._startX)return;const e="touches"in t?t.touches[0].clientX:t.clientX;let r=this._startDx+(e-this._startX);r>0&&(r=0),r<-110&&(r=-110),this._dx=r},this._onUp=()=>{this._startX=null,this._dragging=!1,this._dx=this._dx<-64?-92:0},this._fireDelete=()=>{this.dispatchEvent(new CustomEvent("hf-delete",{bubbles:!0,composed:!0})),this._dx=0}}render(){return J`
      <div
        class="action"
        style=${`background:${this.actionBg}`}
        @click=${this._fireDelete}
      >
        ${this.icon??J`<span>×</span>`}
      </div>
      <div
        class=${"row "+(this._dragging?"dragging":"")}
        style=${`height:${this.rowHeight}px;transform:translateX(${this._dx}px);transition:${this._dragging?"none":"transform 0.18s"}`}
        @mousedown=${this._onDown}
        @mousemove=${this._onMove}
        @mouseup=${this._onUp}
        @mouseleave=${this._onUp}
        @touchstart=${this._onDown}
        @touchmove=${this._onMove}
        @touchend=${this._onUp}
      >
        <slot></slot>
      </div>
    `}};Vt.styles=l`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }
    .action {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
    .row {
      height: 100%;
      cursor: grab;
      background: var(--hf-bg);
    }
    .row.dragging {
      cursor: grabbing;
    }
  `,t([ut({type:Number})],Vt.prototype,"rowHeight",void 0),t([ut()],Vt.prototype,"actionBg",void 0),t([ut({attribute:!1})],Vt.prototype,"icon",void 0),t([ft()],Vt.prototype,"_dx",void 0),t([ft()],Vt.prototype,"_dragging",void 0),Vt=t([ct("hf-swipe-row")],Vt);let Yt=class extends i{constructor(){super(...arguments),this.items=[],this.rowHeight=56,this.renderRow=()=>J``,this._dragIdx=null,this._hoverIdx=null,this._startY=0,this._onMove=t=>{if(null===this._dragIdx)return;const e=("touches"in t?t.touches[0].clientY:t.clientY)-this._startY,r=Math.round(this._dragIdx+e/this.rowHeight);this._hoverIdx=Math.max(0,Math.min(this.items.length-1,r))},this._onUp=()=>{null!==this._dragIdx&&null!==this._hoverIdx&&this._hoverIdx!==this._dragIdx&&this.dispatchEvent(new CustomEvent("hf-reorder",{detail:{from:this._dragIdx,to:this._hoverIdx},bubbles:!0,composed:!0})),this._dragIdx=null,this._hoverIdx=null,window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}}createRenderRoot(){return this}render(){const t=this._positions();return J`
      <div
        style=${`position:relative;height:${this.items.length*this.rowHeight}px`}
      >
        ${this.items.map((e,r)=>{const s=r===this._dragIdx,a=t[r]??0;return J`
            <div style=${`position:absolute;left:0;right:0;top:0;transform:translateY(${a}px);${s?"transition:none;z-index:10;opacity:0.92;filter:drop-shadow(0 8px 22px rgba(0,0,0,0.4))":"transition:transform 0.18s cubic-bezier(0.2,0.7,0.3,1)"}`} .key=${e.key}>
              ${this.renderRow(e,r,{onGripDown:this._gripDownFor(r),isDragging:s})}
            </div>
          `})}
      </div>
    `}_positions(){const t=this.items.map((t,e)=>e);if(null!==this._dragIdx&&null!==this._hoverIdx){const[e]=t.splice(this._dragIdx,1);void 0!==e&&t.splice(this._hoverIdx,0,e)}const e=new Array(this.items.length).fill(0);return t.forEach((t,r)=>{e[t]=r*this.rowHeight}),e}_gripDownFor(t){return e=>{e.preventDefault(),this._dragIdx=t,this._hoverIdx=t,this._startY="touches"in e?e.touches[0].clientY:e.clientY,window.addEventListener("mousemove",this._onMove),window.addEventListener("mouseup",this._onUp),window.addEventListener("touchmove",this._onMove,{passive:!1}),window.addEventListener("touchend",this._onUp)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}};t([ut({attribute:!1})],Yt.prototype,"items",void 0),t([ut({type:Number})],Yt.prototype,"rowHeight",void 0),t([ut({attribute:!1})],Yt.prototype,"renderRow",void 0),t([ft()],Yt.prototype,"_dragIdx",void 0),t([ft()],Yt.prototype,"_hoverIdx",void 0),Yt=t([ct("hf-draggable-queue")],Yt);let Kt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return J``;const t=this.store,e=t.activePlayer,r=e.queue.slice(e.currentIdx+1),s=qt.trackById(e.queue[e.currentIdx]??""),a=r.map((t,r)=>{const s=e.currentIdx+1+r;return{key:`${t}@${s}`,id:t,idxInQueue:s}}),o=t.selectedTracks.size;return J`
      ${t.multiMode?J`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${()=>t.setMultiMode(!1)}
                aria-label="Cancel selection"
              >
                ${Pt.x({size:16})}
              </button>
              <div class="multi-count">${o} selected</div>
              <div class="multi-actions">
                <button
                  class="pill-primary"
                  @click=${()=>t.removeBulk(t.selectedTracks)}
                >
                  Remove
                </button>
              </div>
            </div>
          `:J`
            <div class="toolbar">
              <div>
                <div class="title">Queue</div>
                <div class="sub">${r.length} upcoming · drag to reorder</div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${()=>t.setMultiMode(!0)}
                >
                  ${Pt.check({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue"
                  @click=${()=>t.clearQueue()}
                >
                  ${Pt.trash({size:16})}
                </button>
              </div>
            </div>
          `}

      ${s?J`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${qt.albumById(s.albumId)}
                  size="44"
                  radius="8"
                ></hf-album-art>
                <div class="np-meta">
                  <div class="np-line">
                    <div class="np-pulse"></div>
                    <div class="np-name">${s.name}</div>
                  </div>
                  <div class="np-artist">${s.artist}</div>
                </div>
              </div>
            </div>
          `:""}

      <div class="scroll">
        <div class="small-label">Up next · ${r.length}</div>
        ${0===a.length?J`<div class="empty">Queue is empty</div>`:J`
              <hf-draggable-queue
                .items=${a}
                .rowHeight=${56}
                .renderRow=${(t,e,r)=>this._renderRow(t,r)}
                @hf-reorder=${e=>{const r=t.activePlayer.currentIdx;t.moveQueue(r+1+e.detail.from,r+1+e.detail.to)}}
              ></hf-draggable-queue>
            `}
      </div>
    `}_renderRow(t,e){const r=this.store,s=qt.trackById(t.id);if(!s)return J``;const a=qt.albumById(s.albumId),o=r.selectedTracks.has(t.idxInQueue);return J`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${()=>r.removeFromQueue(t.idxInQueue)}
      >
        <div class="row-inner" data-selected=${o}>
          ${r.multiMode?J`
                <button
                  class="checkbox"
                  data-checked=${o}
                  @click=${e=>{e.stopPropagation();const s=new Set(r.selectedTracks);s.has(t.idxInQueue)?s.delete(t.idxInQueue):s.add(t.idxInQueue),r.setSelectedTracks(s)}}
                >
                  ${o?Pt.check({size:12,sw:3}):""}
                </button>
              `:J`
                <div
                  class="grip"
                  aria-label="Drag handle"
                  @mousedown=${e.onGripDown}
                  @touchstart=${e.onGripDown}
                >
                  ${Pt.drag({size:14})}
                </div>
              `}
          <hf-album-art .obj=${a} size="40" radius="6"></hf-album-art>
          <div
            class="row-track"
            @click=${()=>r.multiMode?null:r.playTrackAt(t.idxInQueue)}
          >
            <div class="row-name">${s.name}</div>
            <div class="row-artist">${s.artist}</div>
          </div>
          <div class="row-time">${Lt(s.durationSec)}</div>
          ${r.multiMode?"":J`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${e=>{e.stopPropagation(),r.moveToTop(t.idxInQueue)}}
                >
                  ${Pt.playNext({size:14})}
                </button>
              `}
        </div>
      </hf-swipe-row>
    `}};Kt.styles=l`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .toolbar {
      padding: 14px 14px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .toolbar.multi {
      justify-content: flex-start;
    }
    .title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.05;
    }
    .sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .icon-btn-sq {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      padding: 0;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      display: grid;
      place-items: center;
      cursor: pointer;
      font: inherit;
    }
    .multi-count {
      font-size: 15px;
      font-weight: 600;
    }
    .multi-actions {
      margin-left: auto;
      display: flex;
      gap: 6px;
    }
    .pill-primary {
      padding: 7px 14px;
      border-radius: 999px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      font-size: 12px;
    }
    .now-playing {
      padding: 0 14px 12px;
    }
    .now-playing-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
      background: var(--hf-surface-alt);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
    }
    .np-meta {
      flex: 1;
      min-width: 0;
    }
    .np-line {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .np-pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--hf-accent);
      animation: hf-q-pulse 1.4s ease-in-out infinite;
    }
    @keyframes hf-q-pulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    .np-name {
      font-size: 13.5px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .np-artist {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .small-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
      margin-bottom: 4px;
    }
    .scroll {
      flex: 1;
      overflow-y: auto;
      padding: 0 14px 16px;
    }
    .empty {
      padding: 30px 0;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 12px;
    }
    .row-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 6px;
      height: 56px;
      box-sizing: border-box;
      border-radius: 8px;
    }
    .row-inner[data-selected='true'] {
      background: var(--hf-selected);
    }
    .grip {
      cursor: grab;
      padding: 4px;
      color: var(--hf-text-dim);
      flex: none;
      touch-action: none;
    }
    .row-track {
      flex: 1;
      min-width: 0;
    }
    .row-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-artist {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-time {
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .row-next {
      background: transparent;
      border: 0;
      padding: 4px;
      color: var(--hf-text-dim);
      cursor: pointer;
    }
    .checkbox {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: transparent;
      border: 1.5px solid var(--hf-border);
      display: grid;
      place-items: center;
      padding: 0;
      cursor: pointer;
      flex: none;
    }
    .checkbox[data-checked='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
  `,t([ut({attribute:!1})],Kt.prototype,"store",void 0),Kt=t([ct("hf-queue-tab")],Kt);let Xt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return J``;const t=this.store.groups,e=t.filter(t=>!t.isIdle),r=t.filter(t=>t.isIdle);return J`
      <div class="header">
        <div class="header-title">Speakers & groups</div>
        <div class="header-sub">
          ${e.length} group${1===e.length?"":"s"} ·
          ${this.store.speakers.length} speakers total
        </div>
      </div>

      <div class="groups">
        ${e.map(t=>this._renderGroupCard(t))}
      </div>

      ${r.length>0?J`
            <div class="idle-section">
              Idle
              <div class="rule"></div>
              ${r.length}
            </div>
            <div class="idle-rows">
              ${r.map(t=>this._renderIdleRow(t))}
            </div>
          `:""}

      <div class="footer-help">
        Tap a group's name to control it from the Player tab. Use Group on
        any row to add/remove rooms; ▶ on an idle row starts solo playback.
      </div>
    `}_renderGroupCard(t){const e=t.player?qt.trackById(t.player.queue[t.player.currentIdx]??""):void 0,r=e?qt.albumById(e.albumId):void 0,s=t.player?.groupVolume??t.lead.volume;return J`
      <div class="group-card" data-active=${t.isActive}>
        <div class="group-head">
          ${r?J`<hf-album-art .obj=${r} size="46" radius="9"></hf-album-art>`:J`<div class="group-art">${Pt.speaker({size:18})}</div>`}
          <div class="group-meta">
            <button class="group-name-btn" @click=${()=>this.store.setActiveLead(t.leadId)}>
              <span class="group-name">${t.name}</span>
              ${t.isActive?J`<span class="active-badge">Active</span>`:""}
            </button>
            <div class="group-track">
              ${e?J`<strong>${e.name}</strong> · ${e.artist}`:"Idle"}
            </div>
          </div>
          <div class="group-actions">
            <button
              class="pill-btn"
              title="Group rooms"
              @click=${()=>this.store.openGroupingSheet(t.leadId)}
            >
              ${Pt.group({size:13})} Group
            </button>
            <button
              class="play-btn"
              data-playing=${t.playing}
              aria-label=${t.playing?"Pause group":"Play group"}
              @click=${()=>this.store.toggleGroupPlay(t.leadId)}
            >
              ${t.playing?Pt.pause({size:14}):Pt.play({size:14})}
            </button>
          </div>
        </div>

        <div class="group-volume">
          <div class="group-volume-head">
            ${Pt.group({size:13,stroke:bt})}
            <div class="group-volume-label">
              Group · ${t.members.length} speaker${1===t.members.length?"":"s"}
            </div>
            <div class="group-volume-value">${s}</div>
          </div>
          <hf-slider
            .value=${s}
            .color=${$t}
            .track=${kt}
            @hf-input=${e=>this.store.setGroupVolumeFor(t.leadId,e.detail)}
          ></hf-slider>
        </div>

        <div class="members">
          ${t.members.map(e=>this._renderMemberRow(e,t))}
        </div>
      </div>
    `}_renderMemberRow(t,e){const r=t.id===e.leadId,s=e.members.length>1;return J`
      <div class="member-row">
        <div class="member-info">
          <div class="member-name-row">
            <div class="member-name">${t.name}</div>
            ${r&&e.members.length>1?J`<span class="lead-tag">Lead</span>`:""}
          </div>
          <hf-slider
            .value=${t.volume}
            .color=${bt}
            .track=${kt}
            .trackHeight=${3}
            .thumb=${10}
            @hf-input=${e=>this.store.setSpeakerVol(t.id,e.detail)}
          ></hf-slider>
        </div>
        <div class="member-vol-value">${t.volume}</div>
        ${s?J`
              <button
                class="member-leave"
                title="Leave group"
                @click=${()=>this.store.ungroupSpeaker(t.id)}
              >
                ${Pt.x({size:13})}
              </button>
            `:""}
      </div>
    `}_renderIdleRow(t){const e=t.lead;return J`
      <div class="idle-row">
        <div class="idle-icon">${Pt.speaker({size:14})}</div>
        <div class="idle-info">
          <div class="idle-name">${e.name}</div>
          <div class="idle-sub">${e.model} · idle</div>
        </div>
        <button
          class="idle-group-btn"
          title="Group with other rooms"
          @click=${()=>this.store.openGroupingSheet(e.id)}
        >
          ${Pt.group({size:11})} Group
        </button>
        <button
          class="idle-play-btn"
          title="Play solo here"
          aria-label="Play solo"
          @click=${()=>this.store.startSoloPlayback(e.id)}
        >
          ${Pt.play({size:11})}
        </button>
      </div>
    `}};Xt.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      padding: 8px 14px 16px;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .header {
      padding: 8px 4px 4px;
    }
    .header-title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.05;
    }
    .header-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .groups {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 4px;
    }
    .group-card {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 14px;
      overflow: hidden;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .group-card[data-active='true'] {
      border-color: var(--hf-accent);
      box-shadow: 0 0 0 2px rgba(224, 138, 74, 0.15);
    }
    .group-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 12px 10px;
    }
    .group-art {
      width: 46px;
      height: 46px;
      border-radius: 9px;
      background: var(--hf-input);
      display: grid;
      place-items: center;
      color: var(--hf-text-dim);
      flex: none;
    }
    .group-meta {
      flex: 1;
      min-width: 0;
    }
    .group-name-btn {
      background: transparent;
      border: 0;
      padding: 0;
      font: inherit;
      color: var(--hf-text);
      text-align: left;
      cursor: pointer;
      min-width: 0;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .group-name {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .active-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-accent);
      padding: 1px 6px;
      border: 1px solid var(--hf-accent);
      border-radius: 4px;
      text-transform: uppercase;
      flex: none;
    }
    .group-track {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .group-track strong {
      color: var(--hf-text);
      font-weight: 500;
    }
    .group-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pill-btn {
      height: 32px;
      padding: 0 10px;
      border-radius: 999px;
      background: transparent;
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 600;
      flex: none;
    }
    .play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      color: var(--hf-text);
      border: 1px solid var(--hf-border);
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 0;
      flex: none;
    }
    .play-btn[data-playing='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .group-volume {
      padding: 0 12px 4px;
    }
    .group-volume-head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: -2px;
      color: var(--hf-text-dim);
    }
    .group-volume-label {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .group-volume-value {
      margin-left: auto;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .members {
      border-top: 1px solid var(--hf-divider);
      padding: 6px 12px 10px;
    }
    .member-row {
      padding: 6px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .member-info {
      flex: 1;
      min-width: 0;
    }
    .member-name-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .member-name {
      font-size: 12.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lead-tag {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-text-dim);
      text-transform: uppercase;
    }
    .member-vol-value {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      width: 22px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .member-leave {
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--hf-text-dim);
      cursor: pointer;
    }
    .idle-section {
      margin: 20px 4px 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .idle-section .rule {
      flex: 1;
      height: 1px;
      background: var(--hf-divider);
    }
    .idle-rows {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .idle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 10px;
    }
    .idle-icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: var(--hf-input);
      display: grid;
      place-items: center;
      color: var(--hf-text-dim);
      flex: none;
    }
    .idle-name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .idle-sub {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .idle-info {
      flex: 1;
      min-width: 0;
    }
    .idle-group-btn {
      font-size: 11px;
      font-weight: 600;
      color: var(--hf-text);
      padding: 4px 9px;
      border-radius: 999px;
      background: transparent;
      border: 1px solid var(--hf-border);
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .idle-play-btn {
      width: 26px;
      height: 26px;
      border-radius: 999px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 0;
      flex: none;
    }
    .footer-help {
      margin-top: 16px;
      padding: 0 4px;
      font-size: 11px;
      color: var(--hf-text-dim);
      line-height: 1.5;
    }
  `,t([ut({attribute:!1})],Xt.prototype,"store",void 0),Xt=t([ct("hf-output-tab")],Xt);const Jt=l`
  .hf-pip {
    display: inline-flex;
    align-items: flex-end;
    gap: 1.5px;
    height: 10px;
  }
  .hf-pip > span {
    width: 2px;
    border-radius: 1px;
    transform-origin: bottom;
  }
  .hf-pip > span:nth-child(1) {
    height: 6px;
    animation: hf-eq-a 0.9s ease-in-out infinite;
  }
  .hf-pip > span:nth-child(2) {
    height: 9px;
    animation: hf-eq-b 0.9s ease-in-out infinite 0.15s;
  }
  .hf-pip > span:nth-child(3) {
    height: 5px;
    animation: hf-eq-c 0.9s ease-in-out infinite 0.3s;
  }
  @keyframes hf-eq-a {
    0%, 100% { transform: scaleY(0.55); }
    50% { transform: scaleY(1.35); }
  }
  @keyframes hf-eq-b {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.45); }
  }
  @keyframes hf-eq-c {
    0%, 100% { transform: scaleY(0.75); }
    50% { transform: scaleY(1.15); }
  }
`;let Zt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return J``;const t=this.store.groups;return J`
      <div class="rail">
        ${t.map(t=>{const e=t.isActive?_t:$t;return J`
            <button
              class="chip"
              data-active=${t.isActive}
              data-idle=${t.isIdle}
              @click=${()=>this.store.setActiveLead(t.leadId)}
            >
              ${t.playing?function(t){const e=`background:${t}`;return J`
    <span class="hf-pip" aria-hidden="true">
      <span style=${e}></span>
      <span style=${e}></span>
      <span style=${e}></span>
    </span>
  `}(e):Pt.speaker({size:11,stroke:"currentColor"})}
              <span class="chip-name">${t.name}</span>
              ${t.members.length>1?J`<span class="badge">${t.members.length}</span>`:""}
            </button>
          `})}
        <button
          class="manage-btn"
          aria-label="Manage groups"
          title="Manage groups"
          @click=${()=>this.store.setTab("group")}
        >
          ${Pt.group({size:13})}
        </button>
      </div>
    `}};Zt.styles=[Jt,l`
      :host {
        display: block;
        border-bottom: 1px solid var(--hf-divider);
      }
      .rail {
        display: flex;
        gap: 6px;
        padding: 2px 14px 10px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .rail::-webkit-scrollbar {
        display: none;
      }
      .chip {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px 5px 8px;
        border-radius: 999px;
        cursor: pointer;
        font: inherit;
        background: transparent;
        color: var(--hf-text);
        border: 1px solid var(--hf-border);
        white-space: nowrap;
        max-width: 220px;
        overflow: hidden;
      }
      .chip[data-active='true'] {
        background: var(--hf-accent);
        color: var(--hf-accent-text);
        border-color: var(--hf-accent);
      }
      .chip[data-idle='true'] {
        color: var(--hf-text-dim);
        opacity: 0.7;
      }
      .chip-name {
        font-size: 11.5px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
      }
      .badge {
        font-size: 9.5px;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 999px;
        background: var(--hf-input);
        color: var(--hf-text-dim);
      }
      .chip[data-active='true'] .badge {
        background: rgba(0, 0, 0, 0.18);
        color: var(--hf-accent-text);
      }
      .manage-btn {
        flex: none;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: transparent;
        border: 1px dashed var(--hf-border);
        display: grid;
        place-items: center;
        color: var(--hf-text-dim);
        cursor: pointer;
        padding: 0;
      }
    `],t([ut({attribute:!1})],Zt.prototype,"store",void 0),Zt=t([ct("hf-group-chip-rail")],Zt);let te=class extends i{constructor(){super(...arguments),this._draft=new Set,this._initialDraft=new Set,this._wasOpen=!1,this._apply=()=>{const t=this.store.groupingSheet;t.leadId&&this.store.commitGroupMembers(t.leadId,Array.from(this._draft))}}willUpdate(t){if(t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store)),this.store){const t=this.store.groupingSheet.open;t&&!this._wasOpen&&this._seedDraft(),this._wasOpen=t}}_seedDraft(){const t=this.store.groupingSheet.leadId;if(!t)return;const e=this.store.speakers.filter(e=>e.leadId===t).map(t=>t.id);e.push(t);const r=new Set(e);this._draft=r,this._initialDraft=new Set(r)}render(){const t=this.store?.groupingSheet;if(!t?.open)return this.toggleAttribute("data-open",!1),J``;this.toggleAttribute("data-open",!0);const e=t.leadId,r=this.store.speakers.find(t=>t.id===e);if(!r)return J``;const s=this._draft.size,a=this._diffChanged(),o=0===s?"Group will be dissolved":1===s?"Will play solo":`${s} rooms grouped`;return J`
      <div class="scrim" @click=${()=>this.store.closeGroupingSheet()}></div>
      <div class="sheet" @click=${t=>t.stopPropagation()}>
        <div class="grip"><div></div></div>
        <div class="header">
          <div class="header-title">Group rooms</div>
          <div class="header-sub">
            Choose rooms to play in sync with
            <strong>${r.name}</strong>.
          </div>
        </div>
        <div class="list">
          ${this.store.speakers.map(t=>{const r=this._draft.has(t.id),s=t.id===e;return J`
              <button
                class="row"
                data-checked=${r}
                @click=${()=>this._toggle(t.id)}
              >
                <div class="check">
                  ${r?Pt.check({size:15,sw:2.6}):""}
                </div>
                <div class="row-info">
                  <div class="row-name-line">
                    <div class="row-name">${t.name}</div>
                    ${s?J`<span class="anchor-tag">Anchor</span>`:""}
                  </div>
                  <div class="row-sub">
                    ${t.model}${this._contextFor(t.id,e)?` · ${this._contextFor(t.id,e)}`:""}
                  </div>
                </div>
                <div class="row-vol">vol ${t.volume}</div>
              </button>
            `})}
        </div>
        <div class="footer">
          <div class="footer-status">${o}</div>
          <button class="btn btn-cancel" @click=${()=>this.store.closeGroupingSheet()}>
            Cancel
          </button>
          <button
            class="btn btn-done"
            ?disabled=${!a}
            @click=${this._apply}
          >
            Done
          </button>
        </div>
      </div>
    `}_toggle(t){const e=this.store.groupingSheet,r=new Set(this._draft);if(r.has(t)){if(t===e.leadId&&r.size>1)return;r.delete(t)}else r.add(t);this._draft=r}_diffChanged(){if(this._initialDraft.size!==this._draft.size)return!0;for(const t of this._initialDraft)if(!this._draft.has(t))return!0;return!1}_contextFor(t,e){const r=this.store.speakers.find(e=>e.id===t);if(!r)return null;if(r.leadId===e)return null;const s=this.store.groups.find(t=>t.leadId===r.leadId);return s?1===s.members.length?s.player?"Playing solo":"Idle":`In ${s.name}`:null}};te.styles=l`
    :host {
      position: absolute;
      inset: 0;
      z-index: 50;
      pointer-events: none;
    }
    :host([data-open='true']) {
      pointer-events: auto;
    }
    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      animation: hf-sheet-fade 0.18s ease-out;
    }
    .sheet {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--hf-bg);
      color: var(--hf-text);
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.45);
      max-height: 92%;
      display: flex;
      flex-direction: column;
      animation: hf-sheet-slide 0.24s cubic-bezier(0.2, 0.7, 0.3, 1);
    }
    @keyframes hf-sheet-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes hf-sheet-slide {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .grip {
      display: flex;
      justify-content: center;
      padding: 8px 0 4px;
    }
    .grip > div {
      width: 36px;
      height: 4px;
      border-radius: 4px;
      background: var(--hf-border);
    }
    .header {
      padding: 6px 18px 12px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .header-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .header-sub {
      font-size: 12px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .header-sub strong {
      color: var(--hf-text);
      font-weight: 600;
    }
    .list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 12px 18px;
      background: transparent;
      border: 0;
      cursor: pointer;
      font: inherit;
      color: var(--hf-text);
      text-align: left;
      border-bottom: 1px solid var(--hf-divider);
    }
    .check {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: transparent;
      border: 1.5px solid var(--hf-border);
      display: grid;
      place-items: center;
      flex: none;
      transition: background 0.12s, border-color 0.12s;
    }
    .row[data-checked='true'] .check {
      background: var(--hf-accent);
      border-color: var(--hf-accent);
      color: var(--hf-accent-text);
    }
    .row-info {
      flex: 1;
      min-width: 0;
    }
    .row-name-line {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .row-name {
      font-size: 14.5px;
      font-weight: 600;
    }
    .anchor-tag {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-accent);
      padding: 1px 5px;
      text-transform: uppercase;
      border: 1px solid var(--hf-accent);
      border-radius: 4px;
    }
    .row-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .row-vol {
      font-size: 11px;
      color: var(--hf-text-dim);
      font-variant-numeric: tabular-nums;
    }
    .footer {
      padding: 12px 18px 18px;
      border-top: 1px solid var(--hf-divider);
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--hf-surface);
    }
    .footer-status {
      font-size: 12px;
      color: var(--hf-text-dim);
      flex: 1;
    }
    .btn {
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
    }
    .btn-cancel {
      background: transparent;
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
    }
    .btn-done {
      padding: 8px 18px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
    }
    .btn-done[disabled] {
      background: var(--hf-input);
      color: var(--hf-text-dim);
      cursor: default;
      opacity: 0.7;
    }
  `,t([ut({attribute:!1})],te.prototype,"store",void 0),t([ft()],te.prototype,"_draft",void 0),te=t([ct("hf-group-sheet")],te);const ee=[{key:"hasMA",name:"Music Assistant",why:"Browses libraries (Spotify, Apple Music, Tidal, …), drives playback, and surfaces now-playing metadata.",hint:"Install the Music Assistant add-on, then add the integration under Settings → Devices & Services.",link:"https://music-assistant.io"},{key:"hasQueueActions",name:"Music Assistant Queue Actions (mass_queue)",why:"Adds queue manipulation services (reorder, remove, clear) the card uses on the Queue tab. Registers services under the mass_queue domain.",hint:'Install via HACS — "Music Assistant Queue Actions" by droans — then add it under Settings → Devices & Services.',link:"https://github.com/droans/mass_queue"},{key:"hasWiim",name:"WiiM Audio (LinkPlay)",why:"Provides WiiM-native Linkplay grouping. The card uses this for all multi-room sync, never MA grouping.",hint:'Install via HACS — "WiiM Audio Integration for Home Assistant" by mjcumming — then add each device under Settings → Devices & Services.',link:"https://github.com/mjcumming/wiim"}];let ie=class extends i{render(){if(!this.status)return J``;const t=ee.filter(t=>!this.status[t.key]),e=t.length;return J`
      <div class="head">
        <div class="head-icon">${Pt.note({size:16})}</div>
        <div class="head-text">
          <div class="head-title">Setup incomplete</div>
          <div class="head-sub">
            ${e} of ${ee.length} required
            integration${1===e?"":"s"} missing
          </div>
        </div>
      </div>

      <div class="summary">
        The Homefront Music Card needs <strong>three integrations</strong>
        installed in Home Assistant. Each handles a separate part of the
        card: content + playback (MA), queue manipulation (Queue Actions),
        and multi-room grouping (WiiM/Linkplay).
      </div>

      <div class="list">
        ${ee.map(t=>this._renderRow(t))}
      </div>

      <div class="footer">
        After installing the missing piece${1===e?"":"s"},
        reload Home Assistant (or restart). This card will pick up the
        changes automatically.
      </div>

      <div class="diagnostics">
        <div class="diagnostics-title">Detection diagnostics</div>
        ${this.status.diagnostics.map(t=>J`
            <div class="diag-line">
              <span class=${"diag-mark "+(t.matched?"ok":"miss")}>
                ${t.matched?"✓":"✗"}
              </span>
              <span class="diag-text">[${t.target}] ${t.label}</span>
            </div>
          `)}
      </div>
    `}_renderRow(t){const e=this.status[t.key];return J`
      <div class="row" data-state=${e?"ok":"missing"}>
        <div class="row-status">
          ${e?Pt.check({size:14,sw:2.4}):Pt.plus({size:14,sw:2.4})}
        </div>
        <div class="row-body">
          <div class="row-name">${t.name}</div>
          <div class="row-why">${t.why}</div>
          ${e?J`<div class="row-hint">Detected ✓</div>`:J`
                <div class="row-hint">
                  ${t.hint}
                  ${t.link?J` <a href=${t.link} target="_blank" rel="noopener">
                        Open repo →
                      </a>`:""}
                </div>
              `}
        </div>
      </div>
    `}};ie.styles=[Mt,l`
      :host {
        display: block;
        background: var(--hf-bg);
        color: var(--hf-text);
        font-family: var(--hf-font);
        border-radius: 16px;
        border: 1px solid var(--hf-border);
        padding: 22px 20px 24px;
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(224, 138, 74, 0.14);
        color: var(--hf-accent);
        display: grid;
        place-items: center;
      }
      .head-text {
        min-width: 0;
      }
      .head-title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .head-sub {
        font-size: 12px;
        color: var(--hf-text-dim);
        margin-top: 2px;
      }
      .summary {
        margin: 14px 0 6px;
        font-size: 12px;
        color: var(--hf-text-dim);
        line-height: 1.55;
      }
      .summary strong {
        color: var(--hf-text);
        font-weight: 600;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }
      .row {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: var(--hf-surface);
        border: 1px solid var(--hf-border);
        border-radius: 12px;
      }
      .row[data-state='ok'] {
        opacity: 0.7;
      }
      .row-status {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: none;
      }
      .row[data-state='missing'] .row-status {
        background: rgba(224, 138, 74, 0.16);
        color: var(--hf-accent);
      }
      .row[data-state='ok'] .row-status {
        background: rgba(120, 200, 120, 0.16);
        color: rgb(120, 200, 120);
      }
      .row-body {
        flex: 1;
        min-width: 0;
      }
      .row-name {
        font-size: 13.5px;
        font-weight: 700;
      }
      .row-why {
        font-size: 12px;
        color: var(--hf-text-dim);
        margin-top: 3px;
        line-height: 1.45;
      }
      .row-hint {
        margin-top: 8px;
        font-size: 11.5px;
        color: var(--hf-text);
        line-height: 1.45;
      }
      .row-hint a {
        color: var(--hf-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .row-hint a:hover {
        text-decoration: underline;
      }
      .footer {
        margin-top: 14px;
        font-size: 11px;
        color: var(--hf-text-dim);
        line-height: 1.5;
      }
      .diagnostics {
        margin-top: 14px;
        padding: 10px 12px;
        background: var(--hf-input);
        border: 1px solid var(--hf-border);
        border-radius: 8px;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 10.5px;
        color: var(--hf-text-dim);
        line-height: 1.6;
      }
      .diagnostics-title {
        font-family: var(--hf-font);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--hf-text);
        margin-bottom: 6px;
      }
      .diag-line {
        display: flex;
        gap: 6px;
        align-items: flex-start;
      }
      .diag-mark {
        flex: none;
        width: 14px;
        text-align: center;
      }
      .diag-mark.ok {
        color: rgb(120, 200, 120);
      }
      .diag-mark.miss {
        color: var(--hf-accent);
      }
      .diag-text {
        flex: 1;
        word-break: break-word;
      }
    `],t([ut({attribute:!1})],ie.prototype,"status",void 0),ie=t([ct("hf-setup-help")],ie),window.customCards=window.customCards||[],window.customCards.push({type:"homefront-music-card",name:"Homefront Music Card",description:"Music Assistant + WiiM multi-room controller",preview:!1});const re=[{id:"player",label:"Player",icon:"play"},{id:"browser",label:"Browse",icon:"home"},{id:"search",label:"Search",icon:"search"},{id:"queue",label:"Queue",icon:"queue"},{id:"group",label:"Output",icon:"speaker"}];let se=class extends i{constructor(){super(),this._store=new Store,new StoreController(this,this._store)}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,this._store.setConfig(t)}willUpdate(t){t.has("hass")&&this.hass&&(this._integrationStatus=function(t){const e=t.services??{},r=t.states??{},s=[],a=e.music_assistant??{},o=e.mass_queue??{},n=e.wiim??{},l=!!a.play_media;s.push({target:"MA",label:"service music_assistant.play_media",matched:l});const d=["get_queue_items","remove_queue_item","move_queue_item_up","play_queue_item","clear_queue_from_here"],c=d.find(t=>!!o[t]),h=!!c;s.push({target:"QueueActions",label:`mass_queue domain has any of ${d.join(", ")}`,matched:h});const p=Object.keys(o);p.length>0&&s.push({target:"QueueActions",label:`mass_queue domain services found: ${p.slice(0,6).join(", ")}${p.length>6?"…":""}`,matched:!0});const u=["play_preset","play_url","set_eq","get_queue"],f=u.find(t=>!!n[t]),m=!!f;s.push({target:"WiiM",label:`wiim domain has any of ${u.join(", ")}`,matched:m});const v=Object.keys(n);v.length>0&&s.push({target:"WiiM",label:`wiim domain services found: ${v.slice(0,6).join(", ")}${v.length>6?"…":""}`,matched:!0});const g=Object.values(r).some(t=>{if(!t.entity_id.startsWith("media_player."))return!1;const e=t.attributes.group_role;return"master"===e||"slave"===e||"solo"===e});s.push({target:"WiiM",label:"any media_player.* attribute group_role is master/slave/solo",matched:g});const b=m||g;return{hasMA:l,hasQueueActions:h,hasWiim:b,allPresent:l&&h&&b,diagnostics:s}}(this.hass),this._integrationStatus.allPresent&&this._store.setHass(this.hass))}getCardSize(){return 12}disconnectedCallback(){super.disconnectedCallback(),this._store.dispose()}render(){return this._integrationStatus&&!this._integrationStatus.allPresent?J`<hf-setup-help .status=${this._integrationStatus}></hf-setup-help>`:J`
      <div class="frame">
        ${this._renderTitle()}
        <hf-group-chip-rail .store=${this._store}></hf-group-chip-rail>
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
      <hf-group-sheet .store=${this._store}></hf-group-sheet>
      ${this._config?.debug?this._renderDebugOverlay():""}
    `}_renderDebugOverlay(){const t=this._store.diagnosticNotes;return J`
      <div class="debug-overlay">
        <div class="debug-overlay-title">
          ${this._store.isHassMode?"HASS MODE":"MOCK MODE"} · zone discovery
        </div>
        ${t.length>0?t.map(t=>J`<div class="debug-overlay-line">${t}</div>`):J`<div class="debug-overlay-line">(no diagnostics yet)</div>`}
      </div>
    `}_renderTitle(){const t=this._config?.zones?.length??0,e=this._store.groups.filter(t=>t.playing).length,r=t>0?` · ${t} zone${1===t?"":"s"}`:" · mock";return J`
      <div class="title-row">
        <span class="title-icon">${Pt.note({size:14})}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">
          ${e} group${1===e?"":"s"} playing${r}
        </span>
      </div>
    `}_renderActiveTab(){switch(this._store.tab){case"player":return J`<hf-player-tab .store=${this._store}></hf-player-tab>`;case"browser":return J`<hf-browse-tab .store=${this._store}></hf-browse-tab>`;case"search":return J`<hf-search-tab .store=${this._store}></hf-search-tab>`;case"queue":return J`<hf-queue-tab .store=${this._store}></hf-queue-tab>`;case"group":return J`<hf-output-tab .store=${this._store}></hf-output-tab>`}}_renderTabBar(){return J`
      <div class="tab-bar" role="tablist">
        ${re.map(t=>{const e=this._store.tab===t.id;return J`
            <button
              class="tab"
              role="tab"
              aria-selected=${e}
              @click=${()=>this._store.setTab(t.id)}
            >
              ${Pt[t.icon]({size:18})}
              <span class="tab-label">${t.label}</span>
            </button>
          `})}
      </div>
    `}};se.styles=[Mt,l`
      :host {
        display: block;
        position: relative;
        background: var(--hf-bg);
        color: var(--hf-text);
        border-radius: 16px;
        overflow: hidden;
        font-family: var(--hf-font);
        border: 1px solid var(--hf-border);
        /* Keep the card a fixed height so the body scrolls internally,
           never the dashboard. Capped at 90vh so it always fits the
           viewport (mobile included). */
        height: min(820px, 90vh);
      }
      .frame {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: inherit;
      }
      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px 8px;
      }
      .title-icon {
        color: var(--hf-text);
        display: inline-flex;
      }
      .title-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
      }
      .title-sub {
        font-size: 11px;
        color: var(--hf-text-dim);
        margin-left: 6px;
      }
      .body {
        flex: 1;
        min-height: 0;
        position: relative;
      }
      .tab-bar {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-top: 1px solid var(--hf-border);
        background: var(--hf-surface);
        padding-bottom: 4px;
      }
      .tab {
        background: transparent;
        border: 0;
        padding: 8px 0 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        color: var(--hf-text-dim);
        cursor: pointer;
        font: inherit;
        position: relative;
      }
      .tab[aria-selected='true'] {
        color: var(--hf-accent);
      }
      .tab[aria-selected='true']::before {
        content: '';
        position: absolute;
        top: 0;
        left: 30%;
        right: 30%;
        height: 2px;
        background: var(--hf-accent);
        border-radius: 2px;
      }
      .tab-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      .debug-overlay {
        position: absolute;
        bottom: 4px;
        left: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.85);
        color: #ecedef;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 10.5px;
        line-height: 1.5;
        border-radius: 6px;
        padding: 8px 10px;
        z-index: 60;
        max-height: 40%;
        overflow-y: auto;
        pointer-events: auto;
      }
      .debug-overlay-title {
        font-family: var(--hf-font);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--hf-accent);
        margin-bottom: 4px;
      }
      .debug-overlay-line {
        white-space: pre-wrap;
        word-break: break-word;
      }
    `],t([ut({attribute:!1})],se.prototype,"hass",void 0),t([ft()],se.prototype,"_config",void 0),t([ft()],se.prototype,"_integrationStatus",void 0),se=t([ct("homefront-music-card")],se);export{se as HomefrontMusicCard};
