import{as as S,w as y,aM as et,aN as nt,ar as G,aF as I,aO as Dt,i as b,k as o,ag as X,aI as W,aJ as T,aG as wt,aH as Tt,aP as rt,aQ as st,aK as Rt}from"./index-DbVU1qkc.js";const O="techagent_partner_docs_v1",v="techagent_doc_reviews_v1",k="techagent_doc_revoked_v1",Et=10,C="ООО «ТехЭйджент»",Z="ИНН 00403202610304, рег. № 326302-3301-ООО (Кыргызская Республика); ИНН 9909766511, КПП 771387001 (Российская Федерация)",h="−",$=I(O)??[],R=I(v)??{},A=I(k)??{};function ct(){const t=I(O);t&&wt($,Tt($,t,e=>e.createdAt))}function dt(){const t=I(v);t&&rt(R,st(R,t,e=>e.at))}function at(){const t=I(k);t&&rt(A,st(A,t,e=>e))}function N(){ct(),dt(),at()}Rt([O,v,k],N);const Mt=t=>!!(t.agentForm||t.acceptanceForm||t.content),tt=t=>t.type==="REPORT"||t.type==="ACT",V=t=>!A[t.id],ot=(t,e)=>e.createdAt.localeCompare(t.createdAt);function E(t){if(t.period)return t.period;const e=t.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/);return e?`${e[2]}-${e[1]}`:null}function Ft(t){return[...y.filter(e=>e.userId===t),...$.filter(e=>e.userId===t)].filter(V).sort(ot)}function _(){return[...y.filter(tt),...$.filter(tt)].filter(V).sort(ot)}function yt(t,e){return _().filter(c=>c.userId===t&&E(c)===e)}function K(t){return _().find(e=>e.type==="REPORT"&&e.userId===t.userId&&(e.orderIds?e.orderIds.includes(t.id):t.issuedAt!==void 0&&E(e)===S(t.issuedAt)))}function Nt(t,e,c){return t.filter(r=>r.userId===e&&r.status==="ISSUED"&&r.issueActUploaded&&!r.returnedAt&&r.issuedAt!==void 0&&S(r.issuedAt)===c).sort((r,s)=>(r.issuedAt??"").localeCompare(s.issuedAt??""))}const w=t=>t.partnerReward??0;function Pt(t,e){return t.deductedAmount!==void 0?t.deductedAmount:(t.deductedOrderIds??[]).reduce((c,r)=>c+(e.find(s=>s.id===r)?.partnerReward??0),0)}function bt(t,e){const c=_().filter(a=>a.type==="REPORT"&&a.userId===e),r=new Set(c.flatMap(a=>a.deductedOrderIds??[])),s=t.filter(a=>a.userId===e&&a.returnedAt&&K(a)!==void 0),u=s.filter(a=>r.has(a.id)).reduce((a,f)=>a+w(f),0),d=c.reduce((a,f)=>a+Pt(f,t),0),l=Math.max(0,u-d),m=s.filter(a=>!r.has(a.id));return{newReturns:m,carried:l,debt:l+m.reduce((a,f)=>a+w(f),0)}}function Ct(t){const e=new Map;for(const r of _()){if(t&&r.userId!==t)continue;const s=E(r),u=`${r.userId}|${s??r.id}`;let d=e.get(u);d||(d={key:u,userId:r.userId,period:s,docs:[],createdAt:r.createdAt},e.set(u,d)),r.type==="REPORT"?d.report=r:d.act=r,r.createdAt<d.createdAt&&(d.createdAt=r.createdAt)}const c=[...e.values()];for(const r of c)r.docs=[r.report,r.act].filter(s=>s!==void 0);return c.sort((r,s)=>s.createdAt.localeCompare(r.createdAt))}function jt(t){const e=t.report&&t.act?"Отчёт агента и акт":t.report?"Отчёт агента":"Акт об оказании услуг";return t.period?`${e} за ${G(t.period)}`:e}function ht(t){return Dt(new Date(t.createdAt),Et)}function H(t,e=new Date){const c=t.docs.map(d=>R[d.id]),r=c.find(d=>d?.status==="OBJECTED");if(r)return{kind:"OBJECTED",at:r.at,text:r.text??""};if(c.length>0&&c.every(d=>d?.status==="ACCEPTED"))return{kind:"ACCEPTED",at:c.reduce((d,l)=>l&&l.at>d?l.at:d,"")};const s=ht(t),u=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1);return e>=u?{kind:"DEEMED_ACCEPTED",deadline:s}:{kind:"WAITING",deadline:s}}function xt(t){return Ct(t).filter(e=>H(e).kind==="WAITING").length}function it(t,e){if(N(),t.docs.some(c=>A[c.id])||H(t).kind!=="WAITING")return T(),!1;for(const c of t.docs)R[c.id]=e;return dt(),W(v,R),T(),!0}function Jt(t){return it(t,{status:"ACCEPTED",at:new Date().toISOString()})}function Lt(t,e){return it(t,{status:"OBJECTED",at:new Date().toISOString(),text:e.trim()})}function St(t){const e=H(t).kind;return e==="WAITING"||e==="OBJECTED"}function Ut(t){if(N(),!St(t))return T(),!1;const e=new Date().toISOString();for(const c of t.docs)A[c.id]=e;return at(),W(k,A),T(),!0}function Ot(t){const[e,c]=t.split("-").map(Number),r=new Date(e,c,0).getDate(),s=String(c).padStart(2,"0");return{from:`01.${s}.${e}`,to:`${String(r).padStart(2,"0")}.${s}.${e}`}}function Y(t){return t.partnerReward===null?null:t.rewardPercent?t.rewardPercent:Math.round(t.partnerReward/t.price*1e4)/100}const vt=t=>t&&t.length===15?"ОГРНИП":"ОГРН";function kt(t){const[e,c]=t.split("-"),r=[...y,...$].filter(s=>s.type==="ACT").map(s=>s.title.match(/TA-(\d{4})\/(\d{2})-(\d+)/)).filter(s=>s!==null&&`${s[1]}-${s[2]}`===t).map(s=>Number(s[3]));return`TA-${e}/${c}-${String(Math.max(0,...r)+1).padStart(3,"0")}`}function Yt(t,e,c){N();const r=yt(t.id,e);if(r.length>0)return{status:"exists",docs:r};const s=Nt(c,t.id,e);if(s.length===0)return{status:"empty"};const u=new Date,d=u.toISOString(),l=b(d),{from:m,to:a}=Ot(e),f=u.getTime().toString(36),P=t.companyName||t.email,B=s.reduce((n,i)=>n+i.price,0),g=s.reduce((n,i)=>n+w(i),0),{newReturns:M,carried:F,debt:j}=bt(c,t.id),p=Math.min(j,g),x=g-p,J=j-p,ut=n=>{const i=K(n),D=(i&&E(i))??(n.issuedAt?S(n.issuedAt):null);return`Заказ ${n.orderNumber}: Товар возвращён Покупателем ${n.returnedAt?b(n.returnedAt):"—"}, вознаграждение по отчёту за ${D?G(D):"—"} удерживается: ${h}${o(w(n))}`},lt=[...M.map(ut),...F>0?[`Остаток удержания с прошлых периодов: ${h}${o(F)}`]:[],`Удержано в этом периоде: ${h}${o(p)}`,...J>0?[`Переносится на следующие периоды: ${o(J)}`]:[]],ft=j>0?`
УДЕРЖАНИЕ ПО ВОЗВРАТАМ (п. 7.3)

${lt.join(`
`)}

`:"",Q=Array.from(new Set(s.map(Y).filter(n=>n!==null))),$t=Q.length===1?` (${X(Q[0])})`:"",mt=s.map(n=>n.orderNumber.replace(/^#/,"")).join(", "),pt=s.map((n,i)=>{const D=Y(n),gt=n.partnerReward===null?"не назначено":o(n.partnerReward);return[`${i+1}. Заказ ${n.orderNumber}`,`   Товар: ${n.productName}`,`   Цена Товара: ${o(n.price)} (оплачено Покупателем ТехЭйджент ${n.paidAt?b(n.paidAt):"—"})`,`   Выдан: ${n.issuedAt?b(n.issuedAt):"—"}, ${n.issuedToName||n.buyerName}, акт приёма-передачи загружен`,`   Вознаграждение Партнёра${D!==null?` (${X(D)})`:""}: ${gt}`].join(`
`)}),At=[`Партнёр (Агент): ${P}`,`ИНН: ${t.inn||"—"}, ${vt(t.ogrn)}: ${t.ogrn||"—"}`,`Пункт выдачи: ${t.pointAddress||"—"}`].join(`
`),L={id:`rep-${t.id}-${e}-${f}`,userId:t.id,type:"REPORT",title:`Отчёт агента за ${G(e)}`,fileUrl:"#",createdAt:d,period:e,orderIds:s.map(n=>n.id),deductedOrderIds:M.map(n=>n.id),deductedAmount:p,content:`ОТЧЁТ АГЕНТА
за период с ${m} по ${a}
Дата формирования: ${l}

${At}
ТехЭйджент (Принципал): ${C}, ${Z}
Основание: агентский договор-оферта, раздел 7

Партнёр отчитывается перед ТехЭйджент о Заказах, Товар по которым выдан Покупателям в отчётном периоде.

ВЫДАННЫЕ ЗАКАЗЫ

${pt.join(`

`)}

ИТОГО ЗА ПЕРИОД

Выдано Заказов: ${s.length}
Сумма Товаров, выданных Покупателям: ${o(B)}
Вознаграждение Партнёра за выданные Заказы: ${o(g)}
${ft}Вознаграждение Партнёра к выплате: ${o(x)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты формирования (п. 7.5). При отсутствии возражений в этот срок отчёт считается принятым.

Партнёр (Агент): ${P}
ТехЭйджент (Принципал): ${C}`},U=kt(e),q={number:U,date:d,periodFrom:m,periodTo:a,acceptedAt:t.offerAcceptedAt,agent:nt(t),principal:et,rows:s.map(n=>({orderNumber:n.orderNumber,product:n.productName,paidAt:n.paidAt,issuedAt:n.issuedAt,buyer:n.issuedToName||n.buyerName,price:n.price,percent:Y(n),reward:n.partnerReward})),returns:M.map(n=>{const i=K(n);return{orderNumber:n.orderNumber,returnedAt:n.returnedAt,period:(i&&E(i))??(n.issuedAt?S(n.issuedAt):null),amount:w(n)}}),carried:F,deducted:p,carryForward:J,goodsTotal:B,accruedTotal:g,payable:x};L.agentForm=q;const It=p>0?`
Удержано по возвратам (п. 7.3 агентского договора-оферты): ${h}${o(p)}
К выплате: ${o(x)}`:"",z={id:`act-${t.id}-${e}-${f}`,userId:t.id,type:"ACT",title:`Акт об оказании услуг № ${U}`,fileUrl:"#",createdAt:d,period:e,orderIds:s.map(n=>n.id),agentForm:q,content:`АКТ ОБ ОКАЗАНИИ УСЛУГ № ${U}
от ${l}

Партнёр (Агент): ${P}, ИНН ${t.inn||"—"}
ТехЭйджент (Принципал): ${C}, ${Z}
Основание: агентский договор-оферта, отчёт агента за период с ${m} по ${a}

Агент оказал, а Принципал принял услуги за период с ${m} по ${a}: привлечение Покупателей, оформление Заказов, приём и хранение Товара, выдача Товара Покупателям от имени Принципала.

Выдано Заказов: ${s.length} (№ ${mt})
Сумма Товаров, выданных Покупателям: ${o(B)}
Вознаграждение Агента${$t}: ${o(g)}${It}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6 агентского договора-оферты).

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования (п. 7.5 агентского договора-оферты).

Агент: ${P}
Принципал: ${C}`};return $.push(L,z),ct(),W(O,$),T(),{status:"created",docs:[L,z]}}function _t(t){return!t.offerAcceptedAt||y.some(e=>e.userId===t.id&&e.type==="CONTRACT")?null:{id:`acc-${t.id}`,userId:t.id,type:"CONTRACT",title:"Подтверждение акцепта агентского договора-оферты",fileUrl:"#",createdAt:t.offerAcceptedAt,acceptanceForm:{partner:nt(t),principal:et,openedAt:t.createdAt,acceptedAt:t.offerAcceptedAt}}}function Gt(t,e){N();const c=e?_t(e):null,r=[...y,...$.filter(V),...c?[c]:[]].find(s=>s.id===t);if(r&&(r.userId==="public"||e&&(e.role==="ADMIN"||r.userId===e.id)))return r}export{Ct as a,_t as b,jt as c,E as d,Mt as e,Gt as f,Jt as g,Nt as h,tt as i,bt as j,Yt as k,Ut as l,St as m,Lt as o,H as p,K as r,Ft as u,xt as w};
