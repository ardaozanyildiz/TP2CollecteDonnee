//C'est ma classe film
import { Media } from "./Media.js";

export class Film extends Media {
  constructor(
    id: string,
    title: string,
    genre: string,
    year: number,
    rating: number,
    userId: string,
    public duration: number,
    public watched: boolean = false
  ) {
    super(id, title, genre, year, rating, userId);
  }

 
}