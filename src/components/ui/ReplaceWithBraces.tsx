import React from 'react'

import './ReplaceWithBraces.css'

interface ReplaceWithBracesProps {
  text: string
}

const SYMBOLS = {
  T: 'tap ms-cost',
  W: 'w ms-cost',
  B: 'b ms-cost',
  U: 'u ms-cost',
  R: 'r ms-cost',
  G: 'g ms-cost',
  C: 'c ms-cost',
  X: 'x',
  1: '1 ms-cost',
}

export const ReplaceWithBraces: React.FC<ReplaceWithBracesProps> = ({ text }) => {
  console.log(text)
  // Regex to match escape sequences (e.g. \n) or mana symbols {A}, {1}, etc.
  const regex = /[\n\r\t\f\v]|(\{([A-Z0-9])\})/gs

  const parts: (string | React.JSX.Element)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Push the text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    console.log('################', match)
    if (/\r|\n/.test(match[0])) {
      // It's a newline character
      console.log('>>>>>>>>>>>>>>>>>>>>')
      parts.push(<br key={match.index} />)
    } else if (match[2]) {
      // It's a mana symbol
      parts.push(
        <i
          className={`ms ml-0.5 ms-${SYMBOLS[match[2] as keyof typeof SYMBOLS]}`}
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
