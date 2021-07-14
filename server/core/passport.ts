import { UserModelInterface } from './../models/UserModel';
import passport from 'passport';
import * as bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel';

passport.use(
  new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();

      if (!user) {
        return done(null, false);
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    } catch (error) {
      done(error, false);
    }
  }),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY || '123',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: UserModelInterface }, done) => {
      try {
        const user = await UserModel.findById(payload.data).exec();

        if (user) {
          await UserModel.findOneAndUpdate(
            { _id: user._id },
            {
              last_seen: new Date(),
            },
            { new: true },
          );

          return done(null, user);
        }

        done(null, false);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

export { passport };
