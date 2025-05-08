import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY || "12345678901234567890123456789012"; // 32-byte key
const IV_LENGTH = 16;

export const encryptData = (data: any) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = Buffer.from(SECRET_KEY, "utf-8");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");

  return {
    iv: iv.toString("base64"),
    data: encrypted,
  };
};
