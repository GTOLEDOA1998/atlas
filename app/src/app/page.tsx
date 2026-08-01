export default function Home() {
  return (
    <main className="p-10">
      <h1>Atlas</h1>

      <pre>
        {process.env.NEXT_PUBLIC_SUPABASE_URL
          ? "✅ URL encontrada"
          : "❌ URL no encontrada"}
      </pre>
    </main>
  );
}