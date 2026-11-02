import { useState } from 'react'
import { TELEGRAM_USERNAME } from '../config'
import './AIAtelier.css'

type Concept = { title: string; story: string; flowers: string[]; palette: string; priceNote: string; deliveryNote: string }
const colors = ['Пудровая','Белая','Винная','Яркая','На усмотрение флориста']
const occasions = ['День рождения','Годовщина','Просто так','Благодарность','Свидание','Другой повод']
function preview(occasion: string, palette: string, budget: number, wishes: string): Concept {
 const options: Record<string,string[]> = {
  'Пудровая':['розы нежных оттенков','эустома','альстромерия'],
  'Белая':['белые розы','альстромерия','маттиола'],
  'Винная':['розы глубоких оттенков','кустовые розы','хризантема'],
  'Яркая':['гербера','розы насыщенных оттенков','альстромерия'],
  'На усмотрение флориста':['сезонные розы','эустома','декоративная зелень'],
 }
 return {title:budget>=7900?'VELUNE · Atelier':budget>=5500?'VELUNE · Signature':'VELUNE · Épure',story:`Композиция для повода «${occasion.toLowerCase()}»: ${palette.toLowerCase()} палитра, выразительная фактура и продуманные акценты.${wishes.trim()?` Пожелание: ${wishes.trim().slice(0,180)}.`:''}`,flowers:options[palette],palette,priceNote:`Ваш ориентир — до ${budget.toLocaleString('ru-RU')} ₽. Точная стоимость и состав подтверждаются флористом.`,deliveryNote:'Время и стоимость доставки уточняются при согласовании.'}
}
export function AIAtelier(){
 const [occasion,setOccasion]=useState(occasions[0]); const [palette,setPalette]=useState(colors[0]); const [budget,setBudget]=useState(5500); const [wishes,setWishes]=useState('');
 const [concept,setConcept]=useState<Concept|null>(null); const [mode,setMode]=useState<'ai'|'demo'>('demo'); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [copied,setCopied]=useState(false)
 const generate=async()=>{
  setBusy(true);setError('');setCopied(false)
  try {
   const response=await fetch('/api/bouquet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({occasion,palette,budget,wishes})})
   if(!response.ok) throw new Error('AI недоступен')
   const data=await response.json() as Concept
   if(!data.title||!Array.isArray(data.flowers)||!data.story) throw new Error('Некорректный ответ')
   setConcept(data);setMode('ai')
  } catch {
   setConcept(preview(occasion,palette,budget,wishes));setMode('demo');setError('Сейчас доступен концепт-подбор по шаблону. Для генерации ИИ необходимо подключить серверный API-ключ.')
  } finally {setBusy(false)}
 }
 const message=concept?`VELUNE · Запрос индивидуального букета\nПовод: ${occasion}\nПалитра: ${palette}\nБюджет: до ${budget} ₽\nПожелания: ${wishes||'Без дополнительных пожеланий'}\nКонцепция: ${concept.title}\nИдея: ${concept.story}\nПредлагаемые цветы: ${concept.flowers.join(', ')}\nПрошу подтвердить наличие, состав, итоговую цену и доставку.`:''
 return <section className="atelier section" id="atelier"><div className="container atelier__shell"><div className="atelier__heading"><div><p className="section-label">AI ATELIER / 02</p><h2 className="section-title">БУКЕТ В ВАШЕМ ХАРАКТЕРЕ</h2></div><p className="section-subtitle">Расскажите о событии и настроении. Создадим идею композиции и передадим флористу для согласования.</p></div>
 <div className="atelier__grid"><div className="atelier__form">
  <label className="atelier__label" htmlFor="atelier-occasion">01 / Повод</label><select id="atelier-occasion" value={occasion} onChange={e=>setOccasion(e.target.value)}>{occasions.map(s=><option key={s}>{s}</option>)}</select>
  <label className="atelier__label" htmlFor="atelier-palette">02 / Палитра</label><div className="atelier__swatches">{colors.map(s=><button className={palette===s?'atelier__choice atelier__choice--active':'atelier__choice'} onClick={()=>setPalette(s)} type="button" key={s} aria-pressed={palette===s}>{s}</button>)}</div>
  <label className="atelier__label" htmlFor="atelier-budget">03 / Бюджет: {budget.toLocaleString('ru-RU')} ₽</label><input id="atelier-budget" type="range" min="3900" max="20000" step="100" value={budget} onChange={e=>setBudget(Number(e.target.value))}/><div className="atelier__range"><span>3 900 ₽</span><span>20 000 ₽</span></div>
  <label className="atelier__label" htmlFor="atelier-wishes">04 / Расскажите о получателе</label><textarea id="atelier-wishes" maxLength={500} rows={4} placeholder="Любит минимализм, нежные оттенки, необычные цветы..." value={wishes} onChange={e=>setWishes(e.target.value)}/>
  <button className="atelier__generate" type="button" onClick={generate} disabled={busy}>{busy?'Создаём концепцию…':'Создать концепцию ↗'}</button>
  <p className="atelier__fine">ИИ предлагает идею, но не гарантирует наличие цветов, итоговую цену или точный внешний вид букета.</p>
 </div><div className="atelier__result" aria-live="polite">{concept?<><p className="atelier__eyebrow">{mode==='ai'?'AI CONCEPT':'CONCEPT PREVIEW'} / VELUNE</p><div className="atelier__symbol" aria-hidden="true">✳</div><h3>{concept.title}</h3><p>{concept.story}</p><p className="atelier__label">Предполагаемый состав</p><ul>{concept.flowers.map((f,i)=><li key={i}>{f}</li>)}</ul><p className="atelier__notice">{concept.priceNote}</p><p className="atelier__notice">{concept.deliveryNote}</p>{error&&<p className="atelier__notice">{error}</p>}<button className="atelier__generate" type="button" onClick={async()=>{try{await navigator.clipboard.writeText(message);setCopied(true)}catch{setError('Не удалось скопировать. Выделите текст заявки вручную.')}}}>{copied?'Заявка скопирована ✓':'Скопировать заявку ↗'}</button><a className="atelier__telegram" href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noreferrer">Открыть Telegram флориста ↗</a><p className="atelier__fine">Отправьте скопированный текст в чат. Заявка не отправляется автоматически.</p></>:<><p className="atelier__eyebrow">YOUR PERSONAL COMPOSITION</p><div className="atelier__symbol" aria-hidden="true">✳</div><h3>У каждой истории — свои цветы.</h3><p>Выберите детали слева, и здесь появится персональная концепция, которую можно отправить флористу.</p><span className="atelier__placeholder">01 / ВДОХНОВЕНИЕ &nbsp;→&nbsp; 02 / КОНЦЕПЦИЯ &nbsp;→&nbsp; 03 / ФЛОРИСТ</span></>}</div></div></div></section>
}
