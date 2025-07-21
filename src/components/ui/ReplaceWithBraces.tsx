import React from 'react'

import './ReplaceWithBraces.css'

interface ReplaceWithBracesProps {
  text: string
}

export const ReplaceWithBraces: React.FC<ReplaceWithBracesProps> = ({ text }) => {
  // Regex to match {A}, {B}, ... where A-Z is a single capital letter
  const regex = /\{([A-Z])\}/g

  // Split the text and keep the matches
  const parts: (string | React.JSX.Element)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Push the text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // Push the <i> element with className
    parts.push(<i className={`ms ms-${match[1]}`} key={match.index} />)
    lastIndex = regex.lastIndex
  }

  // Push the remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}
