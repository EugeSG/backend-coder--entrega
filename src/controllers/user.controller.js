import * as service from "../services/user.services.js";
import { createHash } from "../utils/hashFunctions.js";
import { generateToken } from "../utils/jwtFunctions.js";
import { mailService } from "../services/mail.services.js";
import { smsService } from "../services/sms.service.js";

export const login = async (req, res) => {
  const payload = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
  };
  const token = generateToken(payload);

  res.cookie("token", token, {
    maxAge: 900000,
    httpOnly: true,
  });

  res.status(200).json({
    message: "Login success",
    token,
  });
};

export const register = async (req, res) => {
  const { first_name, last_name, email, phone, role, password } = req.body;
  const name = first_name + " " + last_name;
  try {
    const hashPassword = await createHash(password);
    const user = await service.createUser({
      first_name,
      last_name,
      email,
      phone,
      role,
      password: hashPassword,
    });

    if(user?.error){
      res.status(400).json({
        error: user.error,
      });
    } else if(!user){
      res.status(500).json({
        error: "Error al crear el usuario",
      });
    } else {
      await mailService.sendEmail(email, "Bienvenido", name);

      if(phone){
        try {
          await smsService.sendSms(
            phone,
            "Bienvenido a nuestro eCommerce de CoderHouse"
          );
        } catch (error) {
          console.log(error);
        }
        
      }
      res.status(201).json(user);
    }  
  } catch (error) {
    console.log("Error register " + error.message);
    res.status(500).json({
      error: error.message
    });
  }
};
