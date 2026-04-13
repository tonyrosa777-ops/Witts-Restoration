import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceAreas, services } from "@/data/site";
import CityPageClient from "./CityPageClient";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  return {
    title: `Towing & Auto Repair in ${area.town}, ${area.state} | Witt's Restoration LLC`,
    description: `${area.description} 24/7 towing, auto body, restoration, mobile mechanic, and snowmobile repair in ${area.town}, ${area.state}. Call (802) 751-5786.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  return <CityPageClient area={area} services={services} />;
}
