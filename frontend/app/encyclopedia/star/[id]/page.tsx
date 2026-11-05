import { STARS } from "@/data/constellations";
import StarClientView from "./client";

export function generateStaticParams() {
  return STARS.map((s) => ({
    id: s.id,
  }));
}

export default async function StarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StarClientView id={id} />;
}
