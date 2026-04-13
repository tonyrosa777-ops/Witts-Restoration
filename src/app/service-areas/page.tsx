import type { Metadata } from "next";
import { serviceAreas } from "@/data/site";
import ServiceAreasClient from "./ServiceAreasClient";

export const metadata: Metadata = {
  title: "Service Areas | Witt's Restoration LLC",
  description:
    "Witt's Restoration serves Groveton, Lancaster, Stark, Northumberland, Stratford, Colebrook, Guildhall VT, and Lunenburg VT. 24/7 towing, auto body, restoration, and mobile mechanic across northern NH and VT.",
};

export default function ServiceAreasPage() {
  return <ServiceAreasClient serviceAreas={serviceAreas} />;
}
