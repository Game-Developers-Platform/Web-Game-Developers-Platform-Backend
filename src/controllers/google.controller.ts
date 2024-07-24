import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import usersService from "../services/users.service";

const client = new OAuth2Client();

const verifyGoogleToken = async (req: Request, res: Response) => {
  const credential = req.body.credential;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.status(200).json({ email: payload?.email, name: payload?.name });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const googleSignIn = async (req: Request, res: Response) => {
  const credential = req.body.credential;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const email = payload?.email;
    let user = await usersService.getUserByEmail(email);
    if (user == null) {
      user = await usersService.createUser({
        name: payload?.name,
        email: email,
        password: "google-signin",
      });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  googleSignIn,
  verifyGoogleToken,
};
