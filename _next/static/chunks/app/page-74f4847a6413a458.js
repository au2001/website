(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8527:function(e,t,n){"use strict";n.r(t);var o,r=n(952);function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}t.default=function(e){return r.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 256 512"},e),o||(o=r.createElement("path",{d:"M64 448c-8.188 0-16.38-3.125-22.62-9.375-12.5-12.5-12.5-32.75 0-45.25L178.8 256 41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"})))}},39:function(e,t,n){Promise.resolve().then(n.t.bind(n,8326,23)),Promise.resolve().then(n.t.bind(n,4699,23)),Promise.resolve().then(n.bind(n,4713)),Promise.resolve().then(n.t.bind(n,7289,23)),Promise.resolve().then(n.t.bind(n,43,23)),Promise.resolve().then(n.bind(n,5813)),Promise.resolve().then(n.t.bind(n,3044,23)),Promise.resolve().then(n.t.bind(n,6843,23)),Promise.resolve().then(n.t.bind(n,9124,23)),Promise.resolve().then(n.t.bind(n,3583,23)),Promise.resolve().then(n.t.bind(n,1069,23)),Promise.resolve().then(n.t.bind(n,7961,23)),Promise.resolve().then(n.bind(n,8527))},4713:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Clipboard}});var o=n(7437);function Clipboard(e){let{text:t,message:n,children:r}=e;function onClick(e){if(e.preventDefault(),navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t);else{let e=document.createElement("input");e.value=t,document.body.appendChild(e),e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(e)}void 0!==n&&alert(n)}return(0,o.jsx)("a",{onClick:onClick,children:r})}n(2265)},5813:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Header}});var o=n(7437),r=n(2265),i=n(4033),l=n(1396),a=n.n(l),c=n(1806),s=n.n(c);function Header(){let e=(0,i.usePathname)(),t=r.useMemo(()=>"/"===e?"about":e.startsWith("/learn")?"learn":e.startsWith("/portfolio")?"portfolio":e.startsWith("/contact")?"contact":void 0,[e]);return(0,o.jsx)("header",{className:s().header,children:(0,o.jsx)("nav",{children:(0,o.jsxs)("ul",{className:s().links,children:[(0,o.jsx)("li",{children:(0,o.jsx)(a(),{href:"/",className:"about"===t?s().active:void 0,children:"About"})}),(0,o.jsx)("li",{children:(0,o.jsx)(a(),{href:"/contact",className:"contact"===t?s().active:void 0,children:"Contact"})}),(0,o.jsx)("li",{children:(0,o.jsxs)(a(),{href:"https://github.com/au2001/website",target:"_blank",rel:"nofollow external noreferrer noopener",children:[(0,o.jsx)("img",{src:"/images/socials/GitHub.svg",alt:"",className:s().logo}),"GitHub"]})})]})})})}},4699:function(e){e.exports={fold:"page_fold__G8T4Z",spacer:"page_spacer__Ir9Ky"}},43:function(e){e.exports={background:"background_background__RQVZZ"}},9124:function(e){e.exports={heading:"clients_heading__iXJHD",clients:"clients_clients__zt2Iw",note:"clients_note__Z1CLz"}},7961:function(e){e.exports={heading:"contact-footer_heading__svTPv",socials:"contact-footer_socials__F_lGO",link:"contact-footer_link__Q8eOd",icon:"contact-footer_icon__3_M9r"}},7289:function(e){e.exports={footer:"footer_footer__mQF6i"}},1806:function(e){e.exports={header:"header_header__w2BOs",links:"header_links__a0z2t",active:"header_active__PzFV3",logo:"header_logo__9b1Md"}},6843:function(e){e.exports={heading:"interview_heading__VaUBg",interview:"interview_interview__lyj4f"}},1069:function(e){e.exports={timelineDesktop:"timeline-row_timelineDesktop___YNzX",active:"timeline-row_active___ZuPX",activeCap:"timeline-row_activeCap___0h3s",timelineMobile:"timeline-row_timelineMobile__IUOdq",spacing:"timeline-row_spacing__ipZt5",spacingMobile:"timeline-row_spacingMobile__p7MMg",hoursMobile:"timeline-row_hoursMobile__J5ANj"}},3583:function(e){e.exports={timeline:"timeline_timeline__y8hBW",legend:"timeline_legend___JmG6"}},3044:function(e){e.exports={heading:"title_heading__mcCwe",pretitle:"title_pretitle__n72MK",title:"title_title__llusv",subtitle:"title_subtitle__6FQ6u",center:"title_center__eyYyD"}},7673:function(e,t){"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=Symbol.for("react.element"),o=Symbol.for("react.portal"),r=(Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.iterator);function A(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=r&&e[r]||e["@@iterator"])?e:null}var i={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},l=Object.assign,a={};function E(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||i}function F(){}function G(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||i}E.prototype.isReactComponent={},E.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},F.prototype=E.prototype;var c=G.prototype=new F;c.constructor=G,l(c,E.prototype),c.isPureReactComponent=!0;var s=Array.isArray,u=Object.prototype.hasOwnProperty,f={key:!0,ref:!0,__self:!0,__source:!0};function M(e,t,o){var r,i={},l=null,a=null;if(null!=t)for(r in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(l=""+t.key),t)u.call(t,r)&&!f.hasOwnProperty(r)&&(i[r]=t[r]);var c=arguments.length-2;if(1===c)i.children=o;else if(1<c){for(var s=Array(c),_=0;_<c;_++)s[_]=arguments[_+2];i.children=s}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===i[r]&&(i[r]=c[r]);return{$$typeof:n,type:e,key:l,ref:a,props:i,_owner:null}}function N(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function O(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}function escape(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}var _=/\/+/g;function Q(e,t){return"object"==typeof e&&null!==e&&null!=e.key?escape(""+e.key):t.toString(36)}t.createElement=M},952:function(e,t,n){"use strict";e.exports=n(7673)}},function(e){e.O(0,[569,971,472,744],function(){return e(e.s=39)}),_N_E=e.O()}]);