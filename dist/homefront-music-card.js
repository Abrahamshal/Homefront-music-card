function t(t,e,s,r){var o,n=arguments.length,a=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,r);else for(var h=t.length-1;h>=0;h--)(o=t[h])&&(a=(n<3?o(a):n>3?o(e,s,a):o(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const a=t=>new n("string"==typeof t?t:t+"",void 0,r),h=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new n(s,t,r)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return a(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,g=globalThis,v=g.trustedTypes,y=v?v.emptyScript:"",b=g.reactiveElementPolyfillSupport,$=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:o}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...u(t),...f(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(s)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of r){const r=document.createElement("style"),o=e.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=s.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(void 0!==r&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=s.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=r;const n=o.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,s,r=!1,o){if(void 0!==t){const n=this.constructor;if(!1===r&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??x)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,s,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,b?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.2");const M=globalThis,E=t=>t,C=M.trustedTypes,P=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+O,B=`<${U}>`,N=document,j=()=>N.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,q=Array.isArray,V="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,G=/>/g,K=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,J=/"/g,Y=/^(?:script|style|textarea|title)$/i,X=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),it=new WeakMap,st=N.createTreeWalker(N,129);function rt(t,e){if(!q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const ot=(t,e)=>{const s=t.length-1,r=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=W;for(let e=0;e<s;e++){const s=t[e];let h,l,c=-1,d=0;for(;d<s.length&&(a.lastIndex=d,l=a.exec(s),null!==l);)d=a.lastIndex,a===W?"!--"===l[1]?a=F:void 0!==l[1]?a=G:void 0!==l[2]?(Y.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=K):void 0!==l[3]&&(a=K):a===K?">"===l[0]?(a=o??W,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,h=l[1],a=void 0===l[3]?K:'"'===l[3]?J:Q):a===J||a===Q?a=K:a===F||a===G?a=W:(a=K,o=void 0);const p=a===K&&t[e+1].startsWith("/>")?" ":"";n+=a===W?s+B:c>=0?(r.push(h),s.slice(0,c)+T+s.slice(c)+O+p):s+O+(-2===c?e:p)}return[rt(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class S{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,n=0;const a=t.length-1,h=this.parts,[l,c]=ot(t,e);if(this.el=S.createElement(l,s),st.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=st.nextNode())&&h.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(T)){const e=c[n++],s=r.getAttribute(t).split(O),a=/([.?@])?(.*)/.exec(e);h.push({type:1,index:o,name:a[2],strings:s,ctor:"."===a[1]?I:"?"===a[1]?L:"@"===a[1]?z:H}),r.removeAttribute(t)}else t.startsWith(O)&&(h.push({type:6,index:o}),r.removeAttribute(t));if(Y.test(r.tagName)){const t=r.textContent.split(O),e=t.length-1;if(e>0){r.textContent=C?C.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],j()),st.nextNode(),h.push({type:2,index:++o});r.append(t[e],j())}}}else if(8===r.nodeType)if(r.data===U)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(O,t+1));)h.push({type:7,index:o}),t+=O.length-1}o++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function nt(t,e,s=t,r){if(e===tt)return e;let o=void 0!==r?s._$Co?.[r]:s._$Cl;const n=D(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,r)),void 0!==r?(s._$Co??=[])[r]=o:s._$Cl=o),void 0!==o&&(e=nt(t,o._$AS(t,e.values),o,r)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??N).importNode(e,!0);st.currentNode=r;let o=st.nextNode(),n=0,a=0,h=s[0];for(;void 0!==h;){if(n===h.index){let e;2===h.type?e=new k(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new Z(o,this,t)),this._$AV.push(e),h=s[++a]}n!==h?.index&&(o=st.nextNode(),n++)}return st.currentNode=N,r}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),D(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>q(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(rt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new R(r,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=it.get(t.strings);return void 0===e&&it.set(t.strings,e=new S(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const o of t)r===e.length?e.push(s=new k(this.O(j()),this.O(j()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=et}_$AI(t,e=this,s,r){const o=this.strings;let n=!1;if(void 0===o)t=nt(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==tt,n&&(this._$AH=t);else{const r=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=nt(this,r[s+a],e,a),h===tt&&(h=this._$AH[a]),n||=!D(h)||h!==this._$AH[a],h===et?t=et:t!==et&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!r&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class z extends H{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??et)===tt)return;const s=this._$AH,r=t===et&&s!==et||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==et&&(s===et||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const at=M.litHtmlPolyfillSupport;at?.(S,k),(M.litHtmlVersions??=[]).push("3.3.3");const ht=globalThis;class i extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const r=s?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=s?.renderBefore??null;r._$litPart$=o=new k(e.insertBefore(j(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}}i._$litElement$=!0,i.finalized=!0,ht.litElementHydrateSupport?.({LitElement:i});const lt=ht.litElementPolyfillSupport;lt?.({LitElement:i}),(ht.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},pt=(t=dt,e,s)=>{const{kind:r,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===r){const{name:r}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(r,o,t,!0,s)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=s;return function(s){const o=this[r];e.call(this,s),this.requestUpdate(r,o,t,!0,s)}}throw Error("Unsupported decorator location: "+r)};function ut(t){return(e,s)=>"object"==typeof s?pt(t,e,s):((t,e,s)=>{const r=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),r?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}const ft="#1d2026",mt="#23272f",gt="#ecedef",vt="rgba(236,237,239,0.55)",yt="rgba(255,255,255,0.07)",bt="rgba(255,255,255,0.16)",$t="rgba(255,255,255,0.05)",_t="#e08a4a",xt="#1b0f06",wt="rgba(255,255,255,0.12)",kt="rgba(255,255,255,0.04)",At="rgba(224,138,74,0.12)",St="14px",Mt=h`
  :host {
    --hf-bg: ${a("#16181d")};
    --hf-surface: ${a(ft)};
    --hf-surface-alt: ${a(mt)};
    --hf-text: ${a(gt)};
    --hf-text-dim: ${a(vt)};
    --hf-border: ${a(yt)};
    --hf-border-active: ${a(bt)};
    --hf-divider: ${a($t)};
    --hf-accent: ${a(_t)};
    --hf-accent-text: ${a(xt)};
    --hf-slider-track: ${a(wt)};
    --hf-input: ${a(kt)};
    --hf-selected: ${a(At)};
    --hf-radius: ${a(St)};
    --hf-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
`;function Et(t,e={}){return(s={})=>{const r=s.size??20,o=s.stroke??"currentColor",n=s.sw??e.sw??1.7;return X`<svg width=${r} height=${r} viewBox="0 0 24 24" fill="none" stroke=${o} stroke-width=${n} stroke-linecap="round" stroke-linejoin="round"><path d=${t} /></svg>`}}function Ct(t){return(e={})=>{const s=e.size??20,r=e.fill??"currentColor";return X`<svg width=${s} height=${s} viewBox="0 0 24 24" fill=${r} stroke="none"><path d=${t} /></svg>`}}const Pt={play:Ct("M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z"),pause:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>`},prev:Ct("M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z"),next:Ct("M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z"),shuffle:Et("M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5"),rep:Et("M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3"),rep1:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />
      <text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none">1</text>
    </svg>`},queue:Et("M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2"),search:Et("M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7"),home:Et("M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z"),speaker:Et("M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14"),group:Et("M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4"),dot3:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>`},x:Et("M6 6l12 12 M18 6L6 18"),chev:Et("M9 6l6 6-6 6"),chevL:Et("M15 6l-6 6 6 6"),chevD:Et("M6 9l6 6 6-6"),plus:Et("M12 5v14 M5 12h14"),check:Et("M5 12l4 4 10-10"),drag:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
    </svg>`},trash:Et("M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"),top:Et("M12 19V7 M6 13l6-6 6 6 M5 4h14"),playNext:Et("M5 5l10 7-10 7V5z M19 6v12",{sw:2}),radio:Et("M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14"),list:Et("M4 6h16 M4 12h16 M4 18h16"),album:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.6;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>`},artist:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>`},note:Et("M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"),heart:Et("M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z"),filter:Et("M4 5h16l-6 8v6l-4-2v-4L4 5z"),sun:(t={})=>{const e=t.size??14,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>`},moon:Et("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z")},It=[{id:"al1",name:"Mordechai",artist:"Khruangbin",h1:22,h2:350,year:2020},{id:"al2",name:"Salad Days",artist:"Mac DeMarco",h1:142,h2:80,year:2014},{id:"al3",name:"Awake",artist:"Tycho",h1:200,h2:280,year:2014},{id:"al4",name:"Migration",artist:"Bonobo",h1:32,h2:210,year:2017},{id:"al5",name:"Crush",artist:"Floating Points",h1:320,h2:18,year:2019},{id:"al6",name:"Pang",artist:"Caroline Polachek",h1:290,h2:340,year:2019},{id:"al7",name:"Mood Valiant",artist:"Hiatus Kaiyote",h1:12,h2:330,year:2021},{id:"al8",name:"In Colour",artist:"Jamie xx",h1:50,h2:200,year:2015},{id:"al9",name:"Spaces",artist:"Nils Frahm",h1:220,h2:240,year:2013},{id:"al10",name:"Untitled (Black Is)",artist:"SAULT",h1:0,h2:18,year:2020},{id:"al11",name:"French Kiwi Juice",artist:"FKJ",h1:175,h2:90,year:2017},{id:"al12",name:"Oncle Jazz",artist:"Men I Trust",h1:195,h2:250,year:2019},{id:"al13",name:"U.F.O.F.",artist:"Big Thief",h1:100,h2:175,year:2019},{id:"al14",name:"Bloom",artist:"Beach House",h1:280,h2:200,year:2012},{id:"al15",name:"Skiptracing",artist:"Mild High Club",h1:36,h2:5,year:2016},{id:"al16",name:"A Moment Apart",artist:"ODESZA",h1:245,h2:300,year:2017},{id:"al17",name:"Punisher",artist:"Phoebe Bridgers",h1:215,h2:245,year:2020},{id:"al18",name:"Vulture Prince",artist:"Arooj Aftab",h1:18,h2:28,year:2021}],zt=["Pelota","White Gloves","A Walk","Cirrus","Birth","Welcome To My Island","Red Room","Loud Places","Says","Wildfires","Skyline","Tides","Lemon Twigs","Last Light","Mountain at My Gates","Slow Burn","Vega","Daydream","Mirror Maru","Late Night","Soft Universe","Ondas","Reverie","Long Way Home","Eclipse","Powder Blue","Dreamcaster","After Hours","Ember"].map((t,e)=>{const s=It[e%It.length];return{id:`tr${e+1}`,name:t,artist:s.artist,album:s.name,albumId:s.id,durationSec:120+47*e%240}}),Tt=[{id:"spotify",name:"Spotify",glyph:"S",brandHue:140,accounts:[{id:"sp-main",name:"tom@home",tier:"Premium",email:"tom@home.local"},{id:"sp-shared",name:"Family · shared",tier:"Family",email:"fam@home.local"}]},{id:"apple",name:"Apple Music",glyph:"",brandHue:0,accounts:[{id:"ap-tom",name:"tom@icloud",tier:"Individual",email:"tom@icloud.com"}]},{id:"soundcloud",name:"SoundCloud",glyph:"~",brandHue:25,accounts:[{id:"sc-tom",name:"@tom_listens",tier:"Go+",email:"tom@sc.local"}]}];function Ht(t){const e=Math.max(0,Math.floor(t)),s=e%60;return`${Math.floor(e/60)}:${s<10?`0${s}`:s}`}function Ot(t,e={}){const{angle:s=135,lift:r=0}=e;if(!t)return"linear-gradient(135deg,#444,#222)";return`linear-gradient(${s}deg, oklch(${56+r}% 0.18 ${t.h1??200}), oklch(${30+r}% 0.16 ${t.h2??280}))`}const Lt={albums:It,tracks:zt,playlists:[{id:"pl1",name:"Deep Focus",owner:"Music Assistant",trackCount:86,h1:220,h2:280,mood:"instrumental·calm"},{id:"pl2",name:"Late-Night Drive",owner:"you",trackCount:42,h1:260,h2:340,mood:"atmospheric·downtempo"},{id:"pl3",name:"Sunday Cooking",owner:"you",trackCount:58,h1:30,h2:18,mood:"soul·jazz"},{id:"pl4",name:"Mellow Mornings",owner:"Editorial",trackCount:64,h1:50,h2:30,mood:"acoustic·warm"},{id:"pl5",name:"Workout",owner:"you",trackCount:38,h1:0,h2:340,mood:"high tempo·electronic"},{id:"pl6",name:"Liked Songs",owner:"you",trackCount:312,h1:130,h2:180,mood:"your favorites"},{id:"pl7",name:"Patio Sessions",owner:"you",trackCount:51,h1:180,h2:220,mood:"summer·chill"},{id:"pl8",name:"Discover Weekly",owner:"Editorial",trackCount:30,h1:290,h2:200,mood:"new finds"}],radioStations:[{id:"rd1",name:"KCRW · Eclectic 24",genre:"Eclectic",h1:12,h2:340},{id:"rd2",name:"NTS Radio 1",genre:"Underground",h1:30,h2:12},{id:"rd3",name:"BBC 6 Music",genre:"Alternative",h1:200,h2:250},{id:"rd4",name:"WWOZ New Orleans",genre:"Jazz · Blues",h1:38,h2:5},{id:"rd5",name:"Worldwide FM",genre:"Global",h1:165,h2:220}],providers:Tt,speakers:[{id:"sp1",name:"Living Room",room:"Living Room",model:"Sonos Era 300",volume:38},{id:"sp2",name:"Kitchen",room:"Kitchen",model:"Sonos One",volume:28},{id:"sp3",name:"Bedroom",room:"Bedroom",model:"HomePod mini",volume:18},{id:"sp4",name:"Office",room:"Office",model:"WiiM Pro + KEF",volume:45},{id:"sp5",name:"Patio",room:"Outside",model:"Sonos Move 2",volume:60},{id:"sp6",name:"Bathroom",room:"Bathroom",model:"HomePod mini",volume:22}],initialQueue:["tr1","tr5","tr12","tr18","tr9","tr3","tr22","tr7","tr15","tr27","tr2","tr11"],artistList:["Khruangbin","Mac DeMarco","Tycho","Bonobo","Floating Points","Caroline Polachek","Hiatus Kaiyote","Jamie xx","Nils Frahm","SAULT","FKJ","Men I Trust","Big Thief","Beach House","Mild High Club","ODESZA","Phoebe Bridgers","Vulfpeck","Yussef Dayes","Arooj Aftab"],fmtTime:Ht,albumById:function(t){return It.find(e=>e.id===t)},trackById:function(t){return zt.find(e=>e.id===t)},providerById:function(t){return Tt.find(e=>e.id===t)},artGradient:Ot};function Ut(t,e,s){return{queue:t.slice(),currentIdx:0,position:e,playing:!0,shuffle:!1,repeat:"off",groupVolume:s}}class Store extends EventTarget{constructor(){super(),this.tab="player",this.browser={crumbs:[{kind:"root",label:"Sources"}],providerId:null,accountId:null,sub:"playlists",detailId:null},this.search={query:"",filter:"all"},this.selectedTracks=new Set,this.multiMode=!1,this.groupingSheet={open:!1,leadId:null},this._tickInterval=null,this.speakers=Lt.speakers.map(t=>({...t,leadId:t.id}));const t=this.speakers.find(t=>"sp2"===t.id);t&&(t.leadId="sp1"),this.players={sp1:{...Ut(Lt.initialQueue,48,38),playing:!0},sp5:{...Ut(["tr3","tr18","tr7","tr12","tr22"],14,60),playing:!0,shuffle:!0}},this.activeLeadId="sp1",this._startTick()}get groups(){var t;const e={};for(const s of this.speakers)(e[t=s.leadId]??(e[t]=[])).push(s);return Object.keys(e).map(t=>{const s=e[t],r=s.find(e=>e.id===t)??s[0],o=this.players[t],n=1===s.length?r.name:s.map(t=>t.name).join(" + ");return{leadId:t,lead:r,members:s,name:n,player:o,playing:!!o?.playing,isActive:t===this.activeLeadId,isIdle:!o}}).sort((t,e)=>t.isActive!==e.isActive?t.isActive?-1:1:t.isIdle!==e.isIdle?t.isIdle?1:-1:t.lead.name.localeCompare(e.lead.name))}get activePlayer(){return this.players[this.activeLeadId]??Ut(Lt.initialQueue,0,30)}get activeGroup(){return this.groups.find(t=>t.leadId===this.activeLeadId)}get currentTrack(){const t=this.activePlayer,e=t.queue[t.currentIdx];return(e?Lt.trackById(e):void 0)??Lt.tracks[0]}get currentAlbum(){const t=Lt.albumById(this.currentTrack.albumId);if(!t)throw new Error(`Missing album for track ${this.currentTrack.id}`);return t}_emit(){this.dispatchEvent(new Event("change"))}setTab(t){this.tab!==t&&(this.tab=t,this._emit())}setActiveLead(t){this.players[t]||(this.players[t]=Ut(Lt.initialQueue,0,30)),this.activeLeadId=t,this._emit()}_patchActive(t){const e=this.players[this.activeLeadId]??Ut(Lt.initialQueue,0,30);this.players[this.activeLeadId]={...e,...t},this._emit()}setPlaying(t){this._patchActive({playing:t})}togglePlaying(){this._patchActive({playing:!this.activePlayer.playing})}setShuffle(t){this._patchActive({shuffle:t})}toggleShuffle(){this._patchActive({shuffle:!this.activePlayer.shuffle})}setRepeat(t){this._patchActive({repeat:t})}cycleRepeat(){const t=this.activePlayer.repeat,e="off"===t?"all":"all"===t?"one":"off";this._patchActive({repeat:e})}setPosition(t){this._patchActive({position:t})}next(){const t=this.activePlayer;this._patchActive({currentIdx:Math.min(t.queue.length-1,t.currentIdx+1),position:0})}prev(){const t=this.activePlayer;t.position>3?this._patchActive({position:0}):this._patchActive({currentIdx:Math.max(0,t.currentIdx-1),position:0})}setSpeakerVol(t,e){const s=this.speakers.find(e=>e.id===t);s&&(s.volume=e,this._emit())}setGroupVolumeFor(t,e){const s=this.players[t];s&&(this.players[t]={...s,groupVolume:e});for(const s of this.speakers)s.leadId===t&&(s.volume=e);this._emit()}setGroupVolume(t){this.setGroupVolumeFor(this.activeLeadId,t)}ungroupSpeaker(t){const e=this.speakers.find(e=>e.id===t);e&&(e.leadId=t,this._emit())}toggleGroupPlay(t){const e=this.players[t];e&&(this.players[t]={...e,playing:!e.playing},this._emit())}startSoloPlayback(t){this.players[t]=Ut(Lt.initialQueue,0,30),this.activeLeadId=t,this._emit()}openGroupingSheet(t){this.groupingSheet={open:!0,leadId:t},this._emit()}closeGroupingSheet(){this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}commitGroupMembers(t,e){const s=new Set(e),r=s.has(t)?t:e[0]??null;if(this.speakers=this.speakers.map(e=>{const o=e.leadId===t;return s.has(e.id)?{...e,leadId:r??e.id}:o?{...e,leadId:e.id}:e}),r){if(r!==t){const e=this.players[t]??Ut(Lt.initialQueue,0,30);this.players[r]=e,delete this.players[t]}}else delete this.players[t];for(const t of e)t!==r&&delete this.players[t];if(this.activeLeadId===t)if(r)this.activeLeadId=r;else{const t=this.speakers.find(t=>t.leadId===t.id);t&&(this.activeLeadId=t.id)}this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}setQueue(t){this._patchActive({queue:t})}removeFromQueue(t){const e=this.activePlayer,s=e.queue.slice();s.splice(t,1);const r=t<e.currentIdx?e.currentIdx-1:e.currentIdx;this._patchActive({queue:s,currentIdx:r})}moveQueue(t,e){if(t===e)return;const s=this.activePlayer,r=s.queue.slice(),[o]=r.splice(t,1);if(void 0===o)return;r.splice(e,0,o);let n=s.currentIdx;t===n?n=e:t<n&&e>=n?n-=1:t>n&&e<=n&&(n+=1),this._patchActive({queue:r,currentIdx:n})}playTrackAt(t){this._patchActive({currentIdx:t,position:0,playing:!0})}moveToTop(t){this.moveQueue(t,this.activePlayer.currentIdx+1)}clearQueue(){const t=this.activePlayer;this._patchActive({queue:t.queue.slice(0,t.currentIdx+1)})}removeBulk(t){const e=this.activePlayer,s=e.queue.filter((e,s)=>!t.has(s));this.players[this.activeLeadId]={...e,queue:s},this.selectedTracks=new Set,this.multiMode=!1,this._emit()}browserGo(t){this.browser={...this.browser,...t},this._emit()}pushCrumb(t,e={}){this.browser={...this.browser,...e,crumbs:[...this.browser.crumbs,t]},this._emit()}popToCrumb(t){const e=this.browser.crumbs.slice(0,t+1),s=e[e.length-1];let r={...this.browser,crumbs:e};"root"===s?.kind?r={...r,providerId:null,accountId:null,detailId:null}:"provider"===s?.kind?r={...r,accountId:null,detailId:null}:"account"===s?.kind&&(r={...r,detailId:null}),this.browser=r,this._emit()}setSearch(t){this.search={...this.search,...t},this._emit()}setSelectedTracks(t){this.selectedTracks=t,this._emit()}setMultiMode(t){this.multiMode=t,t||(this.selectedTracks=new Set),this._emit()}_startTick(){this._tickInterval=window.setInterval(()=>this._tick(),1e3)}_tick(){let t=!1;for(const e of Object.keys(this.players)){const s=this.players[e];if(!s.playing)continue;const r=s.queue[s.currentIdx];if(!r)continue;const o=Lt.trackById(r);o&&(s.position+1>=o.durationSec?this.players[e]={...s,position:0,currentIdx:Math.min(s.queue.length-1,s.currentIdx+1)}:this.players[e]={...s,position:s.position+1},t=!0)}t&&this._emit()}dispose(){null!==this._tickInterval&&(window.clearInterval(this._tickInterval),this._tickInterval=null)}}class StoreController{constructor(t,e){this.host=t,this.store=e,this._onChange=()=>{this.host.requestUpdate()},t.addController(this)}hostConnected(){this.store.addEventListener("change",this._onChange)}hostDisconnected(){this.store.removeEventListener("change",this._onChange)}}let Bt=class extends i{constructor(){super(...arguments),this.size=48,this.radius=8,this.boxShadow=""}render(){const t="number"==typeof this.size?`${this.size}px`:this.size,e="number"==typeof this.size?.34*this.size:16,s=Ot(this.obj),r=`width:${t};height:${t};border-radius:${this.radius}px;background:${s};${this.boxShadow?`box-shadow:${this.boxShadow}`:""}`;return X`
      <div class="art" style=${r}>
        ${this.glyph?X`<div class="glyph" style="font-size:${e}px">${this.glyph}</div>`:""}
        <div class="scan"></div>
      </div>
    `}};Bt.styles=h`
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
  `,t([ut({attribute:!1})],Bt.prototype,"obj",void 0),t([ut()],Bt.prototype,"size",void 0),t([ut({type:Number})],Bt.prototype,"radius",void 0),t([ut({attribute:!1})],Bt.prototype,"glyph",void 0),t([ut()],Bt.prototype,"boxShadow",void 0),Bt=t([ct("hf-album-art")],Bt);let Nt=class extends i{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.color="#fff",this.track="rgba(255,255,255,0.18)",this.trackHeight=4,this.thumb=14,this.ariaLabel="",this._onInput=t=>{const e=Number(t.target.value);this.value=e,this.dispatchEvent(new CustomEvent("hf-input",{detail:e,bubbles:!0,composed:!0}))}}render(){const t=(this.value-this.min)/(this.max-this.min)*100;return this.style.setProperty("--hf-pct",`${t}%`),this.style.setProperty("--hf-color",this.color),this.style.setProperty("--hf-track",this.track),this.style.setProperty("--hf-track-h",`${this.trackHeight}px`),this.style.setProperty("--hf-thumb",`${this.thumb}px`),X`<input
      type="range"
      min=${this.min}
      max=${this.max}
      .value=${String(this.value)}
      aria-label=${this.ariaLabel||"Slider"}
      @input=${this._onInput}
    />`}};Nt.styles=h`
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
  `,t([ut({type:Number})],Nt.prototype,"value",void 0),t([ut({type:Number})],Nt.prototype,"min",void 0),t([ut({type:Number})],Nt.prototype,"max",void 0),t([ut()],Nt.prototype,"color",void 0),t([ut()],Nt.prototype,"track",void 0),t([ut({type:Number,attribute:"track-height"})],Nt.prototype,"trackHeight",void 0),t([ut({type:Number})],Nt.prototype,"thumb",void 0),t([ut({attribute:"aria-label"})],Nt.prototype,"ariaLabel",void 0),Nt=t([ct("hf-slider")],Nt);let Rt=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const t=this.store,e=t.currentTrack,s=t.currentAlbum,r=t.activePlayer,o=t.activeGroup,n=t.groups.filter(t=>!t.isActive&&t.playing).length;return X`
      <div class="art-wrap">
        <hf-album-art
          .obj=${s}
          size="100%"
          radius="18"
          boxShadow="0 18px 40px rgba(0,0,0,0.35)"
        ></hf-album-art>
      </div>
      <div class="meta">
        <div class="eyebrow">
          ${r.shuffle?"Shuffle":"Now Playing"} · ${s.name}
        </div>
        <div class="title">${e.name}</div>
        <div class="artist">${e.artist}</div>
      </div>
      <div class="scrubber">
        <hf-slider
          .value=${r.position}
          .min=${0}
          .max=${e.durationSec}
          .color=${_t}
          .track=${wt}
          @hf-input=${e=>t.setPosition(e.detail)}
        ></hf-slider>
        <div class="times">
          <span>${Ht(r.position)}</span>
          <span>-${Ht(e.durationSec-r.position)}</span>
        </div>
      </div>
      <div class="transport">
        <button
          class="icon-btn"
          aria-pressed=${r.shuffle}
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
          aria-label=${r.playing?"Pause":"Play"}
          @click=${()=>t.togglePlaying()}
        >
          ${r.playing?Pt.pause({size:22}):Pt.play({size:22})}
        </button>
        <button class="icon-btn" aria-label="Next" @click=${()=>t.next()}>
          ${Pt.next({size:22})}
        </button>
        <button
          class="icon-btn"
          aria-pressed=${"off"!==r.repeat}
          aria-label="Repeat"
          @click=${()=>t.cycleRepeat()}
        >
          ${"one"===r.repeat?Pt.rep1({size:18}):Pt.rep({size:18})}
        </button>
      </div>
      <div class="output">
        <button class="output-main" type="button" @click=${()=>t.setTab("group")}>
          ${Pt.speaker({size:16,stroke:_t})}
          <div style="flex:1; min-width:0">
            <div class="output-name">${o?.name??"No output"}</div>
            <div class="output-sub">
              ${(o?.members.length??0)>1?X`Grouped · ${o?.members.length} speakers · `:""}
              Volume ${r.groupVolume}
              ${n>0?X` · ${n} other group${n>1?"s":""}
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
    `}};Rt.styles=h`
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
  `,t([ut({attribute:!1})],Rt.prototype,"store",void 0),Rt=t([ct("hf-player-tab")],Rt),window.customCards=window.customCards||[],window.customCards.push({type:"homefront-music-card",name:"Homefront Music Card",description:"Music Assistant + WiiM multi-room controller",preview:!1});const jt=[{id:"player",label:"Player",icon:"play"},{id:"browser",label:"Browse",icon:"home"},{id:"search",label:"Search",icon:"search"},{id:"queue",label:"Queue",icon:"queue"},{id:"group",label:"Output",icon:"speaker"}];let Dt=class extends i{constructor(){super(),this._store=new Store,new StoreController(this,this._store)}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t}getCardSize(){return 12}disconnectedCallback(){super.disconnectedCallback(),this._store.dispose()}render(){return X`
      <div class="frame">
        ${this._renderTitle()}
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
    `}_renderTitle(){const t=this._config?.zones?.length??0,e=this._store.groups.filter(t=>t.playing).length,s=t>0?`· ${e} group${1===e?"":"s"} playing · ${t} zone${1===t?"":"s"}`:`· ${e} group${1===e?"":"s"} playing · mock`;return X`
      <div class="title-row">
        <span class="title-icon">${Pt.note({size:14})}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">${s}</span>
      </div>
    `}_renderActiveTab(){const t=this._store.tab;return"player"===t?X`<hf-player-tab .store=${this._store}></hf-player-tab>`:X`
      <div class="stub">
        ${jt.find(e=>e.id===t)?.label} tab<br />
        coming next in Phase 1.
      </div>
    `}_renderTabBar(){return X`
      <div class="tab-bar" role="tablist">
        ${jt.map(t=>{const e=this._store.tab===t.id;return X`
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
    `}};Dt.styles=[Mt,h`
      :host {
        display: block;
        background: var(--hf-bg);
        color: var(--hf-text);
        border-radius: 16px;
        overflow: hidden;
        font-family: var(--hf-font);
        border: 1px solid var(--hf-border);
        min-height: 620px;
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
        border-bottom: 1px solid var(--hf-divider);
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
      .stub {
        height: 100%;
        display: grid;
        place-items: center;
        padding: 24px;
        color: var(--hf-text-dim);
        font-size: 13px;
        text-align: center;
        line-height: 1.5;
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
    `],t([ut({attribute:!1})],Dt.prototype,"hass",void 0),t([function(t){return ut({...t,state:!0,attribute:!1})}()],Dt.prototype,"_config",void 0),Dt=t([ct("homefront-music-card")],Dt);export{Dt as HomefrontMusicCard};
