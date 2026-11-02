import './HowItWorks.css'

const STEPS = [
  {
    num: '01',
    title: 'Опиши её',
    text: 'Характер, стиль, что любит и что точно не дарить. Чем конкретнее — тем точнее результат.',
    tag: 'INPUT',
  },
  {
    num: '02',
    title: 'Собираю',
    text: 'Премиальный состав, персональная сборка под неё. Каждый стебель — осознанный выбор.',
    tag: 'PROCESS',
  },
  {
    num: '03',
    title: 'Согласуем',
    text: 'Фото до отправки. Не ок — правим. Пока не сказал «едет» — не едет.',
    tag: 'APPROVE',
  },
  {
    num: '04',
    title: 'Она получает',
    text: 'Доставка по Москве. Анонимно или с открыткой. Момент важнее цены.',
    tag: 'DELIVER',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="section how">
      <div className="container">
        <div className="how__header">
          <div>
            <p className="section-label">Процесс</p>
            <h2 className="section-title">4 шага<br />до её букета</h2>
          </div>
          <p className="how__aside">
            Никаких «выберите букет №7».
            Только персональная сборка.
          </p>
        </div>

        <div className="how__list">
          {STEPS.map((step, i) => (
            <div key={step.num} className="how__step">
              <div className="how__step-left">
                <span className="how__num">{step.num}</span>
                {i < STEPS.length - 1 && <div className="how__connector" />}
              </div>
              <div className="how__step-body">
                <div className="how__step-top">
                  <h3 className="how__title">{step.title}</h3>
                  <span className="how__tag">{step.tag}</span>
                </div>
                <p className="how__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
