import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";

export async function GET(request, { params }) {
  const { shortCode } = params;

  await connectDB();

  const link = await Link.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }
  redirect(link.originalUrl);
}
