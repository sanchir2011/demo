'use client'

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Workshop Demo Project</h1>
      <p className="mt-2 text-base font-medium">RP x BWA 2025</p>
      <div className="flex flex-col gap-4 w-full mt-8">
        <a href="/domain" className="w-full bg-zinc-900 rounded-xl p-4 font-semibold font-sans cursor-pointer">
          Part 1. Домэйн нэр санал болгогч
        </a>
        <a href="/image" className="w-full bg-zinc-900 rounded-xl p-4 font-semibold font-sans cursor-pointer">
          Part 2. Зураг оруулж таниулах
        </a>
        <a href="/email" className="w-full bg-zinc-900 rounded-xl p-4 font-semibold font-sans cursor-pointer">
          Part 3. Имэйлд хариу бичигч
        </a>
      </div>
    </div>
  );
}
