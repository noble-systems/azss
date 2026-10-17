import { serviceMetadata, ServicePageView } from "@/components/ServicePage";
import { services } from "@/content/site";

export const metadata = serviceMetadata(services.lineArray);

export default function Page() {
  return <ServicePageView page={services.lineArray} />;
}
