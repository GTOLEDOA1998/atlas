type ActionCardProps = {
    emoji: string;
    title: string;
    description: string;
  };
  
  export function ActionCard({
    emoji,
    title,
    description,
  }: ActionCardProps) {
    return (
      <button
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/60
          p-6
          text-left
          transition-all
          duration-200
          hover:border-zinc-600
          hover:bg-zinc-900
          hover:-translate-y-1
        "
      >
        <div className="mb-4 text-3xl">
          {emoji}
        </div>
  
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
  
        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>
      </button>
    );
  }