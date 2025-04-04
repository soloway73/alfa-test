export interface IBreeds {
  name: string;
}
export interface ICat {
  id: string;
  url: string;
  breeds: IBreeds[];
  isLiked?: boolean;
}
