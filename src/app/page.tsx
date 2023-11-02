import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="place-items-center grid mt-8">
      <h1 className="lg:text-5xl text-3xl mb-8 font-bold">WELCOME TO NOTES</h1>

      <Button asChild>
        <Link href="/notes">View All Notes</Link>
      </Button>
    </div>
  );
}
