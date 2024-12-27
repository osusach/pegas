import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";
import type { Offer } from "./type";
import { match } from "ts-pattern";

function shorten(content: string, length: number): string {
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
}

export default function OfferCard(props: Offer) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "border flex flex-col justify-between group hover:opacity-70 duration-200 p-2 space-y-2",
        {
          "border-lime-700 text-lime-700": props.seniority === "INTERNSHIP",
          "border-blue-700 text-blue-700": props.seniority === "NEWGRAD",
          "border-purple-700 text-purple-700": props.seniority === "JUNIOR",
        }
      )}
    >
      <div>
        <h1 className="text-lg">{shorten(props.title, 35)}</h1>
        <p className="opacity-70">{shorten(props.content, 133)}</p>
      </div>
      <div className="flex justify-between items-end">
        <div>
          {props.salary && <p>{props.salary}</p>}
          <h2 className="whitespace-nowrap">
            {props.company}{" "}
            {match(props.location)
              .with("KOREA", () => "🇰🇷")
              .with("REMOTE", () => "🌎")
              .with("JAPAN", () => "🇯🇵")
              .with("ONSITE", () => "🇨🇱")
              .otherwise(() => null)}
          </h2>
        </div>
        <ArrowUpRight className="h-10 w-10 stroke-1 group-hover:translate-x-1 group-hover:-translate-y-1 duration-200" />
      </div>
    </a>
  );
}
