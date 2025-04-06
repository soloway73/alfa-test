export interface IBreeds {
  name: string;
  description: string;
  temperament: string;
  origin: string;
}
export interface ICat {
  id: string;
  url: string;
  breeds: IBreeds[];
  isLiked?: boolean;
}
