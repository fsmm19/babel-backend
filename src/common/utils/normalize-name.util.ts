export function normalize(name: string): string {
  const nameParticles = [
    'de',
    'del',
    'la',
    'las',
    'los',
    'da',
    'das',
    'do',
    'dos',
    'van',
    'von',
    'di',
    'du',
  ];

  return name
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word, index) => {
      const lower = word.toLowerCase();

      if (index > 0 && nameParticles.includes(lower)) {
        return lower;
      }

      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}
