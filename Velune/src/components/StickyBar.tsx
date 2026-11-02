import './StickyBar.css'

interface StickyBarProps {
  onOrderClick: () => void
}

export function StickyBar({ onOrderClick }: StickyBarProps) {
  return (
    <div className="sticky-bar">
      <button type="button" className="sticky-bar__btn" onClick={onOrderClick}>
        <span className="sticky-bar__label">Velune</span>
        <span className="sticky-bar__action">Заказать →</span>
      </button>
    </div>
  )
}
