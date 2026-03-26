import jwt from "jsonwebtoken";
declare var process: any;
export const generateToken = (userId, res)=>{

    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }  

    const token = jwt.sign({userId}, JWT_SECRET as string, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24* 60 * 60 * 1000, 
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
    })

    return token
}