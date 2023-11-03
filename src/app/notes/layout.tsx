import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { seedDatabase } from "~/lib/db/seed";
import AllNotes from "./AllNotes";

export const metadata: Metadata = {
  title: "All Notes - My Notes",
  description: "View and manage all Notes",
};

async function setupDatabase() {
  await seedDatabase();
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  searchParams: any;
}) {
  await setupDatabase();

  return (
    <div className="grid gap-8 grid-cols-3">
      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold leading-none tracking-tight">
            All Notes
          </p>
        </CardHeader>

        <CardContent>
          <AllNotes />
        </CardContent>
      </Card>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
