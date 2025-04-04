export interface IBreeds {
  name: string;
  description: string;
}
export interface ICat {
  id: string;
  url: string;
  breeds: IBreeds[];
  isLiked?: boolean;
}
