// Shims for Next.js 16 types in monorepo/turbopack setup
declare module 'next' {
  export type Metadata = any;
  export type NextConfig = any;
  const next: any;
  export default next;
}

declare module 'next/types.js';

declare module 'next/link' {
  import React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useParams(): any;
  export function useSearchParams(): any;
  export function notFound(): never;
}
