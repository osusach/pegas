import { useEffect, useState } from "react";
import OfferCard from "./offer-card";
import type { Offer } from "./type";

type Props = {
  offers: Offer[];
};

export default function List(props: Props) {
  const sortedOffers = props.offers.sort((a, b) =>
    a.location.localeCompare(b.location)
  );

  const [filtered, setFiltered] = useState(sortedOffers);
  const [filters, setFilters] = useState({
    seniority: "ALL",
    location: "ALL",
  });

  useEffect(() => {
    setFiltered(
      sortedOffers.filter(
        (offer) =>
          (filters.seniority === "ALL" ||
            offer.seniority === filters.seniority) &&
          (filters.location === "ALL" || offer.location === filters.location)
      )
    );
  }, [filters]);

  return (
    <>
      <div className="p-2 space-y-2">
        <div className="flex justify-between">
          <label htmlFor="seniority">Seniority:</label>
          <select
            className="border-[0.5px] bg-transparent border-stone-700"
            onChange={(e) => {
              const seniority = e.target.value;
              setFilters((prev) => ({ seniority, location: prev.location }));
            }}
            name="seniority"
            id="seniority"
          >
            <option value="ALL">Todos</option>
            <option value="NOEXPERIENCE">Sin experiencia</option>
            <option value="JUNIOR">Junior</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label htmlFor="location">Ubicación:</label>
          <select
            className="border-[0.5px] bg-transparent border-stone-700"
            onChange={(e) => {
              const location = e.target.value;
              setFilters((prev) => ({ location, seniority: prev.seniority }));
            }}
            name="location"
            id="location"
          >
            <option value="ALL">Todos</option>
            <option value="JAPAN">Japón</option>
            <option value="KOREA">Corea del Sur</option>
            <option value="ONSITE">Presencial (Chile)</option>
            <option value="REMOTE">Remoto</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <ul className="grid w-full divide-y divide-stone-700 min-w-[600px]">
          {filtered.map((offer) => (
            <OfferCard key={offer.title} {...offer} />
          ))}
        </ul>
      </div>
    </>
  );
}
