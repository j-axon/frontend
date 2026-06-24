import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-black p-4">
      <LoginForm />
    </main>
  );
}