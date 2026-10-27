import type { SVGProps } from "react";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8.5 11.5 2.5 2.5 4.5-5" />
    </svg>
  );
}
export function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}
export function FlagZA() {
  return (
    <svg width="21" height="14" viewBox="0 0 90 60" aria-hidden="true">
      <path fill="#de3831" d="M0 0h90v30H0z" />
      <path fill="#002395" d="M0 30h90v30H0z" />
      <path fill="#fff" d="M0 0h14l30 20h46v20H44L14 60H0z" />
      <path fill="#007a4d" d="M0 0 45 25h45v10H45L0 60z" />
      <path fill="#ffb612" d="m0 6 35 24L0 54z" />
      <path fill="#101820" d="m0 13 25 17L0 47z" />
    </svg>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m5 7 5 5 5-5" /></svg>;
}

export function ScaleIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M24 7v33M15 42h18M9 14l15-5 15 5M8 15 2 29h13L8 15Zm32 0-6 14h13l-7-14Z" /><path d="M2 29c1 6 12 6 13 0m19 0c1 6 12 6 13 0" /><circle cx="24" cy="7" r="3" fill="white" /></svg>;
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M24 12c-5-6-13-7-19-4v29c7-3 13-2 19 3 6-5 12-6 19-3V8c-6-3-14-2-19 4Zm0 0v28" /><path d="M1 13v29h20m26-29v29H27" /></svg>;
}

export function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M8 4H5v17h14V4h-3M8 10h8M8 14h8M8 18h5" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>;
}
