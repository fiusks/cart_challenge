import { v4 as uuiv4 } from 'uuid';
import { cookies } from 'next/headers';

export async function generateSession() {
  const sessionCookie = cookies().get('sessionId');

  const sessionId = sessionCookie?.value;

  if (!sessionId) {
    const newSessionId = uuiv4();
    const expiresInSeconds = 60 * 60 * 24;

    cookies().set('sessionId', newSessionId, {
      httpOnly: true,
      secure: true,
      maxAge: expiresInSeconds,
    });

    return newSessionId;
  }

  return sessionId;
}
