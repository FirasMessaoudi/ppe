import { IEpisode } from "./episode";

export interface ISeason {
    air_date?:string;
    episode_count?:number;
    id?:number;
    name?:string;
    overview?:string;
    poster_path?:string;
    season_number?:number;
    episodes?: IEpisode[];
}
