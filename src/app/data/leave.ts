export interface leave
{   leaveType:string,
    fromDate:Date,
    toDate:Date;
    fromSession:number,
    toSession:number,
    reason:string,
    sendTo:string,
    CCTo:string,
    status:string,
    days:number,
    balance:number
}