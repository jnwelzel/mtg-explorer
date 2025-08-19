import React from 'react'

interface ReplaceWithBracesProps {
  text: string
}

const SYMBOLS = {
  T: 'tap ms-cost',
  Q: 'untap ms-cost',
  W: 'w ms-cost',
  B: 'b ms-cost',
  U: 'u ms-cost',
  R: 'r ms-cost',
  G: 'g ms-cost',
  C: 'c ms-cost',
  X: 'x ms-cost',
  1: '1 ms-cost',
  2: '2 ms-cost',
  3: '3 ms-cost',
  4: '4 ms-cost',
  5: '5 ms-cost',
  6: '6 ms-cost',
  7: '7 ms-cost',
  8: '8 ms-cost',
  9: '9 ms-cost',
  10: '10 ms-cost',
  11: '11 ms-cost',
  12: '12 ms-cost',
  13: '13 ms-cost',
  14: '14 ms-cost',
  15: '15 ms-cost',
  16: '16 ms-cost',
  17: '17 ms-cost',
  18: '18 ms-cost',
  19: '19 ms-cost',
  20: '20 ms-cost',
  '0': '0 ms-cost',
  'U/P': 'up ms-cost',
  'U/B': 'ub ms-cost',
  'G/W': 'gw ms-cost',
  'R/W': 'rw ms-cost',
  'R/P': 'rp ms-cost',
  'G/P': 'gp ms-cost',
  'B/P': 'bp ms-cost',
  'W/P': 'wp ms-cost',
  '2/U': '2u ms-cost',
  '2/R': '2r ms-cost',
  '2/G': '2g ms-cost',
  '2/B': '2b ms-cost',
  '2/W': '2w ms-cost',
  // Add more as needed
}

export const ReplaceWithBraces: React.FC<ReplaceWithBracesProps> = ({ text }) => {
  // Regex to match escape sequences or mana symbols like {U}, {U/P}, {2/U}, etc.
  const regex = /[\n\r\t\f\v]|(\{([A-Z0-9/]+)\})/gs

  const parts: (string | React.JSX.Element)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Push the text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (/\r|\n/.test(match[0])) {
      parts.push(<br key={match.index} />)
    } else if (match[2]) {
      parts.push(
        <i
          className={`ms ml-0.5 ms-shadow ms-${SYMBOLS[match[2] as keyof typeof SYMBOLS] || match[2].toLowerCase()}`}
          key={match.index}
        />
      )
    }
    lastIndex = regex.lastIndex
  }

  // Push the remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}
