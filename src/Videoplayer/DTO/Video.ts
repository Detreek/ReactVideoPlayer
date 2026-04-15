export interface Video{
    id : number,
    m8u3Url : string,
    timeDuration : number, // sec
    Name : string
    timeStop : number // To restore viewing (sec)
    
}
