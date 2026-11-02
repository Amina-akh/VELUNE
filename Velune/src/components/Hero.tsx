import './Hero.css'

interface HeroProps {
  onOrderClick: () => void
}

export function Hero({ onOrderClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__watermark" aria-hidden="true">VELUNE</div>

      <div className="hero__corners" aria-hidden="true">
        <span className="hero__corner hero__corner--tl" />
        <span className="hero__corner hero__corner--tr" />
        <span className="hero__corner hero__corner--bl" />
        <span className="hero__corner hero__corner--br" />
      </div>

      <div className="container hero__inner">
        <div className="hero__meta">
          <span className="hero__meta-item">MOSCOW</span>
          <span className="hero__meta-sep">/</span>
          <span className="hero__meta-item">55.7558° N</span>
          <span className="hero__meta-sep">/</span>
          <span className="hero__meta-item hero__meta-item--live">
            <span className="hero__live-dot" />
            МОСКВА
          </span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">БУКЕТ,</span>
          <span className="hero__title-line hero__title-line--accent">В КОТОРОМ</span>
          <span className="hero__title-line hero__title-line--dim">ОНА УЗНАЕТ СЕБЯ</span>
        </h1>

        <div className="hero__body">
          <p className="hero__subtitle">
            Авторские букеты и персональный подбор для важных моментов.
            Расскажите о человеке — мы предложим композицию и согласуем детали до заказа.
          </p>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={onOrderClick}>
              Подобрать букет
            </button>
            <a href="#atelier" className="btn btn--outline">
              AI-конструктор
            </a>
          </div>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">01</span>
            <span className="hero__stat-label">подход</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">01</span>
            <span className="hero__stat-label">она</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">МСК</span>
            <span className="hero__stat-label">доставка по согласованию</span>
          </div>
          <div className="hero__stat hero__stat--wide">
            <span className="hero__stat-quote">
              «Не дари мне цветы» — значит не дари скучные
            </span>
          </div>
        </div>
      </div>

      <div className="hero__moon" aria-hidden="true">
        <div className="hero__moon-disc" />
      </div>
    </section>
  )
}
