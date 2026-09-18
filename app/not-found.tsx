import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader overlay={false} />
      <main id="main" className="bg-night text-bone pt-[4.5rem] lg:pt-20">
        <div className="shell flex min-h-[60svh] flex-col justify-center py-16">
          <p className="label-sm text-sun-soft">404</p>
          <h1 className="mt-5 text-[2.4rem] leading-[1.05] sm:text-5xl">
            Nothing here.
          </h1>
          <p className="text-bone/65 mt-5 max-w-md text-[1.0625rem] leading-relaxed">
            That page doesn't exist. Everything is on the front page.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variant="sun" size="lg">
              Back to the front page
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
