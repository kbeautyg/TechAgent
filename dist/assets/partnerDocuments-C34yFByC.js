import{Q as S,n as x,g as d,M as _,h as c,a4 as Z}from"./index-CEKZZXEV.js";const J="techagent_partner_docs_v1",L="techagent_doc_reviews_v1",tt=10,$="ОсОО «ТехЭйджент»",v="00403202610304",et="326302-3301-ООО",E=typeof localStorage<"u"?localStorage:{getItem:()=>null,setItem:()=>{}};function U(t){try{const e=E.getItem(t);if(e)return JSON.parse(e)}catch{}return null}const m=U(J)??[],f=U(L)??{};function nt(){E.setItem(J,JSON.stringify(m))}function M(){E.setItem(L,JSON.stringify(f))}const B=t=>t.type==="REPORT"||t.type==="ACT",Y=(t,e)=>e.createdAt.localeCompare(t.createdAt);function w(t){if(t.period)return t.period;const e=t.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/);return e?`${e[2]}-${e[1]}`:null}function lt(t){return[...x.filter(e=>e.userId===t),...m.filter(e=>e.userId===t)].sort(Y)}function g(){return[...x.filter(B),...m.filter(B)].sort(Y)}function rt(t,e){return g().filter(s=>s.userId===t&&w(s)===e)}function st(t){return g().find(e=>e.type==="REPORT"&&e.userId===t.userId&&(e.orderIds?e.orderIds.includes(t.id):t.issuedAt!==void 0&&w(e)===S(t.issuedAt)))}function at(t,e,s){return t.filter(r=>r.userId===e&&r.status==="ISSUED"&&r.issueActUploaded&&!r.returnedAt&&r.issuedAt!==void 0&&S(r.issuedAt)===s).sort((r,a)=>(r.issuedAt??"").localeCompare(a.issuedAt??""))}function ct(t,e){const s=new Set(g().flatMap(r=>r.deductedOrderIds??[]));return t.filter(r=>r.userId===e&&r.returnedAt&&!s.has(r.id)&&st(r)!==void 0)}function F(t){return Z(new Date(t.createdAt),tt)}function $t(t,e=new Date){const s=f[t.id];if(s?.status==="ACCEPTED")return{kind:"ACCEPTED",at:s.at};if(s?.status==="OBJECTED")return{kind:"OBJECTED",at:s.at,text:s.text??""};const r=F(t),a=new Date(r.getFullYear(),r.getMonth(),r.getDate()+1);return e>=a?{kind:"DEEMED_ACCEPTED",deadline:r}:{kind:"WAITING",deadline:r}}function mt(t){f[t]={status:"ACCEPTED",at:new Date().toISOString()},M()}function ft(t,e){f[t]={status:"OBJECTED",at:new Date().toISOString(),text:e.trim()},M()}function ot(t){const[e,s]=t.split("-").map(Number),r=new Date(e,s,0).getDate(),a=String(s).padStart(2,"0");return{from:`01.${a}.${e}`,to:`${String(r).padStart(2,"0")}.${a}.${e}`}}const j=t=>`${t.toLocaleString("ru-RU")}%`;function k(t){return t.partnerReward===null?null:t.rewardPercent?t.rewardPercent:Math.round(t.partnerReward/t.price*1e4)/100}const it=t=>t&&t.length===15?"ОГРНИП":"ОГРН";function gt(t,e,s){const r=rt(t.id,e);if(r.length>0)return{status:"exists",docs:r};const a=at(s,t.id,e),i=ct(s,t.id);if(a.length===0&&i.length===0)return{status:"empty"};const u=new Date().toISOString(),T=d(u),C=d(F({createdAt:u}).toISOString()),{from:p,to:A}=ot(e),[G,K]=e.split("-"),l=t.companyName||t.email,N=a.reduce((n,o)=>n+o.price,0),D=a.reduce((n,o)=>n+(o.partnerReward??0),0),I=i.reduce((n,o)=>n+(o.partnerReward??0),0),O=D-I,W=i.length?`

УДЕРЖАНИЕ ПО ВОЗВРАТАМ (п. 7.3)

${i.map(n=>`Заказ ${n.orderNumber}: Товар возвращён Покупателем ${n.returnedAt?d(n.returnedAt):""}, вознаграждение по отчёту за ${n.issuedAt?_(S(n.issuedAt)):"—"} удерживается: −${c(n.partnerReward??0)}`).join(`
`)}`:"",R=Array.from(new Set(a.map(k).filter(n=>n!==null))),q=R.length===1?` (${j(R[0])})`:"",Q=a.map(n=>n.orderNumber.replace(/^#/,"")).join(", "),V=a.map((n,o)=>{const b=k(n),X=n.partnerReward===null?"не назначено":c(n.partnerReward);return[`${o+1}. Заказ ${n.orderNumber}`,`   Товар: ${n.productName}`,`   Цена Товара: ${c(n.price)} (оплачено Покупателем ТехЭйджент ${n.paidAt?d(n.paidAt):"—"})`,`   Выдан: ${n.issuedAt?d(n.issuedAt):"—"}, ${n.issuedToName||n.buyerName}, акт приёма-передачи загружен`,`   Вознаграждение Партнёра${b!==null?` (${j(b)})`:""}: ${X}`].join(`
`)}),z=[`Партнёр (Агент): ${l}`,`ИНН: ${t.inn||"—"}, ${it(t.ogrn)}: ${t.ogrn||"—"}`,`Пункт выдачи: ${t.pointAddress||"—"}`].join(`
`),y={id:`rep-${t.id}-${e}`,userId:t.id,type:"REPORT",title:`Отчёт агента за ${_(e)}`,fileUrl:"#",createdAt:u,period:e,orderIds:a.map(n=>n.id),deductedOrderIds:i.map(n=>n.id),content:`ОТЧЁТ АГЕНТА
за период с ${p} по ${A}
Дата формирования: ${T}

${z}
ТехЭйджент (Принципал): ${$}, ИНН ${v}
Основание: агентский договор-оферта, раздел 7

Партнёр отчитывается перед ТехЭйджент о Заказах, Товар по которым выдан Покупателям в отчётном периоде.

ВЫДАННЫЕ ЗАКАЗЫ

${V.join(`

`)}

ИТОГО ЗА ПЕРИОД

Выдано Заказов: ${a.length}
Сумма Товаров, выданных Покупателям: ${c(N)}
Вознаграждение Партнёра за выданные Заказы: ${c(D)}${W}
Вознаграждение Партнёра к выплате: ${c(O)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты его формирования — до ${C} включительно (п. 7.5). При отсутствии возражений отчёт считается принятым.

Партнёр: ${l}
${$}`},H=g().filter(n=>n.type==="ACT"&&w(n)===e).length+1,P=`TA-${G}/${K}-${String(H).padStart(3,"0")}`,h={id:`act-${t.id}-${e}`,userId:t.id,type:"ACT",title:`Акт об оказании услуг № ${P}`,fileUrl:"#",createdAt:u,period:e,orderIds:a.map(n=>n.id),content:`АКТ ОБ ОКАЗАНИИ УСЛУГ № ${P}
от ${T}

Партнёр (Агент): ${l}, ИНН ${t.inn||"—"}
ТехЭйджент (Принципал): ${$}, ИНН ${v}, рег. № ${et}
Основание: агентский договор-оферта, отчёт агента за период с ${p} по ${A}

Агент оказал, а Принципал принял услуги за период с ${p} по ${A}: привлечение Покупателей, оформление Заказов, приём и хранение Товара, выдача Товара Покупателям от имени Принципала.

Выдано Заказов: ${a.length} (№ ${Q})
Сумма Товаров, выданных Покупателям: ${c(N)}
Вознаграждение Агента${q}: ${c(D)}${I?`
Удержано по возвратам (п. 7.3): −${c(I)}
К выплате: ${c(O)}`:""}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта.

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования — до ${C} включительно.

Агент: ${l}
Принципал: ${$}`};return m.push(y,h),nt(),{status:"created",docs:[y,h]}}export{$t as a,mt as b,at as c,w as d,rt as e,g as f,gt as g,B as i,ft as o,st as r,lt as u};
