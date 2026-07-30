import { HomeHeader } from "./HomeHeader";
import { HomeActions } from "./HomeActions";

export function HomeScreen() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-8 py-20">
        <HomeHeader />

        <HomeActions />
      </section>
    </main>
  );
}