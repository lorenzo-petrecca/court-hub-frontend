import * as cookie from 'cookie';
import { routes, api } from './routes';

export async function requireAuthentication(context) {
  const { req } = context;
  const cookies = cookie.parse(req.headers?.cookie || '');
  const token = cookies.jwtToken;

  if (!token) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    };
  }

  const res = await fetch(api.account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    };
  }

  const user = await res.json();

  return {
    props: { user },
  };
}
