import Image from "next/image";
import RSSHome from "@/app/pages/rss-home";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="bg-black min-h-[calc(100dvh-7rem)] md:min-h[calc(100dvh-5rem)]">
        <section>
          <div className="px-4 mx-auto lg:px-8">
            <Alert className="px-4">
              <BellRing className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                The current smart RSS project is being actively developed, which
                means there may be a major promotion later, so stay tuned.
              </AlertDescription>
            </Alert>
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">Smart RSS</h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            An intelligent RSS assistant app that powered by LLM. Helps everyone break the information cocoon, freely customize the information of interested technology news & trends.
            </p>
            <div className="container mx-auto flex items-center justify-center">
              <RSSHome />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black mx-auto max-w-[1920px] px-6">
        <div className="bg-black flex flex-col items-center justify-between py-12 space-y-4 md:flex-row text-white"><div>© 2024 LazyloadBox All rights reserved.</div></div>
      </footer>
    </>
  );
}
