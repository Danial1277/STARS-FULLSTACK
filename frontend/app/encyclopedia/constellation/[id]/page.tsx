import { CONSTELLATIONS } from "@/data/constellations";
import ConstellationClientView from "./client";

export function generateStaticParams() {
  return CONSTELLATIONS.map((c) => ({
    id: c.id,
  }));
}

export default async function ConstellationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ConstellationClientView id={id} />;
}
