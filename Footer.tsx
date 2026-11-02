import { Logo } from './Logo'
import './Footer.css'

interface FooterProps {
  onOrderClick: () => void
}

export function Footer({ onOrderClick }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__cta-block">
        <div className="container footer__cta-inner">
          <div className="footer__cta-text">
            <span className="footer__cta-label">Ready?</span>
            <h2 className="footer__cta-title">Опиши её.<br />Остальное — на мне.</h2>
          </div>
          <button type="button" className="btn btn--primary footer__cta-btn" onClick={onOrderClick}>
            Оформить заказ
          </button>
        </div>
      </div>

      <div className="container footer__bottom">
        <div className="footer__brand">
          <Logo size={20} variant="mark" />
          <span className="footer__name">Velune</span>
        </div>
        <div className="footer__info">
          <span>Москва</span>
          <span className="footer__sep">·</span>
          <span>Доставка по городу</span>
          <span className="footer__sep">·</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  )
}
