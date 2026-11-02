import './Collection.css'

const items = [
  { name: 'ÉPURE', category: 'Нежная классика', price: 'от 3 900 ₽', note: 'Лёгкая композиция для знаков внимания', tone: 'pearl' },
  { name: 'SIGNATURE', category: 'Фирменная коллекция', price: 'от 5 500 ₽', note: 'Выразительный букет с характером', tone: 'rose' },
  { name: 'ATELIER', category: 'Персональный букет', price: 'от 7 900 ₽', note: 'Соберём по вашим пожеланиям', tone: 'wine' },
]
export function Collection({onOrderClick}:{onOrderClick:()=>void}) {
 return <section className="collection section" id="collection"><div className="container">
 <div className="collection__intro"><div><p className="section-label">THE COLLECTION / 01</p><h2 className="section-title">ЦВЕТЫ. СМЫСЛ. МОМЕНТ.</h2></div><p className="section-subtitle">Три способа сказать главное. Каждый букет собирается индивидуально; итоговый состав и стоимость согласовываются до оплаты.</p></div>
 <div className="collection__grid">{items.map((item, i)=><article className={`collection__card collection__card--${item.tone}`} key={item.name}><div className="collection__art"><span className="collection__orb"/><span className="collection__serial">0{i+1} / VELUNE</span><span className="collection__artword">{item.name}</span></div><div className="collection__info"><div><p className="collection__category">{item.category}</p><h3>{item.name}</h3><p className="collection__note">{item.note}</p></div><div className="collection__bottom"><strong>{item.price}</strong><button onClick={onOrderClick} type="button">Обсудить букет ↗</button></div></div></article>)}</div>
 <p className="collection__disclaimer">Иллюстративные ценовые категории, не оферта. Перед запуском замените графику на фото реальных композиций.</p>
 </div></section>
}
