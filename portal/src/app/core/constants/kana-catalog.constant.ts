export interface KanaItem {
  id: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  group: 'gojuon' | 'dakuon' | 'yoon';
  rowName: string; // 'a', 'ka', 'sa', etc.
}

export const KANA_CATALOG: KanaItem[] = [
  // Hàng A
  { id: 'a', romaji: 'a', hiragana: 'あ', katakana: 'ア', group: 'gojuon', rowName: 'A' },
  { id: 'i', romaji: 'i', hiragana: 'い', katakana: 'イ', group: 'gojuon', rowName: 'A' },
  { id: 'u', romaji: 'u', hiragana: 'う', katakana: 'ウ', group: 'gojuon', rowName: 'A' },
  { id: 'e', romaji: 'e', hiragana: 'え', katakana: 'エ', group: 'gojuon', rowName: 'A' },
  { id: 'o', romaji: 'o', hiragana: 'お', katakana: 'オ', group: 'gojuon', rowName: 'A' },

  // Hàng Ka
  { id: 'ka', romaji: 'ka', hiragana: 'か', katakana: 'カ', group: 'gojuon', rowName: 'Ka' },
  { id: 'ki', romaji: 'ki', hiragana: 'き', katakana: 'キ', group: 'gojuon', rowName: 'Ka' },
  { id: 'ku', romaji: 'ku', hiragana: 'く', katakana: 'ク', group: 'gojuon', rowName: 'Ka' },
  { id: 'ke', romaji: 'ke', hiragana: 'け', katakana: 'ケ', group: 'gojuon', rowName: 'Ka' },
  { id: 'ko', romaji: 'ko', hiragana: 'こ', katakana: 'コ', group: 'gojuon', rowName: 'Ka' },

  // Hàng Sa
  { id: 'sa', romaji: 'sa', hiragana: 'さ', katakana: 'サ', group: 'gojuon', rowName: 'Sa' },
  { id: 'shi', romaji: 'shi', hiragana: 'し', katakana: 'シ', group: 'gojuon', rowName: 'Sa' },
  { id: 'su', romaji: 'su', hiragana: 'す', katakana: 'ス', group: 'gojuon', rowName: 'Sa' },
  { id: 'se', romaji: 'se', hiragana: 'せ', katakana: 'セ', group: 'gojuon', rowName: 'Sa' },
  { id: 'so', romaji: 'so', hiragana: 'そ', katakana: 'ソ', group: 'gojuon', rowName: 'Sa' },

  // Hàng Ta
  { id: 'ta', romaji: 'ta', hiragana: 'た', katakana: 'タ', group: 'gojuon', rowName: 'Ta' },
  { id: 'chi', romaji: 'chi', hiragana: 'ち', katakana: 'チ', group: 'gojuon', rowName: 'Ta' },
  { id: 'tsu', romaji: 'tsu', hiragana: 'つ', katakana: 'ツ', group: 'gojuon', rowName: 'Ta' },
  { id: 'te', romaji: 'te', hiragana: 'て', katakana: 'テ', group: 'gojuon', rowName: 'Ta' },
  { id: 'to', romaji: 'to', hiragana: 'と', katakana: 'ト', group: 'gojuon', rowName: 'Ta' },

  // Hàng Na
  { id: 'na', romaji: 'na', hiragana: 'な', katakana: 'ナ', group: 'gojuon', rowName: 'Na' },
  { id: 'ni', romaji: 'ni', hiragana: 'に', katakana: 'ニ', group: 'gojuon', rowName: 'Na' },
  { id: 'nu', romaji: 'nu', hiragana: 'ぬ', katakana: 'ヌ', group: 'gojuon', rowName: 'Na' },
  { id: 'ne', romaji: 'ne', hiragana: 'ね', katakana: 'ネ', group: 'gojuon', rowName: 'Na' },
  { id: 'no', romaji: 'no', hiragana: 'の', katakana: 'ノ', group: 'gojuon', rowName: 'Na' },

  // Hàng Ha
  { id: 'ha', romaji: 'ha', hiragana: 'は', katakana: 'ハ', group: 'gojuon', rowName: 'Ha' },
  { id: 'hi', romaji: 'hi', hiragana: 'ひ', katakana: 'ヒ', group: 'gojuon', rowName: 'Ha' },
  { id: 'fu', romaji: 'fu', hiragana: 'ふ', katakana: 'フ', group: 'gojuon', rowName: 'Ha' },
  { id: 'he', romaji: 'he', hiragana: 'へ', katakana: 'ヘ', group: 'gojuon', rowName: 'Ha' },
  { id: 'ho', romaji: 'ho', hiragana: 'ほ', katakana: 'ホ', group: 'gojuon', rowName: 'Ha' },

  // Hàng Ma
  { id: 'ma', romaji: 'ma', hiragana: 'ま', katakana: 'マ', group: 'gojuon', rowName: 'Ma' },
  { id: 'mi', romaji: 'mi', hiragana: 'み', katakana: 'ミ', group: 'gojuon', rowName: 'Ma' },
  { id: 'mu', romaji: 'mu', hiragana: 'む', katakana: 'ム', group: 'gojuon', rowName: 'Ma' },
  { id: 'me', romaji: 'me', hiragana: 'め', katakana: 'メ', group: 'gojuon', rowName: 'Ma' },
  { id: 'mo', romaji: 'mo', hiragana: 'も', katakana: 'モ', group: 'gojuon', rowName: 'Ma' },

  // Hàng Ya
  { id: 'ya', romaji: 'ya', hiragana: 'や', katakana: 'ヤ', group: 'gojuon', rowName: 'Ya' },
  { id: 'yu', romaji: 'yu', hiragana: 'ゆ', katakana: 'ユ', group: 'gojuon', rowName: 'Ya' },
  { id: 'yo', romaji: 'yo', hiragana: 'よ', katakana: 'ヨ', group: 'gojuon', rowName: 'Ya' },

  // Hàng Ra
  { id: 'ra', romaji: 'ra', hiragana: 'ら', katakana: 'ラ', group: 'gojuon', rowName: 'Ra' },
  { id: 'ri', romaji: 'ri', hiragana: 'り', katakana: 'リ', group: 'gojuon', rowName: 'Ra' },
  { id: 'ru', romaji: 'ru', hiragana: 'る', katakana: 'ル', group: 'gojuon', rowName: 'Ra' },
  { id: 're', romaji: 're', hiragana: 'れ', katakana: 'レ', group: 'gojuon', rowName: 'Ra' },
  { id: 'ro', romaji: 'ro', hiragana: 'ro', katakana: 'ロ', group: 'gojuon', rowName: 'Ra' },

  // Hàng Wa & N
  { id: 'wa', romaji: 'wa', hiragana: 'わ', katakana: 'ワ', group: 'gojuon', rowName: 'Wa' },
  { id: 'wo', romaji: 'wo', hiragana: 'を', katakana: 'ヲ', group: 'gojuon', rowName: 'Wa' },
  { id: 'n', romaji: 'n', hiragana: 'ん', katakana: 'ン', group: 'gojuon', rowName: 'N' },

  // Dakuon (Âm đục)
  { id: 'ga', romaji: 'ga', hiragana: 'が', katakana: 'ガ', group: 'dakuon', rowName: 'Ga' },
  { id: 'gi', romaji: 'gi', hiragana: 'ぎ', katakana: 'ギ', group: 'dakuon', rowName: 'Ga' },
  { id: 'gu', romaji: 'gu', hiragana: 'ぐ', katakana: 'グ', group: 'dakuon', rowName: 'Ga' },
  { id: 'ge', romaji: 'ge', hiragana: 'げ', katakana: 'ゲ', group: 'dakuon', rowName: 'Ga' },
  { id: 'go', romaji: 'go', hiragana: 'ご', katakana: 'ゴ', group: 'dakuon', rowName: 'Ga' },

  { id: 'za', romaji: 'za', hiragana: 'ざ', katakana: 'ザ', group: 'dakuon', rowName: 'Za' },
  { id: 'ji', romaji: 'ji', hiragana: 'じ', katakana: 'ジ', group: 'dakuon', rowName: 'Za' },
  { id: 'zu', romaji: 'zu', hiragana: 'ず', katakana: 'ズ', group: 'dakuon', rowName: 'Za' },
  { id: 'ze', romaji: 'ze', hiragana: 'ぜ', katakana: 'ゼ', group: 'dakuon', rowName: 'Za' },
  { id: 'zo', romaji: 'zo', hiragana: 'ぞ', katakana: 'ゾ', group: 'dakuon', rowName: 'Za' },

  { id: 'da', romaji: 'da', hiragana: 'だ', katakana: 'ダ', group: 'dakuon', rowName: 'Da' },
  { id: 'dji', romaji: 'ji', hiragana: 'ぢ', katakana: 'ヂ', group: 'dakuon', rowName: 'Da' },
  { id: 'dzu', romaji: 'zu', hiragana: 'づ', katakana: 'ヅ', group: 'dakuon', rowName: 'Da' },
  { id: 'de', romaji: 'de', hiragana: 'で', katakana: 'デ', group: 'dakuon', rowName: 'Da' },
  { id: 'do', romaji: 'do', hiragana: 'ど', katakana: 'ド', group: 'dakuon', rowName: 'Da' },

  { id: 'ba', romaji: 'ba', hiragana: 'ば', katakana: 'バ', group: 'dakuon', rowName: 'Ba' },
  { id: 'bi', romaji: 'bi', hiragana: 'び', katakana: 'ビ', group: 'dakuon', rowName: 'Ba' },
  { id: 'bu', romaji: 'bu', hiragana: 'ぶ', katakana: 'ブ', group: 'dakuon', rowName: 'Ba' },
  { id: 'be', romaji: 'be', hiragana: 'べ', katakana: 'ベ', group: 'dakuon', rowName: 'Ba' },
  { id: 'bo', romaji: 'bo', hiragana: 'ぼ', katakana: 'ボ', group: 'dakuon', rowName: 'Ba' },

  // Handakuon (Âm bán đục - Pa)
  { id: 'pa', romaji: 'pa', hiragana: 'ぱ', katakana: 'パ', group: 'dakuon', rowName: 'Pa' },
  { id: 'pi', romaji: 'pi', hiragana: 'pi', katakana: 'ピ', group: 'dakuon', rowName: 'Pa' },
  { id: 'pu', romaji: 'pu', hiragana: 'ぷ', katakana: 'プ', group: 'dakuon', rowName: 'Pa' },
  { id: 'pe', romaji: 'pe', hiragana: 'ぺ', katakana: 'ペ', group: 'dakuon', rowName: 'Pa' },
  { id: 'po', romaji: 'po', hiragana: 'ぽ', katakana: 'ポ', group: 'dakuon', rowName: 'Pa' }
];
