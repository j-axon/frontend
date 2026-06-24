import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">J-AXON</h1>
      <p className="max-w-xl text-lg">
        Help Desk, smart inventory, QR scanning and AI-assisted diagnostics.
      </p>
      <Link
        className="rounded-md border px-4 py-2"
        href="/login"
      >
        Sing in
      </Link>
    </main>
  );
}
