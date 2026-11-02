const STATEMENTS = [
  {
    num: '01',
    title: 'Не продаём цветы',
    text: 'Продаём момент, когда она узнаёт в букете себя.',
  },
  {
    num: '02',
    title: 'Без каталога',
    text: 'Каталог — это когда ты выбираешь за других. Мы собираем под неё.',
  },
  {
    num: '03',
    title: 'Честно',
    text: 'Иногда скажем: не дари цветы. Сначала — поступки. Потом — букет.',
  },
]

export function Manifest() {
  return (
    <section id="manifest" className="section manifest">
      <div className="container">
        <p className="section-label">Философия</p>
        <h2 className="section-title">Не магазин.<br />Стиль.</h2>

        <div className="manifest__grid">
          {STATEMENTS.map((s) => (
            <article key={s.num} className="manifest__card">
              <span className="manifest__num">{s.num}</span>
              <h3 className="manifest__title">{s.title}</h3>
              <p className="manifest__text">{s.text}</p>
              <div className="manifest__line" />
            </article>
          ))}
        </div>

        <div className="manifest__banner">
          <span className="manifest__banner-label">Velune / для неё</span>
          <p className="manifest__banner-text">
            Ты не обязан разбираться в цветах.
            Ты обязан сделать впечатление.
          </p>
        </div>
      </div>
    </section>
  )
}
