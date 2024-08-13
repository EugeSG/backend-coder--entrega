export function validate(schema) {
    return async (req, res, next) => {
      const { error } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      next();
    };
}

export function validateSensibleDataFromUser(schema){

  return async (req, res, next) =>{
    
    const { value } = schema.validate({
      first_name: req.user[0].first_name,
      last_name: req.user[0].last_name,
      email: req.user[0].email
    });
    
    req.user = value ? value : req.user;
    next();
  }

}
  