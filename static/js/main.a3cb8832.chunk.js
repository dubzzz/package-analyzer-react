(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,a){e.exports=a(400)},164:function(e,t,a){},166:function(e,t,a){},169:function(e,t,a){},244:function(e,t,a){},246:function(e,t,a){},400:function(e,t,a){"use strict";a.r(t);var n,r=a(2),c=a.n(r),s=a(27),o=a.n(s),u=a(49),i=a(32),l=a(152),p=a(56),h=a(22),d="FETCH_PACKAGES_LIST",f="FETCH_MULTIPLE_PACKAGES_DETAILS";!function(e){e[e.OnGoing=-1]="OnGoing",e[e.Error=0]="Error",e[e.Success=1]="Success"}(n||(n={}));var k={suggestions:{query:"",results:[]},knownDependencies:{}},m=Object(i.c)({packageDetails:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PACKAGES_LIST":var a=t.payload,r=a.query,c=a.searchResults;return Object(h.a)({},e,{suggestions:{query:r,results:c}});case"ERROR_PACKAGES_LIST":var s=t.payload,o=s.query,u=s.error;return Object(h.a)({},e,{suggestions:{query:o,results:[],error:u}});case"SWITCH_TO_SEARCH_MODE":return Object(h.a)({},e,{packageDetailsMode:void 0});case"SWITCH_TO_PACKAGE_DETAILS":var i=t.payload.packageName;return Object(h.a)({},e,{packageDetailsMode:i});case"START_MULTIPLE_PACKAGES_DETAILS":var l=t.payload.packages,d={},f=!0,m=!1,y=void 0;try{for(var b,v=l[Symbol.iterator]();!(f=(b=v.next()).done);f=!0)d[b.value]={status:n.OnGoing,dependencies:[]}}catch(w){m=!0,y=w}finally{try{f||null==v.return||v.return()}finally{if(m)throw y}}return Object(h.a)({},e,{knownDependencies:Object(h.a)({},e.knownDependencies,d)});case"UPDATE_PACKAGE_DETAILS":var g=t.payload,E=g.packageName,O=g.deps;return Object(h.a)({},e,{knownDependencies:Object(h.a)({},e.knownDependencies,Object(p.a)({},E,{status:n.Success,dependencies:Object.keys(O.collected.metadata.dependencies||[])}))});case"ERROR_PACKAGE_DETAILS":var j=t.payload,A=j.packageName,S=j.error;return Object(h.a)({},e,{knownDependencies:Object(h.a)({},e.knownDependencies,Object(p.a)({},A,{status:n.Error,statusText:S,dependencies:[]}))});default:return e}}}),y=a(25),b=a.n(y),v=a(26),g=function(e,t){return{type:d,payload:{query:e,numResults:t}}},E=function(e,t){return{type:"UPDATE_PACKAGES_LIST",payload:{query:e,searchResults:t}}},O=function(e,t){return{type:"ERROR_PACKAGES_LIST",payload:{query:e,error:t}}},j=function(){return{type:"SWITCH_TO_SEARCH_MODE",payload:{}}},A=function(e){return{type:"SWITCH_TO_PACKAGE_DETAILS",payload:{packageName:e}}},S=function(e){return{type:f,payload:{packages:e}}},w=function(e){return{type:"START_MULTIPLE_PACKAGES_DETAILS",payload:{packages:e}}},T=function(e,t){return{type:"UPDATE_PACKAGE_DETAILS",payload:{packageName:e,deps:t}}},D=function(e,t){return{type:"ERROR_PACKAGE_DETAILS",payload:{packageName:e,error:t}}},_=a(86),P=a(23),x=a(24),C=function(){function e(){Object(P.a)(this,e)}return Object(x.a)(e,null,[{key:"deps",value:function(){var e=Object(_.a)(b.a.mark(function e(t){var a,n;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://api.npms.io/v2/package/".concat(encodeURIComponent(t)),e.next=3,fetch(a);case 3:if((n=e.sent).ok){e.next=6;break}throw new Error("[Status: ".concat(n.status,"] ").concat(n.statusText));case 6:return e.next=8,n.json();case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"list",value:function(){var e=Object(_.a)(b.a.mark(function e(t,a){var n,r;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t.length){e.next=2;break}return e.abrupt("return",[]);case 2:return n="https://api.npms.io/v2/search/suggestions?q=".concat(encodeURIComponent(t),"&size=").concat(a),e.next=5,fetch(n);case 5:if((r=e.sent).ok){e.next=8;break}throw new Error("[Status: ".concat(r.status,"] ").concat(r.statusText));case 8:return e.next=10,r.json();case 10:return e.abrupt("return",e.sent);case 11:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}()}]),e}(),N=b.a.mark(L),R=b.a.mark(q),I=b.a.mark(M);function L(e){var t,a,n,r;return b.a.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,a=t.query,n=t.numResults,c.prev=1,c.next=4,Object(v.a)(function(){return C.list(a,n)});case 4:return r=c.sent,c.next=7,Object(v.b)(E(a,r));case 7:c.next=13;break;case 9:return c.prev=9,c.t0=c.catch(1),c.next=13,Object(v.b)(O(a,c.t0.message||String(c.t0)));case 13:case"end":return c.stop()}},N,this,[[1,9]])}function q(e){var t,a,n,r,c,s,o;return b.a.wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return t=e.payload.packages,u.next=3,Object(v.b)(w(t));case 3:a=!0,n=!1,r=void 0,u.prev=6,c=b.a.mark(function e(){var t,a;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.value,e.prev=1,e.next=4,Object(v.a)(function(){return C.deps(t)});case 4:return a=e.sent,e.next=7,Object(v.b)(T(t,a));case 7:e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(1),e.next=13,Object(v.b)(D(t,e.t0.message||String(e.t0)));case 13:case"end":return e.stop()}},e,this,[[1,9]])}),s=t[Symbol.iterator]();case 9:if(a=(o=s.next()).done){u.next=14;break}return u.delegateYield(c(),"t0",11);case 11:a=!0,u.next=9;break;case 14:u.next=20;break;case 16:u.prev=16,u.t1=u.catch(6),n=!0,r=u.t1;case 20:u.prev=20,u.prev=21,a||null==s.return||s.return();case 23:if(u.prev=23,!n){u.next=26;break}throw r;case 26:return u.finish(23);case 27:return u.finish(20);case 28:case"end":return u.stop()}},R,this,[[6,16,20,28],[21,,23,27]])}function M(){return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.d)(d,L);case 2:return e.next=4,Object(v.c)(f,q);case 4:case"end":return e.stop()}},I,this)}var G=Object(l.a)(),K=Object(i.d)(m,Object(i.a)(G));G.run(M);a(164);var Q=a(29),H=a(28),U=a(30),z=(a(166),a(90),a(140)),W=a.n(z),J=(a(169),a(132)),B=a.n(J),F=a(133),Y=a.n(F),V=function(e){function t(){return Object(P.a)(this,t),Object(Q.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(U.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"query-error"},c.a.createElement("p",null,"Query failed with error: ",this.props.error),c.a.createElement(B.a,{variant:"contained",onClick:function(){return e.props.retry()}},"Retry ",c.a.createElement(Y.a,null)))}}]),t}(c.a.Component),X=(a(244),a(246),a(134)),Z=a.n(X),$=a(136),ee=a.n($),te=a(68),ae=a.n(te),ne=a(135),re=a.n(ne),ce=a(57),se=a.n(ce),oe=function(e){function t(){return Object(P.a)(this,t),Object(Q.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(U.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this,t=this.props.package.name,a=this.props.package.author?this.props.package.author.name:"N.A",n=this.props.score.detail,r={maintenance:Math.round(5*n.maintenance),popularity:Math.round(5*n.popularity),quality:Math.round(5*n.quality)};return c.a.createElement(Z.a,{className:"package-card",onClick:function(){return e.props.select()}},c.a.createElement(re.a,{className:"card-header",avatar:c.a.createElement(se.a,{className:"card-avatar","aria-label":t},t[0]||""),title:t,subheader:this.props.package.version}),c.a.createElement(ee.a,null,c.a.createElement(ae.a,{color:"textSecondary",gutterBottom:!0},a),c.a.createElement(ae.a,{component:"p"},this.props.package.description),c.a.createElement("div",{className:"package-scores"},c.a.createElement(se.a,{title:"maintenance [0-5]",className:"package-score-".concat(r.maintenance)},r.maintenance),c.a.createElement(se.a,{title:"popularity [0-5]",className:"package-score-".concat(r.popularity)},r.popularity),c.a.createElement(se.a,{title:"quality [0-5]",className:"package-score-".concat(r.quality)},r.quality))))}}]),t}(c.a.Component),ue=function(e){function t(){return Object(P.a)(this,t),Object(Q.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(U.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this,t="query-results";return 0===this.props.query.length?c.a.createElement("div",{id:t}):0===this.props.results.length?c.a.createElement("div",{id:t},c.a.createElement("p",null,"No results")):c.a.createElement("div",{id:t},c.a.createElement("div",{className:"query-results-cards"},c.a.createElement("ul",null,this.props.results.map(function(t,a){return c.a.createElement("li",{key:"li-".concat(a)},c.a.createElement(oe,{key:a,package:t.package,score:t.score,searchScore:t.searchScore,select:function(){return e.props.selectPackage(t.package.name)}}))}))))}}]),t}(c.a.Component),ie=a(141),le=a.n(ie),pe=a(137),he=a.n(pe),de=a(139),fe=a.n(de),ke=a(138),me=a.n(ke),ye=function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(Q.a)(this,Object(H.a)(t).call(this,e))).state={currentQuery:""},a}return Object(U.a)(t,e),Object(x.a)(t,[{key:"fetchQuery",value:function(e){this.props.fullSize||this.props.switchToSearchModeAction(),this.props.fetchPackagesListAction(e,t.NumResultsPerQuery)}},{key:"fetch",value:function(e){var t=e.currentTarget.value;this.setState({currentQuery:t}),this.fetchQuery(t)}},{key:"openPackage",value:function(e){this.props.switchToPackageDetailsModeAction(e)}},{key:"render",value:function(){var e=this,t=this.state.currentQuery!==this.props.query?c.a.createElement(he.a,null):null==this.props.error?c.a.createElement(me.a,null):c.a.createElement(fe.a,null);return c.a.createElement("div",{id:"package-selector",className:this.props.fullSize?"full-size-selector":"side-selector"},c.a.createElement(W.a,{id:"package-name-input",label:"Package Name",variant:"outlined",onChange:function(t){return e.fetch(t)},onClick:function(){return e.props.switchToSearchModeAction()},value:this.state.currentQuery,InputProps:{endAdornment:c.a.createElement(le.a,{position:"start"},t)}}),this.props.fullSize?null==this.props.error?c.a.createElement(ue,{query:this.props.query,results:this.props.results,selectPackage:function(t){return e.openPackage(t)}}):c.a.createElement(V,{error:this.props.error,retry:function(){return e.fetchQuery(e.state.currentQuery)}}):void 0)}}]),t}(c.a.Component);ye.NumResultsPerQuery=9;var be=Object(u.b)(function(e){return Object(h.a)({},e.packageDetails.suggestions,{fullSize:null==e.packageDetails.packageDetailsMode})},function(e){return Object(h.a)({},Object(i.b)({fetchPackagesListAction:g,switchToPackageDetailsModeAction:A,switchToSearchModeAction:j},e))})(ye),ve=a(151),ge=function(e){function t(e){var a;return Object(P.a)(this,t),(a=Object(Q.a)(this,Object(H.a)(t).call(this,e))).state=a.computeState(a.props),a}return Object(U.a)(t,e),Object(x.a)(t,[{key:"computeState",value:function(e){for(var t=[],a=[],r=[],c=!0,s={},o=null!=e.packageName?[e.packageName]:[];o.length>0;){var u=o.pop();s[u]=!0;var i=e.knownDependencies[u];if(null!=i){switch(i.status){case n.Error:t.push({color:"red",label:u});break;case n.OnGoing:t.push({color:"green",label:u}),c=!1;break;case n.Success:default:t.push({color:"blue",label:u})}var l=!0,p=!1,h=void 0;try{for(var d,f=i.dependencies[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var k=d.value;a.push({target:u,source:k}),s[k]||o.push(k)}}catch(m){p=!0,h=m}finally{try{l||null==f.return||f.return()}finally{if(p)throw h}}}else t.push({color:"black",label:u}),r.push(u),c=!1}return r.length>0&&(console.warn("Asking some more packages: ",r),this.props.fetchMultiplePackagesDetailsAction(r)),c?{data:{nodes:t,links:a}}:{}}},{key:"componentWillReceiveProps",value:function(e){var t=this.computeState(e);JSON.stringify(this.state)!==JSON.stringify(t)&&this.setState(t)}},{key:"hoverNode",value:function(e){console.log("Hover: ",e)}},{key:"clickNode",value:function(e){console.log("Click: ",e)}},{key:"render",value:function(){if(null==this.props.packageName||null==this.state.data)return c.a.createElement("div",{className:"package-details no-display"});var e=this.state.data.nodes.map(function(e){return{id:e.label,color:e.color}}),t=this.state.data.links;return c.a.createElement("div",{className:"package-details"},c.a.createElement("h2",null,this.props.packageName," (",this.state.data.nodes.length," packages)"),c.a.createElement(ve.a,{graphData:{nodes:e,links:t},nodeLabel:"id",width:800,height:600,linkDirectionalParticles:1}))}}]),t}(c.a.Component);var Ee=Object(u.b)(function(e){return{knownDependencies:e.packageDetails.knownDependencies,packageName:e.packageDetails.packageDetailsMode}},function(e){return Object(h.a)({},Object(i.b)({fetchMultiplePackagesDetailsAction:S},e))})(ge),Oe=function(e){function t(){return Object(P.a)(this,t),Object(Q.a)(this,Object(H.a)(t).apply(this,arguments))}return Object(U.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{id:"main"},c.a.createElement("h1",null,"Package Analyzer"),c.a.createElement(be,null),c.a.createElement(Ee,null))}}]),t}(r.Component),je=document.getElementById("root");o.a.render(c.a.createElement(u.a,{store:K},c.a.createElement(Oe,null)),je)},90:function(e,t,a){}},[[153,2,1]]]);
//# sourceMappingURL=main.a3cb8832.chunk.js.map