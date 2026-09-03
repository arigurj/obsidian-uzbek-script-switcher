import { Plugin } from 'obsidian';
import { registerCommands } from './commands';

export default class UzbekScriptSwitcher extends Plugin {
	async onload(): Promise<void> {
		console.log('[Uzbek Script Switcher] loading...');
		registerCommands(this);
		console.log('[Uzbek Script Switcher] loaded with 3 commands');
	}
}
