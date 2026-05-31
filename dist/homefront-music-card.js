function t(t,e,s,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,r);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(n=(o<3?a(n):o>3?a(e,s,n):a(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(e,t))}return t}toString(){return this.cssText}};const n=t=>new o("string"==typeof t?t:t+"",void 0,r),l=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new o(s,t,r)},d=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return n(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,v=globalThis,g=v.trustedTypes,b=g?g.emptyScript:"",x=v.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let M=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);void 0!==r&&h(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);a?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...f(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(s)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=s.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(void 0!==r&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=s.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=r;const o=a.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,s,r=!1,a){if(void 0!==t){const o=this.constructor;if(!1===r&&(a=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??w)(a,e)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:a},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,s,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[y("elementProperties")]=new Map,M[y("finalized")]=new Map,x?.({ReactiveElement:M}),(v.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=t=>t,E=A.trustedTypes,P=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,B="?"+q,O=`<${B}>`,U=document,j=()=>U.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,Q="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,G=/>/g,V=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,K=/"/g,J=/^(?:script|style|textarea|title)$/i,X=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),it=new WeakMap,st=U.createTreeWalker(U,129);function rt(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const at=(t,e)=>{const s=t.length-1,r=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=F;for(let e=0;e<s;e++){const s=t[e];let l,d,c=-1,h=0;for(;h<s.length&&(n.lastIndex=h,d=n.exec(s),null!==d);)h=n.lastIndex,n===F?"!--"===d[1]?n=W:void 0!==d[1]?n=G:void 0!==d[2]?(J.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=V):void 0!==d[3]&&(n=V):n===V?">"===d[0]?(n=a??F,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=void 0===d[3]?V:'"'===d[3]?K:Y):n===K||n===Y?n=V:n===W||n===G?n=F:(n=V,a=void 0);const p=n===V&&t[e+1].startsWith("/>")?" ":"";o+=n===F?s+O:c>=0?(r.push(l),s.slice(0,c)+T+s.slice(c)+q+p):s+q+(-2===c?e:p)}return[rt(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class S{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let a=0,o=0;const n=t.length-1,l=this.parts,[d,c]=at(t,e);if(this.el=S.createElement(d,s),st.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=st.nextNode())&&l.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(T)){const e=c[o++],s=r.getAttribute(t).split(q),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:s,ctor:"."===n[1]?I:"?"===n[1]?L:"@"===n[1]?z:H}),r.removeAttribute(t)}else t.startsWith(q)&&(l.push({type:6,index:a}),r.removeAttribute(t));if(J.test(r.tagName)){const t=r.textContent.split(q),e=t.length-1;if(e>0){r.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],j()),st.nextNode(),l.push({type:2,index:++a});r.append(t[e],j())}}}else if(8===r.nodeType)if(r.data===B)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(q,t+1));)l.push({type:7,index:a}),t+=q.length-1}a++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function ot(t,e,s=t,r){if(e===tt)return e;let a=void 0!==r?s._$Co?.[r]:s._$Cl;const o=N(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,s,r)),void 0!==r?(s._$Co??=[])[r]=a:s._$Cl=a),void 0!==a&&(e=ot(t,a._$AS(t,e.values),a,r)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??U).importNode(e,!0);st.currentNode=r;let a=st.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new k(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new Z(a,this,t)),this._$AV.push(e),l=s[++n]}o!==l?.index&&(a=st.nextNode(),o++)}return st.currentNode=U,r}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ot(this,t,e),N(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(rt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new R(r,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=it.get(t.strings);return void 0===e&&it.set(t.strings,e=new S(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const a of t)r===e.length?e.push(s=new k(this.O(j()),this.O(j()),this,this.options)):s=e[r],s._$AI(a),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,a){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=et}_$AI(t,e=this,s,r){const a=this.strings;let o=!1;if(void 0===a)t=ot(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==tt,o&&(this._$AH=t);else{const r=t;let n,l;for(t=a[0],n=0;n<a.length-1;n++)l=ot(this,r[s+n],e,n),l===tt&&(l=this._$AH[n]),o||=!N(l)||l!==this._$AH[n],l===et?t=et:t!==et&&(t+=(l??"")+a[n+1]),this._$AH[n]=l}o&&!r&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class z extends H{constructor(t,e,s,r,a){super(t,e,s,r,a),this.type=5}_$AI(t,e=this){if((t=ot(this,t,e,0)??et)===tt)return;const s=this._$AH,r=t===et&&s!==et||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==et&&(s===et||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){ot(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(S,k),(A.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class i extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const r=s?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=s?.renderBefore??null;r._$litPart$=a=new k(e.insertBefore(j(),t),t,void 0,s??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}}i._$litElement$=!0,i.finalized=!0,lt.litElementHydrateSupport?.({LitElement:i});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:i}),(lt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:w},pt=(t=ht,e,s)=>{const{kind:r,metadata:a}=s;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===r){const{name:r}=s;return{set(s){const a=e.get.call(this);e.set.call(this,s),this.requestUpdate(r,a,t,!0,s)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=s;return function(s){const a=this[r];e.call(this,s),this.requestUpdate(r,a,t,!0,s)}}throw Error("Unsupported decorator location: "+r)};function ut(t){return(e,s)=>"object"==typeof s?pt(t,e,s):((t,e,s)=>{const r=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),r?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ft(t){return ut({...t,state:!0,attribute:!1})}const mt="#1d2026",vt="#23272f",gt="#ecedef",bt="rgba(236,237,239,0.55)",xt="rgba(255,255,255,0.07)",yt="rgba(255,255,255,0.16)",_t="rgba(255,255,255,0.05)",wt="#e08a4a",$t="#1b0f06",kt="rgba(255,255,255,0.12)",St="rgba(255,255,255,0.04)",zt="rgba(224,138,74,0.12)",Mt="14px",At="#f4f3f0",It="#ffffff",Ct="#fafaf7",Et="#1c1b18",Pt="rgba(28,27,24,0.55)",Tt="rgba(0,0,0,0.07)",Ht="rgba(0,0,0,0.16)",Lt="rgba(0,0,0,0.06)",qt="#c46a30",Rt="#fff7f0",Bt="rgba(0,0,0,0.10)",Ot="rgba(0,0,0,0.03)",Ut="rgba(196,106,48,0.10)",jt=l`
  :host,
  :host([data-theme='dark']) {
    --hf-bg: ${n("#16181d")};
    --hf-surface: ${n(mt)};
    --hf-surface-alt: ${n(vt)};
    --hf-text: ${n(gt)};
    --hf-text-dim: ${n(bt)};
    --hf-border: ${n(xt)};
    --hf-border-active: ${n(yt)};
    --hf-divider: ${n(_t)};
    --hf-accent: ${n(wt)};
    --hf-accent-text: ${n($t)};
    --hf-slider-track: ${n(kt)};
    --hf-input: ${n(St)};
    --hf-selected: ${n(zt)};
    --hf-radius: ${n(Mt)};
    --hf-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  :host([data-theme='light']) {
    --hf-bg: ${n(At)};
    --hf-surface: ${n(It)};
    --hf-surface-alt: ${n(Ct)};
    --hf-text: ${n(Et)};
    --hf-text-dim: ${n(Pt)};
    --hf-border: ${n(Tt)};
    --hf-border-active: ${n(Ht)};
    --hf-divider: ${n(Lt)};
    --hf-accent: ${n(qt)};
    --hf-accent-text: ${n(Rt)};
    --hf-slider-track: ${n(Bt)};
    --hf-input: ${n(Ot)};
    --hf-selected: ${n(Ut)};
  }
  @media (prefers-color-scheme: light) {
    :host([data-theme='auto']) {
      --hf-bg: ${n(At)};
      --hf-surface: ${n(It)};
      --hf-surface-alt: ${n(Ct)};
      --hf-text: ${n(Et)};
      --hf-text-dim: ${n(Pt)};
      --hf-border: ${n(Tt)};
      --hf-border-active: ${n(Ht)};
      --hf-divider: ${n(Lt)};
      --hf-accent: ${n(qt)};
      --hf-accent-text: ${n(Rt)};
      --hf-slider-track: ${n(Bt)};
      --hf-input: ${n(Ot)};
      --hf-selected: ${n(Ut)};
    }
  }
`;function Nt(t,e={}){return(s={})=>{const r=s.size??20,a=s.stroke??"currentColor",o=s.sw??e.sw??1.7;return X`<svg width=${r} height=${r} viewBox="0 0 24 24" fill="none" stroke=${a} stroke-width=${o} stroke-linecap="round" stroke-linejoin="round"><path d=${t} /></svg>`}}function Dt(t){return(e={})=>{const s=e.size??20,r=e.fill??"currentColor";return X`<svg width=${s} height=${s} viewBox="0 0 24 24" fill=${r} stroke="none"><path d=${t} /></svg>`}}const Qt={play:Dt("M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z"),pause:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>`},prev:Dt("M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z"),next:Dt("M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z"),shuffle:Nt("M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5"),rep:Nt("M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3"),rep1:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />
      <text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none">1</text>
    </svg>`},queue:Nt("M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2"),search:Nt("M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7"),home:Nt("M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z"),speaker:Nt("M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14"),group:Nt("M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4"),dot3:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>`},x:Nt("M6 6l12 12 M18 6L6 18"),chev:Nt("M9 6l6 6-6 6"),chevL:Nt("M15 6l-6 6 6 6"),chevD:Nt("M6 9l6 6 6-6"),plus:Nt("M12 5v14 M5 12h14"),check:Nt("M5 12l4 4 10-10"),drag:(t={})=>{const e=t.size??20,s=t.fill??"currentColor";return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill=${s} stroke="none">
      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
    </svg>`},trash:Nt("M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"),top:Nt("M12 19V7 M6 13l6-6 6 6 M5 4h14"),playNext:Nt("M5 5l10 7-10 7V5z M19 6v12",{sw:2}),radio:Nt("M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14"),list:Nt("M4 6h16 M4 12h16 M4 18h16"),album:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.6;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>`},artist:(t={})=>{const e=t.size??20,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>`},note:Nt("M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"),heart:Nt("M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z"),filter:Nt("M4 5h16l-6 8v6l-4-2v-4L4 5z"),sun:(t={})=>{const e=t.size??14,s=t.stroke??"currentColor",r=t.sw??1.7;return X`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke=${s} stroke-width=${r} stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>`},moon:Nt("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z")},Ft=[{id:"al1",name:"Mordechai",artist:"Khruangbin",h1:22,h2:350,year:2020},{id:"al2",name:"Salad Days",artist:"Mac DeMarco",h1:142,h2:80,year:2014},{id:"al3",name:"Awake",artist:"Tycho",h1:200,h2:280,year:2014},{id:"al4",name:"Migration",artist:"Bonobo",h1:32,h2:210,year:2017},{id:"al5",name:"Crush",artist:"Floating Points",h1:320,h2:18,year:2019},{id:"al6",name:"Pang",artist:"Caroline Polachek",h1:290,h2:340,year:2019},{id:"al7",name:"Mood Valiant",artist:"Hiatus Kaiyote",h1:12,h2:330,year:2021},{id:"al8",name:"In Colour",artist:"Jamie xx",h1:50,h2:200,year:2015},{id:"al9",name:"Spaces",artist:"Nils Frahm",h1:220,h2:240,year:2013},{id:"al10",name:"Untitled (Black Is)",artist:"SAULT",h1:0,h2:18,year:2020},{id:"al11",name:"French Kiwi Juice",artist:"FKJ",h1:175,h2:90,year:2017},{id:"al12",name:"Oncle Jazz",artist:"Men I Trust",h1:195,h2:250,year:2019},{id:"al13",name:"U.F.O.F.",artist:"Big Thief",h1:100,h2:175,year:2019},{id:"al14",name:"Bloom",artist:"Beach House",h1:280,h2:200,year:2012},{id:"al15",name:"Skiptracing",artist:"Mild High Club",h1:36,h2:5,year:2016},{id:"al16",name:"A Moment Apart",artist:"ODESZA",h1:245,h2:300,year:2017},{id:"al17",name:"Punisher",artist:"Phoebe Bridgers",h1:215,h2:245,year:2020},{id:"al18",name:"Vulture Prince",artist:"Arooj Aftab",h1:18,h2:28,year:2021}],Wt=["Pelota","White Gloves","A Walk","Cirrus","Birth","Welcome To My Island","Red Room","Loud Places","Says","Wildfires","Skyline","Tides","Lemon Twigs","Last Light","Mountain at My Gates","Slow Burn","Vega","Daydream","Mirror Maru","Late Night","Soft Universe","Ondas","Reverie","Long Way Home","Eclipse","Powder Blue","Dreamcaster","After Hours","Ember"].map((t,e)=>{const s=Ft[e%Ft.length];return{id:`tr${e+1}`,name:t,artist:s.artist,album:s.name,albumId:s.id,durationSec:120+47*e%240}}),Gt=[{id:"spotify",name:"Spotify",glyph:"S",brandHue:140,accounts:[{id:"sp-main",name:"tom@home",tier:"Premium",email:"tom@home.local"},{id:"sp-shared",name:"Family · shared",tier:"Family",email:"fam@home.local"}]},{id:"apple",name:"Apple Music",glyph:"",brandHue:0,accounts:[{id:"ap-tom",name:"tom@icloud",tier:"Individual",email:"tom@icloud.com"}]},{id:"soundcloud",name:"SoundCloud",glyph:"~",brandHue:25,accounts:[{id:"sc-tom",name:"@tom_listens",tier:"Go+",email:"tom@sc.local"}]}];function Vt(t){const e=Math.max(0,Math.floor(t)),s=e%60;return`${Math.floor(e/60)}:${s<10?`0${s}`:s}`}function Zt(t,e={}){const{angle:s=135,lift:r=0}=e;if(!t)return"linear-gradient(135deg,#444,#222)";return`linear-gradient(${s}deg, oklch(${56+r}% 0.18 ${t.h1??200}), oklch(${30+r}% 0.16 ${t.h2??280}))`}const Yt={albums:Ft,tracks:Wt,playlists:[{id:"pl1",name:"Deep Focus",owner:"Music Assistant",trackCount:86,h1:220,h2:280,mood:"instrumental·calm"},{id:"pl2",name:"Late-Night Drive",owner:"you",trackCount:42,h1:260,h2:340,mood:"atmospheric·downtempo"},{id:"pl3",name:"Sunday Cooking",owner:"you",trackCount:58,h1:30,h2:18,mood:"soul·jazz"},{id:"pl4",name:"Mellow Mornings",owner:"Editorial",trackCount:64,h1:50,h2:30,mood:"acoustic·warm"},{id:"pl5",name:"Workout",owner:"you",trackCount:38,h1:0,h2:340,mood:"high tempo·electronic"},{id:"pl6",name:"Liked Songs",owner:"you",trackCount:312,h1:130,h2:180,mood:"your favorites"},{id:"pl7",name:"Patio Sessions",owner:"you",trackCount:51,h1:180,h2:220,mood:"summer·chill"},{id:"pl8",name:"Discover Weekly",owner:"Editorial",trackCount:30,h1:290,h2:200,mood:"new finds"}],radioStations:[{id:"rd1",name:"KCRW · Eclectic 24",genre:"Eclectic",h1:12,h2:340},{id:"rd2",name:"NTS Radio 1",genre:"Underground",h1:30,h2:12},{id:"rd3",name:"BBC 6 Music",genre:"Alternative",h1:200,h2:250},{id:"rd4",name:"WWOZ New Orleans",genre:"Jazz · Blues",h1:38,h2:5},{id:"rd5",name:"Worldwide FM",genre:"Global",h1:165,h2:220}],providers:Gt,speakers:[{id:"sp1",name:"Living Room",room:"Living Room",model:"Sonos Era 300",volume:38},{id:"sp2",name:"Kitchen",room:"Kitchen",model:"Sonos One",volume:28},{id:"sp3",name:"Bedroom",room:"Bedroom",model:"HomePod mini",volume:18},{id:"sp4",name:"Office",room:"Office",model:"WiiM Pro + KEF",volume:45},{id:"sp5",name:"Patio",room:"Outside",model:"Sonos Move 2",volume:60},{id:"sp6",name:"Bathroom",room:"Bathroom",model:"HomePod mini",volume:22}],initialQueue:["tr1","tr5","tr12","tr18","tr9","tr3","tr22","tr7","tr15","tr27","tr2","tr11"],artistList:["Khruangbin","Mac DeMarco","Tycho","Bonobo","Floating Points","Caroline Polachek","Hiatus Kaiyote","Jamie xx","Nils Frahm","SAULT","FKJ","Men I Trust","Big Thief","Beach House","Mild High Club","ODESZA","Phoebe Bridgers","Vulfpeck","Yussef Dayes","Arooj Aftab"],fmtTime:Vt,albumById:function(t){return Ft.find(e=>e.id===t)},trackById:function(t){return Wt.find(e=>e.id===t)},providerById:function(t){return Gt.find(e=>e.id===t)},artGradient:Zt};function Kt(t){const e=t.states??{},s=[],r=[],a=Object.values(e).filter(t=>{if(!t.entity_id.startsWith("media_player."))return!1;const e=t.attributes.group_role;return"master"===e||"slave"===e||"solo"===e});r.push(`WiiM device entities (group_role present): ${a.length}`);for(const t of a){const a=t.entity_id.replace(/^media_player\./,""),o=a.replace(/_\d+$/,""),n=[];o!==a&&n.push(`media_player.${o}`),n.push(`media_player.${a}_2`),n.push(`media_player.${a}_ma`),n.push(`media_player.${a}_music_assistant`);let l=null,d=[];for(const s of n){if(s===t.entity_id)continue;const r=e[s];if(!r){d.push(`${s} (missing)`);continue}if(void 0===r.attributes.group_role){l=s,d.push(`${s} ✓`);break}d.push(`${s} (another WiiM)`)}if(!l){r.push(`  ${t.entity_id}: no MA partner. Tried: ${d.join(", ")}`);continue}const c=t.attributes.friendly_name??a;s.push({name:c,wiim:t.entity_id,ma:l}),r.push(`  ${c}: WiiM=${t.entity_id}, MA=${l}`)}return s.sort((t,e)=>t.name.localeCompare(e.name)),r.push(`final: ${s.length} zone(s) discovered`),{zones:s,notes:r}}const Jt="__hass__";function Xt(t,e){const s=t.states??{},r=[];for(const t of e){const e=s[t.wiim];if(!e){console.warn(`[homefront-music-card] zone "${t.name}": WiiM entity ${t.wiim} not found in hass.states`),r.push({id:t.wiim,name:`${t.name} (entity missing)`,room:t.name,model:"unavailable",volume:0,leadId:t.wiim});continue}const a=e.attributes,o=a.group_role,n=a.group_members??[];let l=t.wiim;if("slave"===o){const t=n.find(t=>{const e=s[t];return"master"===e?.attributes?.group_role});t&&(l=t)}const d="number"==typeof a.volume_level?a.volume_level:0;r.push({id:t.wiim,name:t.name,room:t.name,model:a.device_model??"WiiM",volume:Math.round(100*d),leadId:l})}return r}function te(t,e,s){const r=t.states??{},a={},o=new Set(s.map(t=>t.leadId));for(const t of o){const o=e.find(e=>e.wiim===t);if(!o)continue;const n=r[o.ma];if(!n)continue;const l=n.attributes,d=s.filter(e=>e.leadId===t),c=0===d.length?0:Math.round(d.reduce((t,e)=>t+e.volume,0)/d.length),h=l.repeat??"off";a[t]={queue:[Jt],currentIdx:0,position:"number"==typeof l.media_position?l.media_position:0,playing:"playing"===n.state,shuffle:!!l.shuffle,repeat:h,groupVolume:c}}return a}function ee(t){return!!t&&("undefined"==typeof location||("https:"!==location.protocol||!t.startsWith("http:")))}const ie=new Set;function se(t,e,s){return{queue:t.slice(),currentIdx:0,position:e,playing:!0,shuffle:!1,repeat:"off",groupVolume:s}}function re(t){return Math.max(0,Math.min(1,t))}class Store extends EventTarget{constructor(){super(),this.tab="player",this.browser={crumbs:[{kind:"root",label:"Sources"}],providerId:null,accountId:null,sub:"playlists",detailId:null},this.search={query:"",filter:"all"},this.selectedTracks=new Set,this.multiMode=!1,this.groupingSheet={open:!1,leadId:null},this._tickInterval=null,this.toasts=[],this._toastTtlMs=4500,this._zones=[],this._hasExplicitZones=!1,this._isHassMode=!1,this.diagnosticNotes=[],this._registryAttempted=!1,this.hassBrowseStack=[],this.hassBrowseLoading=!1,this.hassBrowseError=null,this._browseCache=new Map,this.hassQueue=[],this.hassQueueLoading=!1,this.hassQueueError=null,this._hassQueueLeadId=null,this._maConfigEntryId=null,this.hassSearchResults=null,this.hassSearchLoading=!1,this.hassSearchError=null,this._lastWatchSig="",this._toastDedupeWindowMs=5e3,this._recentToasts=new Map,this._volumeDebounce=new Map,this.speakers=Yt.speakers.map(t=>({...t,leadId:t.id}));const t=this.speakers.find(t=>"sp2"===t.id);t&&(t.leadId="sp1"),this.players={sp1:{...se(Yt.initialQueue,48,38),playing:!0},sp5:{...se(["tr3","tr18","tr7","tr12","tr22"],14,60),playing:!0,shuffle:!0}},this.activeLeadId="sp1",this._loadPersistedState(),this._startTick()}_loadPersistedState(){try{const t=window.localStorage?.getItem(Store._STORAGE_KEY);if(!t)return;const e=JSON.parse(t);e.tab&&(this.tab=e.tab),e.activeLeadId&&(this.activeLeadId=e.activeLeadId)}catch{}}_persistUiState(){try{window.localStorage?.setItem(Store._STORAGE_KEY,JSON.stringify({activeLeadId:this.activeLeadId,tab:this.tab}))}catch{}}get groups(){var t;const e=this._groupsCache;if(e&&e.speakers===this.speakers&&e.players===this.players&&e.activeLeadId===this.activeLeadId)return e.result;const s={};for(const e of this.speakers)(s[t=e.leadId]??(s[t]=[])).push(e);const r=Object.keys(s).map(t=>{const e=s[t],r=e.find(e=>e.id===t)??e[0],a=this.players[t],o=1===e.length?r.name:e.map(t=>t.name).join(" + ");return{leadId:t,lead:r,members:e,name:o,player:a,playing:!!a?.playing,isActive:t===this.activeLeadId,isIdle:!a}}).sort((t,e)=>t.isActive!==e.isActive?t.isActive?-1:1:t.isIdle!==e.isIdle?t.isIdle?1:-1:t.lead.name.localeCompare(e.lead.name));return this._groupsCache={speakers:this.speakers,players:this.players,activeLeadId:this.activeLeadId,result:r},r}get activePlayer(){const t=this.players[this.activeLeadId];return t||(this._isHassMode?se([Jt],0,0):se(Yt.initialQueue,0,30))}get activeGroup(){return this.groups.find(t=>t.leadId===this.activeLeadId)}get currentTrack(){if(this._isHassMode&&this._hass){const t=this._zones.find(t=>t.wiim===this.activeLeadId);if(t){const e=function(t,e){const s=t.states?.[e];if(!s)return null;const r=s.attributes,a=r.media_title??"";return a?{id:Jt,name:a,artist:r.media_artist??"",album:r.media_album_name??"",albumId:Jt,durationSec:"number"==typeof r.media_duration?r.media_duration:0}:null}(this._hass,t.ma);if(e)return e}return{id:Jt,name:"Nothing playing",artist:"",album:"",albumId:Jt,durationSec:0}}const t=this.activePlayer,e=t.queue[t.currentIdx];return(e?Yt.trackById(e):void 0)??Yt.tracks[0]}get currentAlbum(){if(this._isHassMode&&this._hass){const t=this._zones.find(t=>t.wiim===this.activeLeadId);if(t){const e=function(t,e){const s=t.states?.[e];if(!s)return null;const r=s.attributes,a={entity_picture:r.entity_picture,entity_picture_local:r.entity_picture_local,media_image_url:r.media_image_url};(!ie.has(e)||ie.size<5)&&(ie.add(e),console.debug(`[homefront-music-card] image attrs for ${e}:`,a,"title=",r.media_title));const o=[a.entity_picture,a.entity_picture_local,a.media_image_url].find(ee)??void 0,n=r.media_album_name??"";return{id:Jt,name:n,artist:r.media_artist??"",h1:220,h2:280,year:0,imageUrl:o}}(this._hass,t.ma);if(e)return e}return{id:Jt,name:"",artist:"",h1:220,h2:280,year:0}}const t=Yt.albumById(this.currentTrack.albumId);if(!t)throw new Error(`Missing album for track ${this.currentTrack.id}`);return t}setHass(t){const e=this._hass;if(this._hass=t,this._isHassMode&&e){const e=this._computeWatchSignature(t);if(e===this._lastWatchSig)return;this._lastWatchSig=e}this._deriveFromHass(),this._lastWatchSig=this._computeWatchSignature(t),this._emit(),this._hasExplicitZones||this._registryAttempted||(this._registryAttempted=!0,this._reconcileFromRegistry())}_computeWatchSignature(t){const e=t.states??{},s=[];if(this._hasExplicitZones&&this._zones.length>0)for(const t of this._zones){const r=e[t.wiim],a=e[t.ma];r&&s.push(`${t.wiim}@${r.last_updated}`),a&&s.push(`${t.ma}@${a.last_updated}`)}else for(const t of Object.keys(e))t.startsWith("media_player.")&&s.push(`${t}@${e[t].last_updated}`);return s.join("|")}async _reconcileFromRegistry(){if(!this._hass||this._hasExplicitZones)return;const t=await async function(t){const e=t.states??{},s=[],r=[];let a;try{a=await t.callWS({type:"config/entity_registry/list"})}catch(t){return r.push(`registry call failed: ${String(t)}`),{zones:s,notes:r}}const o=a.filter(t=>t.entity_id.startsWith("media_player.")&&("wiim"===t.platform||"music_assistant"===t.platform));r.push(`registry: ${o.length} media_player entities from wiim/MA`);const n=new Map;for(const t of o){if(!t.device_id){r.push(`  ${t.entity_id} (${t.platform}): no device_id`);continue}const e=n.get(t.device_id)??[];e.push(t),n.set(t.device_id,e)}let l;for(const[t,a]of n){const o=a.find(t=>"wiim"===t.platform&&!t.entity_id.endsWith("_group_master"))??a.find(t=>"wiim"===t.platform),n=a.find(t=>"music_assistant"===t.platform);if(!o||!n){const e=[o?"":"WiiM",n?"":"MA"].filter(Boolean).join(" + ");r.push(`  device ${t.slice(0,8)}…: incomplete (missing ${e})`);continue}!l&&n.config_entry_id&&(l=n.config_entry_id);const d=e[o.entity_id],c=d?.attributes.friendly_name??o.entity_id;s.push({name:c,wiim:o.entity_id,ma:n.entity_id}),r.push(`  ${c}: WiiM=${o.entity_id} MA=${n.entity_id} (device ${t.slice(0,8)}…)`)}return s.sort((t,e)=>t.name.localeCompare(e.name)),r.push(`final: ${s.length} zone(s) via entity registry`),l&&r.push("MA config_entry_id captured"),{zones:s,notes:r,maConfigEntryId:l}}(this._hass);if(0===t.zones.length)return this.diagnosticNotes=[...this.diagnosticNotes,"— registry attempt —",...t.notes],void this._emit();if(this._zones=t.zones,t.maConfigEntryId&&(this._maConfigEntryId=t.maConfigEntryId),this.diagnosticNotes=["Discovery: entity registry",...t.notes],this._isHassMode||(this._isHassMode=!0,this._stopTick()),!this._hass)return;const e=Xt(this._hass,this._zones);if(this.speakers=e,this.players=te(this._hass,this._zones,e),!e.find(t=>t.id===this.activeLeadId)){const t=e.find(t=>t.id===t.leadId)??e[0];t&&(this.activeLeadId=t.id)}this._emit()}setConfig(t){t.zones&&t.zones.length>0?(this._zones=t.zones,this._hasExplicitZones=!0):(this._zones=[],this._hasExplicitZones=!1),this._hass&&(this._deriveFromHass(),this._emit())}_deriveFromHass(){if(!this._hass)return;let t,e=!1;if(this._hasExplicitZones)t=this._zones;else if(this._zones.length>0&&this._isHassMode){const s=Kt(this._hass),r=new Set(this._zones.map(t=>t.wiim)),a=s.zones.length!==this._zones.length||s.zones.some(t=>!r.has(t.wiim));a?(t=s.zones,this.diagnosticNotes=["Zone set changed — sync rediscovery",...s.notes],e=!0,this._registryAttempted=!1):t=this._zones}else{const e=Kt(this._hass);t=e.zones,this.diagnosticNotes=e.notes,console.debug("[homefront-music-card] zone discovery:\n"+e.notes.join("\n"))}if(0===t.length&&!this._hasExplicitZones)return void console.warn("[homefront-music-card] No zones discovered — staying in mock mode. See store.diagnosticNotes for details.");this._isHassMode||(this._isHassMode=!0,this._stopTick()),this._zones=t;const s=Xt(this._hass,t);if(this.speakers=s,this.players=te(this._hass,t,s),!s.find(t=>t.id===this.activeLeadId)){const t=s.find(t=>t.id===t.leadId)??s[0];t&&(this.activeLeadId=t.id)}const r=[];for(const e of t){const t=this._hass.states?.[e.ma];if(!t){r.push(`${e.name}: MA entity ${e.ma} not found in hass.states`);continue}const s=t.attributes;r.push(`${e.name}: MA=${e.ma} state=${t.state} title=${JSON.stringify(s.media_title??null)} artist=${JSON.stringify(s.media_artist??null)} pos=${s.media_position??"-"} shuffle=${s.shuffle??"-"}`)}this.diagnosticNotes=[...this.diagnosticNotes,"— per-zone MA state —",...r],e&&this._reconcileFromRegistry()}get isHassMode(){return this._isHassMode}_stopTick(){null!==this._tickInterval&&(window.clearInterval(this._tickInterval),this._tickInterval=null)}_emit(){this.dispatchEvent(new Event("change"))}showToast(t,e="info"){const s=`${e}:${t}`,r=Date.now(),a=this._recentToasts.get(s);if(void 0!==a&&r-a<this._toastDedupeWindowMs)return void this._recentToasts.set(s,r);this._recentToasts.set(s,r);const o=`t${r}-${Math.random().toString(36).slice(2,8)}`;this.toasts=[...this.toasts,{id:o,level:e,message:t}],this._emit(),window.setTimeout(()=>this.dismissToast(o),this._toastTtlMs)}dismissToast(t){const e=this.toasts.length;this.toasts=this.toasts.filter(e=>e.id!==t),this.toasts.length!==e&&this._emit()}_callService(t,e,s={},r={}){this._isHassMode&&this._hass&&this._hass.callService(t,e,s,r).catch(s=>{console.warn(`[homefront-music-card] ${t}.${e} failed:`,s);const r=s?.message??String(s);this.showToast(`${t}.${e} failed: ${r}`,"error")})}_maFor(t){return this._zones.find(e=>e.wiim===t)?.ma}async _callServiceWithResponse(t,e,s={},r={}){if(!this._isHassMode||!this._hass)return;const a=Object.keys(s).length>0,o=Object.keys(r).length>0,n={type:"call_service",domain:t,service:e,return_response:!0};a&&(n.service_data=s),o&&(n.target=r);try{const t=await this._hass.callWS(n);return t?.response}catch(n){const l=n?.message??String(n);if(l.includes("extra keys not allowed")&&o)try{const o=await this._hass.callWS({type:"execute_script",sequence:[{service:`${t}.${e}`,target:r,...a?{data:s}:{}}],return_response:!0});return o?.response}catch(s){console.warn(`[homefront-music-card] ${t}.${e} (execute_script fallback) failed:`,s);const r=s?.message??String(s);return void this.showToast(`${t}.${e} failed: ${r}`,"error")}return console.warn(`[homefront-music-card] ${t}.${e} (with response) failed:`,n),void this.showToast(`${t}.${e} failed: ${l}`,"error")}}async browseRoot(){if(!this._isHassMode||!this._hass)return;let t=this._maFor(this.activeLeadId);if(!t||!this._hass.states?.[t]){const e=this._zones.find(t=>this._hass?.states?.[t.ma]);t=e?.ma}if(!t)return this.hassBrowseError='No Music Assistant entity available to browse. Check zone mapping (the "ma" entity must be a music_assistant media_player).',void this._emit();this.hassBrowseLoading=!0,this.hassBrowseError=null,this._emit();try{const e=await this._hass.callWS({type:"media_player/browse_media",entity_id:t});console.debug("[homefront-music-card] browse root response:",JSON.parse(JSON.stringify(e)));const s=new Set(["library","music library","my music"]),r=e.children?.filter(t=>!s.has(t.title.toLowerCase())&&"app"!==t.media_class),a={...e,children:r};this._browseCache.clear(),this._browseCache.set(e.media_content_id||"__root__",a),this.hassBrowseStack=[a]}catch(e){const s=e?.message??String(e);this.hassBrowseError=`Browse failed for ${t}: ${s}`,console.warn(`[homefront-music-card] browse_media root failed for ${t}:`,s,e)}finally{this.hassBrowseLoading=!1,this._emit()}}async browseInto(t){if(!this._isHassMode||!this._hass)return;const e=this._maFor(this.activeLeadId);if(!e)return;const s=this._browseCache.get(t.media_content_id);if(s&&s.children)return this.hassBrowseStack=[...this.hassBrowseStack,s],void this._emit();this.hassBrowseLoading=!0,this.hassBrowseError=null,this._emit();try{const s=await this._hass.callWS({type:"media_player/browse_media",entity_id:e,media_content_type:t.media_content_type,media_content_id:t.media_content_id});this._browseCache.set(t.media_content_id,s),this.hassBrowseStack=[...this.hassBrowseStack,s]}catch(t){this.hassBrowseError=String(t),console.warn("[homefront-music-card] browse_media drill failed:",t)}finally{this.hassBrowseLoading=!1,this._emit()}}browsePop(t){this.hassBrowseStack=this.hassBrowseStack.slice(0,t+1),this._emit()}playBrowseNode(t,e="replace"){if(!this._isHassMode)return;const s=this._maFor(this.activeLeadId);s&&this._callService("music_assistant","play_media",{media_id:t.media_content_id,media_type:t.media_content_type,enqueue:e,radio_mode:!1},{entity_id:s})}async loadQueue(){if(!this._isHassMode)return;const t=this._maFor(this.activeLeadId);if(!t)return;this.hassQueueLoading=!0,this.hassQueueError=null,this._emit();const e=await this._callServiceWithResponse("mass_queue","get_queue_items",{},{entity_id:t});let s=[];if(Array.isArray(e))s=e;else if(e&&Array.isArray(e.queue_items))s=e.queue_items;else if(e&&"object"==typeof e)for(const t of Object.values(e))if(Array.isArray(t)){s=t;break}this.hassQueue=s,this._hassQueueLeadId=this.activeLeadId,this.hassQueueLoading=!1,this._emit()}get hassQueueIsFresh(){return this._hassQueueLeadId===this.activeLeadId}async _fetchMaConfigEntryId(){if(this._maConfigEntryId)return this._maConfigEntryId;if(!this._hass)return null;try{const t=await this._hass.callWS({type:"config_entries/get"}),e=t?.find(t=>"music_assistant"===t.domain);if(e)return this._maConfigEntryId=e.entry_id,console.debug("[homefront-music-card] MA config_entry_id captured via config_entries/get:",e.entry_id,e.title),e.entry_id;console.warn("[homefront-music-card] config_entries/get returned no music_assistant entry. Entries:",t?.map(t=>t.domain))}catch(t){console.warn("[homefront-music-card] config_entries/get failed:",t)}return null}playQueueItem(t){const e=this._maFor(this.activeLeadId);e&&(this._callService("mass_queue","play_queue_item",{queue_item_id:t},{entity_id:e}),window.setTimeout(()=>{this.loadQueue()},400))}removeQueueItem(t){const e=this._maFor(this.activeLeadId);e&&(this._callService("mass_queue","remove_queue_item",{queue_item_id:t},{entity_id:e}),this.hassQueue=this.hassQueue.filter(e=>e.queue_item_id!==t),this._emit(),window.setTimeout(()=>{this.loadQueue()},400))}removeQueueItems(t){const e=this._maFor(this.activeLeadId);if(e){for(const s of t)this._callService("mass_queue","remove_queue_item",{queue_item_id:s},{entity_id:e});this.hassQueue=this.hassQueue.filter(e=>!t.has(e.queue_item_id)),this.selectedTracks=new Set,this.multiMode=!1,this._emit(),window.setTimeout(()=>{this.loadQueue()},600)}}clearQueueFromHere(){const t=this._maFor(this.activeLeadId);t&&(this._callService("mass_queue","clear_queue_from_here",{},{entity_id:t}),window.setTimeout(()=>{this.loadQueue()},400))}moveQueueItemToTop(t){const e=this._maFor(this.activeLeadId);e&&(this._callService("mass_queue","move_queue_item_next",{queue_item_id:t},{entity_id:e}),window.setTimeout(()=>{this.loadQueue()},400))}async searchMa(t,e=[],s=25){if(!this._isHassMode||!this._hass)return;const r=t.trim();if(!r)return this.hassSearchResults=null,this.hassSearchError=null,void this._emit();if(!this._maConfigEntryId){if(!await this._fetchMaConfigEntryId())return this.hassSearchError="Could not find Music Assistant config entry. Is the integration loaded?",void this._emit()}this.hassSearchLoading=!0,this.hassSearchError=null,this._emit();const a={config_entry_id:this._maConfigEntryId,name:r,limit:s};e.length>0&&(a.media_type=e);const o=await this._callServiceWithResponse("music_assistant","search",a,{});console.debug("[homefront-music-card] search response:",o),this.hassSearchResults=this._normalizeSearchResponse(o,r),this.hassSearchLoading=!1,this._emit()}_normalizeSearchResponse(t,e){if(!t||"object"!=typeof t)return{tracks:[],albums:[],artists:[],playlists:[],radio:[],query:e};const s=t,r=(...t)=>{for(const e of t){const t=s[e];if(Array.isArray(t))return t}return[]};return{tracks:r("tracks","track"),albums:r("albums","album"),artists:r("artists","artist"),playlists:r("playlists","playlist"),radio:r("radio","stations"),query:e}}playSearchResult(t,e="replace"){const s=this._maFor(this.activeLeadId);if(!s)return;const r=t.uri??t.media_content_id;r?this._callService("music_assistant","play_media",{media_id:r,media_type:t.media_content_type,enqueue:e,radio_mode:!1},{entity_id:s}):console.warn("[homefront-music-card] search item has no uri/media_content_id:",t)}setTab(t){this.tab!==t&&(this.tab=t,this._persistUiState(),this._emit())}setActiveLead(t){this.players[t]||(this.players[t]=se(Yt.initialQueue,0,30)),this.activeLeadId=t,this._persistUiState(),this._emit()}_patchActive(t){const e=this.players[this.activeLeadId]??se(Yt.initialQueue,0,30);this.players[this.activeLeadId]={...e,...t},this._emit()}setPlaying(t){this._patchActive({playing:t});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player",t?"media_play":"media_pause",{},{entity_id:e})}togglePlaying(){this.setPlaying(!this.activePlayer.playing)}setShuffle(t){this._patchActive({shuffle:t});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","shuffle_set",{shuffle:t},{entity_id:e})}toggleShuffle(){this.setShuffle(!this.activePlayer.shuffle)}setRepeat(t){this._patchActive({repeat:t});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","repeat_set",{repeat:t},{entity_id:e})}cycleRepeat(){const t=this.activePlayer.repeat,e="off"===t?"all":"all"===t?"one":"off";this.setRepeat(e)}setPosition(t){this._patchActive({position:t});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","media_seek",{seek_position:t},{entity_id:e})}next(){const t=this.activePlayer;this._patchActive({currentIdx:Math.min(t.queue.length-1,t.currentIdx+1),position:0});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","media_next_track",{},{entity_id:e})}prev(){const t=this.activePlayer;if(t.position>3){this._patchActive({position:0});const t=this._maFor(this.activeLeadId);t&&this._callService("media_player","media_seek",{seek_position:0},{entity_id:t})}else{this._patchActive({currentIdx:Math.max(0,t.currentIdx-1),position:0});const e=this._maFor(this.activeLeadId);e&&this._callService("media_player","media_previous_track",{},{entity_id:e})}}_dispatchVolume(t,e){if(!this._isHassMode)return;const s=this._volumeDebounce.get(t);void 0!==s&&window.clearTimeout(s);const r=window.setTimeout(()=>{this._volumeDebounce.delete(t),this._callService("media_player","volume_set",{volume_level:re(e/100)},{entity_id:t})},120);this._volumeDebounce.set(t,r)}setSpeakerVol(t,e){this.speakers=this.speakers.map(s=>s.id===t?{...s,volume:e}:s),this._emit(),this._dispatchVolume(t,e)}setGroupVolumeFor(t,e){const s=[];this.speakers=this.speakers.map(r=>r.leadId===t?(s.push(r.id),{...r,volume:e}):r);const r=this.players[t];if(r&&(this.players={...this.players,[t]:{...r,groupVolume:e}}),this._emit(),this._isHassMode)for(const t of s)this._dispatchVolume(t,e)}setGroupVolume(t){this.setGroupVolumeFor(this.activeLeadId,t)}ungroupSpeaker(t){const e=this.speakers.find(e=>e.id===t);e&&(e.leadId=t,this._emit(),this._isHassMode&&this._callService("media_player","unjoin",{},{entity_id:t}))}toggleGroupPlay(t){const e=this.players[t];if(!e)return;const s=!e.playing;this.players[t]={...e,playing:s},this._emit();const r=this._maFor(t);r&&this._callService("media_player",s?"media_play":"media_pause",{},{entity_id:r})}startSoloPlayback(t){if(this._isHassMode){this.activeLeadId=t;const e=this._maFor(t);return e&&this._callService("media_player","media_play",{},{entity_id:e}),void this._emit()}this.players[t]=se(Yt.initialQueue,0,30),this.activeLeadId=t,this._emit()}openGroupingSheet(t){this.groupingSheet={open:!0,leadId:t},this._emit()}closeGroupingSheet(){this.groupingSheet={...this.groupingSheet,open:!1},this._emit()}commitGroupMembers(t,e){const s=new Set(e),r=s.has(t)?t:e[0]??null,a=this.speakers.filter(e=>e.leadId===t).map(t=>t.id),o=a.filter(t=>!s.has(t)),n=e.filter(t=>!a.includes(t)&&t!==r);if(this.speakers=this.speakers.map(e=>{const a=e.leadId===t;return s.has(e.id)?{...e,leadId:r??e.id}:a?{...e,leadId:e.id}:e}),r){if(r!==t){const e=this.players[t]??se(Yt.initialQueue,0,30);this.players[r]=e,delete this.players[t]}}else delete this.players[t];for(const t of e)t!==r&&delete this.players[t];if(this.activeLeadId===t)if(r)this.activeLeadId=r;else{const t=this.speakers.find(t=>t.leadId===t.id);t&&(this.activeLeadId=t.id)}if(this.groupingSheet={...this.groupingSheet,open:!1},this._emit(),this._isHassMode){for(const t of o)this._callService("media_player","unjoin",{},{entity_id:t});r&&n.length>0&&this._callService("media_player","join",{group_members:n},{entity_id:r})}}setQueue(t){this._patchActive({queue:t})}removeFromQueue(t){const e=this.activePlayer,s=e.queue.slice();s.splice(t,1);const r=t<e.currentIdx?e.currentIdx-1:e.currentIdx;this._patchActive({queue:s,currentIdx:r})}moveQueue(t,e){if(t===e)return;const s=this.activePlayer,r=s.queue.slice(),[a]=r.splice(t,1);if(void 0===a)return;r.splice(e,0,a);let o=s.currentIdx;t===o?o=e:t<o&&e>=o?o-=1:t>o&&e<=o&&(o+=1),this._patchActive({queue:r,currentIdx:o})}playTrackAt(t){this._patchActive({currentIdx:t,position:0,playing:!0})}moveToTop(t){this.moveQueue(t,this.activePlayer.currentIdx+1)}clearQueue(){const t=this.activePlayer;this._patchActive({queue:t.queue.slice(0,t.currentIdx+1)})}removeBulk(t){const e=this.activePlayer,s=e.queue.filter((e,s)=>!t.has(s));this.players[this.activeLeadId]={...e,queue:s},this.selectedTracks=new Set,this.multiMode=!1,this._emit()}browserGo(t){this.browser={...this.browser,...t},this._emit()}pushCrumb(t,e={}){this.browser={...this.browser,...e,crumbs:[...this.browser.crumbs,t]},this._emit()}popToCrumb(t){const e=this.browser.crumbs.slice(0,t+1),s=e[e.length-1];let r={...this.browser,crumbs:e};"root"===s?.kind?r={...r,providerId:null,accountId:null,detailId:null}:"provider"===s?.kind?r={...r,accountId:null,detailId:null}:"account"===s?.kind&&(r={...r,detailId:null}),this.browser=r,this._emit()}setSearch(t){this.search={...this.search,...t},this._emit()}setSelectedTracks(t){this.selectedTracks=t,this._emit()}setMultiMode(t){this.multiMode=t,t||(this.selectedTracks=new Set),this._emit()}_startTick(){this._tickInterval=window.setInterval(()=>this._tick(),1e3)}_tick(){let t=!1;for(const e of Object.keys(this.players)){const s=this.players[e];if(!s.playing)continue;const r=s.queue[s.currentIdx];if(!r)continue;const a=Yt.trackById(r);a&&(s.position+1>=a.durationSec?this.players[e]={...s,position:0,currentIdx:Math.min(s.queue.length-1,s.currentIdx+1)}:this.players[e]={...s,position:s.position+1},t=!0)}t&&this._emit()}dispose(){this._stopTick()}}Store._STORAGE_KEY="homefront-music-card.ui-state";class StoreController{constructor(t,e){this.host=t,this.store=e,this._onChange=()=>{this.host.requestUpdate()},t.addController(this)}hostConnected(){this.store.addEventListener("change",this._onChange)}hostDisconnected(){this.store.removeEventListener("change",this._onChange)}}let ae=class extends i{constructor(){super(...arguments),this.size=48,this.radius=8,this.boxShadow=""}render(){const t="number"==typeof this.size?this.size:/^\d+(\.\d+)?$/.test(this.size)?Number(this.size):null,e=null!==t?`${t}px`:this.size,s=null!==t?.34*t:16,r=Zt(this.obj),a=`width:${e};height:${e};border-radius:${this.radius}px;background:${r};${this.boxShadow?`box-shadow:${this.boxShadow}`:""}`;return X`
      <div class="art" style=${a}>
        ${this.imageUrl?X`<img src=${this.imageUrl} alt="" loading="lazy" />`:""}
        ${this.glyph?X`<div class="glyph" style="font-size:${s}px">${this.glyph}</div>`:""}
        <div class="scan"></div>
      </div>
    `}};ae.styles=l`
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
  `,t([ut({attribute:!1})],ae.prototype,"obj",void 0),t([ut()],ae.prototype,"size",void 0),t([ut({type:Number})],ae.prototype,"radius",void 0),t([ut({attribute:!1})],ae.prototype,"glyph",void 0),t([ut()],ae.prototype,"boxShadow",void 0),t([ut({attribute:"image-url"})],ae.prototype,"imageUrl",void 0),ae=t([ct("hf-album-art")],ae);let oe=class extends i{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.color="#fff",this.track="rgba(255,255,255,0.18)",this.trackHeight=4,this.thumb=14,this.ariaLabel="",this._dragging=!1,this._dragValue=0,this._onInput=t=>{const e=Number(t.target.value);this._dragValue=e,this.value=e,this.dispatchEvent(new CustomEvent("hf-input",{detail:e,bubbles:!0,composed:!0}))},this._onPointerDown=t=>{this._dragging=!0,this._dragValue=Number(t.target.value)},this._onPointerUp=t=>{if(!this._dragging)return;this._dragging=!1;const e=Number(t.target.value);this.dispatchEvent(new CustomEvent("hf-change",{detail:e,bubbles:!0,composed:!0}))}}render(){const t=this._dragging?this._dragValue:this.value,e=(t-this.min)/(this.max-this.min)*100;return this.style.setProperty("--hf-pct",`${e}%`),this.style.setProperty("--hf-color",this.color),this.style.setProperty("--hf-track",this.track),this.style.setProperty("--hf-track-h",`${this.trackHeight}px`),this.style.setProperty("--hf-thumb",`${this.thumb}px`),X`<input
      type="range"
      min=${this.min}
      max=${this.max}
      .value=${String(t)}
      aria-label=${this.ariaLabel||"Slider"}
      @input=${this._onInput}
      @pointerdown=${this._onPointerDown}
      @pointerup=${this._onPointerUp}
      @pointercancel=${this._onPointerUp}
    />`}};oe.styles=l`
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
  `,t([ut({type:Number})],oe.prototype,"value",void 0),t([ut({type:Number})],oe.prototype,"min",void 0),t([ut({type:Number})],oe.prototype,"max",void 0),t([ut()],oe.prototype,"color",void 0),t([ut()],oe.prototype,"track",void 0),t([ut({type:Number,attribute:"track-height"})],oe.prototype,"trackHeight",void 0),t([ut({type:Number})],oe.prototype,"thumb",void 0),t([ut({attribute:"aria-label"})],oe.prototype,"ariaLabel",void 0),t([ft()],oe.prototype,"_dragging",void 0),oe=t([ct("hf-slider")],oe);let ne=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const t=this.store,e=t.currentTrack,s=t.currentAlbum,r=t.activePlayer,a=t.activeGroup,o=t.groups.filter(t=>!t.isActive&&t.playing).length,n=s.imageUrl;return X`
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
        <div class="title">${e.name}</div>
        <div class="artist">${e.artist}</div>
      </div>
      <div class="scrubber">
        <hf-slider
          .value=${r.position}
          .min=${0}
          .max=${e.durationSec}
          .color=${wt}
          .track=${kt}
          @hf-input=${e=>t.setPosition(e.detail)}
        ></hf-slider>
        <div class="times">
          <span>${Vt(r.position)}</span>
          <span>-${Vt(e.durationSec-r.position)}</span>
        </div>
      </div>
      <div class="transport">
        <button
          class="icon-btn"
          aria-pressed=${r.shuffle}
          aria-label="Shuffle"
          @click=${()=>t.toggleShuffle()}
        >
          ${Qt.shuffle({size:18})}
        </button>
        <button class="icon-btn" aria-label="Previous" @click=${()=>t.prev()}>
          ${Qt.prev({size:22})}
        </button>
        <button
          class="play-btn"
          aria-label=${r.playing?"Pause":"Play"}
          @click=${()=>t.togglePlaying()}
        >
          ${r.playing?Qt.pause({size:22}):Qt.play({size:22})}
        </button>
        <button class="icon-btn" aria-label="Next" @click=${()=>t.next()}>
          ${Qt.next({size:22})}
        </button>
        <button
          class="icon-btn"
          aria-pressed=${"off"!==r.repeat}
          aria-label="Repeat"
          @click=${()=>t.cycleRepeat()}
        >
          ${"one"===r.repeat?Qt.rep1({size:18}):Qt.rep({size:18})}
        </button>
      </div>
      <div class="output">
        <button class="output-main" type="button" @click=${()=>t.setTab("group")}>
          ${Qt.speaker({size:16,stroke:wt})}
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
          @click=${()=>t.openGroupingSheet(t.activeLeadId)}
        >
          ${Qt.group({size:13})} Group
        </button>
      </div>
    `}};ne.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
  `,t([ut({attribute:!1})],ne.prototype,"store",void 0),ne=t([ct("hf-player-tab")],ne);const le=[{id:"playlists",label:"Playlists"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"tracks",label:"Tracks"},{id:"radio",label:"Radio"}],de=[{id:"default",label:"Default (MA order)"},{id:"title_asc",label:"Title A → Z"},{id:"title_desc",label:"Title Z → A"}];function ce(t){if("string"==typeof t)return"[object Object]"===t?"":t;if("number"==typeof t)return String(t);if(Array.isArray(t)&&t.length>0)return ce(t[0]);if(t&&"object"==typeof t){const e=t;return ce(e.name)||ce(e.title)||ce(e.path)||ce(e.url)||""}return""}let he=class extends i{constructor(){super(...arguments),this._kickedOffRoot=!1,this._sortMode="default",this._sortMenuOpen=!1,this._filterQuery="",this._lastStackDepth=0,this._closeSortMenu=()=>{this._sortMenuOpen&&(this._sortMenuOpen=!1)}}willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}updated(){!this.store?.isHassMode||this._kickedOffRoot||0!==this.store.hassBrowseStack.length||this.store.hassBrowseLoading||(this._kickedOffRoot=!0,this.store.browseRoot());const t=this.store?.hassBrowseStack?.length??0;t!==this._lastStackDepth&&(this._lastStackDepth=t,""!==this._filterQuery&&(this._filterQuery=""))}render(){return this.store?this.store.isHassMode?this._renderHass():X`${this._renderCrumbs()} ${this._renderBody()}`:X``}_renderHass(){const t=this.store.hassBrowseStack,e=t[t.length-1],s=!!e&&(e.children?.length??0)>5;return X`
      ${this._renderHassCrumbs(t)}
      ${s?this._renderControlsBar():""}
      ${this.store.hassBrowseError?X`<div class="hass-error">${this.store.hassBrowseError}</div>`:this.store.hassBrowseLoading&&!e?X`<div class="hass-loading">Loading library…</div>`:e?this._renderHassNode(e):X`<div class="hass-empty">No library available</div>`}
    `}_renderControlsBar(){return X`
      <div class="controls-bar">
        <div class="filter-input-wrap">
          ${Qt.search({size:13,stroke:"currentColor"})}
          <input
            class="filter-input"
            type="search"
            placeholder="Filter this list…"
            .value=${this._filterQuery}
            @input=${t=>this._filterQuery=t.target.value}
          />
          ${this._filterQuery?X`
                <button
                  class="filter-clear"
                  aria-label="Clear filter"
                  @click=${()=>this._filterQuery=""}
                >
                  ${Qt.x({size:12})}
                </button>
              `:""}
        </div>
        <button
          class="sort-btn"
          @click=${t=>{t.stopPropagation(),this._sortMenuOpen=!this._sortMenuOpen}}
        >
          ${Qt.filter({size:12})} ${t=this._sortMode,de.find(e=>e.id===t)?.label.split(" ")[0]??"Default"}
        </button>
        ${this._sortMenuOpen?X`
              <div class="sort-menu" @click=${t=>t.stopPropagation()}>
                ${de.map(t=>X`
                    <button
                      class="sort-option"
                      data-active=${t.id===this._sortMode}
                      @click=${()=>this._chooseSort(t.id)}
                    >
                      <span>${t.label}</span>
                      <span class="sort-option-check">
                        ${Qt.check({size:12,sw:2.4})}
                      </span>
                    </button>
                  `)}
              </div>
            `:""}
      </div>
    `;var t}_chooseSort(t){this._sortMode=t,this._sortMenuOpen=!1}_applySort(t){if("default"===this._sortMode)return t;const e=[...t];return"title_asc"===this._sortMode?e.sort((t,e)=>t.title.localeCompare(e.title)):"title_desc"===this._sortMode&&e.sort((t,e)=>e.title.localeCompare(t.title)),e}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._closeSortMenu)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._closeSortMenu)}_renderHassCrumbs(t){return 0===t.length?X``:X`
      <div class="crumbs">
        ${t.map((e,s)=>{const r=s===t.length-1,a=0===s?"Sources":ce(e.title)||"Item";return X`
            <button
              class="crumb-btn"
              data-current=${r}
              @click=${()=>this.store.browsePop(s)}
            >
              ${a}
            </button>
            ${s<t.length-1?X`<span aria-hidden="true">${Qt.chev({size:11})}</span>`:""}
          `})}
      </div>
    `}_renderHassNode(t){const e=t.children??[];if(0===e.length)return X`<div class="hass-empty">No items</div>`;const s=this._applyFilter(e),r=this._applySort(s);return 0===r.length?X`
        <div class="hass-empty">
          No matches for "${this._filterQuery}"
        </div>
      `:X`<div class="body">${this._renderHassList(r)}</div>`}_applyFilter(t){const e=this._filterQuery.trim().toLowerCase();return e?t.filter(t=>ce(t.title).toLowerCase().includes(e)):t}_renderHassList(t){return X`
      <div>
        ${t.map(t=>{const e=ce(t.title)||"(untitled)",s=ce(t.media_class),r=ce(t.thumbnail);return X`
            <div class="browse-row">
              <button
                class="browse-row-main"
                @click=${()=>this._onHassRowClick(t)}
              >
                ${r?X`<hf-album-art
                      .obj=${null}
                      .imageUrl=${r}
                      size="36"
                      radius="6"
                    ></hf-album-art>`:X`<div
                      style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);display:grid;place-items:center;color:var(--hf-text-dim);flex:none"
                    >
                      ${this._iconForClass(s)}
                    </div>`}
                <div class="track-meta">
                  <div class="track-name">${e}</div>
                  ${s?X`<div class="track-sub">${s}</div>`:""}
                </div>
                ${t.can_expand?Qt.chev({size:14}):""}
              </button>
              ${t.can_play?X`
                    <button
                      class="browse-play"
                      title="Play"
                      aria-label="Play ${e}"
                      @click=${e=>{e.stopPropagation(),this.store.playBrowseNode(t,"replace")}}
                    >
                      ${Qt.play({size:14})}
                    </button>
                  `:""}
            </div>
          `})}
      </div>
    `}_onHassRowClick(t){t.can_expand?this.store.browseInto(t):t.can_play&&this.store.playBrowseNode(t,"replace")}_iconForClass(t){return"track"===t||"music"===t?Qt.note({size:16}):"album"===t?Qt.album({size:16}):"artist"===t?Qt.artist({size:16}):"playlist"===t?Qt.list({size:16}):"radio"===t?Qt.radio({size:16}):Qt.home({size:16})}_renderCrumbs(){const t=this.store.browser.crumbs;return X`
      <div class="crumbs">
        ${t.map((e,s)=>{const r=s===t.length-1;return X`
            <button
              class="crumb-btn"
              data-current=${r}
              @click=${()=>this.store.popToCrumb(s)}
            >
              ${e.label}
            </button>
            ${s<t.length-1?X`<span aria-hidden="true">${Qt.chev({size:11})}</span>`:""}
          `})}
      </div>
    `}_renderBody(){const{providerId:t,accountId:e,sub:s,detailId:r}=this.store.browser;if(!t)return this._renderProviders();const a=Yt.providerById(t);return a?e?r?this._renderDetail(r):this._renderTypeView(s):this._renderAccounts(a):X``}_renderProviders(){return X`
      <div class="body">
        <div class="section-label">Connected sources</div>
        <div class="stack">
          ${Yt.providers.map(t=>this._renderProviderTile(t))}
        </div>
      </div>
    `}_renderProviderTile(t){const e=`linear-gradient(135deg, oklch(72% 0.18 ${t.brandHue}), oklch(48% 0.16 ${(t.brandHue+30)%360}))`;return X`
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
        ${Qt.chev({size:16})}
      </button>
    `}_renderAccounts(t){return X`
      <div class="body">
        <div class="section-label">${t.name} · choose an account</div>
        <div class="stack">
          ${t.accounts.map(t=>this._renderAccountTile(t))}
        </div>
      </div>
    `}_renderAccountTile(t){const e=t.name.replace(/[^a-zA-Z]/g,"").slice(0,2).toUpperCase();return X`
      <button
        class="account-tile"
        @click=${()=>this.store.pushCrumb({kind:"account",label:t.name},{accountId:t.id,sub:"playlists",detailId:null})}
      >
        <div class="account-avatar" style=${"background:conic-gradient(from 220deg, var(--hf-accent), oklch(70% 0.14 220))"}>${e}</div>
        <div style="flex:1; min-width:0">
          <div class="account-name">${t.name}</div>
          <div class="account-sub">${t.tier}</div>
        </div>
        ${Qt.chev({size:16})}
      </button>
    `}_renderTypeView(t){return X`
      <div class="subtabs">
        ${le.map(e=>X`
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
    `}_renderTypeBody(t){return"playlists"===t?X`
        <div class="grid2">
          ${Yt.playlists.map(t=>X`
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
      `:"albums"===t?X`
        <div class="grid2">
          ${Yt.albums.map(t=>X`
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
      `:"artists"===t?X`
        <div>
          ${Yt.artistList.slice(0,12).map((t,e)=>X`
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
      `:"tracks"===t?X`
        <div>
          ${Yt.tracks.slice(0,12).map((t,e)=>this._renderTrackRow(t,e+1))}
        </div>
      `:X`
      <div class="stack">
        ${Yt.radioStations.map(t=>X`
            <button class="radio-row">
              <hf-album-art
                .obj=${t}
                size="44"
                radius="10"
                .glyph=${Qt.radio({size:18,stroke:"#fff"})}
              ></hf-album-art>
              <div style="flex:1; min-width:0">
                <div class="track-name">${t.name}</div>
                <div class="track-sub">${t.genre}</div>
              </div>
              ${Qt.play({size:16})}
            </button>
          `)}
      </div>
    `}_renderTrackRow(t,e){const s=Yt.albumById(t.albumId);return X`
      <button class="track-row">
        ${null!=e?X`<div class="track-index">${e}</div>`:""}
        <hf-album-art .obj=${s} size="36" radius="6"></hf-album-art>
        <div class="track-meta">
          <div class="track-name">${t.name}</div>
          <div class="track-sub">${t.artist} · ${t.album}</div>
        </div>
        <div class="track-time">${Vt(t.durationSec)}</div>
      </button>
    `}_renderDetail(t){const e=Yt.playlists.find(e=>e.id===t),s=Yt.albums.find(e=>e.id===t),r=e??s;if(!r)return X``;const a=!!e;return X`
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
              <button class="pill-btn primary">${Qt.play({size:13})} Play</button>
              <button class="pill-btn">${Qt.plus({size:13})} Queue</button>
            </div>
          </div>
        </div>
        <div class="body">
          ${Yt.tracks.slice(0,10).map((t,e)=>this._renderTrackRow(t,e+1))}
        </div>
      </div>
    `}};he.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
    .browse-row {
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .browse-row-main {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      background: transparent;
      border: 0;
      cursor: pointer;
      color: var(--hf-text);
      text-align: left;
      font: inherit;
    }
    .browse-play {
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }
    .browse-play:hover {
      filter: brightness(1.08);
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
  `,t([ut({attribute:!1})],he.prototype,"store",void 0),t([ft()],he.prototype,"_sortMode",void 0),t([ft()],he.prototype,"_sortMenuOpen",void 0),t([ft()],he.prototype,"_filterQuery",void 0),he=t([ct("hf-browse-tab")],he);const pe=[{id:"all",label:"All"},{id:"tracks",label:"Tracks"},{id:"albums",label:"Albums"},{id:"artists",label:"Artists"},{id:"playlists",label:"Playlists"}],ue=["khruangbin","jazz","deep focus","ambient","tycho","discover weekly"],fe=new Set;let me=class extends i{constructor(){super(...arguments),this._searchTimer=null,this._lastFiredQuery=""}willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}disconnectedCallback(){super.disconnectedCallback(),null!==this._searchTimer&&(window.clearTimeout(this._searchTimer),this._searchTimer=null)}_scheduleHassSearch(t,e){null!==this._searchTimer&&window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>{if(t===this._lastFiredQuery)return;this._lastFiredQuery=t;const s=function(t){switch(t){case"tracks":return["track"];case"albums":return["album"];case"artists":return["artist"];case"playlists":return["playlist"];default:return[]}}(e);this.store.searchMa(t,s,25)},350)}render(){if(!this.store)return X``;if(this.store.isHassMode)return this._renderHass();const t=this.store,e=t.search.query.trim().toLowerCase(),s=t.search.filter,r=e?this._matchesFor(e):null;return X`
      <div class="top">
        <div class="input-wrap">
          ${Qt.search({size:16})}
          <input
            .value=${t.search.query}
            placeholder="Search Spotify, Apple Music, SoundCloud…"
            @input=${e=>t.setSearch({query:e.target.value})}
          />
          ${t.search.query?X`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${()=>t.setSearch({query:""})}
                >
                  ${Qt.x({size:14})}
                </button>
              `:""}
        </div>
        <div class="filters">
          ${pe.map(e=>X`
              <button
                class="filter"
                data-active=${s===e.id}
                @click=${()=>t.setSearch({filter:e.id})}
              >
                ${e.label}
              </button>
            `)}
        </div>
      </div>

      <div class="scroll">
        ${r?this._renderResults(r,s):this._renderSuggestions()}
      </div>
    `}_matchesFor(t){const e=e=>e.toLowerCase().includes(t);return{tracks:Yt.tracks.filter(t=>e(t.name)||e(t.artist)),albums:Yt.albums.filter(t=>e(t.name)||e(t.artist)),artists:Yt.artistList.filter(e),playlists:Yt.playlists.filter(t=>e(t.name))}}_renderResults(t,e){return X`
      <div class="body">
        ${Yt.providers.map(s=>this._renderProviderSection(s,t,e))}
      </div>
    `}_renderProviderSection(t,e,s){let r=e.tracks.slice(0,4),a=e.albums.slice(0,2),o=e.artists.slice(0,2),n=e.playlists.slice(0,2);"apple"===t.id?(r=e.tracks.slice(1,4),a=e.albums.slice(2,4)):"soundcloud"===t.id&&(r=e.tracks.slice(2,5),a=[]),"tracks"===s?(a=[],o=[],n=[]):"albums"===s?(r=[],o=[],n=[]):"artists"===s?(r=[],a=[],n=[]):"playlists"===s&&(r=[],a=[],o=[]);const l=r.length+a.length+o.length+n.length;if(0===l)return X``;const d=`linear-gradient(135deg, oklch(70% 0.18 ${t.brandHue}), oklch(46% 0.16 ${(t.brandHue+30)%360}))`;return X`
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

        ${r.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Tracks</div>
                ${r.map(t=>{const e=Yt.albumById(t.albumId);return X`
                    <div class="track-row">
                      <hf-album-art .obj=${e} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${t.name}</div>
                        <div class="row-sub">${t.artist} · ${t.album}</div>
                      </div>
                      <div class="row-time">${Vt(t.durationSec)}</div>
                    </div>
                  `})}
              </div>
            `:""}

        ${a.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Albums</div>
                <div class="album-row">
                  ${a.map(t=>X`
                      <div class="album-card">
                        <hf-album-art .obj=${t} size="96" radius="8"></hf-album-art>
                        <div class="album-name">${t.name}</div>
                        <div class="album-artist">${t.artist}</div>
                      </div>
                    `)}
                </div>
              </div>
            `:""}

        ${o.length>0?X`
              <div style="margin-bottom:6px">
                <div class="small-label">Artists</div>
                ${o.map((t,e)=>X`
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

        ${n.length>0?X`
              <div>
                <div class="small-label">Playlists</div>
                ${n.map(t=>X`
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
    `}_renderSuggestions(){return X`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${ue.map(t=>X`
              <button
                class="suggest-pill"
                @click=${()=>this.store.setSearch({query:t})}
              >
                ${t}
              </button>
            `)}
        </div>
        <div class="small-label">Recent</div>
        ${Yt.tracks.slice(0,4).map(t=>{const e=Yt.albumById(t.albumId);return X`
            <div class="track-row">
              <hf-album-art .obj=${e} size="36" radius="6"></hf-album-art>
              <div class="row-meta">
                <div class="row-name">${t.name}</div>
                <div class="row-sub">${t.artist} · ${t.album}</div>
              </div>
              <div class="row-time">${Vt(t.durationSec)}</div>
            </div>
          `})}
      </div>
    `}_renderHass(){const t=this.store,e=t.search.query,s=t.search.filter,r=t.hassSearchResults;return X`
      <div class="top">
        <div class="input-wrap">
          ${Qt.search({size:16})}
          <input
            .value=${e}
            placeholder="Search MA library + connected providers…"
            @input=${e=>{const r=e.target.value;t.setSearch({query:r}),this._scheduleHassSearch(r,s)}}
          />
          ${e?X`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${()=>{t.setSearch({query:""}),this._lastFiredQuery="",t.searchMa("",[])}}
                >
                  ${Qt.x({size:14})}
                </button>
              `:""}
        </div>
        <div class="filters">
          ${pe.map(r=>X`
              <button
                class="filter"
                data-active=${s===r.id}
                @click=${()=>{t.setSearch({filter:r.id}),e&&(this._lastFiredQuery="",this._scheduleHassSearch(e,r.id))}}
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
        ${e?t.hassSearchLoading&&!r?X`<div class="hass-loading">Searching…</div>`:t.hassSearchError?X`<div class="hass-error">${t.hassSearchError}</div>`:r?this._renderHassResults(r,s):X`<div class="hass-empty">Type to search</div>`:this._renderHassSuggestions()}
      </div>
    `}_renderHassResults(t,e){const s=[{key:"tracks",label:"Tracks",items:t.tracks},{key:"albums",label:"Albums",items:t.albums},{key:"artists",label:"Artists",items:t.artists},{key:"playlists",label:"Playlists",items:t.playlists},{key:"radio",label:"Radio",items:t.radio}].filter(t=>0!==t.items.length&&("all"===e||e===t.key));return 0===s.length?X`<div class="hass-empty">No matches for "${t.query}"</div>`:X`
      <div class="body" style="padding:10px 14px 16px">
        ${s.map(t=>X`
            <div style="margin-bottom:16px">
              <div class="small-label">${t.label} · ${t.items.length}</div>
              ${t.items.map(t=>this._renderHassResultRow(t))}
            </div>
          `)}
      </div>
    `}_renderHassResultRow(t){const e=t,s=ve(e.title)??ve(e.name)??"(untitled)",r=[],a=ve(e.artist)??ve(e.artists);a&&r.push(a);const o=ve(e.album);o&&o!==s&&r.push(o);const n=ve(e.provider)??ve(e.provider_mappings);n&&r.push(n);const l=r.join(" · "),d=ge(e),c="number"==typeof e.duration?e.duration:"number"==typeof e.duration_seconds?e.duration_seconds:void 0;return fe.has(e.uri??s)||(fe.add(e.uri??s),fe.size<6&&console.debug("[homefront-music-card] search row extract:",{title:s,artistStr:a,albumStr:o,image:d,rawArtist:e.artist,rawArtists:e.artists,rawAlbum:e.album,rawMetadata:e.metadata})),X`
      <div class="track-row" @click=${()=>this.store.playSearchResult(t)}>
        ${d?X`<hf-album-art
              .obj=${null}
              .imageUrl=${d}
              size="36"
              radius="6"
            ></hf-album-art>`:X`<div
              style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);flex:none"
            ></div>`}
        <div class="row-meta">
          <div class="row-name">${s}</div>
          ${l?X`<div class="row-sub">${l}</div>`:""}
        </div>
        ${c?X`<div class="row-time">${Vt(c)}</div>`:""}
      </div>
    `}_renderHassSuggestions(){return X`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${ue.map(t=>X`
              <button
                class="suggest-pill"
                @click=${()=>{this.store.setSearch({query:t}),this._scheduleHassSearch(t,this.store.search.filter)}}
              >
                ${t}
              </button>
            `)}
        </div>
      </div>
    `}};function ve(t){if("string"==typeof t){const e=t.trim();if(!e)return;if("[object Object]"===e)return;return e}if(Array.isArray(t)&&t.length>0)return ve(t[0]);if(t&&"object"==typeof t){const e=t;return ve(e.name)??ve(e.title)??ve(e.display_name)??void 0}}function ge(t){const e=t=>{if("string"==typeof t&&t&&("undefined"==typeof location||"https:"!==location.protocol||!t.startsWith("http:")))return t},s=e(t.image_url)??e(t.thumbnail)??e(t.image);if(s)return s;const r=t.metadata,a=r?.images?.[0];if(a){const t=e(a.path)??e(a.url);if(t)return t}for(const e of["album","artist","artists"]){const s=t[e];if(Array.isArray(s)&&s.length>0){const t=ge(s[0]);if(t)return t}else if(s&&"object"==typeof s){const t=ge(s);if(t)return t}}}me.styles=l`
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
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
  `,t([ut({attribute:!1})],me.prototype,"store",void 0),me=t([ct("hf-search-tab")],me);let be=class extends i{constructor(){super(...arguments),this.rowHeight=56,this.actionBg="#e0413a",this._dx=0,this._dragging=!1,this._startX=null,this._startDx=0,this._onDown=t=>{const e="touches"in t?t.touches[0].clientX:t.clientX;this._startX=e,this._startDx=this._dx,this._dragging=!0},this._onMove=t=>{if(null===this._startX)return;const e="touches"in t?t.touches[0].clientX:t.clientX;let s=this._startDx+(e-this._startX);s>0&&(s=0),s<-110&&(s=-110),this._dx=s},this._onUp=()=>{this._startX=null,this._dragging=!1,this._dx=this._dx<-64?-92:0},this._fireDelete=()=>{this.dispatchEvent(new CustomEvent("hf-delete",{bubbles:!0,composed:!0})),this._dx=0}}render(){return X`
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
    `}};be.styles=l`
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
  `,t([ut({type:Number})],be.prototype,"rowHeight",void 0),t([ut()],be.prototype,"actionBg",void 0),t([ut({attribute:!1})],be.prototype,"icon",void 0),t([ft()],be.prototype,"_dx",void 0),t([ft()],be.prototype,"_dragging",void 0),be=t([ct("hf-swipe-row")],be);let xe=class extends i{constructor(){super(...arguments),this.items=[],this.rowHeight=56,this.renderRow=()=>X``,this._dragIdx=null,this._hoverIdx=null,this._startY=0,this._onMove=t=>{if(null===this._dragIdx)return;const e=("touches"in t?t.touches[0].clientY:t.clientY)-this._startY,s=Math.round(this._dragIdx+e/this.rowHeight);this._hoverIdx=Math.max(0,Math.min(this.items.length-1,s))},this._onUp=()=>{null!==this._dragIdx&&null!==this._hoverIdx&&this._hoverIdx!==this._dragIdx&&this.dispatchEvent(new CustomEvent("hf-reorder",{detail:{from:this._dragIdx,to:this._hoverIdx},bubbles:!0,composed:!0})),this._dragIdx=null,this._hoverIdx=null,window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}}createRenderRoot(){return this}render(){const t=this._positions();return X`
      <div
        style=${`position:relative;height:${this.items.length*this.rowHeight}px`}
      >
        ${this.items.map((e,s)=>{const r=s===this._dragIdx,a=t[s]??0;return X`
            <div style=${`position:absolute;left:0;right:0;top:0;transform:translateY(${a}px);${r?"transition:none;z-index:10;opacity:0.92;filter:drop-shadow(0 8px 22px rgba(0,0,0,0.4))":"transition:transform 0.18s cubic-bezier(0.2,0.7,0.3,1)"}`} .key=${e.key}>
              ${this.renderRow(e,s,{onGripDown:this._gripDownFor(s),isDragging:r})}
            </div>
          `})}
      </div>
    `}_positions(){const t=this.items.map((t,e)=>e);if(null!==this._dragIdx&&null!==this._hoverIdx){const[e]=t.splice(this._dragIdx,1);void 0!==e&&t.splice(this._hoverIdx,0,e)}const e=new Array(this.items.length).fill(0);return t.forEach((t,s)=>{e[t]=s*this.rowHeight}),e}_gripDownFor(t){return e=>{e.preventDefault(),this._dragIdx=t,this._hoverIdx=t,this._startY="touches"in e?e.touches[0].clientY:e.clientY,window.addEventListener("mousemove",this._onMove),window.addEventListener("mouseup",this._onUp),window.addEventListener("touchmove",this._onMove,{passive:!1}),window.addEventListener("touchend",this._onUp)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousemove",this._onMove),window.removeEventListener("mouseup",this._onUp),window.removeEventListener("touchmove",this._onMove),window.removeEventListener("touchend",this._onUp)}};t([ut({attribute:!1})],xe.prototype,"items",void 0),t([ut({type:Number})],xe.prototype,"rowHeight",void 0),t([ut({attribute:!1})],xe.prototype,"renderRow",void 0),t([ft()],xe.prototype,"_dragIdx",void 0),t([ft()],xe.prototype,"_hoverIdx",void 0),xe=t([ct("hf-draggable-queue")],xe);let ye=class extends i{constructor(){super(...arguments),this._queueLoadKickedOff=!1}willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}updated(){!this.store?.isHassMode||this.store.hassQueueLoading||this.store.hassQueueIsFresh||this._queueLoadKickedOff||(this._queueLoadKickedOff=!0,this.store.loadQueue().finally(()=>{this._queueLoadKickedOff=!1}))}render(){if(!this.store)return X``;if(this.store.isHassMode)return this._renderHass();const t=this.store,e=t.activePlayer,s=e.queue.slice(e.currentIdx+1),r=Yt.trackById(e.queue[e.currentIdx]??""),a=s.map((t,s)=>{const r=e.currentIdx+1+s;return{key:`${t}@${r}`,id:t,idxInQueue:r}}),o=t.selectedTracks.size;return X`
      ${t.multiMode?X`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${()=>t.setMultiMode(!1)}
                aria-label="Cancel selection"
              >
                ${Qt.x({size:16})}
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
                  @click=${()=>t.setMultiMode(!0)}
                >
                  ${Qt.check({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue"
                  @click=${()=>t.clearQueue()}
                >
                  ${Qt.trash({size:16})}
                </button>
              </div>
            </div>
          `}

      ${r?X`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${Yt.albumById(r.albumId)}
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
                .renderRow=${(t,e,s)=>this._renderRow(t,s)}
                @hf-reorder=${e=>{const s=t.activePlayer.currentIdx;t.moveQueue(s+1+e.detail.from,s+1+e.detail.to)}}
              ></hf-draggable-queue>
            `}
      </div>
    `}_renderRow(t,e){const s=this.store,r=Yt.trackById(t.id);if(!r)return X``;const a=Yt.albumById(r.albumId),o=s.selectedTracks.has(t.idxInQueue);return X`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${()=>s.removeFromQueue(t.idxInQueue)}
      >
        <div class="row-inner" data-selected=${o}>
          ${s.multiMode?X`
                <button
                  class="checkbox"
                  data-checked=${o}
                  @click=${e=>{e.stopPropagation();const r=new Set(s.selectedTracks);r.has(t.idxInQueue)?r.delete(t.idxInQueue):r.add(t.idxInQueue),s.setSelectedTracks(r)}}
                >
                  ${o?Qt.check({size:12,sw:3}):""}
                </button>
              `:X`
                <div
                  class="grip"
                  aria-label="Drag handle"
                  @mousedown=${e.onGripDown}
                  @touchstart=${e.onGripDown}
                >
                  ${Qt.drag({size:14})}
                </div>
              `}
          <hf-album-art .obj=${a} size="40" radius="6"></hf-album-art>
          <div
            class="row-track"
            @click=${()=>s.multiMode?null:s.playTrackAt(t.idxInQueue)}
          >
            <div class="row-name">${r.name}</div>
            <div class="row-artist">${r.artist}</div>
          </div>
          <div class="row-time">${Vt(r.durationSec)}</div>
          ${s.multiMode?"":X`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${e=>{e.stopPropagation(),s.moveToTop(t.idxInQueue)}}
                >
                  ${Qt.playNext({size:14})}
                </button>
              `}
        </div>
      </hf-swipe-row>
    `}_renderHass(){const t=this.store,e=t.hassQueue,s=t.currentTrack.name,r=t.currentTrack.artist,a=t.currentAlbum.imageUrl,o=t.selectedTracks.size;return X`
      ${t.multiMode?X`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${()=>t.setMultiMode(!1)}
                aria-label="Cancel selection"
              >
                ${Qt.x({size:16})}
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
                  ${e.length} item${1===e.length?"":"s"} ·
                  drag-reorder coming soon
                </div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Reload queue"
                  @click=${()=>{t.loadQueue()}}
                >
                  ${Qt.search({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${()=>t.setMultiMode(!0)}
                >
                  ${Qt.check({size:16})}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue from here"
                  @click=${()=>t.clearQueueFromHere()}
                >
                  ${Qt.trash({size:16})}
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
        <div class="small-label">Up next · ${e.length}</div>
        ${t.hassQueueLoading?X`<div class="hass-loading">Loading queue…</div>`:t.hassQueueError?X`<div class="hass-error">${t.hassQueueError}</div>`:0===e.length?X`<div class="empty">Queue is empty</div>`:X`<div>${e.map(t=>this._renderHassRow(t))}</div>`}
      </div>
    `}_renderHassRow(t){const e=this.store,s=t.title??t.name??"(untitled)",r=t.artist??"",a=t.duration??t.duration_seconds??0,o=t.image_url??t.thumbnail,n=e.selectedTracks.has(t.queue_item_id);return X`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${()=>e.removeQueueItem(t.queue_item_id)}
      >
        <div class="row-inner" data-selected=${n}>
          ${e.multiMode?X`
                <button
                  class="checkbox"
                  data-checked=${n}
                  @click=${e=>{e.stopPropagation(),this._toggleSelectHass(t.queue_item_id)}}
                >
                  ${n?Qt.check({size:12,sw:3}):""}
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
            @click=${()=>e.multiMode?null:e.playQueueItem(t.queue_item_id)}
          >
            <div class="row-name">${s}</div>
            <div class="row-artist">${r}</div>
          </div>
          <div class="row-time">${a?Vt(a):""}</div>
          ${e.multiMode?"":X`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${s=>{s.stopPropagation(),e.moveQueueItemToTop(t.queue_item_id)}}
                >
                  ${Qt.playNext({size:14})}
                </button>
              `}
        </div>
      </hf-swipe-row>
    `}_toggleSelectHass(t){const e=this.store.selectedTracks,s=new Set(e);s.has(t)?s.delete(t):s.add(t),this.store.setSelectedTracks(s)}_bulkRemoveHass(){const t=this.store.selectedTracks;this.store.removeQueueItems(new Set(t))}};ye.styles=l`
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
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
  `,t([ut({attribute:!1})],ye.prototype,"store",void 0),ye=t([ct("hf-queue-tab")],ye);let _e=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const t=this.store.groups,e=t.filter(t=>!t.isIdle),s=t.filter(t=>t.isIdle);return X`
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

      ${s.length>0?X`
            <div class="idle-section">
              Idle
              <div class="rule"></div>
              ${s.length}
            </div>
            <div class="idle-rows">
              ${s.map(t=>this._renderIdleRow(t))}
            </div>
          `:""}

      <div class="footer-help">
        Tap a group's name to control it from the Player tab. Use Group on
        any row to add/remove rooms; ▶ on an idle row starts solo playback.
      </div>
    `}_renderGroupCard(t){const e=t.player?Yt.trackById(t.player.queue[t.player.currentIdx]??""):void 0,s=e?Yt.albumById(e.albumId):void 0,r=t.player?.groupVolume??t.lead.volume;return X`
      <div class="group-card" data-active=${t.isActive}>
        <div class="group-head">
          ${s?X`<hf-album-art .obj=${s} size="46" radius="9"></hf-album-art>`:X`<div class="group-art">${Qt.speaker({size:18})}</div>`}
          <div class="group-meta">
            <button class="group-name-btn" @click=${()=>this.store.setActiveLead(t.leadId)}>
              <span class="group-name">${t.name}</span>
              ${t.isActive?X`<span class="active-badge">Active</span>`:""}
            </button>
            <div class="group-track">
              ${e?X`<strong>${e.name}</strong> · ${e.artist}`:"Idle"}
            </div>
          </div>
          <div class="group-actions">
            <button
              class="pill-btn"
              title="Group rooms"
              @click=${()=>this.store.openGroupingSheet(t.leadId)}
            >
              ${Qt.group({size:13})} Group
            </button>
            <button
              class="play-btn"
              data-playing=${t.playing}
              aria-label=${t.playing?"Pause group":"Play group"}
              @click=${()=>this.store.toggleGroupPlay(t.leadId)}
            >
              ${t.playing?Qt.pause({size:14}):Qt.play({size:14})}
            </button>
          </div>
        </div>

        <div class="group-volume">
          <div class="group-volume-head">
            ${Qt.group({size:13,stroke:bt})}
            <div class="group-volume-label">
              Group · ${t.members.length} speaker${1===t.members.length?"":"s"}
            </div>
            <div class="group-volume-value">${r}</div>
          </div>
          <hf-slider
            .value=${r}
            .color=${wt}
            .track=${kt}
            @hf-input=${e=>this.store.setGroupVolumeFor(t.leadId,e.detail)}
          ></hf-slider>
        </div>

        <div class="members">
          ${t.members.map(e=>this._renderMemberRow(e,t))}
        </div>
      </div>
    `}_renderMemberRow(t,e){const s=t.id===e.leadId,r=e.members.length>1;return X`
      <div class="member-row">
        <div class="member-info">
          <div class="member-name-row">
            <div class="member-name">${t.name}</div>
            ${s&&e.members.length>1?X`<span class="lead-tag">Lead</span>`:""}
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
        ${r?X`
              <button
                class="member-leave"
                title="Leave group"
                @click=${()=>this.store.ungroupSpeaker(t.id)}
              >
                ${Qt.x({size:13})}
              </button>
            `:""}
      </div>
    `}_renderIdleRow(t){const e=t.lead;return X`
      <div class="idle-row">
        <div class="idle-icon">${Qt.speaker({size:14})}</div>
        <div class="idle-info">
          <div class="idle-name">${e.name}</div>
          <div class="idle-sub">${e.model} · idle</div>
        </div>
        <button
          class="idle-group-btn"
          title="Group with other rooms"
          @click=${()=>this.store.openGroupingSheet(e.id)}
        >
          ${Qt.group({size:11})} Group
        </button>
        <button
          class="idle-play-btn"
          title="Play solo here"
          aria-label="Play solo"
          @click=${()=>this.store.startSoloPlayback(e.id)}
        >
          ${Qt.play({size:11})}
        </button>
      </div>
    `}};_e.styles=l`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
  `,t([ut({attribute:!1})],_e.prototype,"store",void 0),_e=t([ct("hf-output-tab")],_e);const we=l`
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
`;let $e=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){if(!this.store)return X``;const t=this.store.groups;return X`
      <div class="rail">
        ${t.map(t=>{const e=t.isActive?$t:wt;return X`
            <button
              class="chip"
              data-active=${t.isActive}
              data-idle=${t.isIdle}
              @click=${()=>this.store.setActiveLead(t.leadId)}
            >
              ${t.playing?function(t){const e=`background:${t}`;return X`
    <span class="hf-pip" aria-hidden="true">
      <span style=${e}></span>
      <span style=${e}></span>
      <span style=${e}></span>
    </span>
  `}(e):Qt.speaker({size:11,stroke:"currentColor"})}
              <span class="chip-name">${t.name}</span>
              ${t.members.length>1?X`<span class="badge">${t.members.length}</span>`:""}
            </button>
          `})}
        <button
          class="manage-btn"
          aria-label="Manage groups"
          title="Manage groups"
          @click=${()=>this.store.setTab("group")}
        >
          ${Qt.group({size:13})}
        </button>
      </div>
    `}};$e.styles=[we,l`
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
    `],t([ut({attribute:!1})],$e.prototype,"store",void 0),$e=t([ct("hf-group-chip-rail")],$e);let ke=class extends i{constructor(){super(...arguments),this._draft=new Set,this._initialDraft=new Set,this._wasOpen=!1,this._apply=()=>{const t=this.store.groupingSheet;t.leadId&&this.store.commitGroupMembers(t.leadId,Array.from(this._draft))}}willUpdate(t){if(t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store)),this.store){const t=this.store.groupingSheet.open;t&&!this._wasOpen&&this._seedDraft(),this._wasOpen=t}}_seedDraft(){const t=this.store.groupingSheet.leadId;if(!t)return;const e=this.store.speakers.filter(e=>e.leadId===t).map(t=>t.id);e.push(t);const s=new Set(e);this._draft=s,this._initialDraft=new Set(s)}render(){const t=this.store?.groupingSheet;if(!t?.open)return this.toggleAttribute("data-open",!1),X``;this.toggleAttribute("data-open",!0);const e=t.leadId,s=this.store.speakers.find(t=>t.id===e);if(!s)return X``;const r=this._draft.size,a=this._diffChanged(),o=0===r?"Group will be dissolved":1===r?"Will play solo":`${r} rooms grouped`;return X`
      <div class="scrim" @click=${()=>this.store.closeGroupingSheet()}></div>
      <div class="sheet" @click=${t=>t.stopPropagation()}>
        <div class="grip"><div></div></div>
        <div class="header">
          <div class="header-title">Group rooms</div>
          <div class="header-sub">
            Choose rooms to play in sync with
            <strong>${s.name}</strong>.
          </div>
        </div>
        <div class="list">
          ${this.store.speakers.map(t=>{const s=this._draft.has(t.id),r=t.id===e;return X`
              <button
                class="row"
                data-checked=${s}
                @click=${()=>this._toggle(t.id)}
              >
                <div class="check">
                  ${s?Qt.check({size:15,sw:2.6}):""}
                </div>
                <div class="row-info">
                  <div class="row-name-line">
                    <div class="row-name">${t.name}</div>
                    ${r?X`<span class="anchor-tag">Anchor</span>`:""}
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
    `}_toggle(t){const e=this.store.groupingSheet,s=new Set(this._draft);if(s.has(t)){if(t===e.leadId&&s.size>1)return;s.delete(t)}else s.add(t);this._draft=s}_diffChanged(){if(this._initialDraft.size!==this._draft.size)return!0;for(const t of this._initialDraft)if(!this._draft.has(t))return!0;return!1}_contextFor(t,e){const s=this.store.speakers.find(e=>e.id===t);if(!s)return null;if(s.leadId===e)return null;const r=this.store.groups.find(t=>t.leadId===s.leadId);return r?1===r.members.length?r.player?"Playing solo":"Idle":`In ${r.name}`:null}};ke.styles=l`
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
  `,t([ut({attribute:!1})],ke.prototype,"store",void 0),t([ft()],ke.prototype,"_draft",void 0),ke=t([ct("hf-group-sheet")],ke);const Se=[{key:"hasMA",name:"Music Assistant",why:"Browses libraries (Spotify, Apple Music, Tidal, …), drives playback, and surfaces now-playing metadata.",hint:"Install the Music Assistant add-on, then add the integration under Settings → Devices & Services.",link:"https://music-assistant.io"},{key:"hasQueueActions",name:"Music Assistant Queue Actions (mass_queue)",why:"Adds queue manipulation services (reorder, remove, clear) the card uses on the Queue tab. Registers services under the mass_queue domain.",hint:'Install via HACS — "Music Assistant Queue Actions" by droans — then add it under Settings → Devices & Services.',link:"https://github.com/droans/mass_queue"},{key:"hasWiim",name:"WiiM Audio (LinkPlay)",why:"Provides WiiM-native Linkplay grouping. The card uses this for all multi-room sync, never MA grouping.",hint:'Install via HACS — "WiiM Audio Integration for Home Assistant" by mjcumming — then add each device under Settings → Devices & Services.',link:"https://github.com/mjcumming/wiim"}];let ze=class extends i{render(){if(!this.status)return X``;const t=Se.filter(t=>!this.status[t.key]),e=t.length;return X`
      <div class="head">
        <div class="head-icon">${Qt.note({size:16})}</div>
        <div class="head-text">
          <div class="head-title">Setup incomplete</div>
          <div class="head-sub">
            ${e} of ${Se.length} required
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
        ${Se.map(t=>this._renderRow(t))}
      </div>

      <div class="footer">
        After installing the missing piece${1===e?"":"s"},
        reload Home Assistant (or restart). This card will pick up the
        changes automatically.
      </div>

      <div class="diagnostics">
        <div class="diagnostics-title">Detection diagnostics</div>
        ${this.status.diagnostics.map(t=>X`
            <div class="diag-line">
              <span class=${"diag-mark "+(t.matched?"ok":"miss")}>
                ${t.matched?"✓":"✗"}
              </span>
              <span class="diag-text">[${t.target}] ${t.label}</span>
            </div>
          `)}
      </div>
    `}_renderRow(t){const e=this.status[t.key];return X`
      <div class="row" data-state=${e?"ok":"missing"}>
        <div class="row-status">
          ${e?Qt.check({size:14,sw:2.4}):Qt.plus({size:14,sw:2.4})}
        </div>
        <div class="row-body">
          <div class="row-name">${t.name}</div>
          <div class="row-why">${t.why}</div>
          ${e?X`<div class="row-hint">Detected ✓</div>`:X`
                <div class="row-hint">
                  ${t.hint}
                  ${t.link?X` <a href=${t.link} target="_blank" rel="noopener">
                        Open repo →
                      </a>`:""}
                </div>
              `}
        </div>
      </div>
    `}};ze.styles=[jt,l`
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
    `],t([ut({attribute:!1})],ze.prototype,"status",void 0),ze=t([ct("hf-setup-help")],ze);let Me=class extends i{constructor(){super(...arguments),this._pickerInitTriggered=!1}setConfig(t){this._config={...t}}updated(){!this._pickerInitTriggered&&this.hass&&this._config&&!customElements.get("ha-entity-picker")&&(this._pickerInitTriggered=!0,this._loadEntityPicker())}async _loadEntityPicker(){try{const t=await(window.loadCardHelpers?.());if(!t?.createCardElement)return;const e=await t.createCardElement({type:"entities",entities:[]}),s=e?.constructor;await(s?.getConfigElement?.())}catch(t){console.warn("[homefront-music-card] failed to load ha-entity-picker:",t)}finally{this.requestUpdate()}}render(){return this._config?X`
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
            @change=${t=>this._set("layout",t.target.value)}
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
    `}_renderZonesSection(){const t=this._config?.zones??[];return X`
      <div class="section">
        <div class="section-title">Zones</div>
        <p class="hint">
          By default the card auto-discovers WiiM/MA entity pairs from
          HA's entity registry. Add a zone here only to override or to
          rename one for display.
        </p>
        ${0===t.length?X`
              <div class="discovery-note">
                No manual zones — auto-discovery is in effect.
              </div>
            `:""}
        ${t.map((t,e)=>this._renderZoneCard(t,e))}
        <button class="add-zone" @click=${()=>this._addZone()}>
          + Add zone
        </button>
      </div>
    `}_renderZoneCard(t,e){return X`
      <div class="zone-card">
        <button
          class="remove"
          @click=${()=>this._removeZone(e)}
          title="Remove zone"
        >
          ×
        </button>
        <div class="field">
          <label>Name</label>
          <input
            type="text"
            .value=${t.name??""}
            placeholder="Display name (e.g. Pool)"
            @input=${t=>this._updateZone(e,"name",t.target.value)}
          />
        </div>
        <div class="field">
          <label>WiiM entity</label>
          ${this._renderEntityField(t.wiim,t=>this._updateZone(e,"wiim",t))}
        </div>
        <div class="field">
          <label>Music Assistant entity</label>
          ${this._renderEntityField(t.ma,t=>this._updateZone(e,"ma",t))}
        </div>
      </div>
    `}_renderEntityField(t,e){return customElements.get("ha-entity-picker")?X`
        <ha-entity-picker
          .hass=${this.hass}
          .value=${t??""}
          .includeDomains=${["media_player"]}
          allow-custom-entity
          @value-changed=${t=>e(t.detail.value)}
        ></ha-entity-picker>
      `:X`
      <input
        type="text"
        .value=${t??""}
        placeholder="media_player.…"
        @input=${t=>e(t.target.value)}
      />
    `}_renderDisplaySection(){const t=this._config;return X`
      <div class="section">
        <div class="section-title">Display</div>
        <div class="field">
          <label>Density</label>
          <select
            @change=${t=>this._set("density",t.target.value)}
          >
            <option value="compact" ?selected=${"compact"===t.density}>
              Compact
            </option>
            <option
              value="regular"
              ?selected=${!t.density||"regular"===t.density}
            >
              Regular
            </option>
            <option value="comfy" ?selected=${"comfy"===t.density}>
              Comfy
            </option>
          </select>
        </div>
        <div class="field">
          <label>Accent color</label>
          <div class="field-row">
            <input
              type="color"
              .value=${t.accent_color??"#e08a4a"}
              @input=${t=>this._set("accent_color",t.target.value)}
            />
            <input
              type="text"
              .value=${t.accent_color??"#e08a4a"}
              placeholder="#e08a4a"
              style="width: 110px"
              @input=${t=>this._set("accent_color",t.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label>Theme</label>
          <select
            @change=${t=>this._set("theme",t.target.value)}
          >
            <option value="dark" ?selected=${!t.theme||"dark"===t.theme}>
              Dark
            </option>
            <option value="light" ?selected=${"light"===t.theme}>
              Light
            </option>
            <option value="auto" ?selected=${"auto"===t.theme}>
              Auto (follow OS preference)
            </option>
          </select>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            id="hf-debug-toggle"
            .checked=${!!t.debug}
            @change=${t=>this._set("debug",t.target.checked)}
          />
          <label for="hf-debug-toggle">Show diagnostic overlay</label>
        </div>
      </div>
    `}_set(t,e){this._config&&(this._config={...this._config,[t]:e},this._fireChange())}_addZone(){const t=[...this._config?.zones??[],{name:"",wiim:"",ma:""}];this._set("zones",t)}_updateZone(t,e,s){if(!this._config)return;const r=[...this._config.zones??[]],a=r[t];a&&(r[t]={...a,[e]:s},this._set("zones",r))}_removeZone(t){if(!this._config)return;const e=[...this._config.zones??[]];e.splice(t,1),this._set("zones",e)}_fireChange(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}};Me.styles=l`
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
  `,t([ut({attribute:!1})],Me.prototype,"hass",void 0),t([ft()],Me.prototype,"_config",void 0),Me=t([ct("hf-card-editor")],Me);let Ae=class extends i{willUpdate(t){t.has("store")&&this.store&&!this._ctrl&&(this._ctrl=new StoreController(this,this.store))}render(){return this.store&&0!==this.store.toasts.length?X`
      ${this.store.toasts.map(t=>X`
          <div class="toast" data-level=${t.level}>
            <span class="toast-icon">${this._iconFor(t.level)}</span>
            <div class="toast-message">${t.message}</div>
            <button
              class="toast-close"
              aria-label="Dismiss"
              @click=${()=>this.store.dismissToast(t.id)}
            >
              ${Qt.x({size:13})}
            </button>
          </div>
        `)}
    `:X``}_iconFor(t){return"error"===t?Qt.x({size:14,sw:2.4}):"warning"===t?Qt.filter({size:14}):Qt.note({size:14})}};Ae.styles=l`
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
  `,t([ut({attribute:!1})],Ae.prototype,"store",void 0),Ae=t([ct("hf-toast-bar")],Ae),window.customCards=window.customCards||[],window.customCards.push({type:"homefront-music-card",name:"Homefront Music Card",description:"Music Assistant + WiiM multi-room controller",preview:!1});const Ie=[{id:"player",label:"Player",icon:"play"},{id:"browser",label:"Browse",icon:"home"},{id:"search",label:"Search",icon:"search"},{id:"queue",label:"Queue",icon:"queue"},{id:"group",label:"Output",icon:"speaker"}];let Ce=class extends i{constructor(){super(),this._store=new Store,new StoreController(this,this._store)}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,this._store.setConfig(t),"panel"===t.layout?this.setAttribute("data-layout","panel"):this.removeAttribute("data-layout"),t.accent_color?(this.style.setProperty("--hf-accent",t.accent_color),this.style.setProperty("--hf-accent-text",function(t){const e=t.trim().replace(/^#/,"");if(3!==e.length&&6!==e.length)return"#fff";const s=3===e.length?e.split("").map(t=>t+t).join(""):e,r=parseInt(s.slice(0,2),16),a=parseInt(s.slice(2,4),16),o=parseInt(s.slice(4,6),16);if([r,a,o].some(t=>Number.isNaN(t)))return"#fff";const n=(.2126*r+.7152*a+.0722*o)/255;return n>.55?"#111":"#fff"}(t.accent_color))):(this.style.removeProperty("--hf-accent"),this.style.removeProperty("--hf-accent-text"));const e=t.density??"regular";this.setAttribute("data-density",e);const s=t.theme??"dark";this.setAttribute("data-theme",s)}willUpdate(t){t.has("hass")&&this.hass&&(this._integrationStatus?.allPresent||(this._integrationStatus=function(t){const e=t.services??{},s=t.states??{},r=[],a=e.music_assistant??{},o=e.mass_queue??{},n=e.wiim??{},l=!!a.play_media;r.push({target:"MA",label:"service music_assistant.play_media",matched:l});const d=["get_queue_items","remove_queue_item","move_queue_item_up","play_queue_item","clear_queue_from_here"],c=d.find(t=>!!o[t]),h=!!c;r.push({target:"QueueActions",label:`mass_queue domain has any of ${d.join(", ")}`,matched:h});const p=Object.keys(o);p.length>0&&r.push({target:"QueueActions",label:`mass_queue domain services found: ${p.slice(0,6).join(", ")}${p.length>6?"…":""}`,matched:!0});const u=["play_preset","play_url","set_eq","get_queue"],f=u.find(t=>!!n[t]),m=!!f;r.push({target:"WiiM",label:`wiim domain has any of ${u.join(", ")}`,matched:m});const v=Object.keys(n);v.length>0&&r.push({target:"WiiM",label:`wiim domain services found: ${v.slice(0,6).join(", ")}${v.length>6?"…":""}`,matched:!0});const g=Object.values(s).some(t=>{if(!t.entity_id.startsWith("media_player."))return!1;const e=t.attributes.group_role;return"master"===e||"slave"===e||"solo"===e});r.push({target:"WiiM",label:"any media_player.* attribute group_role is master/slave/solo",matched:g});const b=m||g;return{hasMA:l,hasQueueActions:h,hasWiim:b,allPresent:l&&h&&b,diagnostics:r}}(this.hass)),this._integrationStatus.allPresent&&this._store.setHass(this.hass))}getCardSize(){return 12}static getConfigElement(){return document.createElement("hf-card-editor")}static getStubConfig(){return{type:"custom:homefront-music-card"}}disconnectedCallback(){super.disconnectedCallback(),this._store.dispose()}render(){return this._integrationStatus&&!this._integrationStatus.allPresent?X`<hf-setup-help .status=${this._integrationStatus}></hf-setup-help>`:X`
      <div class="frame">
        ${this._renderTitle()}
        <hf-group-chip-rail .store=${this._store}></hf-group-chip-rail>
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
      <hf-group-sheet .store=${this._store}></hf-group-sheet>
      <hf-toast-bar .store=${this._store}></hf-toast-bar>
      ${this._config?.debug?this._renderDebugOverlay():""}
    `}_renderDebugOverlay(){const t=this._store.diagnosticNotes;return X`
      <div class="debug-overlay">
        <div class="debug-overlay-title">
          ${this._store.isHassMode?"HASS MODE":"MOCK MODE"} · zone discovery
        </div>
        ${t.length>0?t.map(t=>X`<div class="debug-overlay-line">${t}</div>`):X`<div class="debug-overlay-line">(no diagnostics yet)</div>`}
      </div>
    `}_renderTitle(){const t=this._config?.zones?.length??0,e=this._store.groups.filter(t=>t.playing).length,s=t>0?` · ${t} zone${1===t?"":"s"}`:" · mock";return X`
      <div class="title-row">
        <span class="title-icon">${Qt.note({size:14})}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">
          ${e} group${1===e?"":"s"} playing${s}
        </span>
      </div>
    `}_renderActiveTab(){switch(this._store.tab){case"player":return X`<hf-player-tab .store=${this._store}></hf-player-tab>`;case"browser":return X`<hf-browse-tab .store=${this._store}></hf-browse-tab>`;case"search":return X`<hf-search-tab .store=${this._store}></hf-search-tab>`;case"queue":return X`<hf-queue-tab .store=${this._store}></hf-queue-tab>`;case"group":return X`<hf-output-tab .store=${this._store}></hf-output-tab>`}}_renderTabBar(){return X`
      <div class="tab-bar" role="tablist">
        ${Ie.map(t=>{const e=this._store.tab===t.id;return X`
            <button
              class="tab"
              role="tab"
              aria-selected=${e}
              @click=${()=>this._store.setTab(t.id)}
            >
              ${Qt[t.icon]({size:18})}
              <span class="tab-label">${t.label}</span>
            </button>
          `})}
      </div>
    `}};Ce.styles=[jt,l`
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
           Use height:100% so HA's hui-panel-view governs our size, but
           cap at viewport height minus the HA header so the card never
           grows taller than the screen (which in edit mode would push
           HA's edit affordance off the bottom and require zoom-out).
           Inner tab contents have their own overscroll containment;
           the host stays scrollable so edit-mode toolbars below remain
           reachable. */
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: calc(100vh - var(--header-height, 56px));
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
        overscroll-behavior: contain;
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
    `],t([ut({attribute:!1})],Ce.prototype,"hass",void 0),t([ft()],Ce.prototype,"_config",void 0),t([ft()],Ce.prototype,"_integrationStatus",void 0),Ce=t([ct("homefront-music-card")],Ce);export{Ce as HomefrontMusicCard};
