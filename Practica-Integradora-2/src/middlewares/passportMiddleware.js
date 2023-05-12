import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
import bcrypt from 'bcrypt';
import { jwtSecret } from '../config.js';
import User from '../dao/models/User.js';

export default function configurePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: jwtSecret,
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload.sub);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  return passport;
}