import type { Card } from "scryfall-api";

interface MagicCardProps {
  card: Card;
  shouldDisplayName?: boolean;
}

const MagicCard: React.FC<MagicCardProps> = ({ card, shouldDisplayName }) => {
  return (
    <div className="flex flex-col">
      <img
        src={card.image_uris?.large}
        alt={card.name}
        title={card.name}
        className="w-full rounded"
      />
      {shouldDisplayName && (
        <span title={card.name} className="mt-1 text-center text-xs truncate">
          {card.name}
        </span>
      )}
    </div>
  );
};

export { MagicCard };
