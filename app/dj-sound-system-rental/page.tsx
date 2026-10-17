import { serviceMetadata, ServicePageView } from "@/components/ServicePage";
import { services } from "@/content/site";

export const metadata = serviceMetadata(services.dj);

export default function Page() {
  return <ServicePageView page={services.dj} />;
}
