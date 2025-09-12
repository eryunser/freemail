export function generateRandomId(length = 8) {
  const syllables = [
    "al","el","an","en","er","ra","na","lo","vi","li","mar","lin",
    "der","or","ar","se","ta","ro","bel","ca","do","fa","lea","zen"
  ];

  const makeWord = (len) => {
    let word = "";
    while (word.length < len) {
      word += syllables[Math.floor(Math.random() * syllables.length)];
    }
    return word.length > len ? word.slice(0, len) : word;
  };

  const len = Math.max(4, Math.min(32, Number(length) || 8));

  if (len <= 12) {
    return makeWord(len).toLowerCase();
  } else {
    const firstLen = Math.floor((len - 1) / 2);
    const lastLen = len - 1 - firstLen;

    const first = makeWord(firstLen);
    const last = makeWord(lastLen);

    return (first + "_" + last).toLowerCase();
  }
}

export function extractEmail(emailString) {
  const match = emailString.match(/<(.+?)>/) || emailString.match(/([^\s<>]+@[^\s<>]+)/);
  return match ? match[1] : emailString;
}
// 将 D1 返回的 UTC 时间（YYYY-MM-DD HH:MM:SS）格式化为东八区显示
export function formatTs(ts){
  if (!ts) return '';
  try {
    // 统一转成 ISO 再追加 Z 标记为 UTC
    const iso = ts.includes('T') ? ts.replace(' ', 'T') : ts.replace(' ', 'T');
    const d = new Date(iso + 'Z');
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(d);
  } catch (_) { return ts; }
}

