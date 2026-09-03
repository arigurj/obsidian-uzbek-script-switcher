/**
 * Регистрация команд плагина Uzbek Script Switcher.
 */
import { Editor, MarkdownFileInfo, MarkdownView, Notice, Plugin } from 'obsidian';
import { convertText, Direction } from './convert';

function convertSelection(
	editor: Editor,
	direction: Direction,
	label: string,
): void {
	const selection = editor.getSelection();
	if (!selection) {
		new Notice('No selected text to convert.');
		return;
	}

	const converted = convertText(selection, direction);
	if (converted === selection) {
		new Notice('Text did not change — script may already be correct.');
		return;
	}

	editor.replaceSelection(converted);
	new Notice(`✓ ${label}`);
}

export function registerCommands(plugin: Plugin): void {
	plugin.addCommand({
		id: 'convert-latin-to-cyrillic',
		name: 'Convert (Latin → Cyrillic)',
		editorCallback: (editor: Editor, _ctx: MarkdownView | MarkdownFileInfo) => {
			convertSelection(editor, 'latin-to-cyrillic', 'Latin → Cyrillic');
		},
	});

	plugin.addCommand({
		id: 'convert-cyrillic-to-latin',
		name: 'Convert (Cyrillic → Latin)',
		editorCallback: (editor: Editor, _ctx: MarkdownView | MarkdownFileInfo) => {
			convertSelection(editor, 'cyrillic-to-latin', 'Cyrillic → Latin');
		},
	});

	plugin.addCommand({
		id: 'convert-script-auto',
		name: 'Convert script (auto)',
		editorCallback: (editor: Editor, _ctx: MarkdownView | MarkdownFileInfo) => {
			const selection = editor.getSelection();
			if (!selection) {
				new Notice('No selected text.');
				return;
			}
			const detected: Direction = /[ғўҳқҒЎҲҚ]/.test(selection) ? 'cyrillic-to-latin' : 'latin-to-cyrillic';
			convertSelection(editor, detected, detected === 'latin-to-cyrillic' ? 'auto: Latin → Cyrillic' : 'auto: Cyrillic → Latin');
		},
	});
}
