export interface Grinder{
    id:string;
    name:string;
    brand:string;
    burss:string;
    electric:boolean;
}
export interface GrinderState{
    grinder: Grinder | null;
    

}