import { NextResponse } from 'next/server';
import admin, { ServiceAccount } from 'firebase-admin';
import crypto from 'crypto';
import { connectDB } from '@/config/dbConnection';

interface FirebaseConfig extends ServiceAccount {
  type: string | undefined;
  project_id: string | undefined;
  private_key_id: string | undefined;
  private_key: string | undefined;
  client_email: string | undefined;
  client_id: string | undefined;
  auth_uri: string | undefined;
  token_uri: string | undefined;
  auth_provider_x509_cert_url: string | undefined;
  client_x509_cert_url: string | undefined;
  universe_domain: string | undefined;
}

const firebaseConfig: FirebaseConfig = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  ),
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_UNIVERSE_DOMAIN,
};

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, tagIds } = body;

    if (!token || !Array.isArray(tagIds) || tagIds.length === 0) {
      return NextResponse.json(
        { message: 'Token and tagIds are required' },
        { status: 400 }
      );
    }

    const connection = await connectDB;

    // tagIds에 해당하는 태그 이름을 가져오기
    const tagNamesQuery = `
      SELECT tag_name 
      FROM tag_subscriptions ts 
      JOIN tag t ON ts.tag_id = t.tag_id 
      WHERE ts.tag_id IN (${tagIds.map(() => '?').join(', ')})
    `;

    const tagNames = await new Promise<string[]>((resolve, reject) => {
      connection.query(tagNamesQuery, tagIds, (err: any, results: any[]) => {
        if (err) {
          reject(err);
        } else {
          const names = results.map((result) => result.tag_name);
          resolve(names);
        }
      });
    });

    const tagNamesString = tagNames.join(', ');
    const title = '🔔 새 글 알림';
    const content = `구독하신 [${tagNamesString}] 태그에 새 글이 올라왔어요`;

    // FCM 메시지 작성
    const message = {
      notification: {
        title,
        body: content,
      },
      data: {
        id: generateRandomString(6),
        title,
        content,
      },
      token: token,
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            badge: 0,
            sound: 'default',
          },
        },
      },
    };

    // FCM 메시지 전송
    await admin.messaging().send(message);

    return NextResponse.json({ message: 'Successfully sent message' });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Error sending message:', errorMessage);
    return NextResponse.json(
      { message: 'Error sending message', error: errorMessage },
      { status: 500 }
    );
  }
}
