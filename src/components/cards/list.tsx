import { useState } from "react";
import OfferCard from "./offer-card";
import type { Offer } from "./type";

type Props = {
  offers: Offer[];
};

export default function List(props: Props) {
  const [filtered, setFiltered] = useState(props.offers);
  return (
    <>
      <div className="flex justify-between mb-2">
        <label htmlFor="seniority">Seniority:</label>
        <select
          className="border bg-transparent border-black"
          onChange={(e) => {
            setFiltered(
              e.target.value === "ALL"
                ? props.offers
                : props.offers.filter(
                    (offer) => offer.seniority === e.target.value
                  )
            );
          }}
          name="seniority"
          id="seniority"
        >
          <option value="ALL">Todos</option>
          <option value="INTERNSHIP">Practicante</option>
          <option value="NEWGRAD">Recién titulado</option>
          <option value="JUNIOR">Junior</option>
        </select>
      </div>
      <ul className="grid lg:grid-cols-4 gap-2 w-full">
        {filtered.map((offer) => (
          <OfferCard key={offer.title} {...offer} />
        ))}
      </ul>
    </>
  );
}
