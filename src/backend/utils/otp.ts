import crypto from 'crypto'
export function generateOTP(length:number=6):string {
    const min = Math.pow(10,length-1)
    const max = Math.pow(10,length)-1

    return crypto.randomInt(min,max).toString()
}