(this.webpackJsonpblogfe=this.webpackJsonpblogfe||[]).push([[0],{38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var c=n(14),r=n.n(c),u=n(3),o=n(2),i=n(0),a=function(t){var e=t.blog,n=t.deleteBlog;return Object(i.jsxs)("li",{className:"blog",children:[e.title,Object(i.jsx)("br",{}),e.author,Object(i.jsx)("br",{}),e.url,Object(i.jsx)("br",{}),e.likes," ",Object(i.jsx)("br",{}),Object(i.jsx)("button",{onClick:n,children:"Delete"}),Object(i.jsx)("br",{}),Object(i.jsx)("br",{})]})},l=n(4),j=n.n(l),s="/api/blogs",b=function(){return j.a.get(s).then((function(t){return t.data}))},f=function(t){return j.a.post(s,t).then((function(t){return t.data}))},O=function(t,e){return j.a.put("".concat(s,"/").concat(t),e).then((function(t){return t.data}))},d=function(t){return j.a.delete("".concat(s,"/").concat(t))},x=function(){return Object(i.jsxs)("div",{style:{color:"red",fontStyle:"italic",fontSize:16},children:[Object(i.jsx)("br",{}),Object(i.jsx)("em",{children:"Blog app"})]})},g=function(){var t=Object(o.useState)([]),e=Object(u.a)(t,2),n=e[0],c=e[1],r=Object(o.useState)(""),l=Object(u.a)(r,2),j=l[0],s=l[1],g=Object(o.useState)(""),h=Object(u.a)(g,2),v=h[0],m=h[1],p=Object(o.useState)(""),S=Object(u.a)(p,2),k=S[0],y=S[1],B=Object(o.useState)(""),C=Object(u.a)(B,2),w=C[0],D=C[1],T=Object(o.useState)(null),E=Object(u.a)(T,2),I=E[0],J=E[1];Object(o.useEffect)((function(){b().then((function(t){c(t)}))}),[]);var L=function(t){var e=t.message;return null===e?null:Object(i.jsx)("div",{className:"message",children:e})},N=n;return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Blog"}),Object(i.jsx)(L,{message:I}),Object(i.jsx)("ul",{children:N.map((function(t){return Object(i.jsx)(a,{blog:t,deleteBlog:function(){return function(t){var e=n.find((function(e){return e.id===t}));window.confirm("Delete ".concat(e.title,"?"))&&(d(t).then((function(t){J("Deleted '".concat(e.title,"'")),setTimeout((function(){J(null)}),5e3)})).catch((function(t){J("Information has already been removed from server"),setTimeout((function(){J(null)}),5e3)})),c(n.filter((function(e){return e.id!==t}))))}(t.id)}},t.id)}))}),Object(i.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={title:j,author:v,url:k,likes:w};if(n.filter((function(t){return t.title===j})).length>0){var r=n.find((function(t){return t.title===j}));O(r.id,e).then((function(t){J("Updated '".concat(r.title,"'")),setTimeout((function(){J(null)}),5e3),s(""),m(""),y(""),D(""),c(n.map((function(e){return e.id!==r.id?e:t})))}))}else f(e).then((function(t){c(n.concat(t)),s(""),m(""),y(""),D("")}))},children:["Title:",Object(i.jsx)("br",{}),Object(i.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),s(t.target.value)}}),Object(i.jsx)("br",{}),"Author:",Object(i.jsx)("br",{}),Object(i.jsx)("input",{value:v,onChange:function(t){console.log(t.target.value),m(t.target.value)}}),Object(i.jsx)("br",{}),"URL:",Object(i.jsx)("br",{}),Object(i.jsx)("input",{value:k,onChange:function(t){console.log(t.target.value),y(t.target.value)}}),Object(i.jsx)("br",{}),"Likes:",Object(i.jsx)("br",{}),Object(i.jsx)("input",{value:w,onChange:function(t){console.log(t.target.value),D(t.target.value)}}),Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{type:"submit",children:"save"})]}),Object(i.jsx)(x,{})]})};n(38);r.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.e04117ca.chunk.js.map