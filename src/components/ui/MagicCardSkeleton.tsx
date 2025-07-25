const MagicCardSkeleton: React.FC = () => {
  return (
    <li className="col-span-12 md:col-span-3 lg:col-span-2">
      <div className="skeleton-animation rounded-lg">
        <div className="w-full h-auto aspect-5/7 object-cover" />
      </div>
    </li>
  )
}

export { MagicCardSkeleton }
