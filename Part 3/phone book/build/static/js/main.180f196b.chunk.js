(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(14),a=t.n(c),r=t(3),u=t(2),o=t(0),i=function(e){return Object(o.jsxs)("p",{children:[e.name," ",e.number,Object(o.jsx)("button",{onClick:e.deleteName,children:"delete"})]},e.id)},s=function(e){return Object(o.jsxs)("form",{onSubmit:e.addName,children:[Object(o.jsxs)("div",{children:["name:",Object(o.jsx)("input",{value:e.newName,onChange:e.handleNameChange}),Object(o.jsx)("br",{}),"number:",Object(o.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){return Object(o.jsx)("input",{onChange:e.handleFilterChange})},d=t(4),b=t.n(d),f="/api/persons",j=function(){return b.a.get(f).then((function(e){return e.data}))},m=function(e){return b.a.post(f,e).then((function(e){return e.data}))},h=function(e,n){return b.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(f,"/").concat(e))},g=function(){var e=Object(u.useState)(""),n=Object(r.a)(e,2),t=n[0],c=n[1],a=Object(u.useState)(""),d=Object(r.a)(a,2),b=d[0],f=d[1],g=Object(u.useState)([]),p=Object(r.a)(g,2),v=p[0],x=p[1],w=Object(u.useState)(""),N=Object(r.a)(w,2),C=N[0],k=N[1],S=Object(u.useState)(null),y=Object(r.a)(S,2),D=y[0],T=y[1];Object(u.useEffect)((function(){j().then((function(e){x(e)}))}),[]);var A=function(e){var n=v.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&(O(e).then((function(e){T("Deleted '".concat(n.name,"'")),setTimeout((function(){T(null)}),5e3)})).catch((function(e){T("Information has already been removed from server"),setTimeout((function(){T(null)}),5e3)})),x(v.filter((function(n){return n.id!==e}))))},E=function(e){var n=e.message;return null===n?null:Object(o.jsx)("div",{className:"message",children:n})};return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(E,{message:D}),Object(o.jsxs)("p",{children:["filter shown with",Object(o.jsx)(l,{handleFilterChange:function(e){return function(e){console.log(e.target.value),k(e.target.value)}(e)}})]}),Object(o.jsx)(s,{addName:function(e){return function(e){if(e.preventDefault(),v.filter((function(e){return e.name===t})).length>0){if(v.filter((function(e){return e.number!==b}))){var n=v.find((function(e){return e.name===t}));if(window.confirm("".concat(n.name," is already added to the phonebook replace old number with the new one?"))){var a={name:t,number:b};h(n.id,a),T("Added New Number for '".concat(t,"'")),c(""),f("")}}}else m({name:t,number:b}).then((function(e){x(v.concat(e)),T("Added '".concat(t,"'")),setTimeout((function(){T(null)}),5e3),c(""),f("")})).catch((function(e){T("".concat(e.response.data.status)),console.log(e.response.data)}))}(e)},newNumber:b,newName:t,handleNameChange:function(e){return function(e){console.log(e.target.value),c(e.target.value)}(e)},handleNumberChange:function(e){return function(e){console.log(e.target.value),f(e.target.value)}(e)}}),Object(o.jsx)("h2",{children:"Numbers"}),v.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())})).map((function(e){return Object(o.jsx)(i,{name:e.name,number:e.number,deleteName:function(){return A(e.id)}},e.id)})),Object(o.jsxs)("div",{children:["debug: ",t]})]})};t(38);a.a.render(Object(o.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.180f196b.chunk.js.map