(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{217:function(e,t,a){},524:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(48),s=a.n(r),i=(a(217),a(41)),l=a(6),o=a(525),d=a(18),j=a(169),b=a(19),u=a(186),x=a(604),h=a(22),O=a.n(h),p=a(34),f=a(12),m=a(85),g=a(607),v=a(608),y=a(187),C=a(535),w=a(609),k=a(612),S=a(613),_=a(611),M=a(170),E=a(171),A=a(583),T=a(1);function I(e){var t=Object(M.a)(/(<span class="math\x2Dcontainer" id="[0-9a-z]+">)(.*?)(?=<\/span>|$)(<\/span>)/g,{open:1,formel:2,close:3});return e=e.replaceAll(t,"$$$<formel>$$")}function L(e){var t=e.text;return Object(T.jsx)(T.Fragment,{children:Object(T.jsx)(A.a,{dynamic:!0,children:Object(E.a)(I(t))})})}var D=a(65),P=a(595),W=a(599),q=a(584),z=["node","inline","className","children"];function B(e){var t,a=e.text;return Object(T.jsx)(P.a,{className:"code-block",components:{code:function(e){e.node;var t=e.inline,a=e.className,n=e.children,c=Object(D.a)(e,z),r=/language-(\w+)/.exec(a||"");return!t&&r?Object(T.jsx)(W.a,Object(f.a)(Object(f.a)({wrapLongLines:!0,style:q.a,language:r[1],PreTag:"div"},c),{},{children:String(n).replace(/\n$/,"")})):Object(T.jsx)("code",Object(f.a)(Object(f.a)({className:a},c),{},{children:n}))}},children:(t=a,"```java\n".concat(t,"\n```"))})}function N(e){var t=e.result,a=t.title,n=t.body,c="java"===t.language?Object(T.jsx)(B,{text:n}):Object(T.jsx)(L,{text:n});return Object(T.jsx)(T.Fragment,{children:Object(T.jsx)(w.a,{sx:{mb:4},children:Object(T.jsxs)(_.a,{children:[Object(T.jsx)(k.a,{title:a,sx:{pb:0}}),Object(T.jsx)(S.a,{sx:{py:0},children:c})]})})})}var R=a(605),$=a(606),F=a(188),G=a(190),U=a(189),H=a(181),J=a(182),V=a(33),X=a(591),Q=a(3),K=a(104),Y=a.n(K),Z=a(5),ee=a(111),te=a(32),ae=Object(Z.a)("div")((function(e){var t=e.theme;return Object(Q.a)({position:"relative",borderRadius:t.shape.borderRadius,backgroundColor:Object(ee.a)(t.palette.text.primary,.25),"&:hover":{backgroundColor:Object(ee.a)(t.palette.text.primary,.45)},marginLeft:t.spacing(2),marginRight:t.spacing(2),width:"100%"},t.breakpoints.up("sm"),{marginLeft:t.spacing(1),width:"auto"})})),ne=Object(Z.a)("div")((function(e){return{padding:e.theme.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}})),ce=Object(Z.a)(te.c)((function(e){var t=e.theme;return{color:"inherit","& .MuiInputBase-input":Object(Q.a)({padding:t.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(t.spacing(4),")"),transition:t.transitions.create("width"),width:"100%"},t.breakpoints.up("sm"),{width:"15ch","&:focus":{width:"40ch"}})}}));function re(e){var t=e.placeholder,a=e.value,n=e.onChange;return Object(T.jsxs)(ae,{children:[Object(T.jsx)(ne,{children:Object(T.jsx)(Y.a,{})}),Object(T.jsx)(ce,{placeholder:t,value:a,onChange:n,inputProps:{"aria-label":"search"}})]})}var se=Object(d.b)({key:"query",default:{database:"",model:"",index:"",language:"english",text:"",url:"",code:"",equation:"",mode:"default",page:1}}),ie=a.p+"static/media/SELMA-Logo_code.d94e08e5.svg",le=a(616),oe=a(619),de=a(617),je=a(590),be=a(180),ue=a.n(be),xe=a(615),he=a(600),Oe=a(536),pe=a(618),fe=c.a.createContext({toggleColorMode:function(){}}),me=a(614),ge=Object(Z.a)(me.a)((function(e){var t=e.theme;return{width:62,height:34,padding:7,"& .MuiSwitch-switchBase":{margin:1,padding:0,transform:"translateX(6px)","&.Mui-checked":{color:"#fff",transform:"translateX(22px)","& .MuiSwitch-thumb:before":{backgroundImage:'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="'.concat(encodeURIComponent("#fff"),'" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>\')')},"& + .MuiSwitch-track":{opacity:1,backgroundColor:"dark"===t.palette.mode?"#8796A5":"#aab4be"}}},"& .MuiSwitch-thumb":{backgroundColor:"dark"===t.palette.mode?"#003892":"#001e3c",width:32,height:32,"&:before":{content:"''",position:"absolute",width:"100%",height:"100%",left:0,top:0,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundImage:'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="'.concat(encodeURIComponent("#fff"),'" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>\')')}},"& .MuiSwitch-track":{opacity:1,backgroundColor:"dark"===t.palette.mode?"#8796A5":"#aab4be",borderRadius:10}}})),ve=a(15),ye="/api/v1",Ce={"Content-Type":"application/json"},we=Object(d.c)({key:"dataStructure",get:function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/data-structure"));case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}),ke=Object(d.c)({key:"dbs",get:function(e){var t=(0,e.get)(we);return Object.keys(t)}}),Se=(Object(d.c)({key:"filteredModels",get:function(e){var t=e.get,a=t(se).database,n=t(we);return n[a]?Object.keys(n[a]):[]}}),Object(d.c)({key:"filteredIndexes",get:function(e){var t=e.get,a=t(we),n=t(se),c=n.database,r=n.model;return a[c]&&a[c][r]?a[c][r]:[]}}),Object(d.c)({key:"languages",get:function(){return["english"]}})),_e={name:"",model:"",mode:"default",language:"",text:"",code:"",equation:"",url:"",database:"",index:""},Me=Object(d.b)({key:"examples",default:Object(d.c)({key:"examplesLoader",get:function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/query-templates"));case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()})}),Ee=Object(d.b)({key:"configs",default:Object(d.c)({key:"configsLoader",get:function(){var e=Object(p.a)(O.a.mark((function e(){var t,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/configs"));case 2:return t=e.sent,e.next=5,t.json();case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()})});function Ae(){var e=Object(d.f)(Me),t=Object(l.a)(e,2)[1],a=function(){var e=Object(p.a)(O.a.mark((function e(a){var n,c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/query-templates"),{method:"POST",body:JSON.stringify(a),headers:Ce});case 2:return n=e.sent,e.next=5,n.json();case 5:c=e.sent,r=c.queryTemplate,t((function(e){return[].concat(Object(ve.a)(e),[r])}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n=function(){var e=Object(p.a)(O.a.mark((function e(a){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/query-templates/").concat(a),{method:"DELETE",headers:Ce});case 2:t((function(e){return e.filter((function(e){return e.id!==a}))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{createExample:a,deleteExample:n}}function Te(){var e=Object(d.f)(Ee),t=Object(l.a)(e,2)[1],a=function(){var e=Object(p.a)(O.a.mark((function e(a){var n,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(ye,"/configs"),{method:"POST",body:JSON.stringify(a),headers:Ce});case 2:return n=e.sent,e.next=5,n.json();case 5:c=e.sent,t(c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{updateConfigs:a}}function Ie(){var e=c.a.useContext(fe),t=Te().updateConfigs,a=c.a.useState(!1),n=Object(l.a)(a,2),r=n[0],s=n[1],i=Object(d.f)(Ee),o=Object(l.a)(i,2),j=o[0],b=o[1],u=c.a.useState(j),x=Object(l.a)(u,2),h=x[0],O=x[1],p=function(e){var t=e.target,a=t.name,n=t.checked;O((function(e){return Object(f.a)(Object(f.a)({},e),{},{allowed_search_modes:Object(f.a)(Object(f.a)({},e.allowed_search_modes),{},Object(Q.a)({},a,n))})}))};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(xe.a,{size:"large",edge:"end","aria-haspopup":"true",onClick:function(){return s(!0)},sx:{ml:2},children:Object(T.jsx)(ue.a,{})}),Object(T.jsxs)(le.a,{fullWidth:!0,maxWidth:"sm",open:r,onClose:function(){s(!1)},children:[Object(T.jsx)(je.a,{children:"Settings"}),Object(T.jsx)(de.a,{children:Object(T.jsxs)(X.a,{spacing:2,children:[Object(T.jsx)(C.a,{variant:"subtitle1",children:"Allowed search modes:"}),Object(T.jsxs)(Oe.a,{row:!0,sx:{justifyContent:"space-evenly"},children:[Object(T.jsx)(pe.a,{control:Object(T.jsx)(he.a,{disabled:!0,onChange:p,checked:!0,name:"default",inputProps:{"aria-label":"allow default search"}}),label:"Default"}),Object(T.jsx)(pe.a,{control:Object(T.jsx)(he.a,{onChange:p,checked:h.allowed_search_modes.separated,name:"separated",inputProps:{"aria-label":"allow separated search"}}),label:"Separated"}),Object(T.jsx)(pe.a,{control:Object(T.jsx)(he.a,{onChange:p,checked:h.allowed_search_modes.url,name:"url",inputProps:{"aria-label":"allow url or id search"}}),label:"URL or ID"}),Object(T.jsx)(pe.a,{control:Object(T.jsx)(he.a,{onChange:p,checked:h.allowed_search_modes.file,name:"file",inputProps:{"aria-label":"allow file search"}}),label:"File"})]}),Object(T.jsx)(C.a,{variant:"subtitle1",children:"Theme:"}),Object(T.jsx)(X.a,{direction:"row",spacing:1,justifyContent:"center",alignItems:"center",children:Object(T.jsx)(ge,{onClick:e.toggleColorMode})})]})}),Object(T.jsxs)(oe.a,{children:[Object(T.jsx)(U.a,{onClick:function(){s(!1),O(j)},children:"Cancel"}),Object(T.jsx)(U.a,{onClick:function(){s(!1),t(h),b(h)},children:"Apply"})]})]})]})}var Le=["children","value","index"];function De(e){var t=e.children,a=e.window,n=Object(H.a)({target:a?a():void 0});return Object(T.jsx)(J.a,{appear:!1,direction:"down",in:!n,children:t})}function Pe(e){var t=e.children,a=e.value,n=e.index,c=Object(D.a)(e,Le);return Object(T.jsx)("div",Object(f.a)(Object(f.a)({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},c),{},{children:a===n&&Object(T.jsx)(m.a,{sx:{p:3},children:t})}))}function We(){var e=Object(V.a)(),t=c.a.useState(0),a=Object(l.a)(t,2),n=a[0],r=a[1],s=Object(d.f)(se),o=Object(l.a)(s,2),j=o[0],b=o[1],u=Object(i.d)(),x=Object(l.a)(u,2)[1],h=c.a.useState(j.text),O=Object(l.a)(h,2),p=O[0],g=O[1],v="light"===e.palette.mode?"dark-logo":"light-logo";return Object(T.jsx)(T.Fragment,{children:Object(T.jsx)(De,{children:Object(T.jsxs)(R.a,{position:"fixed",elevation:0,sx:{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:"secondary.main"},children:[Object(T.jsxs)($.a,{children:[Object(T.jsx)(m.a,{sx:{display:"block",height:"32px",width:"32px",paddingRight:"64px"},children:Object(T.jsx)(i.b,{to:{pathname:"/"},style:{textDecoration:"none",color:"#ffffff"},children:Object(T.jsxs)(X.a,{direction:"row",children:[Object(T.jsx)("img",{className:v,src:ie,alt:"Selma retrieval system"}),Object(T.jsx)(C.a,{variant:"h6",sx:{ml:2},children:"SELMA"})]})})}),Object(T.jsx)(Pe,{value:n,index:0,children:Object(T.jsxs)(m.a,{onSubmit:function(e){e.preventDefault(),x({text:p,database:j.database,model:j.model,index:j.index,language:j.language,page:"1"})},component:"form",sx:{display:"flex",alignItems:"center"},children:[Object(T.jsx)(re,{value:p,onChange:function(e){var t=e.target.value;g(t)},placeholder:"Search"}),Object(T.jsx)(U.a,{type:"submit",variant:"contained",children:"Go"})]})}),Object(T.jsx)(m.a,{sx:{flexGrow:1}}),Object(T.jsx)(Ie,{})]}),Object(T.jsx)($.a,{variant:"dense",children:Object(T.jsx)(F.a,{value:n,onChange:function(e,t){var a={0:"default",1:"separated",2:"url",3:"file"}[t];r(t),b(Object(f.a)(Object(f.a)({},j),{},{mode:a}))},style:{height:"32px"},children:Object(T.jsx)(G.a,{label:"Default"})})})]})})})}function qe(){var e=Object(i.d)(),t=Object(l.a)(e,1)[0],a=c.a.useState(void 0),n=Object(l.a)(a,2),r=n[0],s=n[1],o=c.a.useState(!0),j=Object(l.a)(o,2),u=j[0],x=j[1],h=c.a.useState(10),w=Object(l.a)(h,1)[0],k=Object(d.f)(se),S=Object(l.a)(k,2),_=S[0],M=S[1],E=Number(t.get("page")),A=t.get("text"),I=t.get("database"),L=t.get("model"),D=t.get("index"),P=Object(b.g)();c.a.useEffect((function(){M(Object(f.a)(Object(f.a)({},_),{text:A,database:I,model:L,index:D,page:E}));var e=function(){var e=Object(p.a)(O.a.mark((function e(){var t,a,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="/api/v1/search?"+"text=".concat(A,"&")+"database=".concat(I,"&")+"model=".concat(L,"&")+"index=".concat(D,"&")+"page=".concat(E,"&")+"model-language=english",e.next=3,fetch(t);case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,s(n.results),x(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();x(!0),e()}),[t]);var W=Object(T.jsx)(T.Fragment,{children:"TODO: Error"});return u?W=Object(T.jsx)(m.a,{sx:{display:"flex",justifyContent:"center"},children:Object(T.jsx)(g.a,{})}):Array.isArray(r)&&(W=0===r.length?Object(T.jsx)(C.a,{variant:"h1",color:"text.primary",children:"\ud83d\ude2d 0 Results"}):Object(T.jsxs)(T.Fragment,{children:[r.slice(0,w).map((function(e){return Object(T.jsx)(N,{result:e},e.id)})),Object(T.jsx)(m.a,{sx:{display:"flex",justifyContent:"center"},children:Object(T.jsx)(y.a,{color:"secondary",page:E,count:10,onChange:function(e,t){P({search:Object(i.c)({text:A,database:I,model:L,index:D,language:"english",page:"".concat(t)}).toString()})},sx:{mt:4,mb:8}})})]})),Object(T.jsxs)(m.a,{sx:{display:"flex",justifyContent:"center",bgcolor:"background.paper",minHeight:"100%"},children:[Object(T.jsx)(We,{}),Object(T.jsx)("main",{style:{maxWidth:"sm",display:"flex",flexDirection:"column",marginTop:"135px",paddingTop:"12px"},children:Object(T.jsx)(v.a,{maxWidth:"md",sx:{display:"flex",justifyContent:"center",flexDirection:"column",flexGrow:1},children:W})})]})}var ze=a(621),Be=a(183),Ne=a.n(Be),Re=a(596);function $e(e){var t=e.onClose,a=e.isOpen,n=e.dataStructure,r=Object(d.h)(Se),s=Object(d.f)(Ee),i=Object(l.a)(s,2),o=i[0],j=i[1],b=c.a.useState(o),u=Object(l.a)(b,2),x=u[0],h=u[1],m=Te().updateConfigs,g=c.a.useState([]),v=Object(l.a)(g,2),y=v[0],C=v[1],w=c.a.useState([]),k=Object(l.a)(w,2),S=k[0],_=k[1],M=Object(d.f)(se),E=Object(l.a)(M,2),A=E[0],I=E[1],L=Object(d.h)(ke);c.a.useEffect((function(){A.database&&n[A.database]?_(Object.keys(n[A.database])):_([]),n[A.database]&&n[A.database][A.model]?C(n[A.database][A.model]):C([])}),[A]);var D=function(e){var t=e.target,a=t.name,n=t.value;h((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(Q.a)({},a,n))}))},P=function(e){var t=e.target,a=t.name,n=t.value;I(Object(f.a)(Object(f.a)({},A),{},Object(Q.a)({},a,n)))},W=function(){var e=Object(p.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m(x),j(x),t();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(T.jsxs)(le.a,{maxWidth:"sm",fullWidth:!0,open:a,onClose:function(){return t()},children:[Object(T.jsx)(je.a,{children:"Advanced Search Settings"}),Object(T.jsx)(de.a,{children:Object(T.jsxs)(X.a,{sx:{pt:2},spacing:2,children:[Object(T.jsxs)(Re.a,{label:"Database",name:"database",value:A.database,onChange:P,select:!0,SelectProps:{native:!0},children:[Object(T.jsx)("option",{value:""}),L.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Re.a,{label:"Model",name:"model",value:A.model,onChange:P,select:!0,SelectProps:{native:!0},children:[Object(T.jsx)("option",{value:""}),S.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Re.a,{label:"Index",name:"index",value:A.index,onChange:P,select:!0,SelectProps:{native:!0},children:[Object(T.jsx)("option",{value:""}),y.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Re.a,{label:"Language",name:"language",value:A.language,onChange:P,disabled:!0,select:!0,SelectProps:{native:!0},children:[Object(T.jsx)("option",{value:""}),r.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsx)(Re.a,{onChange:D,label:"DATABASE_PATH",variant:"filled",name:"db_path",value:x.db_path}),Object(T.jsx)(Re.a,{onChange:D,label:"DB_TABLE_NAME",variant:"filled",name:"db_table_name",value:x.db_table_name}),Object(T.jsx)(Re.a,{onChange:D,label:"DB_CONTENT_ATTRIBUTE_NAME",variant:"filled",name:"db_content_attribute_name",value:x.db_content_attribute_name}),Object(T.jsx)(Re.a,{onChange:D,label:"INDEX_PATH",variant:"filled",name:"index_path",value:x.index_path}),Object(T.jsx)(U.a,{onClick:W,children:"Apply"})]})})]})}function Fe(){var e=Object(b.g)(),t=Object(d.f)(se),a=Object(l.a)(t,2),n=a[0],r=a[1],s=Object(d.h)(we),o=c.a.useState([]),j=Object(l.a)(o,2),u=j[0],x=j[1],h=c.a.useState(!1),O=Object(l.a)(h,2),p=O[0],m=O[1],g=c.a.useState({}),v=Object(l.a)(g,2),y=v[0],C=v[1];c.a.useEffect((function(){var e=Object.keys(s)[0],t=Object.keys(s[e])[0],a=s[e][t][0];r((function(n){return Object(f.a)(Object(f.a)({},n),{},{database:e,model:t,index:a})}))}),[]),c.a.useEffect((function(){n.database&&s[n.database]?x(Object.keys(s[n.database])):x([])}),[n]);var w=function(e){var t=e.target,a=t.name,c=t.value;r(Object(f.a)(Object(f.a)({},n),{},Object(Q.a)({},a,c)))};return Object(T.jsxs)(X.a,{onSubmit:function(t){t.preventDefault();var a=function(){var e={};return"default"===n.mode&&""===n.text&&(e.text="Text is required in default search mode"),""===n.database&&(e.database="Database is required"),""===n.model&&(e.model="Model is required"),""===n.index&&(e.index="This model requires an index"),e}();C(a),0===Object.keys(a).length&&e({pathname:"results",search:Object(i.c)({text:n.text,database:n.database,model:n.model,index:n.index,language:n.language,page:"1"}).toString()})},direction:"row",component:"form",role:"search",justifyContent:"center",children:[Object(T.jsxs)(Re.a,{select:!0,value:n.model,onChange:w,label:"Model",name:"model",SelectProps:{native:!0},sx:{flexGrow:1,minWidth:"192px",fieldset:{borderRadius:"4px 0 0 4px"}},children:[Object(T.jsx)("option",{value:""}),u.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsx)(Re.a,{label:"Query",name:"text",value:n.text,onChange:w,sx:{flexGrow:5,".MuiInputBase-root":{paddingRight:"8px"},fieldset:{borderRadius:"0 4px 4px 0",marginLeft:"-1px"}},InputProps:{startAdornment:Object(T.jsx)(ze.a,{position:"start",children:Object(T.jsx)(Y.a,{})}),endAdornment:Object(T.jsx)(ze.a,{position:"end",children:Object(T.jsx)(xe.a,{onClick:function(){return m(!0)},"aria-label":"advanced search",size:"large",children:Object(T.jsx)(Ne.a,{})})})}}),Object(T.jsx)($e,{errors:y,dataStructure:s,isOpen:p,onClose:function(){return m(!1)}})]})}function Ge(){var e="light"===Object(V.a)().palette.mode?"dark-logo":"light-logo";return Object(T.jsxs)(m.a,{sx:{textAlign:"center",minWidth:"80%"},children:[Object(T.jsxs)(X.a,{direction:"row",sx:{justifyContent:"center",alignItems:"center",mb:6},children:[Object(T.jsx)("img",{className:e,src:ie,alt:"Selma retrieval system"}),Object(T.jsx)(C.a,{variant:"h2",sx:{color:"text.primary",fontWeight:800},children:"SELMA"})]}),Object(T.jsx)(Fe,{})]})}var Ue=a(624),He=a(185),Je=a.n(He),Ve=a(620),Xe=a(592),Qe=a(594),Ke=a(598),Ye=a(623),Ze=a(602),et=a(593),tt=a(622),at=a(184),nt=a.n(at);function ct(e){var t=e.example,a=t.id,n=t.name,c=t.text,r=t.url,s=t.database,i=t.model,l=t.index,o=t.code,d=t.language,j=t.equation,b=t.mode,u=e.isLast,x=e.onChooseExample,h=e.onClose,O=Ae().deleteExample;return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(Ze.a,{alignItems:"flex-start",secondaryAction:Object(T.jsx)(xe.a,{edge:"end","aria-label":"delete",onClick:function(){O(a),h()},children:Object(T.jsx)(nt.a,{})}),disablePadding:!0,children:Object(T.jsx)(et.a,{onClick:function(){var e={database:s,model:i,index:l,language:d,mode:b,page:1};"default"===b?e.text=c:"separated"===b?(e.code=o,e.equation=j):"url"===b?e.url=r:console.error("TODO"),x(e),h()},children:Object(T.jsx)(tt.a,{primary:n})})},a),!u&&Object(T.jsx)(Ye.a,{})]})}function rt(e){var t=e.onClose,a=Object(d.h)(Me),n=Object(d.f)(se),c=Object(l.a)(n,2)[1];return 0===a.length?Object(T.jsx)(m.a,{textAlign:"center",children:Object(T.jsx)(C.a,{variant:"subtitle1",children:"There are no query examples available, please create one."})}):Object(T.jsx)(T.Fragment,{children:a.map((function(e,n){return Object(T.jsx)(ct,{onClose:t,onChooseExample:c,example:e,isLast:n===a.length-1},e.id)}))})}function st(e){var t=e.isOpen,a=e.onClose,c=n.useState(_e),r=Object(l.a)(c,2),s=r[0],i=r[1],o=Ae().createExample,j=Object(d.h)(ke),b=Object(d.h)(we),u=n.useState([]),x=Object(l.a)(u,2),h=x[0],O=x[1],p=n.useState([]),m=Object(l.a)(p,2),g=m[0],v=m[1];n.useEffect((function(){s.database&&b[s.database]?O(Object.keys(b[s.database])):O([]),b[s.database]&&b[s.database][s.model]?v(b[s.database][s.model]):v([])}),[s]);var y=function(e){var t=e.target,a=t.name,n=t.value;i((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(Q.a)({},a,n))}))};return Object(T.jsxs)(le.a,{fullWidth:!0,maxWidth:"sm",open:t,onClose:a,children:[Object(T.jsx)(je.a,{children:"Create Example"}),Object(T.jsx)(de.a,{children:Object(T.jsxs)(X.a,{component:"form",spacing:2,children:[Object(T.jsx)(Re.a,{label:"Name",name:"name",variant:"filled",fullWidth:!0,value:s.name,onChange:y}),Object(T.jsxs)(Re.a,{label:"Database",name:"database",variant:"filled",fullWidth:!0,select:!0,SelectProps:{native:!0},value:s.database,onChange:y,children:[Object(T.jsx)("option",{value:""}),j.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Re.a,{label:"Model",name:"model",variant:"filled",fullWidth:!0,select:!0,SelectProps:{native:!0},value:s.model,onChange:y,children:[Object(T.jsx)("option",{value:""}),h.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Re.a,{label:"Indexes",name:"index",variant:"filled",fullWidth:!0,select:!0,SelectProps:{native:!0},value:s.index,onChange:y,children:[Object(T.jsx)("option",{value:""}),g.map((function(e){return Object(T.jsx)("option",{value:e,children:e},e)}))]}),Object(T.jsxs)(Ve.a,{component:"fieldset",children:[Object(T.jsx)(Xe.a,{component:"legend",children:"Search mode:"}),Object(T.jsxs)(Qe.a,{row:!0,defaultValue:"default",onChange:y,"aria-label":"search mode",name:"mode",sx:{justifyContent:"space-evenly"},children:[Object(T.jsx)(pe.a,{value:"default",control:Object(T.jsx)(Ke.a,{}),label:"Default"}),Object(T.jsx)(pe.a,{value:"separated",control:Object(T.jsx)(Ke.a,{}),label:"Separated"}),Object(T.jsx)(pe.a,{value:"url",control:Object(T.jsx)(Ke.a,{}),label:"URL"})]})]}),"default"===s.mode&&Object(T.jsx)(Re.a,{label:"Text",name:"text",variant:"filled",fullWidth:!0,value:s.text,onChange:y})]})}),Object(T.jsxs)(oe.a,{children:[Object(T.jsx)(U.a,{onClick:a,children:"Cancel"}),Object(T.jsx)(U.a,{onClick:function(){var e={name:s.name,text:s.text,database:s.database,model:s.model,index:s.index,language:s.language,mode:s.mode};o(e),a()},children:"Create"})]})]})}function it(e){var t=e.isOpen,a=e.onClose;return Object(T.jsxs)(le.a,{fullWidth:!0,maxWidth:"sm",open:t,onClose:a,children:[Object(T.jsx)(je.a,{children:"Query Examples"}),Object(T.jsx)(de.a,{children:Object(T.jsx)(rt,{onClose:a})}),Object(T.jsx)(oe.a,{children:Object(T.jsx)(U.a,{onClick:a,children:"Cancel"})})]})}function lt(){var e=n.useState(!1),t=Object(l.a)(e,2),a=t[0],c=t[1],r=n.useState(void 0),s=Object(l.a)(r,2),i=s[0],o=s[1],d=function(){c(!1)};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(Ue.a,{sx:{mr:2},variant:"outlined",children:[Object(T.jsx)(U.a,{name:"list",onClick:function(){o("list"),c(!0)},children:"Examples"}),Object(T.jsx)(U.a,{name:"create",size:"small",onClick:function(){o("create"),c(!0)},children:Object(T.jsx)(Je.a,{})})]}),"create"===i&&Object(T.jsx)(st,{isOpen:a,onClose:d}),"list"===i&&Object(T.jsx)(it,{isOpen:a,onClose:d})]})}function ot(){var e=Object(d.h)(Ee).allowed_search_modes;return Object(T.jsxs)(m.a,{sx:{display:"flex",justifyContent:"center",height:"100vh",bgcolor:"background.paper"},children:[Object(T.jsx)(R.a,{position:"fixed",elevation:0,sx:{bgcolor:"background.paper"},children:Object(T.jsxs)($.a,{children:[Object.entries(e).map((function(e){var t=Object(l.a)(e,2),a=t[0],n=t[1];return Object(T.jsx)(U.a,{disabled:!n,sx:{color:"text.primary"},children:a},a)})),Object(T.jsx)(m.a,{sx:{flexGrow:1}}),Object(T.jsx)(lt,{}),Object(T.jsx)(Ie,{})]})}),Object(T.jsx)("main",{style:{display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:"64px",minWidth:"80%",alignItems:"center"},children:Object(T.jsx)(b.a,{})})]})}function dt(){var e=Object(d.f)(se),t=Object(l.a)(e,2),a=t[0],n=t[1],c=function(e){var t=e.target,c=t.name,r=t.value;n(Object(f.a)(Object(f.a)({},a),{},Object(Q.a)({},c,r)))};return Object(T.jsxs)(X.a,{spacing:2,children:[Object(T.jsx)(Re.a,{sx:{width:"400px"},value:a.code,id:"filled-basic",label:"Code",variant:"filled",onChange:c}),Object(T.jsx)(Re.a,{sx:{width:"400px"},value:a.equation,id:"filled-basic",label:"Equations",variant:"filled",onChange:c}),Object(T.jsx)(U.a,{variant:"contained",onClick:function(){console.error("TODO")},children:"Search"})]})}var jt={loader:{load:["[tex]/html"]},tex:{packages:{"[+]":["html"]},inlineMath:[["$","$"],["\\(","\\)"]],displayMath:[["$$","$$"],["\\[","\\]"]]}};function bt(){var e=c.a.useState("dark"),t=Object(l.a)(e,2),a=t[0],n=t[1],r=c.a.useMemo((function(){return{toggleColorMode:function(){n((function(e){var t="light"===e?"dark":"light";return localStorage.setItem("darkState",t),t}))}}}),[]),s=c.a.useMemo((function(){return Object(u.a)({palette:{mode:a}})}),[a]);return c.a.useEffect((function(){var e=localStorage.getItem("darkState");e&&"light"===e?(r.toggleColorMode(),localStorage.setItem("darkState","light")):localStorage.setItem("darkState","dark")}),[]),Object(T.jsxs)(d.a,{children:[Object(T.jsx)(j.a,{}),Object(T.jsx)(fe.Provider,{value:r,children:Object(T.jsx)(x.a,{theme:s,children:Object(T.jsx)(c.a.Suspense,{fallback:Object(T.jsx)("div",{children:"Loading..."}),children:Object(T.jsx)(o.b,{config:jt,children:Object(T.jsxs)(b.d,{children:[Object(T.jsxs)(b.b,{element:Object(T.jsx)(ot,{}),children:[Object(T.jsx)(b.b,{path:"/",element:Object(T.jsx)(Ge,{})}),Object(T.jsx)(b.b,{path:"separated",element:Object(T.jsx)(dt,{})})]}),Object(T.jsx)(b.b,{path:"results",element:Object(T.jsx)(qe,{})})]})})})})})]})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(i.a,{children:Object(T.jsx)(bt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[524,1,2]]]);
//# sourceMappingURL=main.9d20ca82.chunk.js.map