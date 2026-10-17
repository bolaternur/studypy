# Шрифты StudyPy

Inter и JetBrains Mono размещены локально. Новых npm-зависимостей нет.

Получены те же normal WOFF2-подмножества latin, cyrillic и cyrillic-ext, которые до изменения выдавал Google Fonts CSS для Inter 300/400/500/600/700 и JetBrains Mono 400/500/700. URL Google Fonts: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap . Проверено 16 октября 2026 года с современным Chrome User-Agent.

Локальные @font-face сохраняют семейства, normal style, диапазоны весов, unicode-range и font-display: swap. WOFF2-файлы не изменены. Подмножества загружаются по используемым символам; предзагрузка всех файлов не добавлена. Символы вне этих подмножеств используют существующие системные fallback-шрифты.

| Файл | Размер, байт | Первичный URL | SHA-256 |
|---|---:|---|---|
| inter-cyrillic-ext.woff2 | 25960 | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2 | ca157063339ac4ad418f214f3abfed119b0798ab4d377386ce5c9e5a7a435ebd |
| inter-cyrillic.woff2 | 18748 | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2 | 71d5ee93cc1e9f1d520a3a8b66456de18c7879d8df09d57fcd2eaff75fef0075 |
| inter-latin.woff2 | 48256 | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 | 3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62 |
| jetbrains-mono-cyrillic-ext.woff2 | 1640 | https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2 | 62213be8a78b42f1e29d1452d91e2f8b3e745572a9dd98d3941e39fa00b37d76 |
| jetbrains-mono-cyrillic.woff2 | 8872 | https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2 | e17cfd15fb96909d64095015f958207063a0c07191da3512df7d560a781aebdf |
| jetbrains-mono-latin.woff2 | 31432 | https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2 | 83c005d49d8a6a50474c73a5a36ac0468076e9c4a29da7bdb14995d80560a5be |

Всего WOFF2: 134908 байт.

## Лицензии

Оба семейства распространяются по SIL Open Font License 1.1. Полные оригинальные уведомления и лицензии сохранены рядом с файлами шрифтов и входят в production-сборку:

- public/fonts/Inter-OFL.txt: Copyright (c) 2016 The Inter Project Authors. Источник: https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt
- public/fonts/JetBrainsMono-OFL.txt: Copyright 2020 The JetBrains Mono Project Authors. Источник: https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/OFL.txt

## Граница проверки загрузки

Удалён внешний render-blocking Google Fonts CSS @import. Обычный app CSS остаётся отдельной зависимостью отрисовки в production. Начальный индикатор имеет собственные inline-стили и существует до React. font-display: swap разрешает системный fallback до загрузки WOFF2. Это изменение устраняет внешний CSS из цепочки, но не является замером ускорения на реальной холодной сети. Контролируемый browser smoke отдельно показывает влияние искусственно задержанного внешнего CSS и не сообщает его результаты как реальную прибавку скорости.

## Повторяемая проверка

После запуска StudyPy откройте отдельную сессию Playwright CLI на его локальном URL и выполните `run-code --filename=scripts/browser-font-loading-smoke.js`. Проверка читает текущий app CSS (dev или production), проверяет WOFF2 по HTTP и декодирование трёх подмножеств обоих семейств для весов 400/700. Google Fonts в основном font-only сценарии заблокирован; приложение и база данных в синтетических страницах не запускаются. Дополнительный A/B-сценарий воспроизводит только зависимость от внешнего CSS с искусственной задержкой 2000 мс; его FCP не является замером реальной скорости сайта.

Проверено 16 октября 2026 года: 6 файлов отдаются с HTTP 200 и сигнатурой wOF2; все 4 family/weight проверки декодирования прошли, внешних запросов шрифтов 0. Production-сборка прошла, в её app CSS ровно 6 локальных @font-face и нет Google Fonts CSS. Файлы WOFF2 и обе полные OFL-лицензии скопированы в dist/fonts побайтно. Реальная холодная сеть и Lighthouse в этом изменении не измерялись.
