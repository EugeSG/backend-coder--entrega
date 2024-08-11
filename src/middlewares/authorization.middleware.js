export function authorization(roles) {
    return async (req, res, next) => {
        console.log(roles);
        
        console.log(req.user[0].role);
        
        if (!roles.includes(req.user[0].role)) {
            return res.status(401).json({ message: "No tienes permisos" });
        }
  
        next();
    };
}