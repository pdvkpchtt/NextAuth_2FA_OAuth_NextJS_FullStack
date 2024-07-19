"use server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-[20px]">
      hello
      <a href="/auth/login">to login</a>
    </main>
  );
}
