export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { seedDatabase } from "~/lib/db/seed";
import AllNotes from "./(components)/AllNotes";

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
