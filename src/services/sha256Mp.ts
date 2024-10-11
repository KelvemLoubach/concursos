import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const compareSha256 = async (xSignature: any, dataID: any, xRequestId: any) => {
  try {
    const parts = xSignature.split(",");

    let ts;
    let hash;

    parts.forEach((part: string) => {
      const [key, value] = part.split("=");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          hash = trimmedValue;
        }
      }
    });

    const secret = process.env.SECRET_KEY_MP as string;

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(manifest);

    const sha = hmac.digest("hex");

    if (sha === hash) {
      console.log("HMAC verification passed");
    } else {
      console.log("HMAC verification failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export default compareSha256;
