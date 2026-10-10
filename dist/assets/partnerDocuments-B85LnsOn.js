import{a1 as B,x as j,a0 as _,ag as I,an as pt,k as h,l as a,H,aj as x,ak as D,ah as It,ai as gt,ao as X,ap as Z,al as Dt}from"./index-DBF7BlK0.js";const P="techagent_partner_docs_v1",C="techagent_doc_reviews_v1",O="techagent_doc_revoked_v1",wt=10,R="ООО «ТехЭйджент»",q="ИНН 00403202610304, рег. № 326302-3301-ООО (Кыргызская Республика); ИНН 9909766511, КПП 771387001 (Российская Федерация)",y="−",$=I(P)??[],w=I(C)??{},p=I(O)??{};function tt(){const t=I(P);t&&It($,gt($,t,e=>e.createdAt))}function et(){const t=I(C);t&&X(w,Z(w,t,e=>e.at))}function nt(){const t=I(O);t&&X(p,Z(p,t,e=>e))}function b(){tt(),et(),nt()}Dt([P,C,O],b);const z=t=>t.type==="REPORT"||t.type==="ACT",rt=t=>!p[t.id],st=(t,e)=>e.createdAt.localeCompare(t.createdAt);function v(t){if(t.period)return t.period;const e=t.content?.match(/период[а-я]* с 01\.(\d{2})\.(\d{4})/);return e?`${e[2]}-${e[1]}`:null}function Nt(t){return[...j.filter(e=>e.userId===t),...$.filter(e=>e.userId===t)].filter(rt).sort(st)}function N(){return[...j.filter(z),...$.filter(z)].filter(rt).sort(st)}function Et(t,e){return N().filter(c=>c.userId===t&&v(c)===e)}function ct(t){return N().find(e=>e.type==="REPORT"&&e.userId===t.userId&&(e.orderIds?e.orderIds.includes(t.id):t.issuedAt!==void 0&&v(e)===B(t.issuedAt)))}function Tt(t,e,c){return t.filter(r=>r.userId===e&&r.status==="ISSUED"&&r.issueActUploaded&&!r.returnedAt&&r.issuedAt!==void 0&&B(r.issuedAt)===c).sort((r,n)=>(r.issuedAt??"").localeCompare(n.issuedAt??""))}const S=t=>t.partnerReward??0;function ht(t,e){return t.deductedAmount!==void 0?t.deductedAmount:(t.deductedOrderIds??[]).reduce((c,r)=>c+(e.find(n=>n.id===r)?.partnerReward??0),0)}function Rt(t,e){const c=N().filter(d=>d.type==="REPORT"&&d.userId===e),r=new Set(c.flatMap(d=>d.deductedOrderIds??[])),n=t.filter(d=>d.userId===e&&d.returnedAt&&ct(d)!==void 0),i=n.filter(d=>r.has(d.id)).reduce((d,l)=>d+S(l),0),o=c.reduce((d,l)=>d+ht(l,t),0),u=Math.max(0,i-o),m=n.filter(d=>!r.has(d.id));return{newReturns:m,carried:u,debt:u+m.reduce((d,l)=>d+S(l),0)}}function yt(t){const e=new Map;for(const r of N()){if(t&&r.userId!==t)continue;const n=v(r),i=`${r.userId}|${n??r.id}`;let o=e.get(i);o||(o={key:i,userId:r.userId,period:n,docs:[],createdAt:r.createdAt},e.set(i,o)),r.type==="REPORT"?o.report=r:o.act=r,r.createdAt<o.createdAt&&(o.createdAt=r.createdAt)}const c=[...e.values()];for(const r of c)r.docs=[r.report,r.act].filter(n=>n!==void 0);return c.sort((r,n)=>n.createdAt.localeCompare(r.createdAt))}function kt(t){const e=t.report&&t.act?"Отчёт агента и акт":t.report?"Отчёт агента":"Акт об оказании услуг";return t.period?`${e} за ${_(t.period)}`:e}function St(t){return pt(new Date(t.createdAt),wt)}function M(t,e=new Date){const c=t.docs.map(o=>w[o.id]),r=c.find(o=>o?.status==="OBJECTED");if(r)return{kind:"OBJECTED",at:r.at,text:r.text??""};if(c.length>0&&c.every(o=>o?.status==="ACCEPTED"))return{kind:"ACCEPTED",at:c.reduce((o,u)=>u&&u.at>o?u.at:o,"")};const n=St(t),i=new Date(n.getFullYear(),n.getMonth(),n.getDate()+1);return e>=i?{kind:"DEEMED_ACCEPTED",deadline:n}:{kind:"WAITING",deadline:n}}function _t(t){return yt(t).filter(e=>M(e).kind==="WAITING").length}function ot(t,e){if(b(),t.docs.some(c=>p[c.id])||M(t).kind!=="WAITING")return D(),!1;for(const c of t.docs)w[c.id]=e;return et(),x(C,w),D(),!0}function Bt(t){return ot(t,{status:"ACCEPTED",at:new Date().toISOString()})}function jt(t,e){return ot(t,{status:"OBJECTED",at:new Date().toISOString(),text:e.trim()})}function Pt(t){const e=M(t).kind;return e==="WAITING"||e==="OBJECTED"}function xt(t){if(b(),!Pt(t))return D(),!1;const e=new Date().toISOString();for(const c of t.docs)p[c.id]=e;return nt(),x(O,p),D(),!0}function Ct(t){const[e,c]=t.split("-").map(Number),r=new Date(e,c,0).getDate(),n=String(c).padStart(2,"0");return{from:`01.${n}.${e}`,to:`${String(r).padStart(2,"0")}.${n}.${e}`}}function Q(t){return t.partnerReward===null?null:t.rewardPercent?t.rewardPercent:Math.round(t.partnerReward/t.price*1e4)/100}const Ot=t=>t&&t.length===15?"ОГРНИП":"ОГРН";function bt(t){const[e,c]=t.split("-"),r=[...j,...$].filter(n=>n.type==="ACT").map(n=>n.title.match(/TA-(\d{4})\/(\d{2})-(\d+)/)).filter(n=>n!==null&&`${n[1]}-${n[2]}`===t).map(n=>Number(n[3]));return`TA-${e}/${c}-${String(Math.max(0,...r)+1).padStart(3,"0")}`}function Mt(t,e,c){b();const r=Et(t.id,e);if(r.length>0)return{status:"exists",docs:r};const n=Tt(c,t.id,e);if(n.length===0)return{status:"empty"};const i=new Date,o=i.toISOString(),u=h(o),{from:m,to:d}=Ct(e),l=i.getTime().toString(36),E=t.companyName||t.email,J=n.reduce((s,f)=>s+f.price,0),T=n.reduce((s,f)=>s+S(f),0),{newReturns:L,carried:U,debt:k}=Rt(c,t.id),A=Math.min(k,T),W=T-A,Y=k-A,dt=s=>{const f=ct(s),g=(f&&v(f))??(s.issuedAt?B(s.issuedAt):null);return`Заказ ${s.orderNumber}: Товар возвращён Покупателем ${s.returnedAt?h(s.returnedAt):"—"}, вознаграждение по отчёту за ${g?_(g):"—"} удерживается: ${y}${a(S(s))}`},at=[...L.map(dt),...U>0?[`Остаток удержания с прошлых периодов: ${y}${a(U)}`]:[],`Удержано в этом периоде: ${y}${a(A)}`,...Y>0?[`Переносится на следующие периоды: ${a(Y)}`]:[]],it=k>0?`
УДЕРЖАНИЕ ПО ВОЗВРАТАМ (п. 7.3)

${at.join(`
`)}

`:"",G=Array.from(new Set(n.map(Q).filter(s=>s!==null))),ut=G.length===1?` (${H(G[0])})`:"",lt=n.map(s=>s.orderNumber.replace(/^#/,"")).join(", "),ft=n.map((s,f)=>{const g=Q(s),At=s.partnerReward===null?"не назначено":a(s.partnerReward);return[`${f+1}. Заказ ${s.orderNumber}`,`   Товар: ${s.productName}`,`   Цена Товара: ${a(s.price)} (оплачено Покупателем ТехЭйджент ${s.paidAt?h(s.paidAt):"—"})`,`   Выдан: ${s.issuedAt?h(s.issuedAt):"—"}, ${s.issuedToName||s.buyerName}, акт приёма-передачи загружен`,`   Вознаграждение Партнёра${g!==null?` (${H(g)})`:""}: ${At}`].join(`
`)}),$t=[`Партнёр (Агент): ${E}`,`ИНН: ${t.inn||"—"}, ${Ot(t.ogrn)}: ${t.ogrn||"—"}`,`Пункт выдачи: ${t.pointAddress||"—"}`].join(`
`),K={id:`rep-${t.id}-${e}-${l}`,userId:t.id,type:"REPORT",title:`Отчёт агента за ${_(e)}`,fileUrl:"#",createdAt:o,period:e,orderIds:n.map(s=>s.id),deductedOrderIds:L.map(s=>s.id),deductedAmount:A,content:`ОТЧЁТ АГЕНТА
за период с ${m} по ${d}
Дата формирования: ${u}

${$t}
ТехЭйджент (Принципал): ${R}, ${q}
Основание: агентский договор-оферта, раздел 7

Партнёр отчитывается перед ТехЭйджент о Заказах, Товар по которым выдан Покупателям в отчётном периоде.

ВЫДАННЫЕ ЗАКАЗЫ

${ft.join(`

`)}

ИТОГО ЗА ПЕРИОД

Выдано Заказов: ${n.length}
Сумма Товаров, выданных Покупателям: ${a(J)}
Вознаграждение Партнёра за выданные Заказы: ${a(T)}
${it}Вознаграждение Партнёра к выплате: ${a(W)}

Денежные средства Покупателей Партнёр не получал: оплата поступила ТехЭйджент по ссылкам Платформы.

Вознаграждение выплачивается на банковский счёт Партнёра, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6).

Возражения по отчёту принимаются в течение 10 (десяти) рабочих дней с даты формирования (п. 7.5). При отсутствии возражений в этот срок отчёт считается принятым.

Партнёр (Агент): ${E}
ТехЭйджент (Принципал): ${R}`},F=bt(e),mt=A>0?`
Удержано по возвратам (п. 7.3 агентского договора-оферты): ${y}${a(A)}
К выплате: ${a(W)}`:"",V={id:`act-${t.id}-${e}-${l}`,userId:t.id,type:"ACT",title:`Акт об оказании услуг № ${F}`,fileUrl:"#",createdAt:o,period:e,orderIds:n.map(s=>s.id),content:`АКТ ОБ ОКАЗАНИИ УСЛУГ № ${F}
от ${u}

Партнёр (Агент): ${E}, ИНН ${t.inn||"—"}
ТехЭйджент (Принципал): ${R}, ${q}
Основание: агентский договор-оферта, отчёт агента за период с ${m} по ${d}

Агент оказал, а Принципал принял услуги за период с ${m} по ${d}: привлечение Покупателей, оформление Заказов, приём и хранение Товара, выдача Товара Покупателям от имени Принципала.

Выдано Заказов: ${n.length} (№ ${lt})
Сумма Товаров, выданных Покупателям: ${a(J)}
Вознаграждение Агента${ut}: ${a(T)}${mt}

РАСЧЁТЫ

Принципал выплачивает вознаграждение на банковский счёт Агента, указанный в анкете, в течение 7 (семи) дней с даты принятия отчёта агента и акта (п. 7.6 агентского договора-оферты).

Услуги оказаны в полном объёме. Акт считается принятым при отсутствии мотивированных возражений в течение 10 (десяти) рабочих дней с даты его формирования (п. 7.5 агентского договора-оферты).

Агент: ${E}
Принципал: ${R}`};return $.push(K,V),tt(),x(P,$),D(),{status:"created",docs:[K,V]}}export{yt as a,kt as b,Bt as c,v as d,Tt as e,Rt as f,Mt as g,xt as h,z as i,Pt as j,jt as o,M as p,ct as r,Nt as u,_t as w};
