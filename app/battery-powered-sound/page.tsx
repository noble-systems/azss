import { serviceMetadata, ServicePageView } from "@/components/ServicePage";
import { services } from "@/content/site";

export const metadata = serviceMetadata(services.battery);

export default function Page() {
  return <ServicePageView page={services.battery} />;
}
