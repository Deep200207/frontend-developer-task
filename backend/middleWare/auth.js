import jwt from 'jsonwebtoken'

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error:"No Token"});
    const decode=jwt.verify(token,process.env.JWTSECRET);
    req.userId=decode.id;
    next();
}
export default auth;