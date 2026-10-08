import{Q as b,n as v,g as d,h as o,M as Q,a4 as V}from"./index-BqTeMVyA.js";const B="techagent_partner_docs_v1",M="techagent_doc_reviews_v1",z=10,l="ОсОО «ТехЭйджент»",y="00403202610304",H="326302-3301-ООО",A=typeof localStorage<"u"?localStorage:{getItem:()=>null,setItem:()=>{}};function x(t){try{const e=A.getItem(t);if(e)return JSON.parse(e)}catch{}return null}const $=x(B)??[],m=x(M)??{};function X(){A.setItem(B,JSON.stringify($))}function J(){A.setItem(M,JSON.stringify(m))}const _=t=>t.type==="REPORT"||t.type==="ACT",j=(t,e)=>e.createdAt.localeCompare(t.createdAt);function D(t){if(t.period)return t.period;const e=t.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/);return e?`${e[2]}-${e[1]}`:null}function at(t){return[...v.filter(e=>e.userId===t),...$.filter(e=>e.userId===t)].sort(j)}function E(){return[...v.filter(_),...$.filter(_)].sort(j)}function Z(t,e){return E().filter(a=>a.userId===t&&D(a)===e)}function ot(t){return E().find(e=>e.type==="REPORT"&&e.userId===t.userId&&(e.orderIds?e.orderIds.includes(t.id):t.issuedAt!==void 0&&D(e)===b(t.issuedAt)))}function tt(t,e,a){return t.filter(s=>s.userId===e&&s.status==="ISSUED"&&s.issueActUploaded&&s.issuedAt!==void 0&&b(s.issuedAt)===a).sort((s,r)=>(s.issuedAt??"").localeCompare(r.issuedAt??""))}function k(t){return V(new Date(t.createdAt),z)}function ct(t,e=new Date){const a=m[t.id];if(a?.status==="ACCEPTED")return{kind:"ACCEPTED",at:a.at};if(a?.status==="OBJECTED")return{kind:"OBJECTED",at:a.at,text:a.text??""};const s=k(t),r=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return e>=r?{kind:"DEEMED_ACCEPTED",deadline:s}:{kind:"WAITING",deadline:s}}function it(t){m[t]={status:"ACCEPTED",at:new Date().toISOString()},J()}function ut(t,e){m[t]={status:"OBJECTED",at:new Date().toISOString(),text:e.trim()},J()}function et(t){const[e,a]=t.split("-").map(Number),s=new Date(e,a,0).getDate(),r=String(a).padStart(2,"0");return{from:`01.${r}.${e}`,to:`${String(s).padStart(2,"0")}.${r}.${e}`}}const O=t=>`${t.toLocaleString("ru-RU")}%`;function h(t){return t.partnerReward===null?null:t.rewardPercent?t.rewardPercent:Math.round(t.partnerReward/t.price*1e4)/100}const nt=t=>t&&t.length===15?"ОГРНИП":"ОГРН";function dt(t,e,a){const s=Z(t.id,e);if(s.length>0)return{status:"exists",docs:s};const r=tt(a,t.id,e);if(r.length===0)return{status:"empty"};const i=new Date().toISOString(),p=d(i),I=d(k({createdAt:i}).toISOString()),{from:f,to:g}=et(e),[L,U]=e.split("-"),u=t.companyName||t.email,S=r.reduce((n,c)=>n+c.price,0),R=r.reduce((n,c)=>n+(c.partnerReward??0),0),T=Array.from(new Set(r.map(h).filter(n=>n!==null))),Y=T.length===1?` (${O(T[0])})`:"",W=r.map(n=>n.orderNumber.replace(/^#/,"")).join(", "),F=r.map((n,c)=>{const C=h(n),q=n.partnerReward===null?"не назначено":o(n.partnerReward);return[`${c+1}. Заказ ${n.orderNumber}`,`   Товар: ${n.productName}`,`   Цена Товара: ${o(n.price)} (оплачено Покупателем ТехЭйджент ${n.paidAt?d(n.paidAt):"—"})`,`   Выдан: ${n.issuedAt?d(n.issuedAt):"—"}, ${n.issuedToName||n.buyerName}, акт приёма-передачи загружен`,`   Вознаграждение Партнёра${C!==null?` (${O(C)})`:""}: ${q}`].join(`
`)}),G=[`Партнёр (Агент): ${u}`,`ИНН: ${t.inn||"—"}, ${nt(t.ogrn)}: ${t.ogrn||"—"}`,`Пункт выдачи: ${t.pointAddress||"—"}`].join(`
`),w={id:`rep-${t.id}-${e}`,userId:t.id,type:"REPORT",title:`Отчёт агента за ${Q(e)}`,fileUrl:"#",createdAt:i,period:e,orderIds:r.map(n=>n.id),content:`ОТЧЁТ АГЕНТА
за период с ${f} по ${g}
Дата формирования: ${p}

${G}
ТехЭйджент (Принципал): ${l}, ИНН ${y}
Основание: агентский договор-оферта, раздел 7

Партнёр отчитывается перед ТехЭйджент о Заказах, Товар по которым выдан Покупателям в отчётном периоде.

ВЫДАННЫЕ ЗАКАЗЫ

${F.join(`

`)}

ИТОГО ЗА ПЕРИОД

Выдано Заказов: ${r.length}
Сумма Товаров, выданных Покупателям: ${o(S)}
Вознаграждение Партнёра к выплате: ${o(R)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в срок: {{PARTNER_REWARD_PAYMENT_TERM}} (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты его формирования — до ${I} включительно (п. 7.5). При отсутствии возражений отчёт считается принятым.

Партнёр: ${u}
${l}`},K=E().filter(n=>n.type==="ACT"&&D(n)===e).length+1,N=`TA-${L}/${U}-${String(K).padStart(3,"0")}`,P={id:`act-${t.id}-${e}`,userId:t.id,type:"ACT",title:`Акт об оказании услуг № ${N}`,fileUrl:"#",createdAt:i,period:e,orderIds:r.map(n=>n.id),content:`АКТ ОБ ОКАЗАНИИ УСЛУГ № ${N}
от ${p}

Исполнитель (Агент): ${u}, ИНН ${t.inn||"—"}
Заказчик (Принципал): ${l}, ИНН ${y}, рег. № ${H}
Основание: агентский договор-оферта, отчёт агента за период с ${f} по ${g}

Агент оказал, а Принципал принял услуги за период с ${f} по ${g}: привлечение Покупателей, оформление Заказов, приём и хранение Товара, выдача Товара Покупателям от имени Принципала.

Выдано Заказов: ${r.length} (№ ${W})
Сумма Товаров, выданных Покупателям: ${o(S)}
Вознаграждение Агента${Y}: ${o(R)}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в срок: {{PARTNER_REWARD_PAYMENT_TERM}}.

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования — до ${I} включительно.

Агент: ${u}
Принципал: ${l}`};return $.push(w,P),X(),{status:"created",docs:[w,P]}}export{ct as a,it as b,tt as c,D as d,Z as e,E as f,dt as g,_ as i,ut as o,ot as r,at as u};
