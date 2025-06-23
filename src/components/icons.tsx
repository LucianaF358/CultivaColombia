import type { SVGProps } from 'react';

export function CultivaColombiaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-5 0-9-4.5-9-10S4.5 2 10 2c4 0 7.5 3 7.5 7.5S16.5 17 12 17" />
      <path d="M12 2a4 4 0 0 0-4 4c0 2.21 1.79 4 4 4s4-1.79 4-4a4 4 0 0 0-4-4" />
    </svg>
  );
}
