import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-23 sm:px-6 sm:py-24 lg:px-8 
      lg:py-42">
        <div className="mx-auto max-w-prose text-center justify-center flex flex-col items-center">
          <h1 className="text-4xl max-w-126 font-bold text-gray-900 sm:text-5xl">
            make your creative
            <strong className="text-teal-600"> Notes </strong>
            by a notes app
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Get started it's free and open source for everyone 
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded-4xl border border-teal-600
               bg-teal-600 px-5 py-3 font-medium text-white shadow-sm 
               transition-colors hover:bg-teal-700"
              href="/notes"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded-4xl border border-gray-500 px-5 
              py-3 font-medium text-gray-700 shadow-sm transition-colors
               hover:bg-gray-50 hover:text-gray-900"
              href="/login"
            >
              have an account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
