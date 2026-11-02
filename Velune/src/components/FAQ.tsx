import './FAQ.css'

const ITEMS = [
  {
    q: 'Есть каталог?',
    a: 'Нет. Каждый букет — под конкретную девушку. Не «как на фото», а под неё.',
  },
  {
    q: 'Сколько стоит?',
    a: 'От 10 000 ₽ за авторскую сборку. Премиальный состав и уровень — под повод и твои ожидания.',
  },
  {
    q: 'Можно срочно?',
    a: 'От 3–4 часов при срочном заказе. Чем раньше напишешь — тем спокойнее процесс.',
  },
  {
    q: 'Она не любит цветы',
    a: 'Она не любит скучные. Подберём форму, которая зайдёт. Иногда скажем честно — лучше другой жест.',
  },
  {
    q: 'Анонимно?',
    a: 'Да. Без проблем.',
  },
  {
    q: 'Не понравится фото до отправки?',
    a: 'Правим. Пока не сказал «ок» — букет не едет.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="section faq">
      <div className="container container--narrow">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Вопросы</h2>

        <div className="faq__list">
          {ITEMS.map((item, i) => (
            <details key={item.q} className="faq__item">
              <summary className="faq__question">
                <span className="faq__q-num">{String(i + 1).padStart(2, '0')}</span>
                {item.q}
              </summary>
              <p className="faq__answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
