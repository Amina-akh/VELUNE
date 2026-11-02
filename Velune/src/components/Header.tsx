import { Logo } from './Logo'
import './Header.css'

interface HeaderProps {
  onOrderClick: () => void
}

export function Header({ onOrderClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="#" className="header__brand">
          <Logo size={22} variant="mark" />
          <div className="header__brand-text">
            <span className="header__name">Velune</span>
            <span className="header__tag">floral styling</span>
          </div>
        </a>

        <nav className="header__nav">
          <a href="#collection" className="header__link">
            <span className="header__link-num">01</span>
            Коллекция
          </a>
          <a href="#atelier" className="header__link">
            <span className="header__link-num">02</span>
            AI Atelier
          </a>
          <a href="#how" className="header__link">
            <span className="header__link-num">03</span>
            Процесс
          </a>
          <a href="#faq" className="header__link">
            <span className="header__link-num">04</span>
            FAQ
          </a>
          <button type="button" className="header__cta" onClick={onOrderClick}>
            Заказать
            <span className="header__cta-arrow">→</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
