import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70dvh] flex-col justify-center pb-24 pt-32">
      <p className="meta text-ink-mute">404</p>
      <h1 className="mt-3 max-w-[18ch] font-display-soft text-h1">This page went the way of iteration 37</h1>
      <p className="mt-5 max-w-[48ch] text-lede text-ink-soft">It&rsquo;s not here anymore, but plenty else is.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="rounded-full bg-ink px-5 py-3 font-medium text-paper">Back to home</Link>
        <Link href="/work" className="rounded-full border border-ink/20 px-5 py-3 font-medium hover:border-ink">See all work</Link>
      </div>
    </div>
  );
}
