const ITEMS = [
  'БЕЗ КАТАЛОГА',
  'ПОД НЕЁ',
  'МОСКВА',
  'VELUNE',
  'БЕЗ ОШИБОК',
  'АВТОРСКАЯ СБОРКА',
  'БЕЗ ШАБЛОНОВ',
  'ПОД ЕЁ ХАРАКТЕР',
]

export function Marquee() {
  const track = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
