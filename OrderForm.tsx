import { useState } from 'react'
import {
  OrderFormData,
  initialOrderForm,
  Occasion,
  DeliveryType,
} from '../types/order'
import { saveOrder, formatOrderMessage, OCCASION_LABELS, BUDGET_LABELS, BUDGET_ORDER, DELIVERY_LABELS } from '../utils/order'
import { TELEGRAM_USERNAME } from '../config'
import './OrderForm.css'

const STEPS = [
  { id: 'contact', title: 'Контакт', subtitle: 'Как с тобой связаться' },
  { id: 'occasion', title: 'Повод', subtitle: 'Когда и зачем' },
  { id: 'about', title: 'Получатель', subtitle: 'Помоги нам подобрать настроение букета' },
  { id: 'bouquet', title: 'Букет', subtitle: 'Уровень и авторская сборка' },
  { id: 'delivery', title: 'Доставка', subtitle: 'Куда и как' },
  { id: 'review', title: 'Проверка', subtitle: 'Всё верно?' },
] as const

interface OrderFormProps {
  onClose: () => void
}

interface OrderSuccessProps {
  orderId: string
  message: string
  onClose: () => void
}

function OrderSuccess({ orderId, message, onClose }: OrderSuccessProps) {
  return (
    <div className="order-success">
      <div className="order-success__moon" aria-hidden="true" />
      <p className="order-success__label">Заявка подготовлена</p>
      <h2 className="order-success__title">Остался один шаг</h2>
      <p className="order-success__text">
        Заявка <strong>#{orderId}</strong> подготовлена на этом устройстве, но ещё не подтверждена магазином. Открой Telegram и отправь подготовленный текст в чат{' '}
        <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noreferrer" className="order-success__link">
          @{TELEGRAM_USERNAME}
        </a>
      </p>
      <button type="button" className="order-form__btn order-form__btn--primary" onClick={() => navigator.clipboard.writeText(message)}>Скопировать заявку</button>
      <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noreferrer" className="order-form__btn order-form__btn--primary">Открыть Telegram</a>
      <button type="button" className="order-form__btn order-form__btn--ghost" onClick={onClose}>
        Закрыть
      </button>
    </div>
  )
}

export function OrderForm({ onClose }: OrderFormProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<OrderFormData>(initialOrderForm)
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({})
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [submittedMessage, setSubmittedMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = <K extends keyof OrderFormData>(key: K, value: OrderFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {}

    if (stepIndex === 0) {
      if (!form.clientName.trim()) newErrors.clientName = 'Укажи имя'
      if (!form.phone.trim()) newErrors.phone = 'Укажи телефон'
      else if (!/^[\d\s+\-()]{10,}$/.test(form.phone)) newErrors.phone = 'Некорректный номер'
    }

    if (stepIndex === 1) {
      if (!form.occasion) newErrors.occasion = 'Выбери повод'
      if (form.occasion === 'other' && !form.occasionOther.trim())
        newErrors.occasionOther = 'Опиши повод'
      if (!form.deliveryDate) newErrors.deliveryDate = 'Укажи дату'
    }

    if (stepIndex === 2) {
      // Описание характера необязательно — заказ можно оформить и без него
    }

    if (stepIndex === 3) {
      if (!form.budget) newErrors.budget = 'Выбери уровень'
    }

    if (stepIndex === 4) {
      if (!form.deliveryType) newErrors.deliveryType = 'Выбери способ доставки'
      if (!form.address.trim()) newErrors.address = 'Укажи адрес'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    if (!validateStep(4)) {
      setStep(4)
      return
    }

    setSubmitting(true)

    const orderId = saveOrder(form)
    const message = formatOrderMessage(form, orderId)
    setSubmittedMessage(message)
    // Telegram is opened manually: no backend exists to confirm or deliver an order.

    await new Promise((r) => setTimeout(r, 600))
    setSubmitted(orderId)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="order-overlay" role="dialog" aria-modal="true" aria-label="Заявка подготовлена">
        <div className="order-modal">
          <OrderSuccess orderId={submitted} message={submittedMessage} onClose={onClose} />
        </div>
      </div>
    )
  }

  const current = STEPS[step]

  return (
    <div className="order-overlay" role="dialog" aria-modal="true" aria-label="Оформление заказа">
      <div className="order-modal">
        <div className="order-form">
          <div className="order-form__header">
            <div>
              <p className="order-form__step-label">
                Шаг {step + 1} из {STEPS.length}
              </p>
              <h2 className="order-form__title">{current.title}</h2>
              <p className="order-form__subtitle">{current.subtitle}</p>
            </div>
            <button type="button" className="order-form__close" onClick={onClose} aria-label="Закрыть">
              ESC
            </button>
          </div>

          <div className="order-form__progress">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`order-form__progress-dot ${i <= step ? 'order-form__progress-dot--active' : ''} ${i < step ? 'order-form__progress-dot--done' : ''}`}
              />
            ))}
          </div>

          <div className="order-form__body">
            {step === 0 && (
              <div className="order-form__fields">
                <Field label="Твоё имя" error={errors.clientName}>
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={(e) => update('clientName', e.target.value)}
                    placeholder="Как к тебе обращаться"
                    autoFocus
                  />
                </Field>
                <Field label="Телефон" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+7 999 000 00 00"
                  />
                </Field>
                <Field label="Telegram (необязательно)" hint="Для быстрой связи">
                  <input
                    type="text"
                    value={form.telegram}
                    onChange={(e) => update('telegram', e.target.value)}
                    placeholder="@username"
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="order-form__fields">
                <Field label="Повод" error={errors.occasion}>
                  <div className="order-form__chips">
                    {(Object.entries(OCCASION_LABELS) as [Occasion, string][]).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={`order-form__chip ${form.occasion === value ? 'order-form__chip--active' : ''}`}
                        onClick={() => update('occasion', value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
                {form.occasion === 'other' && (
                  <Field label="Какой повод?" error={errors.occasionOther}>
                    <input
                      type="text"
                      value={form.occasionOther}
                      onChange={(e) => update('occasionOther', e.target.value)}
                      placeholder="Опиши"
                    />
                  </Field>
                )}
                <div className="order-form__row">
                  <Field label="Дата доставки" error={errors.deliveryDate}>
                    <input
                      type="date"
                      value={form.deliveryDate}
                      onChange={(e) => update('deliveryDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </Field>
                  <Field label="Время">
                    <input
                      type="time"
                      value={form.deliveryTime}
                      onChange={(e) => update('deliveryTime', e.target.value)}
                    />
                  </Field>
                </div>
                <label className="order-form__checkbox">
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) => update('isUrgent', e.target.checked)}
                  />
                  <span>Нужно срочно (по согласованию)</span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="order-form__fields">
                <div className="order-form__row">
                  <Field label="Имя получателя (необязательно)">
                    <input
                      type="text"
                      value={form.herName}
                      onChange={(e) => update('herName', e.target.value)}
                      placeholder="Имя"
                    />
                  </Field>
                  <Field label="Возраст (необязательно)">
                    <input
                      type="text"
                      value={form.herAge}
                      onChange={(e) => update('herAge', e.target.value)}
                      placeholder="24"
                    />
                  </Field>
                </div>
                <Field
                  label="Характер (необязательно)"
                  error={errors.herPersonality}
                  hint="Спокойная, яркая, минималист, романтик..."
                >
                  <textarea
                    value={form.herPersonality}
                    onChange={(e) => update('herPersonality', e.target.value)}
                    placeholder="Например: любит минимализм, нежные оттенки, необычные цветы"
                    rows={3}
                  />
                </Field>
                <Field label="Что ей нравится" hint="Цвета, хобби, стиль жизни">
                  <textarea
                    value={form.herLikes}
                    onChange={(e) => update('herLikes', e.target.value)}
                    placeholder="Пастельные тона, книги, кофе, минимализм..."
                    rows={2}
                  />
                </Field>
                <Field label="Чего точно не дарить" hint="Это важно">
                  <textarea
                    value={form.herDislikes}
                    onChange={(e) => update('herDislikes', e.target.value)}
                    placeholder="Красные розы, огромные букеты, банты..."
                    rows={2}
                  />
                </Field>
                <Field label="Стиль / профессия (необязательно)">
                  <input
                    type="text"
                    value={form.herStyle}
                    onChange={(e) => update('herStyle', e.target.value)}
                    placeholder="Врач, айти, любит минимализм..."
                  />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="order-form__fields">
                <Field
                  label="Бюджет букета"
                  error={errors.budget}
                  hint="Итоговую стоимость и наличие подтвердит флорист"
                >
                  <div className="order-form__chips">
                    {BUDGET_ORDER.map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`order-form__chip ${form.budget === value ? 'order-form__chip--active' : ''} ${value === '5000-6900' ? 'order-form__chip--rec' : ''}`}
                        onClick={() => update('budget', value)}
                      >
                        {BUDGET_LABELS[value]}
                        {value === '5000-6900' && (
                          <span className="order-form__chip-badge">optimal</span>
                        )}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Предпочтения по цветам (необязательно)">
                  <input
                    type="text"
                    value={form.colorPreference}
                    onChange={(e) => update('colorPreference', e.target.value)}
                    placeholder="Нежные, тёмные, без розового..."
                  />
                </Field>
                <Field label="Дополнительно (необязательно)">
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Всё, что поможет собрать идеальный букет"
                    rows={3}
                  />
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="order-form__fields">
                <Field label="Способ доставки" error={errors.deliveryType}>
                  <div className="order-form__chips">
                    {(Object.entries(DELIVERY_LABELS) as [DeliveryType, string][]).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={`order-form__chip ${form.deliveryType === value ? 'order-form__chip--active' : ''}`}
                        onClick={() => {
                          update('deliveryType', value)
                          update('anonymous', value === 'anonymous')
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Адрес доставки" error={errors.address}>
                  <textarea
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Улица, дом, подъезд, этаж, комментарий для курьера"
                    rows={2}
                  />
                </Field>
                <Field label="Телефон получателя (необязательно)">
                  <input
                    type="tel"
                    value={form.recipientPhone}
                    onChange={(e) => update('recipientPhone', e.target.value)}
                    placeholder="+7 999 000 00 00"
                  />
                </Field>
                <Field label="Текст открытки (необязательно)">
                  <textarea
                    value={form.cardMessage}
                    onChange={(e) => update('cardMessage', e.target.value)}
                    placeholder="Что написать от твоего имени"
                    rows={2}
                  />
                </Field>
              </div>
            )}

            {step === 5 && (
              <div className="order-form__review">
                <ReviewBlock title="Контакт">
                  <ReviewRow label="Имя" value={form.clientName} />
                  <ReviewRow label="Телефон" value={form.phone} />
                  {form.telegram && <ReviewRow label="Telegram" value={form.telegram} />}
                </ReviewBlock>
                <ReviewBlock title="Повод">
                  <ReviewRow
                    label="Повод"
                    value={
                      form.occasion === 'other'
                        ? form.occasionOther
                        : form.occasion
                          ? OCCASION_LABELS[form.occasion]
                          : '—'
                    }
                  />
                  <ReviewRow label="Дата" value={form.deliveryDate} />
                  {form.deliveryTime && <ReviewRow label="Время" value={form.deliveryTime} />}
                  {form.isUrgent && <ReviewRow label="Срочно" value="Да" />}
                </ReviewBlock>
                <ReviewBlock title="О ней">
                  {form.herName && <ReviewRow label="Имя" value={form.herName} />}
                  <ReviewRow label="Характер (необязательно)" value={form.herPersonality} />
                  {form.herLikes && <ReviewRow label="Любит" value={form.herLikes} />}
                  {form.herDislikes && <ReviewRow label="Не любит" value={form.herDislikes} />}
                </ReviewBlock>
                <ReviewBlock title="Букет">
                  <ReviewRow label="Бюджет букета" value={form.budget ? BUDGET_LABELS[form.budget] : '—'} />
                  {form.colorPreference && <ReviewRow label="Цвета" value={form.colorPreference} />}
                  {form.notes && <ReviewRow label="Пожелания" value={form.notes} />}
                </ReviewBlock>
                <ReviewBlock title="Доставка">
                  <ReviewRow
                    label="Способ"
                    value={form.deliveryType ? DELIVERY_LABELS[form.deliveryType] : '—'}
                  />
                  <ReviewRow label="Адрес" value={form.address} />
                  {form.cardMessage && <ReviewRow label="Открытка" value={form.cardMessage} />}
                </ReviewBlock>
              </div>
            )}
          </div>

          <div className="order-form__footer">
            {step > 0 ? (
              <button type="button" className="order-form__btn order-form__btn--ghost" onClick={back}>
                Назад
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button type="button" className="order-form__btn order-form__btn--primary" onClick={next}>
                Далее
              </button>
            ) : (
              <button
                type="button"
                className="order-form__btn order-form__btn--primary"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? 'Отправка...' : 'Отправить заказ'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className={`order-form__field ${error ? 'order-form__field--error' : ''}`}>
      <label className="order-form__label">
        {label}
        {hint && <span className="order-form__hint">{hint}</span>}
      </label>
      {children}
      {error && <span className="order-form__error">{error}</span>}
    </div>
  )
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="order-form__review-block">
      <h3 className="order-form__review-title">{title}</h3>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="order-form__review-row">
      <span className="order-form__review-label">{label}</span>
      <span className="order-form__review-value">{value}</span>
    </div>
  )
}
