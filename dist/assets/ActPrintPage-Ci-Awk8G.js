import{e as h,S as g,u as j,m as b,r as f,j as t,N as u,a as o,g as p,h as w}from"./index-CEKZZXEV.js";const N="ОсОО «ТехЭйджент», ИНН 00403202610304, рег. № 326302-3301-ООО, адрес: Кыргызская Республика, г. Бишкек, Октябрьский район, 8 мкр, д. 33, оф. 8",y=["Экземпляр Покупателя","Экземпляр Продавца"],m=`
.act-root { min-height: 100vh; background: #eef0f3; padding: 16px 12px 40px; }
.act-toolbar { max-width: 210mm; margin: 0 auto 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.act-sheet { background: #fff; color: #111; max-width: 210mm; margin: 0 auto 20px; padding: 18mm 16mm;
  font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.45; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
.act-copy { text-align: right; font-size: 10pt; color: #444; margin-bottom: 10px; }
.act-title { text-align: center; font-weight: 700; font-size: 13pt; margin: 0 0 18px; font-family: inherit; letter-spacing: normal; }
.act-sheet p { margin: 0 0 9px; }
.act-table { width: 100%; border-collapse: collapse; margin: 6px 0 12px; font-size: 11pt; }
.act-table th, .act-table td { border: 1px solid #222; padding: 5px 7px; vertical-align: top; text-align: left; }
.act-table th { font-weight: 700; }
.act-table td.num, .act-table th.num { white-space: nowrap; text-align: right; }
.act-blank { display: inline-block; min-width: 46mm; border-bottom: 1px solid #222; }
.act-signs { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; margin-top: 16mm; }
.act-sign-role { font-weight: 700; margin-bottom: 12mm; min-height: 2.9em; }
.act-sign-line { display: flex; gap: 6px; align-items: flex-end; }
.act-sign-line span { flex: 1; border-bottom: 1px solid #222; height: 1.2em; }
.act-sign-line b { font-weight: 400; white-space: nowrap; }
.act-sign-caption { font-size: 9pt; color: #555; display: flex; justify-content: space-between; margin-top: 2px; }
@media (max-width: 640px) {
  .act-sheet { padding: 20px 16px; font-size: 11pt; }
  .act-signs { grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }
  .act-sign-role { margin-bottom: 20px; min-height: 0; }
}
@media print {
  @page { size: A4; margin: 15mm; }
  html, body { background: #fff !important; padding: 0 !important; }
  .act-root { background: none; padding: 0; min-height: 0; }
  .act-toolbar { display: none !important; }
  .act-sheet { box-shadow: none; margin: 0; padding: 0; max-width: none; font-size: 12pt; }
  .act-sheet + .act-sheet { break-before: page; page-break-before: always; }
  .act-signs { grid-template-columns: 1fr 1fr; gap: 10mm; margin-top: 16mm; }
}
`;function v({copy:r,order:s,partner:a,date:n}){const e=s.orderNumber.replace(/^#/,"");return t.jsxs("section",{className:"act-sheet",children:[t.jsx("div",{className:"act-copy",children:r}),t.jsxs("h1",{className:"act-title",children:["Акт приёма-передачи товара № ",e," от ",n]}),t.jsxs("p",{children:[t.jsx("b",{children:"Продавец:"})," ",N,"."]}),t.jsxs("p",{children:[t.jsx("b",{children:"От имени Продавца передаёт Партнёр (агент):"})," ",a.companyName||"—",", ИНН ",a.inn||"—","; пункт выдачи: ",a.pointAddress||"—","."]}),t.jsxs("p",{children:[t.jsx("b",{children:"Покупатель:"})," ",s.buyerName]}),t.jsx("p",{children:t.jsx("b",{children:"Товар:"})}),t.jsxs("table",{className:"act-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Наименование"}),t.jsx("th",{children:"Серийный номер / IMEI"}),t.jsx("th",{className:"num",children:"Цена"})]})}),t.jsx("tbody",{children:t.jsxs("tr",{children:[t.jsx("td",{children:s.productName}),t.jsx("td",{children:" "}),t.jsx("td",{className:"num",children:w(s.price)})]})})]}),t.jsxs("p",{children:["Оплата получена Продавцом через СБП ",s.paidAt?p(s.paidAt):"—","."]}),t.jsxs("p",{children:["Покупатель проверил внешний вид, комплектность и работоспособность Товара. Претензий нет / есть:"," ",t.jsx("span",{className:"act-blank",children:" "})]}),t.jsx("p",{children:t.jsx("span",{className:"act-blank",style:{width:"100%"},children:" "})}),t.jsx("p",{children:"Право собственности и риск переходят к Покупателю с момента подписания акта (оферта купли-продажи, п. 5.3)."}),t.jsxs("div",{className:"act-signs",children:[t.jsxs("div",{children:[t.jsx("div",{className:"act-sign-role",children:"Покупатель"}),t.jsxs("div",{className:"act-sign-line",children:[t.jsx("span",{}),t.jsxs("b",{children:["/ ",s.buyerName]})]}),t.jsxs("div",{className:"act-sign-caption",children:[t.jsx("i",{children:"подпись"}),t.jsx("i",{children:"ФИО"})]})]}),t.jsxs("div",{children:[t.jsx("div",{className:"act-sign-role",children:"Партнёр от имени ОсОО «ТехЭйджент»"}),t.jsxs("div",{className:"act-sign-line",children:[t.jsx("span",{}),t.jsx("b",{children:"/"}),t.jsx("span",{})]}),t.jsxs("div",{className:"act-sign-caption",children:[t.jsx("i",{children:"подпись"}),t.jsx("i",{children:"ФИО"})]})]})]})]})}function A(){const{id:r}=h(),[s]=g(),{user:a,isLoading:n}=j(),e=a?b.find(i=>i.id===r&&i.userId===a.id):void 0,c=!!e&&e.paymentStatus==="PAID"&&(e.status==="AT_POINT"||e.status==="ISSUED"),l=s.get("print")==="1";if(f.useEffect(()=>{if(n||!c||!l)return;const i=window.setTimeout(()=>window.print(),300);return()=>window.clearTimeout(i)},[n,c,l]),n)return null;if(!a||a.role!=="CLIENT")return t.jsx(u,{to:"/login",replace:!0});const d=e?`/dashboard/orders/${e.id}`:"/dashboard/orders";if(!e||!c)return t.jsxs("div",{className:"act-root",children:[t.jsx("style",{children:m}),t.jsxs("div",{className:"act-sheet",style:{fontFamily:"inherit"},children:[t.jsx("p",{children:e?"Акт формируется по оплаченному заказу, когда товар принят в пункте выдачи.":"Заказ не найден."}),t.jsx(o,{to:d,className:"text-primary",children:"Вернуться к заказу"})]})]});const x=p(e.issuedAt??new Date().toISOString());return t.jsxs("div",{className:"act-root",children:[t.jsx("style",{children:m}),t.jsxs("div",{className:"act-toolbar",children:[t.jsx("button",{type:"button",onClick:()=>window.print(),className:"bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer",children:"Печать"}),t.jsx(o,{to:d,className:"text-sm text-text-secondary no-underline hover:text-primary",children:"Вернуться к заказу"})]}),y.map(i=>t.jsx(v,{copy:i,order:e,partner:a,date:x},i))]})}export{A as default};
