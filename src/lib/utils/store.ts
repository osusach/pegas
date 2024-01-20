import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { Offer } from "./types";

export const viewedOffer: Writable<Offer> = writable({} as Offer);
