/**
 * Конвертация текста между узбекской латиницей и кириллицей.
 */
import { latinToCyrillic, cyrillicToLatin } from './maps';

export type Direction = 'auto' | 'latin-to-cyrillic' | 'cyrillic-to-latin';

/** Конвертирует одиночный символ кириллицы в латиницу */
function cyrillicCharToLatin(ch: string): string {
	for (const [cy, la] of cyrillicToLatin) {
		if (ch === cy) return la;
	}
	return ch;
}

/** Конвертирует одиночный символ латиницы в кириллицу */
function latinCharToCyrillic(ch: string, nextCh: string | undefined): { out: string; skip: number } {
	// Диграфы с ʻ или ' (gʻ, oʻ, Gʻ, Oʻ)
	const isModifierApostrophe = nextCh === '\u02BB' || nextCh === '\'';
	if ((ch === 'g' || ch === 'o' || ch === 'G' || ch === 'O') && isModifierApostrophe) {
		const pair = ch + '\u02BB';
		for (const [la, cy] of latinToCyrillic) {
			if (pair === la) return { out: cy, skip: 1 };
		}
	}

	// Диграфы sh/ch
	if ((ch === 's' || ch === 'S') && nextCh === 'h') {
		return { out: ch === 'S' ? 'Ш' : 'ш', skip: 1 };
	}
	if ((ch === 'c' || ch === 'C') && nextCh === 'h') {
		return { out: ch === 'C' ? 'Ч' : 'ч', skip: 1 };
	}

	// Одиночный символ
	for (const [la, cy] of latinToCyrillic) {
		if (ch === la) return { out: cy, skip: 0 };
	}

	return { out: ch, skip: 0 };
}

/** Подсчёт количества символов из данного алфавита в тексте */
function countScript(text: string, script: 'cyrillic' | 'latin'): number {
	const cyrillicSet = new Set(['ғ', 'ў', 'ҳ', 'қ', 'ш', 'ч', 'Ғ', 'Ў', 'Ҳ', 'Қ', 'Ш', 'Ч', 'а', 'б', 'д', 'е', 'ф', 'г', 'ҳ', 'и', 'ж', 'к', 'л', 'м', 'н', 'о', 'п', 'қ', 'р', 'с', 'т', 'у', 'в', 'х', 'й', 'з', 'А', 'Б', 'Д', 'Е', 'Ф', 'Г', 'Ҳ', 'И', 'Ж', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Қ', 'Р', 'С', 'Т', 'У', 'В', 'Х', 'Й', 'З']);
	const latinSet = new Set(['g', 'o', 'G', 'O', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']);

	let count = 0;
	for (const ch of text) {
		if (script === 'cyrillic' && cyrillicSet.has(ch)) count++;
		if (script === 'latin' && latinSet.has(ch)) count++;
	}
	return count;
}

/** Определяет направление конвертации */
function detectDirection(text: string): 'latin-to-cyrillic' | 'cyrillic-to-latin' {
	const cyrillicCount = countScript(text, 'cyrillic');
	const latinCount = countScript(text, 'latin');
	return cyrillicCount > latinCount ? 'cyrillic-to-latin' : 'latin-to-cyrillic';
}

/**
 * Конвертирует текст между узбекской латиницей и кириллицей.
 */
export function convertText(text: string, direction: Direction = 'auto'): string {
	if (!text) return text;

	const dir = direction === 'auto' ? detectDirection(text) : direction;

	if (dir === 'cyrillic-to-latin') {
		return Array.from(text).map(cyrillicCharToLatin).join('');
	}

	// latin → cyrillic
	let result = '';
	const chars = Array.from(text);
	for (let i = 0; i < chars.length; i++) {
		const ch = chars[i];
		const next: string | undefined = chars[i + 1];
		const { out, skip } = latinCharToCyrillic(ch, next);
		result += out;
		i += skip;
	}
	return result;
}
