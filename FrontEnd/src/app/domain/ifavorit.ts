import { IMovieUserId } from "./imovieuserid";

export class IFavorit {
    movieUserID?: IMovieUserId;
    watched?: boolean;
    section?:string;
    note?:number;
    like?:boolean;
    constructor(id:IMovieUserId){
        this.movieUserID = id;
    }
}

