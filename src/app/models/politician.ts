//Modelo Politician donde se definiran sus variables
export class Politician {
    constructor(
        public id:number,
        public tITULAR:string,
        public pARTIDO:string,
        public pARTIDO_PARA_FILTRO:string,
        public gENERO:string,
        public cARGO_PARA_FILTRO:string,
        public cARGO:string,
        public iNSTITUCION:string,
        public cCAA:string,
        public sUELDOBASE_SUELDO:number,
        public cOMPLEMENTOS_SUELDO:number,
        public pAGASEXTRA_SUELDO:number,
        public oTRASDIETASEINDEMNIZACIONES_SUELDO:number,
        public tRIENIOS_SUELDO:number,
        public rETRIBUCIONMENSUAL:number,
        public rETRIBUCIONANUAL:number,
        public oBSERVACIONES:string
    ){}
}
