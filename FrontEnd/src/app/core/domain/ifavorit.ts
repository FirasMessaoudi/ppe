import { IMovieUserId } from "./imovieuserid";

export class IFavorit {
    movieUserID?: IMovieUserId;
    watched?: boolean;
    section?:string;
    note?:number;
    like?:boolean;
    runtime?: number;
    nbEpisodes?: number;
    constructor(id:IMovieUserId){
        this.movieUserID = id;
    }
}

