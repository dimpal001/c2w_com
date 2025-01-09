export function capitalizeTitle(sentence) {
  const exclusions = [
    'and',
    'of',
    'the',
    'in',
    'on',
    'at',
    'by',
    'for',
    'to',
    'with',
    'a',
    'an',
    'but',
    'or',
    'nor',
    'as',
    'so',
    'yet',
  ]

  return sentence
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !exclusions.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      }
      return word.toLowerCase()
    })
    .join(' ')
}
