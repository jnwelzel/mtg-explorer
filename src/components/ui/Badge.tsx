export const Badge: React.FC<{
  text: string
}> = ({ text }) => {
  return (
    <span className="bg-stone-700 text-gray-300 font-semibold text-[8px] px-1 py-0.5 rounded">
      {text.toUpperCase()}
    </span>
  )
}
