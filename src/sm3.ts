import { sm3, hmac } from './utils';

/**
 * 补全16进制字符串
 */
function leftPad(input: string, num: number): string {
	if (input.length >= num) return input;

	return (new Array(num - input.length + 1)).join('0') + input;
}

/**
 * 字节数组转 16 进制串
 */
function arrayToHex(arr: any[]): string {
	return arr.map((item:any) => {
		item = item.toString(16);
		return item.length === 1 ? '0' + item : item;
	}).join('');
}

/**
 * 转成字节数组
 */
function hexToArray(hexStr: string): number[] {
	const words: number[] = [];
	let hexStrLength = hexStr.length;

	if (hexStrLength % 2 !== 0) {
		hexStr = leftPad(hexStr, hexStrLength + 1);
	}

	hexStrLength = hexStr.length;

	for (let i = 0; i < hexStrLength; i += 2) {
		words.push(parseInt(hexStr.substr(i, 2), 16));
	}
	return words;
}

/**
 * utf8 串转字节数组
 */
function utf8ToArray(str: string): number[] {
	const arr: number[] = [];

	for (let i = 0, len = str.length; i < len; i++) {
		const point = str.codePointAt(i);

		if (point <= 0x007f) {
			arr.push(point);
		} else if (point <= 0x07ff) {
			arr.push(0xc0 | (point >>> 6));
			arr.push(0x80 | (point & 0x3f));
		} else if (point <= 0xD7FF || (point >= 0xE000 && point <= 0xFFFF)) {
			arr.push(0xe0 | (point >>> 12));
			arr.push(0x80 | ((point >>> 6) & 0x3f));
			arr.push(0x80 | (point & 0x3f));
		} else if (point >= 0x010000 && point <= 0x10FFFF) {
			i++;
			arr.push((0xf0 | (point >>> 18) & 0x1c));
			arr.push((0x80 | ((point >>> 12) & 0x3f)));
			arr.push((0x80 | ((point >>> 6) & 0x3f)));
			arr.push((0x80 | (point & 0x3f)));
		} else {
			arr.push(point);
			throw new Error('input is not supported');
		}
	}

	return arr;
}

export default function sm3Hash(input: string | number[], options?: { mode?: string; key?: string | number[] }): string {
	input = typeof input === 'string' ? utf8ToArray(input) : Array.from(input);

	if (options) {
		const mode = options.mode || 'hmac';
		if (mode !== 'hmac') throw new Error('invalid mode');

		let key = options.key;
		if (!key) throw new Error('invalid key');

		key = typeof key === 'string' ? hexToArray(key) : Array.from(key);
		return arrayToHex(hmac(input, key));
	}

	return arrayToHex(sm3(input));
}
