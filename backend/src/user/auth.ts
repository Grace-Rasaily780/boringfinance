import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import User from "../model/userModel";
import { initateMethod503020 } from "../utils";
import { generateTokens, storeRefreshToken } from "../utils";
import jwt from "jsonwebtoken";

interface apiBody {
  username: string;
  email: string;
  password: string;
  currency: string;
  refreshToken: string;
}

export const auth = new Elysia()
  .post("/login", async ({ set, body }: { set: any; body: apiBody }) => {
    let user = await User.findOne({ email: body.email });

    if (!user) {
      set.status = 401;
      return { message: "Invalid email or password" };
    }

    const valid = bcrypt.compare(user.password, body.password);
    if (!valid) {
      set.status = 401;
      return { message: "Invalid email or password" };
    }

    const { accessToken, refreshToken } = generateTokens(
      user._id.toString(),
      user.email,
    );
    await storeRefreshToken(user._id, refreshToken);

    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        currency: user.currency,
      },
      refreshToken,
      accessToken,
    };
  })
  .post("/register", async ({ set, body }: { set: any; body: apiBody }) => {
    try {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) {
        set.status = 400;
        return { message: "Email already registered" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const newUser = new User({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        currency: body.currency,
      });

      await newUser.save().then((user) => {
        initateMethod503020(user._id);
      });

      const { accessToken, refreshToken } = generateTokens(
        newUser._id.toString(),
        newUser.email,
      );

      await storeRefreshToken(newUser._id, refreshToken);

      set.status = 200;
      return {
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          currency: newUser.currency,
        },
        accessToken,
        refreshToken,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error(error);
      set.status = 500;
      return { message: "Internal server error" };
    }
  })
  .post("/refresh-token", async ({ set, body }: { set: any; body: any }) => {
    if (!body.refreshToken) {
      set.status = 400;
      return { error: "Refresh token is required" };
    }

    try {
      const storedRefreshToken: any = await User.findById(body.user);

      if (body.refreshToken !== storedRefreshToken.refreshToken) {
        set.status = 400;
        return { error: "Invalid refresh token" };
      }

      const payload = jwt.verify(
        body.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      ) as {
        userId: string;
        email: string;
      };

      const { accessToken } = generateTokens(payload.userId, payload.email);

      return { accessToken };
    } catch (error) {
      set.status = 401;
      if (error.name == "TokenExpiredError") {
        return { error: error.message };
      }

      return { error: error.message };
    }
  });
