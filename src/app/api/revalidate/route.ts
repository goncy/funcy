import {revalidateTag} from "next/cache";

export async function GET() {
  revalidateTag("matches");

  return Response.json({revalidated: true});
}
