import { knowledgeGraphJsonLd } from "@/lib/json-ld";

export const dynamic = "force-static";

export function GET() {
  return Response.json(knowledgeGraphJsonLd(), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}
