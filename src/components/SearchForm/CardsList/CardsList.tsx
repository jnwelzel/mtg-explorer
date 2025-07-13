import type { Card } from "scryfall-api";
import { MagicCard } from "../../ui";

type CardsListProps = {
  cards: Card[];
};

export const CardsList: React.FC<CardsListProps> = ({ cards }) => {
  return (
    <ul className="grid grid-cols-12 gap-3 mt-3">
      {cards.map((card) => (
        <li key={card.id} className="col-span-6 md:col-span-3">
          <MagicCard card={card} />
        </li>
      ))}
    </ul>
  );
};
