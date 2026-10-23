import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#101114] px-6 text-center text-white">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">404</p>
      <h1 className="mt-3 text-3xl font-black uppercase">Page not found</h1>
      <p className="mt-2 text-sm text-[#858792]">That route does not exist in the FitLog library.</p>
      <Link href="/" className="mt-6 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-bold text-black">Back to workouts</Link>
    </main>
  );
}
