//C'est ma classe media
export abstract class Media {
    constructor(
      public id: string,
      public title: string,
      public genre: string,
      public year: number,
      public rating: number,
      public userId: string
    ) {}
  
  }