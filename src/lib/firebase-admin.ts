import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function isPlaceholder(val: string | undefined): boolean {
  if (!val) return true;
  return (
    val.includes("your_") ||
    val.includes("your-") ||
    val === "" ||
    val === "undefined"
  );
}

let adminApp: App | null = null;

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (
  !isPlaceholder(projectId) &&
  !isPlaceholder(clientEmail) &&
  !isPlaceholder(privateKey)
) {
  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } else {
    adminApp = getApps()[0];
  }
} else {
  console.warn(
    "Firebase Admin SDK: Missing or placeholder credentials. Admin features will not work."
  );
}

export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminStorage = adminApp ? getStorage(adminApp) : null;
export { adminApp };
