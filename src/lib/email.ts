import { Resend } from "resend";

export function getResend(){
    const api_key = process.env.RESEND_API_KEY;
    if(!api_key){
        throw new Error("RESEND_API_KEY is not defined");
    }
    return new Resend(api_key);
}