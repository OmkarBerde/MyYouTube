export const API_KEY = "AIzaSyC2RQlUv1e_F9_2vC2J9dQaADcM7FTPbuM";   
//Api Key = AIzaSyC2RQlUv1e_F9_2vC2J9dQaADcM7FTPbuM => Remove from Apis key Services....

export const value_converter = (value) => {
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K";
    }
    else
    {
        return value;
    }
}