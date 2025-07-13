const MagicCardSkeleton: React.FC = () => {
  return (
    <li className="col-span-6 md:col-span-3">
      <div className="skeleton-animation rounded-lg">
        <div className="w-[193px] h-[269px]" />
      </div>
    </li>
  );
};

export { MagicCardSkeleton };
