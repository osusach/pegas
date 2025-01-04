import { cn } from "../../lib/cn";
import type { Offer } from "./type";
import { match } from "ts-pattern";

function shorten(content: string, length: number): string {
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
}

function formatCompanyName(company: string) {
  return shorten(company.split(/・| - /)[0], 32);
}

export default function OfferCard(props: Offer) {
  const location = match(props.location)
    .with("KOREA", () => "Corea del Sur")
    .with("REMOTE", () => "Remoto")
    .with("JAPAN", () => "Japón")
    .with("ONSITE", () => "Chile")
    .otherwise(() => null);
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "hover:opacity-50 duration-200 space-y-2 hover:bg-stone-900 p-2"
      )}
    >
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2">
          <h1
            className={cn("uppercase", {
              "text-blue-400": props.seniority === "NOEXPERIENCE",
              "text-amber-400": props.seniority === "JUNIOR",
            })}
          >
            ## {props.title}
          </h1>
          <p> {formatCompanyName(props.company || "")}</p>
        </div>
        <p>{location}</p>
        {props.salary ? (
          <p className="bg-emerald-700 text-white w-fit px-1 h-fit">
            {props.salary}
          </p>
        ) : (
          <div></div>
        )}
      </div>
    </a>
  );
}
