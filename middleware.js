import { NextResponse } from 'next/server';
import { routes } from './src/utils/routes';

const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Se il sito è online, non fare nulla
  if (!MAINTENANCE_MODE) return NextResponse.next();

  // Consenti accesso a:
  const isAllowed =
    pathname === routes.comingSoon ||
    pathname.startsWith('/_next') || // asset Next.js
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.ico') ||
    pathname.startsWith('/fonts') || // se usi font custom
    pathname.startsWith('/images'); // se hai immagini in public/images/

  if (isAllowed) return NextResponse.next();

  // Reindirizza tutto il resto alla pagina offline
  url.pathname = routes.comingSoon;
  return NextResponse.rewrite(url);
}
