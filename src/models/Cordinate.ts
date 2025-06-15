export default class User{
    private id: number;
    private lat: string;
    private lon: string;
    private dt_upload: Date;

    constructor(id:number, lat:string, lon:string, dt_upload:Date){
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.dt_upload = dt_upload;
    }
    
    getCordinates(){
        return {
            id: this.id,
            lat: this.lat,
            lon: this.lon,
            dt_upload: this.dt_upload
        }
    }

}