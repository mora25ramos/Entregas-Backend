import passport from "passport";
import passportJWT from "passport-jwt";
import config from "../config.js";
import User from "../dao/models/User.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload._id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export const authenticateJWT = passport.authenticate("jwt", { session: false });