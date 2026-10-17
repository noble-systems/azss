import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader overlay={false} />
      <main id="main" className="bg-night text-bone pt-[4.5rem] lg:pt-20">
        <div className="shell flex min-h-[60svh] flex-col justify-center py-16">
          <h1 className="text-[2.2rem] leading-tight sm:text-[2.8rem]">
            Page not found
          </h1>
          <p className="text-bone/65 mt-5 max-w-md text-[1.0625rem] leading-relaxed">
            That page does not exist. Head back to the home page.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variant="sun" size="lg">
              Back to the home page
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
