# Velune — веб-приложение для заказа букетов

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173)

## Telegram-уведомления

Создай файл `.env` в корне проекта:

```
VITE_TELEGRAM_USERNAME=theaminasoul
```

После отправки заказа откроется Telegram с готовым текстом заказа.

## Сборка

```bash
npm run build
npm run preview
```

## Что внутри

- Лендинг в стиле бренда Velune
- Пошаговая форма заказа (6 шагов)
- Сохранение заказов в localStorage
- Отправка в Telegram (опционально)
