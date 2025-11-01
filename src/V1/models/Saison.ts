//C'est ma classe saison
import { Episode } from "./Episode.js";

export class Season {
  public episodes: Episode[] = [];

  constructor(
    public seasonNumber: number,
    public releaseDate: Date
  ) {}


}