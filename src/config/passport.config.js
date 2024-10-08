

import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import * as service from "../services/user.services.js";
import { comparePassword } from "../utils/hashFunctions.js";
import { config } from "./config.js";
import { userModel } from "../daos/mongodb/models/user.model.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function initializePassport() {

  // Login Strategy
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {

        if (!email || !password) {
          return done(null, false, { message: "Falta el email o la contraseña" });
        }

        try {
          const user = await service.getUserByEmail({ email });
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          };
;
          const verifyPass = await comparePassword(password, user.password);
          if (!verifyPass) {
            return done(null, false, { message: "Contraseña incorrecta" });
          };

          return done(null, user);
    
        } catch (error) {
          console.log("Catch pasport  config Login");
          done(error)
        }
      }
    ) 
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await service.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await userModel.find({ email: payload.email });

          if (!user) {
            return done(null, false, { message: "No se encontró el usuario" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  return token;
}
