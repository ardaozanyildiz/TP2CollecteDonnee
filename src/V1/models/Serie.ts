//C'est ma classe serie
import { Media } from "./Media.js";
import { Season } from "./Saison.js";

export type SerieStatus = "en_attente" | "en_cours" | "terminee";

export class Serie extends Media {
  public seasons: Season[] = [];
  constructor(
    id: string,
    title: string,
    genre: string,
    year: number,
    rating: number,
    userId: string,
    public status: SerieStatus
  ) {
    super(id, title, genre, year, rating, userId );
  }

}