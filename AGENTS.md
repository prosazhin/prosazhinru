# AGENTS.md

## Обзор проекта

Персональный сайт [prosazhin.ru](https://prosazhin.ru) — мультиязычный (ru/en) портфолио-сайт на Next.js App Router с данными из Contentful CMS.

## Технологический стек

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript 5.9 + JavaScript (`.jsx` для страниц и data-файлов)
- **React:** 19
- **Styling:** Tailwind CSS 4 + pbstyles (кастомная тема)
- **UI:** @pbcomponents/react, @heroicons/react, clsx
- **CMS:** Contentful (headless)
- **i18n:** i18next + react-i18next + next-i18n-router
- **Deploy:** Vercel (standalone output)
- **Node.js:** >=22.22.0

## Структура проекта

```
src/
├── app/[locale]/          # Страницы (App Router, динамическая локаль)
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Главная
│   ├── career/            # Карьера
│   ├── posts/             # Заметки (Contentful)
│   ├── projects/          # Проекты (Contentful)
│   ├── links/             # Ссылки (Contentful)
│   ├── (matrix)/          # Route group — матрицы компетенций
│   └── [...not-found]/    # 404
├── components/            # React-компоненты
│   └── aside/             # Боковая панель
├── data/                  # Статические данные (JS)
├── hooks/                 # Custom React hooks
├── i18n/                  # Конфигурация i18next + locales (ru, en)
├── lib/                   # Contentful API клиент и методы
├── styles/                # globals.css (Tailwind + pbstyles)
├── utils/                 # Утилиты (formatter, get-metadata, get-query)
├── proxy.ts               # i18n middleware
└── types.ts               # TypeScript типы
```

## Соглашения по коду

### Именование файлов

- Компоненты: **PascalCase** (`Header.tsx`, `MatrixBanner.tsx`)
- Утилиты/хуки: **kebab-case** (`get-metadata.ts`, `use-hash.ts`)
- Данные: **kebab-case** (`skills.js`, `nav.js`)
- Страницы: `page.jsx`, `layout.jsx`

### Компоненты

- Server Components по умолчанию (async функции)
- Client Components помечаются `'use client'` в начале файла
- Default export для компонентов
- Named export для утилит, типов и API-методов

### Импорты

- Абсолютные пути через alias `@/*` → `./src/*`
- Порядок: внешние пакеты → внутренние компоненты → утилиты → типы
- Сортировка автоматически через `prettier-plugin-organize-imports`

### Стилизация

- Tailwind CSS utility-классы, без CSS Modules
- Кастомная тема из `pbstyles/styles/tailwind/theme.css`
- Условные классы через `clsx`
- Responsive: `desktop:`, `max-xs:`, `sm-min:`, `md-min:`, `lg-min:`, `xl:`
- Print-стили: `print:hidden`, `print:block`

### TypeScript

- Strict mode включён
- Все типы определены в `src/types.ts`
- Суффикс `Type` для типов (`LangType`, `TagType`, `ProjectType`)

## Работа с данными

### Contentful CMS

- Класс `API` в `src/lib/contentful.js` — обёртка над Contentful SDK
- Методы запросов в `src/lib/api.js`: `matrixMethods`, `tagsMethods`, `linksMethods`, `compilationsMethods`, `postsMethods`, `projectsMethods`
- Нормализация через `getObject()` — маппинг полей Contentful в плоские объекты
- Данные загружаются в Server Components через async/await

### Статические данные

- `src/data/` — навигация, навыки, карьера, контакты (JS-файлы)

## Интернационализация

- Два языка: `ru` (default), `en`
- Роутинг через `[locale]` сегмент в App Router
- Middleware: `src/proxy.ts` (next-i18n-router)
- Переводы: `src/i18n/locales/{ru,en}/main.json`
- Инициализация: `initTranslations(locale)` → `{ t, resources }`
- Client-компоненты оборачиваются в `<TranslationsProvider>`

## SEO

- Метаданные генерируются через `generateMetadata()` + `src/utils/get-metadata.ts`
- Open Graph, Twitter Cards, canonical URL
- Sitemap/robots: `next-sitemap` (конфиг в `next-sitemap.config.js`)

## Линтинг и форматирование

- **ESLint 10:** `eslint-config-next` (core-web-vitals + typescript) + Prettier
- **Prettier:** single quotes, trailing comma es5, print width 100, single attribute per line
- **Git hooks:** `simple-git-hooks` + `lint-staged` (Prettier + ESLint на pre-commit)
- **Commits:** conventional commits через `commitlint`

## Команды

| Команда          | Описание                    |
| ---------------- | --------------------------- |
| `npm run dev`    | Dev-сервер на порту 8080    |
| `npm run build`  | Production-сборка + sitemap |
| `npm run start`  | Запуск production-сервера   |
| `npm run lint`   | ESLint проверка             |
| `npm run format` | Prettier форматирование     |

## Переменные окружения

- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` — Contentful Space ID
- `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` — Contentful Access Token
- `NEXT_PUBLIC_NODE_ENV` — окружение
