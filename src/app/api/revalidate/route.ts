import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  let type = request.nextUrl.searchParams.get("type") as "page" | "layout";
  if (!type) {
    type = "page";
  }

  if (path) {
    revalidatePath(path, type);
    redirect(path);
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
