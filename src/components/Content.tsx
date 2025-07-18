import React from 'react'

interface ContentProps {
  children?: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => (
  <div className="bg-white flex flex-col">{children}</div>
)

export { Content }
