export const Badge: React.FC<{
  text: string
  title?: string
}> = ({ text, title }) => {
  return (
    <span
      className="bg-stone-700 text-gray-300 font-semibold text-[8px] px-1 py-0.5 rounded"
      title={title}>
      {text.toUpperCase()}
    </span>
  )
}
