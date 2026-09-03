# Uzbek Script Switcher

Плагин для [Obsidian](https://obsidian.md/), переводящий текст между узбекской латиницей и кириллицей.

---

## The Problem

Uzbek is written in both Latin and Cyrillic scripts. Ever typed in the wrong script? This plugin fixes it with a single keystroke.

## Commands

In the command palette (`Ctrl+P` / `Cmd+P`):

| Command | Description |
|---------|-------------|
| **Convert (Latin → Cyrillic)** | Forced conversion: Latin → Cyrillic |
| **Convert (Cyrillic → Latin)** | Forced conversion: Cyrillic → Latin |
| **Convert script (auto)** | Auto-detect direction |

## Usage

1. Select the text in the wrong script.
2. Open the command palette (`Ctrl+P` / `Cmd+P`).
3. Pick «Convert script».
4. The text converts instantly.

Bind a hotkey in **Settings → Hotkeys** (e.g. `Ctrl+Shift+U`) for quick access.

## Installation

### Obsidian Community plugins

Available in **Settings → Community plugins → Browse** as **Uzbek Script Switcher**.

### Manual

1. Download `main.js`, `manifest.json`, `styles.css` from the [releases](https://github.com/arigurj/obsidian-uzbek-script-switcher/releases).
2. Place them in `<vault>/.obsidian/plugins/uzbek-script-switcher/`.
3. Enable the plugin in **Settings → Community plugins**.

### Development

```bash
git clone https://github.com/arigurj/obsidian-uzbek-script-switcher.git
cd obsidian-uzbek-script-switcher
npm install
npm run dev   # watch mode
npm run build # production build
```

## Supported characters

All Uzbek Latin letters including digraphs `gʻ` (ғ), `oʻ` (ў), and all Cyrillic equivalents.

## License

MIT © arigurj

---

## Описание на русском

Плагин для [Obsidian](https://obsidian.md/), переводящий текст между узбекской латиницей и кириллицей.

### Проблема

Узбекский язык использует две письменности — латиницу и кириллицу. Этот плагин мгновенно конвертирует текст между ними.

### Команды

| Команда | Описание |
|---------|----------|
| **Convert (Latin → Cyrillic)** | Принудительная конвертация: латиница → кириллица |
| **Convert (Cyrillic → Latin)** | Принудительная конвертация: кириллица → латиница |
| **Convert script (auto)** | Автоматическое определение направления |

### Установка

Доступен в **Settings → Community plugins → Browse** как **Uzbek Script Switcher**.

### Лицензия

MIT © arigurj
