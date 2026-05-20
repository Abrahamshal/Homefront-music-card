function e(e,t,s,r){var a,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,r);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(n=(o<3?a(n):o>3?a(t,s,n):a(t,s))||n);return o>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(t,e))}return e}toString(){return this.cssText}};const n=e=>new o("string"==typeof e?e:e+"",void 0,r),l=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1],e[0]);return new o(s,e,r)},d=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return n(t)})(e):e,{is:c,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,v=globalThis,g=v.trustedTypes,b=g?g.emptyScript:"",x=v.reactiveElementPolyfillSupport,y=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},$=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let M=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);void 0!==r&&h(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:a}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);a?.call(this,t),this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...u(e),...f(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(s)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=s.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(void 0!==r&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(t,s.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const s=this.constructor,r=s._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=s.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=r;const o=a.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,s,r=!1,a){if(void 0!==e){const o=this.constructor;if(!1===r&&(a=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??$)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:a},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,s,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[y("elementProperties")]=new Map,M[y("finalized")]=new Map,x?.({ReactiveElement:M}),(v.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=e=>e,E=A.trustedTypes,P=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,B="?"+q,O=`<${B}>`,U=document,Q=()=>U.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,j="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,G=/>/g,V=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,K=/"/g,J=/^(?:script|style|textarea|title)$/i,X=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),ee=Symbol.for("lit-noChange"),te=Symbol.for("lit-nothing"),ie=new WeakMap,se=U.createTreeWalker(U,129);function re(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(t):t}const ae=(e,t)=>{const s=e.length-1,r=[];let a,o=2===t?"<svg>":3===t?"<math>":"",n=F;for(let t=0;t<s;t++){const s=e[t];let l,d,c=-1,h=0;for(;h<s.length&&(n.lastIndex=h,d=n.exec(s),null!==d);)h=n.lastIndex,n===F?"!--"===d[1]?n=W:void 0!==d[1]?n=G:void 0!==d[2]?(J.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=V):void 0!==d[3]&&(n=V):n===V?">"===d[0]?(n=a??F,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=void 0===d[3]?V:'"'===d[3]?K:Y):n===K||n===Y?n=V:n===W||n===G?n=F:(n=V,a=void 0);const p=n===V&&e[t+1].startsWith("/>")?" ":"";o+=n===F?s+O:c>=0?(r.push(l),s.slice(0,c)+T+s.slice(c)+q+p):s+q+(-2===c?t:p)}return[re(e,o+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class S{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let a=0,o=0;const n=e.length-1,l=this.parts,[d,c]=ae(e,t);if(this.el=S.createElement(d,s),se.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=se.nextNode())&&l.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(T)){const t=c[o++],s=r.getAttribute(e).split(q),n=/([.?@])?(.*)/.exec(t);l.push({type:1,index:a,name:n[2],strings:s,ctor:"."===n[1]?I:"?"===n[1]?L:"@"===n[1]?z:H}),r.removeAttribute(e)}else e.startsWith(q)&&(l.push({type:6,index:a}),r.removeAttribute(e));if(J.test(r.tagName)){const e=r.textContent.split(q),t=e.length-1;if(t>0){r.textContent=E?E.emptyScript:"";for(let s=0;s<t;s++)r.append(e[s],Q()),se.nextNode(),l.push({type:2,index:++a});r.append(e[t],Q())}}}else if(8===r.nodeType)if(r.data===B)l.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(q,e+1));)l.push({type:7,index:a}),e+=q.length-1}a++}}static createElement(e,t){const s=U.createElement("template");return s.innerHTML=e,s}}function oe(e,t,s=e,r){if(t===ee)return t;let a=void 0!==r?s._$Co?.[r]:s._$Cl;const o=N(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,s,r)),void 0!==r?(s._$Co??=[])[r]=a:s._$Cl=a),void 0!==a&&(t=oe(e,a._$AS(e,t.values),a,r)),t}class R{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??U).importNode(t,!0);se.currentNode=r;let a=se.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new k(a,a.nextSibling,this,e):1===l.type?t=new l.ctor(a,l.name,l.strings,this,e):6===l.type&&(t=new Z(a,this,e)),this._$AV.push(t),l=s[++n]}o!==l?.index&&(a=se.nextNode(),o++)}return se.currentNode=U,r}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=te,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=oe(this,e,t),N(e)?e===te||null==e||""===e?(this._$AH!==te&&this._$AR(),this._$AH=te):e!==this._$AH&&e!==ee&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==te&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,r="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=S.createElement(re(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new R(r,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=ie.get(e.strings);return void 0===t&&ie.set(e.strings,t=new S(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const a of e)r===t.length?t.push(s=new k(this.O(Q()),this.O(Q()),this,this.options)):s=t[r],s._$AI(a),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,a){this.type=1,this._$AH=te,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=te}_$AI(e,t=this,s,r){const a=this.strings;let o=!1;if(void 0===a)e=oe(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==ee,o&&(this._$AH=e);else{const r=e;let n,l;for(e=a[0],n=0;n<a.length-1;n++)l=oe(this,r[s+n],t,n),l===ee&&(l=this._$AH[n]),o||=!N(l)||l!==this._$AH[n],l===te?e=te:e!==te&&(e+=(l??"")+a[n+1]),this._$AH[n]=l}o&&!r&&this.j(e)}j(e){e===te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===te?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==te)}}class z extends H{constructor(e,t,s,r,a){super(e,t,s,r,a),this.type=5}_$AI(e,t=this){if((e=oe(this,e,t,0)??te)===ee)return;const s=this._$AH,r=e===te&&s!==te||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==te&&(s===te||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){oe(this,e)}}const ne=A.litHtmlPolyfillSupport;ne?.(S,k),(A.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class i extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const r=s?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=s?.renderBefore??null;r._$litPart$=a=new k(t.insertBefore(Q(),e),e,void 0,s??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ee}}i._$litElement$=!0,i.finalized=!0,le.litElementHydrateSupport?.({LitElement:i});const de=le.litElementPolyfillSupport;de?.({LitElement:i}),(le.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},pe=(e=he,t,s)=>{const{kind:r,metadata:a}=s;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(s.name,e),"accessor"===r){const{name:r}=s;return{set(s){const a=t.get.call(this);t.set.call(this,s),this.requestUpdate(r,a,e,!0,s)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=s;return function(s){const a=this[r];t.call(this,s),this.requestUpdate(r,a,e,!0,s)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,s)=>"object"==typeof s?pe(e,t,s):((e,t,s)=>{const r=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),r?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function fe(e){return ue({...e,state:!0,attribute:!1})}const me="#1d2026",ve="#23272f",ge="#ecedef",be="rgba(236,237,239,0.55)",xe="rgba(255,255,255,0.07)",ye="rgba(255,255,255,0.16)",_e="rgba(255,255,255,0.05)",$e="#e08a4a",we="#1b0f06",ke="rgba(255,255,255,0.12)",Se="rgba(255,255,255,0.04)",ze="rgba(224,138,74,0.12)",Me="14px",Ae="#f4f3f0",Ie="#ffffff",Ce="#fafaf7",Ee="#1c1b18",Pe="rgba(28,27,24,0.55)",He="rgba(0,0,0,0.07)",Te="rgba(0,0,0,0.16)",Le="rgba(0,0,0,0.06)",qe="#c46a30",Re="#fff7f0",Be="rgba(0,0,0,0.10)",Oe="rgba(0,0,0,0.03)",Ue="rgba(196,106,48,0.10)",Qe=l`
  :host,
  :host([data-theme='dark']) {
    --hf-bg: ${n("#16181d")};
    --hf-surface: ${n(me)};
    --hf-surface-alt: ${n(ve)};
    --hf-text: ${n(ge)};
    --hf-text-dim: ${n(be)};
    --hf-border: ${n(xe)};
    --hf-border-active: ${n(ye)};
    --hf-divider: ${n(_e)};
    --hf-accent: ${n($e)};
    --hf-accent-text: ${n(we)};
    --hf-slider-track: ${n(ke)};
    --hf-input: ${n(Se)};
    --hf-selected: ${n(ze)};
    --hf-radius: ${n(Me)};
    --hf-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  :host([data-theme='light']) {
    --hf-bg: ${n(Ae)};
    --hf-surface: ${n(Ie)};
    --hf-surface-alt: ${n(Ce)};
    --hf-text: ${n(Ee)};
    --hf-text-dim: ${n(Pe)};
    --hf-border: ${n(He)};
    --hf-border-active: ${n(Te)};
    --hf-divider: ${n(Le)};
    --hf-accent: ${n(qe)};
    --hf-accent-text: ${n(Re)};
    --hf-slider-track: ${n(Be)};
    --hf-input: ${n(Oe)};
    --hf-selected: ${n(Ue)};
  }
  @media (prefers-color-scheme: light) {
    :host([data-theme='auto']) {
      --hf-bg: ${n(Ae)};
      --hf-surface: ${n(Ie)};
      --hf-surface-alt: ${n(Ce)};
      --hf-text: ${n(Ee)};
      --hf-text-dim: ${n(Pe)};
      --hf-border: ${n(He)};
      --hf-border-active: ${n(Te)};
      --hf-divider: ${n(Le)};
      --hf-accent: ${n(qe)};
      --hf-accent-text: ${n(Re)};
      --hf-slider-track: ${n(Be)};
      --hf-input: ${n(Oe)};
      --hf-selected: ${n(Ue)};
    }
  }
`;function Ne(e,t={}){return(s={})=>{const r=s.size??20,a=s.stroke??"currentColor",o=s.sw??t.sw??1.7;return X`<svg width=${r} height=${r} viewBox="0 0 24 24" fill="none" stroke=${a} stroke-width=${o} stroke-linecap="round" stroke-linejoin="round"><path d=${e} /></svg>`}}function De(e){return(t={})=>{const s=t.size??20,r=t.fill??"currentColor";return X`<svg width=${s} height=${s} viewBox="0 0 24 24" fill=${r} stroke="none"><path d=${e} /></svg>`}}const je={play:De("M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z"),pause:(e={})=>{const t=e.size??20,s=e.fill??"currentColor";return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill=${s} stroke="none">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>`},prev:De("M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z"),next:De("M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z"),shuffle:Ne("M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5"),rep:Ne("M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3"),rep1:(e={})=>{const t=e.size??20,s=e.stroke??"currentColor",r=e.sw??1.7;return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />
      <text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none">1</text>
    </svg>`},queue:Ne("M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2"),search:Ne("M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7"),home:Ne("M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z"),speaker:Ne("M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14"),group:Ne("M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4"),dot3:(e={})=>{const t=e.size??20,s=e.fill??"currentColor";return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>`},x:Ne("M6 6l12 12 M18 6L6 18"),chev:Ne("M9 6l6 6-6 6"),chevL:Ne("M15 6l-6 6 6 6"),chevD:Ne("M6 9l6 6 6-6"),plus:Ne("M12 5v14 M5 12h14"),check:Ne("M5 12l4 4 10-10"),drag:(e={})=>{const t=e.size??20,s=e.fill??"currentColor";return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
    </svg>`},trash:Ne("M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"),top:Ne("M12 19V7 M6 13l6-6 6 6 M5 4h14"),playNext:Ne("M5 5l10 7-10 7V5z M19 6v12",{sw:2}),radio:Ne("M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14"),list:Ne("M4 6h16 M4 12h16 M4 18h16"),album:(e={})=>{const t=e.size??20,s=e.stroke??"currentColor",r=e.sw??1.6;return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>`},artist:(e={})=>{const t=e.size??20,s=e.stroke??"currentColor",r=e.sw??1.7;return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>`},note:Ne("M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"),heart:Ne("M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z"),filter:Ne("M4 5h16l-6 8v6l-4-2v-4L4 5z"),sun:(e={})=>{const t=e.size??14,s=e.stroke??"currentColor",r=e.sw??1.7;return X`<svg width=${t} height=${t} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>`},moon:Ne("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z")},Fe=[{id:"al1",name:"Mordechai",artist:"Khruangbin",h1:22,h2:350,year:2020},{id:"al2",name:"Salad Days",artist:"Mac DeMarco",h1:142,h2:80,year:2014},{id:"al3",name:"Awake",artist:"Tycho",h1:200,h2:280,year:2014},{id:"al4",name:"Migration",artist:"Bonobo",h1:32,h2:210,year:2017},{id:"al5",name:"Crush",artist:"Floating Points",h1:320,h2:18,year:2019},{id:"al6",name:"Pang",artist:"Caroline Polachek",h1:290,h2:340,year:2019},{id:"al7",name:"Mood Valiant",artist:"Hiatus Kaiyote",h1:12,h2:330,year:2021},{id:"al8",name:"In Colour",artist:"Jamie xx",h1:50,h2:200,year:2015},{id:"al9",name:"Spaces",artist:"Nils Frahm",h1:220,h2:240,year:2013},{id:"al10",name:"Untitled (Black Is)",artist:"SAULT",h1:0,h2:18,year:2020},{id:"al11",name:"French Kiwi Juice",artist:"FKJ",h1:175,h2:90,year:2017},{id:"al12",name:"Oncle Jazz",artist:"Men I Trust",h1:195,h2:250,year:2019},{id:"al13",name:"U.F.O.F.",artist:"Big Thief",h1:100,h2:175,year:2019},{id:"al14",name:"Bloom",artist:"Beach House",h1:280,h2:200,year:2012},{id:"al15",name:"Skiptracing",artist:"Mild High Club",h1:36,h2:5,year:2016},{id:"al16",name:"A Moment Apart",artist:"ODESZA",h1:245,h2:300,year:2017},{id:"al17",name:"Punisher",artist:"Phoebe Bridgers",h1:215,h2:245,year:2020},{id:"al18",name:"Vulture Prince",artist:"Arooj Aftab",h1:18,h2:28,year:2021}],We=["Pelota","White Gloves","A Walk","Cirrus","Birth","Welcome To My Island","Red Room","Loud Places","Says","Wildfires","Skyline","Tides","Lemon Twigs","Last Light","Mountain at My Gates","Slow Burn","Vega","Daydream","Mirror Maru","Late Night","Soft Universe","Ondas","Reverie","Long Way Home","Eclipse","Powder Blue","Dreamcaster","After Hours","Ember"].map((e,t)=>{const s=Fe[t%Fe.length];return{id:`tr${t+1}`,name:e,artist:s.artist,album:s.name,albumId:s.id,durationSec:120+47*t%240}}),Ge=[{id:"spotify",name:"Spotify",glyph:"S",brandHue:140,accounts:[{id:"sp-main",name:"tom@home",tier:"Premium",email:"tom@home.local"},{id:"sp-shared",name:"Family · shared",tier:"Family",email:"fam@home.local"}]},{id:"apple",name:"Apple Music",glyph:"",brandHue:0,accounts:[{id:"ap-tom",name:"tom@icloud",tier:"Individual",email:"tom@icloud.com"}]},{id:"soundcloud",name:"SoundCloud",glyph:"~",brandHue:25,accounts:[{id:"sc-tom",name:"@tom_listens",tier:"Go+",email:"tom@sc.local"}]}];function Ve(e){const t=Math.max(0,Math.floor(e)),s=t%60;return`${Math.floor(t/60)}:${s<10?`0${s}`:s}`}function Ye(e,t={}){const{angle:s=135,lift:r=0}=t;if(!e)return"linear-gradient(135deg,#444,#222)";return`linear-gradient(${s}deg, oklch(${56+r}% 0.18 ${e.h1??200}), oklch(${30+r}% 0.16 ${e.h2??280}))`}const Ze={albums:Fe,tracks:We,playlists:[{id:"pl1",name:"Deep Focus",owner:"Music Assistant",trackCount:86,h1:220,h2:280,mood:"instrumental·calm"},{id:"pl2",name:"Late-Night Drive",owner:"you",trackCount:42,h1:260,h2:340,mood:"atmospheric·downtempo"},{id:"pl3",name:"Sunday Cooking",owner:"you",trackCount:58,h1:30,h2:18,mood:"soul·jazz"},{id:"pl4",name:"Mellow Mornings",owner:"Editorial",trackCount:64,h1:50,h2:30,mood:"acoustic·warm"},{id:"pl5",name:"Workout",owner:"you",trackCount:38,h1:0,h2:340,mood:"high tempo·electronic"},{id:"pl6",name:"Liked Songs",owner:"you",trackCount:312,h1:130,h2:180,mood:"your favorites"},{id:"pl7",name:"Patio Sessions",owner:"you",trackCount:51,h1:180,h2:220,mood:"summer·chill"},{id:"pl8",name:"Discover Weekly",owner:"Editorial",trackCount:30,h1:290,h2:200,mood:"new finds"}],radioStations:[{id:"rd1",name:"KCRW · Eclectic 24",genre:"Eclectic",h1:12,h2:340},{id:"rd2",name:"NTS Radio 1",genre:"Underground",h1:30,h2:12},{id:"rd3",name:"BBC 6 Music",genre:"Alternative",h1:200,h2:250},{id:"rd4",name:"WWOZ New Orleans",genre:"Jazz · Blues",h1:38,h2:5},{id:"rd5",name:"Worldwide FM",genre:"Global",h1:165,h2:220}],providers:Ge,speakers:[{id:"sp1",name:"Living Room",room:"Living Room",model:"Sonos Era 300",volume:38},{id:"sp2",name:"Kitchen",room:"Kitchen",model:"Sonos One",volume:28},{id:"sp3",name:"Bedroom",room:"Bedroom",model:"HomePod mini",volume:18},{id:"sp4",name:"Office",room:"Office",model:"WiiM Pro + KEF",volume:45},{id:"sp5",name:"Patio",room:"Outside",model:"Sonos Move 2",volume:60},{id:"sp6",name:"Bathroom",room:"Bathroom",model:"HomePod mini",volume:22}],initialQueue:["tr1","tr5","tr12","tr18","tr9","tr3","tr22","tr7","tr15","tr27","tr2","tr11"],artistList:["Khruangbin","Mac DeMarco","Tycho","Bonobo","Floating Points","Caroline Polachek","Hiatus Kaiyote","Jamie xx","Nils Frahm","SAULT","FKJ","Men I Trust","Big Thief","Beach House","Mild High Club","ODESZA","Phoebe Bridgers","Vulfpeck","Yussef Dayes","Arooj Aftab"],fmtTime:Ve,albumById:function(e){return Fe.find(t=>t.id===e)},trackById:function(e){return We.find(t=>t.id===e)},providerById:function(e){return Ge.find(t=>t.id===e)},artGradient:Ye};const Ke="__hass__";function Je(e,t){const s=e.states??{},r=[];for(const e of t){const t=s[e.wiim];if(!t)continue;const a=t.attributes,o=a.group_role,n=a.group_members??[];let l=e.wiim;if("slave"===o){const e=n.find(e=>{const t=s[e];return"master"===t?.attributes?.group_role});e&&(l=e)}const d="number"==typeof a.volume_level?a.volume_level:0;r.push({id:e.wiim,name:e.name,room:e.name,model:a.device_model??"WiiM",volume:Math.round(100*d),leadId:l})}return r}function Xe(e,t,s){const r=e.states??{},a={},o=new Set(s.map(e=>e.leadId));for(const e of o){const o=t.find(t=>t.wiim===e);if(!o)continue;const n=r[o.ma];if(!n)continue;const l=n.attributes,d=s.filter(t=>t.leadId===e),c=0===d.length?0:Math.round(d.reduce((e,t)=>e+t.volume,0)/d.length),h=l.repeat??"off";a[e]={queue:[Ke],currentIdx:0,position:"number"==typeof l.media_position?l.media_position:0,playing:"playing"===n.state,shuffle:!!l.shuffle,repeat:h,groupVolume:c}}return a}function et(e){return!!e&&("undefined"==typeof location||("https:"!==location.protocol||!e.startsWith("http:")))}const tt=new Set;function it(e,t,s){return{queue:e.slice(),currentIdx:0,position:t,playing:!0,shuffle:!1,repeat:"off",groupVolume:s}}function st(e){return Math.max(0,Math.min(1,e))}class Store extends EventTarget{constructor(){super(),this.tab="player",this.browser={crumbs:[{kind:"root",label:"Sources"}],providerId:null,accountId:null,sub:"playlists",detailId:null},this.search={query:"",filter:"all"},this.selectedTracks=new Set,this.multiMode=!1,this.groupingSheet={open:!1,leadId:null},this._tickInterval=null,this.toasts=[],this._toastTtlMs=4500,this._zones=[],this._isHassMode=!1,this.diagnosticNotes=[],this._registryAttempted=!1,this.hassBrowseStack=[],this.hassBrowseLoading=!1,this.hassBrowseError=null,this._browseCache=new Map,this.hassQueue=[],this.hassQueueLoading=!1,this.hassQueueError=null,this._hassQueueLeadId=null,this._maConfigEntryId=null,this.hassSearchResults=null,this.hassSearchLoading=!1,this.hassSearchError=null,this.speakers=Ze.speakers.map(e=>({...e,leadId:e.id}));const e=this.speakers.find(e=>"sp2"===e.id);e&&(e.leadId="sp1"),this.players={sp1:{...it(Ze.initialQueue,48,38),playing:!0},sp5:{...it(["tr3","tr18","tr7","tr12","tr22"],14,60),playing:!0,shuffle:!0}},this.activeLeadId="sp1",this._loadPersistedState(),this._startTick()}_loadPersistedState(){try{const e=window.localStorage?.getItem(Store._STORAGE_KEY);if(!e)return;const t=JSON.parse(e);t.tab&&(this.tab=t.tab),t.activeLeadId&&(this.activeLeadId=t.activeLeadId)}catch{}}_persistUiState(){try{window.localStorage?.setItem(Store._STORAGE_KEY,JSON.stringify({activeLeadId:this.activeLeadId,tab:this.tab}))}catch{}}get groups(){var e;const t=this._groupsCache;if(t&&t.speakers===this.speakers&&t.players===this.players&&t.activeLeadId===this.activeLeadId)return t.result;const s={};for(const t of this.speakers)(s[e=t.leadId]??(s[e]=[])).push(t);const r=Object.keys(s).map(e=>{const t=s[e],r=t.find(t=>t.id===e)??t[0],a=this.players[e],o=1===t.length?r.name:t.map(e=>e.name).join(" + ");return{leadId:e,lead:r,members:t,name:o,player:a,playing:!!a?.playing,isActive:e===this.activeLeadId,isIdle:!a}}).sort((e,t)=>e.isActive!==t.isActive?e.isActive?-1:1:e.isIdle!==t.isIdle?e.isIdle?1:-1:e.lead.name.localeCompare(t.lead.name));return this._groupsCache={speakers:this.speakers,players:this.players,activeLeadId:this.activeLeadId,result:r},r}get activePlayer(){const e=this.players[this.activeLeadId];return e||(this._isHassMode?it([Ke],0,0):it(Ze.initialQueue,0,30))}get activeGroup(){return this.groups.find(e=>e.leadId===this.activeLeadId)}get currentTrack(){if(this._isHassMode&&this._hass){const e=this._zones.find(e=>e.wiim===this.activeLeadId);if(e){const t=function(e,t){const s=e.states?.[t];if(!s)return null;const r=s.attributes,a=r.media_title??"";return a?{id:Ke,name:a,artist:r.media_artist??"",album:r.media_album_name??"",albumId:Ke,durationSec:"number"==typeof r.media_duration?r.media_duration:0}:null}(this._hass,e.ma);if(t)return t}return{id:Ke,name:"Nothing playing",artist:"",album:"",albumId:Ke,durationSec:0}}const e=this.activePlayer,t=e.queue[e.currentIdx];return(t?Ze.trackById(t):void 0)??Ze.tracks[0]}get currentAlbum(){if(this._isHassMode&&this._hass){const e=this._zones.find(e=>e.wiim===this.activeLeadId);if(e){const t=function(e,t){const s=e.states?.[t];if(!s)return null;const r=s.attributes,a={entity_picture:r.entity_picture,entity_picture_local:r.entity_picture_local,media_image_url:r.media_image_url};(!tt.has(t)||tt.size<5)&&(tt.add(t),console.debug(`[homefront-music-card] image attrs for ${t}:`,a,"title=",r.media_title));const o=[a.entity_picture,a.entity_picture_local,a.media_image_url].find(et)??void 0,n=r.media_album_name??"";return{id:Ke,name:n,artist:r.media_artist??"",h1:220,h2:280,year:0,imageUrl:o}}(this._hass,e.ma);if(t)return t}return{id:Ke,name:"",artist:"",h1:220,h2:280,year:0}}const e=Ze.albumById(this.currentTrack.albumId);if(!e)throw new Error(`Missing album for track ${this.currentTrack.id}`);return e}setHass(e){this._hass=e,this._deriveFromHass(),this._emit(),this._registryAttempted||(this._registryAttempted=!0,this._reconcileFromRegistry())}async _reconcileFromRegistry(){if(!this._hass)return;const e=await async function(e){const t=e.states??{},s=[],r=[];let a;try{a=await e.callWS({type:"config/entity_registry/list"})}catch(e){return r.push(`registry call failed: ${String(e)}`),{zones:s,notes:r}}const o=a.filter(e=>e.entity_id.startsWith("media_player.")&&("wiim"===e.platform||"music_assistant"===e.platform));r.push(`registry: ${o.length} media_player entities from wiim/MA`);const n=new Map;for(const e of o){if(!e.device_id){r.push(`  ${e.entity_id} (${e.platform}): no device_id`);continue}const t=n.get(e.device_id)??[];t.push(e),n.set(e.device_id,t)}let l;for(const[e,a]of n){const o=a.find(e=>"wiim"===e.platform&&!e.entity_id.endsWith("_group_master"))??a.find(e=>"wiim"===e.platform),n=a.find(e=>"music_assistant"===e.platform);if(!o||!n){const t=[o?"":"WiiM",n?"":"MA"].filter(Boolean).join(" + ");r.push(`  device ${e.slice(0,8)}…: incomplete (missing ${t})`);continue}!l&&n.config_entry_id&&(l=n.config_entry_id);const d=t[o.entity_id],c=d?.attributes.friendly_name??o.entity_id;s.push({name:c,wiim:o.entity_id,ma:n.entity_id}),r.push(`  ${c}: WiiM=${o.entity_id} MA=${n.entity_id} (device ${e.slice(0,8)}…)`)}return s.sort((e,t)=>e.name.localeCompare(t.name)),r.push(`final: ${s.length} zone(s) via entity registry`),l&&r.push("MA config_entry_id captured"),{zones:s,notes:r,maConfigEntryId:l}}(this._hass);if(0===e.zones.length)return this.diagnosticNotes=[...this.diagnosticNotes,"— registry attempt —",...e.notes],void this._emit();if(this._zones=e.zones,e.maConfigEntryId&&(this._maConfigEntryId=e.maConfigEntryId),this.diagnosticNotes=["Discovery: entity registry",...e.notes],this._isHassMode||(this._isHassMode=!0,this._stopTick()),!this._hass)return;const t=Je(this._hass,this._zones);if(this.speakers=t,this.players=Xe(this._hass,this._zones,t),!t.find(e=>e.id===this.activeLeadId)){const e=t.find(e=>e.id===e.leadId)??t[0];e&&(this.activeLeadId=e.id)}this._emit()}setConfig(e){e.zones&&e.zones.length>0?this._zones=e.zones:this._zones=[],this._hass&&(this._deriveFromHass(),this._emit())}_deriveFromHass(){if(!this._hass)return;let e;if(this._zones.length>0&&this._isHassMode)e=this._zones,this.diagnosticNotes=["using explicit config.zones from card YAML"];else{const t=function(e){const t=e.states??{},s=[],r=[],a=Object.values(t).filter(e=>{if(!e.entity_id.startsWith("media_player."))return!1;const t=e.attributes.group_role;return"master"===t||"slave"===t||"solo"===t});r.push(`WiiM device entities (group_role present): ${a.length}`);for(const e of a){const a=e.entity_id.replace(/^media_player\./,""),o=a.replace(/_\d+$/,""),n=[];o!==a&&n.push(`media_player.${o}`),n.push(`media_player.${a}_2`),n.push(`media_player.${a}_ma`),n.push(`media_player.${a}_music_assistant`);let l=null,d=[];for(const s of n){if(s===e.entity_id)continue;const r=t[s];if(r){if(void 0===r.attributes.group_role){l=s,d.push(`${s} ✓`);break}d.push(`${s} (another WiiM)`)}else d.push(`${s} (missing)`)}if(!l){r.push(`  ${e.entity_id}: no MA partner. Tried: ${d.join(", ")}`);continue}const c=e.attributes.friendly_name??a;s.push({name:c,wiim:e.entity_id,ma:l}),r.push(`  ${c}: WiiM=${e.entity_id}, MA=${l}`)}return s.sort((e,t)=>e.name.localeCompare(t.name)),r.push(`final: ${s.length} zone(s) discovered`),{zones:s,notes:r}}(this._hass);e=t.zones,this.diagnosticNotes=t.notes,console.debug("[homefront-music-card] zone discovery:\n"+t.notes.join("\n"))}if(0===e.length)return void console.warn("[homefront-music-card] No zones discovered — staying in mock mode. See store.diagnosticNotes for details.");this._isHassMode||(this._isHassMode=!0,this._stopTick()),this._zones=e;const t=Je(this._hass,e);if(this.speakers=t,this.players=Xe(this._hass,e,t),!t.find(e=>e.id===this.activeLeadId)){const e=t.find(e=>e.id===e.leadId)??t[0];e&&(this.activeLeadId=e.id)}const s=[];for(const t of e){const e=this._hass.states?.[t.ma];if(!e){s.push(`${t.name}: MA entity ${t.ma} not found in hass.states`);continue}const r=e.attributes;s.push(`${t.name}: MA=${t.ma} state=${e.state} title=${JSON.stringify(r.media_title??null)} artist=${JSON.stringify(r.media_artist??null)} pos=${r.media_position??"-"} shuffle=${r.shuffle??"-"}`)}this.diagnosticNotes=[...this.diagnosticNotes,"— per-zone MA state —",...s]}get isHassMode(){return this._isHassMode}_stopTick(){null!==this._tickInterval&&(window.clearInterval(this._tickInterval),this._tickInterval=null)}_emit(){this.dispatchEvent(new Event("change"))}showToast(e,t="info"){const s=`t${Date.now()}-${Math.random().toString(36).slice(2,8)}`;this.toasts=[...this.toasts,{id:s,level:t,message:e}],this._emit(),window.setTimeout(()=>this.dismissToast(s),this._toastTtlMs)}dismissToast(e){const t=this.toasts.length;this.toasts=this.toasts.filter(t=>t.id!==e),this.toasts.length!==t&&this._emit()}_callService(e,t,s={},r={}){this._isHassMode&&this._hass&&this._hass.callService(e,t,s,r).catch(s=>{console.warn(`[homefront-music-card] ${e}.${t} failed:`,s);const r=s?.message??String(s);this.showToast(`${e}.${t} failed: ${r}`,"error")})}_maFor(e){return this._zones.find(t=>t.wiim===e)?.ma}async _callServiceWithResponse(e,t,s={},r={}){if(this._isHassMode&&this._hass)try{const a=await this._hass.callWS({type:"call_service",domain:e,service:t,service_data:s,target:r,return_response:!0});return a?.response}catch(s){console.warn(`[homefront-music-card] ${e}.${t} (with response) failed:`,s);const r=s?.message??String(s);return void this.showToast(`${e}.${t} failed: ${r}`,"error")}}async browseRoot(){if(!this._isHassMode||!this._hass)return;const e=this._maFor(this.activeLeadId);if(e){this.hassBrowseLoading=!0,this.hassBrowseError=null,this._emit();try{const t=await this._hass.callWS({type:"media_player/browse_media",entity_id:e});console.debug("[homefront-music-card] browse root response:",JSON.parse(JSON.stringify(t)));const s=new Set(["library","music library","my music"]),r=t.children?.filter(e=>!s.has(e.title.toLowerCase())&&"app"!==e.media_class),a={...t,children:r};this._browseCache.clear(),this._browseCache.set(t.media_content_id||"__root__",a),this.hassBrowseStack=[a]}catch(e){this.hassBrowseError=String(e),console.warn("[homefront-music-card] browse_media root failed:",e)}finally{this.hassBrowseLoading=!1,this._emit()}}}async browseInto(e){if(!this._isHassMode||!this._hass)return;const t=this._maFor(this.activeLeadId);if(!t)return;const s=this._browseCache.get(e.media_content_id);if(s&&s.children)return this.hassBrowseStack=[...this.hassBrowseStack,s],void this._emit();this.hassBrowseLoading=!0,this.hassBrowseError=null,this._emit();try{const s=await this._hass.callWS({type:"media_player/browse_media",entity_id:t,media_content_type:e.media_content_type,media_content_id:e.media_content_id});this._browseCache.set(e.media_content_id,s),this.hassBrowseStack=[...this.hassBrowseStack,s]}catch(e){this.hassBrowseError=String(e),console.warn("[homefront-music-card] browse_media drill failed:",e)}finally{this.hassBrowseLoading=!1,this._emit()}}browsePop(e){this.hassBrowseStack=this.hassBrowseStack.slice(0,e+1),this._emit()}playBrowseNode(e,t="replace"){if(!this._isHassMode)return;const s=this._maFor(this.activeLeadId);s&&this._callService("music_assistant","play_media",{media_id:e.media_content_id,media_type:e.media_content_type,enqueue:t,radio_mode:!1},{entity_id:s})}async loadQueue(){if(!this._isHassMode)return;const e=this._maFor(this.activeLeadId);if(!e)return;this.hassQueueLoading=!0,this.hassQueueError=null,this._emit();const t=await this._callServiceWithResponse("mass_queue","get_queue_items",{},{entity_id:e});let s=[];if(Array.isArray(t))s=t;else if(t&&Array.isArray(t.queue_items))s=t.queue_items;else if(t&&"object"==typeof t)for(const e of Object.values(t))if(Array.isArray(e)){s=e;break}this.hassQueue=s,this._hassQueueLeadId=this.activeLeadId,this.hassQueueLoading=!1,this._emit()}get hassQueueIsFresh(){return this._hassQueueLeadId===this.activeLeadId}playQueueItem(e){const t=this._maFor(this.activeLeadId);t&&(this._callService("mass_queue","play_queue_item",{queue_item_id:e},{entity_id:t}),window.setTimeout(()=>{this.loadQueue()},400))}removeQueueItem(e){const t=this._maFor(this.activeLeadId);t&&(this._callService("mass_queue","remove_queue_item",{queue_item_id:e},{entity_id:t}),this.hassQueue=this.hassQueue.filter(t=>t.queue_item_id!==e),this._emit(),window.setTimeout(()=>{this.loadQueue()},400))}removeQueueItems(e){const t=this._maFor(this.activeLeadId);if(t){for(const s of e)this._callService("mass_queue","remove_queue_item",{queue_item_id:s},{entity_id:t});this.hassQueue=this.hassQueue.filter(t=>!e.has(t.queue_item_id)),this.selectedTracks=new Set,this.multiMode=!1,this._emit(),window.setTimeout(()=>{this.loadQueue()},600)}}clearQueueFromHere(){const e=this._maFor(this.activeLeadId);e&&(this._callService("mass_queue","clear_queue_from_here",{},{entity_id:e}),window.setTimeout(()=>{this.loadQueue()},400))}moveQueueItemToTop(e){const t=this._maFor(this.activeLeadId);t&&(this._callService("mass_queue","move_queue_item_next",{queue_item_id:e},{entity_id:t}),window.setTimeout(()=>{this.loadQueue()},400))}async searchMa(e,t=[],s=25){if(!this._isHassMode||!this._hass)return;const r=e.trim();if(!r)return this.hassSearchResults=null,this.hassSearchError=null,void this._emit();if(!this._maConfigEntryId)return this.hassSearchError="MA config entry not yet discovered — try again in a moment.",void this._emit();this.hassSearchLoading=!0,this.hassSearchError=null,this._emit();const a={config_entry_id:this._maConfigEntryId,name:r,limit:s};t.length>0&&(a.media_type=t);const o=await this._callServiceWithResponse("music_assistant","search",a,{});console.debug("[homefront-music-card] search response:",o),this.hassSearchResults=this._normalizeSearchResponse(o,r),this.hassSearchLoading=!1,this._emit()}_normalizeSearchResponse(e,t){if(!e||"object"!=typeof e)return{tracks:[],albums:[],artists:[],playlists:[],radio:[],query:t};const s=e,r=(...e)=>{for(const t of e){const e=s[t];if(Array.isArray(e))return e}return[]};return{tracks:r("tracks","track"),albums:r("albums","album"),artists:r("artists","artist"),playlists:r("playlists","playlist"),radio:r("radio","stations"),query:t}}playSearchResult(e,t="replace"){const s=this._maFor(this.activeLeadId);if(!s)return;const r=e.uri??e.media_content_id;r?this._callService("music_assistant","play_media",{media_id:r,media_type:e.media_content_type,enqueue:t,radio_mode:!1},{entity_id:s}):console.warn("[homefront-music-card] search item has no uri/media_content_id:",e)}setTab(e){this.tab!==e&&(this.tab=e,this._persistUiState(),this._emit())}setActiveLead(e){this.players[e]||(this.players[e]=it(Ze.initialQueue,0,30)),this.activeLeadId=e,this._persistUiState(),this._emit()}_patchActive(e){const t=this.players[this.activeLeadId]??it(Ze.initialQueue,0,30);this.players[this.activeLeadId]={...t,...e},this._emit()}setPlaying(e){this._patchActive({playing:e});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player",e?"media_play":"media_pause",{},{entity_id:t})}togglePlaying(){this.setPlaying(!this.activePlayer.playing)}setShuffle(e){this._patchActive({shuffle:e});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","shuffle_set",{shuffle:e},{entity_id:t})}toggleShuffle(){this.setShuffle(!this.activePlayer.shuffle)}setRepeat(e){this._patchActive({repeat:e});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","repeat_set",{repeat:e},{entity_id:t})}cycleRepeat(){const e=this.activePlayer.repeat,t="off"===e?"all":"all"===e?"one":"off";this.setRepeat(t)}setPosition(e){this._patchActive({position:e});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","media_seek",{seek_position:e},{entity_id:t})}next(){const e=this.activePlayer;this._patchActive({currentIdx:Math.min(e.queue.length-1,e.currentIdx+1),position:0});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","media_next_track",{},{entity_id:t})}prev(){const e=this.activePlayer;if(e.position>3){this._patchActive({position:0});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","media_seek",{seek_position:0},{entity_id:e})}else{this._patchActive({currentIdx:Math.max(0,e.currentIdx-1),position:0});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","media_previous_track",{},{entity_id:t})}}setSpeakerVol(e,t){const s=this.speakers.find(t=>t.id===e);s&&(s.volume=t,this._emit(),this._isHassMode&&this._callService("media_player","volume_set",{volume_level:st(t/100)},{entity_id:e}))}setGroupVolumeFor(e,t){const s=this.players[e];s&&(this.players[e]={...s,groupVolume:t});const r=[];for(const s of this.speakers)s.leadId===e&&(s.volume=t,r.push(s.id));if(this._emit(),this._isHassMode&&r.length>0){const e=st(t/100);for(const t of r)this._callService("media_player","volume_set",{volume_level:e},{entity_id:t})}}setGroupVolume(e){this.setGroupVolumeFor(this.activeLeadId,e)}ungroupSpeaker(e){const t=this.speakers.find(t=>t.id===e);t&&(t.leadId=e,this._emit(),this._isHassMode&&this._callService("media_player","unjoin",{},{entity_id:e}))}toggleGroupPlay(e){const t=this.players[e];if(!t)return;const s=!t.playing;this.players[e]={...t,playing:s},this._emit();const r=this._maFor(e);r&&this._callService("media_player",s?"media_play":"media_pause",{},{entity_id:r})}startSoloPlayback(e){if(this._isHassMode){this.activeLeadId=e;const t=this._maFor(e);return t&&this._callService("media_player","media_play",{},{entity_id:t}),void this._emit()}this.players[e]=it(Ze.initialQueue,0,30),this.activeLeadId=e,this._emit()}openGroupingSheet(e){this.groupingSheet={open:!0,leadId:e},this._emit()}closeGroupingSheet(){this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}commitGroupMembers(e,t){const s=new Set(t),r=s.has(e)?e:t[0]??null,a=this.speakers.filter(t=>t.leadId===e).map(e=>e.id),o=a.filter(e=>!s.has(e)),n=t.filter(e=>!a.includes(e)&&e!==r);if(this.speakers=this.speakers.map(t=>{const a=t.leadId===e;return s.has(t.id)?{...t,leadId:r??t.id}:a?{...t,leadId:t.id}:t}),r){if(r!==e){const t=this.players[e]??it(Ze.initialQueue,0,30);this.players[r]=t,delete this.players[e]}}else delete this.players[e];for(const e of t)e!==r&&delete this.players[e];if(this.activeLeadId===e)if(r)this.activeLeadId=r;else{const e=this.speakers.find(e=>e.leadId===e.id);e&&(this.activeLeadId=e.id)}if(this.groupingSheet={...this.groupingSheet,open:!1},this._emit(),this._isHassMode){for(const e of o)this._callService("media_player","unjoin",{},{entity_id:e});r&&n.length>0&&this._callService("media_player","join",{group_members:n},{entity_id:r})}}setQueue(e){this._patchActive({queue:e})}removeFromQueue(e){const t=this.activePlayer,s=t.queue.slice();s.splice(e,1);const r=e<t.currentIdx?t.currentIdx-1:t.currentIdx;this._patchActive({queue:s,currentIdx:r})}moveQueue(e,t){if(e===t)return;const s=this.activePlayer,r=s.queue.slice(),[a]=r.splice(e,1);if(void 0===a)return;r.splice(t,0,a);let o=s.currentIdx;e===o?o=t:e<o&&t>=o?o-=1:e>o&&t<=o&&(o+=1),this._patchActive({queue:r,currentIdx:o})}playTrackAt(e){this._patchActive({currentIdx:e,position:0,playing:!0})}moveToTop(e){this.moveQueue(e,this.activePlayer.currentIdx+1)}clearQueue(){const e=this.activePlayer;this._patchActive({queue:e.queue.slice(0,e.currentIdx+1)})}removeBulk(e){const t=this.activePlayer,s=t.queue.filter((t,s)=>!e.has(s));this.players[this.activeLeadId]={...t,queue:s},this.selectedTracks=new Set,this.multiMode=!1,this._emit()}browserGo(e){this.browser={...this.browser,...e},this._emit()}pushCrumb(e,t={}){this.browser={...this.browser,...t,crumbs:[...this.browser.crumbs,e]},this._emit()}popToCrumb(e){const t=this.browser.crumbs.slice(0,e+1),s=t[t.length-1];let r={...this.browser,crumbs:t};"root"===s?.kind?r={...r,providerId:null,accountId:null,detailId:null}:"provider"===s?.kind?r={...r,accountId:null,detailId:null}:"account"===s?.kind&&(r={...r,detailId:null}),this.browser=r,this._emit()}setSearch(e){this.search={...this.search,...e},this._emit()}setSelectedTracks(e){this.selectedTracks=e,this._emit()}setMultiMode(e){this.multiMode=e,e||(this.selectedTracks=new Set),this._emit()}_startTick(){this._tickInterval=window.setInterval(()=>this._tick(),1e3)}_tick(){let e=!1;for(const t of Object.keys(this.players)){const s=this.players[t];if(!s.playing)continue;const r=s.queue[s.currentIdx];if(!r)continue;const a=Ze.trackById(r);a&&(s.position+1>=a.durationSec?this.players[t]={...s,position:0,currentIdx:Math.min(s.queue.length-1,s.currentIdx+1)}:this.players[t]={...s,position:s.position+1},e=!0)}e&&this._emit()}dispose(){this._stopTick()}}Store._STORAGE_KEY="homefront-music-card.ui-state";class StoreController{constructor(e,t){this.host=e,this.store=t,this._onChange=()=>{this.host.requestUpdate()},e.addController(this)}hostConnected(){this.store.addEventListener("change",this._onChange)}hostDisconnected(){this.store.removeEventListener("change",this._onChange)}}let rt=class extends i{constructor(){super(...arguments),this.size=48,this.radius=8,this.boxShadow=""}render(){const e="number"==typeof this.size?this.size:/^\d+(\.\d+)?$/.test(this.size)?Number(this.size):null,t=null!==e?`${e}px`:this.size,s=null!==e?.34*e:16,r=Ye(this.obj),a=`width:${t};height:${t};border-radius:${this.radius}px;background:${r};${this.boxShadow?`box-shadow:${this.boxShadow}`:""}`;return X`
      <div class="art" style=${a}>
        ${this.imageUrl?X`<img src=${this.imageUrl} alt="" loading="lazy" />`:""}
        ${this.glyph?X`<div class="glyph" style="font-size:${s}px">${this.glyph}</div>`:""}
        <div class="scan"></div>
      </div>
    `}};rt.styles=l`
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
  `,e([ue({attribute:!1})],rt.prototype,"obj",void 0),e([ue()],rt.prototype,"size",void 0),e([ue({type:Number})],rt.prototype,"radius",void 0),e([ue({attribute:!1})],rt.prototype,"glyph",void 0),e([ue()],rt.prototype,"boxShadow",void 0),e([ue({attribute:"image-url"})],rt.prototype,"imageUrl",void 0),rt=e([ce("hf-album-art")],rt);let at=class extends i{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.color="#fff",this.track="rgba(255,255,255,0.18)",this.trackHeight=4,this.thumb=14,this.ariaLabel="",this._onInput=e=>{const t=Number(e.target.value);this.value=t,this.dispatchEvent(new CustomEvent("hf-input",{detail:t,bubbles:!0,composed:!0}))}}render(){const e=(this.value-this.min)/(this.max-this.min)*100;return this.style.setProperty("--hf-pct",`${e}%`),this.style.setProperty("--hf-color",this.color),this.style.setProperty("--hf-track",this.track),this.style.setProperty("--hf-track-h",`${this.trackHeight}px`),this.style.setProperty("--hf-thumb",`${this.thumb}px`),X`<input
      type="range"
      min=${this.min}
      max=${this.max}
      .value=${String(this.value)}
      aria-label=${this.ariaLabel||"Slider"}
      @input=${this._onInput}
    />`}};at.styles=l`
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
  `,e([ue({type:Number})],at.prototype,"value",void 0),e([ue({type:Number})],at.prototype,"min",void 0),e([ue({type:Number})],at.prototype,"max",void 0),e([ue()],at.prototype,"color",void 0),e([ue()],at.prototype,"track",void 0),e([ue({type:Number,attribute:"track-height"})],at.prototype,"trackHeight",void 0),e([ue({type:Number})],at.prototype,"thumb",void 0),e([ue({attribute:"aria-label"})],at.prototype,"ariaLabel",void 0),at=e([ce("hf-slider")],at);let ot=class extends i{willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const e=this.store,t=e.currentTrack,s=e.currentAlbum,r=e.activePlayer,a=e.activeGroup,o=e.groups.filter(e=>!e.isActive&&e.playing).length,n=s.imageUrl;return X`
      <div class="art-wrap">
        <hf-album-art
          .obj=${s}
          size="100%"
          radius="18"
          boxShadow="0 18px 40px rgba(0,0,0,0.35)"
          .imageUrl=${n}
        ></hf-album-art>
      </div>
      <div class="meta">
        <div class="eyebrow">
          ${r.shuffle?"Shuffle":"Now Playing"} · ${s.name}
        </div>
        <div class="title">${t.name}</div>
        <div class="artist">${t.artist}</div>
      </div>
      <div class="scrubber">
        <hf-slider
          .value=${r.position}
          .min=${0}
          .max=${t.durationSec}
          .color=${$e}
          .track=${ke}
          @hf-input=${t=>e.setPosition(t.detail)}
        ></hf-slider>
        <div class="times">
          <span>${Ve(r.position)}</span>
          <span>-${Ve(t.durationSec-r.position)}</span>
        </div>
      </div>
      <div class="transport">
        <button
          class="icon-btn"
          aria-pressed=${r.shuffle}
          aria-label="Shuffle"
          @click=${()=>e.toggleShuffle()}
        >
          ${je.shuffle({size:18})}
        </button>
        <button class="icon-btn" aria-label="Previous" @click=${()=>e.prev()}>
          ${je.prev({size:22})}
        </button>
        <button
          class="play-btn"
          aria-label=${r.playing?"Pause":"Play"}
          @click=${()=>e.togglePlaying()}
        >
          ${r.playing?je.pause({size:22}):je.play({size:22})}
        </button>
        <button class="icon-btn" aria-label="Next" @click=${()=>e.next()}>
          ${je.next({size:22})}
        </button>
        <button
          class="icon-btn"
          aria-pressed=${"off"!==r.repeat}
          aria-label="Repeat"
          @click=${()=>e.cycleRepeat()}
        >
          ${"one"===r.repeat?je.rep1({size:18}):je.rep({size:18})}
        </button>
      </div>
      <div class="output">
        <button class="output-main" type="button" @click=${()=>e.setTab("group")}>
          ${je.speaker({size:16,stroke:$e})}
          <div style="flex:1; min-width:0">
            <div class="output-name">${a?.name??"No output"}</div>
            <div class="output-sub">
              ${(a?.members.length??0)>1?X`Grouped · ${a?.members.length} speakers · `:""}
              Volume ${r.groupVolume}
              ${o>0?X` · ${o} other group${o>1?"s":""}
                  playing`:""}
            </div>
          </div>
        </button>
        <button
          class="output-group-btn"
          type="button"
          @click=${()=>e.openGroupingSheet(e.activeLeadId)}
        >
          ${je.group({size:13})} Group
        </button>
      </div>
    `}};ot.styles=l`
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
  `,e([ue({attribute:!1})],ot.prototype,"store",void 0),ot=e([ce("hf-player-tab")],ot);const nt=[{id:"playlists",label:"Playlists"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"tracks",label:"Tracks"},{id:"radio",label:"Radio"}],lt=[{id:"default",label:"Default (MA order)"},{id:"title_asc",label:"Title A → Z"},{id:"title_desc",label:"Title Z → A"}];let dt=class extends i{constructor(){super(...arguments),this._kickedOffRoot=!1,this._sortMode="default",this._sortMenuOpen=!1,this._filterQuery="",this._lastStackDepth=0,this._closeSortMenu=()=>{this._sortMenuOpen&&(this._sortMenuOpen=!1)}}willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}updated(){!this.store?.isHassMode||this._kickedOffRoot||0!==this.store.hassBrowseStack.length||this.store.hassBrowseLoading||(this._kickedOffRoot=!0,this.store.browseRoot());const e=this.store?.hassBrowseStack?.length??0;e!==this._lastStackDepth&&(this._lastStackDepth=e,""!==this._filterQuery&&(this._filterQuery=""))}render(){return this.store?this.store.isHassMode?this._renderHass():X`${this._renderCrumbs()} ${this._renderBody()}`:X``}_renderHass(){const e=this.store.hassBrowseStack,t=e[e.length-1],s=!!t&&(t.children?.length??0)>5;return X`
      ${this._renderHassCrumbs(e)}
      ${s?this._renderControlsBar():""}
      ${this.store.hassBrowseError?X`<div class="hass-error">${this.store.hassBrowseError}</div>`:this.store.hassBrowseLoading&&!t?X`<div class="hass-loading">Loading library…</div>`:t?this._renderHassNode(t):X`<div class="hass-empty">No library available</div>`}
    `}_renderControlsBar(){return X`
      <div class="controls-bar">
        <div class="filter-input-wrap">
          ${je.search({size:13,stroke:"currentColor"})}
          <input
            class="filter-input"
            type="search"
            placeholder="Filter this list…"
            .value=${this._filterQuery}
            @input=${e=>this._filterQuery=e.target.value}
          />
          ${this._filterQuery?X`
                <button
                  class="filter-clear"
                  aria-label="Clear filter"
                  @click=${()=>this._filterQuery=""}
                >
                  ${je.x({size:12})}
                </button>
              `:""}
        </div>
        <button
          class="sort-btn"
          @click=${e=>{e.stopPropagation(),this._sortMenuOpen=!this._sortMenuOpen}}
        >
          ${je.filter({size:12})} ${e=this._sortMode,lt.find(t=>t.id===e)?.label.split(" ")[0]??"Default"}
        </button>
        ${this._sortMenuOpen?X`
              <div class="sort-menu" @click=${e=>e.stopPropagation()}>
                ${lt.map(e=>X`
                    <button
                      class="sort-option"
                      data-active=${e.id===this._sortMode}
                      @click=${()=>this._chooseSort(e.id)}
                    >
                      <span>${e.label}</span>
                      <span class="sort-option-check">
                        ${je.check({size:12,sw:2.4})}
                      </span>
                    </button>
                  `)}
              </div>
            `:""}
      </div>
    `;var e}_chooseSort(e){this._sortMode=e,this._sortMenuOpen=!1}_applySort(e){if("default"===this._sortMode)return e;const t=[...e];return"title_asc"===this._sortMode?t.sort((e,t)=>e.title.localeCompare(t.title)):"title_desc"===this._sortMode&&t.sort((e,t)=>t.title.localeCompare(e.title)),t}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._closeSortMenu)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._closeSortMenu)}_renderHassCrumbs(e){return 0===e.length?X``:X`
      <div class="crumbs">
        ${e.map((t,s)=>{const r=s===e.length-1,a=0===s?"Sources":t.title;return X`
            <button
              class="crumb-btn"
              data-current=${r}
              @click=${()=>this.store.browsePop(s)}
            >
              ${a}
            </button>
            ${s<e.length-1?X`<span aria-hidden="true">${je.chev({size:11})}</span>`:""}
          `})}
      </div>
    `}_renderHassNode(e){const t=e.children??[];if(0===t.length)return X`<div class="hass-empty">No items</div>`;const s=this._applyFilter(t),r=this._applySort(s);return 0===r.length?X`
        <div class="hass-empty">
          No matches for "${this._filterQuery}"
        </div>
      `:X`<div class="body">${this._renderHassList(r)}</div>`}_applyFilter(e){const t=this._filterQuery.trim().toLowerCase();return t?e.filter(e=>e.title.toLowerCase().includes(t)):e}_renderHassList(e){return X`
      <div>
        ${e.map(e=>X`
            <button class="track-row" @click=${()=>this._onHassChildClick(e)}>
              ${e.thumbnail?X`<hf-album-art
                    .obj=${null}
                    .imageUrl=${e.thumbnail}
                    size="36"
                    radius="6"
                  ></hf-album-art>`:X`<div
                    style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);display:grid;place-items:center;color:var(--hf-text-dim);flex:none"
                  >
                    ${this._iconForClass(e.media_class)}
                  </div>`}
              <div class="track-meta">
                <div class="track-name">${e.title}</div>
                <div class="track-sub">${e.media_class}</div>
              </div>
              ${e.can_expand?je.chev({size:14}):e.can_play?je.play({size:14}):""}
            </button>
          `)}
      </div>
    `}_onHassChildClick(e){e.can_expand?this.store.browseInto(e):e.can_play&&this.store.playBrowseNode(e,"replace")}_iconForClass(e){return"track"===e||"music"===e?je.note({size:16}):"album"===e?je.album({size:16}):"artist"===e?je.artist({size:16}):"playlist"===e?je.list({size:16}):"radio"===e?je.radio({size:16}):je.home({size:16})}_renderCrumbs(){const e=this.store.browser.crumbs;return X`
      <div class="crumbs">
        ${e.map((t,s)=>{const r=s===e.length-1;return X`
            <button
              class="crumb-btn"
              data-current=${r}
              @click=${()=>this.store.popToCrumb(s)}
            >
              ${t.label}
            </button>
            ${s<e.length-1?X`<span aria-hidden="true">${je.chev({size:11})}</span>`:""}
          `})}
      </div>
    `}_renderBody(){const{providerId:e,accountId:t,sub:s,detailId:r}=this.store.browser;if(!e)return this._renderProviders();const a=Ze.providerById(e);return a?t?r?this._renderDetail(r):this._renderTypeView(s):this._renderAccounts(a):X``}_renderProviders(){return X`
      <div class="body">
        <div class="section-label">Connected sources</div>
        <div class="stack">
          ${Ze.providers.map(e=>this._renderProviderTile(e))}
        </div>
      </div>
    `}_renderProviderTile(e){const t=`linear-gradient(135deg, oklch(72% 0.18 ${e.brandHue}), oklch(48% 0.16 ${(e.brandHue+30)%360}))`;return X`
      <button
        class="provider-tile"
        @click=${()=>this.store.pushCrumb({kind:"provider",label:e.name},{providerId:e.id})}
      >
        <div class="provider-glyph" style=${`background:${t}`}>
          ${e.glyph||e.name[0]}
        </div>
        <div class="provider-info">
          <div class="provider-name">${e.name}</div>
          <div class="provider-sub">
            ${e.accounts.length} account${e.accounts.length>1?"s":""} · connected
          </div>
        </div>
        ${je.chev({size:16})}
      </button>
    `}_renderAccounts(e){return X`
      <div class="body">
        <div class="section-label">${e.name} · choose an account</div>
        <div class="stack">
          ${e.accounts.map(e=>this._renderAccountTile(e))}
        </div>
      </div>
    `}_renderAccountTile(e){const t=e.name.replace(/[^a-zA-Z]/g,"").slice(0,2).toUpperCase();return X`
      <button
        class="account-tile"
        @click=${()=>this.store.pushCrumb({kind:"account",label:e.name},{accountId:e.id,sub:"playlists",detailId:null})}
      >
        <div class="account-avatar" style=${"background:conic-gradient(from 220deg, var(--hf-accent), oklch(70% 0.14 220))"}>${t}</div>
        <div style="flex:1; min-width:0">
          <div class="account-name">${e.name}</div>
          <div class="account-sub">${e.tier}</div>
        </div>
        ${je.chev({size:16})}
      </button>
    `}_renderTypeView(e){return X`
      <div class="subtabs">
        ${nt.map(t=>X`
            <button
              class="subtab"
              data-active=${e===t.id}
              @click=${()=>this.store.browserGo({sub:t.id})}
            >
              ${t.label}
            </button>
          `)}
      </div>
      <div class="body">${this._renderTypeBody(e)}</div>
    `}_renderTypeBody(e){return"playlists"===e?X`
        <div class="grid2">
          ${Ze.playlists.map(e=>X`
              <button
                class="art-tile"
                @click=${()=>this.store.pushCrumb({kind:"detail",label:e.name},{detailId:e.id})}
              >
                <hf-album-art
                  .obj=${e}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${e.name}</div>
                  <div class="art-tile-sub">${e.trackCount} tracks</div>
                </div>
              </button>
            `)}
        </div>
      `:"albums"===e?X`
        <div class="grid2">
          ${Ze.albums.map(e=>X`
              <button
                class="art-tile"
                @click=${()=>this.store.pushCrumb({kind:"detail",label:e.name},{detailId:e.id})}
              >
                <hf-album-art
                  .obj=${e}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${e.name}</div>
                  <div class="art-tile-sub">${e.artist}</div>
                </div>
              </button>
            `)}
        </div>
      `:"artists"===e?X`
        <div>
          ${Ze.artistList.slice(0,12).map((e,t)=>X`
              <button class="artist-row">
                <div
                  class="artist-avatar"
                  style=${`background: conic-gradient(from ${40*t}deg, oklch(70% 0.18 ${30*t}), oklch(46% 0.16 ${(30*t+60)%360}))`}
                ></div>
                <div class="artist-name">${e}</div>
                <div class="artist-tag">Artist</div>
              </button>
            `)}
        </div>
      `:"tracks"===e?X`
        <div>
          ${Ze.tracks.slice(0,12).map((e,t)=>this._renderTrackRow(e,t+1))}
        </div>
      `:X`
      <div class="stack">
        ${Ze.radioStations.map(e=>X`
            <button class="radio-row">
              <hf-album-art
                .obj=${e}
                size="44"
                radius="10"
                .glyph=${je.radio({size:18,stroke:"#fff"})}
              ></hf-album-art>
              <div style="flex:1; min-width:0">
                <div class="track-name">${e.name}</div>
                <div class="track-sub">${e.genre}</div>
              </div>
              ${je.play({size:16})}
            </button>
          `)}
      </div>
    `}_renderTrackRow(e,t){const s=Ze.albumById(e.albumId);return X`
      <button class="track-row">
        ${null!=t?X`<div class="track-index">${t}</div>`:""}
        <hf-album-art .obj=${s} size="36" radius="6"></hf-album-art>
        <div class="track-meta">
          <div class="track-name">${e.name}</div>
          <div class="track-sub">${e.artist} · ${e.album}</div>
        </div>
        <div class="track-time">${Ve(e.durationSec)}</div>
      </button>
    `}_renderDetail(e){const t=Ze.playlists.find(t=>t.id===e),s=Ze.albums.find(t=>t.id===e),r=t??s;if(!r)return X``;const a=!!t;return X`
      <div>
        <div class="detail-header">
          <hf-album-art
            .obj=${r}
            size="112"
            radius="14"
            boxShadow="0 12px 24px rgba(0,0,0,0.28)"
          ></hf-album-art>
          <div class="detail-meta">
            <div class="detail-kind">${a?"Playlist":"Album"}</div>
            <div class="detail-title">${r.name}</div>
            <div class="detail-sub">
              ${a?`${r.owner} · ${r.trackCount} tracks`:`${r.artist} · ${r.year}`}
            </div>
            <div class="detail-actions">
              <button class="pill-btn primary">${je.play({size:13})} Play</button>
              <button class="pill-btn">${je.plus({size:13})} Queue</button>
            </div>
          </div>
        </div>
        <div class="body">
          ${Ze.tracks.slice(0,10).map((e,t)=>this._renderTrackRow(e,t+1))}
        </div>
      </div>
    `}};dt.styles=l`
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
    .hass-loading,
    .hass-error,
    .hass-empty {
      padding: 40px 14px;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 13px;
    }
    .hass-error {
      color: #e0413a;
    }
    .controls-bar {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 14px 4px;
    }
    .filter-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--hf-input);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 4px 10px;
      color: var(--hf-text-dim);
    }
    .filter-input {
      flex: 1;
      background: transparent;
      border: 0;
      outline: 0;
      color: var(--hf-text);
      font: inherit;
      font-size: 12.5px;
      min-width: 0;
    }
    .filter-clear {
      background: transparent;
      border: 0;
      padding: 2px;
      cursor: pointer;
      color: var(--hf-text-dim);
      display: inline-flex;
    }
    .sort-bar {
      position: relative;
      display: flex;
      justify-content: flex-end;
      padding: 4px 14px 4px;
    }
    .sort-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      color: var(--hf-text-dim);
      cursor: pointer;
      font: inherit;
      font-size: 11.5px;
      font-weight: 600;
    }
    .sort-menu {
      position: absolute;
      right: 14px;
      top: 100%;
      margin-top: 4px;
      z-index: 10;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      min-width: 180px;
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    .sort-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 10px;
      background: transparent;
      border: 0;
      border-radius: 7px;
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      font-size: 12.5px;
      text-align: left;
    }
    .sort-option:hover {
      background: var(--hf-input);
    }
    .sort-option[data-active='true'] {
      color: var(--hf-accent);
    }
    .sort-option-check {
      opacity: 0;
    }
    .sort-option[data-active='true'] .sort-option-check {
      opacity: 1;
    }
  `,e([ue({attribute:!1})],dt.prototype,"store",void 0),e([fe()],dt.prototype,"_sortMode",void 0),e([fe()],dt.prototype,"_sortMenuOpen",void 0),e([fe()],dt.prototype,"_filterQuery",void 0),dt=e([ce("hf-browse-tab")],dt);const ct=[{id:"all",label:"All"},{id:"tracks",label:"Tracks"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"playlists",label:"Playlists"}],ht=["khruangbin","jazz","deep focus","ambient","tycho","discover weekly"];let pt=class extends i{constructor(){super(...arguments),this._searchTimer=null,this._lastFiredQuery=""}willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}disconnectedCallback(){super.disconnectedCallback(),null!==this._searchTimer&&(window.clearTimeout(this._searchTimer),this._searchTimer=null)}_scheduleHassSearch(e,t){null!==this._searchTimer&&window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{if(e===this._lastFiredQuery)return;this._lastFiredQuery=e;const s=function(e){switch(e){case"tracks":return["track"];case"albums":return["album"];case"artists":return["artist"];case"playlists":return["playlist"];default:return[]}}(t);this.store.searchMa(e,s,25)},350)}render(){if(!this.store)return X``;if(this.store.isHassMode)return this._renderHass();const e=this.store,t=e.search.query.trim().toLowerCase(),s=e.search.filter,r=t?this._matchesFor(t):null;return X`
      <div class="top">
        <div class="input-wrap">
          ${je.search({size:16})}
          <input
            .value=${e.search.query}
            placeholder="Search Spotify, Apple Music, SoundCloud…"
            @input=${t=>e.setSearch({query:t.target.value})}
          />
          ${e.search.query?X`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${()=>e.setSearch({query:""})}
                >
                  ${je.x({size:14})}
                </button>
              `:""}
        </div>
        <div class="filters">
          ${ct.map(t=>X`
              <button
                class="filter"
                data-active=${s===t.id}
                @click=${()=>e.setSearch({filter:t.id})}
              >
                ${t.label}
              </button>
            `)}
        </div>
      </div>

      <div class="scroll">
        ${r?this._renderResults(r,s):this._renderSuggestions()}
      </div>
    `}_matchesFor(e){const t=t=>t.toLowerCase().includes(e);return{tracks:Ze.tracks.filter(e=>t(e.name)||t(e.artist)),albums:Ze.albums.filter(e=>t(e.name)||t(e.artist)),artists:Ze.artistList.filter(t),playlists:Ze.playlists.filter(e=>t(e.name))}}_renderResults(e,t){return X`
      <div class="body">
        ${Ze.providers.map(s=>this._renderProviderSection(s,e,t))}
      </div>
    `}_renderProviderSection(e,t,s){let r=t.tracks.slice(0,4),a=t.albums.slice(0,2),o=t.artists.slice(0,2),n=t.playlists.slice(0,2);"apple"===e.id?(r=t.tracks.slice(1,4),a=t.albums.slice(2,4)):"soundcloud"===e.id&&(r=t.tracks.slice(2,5),a=[]),"tracks"===s?(a=[],o=[],n=[]):"albums"===s?(r=[],o=[],n=[]):"artists"===s?(r=[],a=[],n=[]):"playlists"===s&&(r=[],a=[],o=[]);const l=r.length+a.length+o.length+n.length;if(0===l)return X``;const d=`linear-gradient(135deg, oklch(70% 0.18 ${e.brandHue}), oklch(46% 0.16 ${(e.brandHue+30)%360}))`;return X`
      <div class="section">
        <div class="section-head">
          <div class="provider-glyph-sm" style=${`background:${d}`}>
            ${e.glyph||e.name[0]}
          </div>
          <div class="provider-name">${e.name}</div>
          <div class="result-count">
            ${l} result${l>1?"s":""}
          </div>
        </div>

        ${r.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Tracks</div>
                ${r.map(e=>{const t=Ze.albumById(e.albumId);return X`
                    <div class="track-row">
                      <hf-album-art .obj=${t} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${e.name}</div>
                        <div class="row-sub">${e.artist} · ${e.album}</div>
                      </div>
                      <div class="row-time">${Ve(e.durationSec)}</div>
                    </div>
                  `})}
              </div>
            `:""}

        ${a.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Albums</div>
                <div class="album-row">
                  ${a.map(e=>X`
                      <div class="album-card">
                        <hf-album-art .obj=${e} size="96" radius="8"></hf-album-art>
                        <div class="album-name">${e.name}</div>
                        <div class="album-artist">${e.artist}</div>
                      </div>
                    `)}
                </div>
              </div>
            `:""}

        ${o.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Artists</div>
                ${o.map((e,t)=>X`
                    <div class="artist-row">
                      <div
                        class="artist-avatar"
                        style=${`background: conic-gradient(from ${60*t}deg, oklch(70% 0.18 ${40*t}), oklch(46% 0.16 ${(40*t+60)%360}))`}
                      ></div>
                      <div class="row-name">${e}</div>
                      <div class="row-time">Artist</div>
                    </div>
                  `)}
              </div>
            `:""}

        ${n.length>0?X`
              <div>
                <div class="small-label">Playlists</div>
                ${n.map(e=>X`
                    <div class="playlist-row">
                      <hf-album-art .obj=${e} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${e.name}</div>
                        <div class="row-sub">${e.trackCount} tracks</div>
                      </div>
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}_renderSuggestions(){return X`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${ht.map(e=>X`
              <button
                class="suggest-pill"
                @click=${()=>this.store.setSearch({query:e})}
              >
                ${e}
              </button>
            `)}
        </div>
        <div class="small-label">Recent</div>
        ${Ze.tracks.slice(0,4).map(e=>{const t=Ze.albumById(e.albumId);return X`
            <div class="track-row">
              <hf-album-art .obj=${t} size="36" radius="6"></hf-album-art>
              <div class="row-meta">
                <div class="row-name">${e.name}</div>
                <div class="row-sub">${e.artist} · ${e.album}</div>
              </div>
              <div class="row-time">${Ve(e.durationSec)}</div>
            </div>
          `})}
      </div>
    `}_renderHass(){const e=this.store,t=e.search.query,s=e.search.filter,r=e.hassSearchResults;return X`
      <div class="top">
        <div class="input-wrap">
          ${je.search({size:16})}
          <input
            .value=${t}
            placeholder="Search MA library + connected providers…"
            @input=${t=>{const r=t.target.value;e.setSearch({query:r}),this._scheduleHassSearch(r,s)}}
          />
          ${t?X`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${()=>{e.setSearch({query:""}),this._lastFiredQuery="",e.searchMa("",[])}}
                >
                  ${je.x({size:14})}
                </button>
              `:""}
        </div>
        <div class="filters">
          ${ct.map(r=>X`
              <button
                class="filter"
                data-active=${s===r.id}
                @click=${()=>{e.setSearch({filter:r.id}),t&&(this._lastFiredQuery="",this._scheduleHassSearch(t,r.id))}}
              >
                ${r.label}
              </button>
            `)}
        </div>
        <div class="library-note">
          Search is library-wide — results are merged across all providers
          and accounts (MA API limitation).
        </div>
      </div>

      <div class="scroll">
        ${t?e.hassSearchLoading&&!r?X`<div class="hass-loading">Searching…</div>`:e.hassSearchError?X`<div class="hass-error">${e.hassSearchError}</div>`:r?this._renderHassResults(r,s):X`<div class="hass-empty">Type to search</div>`:this._renderHassSuggestions()}
      </div>
    `}_renderHassResults(e,t){const s=[{key:"tracks",label:"Tracks",items:e.tracks},{key:"albums",label:"Albums",items:e.albums},{key:"artists",label:"Artists",items:e.artists},{key:"playlists",label:"Playlists",items:e.playlists},{key:"radio",label:"Radio",items:e.radio}].filter(e=>0!==e.items.length&&("all"===t||t===e.key));return 0===s.length?X`<div class="hass-empty">No matches for "${e.query}"</div>`:X`
      <div class="body" style="padding:10px 14px 16px">
        ${s.map(e=>X`
            <div style="margin-bottom:16px">
              <div class="small-label">${e.label} · ${e.items.length}</div>
              ${e.items.map(e=>this._renderHassResultRow(e))}
            </div>
          `)}
      </div>
    `}_renderHassResultRow(e){const t=e.title??e.name??"(untitled)",s=[];e.artist&&s.push(e.artist),e.album&&e.album!==t&&s.push(e.album),e.provider&&s.push(e.provider);const r=s.join(" · "),a=e.image_url??e.thumbnail;return X`
      <div class="track-row" @click=${()=>this.store.playSearchResult(e)}>
        ${a?X`<hf-album-art
              .obj=${null}
              .imageUrl=${a}
              size="36"
              radius="6"
            ></hf-album-art>`:X`<div
              style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);flex:none"
            ></div>`}
        <div class="row-meta">
          <div class="row-name">${t}</div>
          ${r?X`<div class="row-sub">${r}</div>`:""}
        </div>
        ${e.duration?X`<div class="row-time">${Ve(e.duration)}</div>`:""}
      </div>
    `}_renderHassSuggestions(){return X`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${ht.map(e=>X`
              <button
                class="suggest-pill"
                @click=${()=>{this.store.setSearch({query:e}),this._scheduleHassSearch(e,this.store.search.filter)}}
              >
                ${e}
              </button>
            `)}
        </div>
      </div>
    `}};pt.styles=l`
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
    .hass-loading,
    .hass-error,
    .hass-empty {
      padding: 30px 14px;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 13px;
    }
    .hass-error {
      color: #e0413a;
    }
    .library-note {
      padding: 8px 14px 0;
      font-size: 10.5px;
      color: var(--hf-text-dim);
      font-style: italic;
    }
  `,e([ue({attribute:!1})],pt.prototype,"store",void 0),pt=e([ce("hf-search-tab")],pt);let ut=class extends i{constructor(){super(...arguments),this.rowHeight=56,this.actionBg="#e0413a",this._dx=0,this._dragging=!1,this._startX=null,this._startDx=0,this._onDown=e=>{const t="touches"in e?e.touches[0].clientX:e.clientX;this._startX=t,this._startDx=this._dx,this._dragging=!0},this._onMove=e=>{if(null===this._startX)return;const t="touches"in e?e.touches[0].clientX:e.clientX;let s=this._startDx+(t-this._startX);s>0&&(s=0),s<-110&&(s=-110),this._dx=s},this._onUp=()=>{this._startX=null,this._dragging=!1,this._dx=this._dx<-64?-92:0},this._fireDelete=()=>{this.dispatchEvent(new CustomEvent("hf-delete",{bubbles:!0,composed:!0})),this._dx=0}}render(){return X`
      <div
        class="action"
        style=${`background:${this.actionBg}`}
        @click=${this._fireDelete}
      >
        ${this.icon??X`<span>×</span>`}
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
    `}};ut.styles=l`
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
  `,e([ue({type:Number})],ut.prototype,"rowHeight",void 0),e([ue()],ut.prototype,"actionBg",void 0),e([ue({attribute:!1})],ut.prototype,"icon",void 0),e([fe()],ut.prototype,"_dx",void 0),e([fe()],ut.prototype,"_dragging",void 0),ut=e([ce("hf-swipe-row")],ut);let ft=class extends i{constructor(){super(...arguments),this.items=[],this.rowHeight=56,this.renderRow=()=>X``,this._dragIdx=null,this._hoverIdx=null,this._startY=0,this._onMove=e=>{if(null===this._dragIdx)return;const t=("touches"in e?e.touches[0].clientY:e.clientY)-this._startY,s=Math.round(this._dragIdx+t/this.rowHeight);this._hoverIdx=Math.max(0,Math.min(this.items.length-1,s))},this._onUp=()=>{null!==this._dragIdx&&null!==this._hoverIdx&&this._hoverIdx!==this._dragIdx&&this.dispatchEvent(new CustomEvent("hf-reorder",{detail:{from:this._dragIdx,to:this._hoverIdx},bubbles:!0,composed:!0})),this._dragIdx=null,this._hoverIdx=null,window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}}createRenderRoot(){return this}render(){const e=this._positions();return X`
      <div
        style=${`position:relative;height:${this.items.length*this.rowHeight}px`}
      >
        ${this.items.map((t,s)=>{const r=s===this._dragIdx,a=e[s]??0;return X`
            <div style=${`position:absolute;left:0;right:0;top:0;transform:translateY(${a}px);${r?"transition:none;z-index:10;opacity:0.92;filter:drop-shadow(0 8px 22px rgba(0,0,0,0.4))":"transition:transform 0.18s cubic-bezier(0.2,0.7,0.3,1)"}`} .key=${t.key}>
              ${this.renderRow(t,s,{onGripDown:this._gripDownFor(s),isDragging:r})}
            </div>
          `})}
      </div>
    `}_positions(){const e=this.items.map((e,t)=>t);if(null!==this._dragIdx&&null!==this._hoverIdx){const[t]=e.splice(this._dragIdx,1);void 0!==t&&e.splice(this._hoverIdx,0,t)}const t=new Array(this.items.length).fill(0);return e.forEach((e,s)=>{t[e]=s*this.rowHeight}),t}_gripDownFor(e){return t=>{t.preventDefault(),this._dragIdx=e,this._hoverIdx=e,this._startY="touches"in t?t.touches[0].clientY:t.clientY,window.addEventListener("mousemove",this._onMove),window.addEventListener("mouseup",this._onUp),window.addEventListener("touchmove",this._onMove,{passive:!1}),window.addEventListener("touchend",this._onUp)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}};e([ue({attribute:!1})],ft.prototype,"items",void 0),e([ue({type:Number})],ft.prototype,"rowHeight",void 0),e([ue({attribute:!1})],ft.prototype,"renderRow",void 0),e([fe()],ft.prototype,"_dragIdx",void 0),e([fe()],ft.prototype,"_hoverIdx",void 0),ft=e([ce("hf-draggable-queue")],ft);let mt=class extends i{constructor(){super(...arguments),this._queueLoadKickedOff=!1}willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}updated(){!this.store?.isHassMode||this.store.hassQueueLoading||this.store.hassQueueIsFresh||this._queueLoadKickedOff||(this._queueLoadKickedOff=!0,this.store.loadQueue().finally(()=>{this._queueLoadKickedOff=!1}))}render(){if(!this.store)return X``;if(this.store.isHassMode)return this._renderHass();const e=this.store,t=e.activePlayer,s=t.queue.slice(t.currentIdx+1),r=Ze.trackById(t.queue[t.currentIdx]??""),a=s.map((e,s)=>{const r=t.currentIdx+1+s;return{key:`${e}@${r}`,id:e,idxInQueue:r}}),o=e.selectedTracks.size;return X`
      ${e.multiMode?X`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${()=>e.setMultiMode(!1)}
                aria-label="Cancel selection"
              >
                ${je.x({size:16})}
              </button>
              <div class="multi-count">${o} selected</div>
              <div class="multi-actions">
                <button
                  class="pill-primary"
                  @click=${()=>e.removeBulk(e.selectedTracks)}
                >
                  Remove
                </button>
              </div>
            </div>
          `:X`
            <div class="toolbar">
              <div>
                <div class="title">Queue</div>
                <div class="sub">${s.length} upcoming · drag to reorder</div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${()=>e.setMultiMode(!0)}
                >
                  ${je.check({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue"
                  @click=${()=>e.clearQueue()}
                >
                  ${je.trash({size:16})}
                </button>
              </div>
            </div>
          `}

      ${r?X`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${Ze.albumById(r.albumId)}
                  size="44"
                  radius="8"
                ></hf-album-art>
                <div class="np-meta">
                  <div class="np-line">
                    <div class="np-pulse"></div>
                    <div class="np-name">${r.name}</div>
                  </div>
                  <div class="np-artist">${r.artist}</div>
                </div>
              </div>
            </div>
          `:""}

      <div class="scroll">
        <div class="small-label">Up next · ${s.length}</div>
        ${0===a.length?X`<div class="empty">Queue is empty</div>`:X`
              <hf-draggable-queue
                .items=${a}
                .rowHeight=${56}
                .renderRow=${(e,t,s)=>this._renderRow(e,s)}
                @hf-reorder=${t=>{const s=e.activePlayer.currentIdx;e.moveQueue(s+1+t.detail.from,s+1+t.detail.to)}}
              ></hf-draggable-queue>
            `}
      </div>
    `}_renderRow(e,t){const s=this.store,r=Ze.trackById(e.id);if(!r)return X``;const a=Ze.albumById(r.albumId),o=s.selectedTracks.has(e.idxInQueue);return X`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${()=>s.removeFromQueue(e.idxInQueue)}
      >
        <div class="row-inner" data-selected=${o}>
          ${s.multiMode?X`
                <button
                  class="checkbox"
                  data-checked=${o}
                  @click=${t=>{t.stopPropagation();const r=new Set(s.selectedTracks);r.has(e.idxInQueue)?r.delete(e.idxInQueue):r.add(e.idxInQueue),s.setSelectedTracks(r)}}
                >
                  ${o?je.check({size:12,sw:3}):""}
                </button>
              `:X`
                <div
                  class="grip"
                  aria-label="Drag handle"
                  @mousedown=${t.onGripDown}
                  @touchstart=${t.onGripDown}
                >
                  ${je.drag({size:14})}
                </div>
              `}
          <hf-album-art .obj=${a} size="40" radius="6"></hf-album-art>
          <div
            class="row-track"
            @click=${()=>s.multiMode?null:s.playTrackAt(e.idxInQueue)}
          >
            <div class="row-name">${r.name}</div>
            <div class="row-artist">${r.artist}</div>
          </div>
          <div class="row-time">${Ve(r.durationSec)}</div>
          ${s.multiMode?"":X`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${t=>{t.stopPropagation(),s.moveToTop(e.idxInQueue)}}
                >
                  ${je.playNext({size:14})}
                </button>
              `}
        </div>
      </hf-swipe-row>
    `}_renderHass(){const e=this.store,t=e.hassQueue,s=e.currentTrack.name,r=e.currentTrack.artist,a=e.currentAlbum.imageUrl,o=e.selectedTracks.size;return X`
      ${e.multiMode?X`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${()=>e.setMultiMode(!1)}
                aria-label="Cancel selection"
              >
                ${je.x({size:16})}
              </button>
              <div class="multi-count">${o} selected</div>
              <div class="multi-actions">
                <button
                  class="pill-primary"
                  @click=${()=>this._bulkRemoveHass()}
                >
                  Remove
                </button>
              </div>
            </div>
          `:X`
            <div class="toolbar">
              <div>
                <div class="title">Queue</div>
                <div class="sub">
                  ${t.length} item${1===t.length?"":"s"} ·
                  drag-reorder coming soon
                </div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Reload queue"
                  @click=${()=>{e.loadQueue()}}
                >
                  ${je.search({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${()=>e.setMultiMode(!0)}
                >
                  ${je.check({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue from here"
                  @click=${()=>e.clearQueueFromHere()}
                >
                  ${je.trash({size:16})}
                </button>
              </div>
            </div>
          `}

      ${s&&"Nothing playing"!==s?X`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${null}
                  .imageUrl=${a}
                  size="44"
                  radius="8"
                ></hf-album-art>
                <div class="np-meta">
                  <div class="np-line">
                    <div class="np-pulse"></div>
                    <div class="np-name">${s}</div>
                  </div>
                  <div class="np-artist">${r}</div>
                </div>
              </div>
            </div>
          `:""}

      <div class="scroll">
        <div class="small-label">Up next · ${t.length}</div>
        ${e.hassQueueLoading?X`<div class="hass-loading">Loading queue…</div>`:e.hassQueueError?X`<div class="hass-error">${e.hassQueueError}</div>`:0===t.length?X`<div class="empty">Queue is empty</div>`:X`<div>${t.map(e=>this._renderHassRow(e))}</div>`}
      </div>
    `}_renderHassRow(e){const t=this.store,s=e.title??e.name??"(untitled)",r=e.artist??"",a=e.duration??e.duration_seconds??0,o=e.image_url??e.thumbnail,n=t.selectedTracks.has(e.queue_item_id);return X`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${()=>t.removeQueueItem(e.queue_item_id)}
      >
        <div class="row-inner" data-selected=${n}>
          ${t.multiMode?X`
                <button
                  class="checkbox"
                  data-checked=${n}
                  @click=${t=>{t.stopPropagation(),this._toggleSelectHass(e.queue_item_id)}}
                >
                  ${n?je.check({size:12,sw:3}):""}
                </button>
              `:""}
          <hf-album-art
            .obj=${null}
            .imageUrl=${o}
            size="40"
            radius="6"
          ></hf-album-art>
          <div
            class="row-track"
            @click=${()=>t.multiMode?null:t.playQueueItem(e.queue_item_id)}
          >
            <div class="row-name">${s}</div>
            <div class="row-artist">${r}</div>
          </div>
          <div class="row-time">${a?Ve(a):""}</div>
          ${t.multiMode?"":X`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${s=>{s.stopPropagation(),t.moveQueueItemToTop(e.queue_item_id)}}
                >
                  ${je.playNext({size:14})}
                </button>
              `}
        </div>
      </hf-swipe-row>
    `}_toggleSelectHass(e){const t=this.store.selectedTracks,s=new Set(t);s.has(e)?s.delete(e):s.add(e),this.store.setSelectedTracks(s)}_bulkRemoveHass(){const e=this.store.selectedTracks;this.store.removeQueueItems(new Set(e))}};mt.styles=l`
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
    .hass-loading,
    .hass-error,
    .hass-empty {
      padding: 40px 14px;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 13px;
    }
    .hass-error {
      color: #e0413a;
    }
  `,e([ue({attribute:!1})],mt.prototype,"store",void 0),mt=e([ce("hf-queue-tab")],mt);let vt=class extends i{willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const e=this.store.groups,t=e.filter(e=>!e.isIdle),s=e.filter(e=>e.isIdle);return X`
      <div class="header">
        <div class="header-title">Speakers & groups</div>
        <div class="header-sub">
          ${t.length} group${1===t.length?"":"s"} ·
          ${this.store.speakers.length} speakers total
        </div>
      </div>

      <div class="groups">
        ${t.map(e=>this._renderGroupCard(e))}
      </div>

      ${s.length>0?X`
            <div class="idle-section">
              Idle
              <div class="rule"></div>
              ${s.length}
            </div>
            <div class="idle-rows">
              ${s.map(e=>this._renderIdleRow(e))}
            </div>
          `:""}

      <div class="footer-help">
        Tap a group's name to control it from the Player tab. Use Group on
        any row to add/remove rooms; ▶ on an idle row starts solo playback.
      </div>
    `}_renderGroupCard(e){const t=e.player?Ze.trackById(e.player.queue[e.player.currentIdx]??""):void 0,s=t?Ze.albumById(t.albumId):void 0,r=e.player?.groupVolume??e.lead.volume;return X`
      <div class="group-card" data-active=${e.isActive}>
        <div class="group-head">
          ${s?X`<hf-album-art .obj=${s} size="46" radius="9"></hf-album-art>`:X`<div class="group-art">${je.speaker({size:18})}</div>`}
          <div class="group-meta">
            <button class="group-name-btn" @click=${()=>this.store.setActiveLead(e.leadId)}>
              <span class="group-name">${e.name}</span>
              ${e.isActive?X`<span class="active-badge">Active</span>`:""}
            </button>
            <div class="group-track">
              ${t?X`<strong>${t.name}</strong> · ${t.artist}`:"Idle"}
            </div>
          </div>
          <div class="group-actions">
            <button
              class="pill-btn"
              title="Group rooms"
              @click=${()=>this.store.openGroupingSheet(e.leadId)}
            >
              ${je.group({size:13})} Group
            </button>
            <button
              class="play-btn"
              data-playing=${e.playing}
              aria-label=${e.playing?"Pause group":"Play group"}
              @click=${()=>this.store.toggleGroupPlay(e.leadId)}
            >
              ${e.playing?je.pause({size:14}):je.play({size:14})}
            </button>
          </div>
        </div>

        <div class="group-volume">
          <div class="group-volume-head">
            ${je.group({size:13,stroke:be})}
            <div class="group-volume-label">
              Group · ${e.members.length} speaker${1===e.members.length?"":"s"}
            </div>
            <div class="group-volume-value">${r}</div>
          </div>
          <hf-slider
            .value=${r}
            .color=${$e}
            .track=${ke}
            @hf-input=${t=>this.store.setGroupVolumeFor(e.leadId,t.detail)}
          ></hf-slider>
        </div>

        <div class="members">
          ${e.members.map(t=>this._renderMemberRow(t,e))}
        </div>
      </div>
    `}_renderMemberRow(e,t){const s=e.id===t.leadId,r=t.members.length>1;return X`
      <div class="member-row">
        <div class="member-info">
          <div class="member-name-row">
            <div class="member-name">${e.name}</div>
            ${s&&t.members.length>1?X`<span class="lead-tag">Lead</span>`:""}
          </div>
          <hf-slider
            .value=${e.volume}
            .color=${be}
            .track=${ke}
            .trackHeight=${3}
            .thumb=${10}
            @hf-input=${t=>this.store.setSpeakerVol(e.id,t.detail)}
          ></hf-slider>
        </div>
        <div class="member-vol-value">${e.volume}</div>
        ${r?X`
              <button
                class="member-leave"
                title="Leave group"
                @click=${()=>this.store.ungroupSpeaker(e.id)}
              >
                ${je.x({size:13})}
              </button>
            `:""}
      </div>
    `}_renderIdleRow(e){const t=e.lead;return X`
      <div class="idle-row">
        <div class="idle-icon">${je.speaker({size:14})}</div>
        <div class="idle-info">
          <div class="idle-name">${t.name}</div>
          <div class="idle-sub">${t.model} · idle</div>
        </div>
        <button
          class="idle-group-btn"
          title="Group with other rooms"
          @click=${()=>this.store.openGroupingSheet(t.id)}
        >
          ${je.group({size:11})} Group
        </button>
        <button
          class="idle-play-btn"
          title="Play solo here"
          aria-label="Play solo"
          @click=${()=>this.store.startSoloPlayback(t.id)}
        >
          ${je.play({size:11})}
        </button>
      </div>
    `}};vt.styles=l`
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
  `,e([ue({attribute:!1})],vt.prototype,"store",void 0),vt=e([ce("hf-output-tab")],vt);const gt=l`
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
`;let bt=class extends i{willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const e=this.store.groups;return X`
      <div class="rail">
        ${e.map(e=>{const t=e.isActive?we:$e;return X`
            <button
              class="chip"
              data-active=${e.isActive}
              data-idle=${e.isIdle}
              @click=${()=>this.store.setActiveLead(e.leadId)}
            >
              ${e.playing?function(e){const t=`background:${e}`;return X`
    <span class="hf-pip" aria-hidden="true">
      <span style=${t}></span>
      <span style=${t}></span>
      <span style=${t}></span>
    </span>
  `}(t):je.speaker({size:11,stroke:"currentColor"})}
              <span class="chip-name">${e.name}</span>
              ${e.members.length>1?X`<span class="badge">${e.members.length}</span>`:""}
            </button>
          `})}
        <button
          class="manage-btn"
          aria-label="Manage groups"
          title="Manage groups"
          @click=${()=>this.store.setTab("group")}
        >
          ${je.group({size:13})}
        </button>
      </div>
    `}};bt.styles=[gt,l`
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
    `],e([ue({attribute:!1})],bt.prototype,"store",void 0),bt=e([ce("hf-group-chip-rail")],bt);let xt=class extends i{constructor(){super(...arguments),this._draft=new Set,this._initialDraft=new Set,this._wasOpen=!1,this._apply=()=>{const e=this.store.groupingSheet;e.leadId&&this.store.commitGroupMembers(e.leadId,Array.from(this._draft))}}willUpdate(e){if(e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store)),this.store){const e=this.store.groupingSheet.open;e&&!this._wasOpen&&this._seedDraft(),this._wasOpen=e}}_seedDraft(){const e=this.store.groupingSheet.leadId;if(!e)return;const t=this.store.speakers.filter(t=>t.leadId===e).map(e=>e.id);t.push(e);const s=new Set(t);this._draft=s,this._initialDraft=new Set(s)}render(){const e=this.store?.groupingSheet;if(!e?.open)return this.toggleAttribute("data-open",!1),X``;this.toggleAttribute("data-open",!0);const t=e.leadId,s=this.store.speakers.find(e=>e.id===t);if(!s)return X``;const r=this._draft.size,a=this._diffChanged(),o=0===r?"Group will be dissolved":1===r?"Will play solo":`${r} rooms grouped`;return X`
      <div class="scrim" @click=${()=>this.store.closeGroupingSheet()}></div>
      <div class="sheet" @click=${e=>e.stopPropagation()}>
        <div class="grip"><div></div></div>
        <div class="header">
          <div class="header-title">Group rooms</div>
          <div class="header-sub">
            Choose rooms to play in sync with
            <strong>${s.name}</strong>.
          </div>
        </div>
        <div class="list">
          ${this.store.speakers.map(e=>{const s=this._draft.has(e.id),r=e.id===t;return X`
              <button
                class="row"
                data-checked=${s}
                @click=${()=>this._toggle(e.id)}
              >
                <div class="check">
                  ${s?je.check({size:15,sw:2.6}):""}
                </div>
                <div class="row-info">
                  <div class="row-name-line">
                    <div class="row-name">${e.name}</div>
                    ${r?X`<span class="anchor-tag">Anchor</span>`:""}
                  </div>
                  <div class="row-sub">
                    ${e.model}${this._contextFor(e.id,t)?` · ${this._contextFor(e.id,t)}`:""}
                  </div>
                </div>
                <div class="row-vol">vol ${e.volume}</div>
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
    `}_toggle(e){const t=this.store.groupingSheet,s=new Set(this._draft);if(s.has(e)){if(e===t.leadId&&s.size>1)return;s.delete(e)}else s.add(e);this._draft=s}_diffChanged(){if(this._initialDraft.size!==this._draft.size)return!0;for(const e of this._initialDraft)if(!this._draft.has(e))return!0;return!1}_contextFor(e,t){const s=this.store.speakers.find(t=>t.id===e);if(!s)return null;if(s.leadId===t)return null;const r=this.store.groups.find(e=>e.leadId===s.leadId);return r?1===r.members.length?r.player?"Playing solo":"Idle":`In ${r.name}`:null}};xt.styles=l`
    :host {
      position: absolute;
      inset: 0;
      z-index: 50;
      pointer-events: none;
    }
    :host([data-open]) {
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
  `,e([ue({attribute:!1})],xt.prototype,"store",void 0),e([fe()],xt.prototype,"_draft",void 0),xt=e([ce("hf-group-sheet")],xt);const yt=[{key:"hasMA",name:"Music Assistant",why:"Browses libraries (Spotify, Apple Music, Tidal, …), drives playback, and surfaces now-playing metadata.",hint:"Install the Music Assistant add-on, then add the integration under Settings → Devices & Services.",link:"https://music-assistant.io"},{key:"hasQueueActions",name:"Music Assistant Queue Actions (mass_queue)",why:"Adds queue manipulation services (reorder, remove, clear) the card uses on the Queue tab. Registers services under the mass_queue domain.",hint:'Install via HACS — "Music Assistant Queue Actions" by droans — then add it under Settings → Devices & Services.',link:"https://github.com/droans/mass_queue"},{key:"hasWiim",name:"WiiM Audio (LinkPlay)",why:"Provides WiiM-native Linkplay grouping. The card uses this for all multi-room sync, never MA grouping.",hint:'Install via HACS — "WiiM Audio Integration for Home Assistant" by mjcumming — then add each device under Settings → Devices & Services.',link:"https://github.com/mjcumming/wiim"}];let _t=class extends i{render(){if(!this.status)return X``;const e=yt.filter(e=>!this.status[e.key]),t=e.length;return X`
      <div class="head">
        <div class="head-icon">${je.note({size:16})}</div>
        <div class="head-text">
          <div class="head-title">Setup incomplete</div>
          <div class="head-sub">
            ${t} of ${yt.length} required
            integration${1===t?"":"s"} missing
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
        ${yt.map(e=>this._renderRow(e))}
      </div>

      <div class="footer">
        After installing the missing piece${1===t?"":"s"},
        reload Home Assistant (or restart). This card will pick up the
        changes automatically.
      </div>

      <div class="diagnostics">
        <div class="diagnostics-title">Detection diagnostics</div>
        ${this.status.diagnostics.map(e=>X`
            <div class="diag-line">
              <span class=${"diag-mark "+(e.matched?"ok":"miss")}>
                ${e.matched?"✓":"✗"}
              </span>
              <span class="diag-text">[${e.target}] ${e.label}</span>
            </div>
          `)}
      </div>
    `}_renderRow(e){const t=this.status[e.key];return X`
      <div class="row" data-state=${t?"ok":"missing"}>
        <div class="row-status">
          ${t?je.check({size:14,sw:2.4}):je.plus({size:14,sw:2.4})}
        </div>
        <div class="row-body">
          <div class="row-name">${e.name}</div>
          <div class="row-why">${e.why}</div>
          ${t?X`<div class="row-hint">Detected ✓</div>`:X`
                <div class="row-hint">
                  ${e.hint}
                  ${e.link?X` <a href=${e.link} target="_blank" rel="noopener">
                        Open repo →
                      </a>`:""}
                </div>
              `}
        </div>
      </div>
    `}};_t.styles=[Qe,l`
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
    `],e([ue({attribute:!1})],_t.prototype,"status",void 0),_t=e([ce("hf-setup-help")],_t);let $t=class extends i{constructor(){super(...arguments),this._pickerInitTriggered=!1}setConfig(e){this._config={...e}}updated(){!this._pickerInitTriggered&&this.hass&&this._config&&!customElements.get("ha-entity-picker")&&(this._pickerInitTriggered=!0,this._loadEntityPicker())}async _loadEntityPicker(){try{const e=await(window.loadCardHelpers?.());if(!e?.createCardElement)return;const t=await e.createCardElement({type:"entities",entities:[]}),s=t?.constructor;await(s?.getConfigElement?.())}catch(e){console.warn("[homefront-music-card] failed to load ha-entity-picker:",e)}finally{this.requestUpdate()}}render(){return this._config?X`
      ${this._renderLayoutSection()}
      ${this._renderZonesSection()}
      ${this._renderDisplaySection()}
    `:X``}_renderLayoutSection(){return X`
      <div class="section">
        <div class="section-title">Layout</div>
        <p class="hint">
          Card (default) is a phone-shaped widget. Panel pairs with a
          Lovelace view in <em>Panel (1 card)</em> mode for a full-page
          UI — set the view's type to Panel under Edit view as well.
        </p>
        <div class="field">
          <label>Mode</label>
          <select
            @change=${e=>this._set("layout",e.target.value)}
          >
            <option value="card" ?selected=${"panel"!==this._config.layout}>
              Card (default)
            </option>
            <option value="panel" ?selected=${"panel"===this._config.layout}>
              Panel (full-page)
            </option>
          </select>
        </div>
      </div>
    `}_renderZonesSection(){const e=this._config?.zones??[];return X`
      <div class="section">
        <div class="section-title">Zones</div>
        <p class="hint">
          By default the card auto-discovers WiiM/MA entity pairs from
          HA's entity registry. Add a zone here only to override or to
          rename one for display.
        </p>
        ${0===e.length?X`
              <div class="discovery-note">
                No manual zones — auto-discovery is in effect.
              </div>
            `:""}
        ${e.map((e,t)=>this._renderZoneCard(e,t))}
        <button class="add-zone" @click=${()=>this._addZone()}>
          + Add zone
        </button>
      </div>
    `}_renderZoneCard(e,t){return X`
      <div class="zone-card">
        <button
          class="remove"
          @click=${()=>this._removeZone(t)}
          title="Remove zone"
        >
          ×
        </button>
        <div class="field">
          <label>Name</label>
          <input
            type="text"
            .value=${e.name??""}
            placeholder="Display name (e.g. Pool)"
            @input=${e=>this._updateZone(t,"name",e.target.value)}
          />
        </div>
        <div class="field">
          <label>WiiM entity</label>
          ${this._renderEntityField(e.wiim,e=>this._updateZone(t,"wiim",e))}
        </div>
        <div class="field">
          <label>Music Assistant entity</label>
          ${this._renderEntityField(e.ma,e=>this._updateZone(t,"ma",e))}
        </div>
      </div>
    `}_renderEntityField(e,t){return customElements.get("ha-entity-picker")?X`
        <ha-entity-picker
          .hass=${this.hass}
          .value=${e??""}
          .includeDomains=${["media_player"]}
          allow-custom-entity
          @value-changed=${e=>t(e.detail.value)}
        ></ha-entity-picker>
      `:X`
      <input
        type="text"
        .value=${e??""}
        placeholder="media_player.…"
        @input=${e=>t(e.target.value)}
      />
    `}_renderDisplaySection(){const e=this._config;return X`
      <div class="section">
        <div class="section-title">Display</div>
        <div class="field">
          <label>Density</label>
          <select
            @change=${e=>this._set("density",e.target.value)}
          >
            <option value="compact" ?selected=${"compact"===e.density}>
              Compact
            </option>
            <option
              value="regular"
              ?selected=${!e.density||"regular"===e.density}
            >
              Regular
            </option>
            <option value="comfy" ?selected=${"comfy"===e.density}>
              Comfy
            </option>
          </select>
        </div>
        <div class="field">
          <label>Accent color</label>
          <div class="field-row">
            <input
              type="color"
              .value=${e.accent_color??"#e08a4a"}
              @input=${e=>this._set("accent_color",e.target.value)}
            />
            <input
              type="text"
              .value=${e.accent_color??"#e08a4a"}
              placeholder="#e08a4a"
              style="width: 110px"
              @input=${e=>this._set("accent_color",e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label>Theme</label>
          <select
            @change=${e=>this._set("theme",e.target.value)}
          >
            <option value="dark" ?selected=${!e.theme||"dark"===e.theme}>
              Dark
            </option>
            <option value="light" ?selected=${"light"===e.theme}>
              Light
            </option>
            <option value="auto" ?selected=${"auto"===e.theme}>
              Auto (follow OS preference)
            </option>
          </select>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            id="hf-debug-toggle"
            .checked=${!!e.debug}
            @change=${e=>this._set("debug",e.target.checked)}
          />
          <label for="hf-debug-toggle">Show diagnostic overlay</label>
        </div>
      </div>
    `}_set(e,t){this._config&&(this._config={...this._config,[e]:t},this._fireChange())}_addZone(){const e=[...this._config?.zones??[],{name:"",wiim:"",ma:""}];this._set("zones",e)}_updateZone(e,t,s){if(!this._config)return;const r=[...this._config.zones??[]],a=r[e];a&&(r[e]={...a,[t]:s},this._set("zones",r))}_removeZone(e){if(!this._config)return;const t=[...this._config.zones??[]];t.splice(e,1),this._set("zones",t)}_fireChange(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};$t.styles=l`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      color: var(--primary-text-color, #111);
    }
    .section {
      margin-bottom: 18px;
      padding: 14px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 10px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
      margin: 0 0 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }
    .field-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    label {
      font-size: 12px;
      font-weight: 600;
    }
    select,
    input[type='text'],
    input[type='color'] {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      color: inherit;
      font: inherit;
      font-size: 13px;
    }
    input[type='color'] {
      padding: 2px;
      width: 50px;
      height: 32px;
    }
    .zone-card {
      padding: 10px;
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 8px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }
    .zone-card .remove {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: 0;
      cursor: pointer;
      font-size: 18px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.55));
      padding: 4px 8px;
    }
    .add-zone {
      padding: 8px 14px;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border: 0;
      border-radius: 6px;
      font: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checkbox-row input {
      margin: 0;
    }
    .discovery-note {
      font-size: 11.5px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.55));
      line-height: 1.5;
    }
  `,e([ue({attribute:!1})],$t.prototype,"hass",void 0),e([fe()],$t.prototype,"_config",void 0),$t=e([ce("hf-card-editor")],$t);let wt=class extends i{willUpdate(e){e.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){return this.store&&0!==this.store.toasts.length?X`
      ${this.store.toasts.map(e=>X`
          <div class="toast" data-level=${e.level}>
            <span class="toast-icon">${this._iconFor(e.level)}</span>
            <div class="toast-message">${e.message}</div>
            <button
              class="toast-close"
              aria-label="Dismiss"
              @click=${()=>this.store.dismissToast(e.id)}
            >
              ${je.x({size:13})}
            </button>
          </div>
        `)}
    `:X``}_iconFor(e){return"error"===e?je.x({size:14,sw:2.4}):"warning"===e?je.filter({size:14}):je.note({size:14})}};wt.styles=l`
    :host {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 60px;
      z-index: 70;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0 14px;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.32);
      font-size: 12.5px;
      color: var(--hf-text);
      animation: hf-toast-in 0.18s ease-out;
    }
    .toast[data-level='error'] {
      border-color: #c44a40;
    }
    .toast[data-level='warning'] {
      border-color: #d4a04a;
    }
    .toast-icon {
      flex: none;
      display: inline-flex;
      color: var(--hf-text-dim);
      margin-top: 1px;
    }
    .toast[data-level='error'] .toast-icon {
      color: #e0413a;
    }
    .toast[data-level='warning'] .toast-icon {
      color: #d4a04a;
    }
    .toast-message {
      flex: 1;
      min-width: 0;
      word-break: break-word;
      line-height: 1.4;
    }
    .toast-close {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      color: var(--hf-text-dim);
      flex: none;
      display: inline-flex;
    }
    @keyframes hf-toast-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,e([ue({attribute:!1})],wt.prototype,"store",void 0),wt=e([ce("hf-toast-bar")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"homefront-music-card",name:"Homefront Music Card",description:"Music Assistant + WiiM multi-room controller",preview:!1});const kt=[{id:"player",label:"Player",icon:"play"},{id:"browser",label:"Browse",icon:"home"},{id:"search",label:"Search",icon:"search"},{id:"queue",label:"Queue",icon:"queue"},{id:"group",label:"Output",icon:"speaker"}];let St=class extends i{constructor(){super(),this._store=new Store,new StoreController(this,this._store)}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._store.setConfig(e),"panel"===e.layout?this.setAttribute("data-layout","panel"):this.removeAttribute("data-layout"),e.accent_color?(this.style.setProperty("--hf-accent",e.accent_color),this.style.setProperty("--hf-accent-text",function(e){const t=e.trim().replace(/^#/,"");if(3!==t.length&&6!==t.length)return"#fff";const s=3===t.length?t.split("").map(e=>e+e).join(""):t,r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);if([r,a,o].some(e=>Number.isNaN(e)))return"#fff";const n=(.2126*r+.7152*a+.0722*o)/255;return n>.55?"#111":"#fff"}(e.accent_color))):(this.style.removeProperty("--hf-accent"),this.style.removeProperty("--hf-accent-text"));const t=e.density??"regular";this.setAttribute("data-density",t);const s=e.theme??"dark";this.setAttribute("data-theme",s)}willUpdate(e){e.has("hass")&&this.hass&&(this._integrationStatus=function(e){const t=e.services??{},s=e.states??{},r=[],a=t.music_assistant??{},o=t.mass_queue??{},n=t.wiim??{},l=!!a.play_media;r.push({target:"MA",label:"service music_assistant.play_media",matched:l});const d=["get_queue_items","remove_queue_item","move_queue_item_up","play_queue_item","clear_queue_from_here"],c=d.find(e=>!!o[e]),h=!!c;r.push({target:"QueueActions",label:`mass_queue domain has any of ${d.join(", ")}`,matched:h});const p=Object.keys(o);p.length>0&&r.push({target:"QueueActions",label:`mass_queue domain services found: ${p.slice(0,6).join(", ")}${p.length>6?"…":""}`,matched:!0});const u=["play_preset","play_url","set_eq","get_queue"],f=u.find(e=>!!n[e]),m=!!f;r.push({target:"WiiM",label:`wiim domain has any of ${u.join(", ")}`,matched:m});const v=Object.keys(n);v.length>0&&r.push({target:"WiiM",label:`wiim domain services found: ${v.slice(0,6).join(", ")}${v.length>6?"…":""}`,matched:!0});const g=Object.values(s).some(e=>{if(!e.entity_id.startsWith("media_player."))return!1;const t=e.attributes.group_role;return"master"===t||"slave"===t||"solo"===t});r.push({target:"WiiM",label:"any media_player.* attribute group_role is master/slave/solo",matched:g});const b=m||g;return{hasMA:l,hasQueueActions:h,hasWiim:b,allPresent:l&&h&&b,diagnostics:r}}(this.hass),this._integrationStatus.allPresent&&this._store.setHass(this.hass))}getCardSize(){return 12}static getConfigElement(){return document.createElement("hf-card-editor")}static getStubConfig(){return{type:"custom:homefront-music-card"}}disconnectedCallback(){super.disconnectedCallback(),this._store.dispose()}render(){return this._integrationStatus&&!this._integrationStatus.allPresent?X`<hf-setup-help .status=${this._integrationStatus}></hf-setup-help>`:X`
      <div class="frame">
        ${this._renderTitle()}
        <hf-group-chip-rail .store=${this._store}></hf-group-chip-rail>
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
      <hf-group-sheet .store=${this._store}></hf-group-sheet>
      <hf-toast-bar .store=${this._store}></hf-toast-bar>
      ${this._config?.debug?this._renderDebugOverlay():""}
    `}_renderDebugOverlay(){const e=this._store.diagnosticNotes;return X`
      <div class="debug-overlay">
        <div class="debug-overlay-title">
          ${this._store.isHassMode?"HASS MODE":"MOCK MODE"} · zone discovery
        </div>
        ${e.length>0?e.map(e=>X`<div class="debug-overlay-line">${e}</div>`):X`<div class="debug-overlay-line">(no diagnostics yet)</div>`}
      </div>
    `}_renderTitle(){const e=this._config?.zones?.length??0,t=this._store.groups.filter(e=>e.playing).length,s=e>0?` · ${e} zone${1===e?"":"s"}`:" · mock";return X`
      <div class="title-row">
        <span class="title-icon">${je.note({size:14})}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">
          ${t} group${1===t?"":"s"} playing${s}
        </span>
      </div>
    `}_renderActiveTab(){switch(this._store.tab){case"player":return X`<hf-player-tab .store=${this._store}></hf-player-tab>`;case"browser":return X`<hf-browse-tab .store=${this._store}></hf-browse-tab>`;case"search":return X`<hf-search-tab .store=${this._store}></hf-search-tab>`;case"queue":return X`<hf-queue-tab .store=${this._store}></hf-queue-tab>`;case"group":return X`<hf-output-tab .store=${this._store}></hf-output-tab>`}}_renderTabBar(){return X`
      <div class="tab-bar" role="tablist">
        ${kt.map(e=>{const t=this._store.tab===e.id;return X`
            <button
              class="tab"
              role="tab"
              aria-selected=${t}
              @click=${()=>this._store.setTab(e.id)}
            >
              ${je[e.icon]({size:18})}
              <span class="tab-label">${e.label}</span>
            </button>
          `})}
      </div>
    `}};St.styles=[Qe,l`
      :host {
        display: block;
        position: relative;
        background: var(--hf-bg);
        color: var(--hf-text);
        border-radius: 16px;
        overflow: hidden;
        font-family: var(--hf-font);
        border: 1px solid var(--hf-border);
        /* Default (card) layout — phone-shaped artboard, body scrolls
           internally. Capped at 90vh so it always fits the viewport. */
        height: min(820px, 90vh);
      }
      /* Density variants — drive shared spacing tokens that selectors
         in this file (and others, if they consume the vars) read from.
         Defaults to 'regular' via the :host fallbacks below. */
      :host {
        --hf-density-title-pad-y: 10px;
        --hf-density-tab-pad-y: 8px;
        --hf-density-tab-label-fs: 10px;
      }
      :host([data-density='compact']) {
        --hf-density-title-pad-y: 6px;
        --hf-density-tab-pad-y: 5px;
        --hf-density-tab-label-fs: 9.5px;
      }
      :host([data-density='comfy']) {
        --hf-density-title-pad-y: 14px;
        --hf-density-tab-pad-y: 11px;
        --hf-density-tab-label-fs: 11px;
      }

      :host([data-layout='panel']) {
        /* Panel layout — pair with a Lovelace view in "Panel (1 card)".
           Size against the viewport directly rather than relying on
           height:100% propagating through HA's container chain, which
           breaks in some HA versions / themes. dvh adjusts for mobile
           browser chrome; --header-height is the HA app bar (fallback
           56px if the theme doesn't set it). */
        width: 100%;
        max-width: 100%;
        height: calc(100vh - var(--header-height, 56px));
        height: calc(100dvh - var(--header-height, 56px));
        max-height: calc(100dvh - var(--header-height, 56px));
        border-radius: 0;
        border: 0;
      }
      .frame {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }
      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: var(--hf-density-title-pad-y) 14px var(--hf-density-tab-pad-y);
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
        padding: var(--hf-density-tab-pad-y) 0 calc(var(--hf-density-tab-pad-y) - 2px);
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
        font-size: var(--hf-density-tab-label-fs);
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
    `],e([ue({attribute:!1})],St.prototype,"hass",void 0),e([fe()],St.prototype,"_config",void 0),e([fe()],St.prototype,"_integrationStatus",void 0),St=e([ce("homefront-music-card")],St);export{St as HomefrontMusicCard};
