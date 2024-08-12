export function authorization(roles, cartId) {
    return async (req, res, next) => {
        if(cartId){          
            if(req.user[0].cartId != req.params.cid){
                return res.status(401).json({ message: "No tienes permisos. Este carrito no es tuyo" });
            }
        }
        
        if (!roles.includes(req.user[0].role)) {
            return res.status(401).json({ message: "No tienes permisos" });
        }
        next();
    };
}