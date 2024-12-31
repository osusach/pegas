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
      <div className="flex justify-between mb-2">
        <label htmlFor="seniority">Seniority:</label>
        <select
          className="border bg-transparent border-black dark:border-white"
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
      <div className="flex justify-between mb-2">
        <label htmlFor="location">Ubicación:</label>
        <select
          className="border bg-transparent border-black dark:border-white"
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
      <ul className="grid md:grid-cols-3 gap-2 w-full">
        {filtered.map((offer) => (
          <OfferCard key={offer.title} {...offer} />
        ))}
      </ul>
    </>
  );
}
