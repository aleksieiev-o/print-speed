import {z} from 'zod';

const envSchema = z.object({
  apiKey: z.string().trim(),
  authDomain: z.string().trim(),
  databaseURL: z.string().trim().url(),
  storageBucket: z.string().trim(),
  projectId: z.string().trim(),
  messagingSenderId: z.string().trim(),
  appId: z.string().trim(),
  measurementId: z.string().trim().optional(),
});

type TEnvSchema = z.infer<typeof envSchema>;

export const firebaseEnvSchema: TEnvSchema = envSchema.parse({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
});
