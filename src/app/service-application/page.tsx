import Link from 'next/link';

export default function ServiceApplication() {
  return (
    <>
      <div className="h-[100vh] flex flex-col">
        <div className="py-16 px-[10%] bg-gradient-to-tr from-blue-700 to-blue-500  flex w-full h-72 ">
          <section className="flex flex-col w-full gap-4">
            {/* <p className="text-primary-foreground font-sans font-bold text-5xl">
             Click the button below to begin with your application.
            </p> */}
            <p className="text-primary-foreground font-sans font-semibold text-4xl">New Service Application</p>
            <Link
              className="w-[16rem] bg-green-600 hover:bg-green-500 active:bg-green-700  active:scale-95 transition-all rounded py-2 flex justify-center"
              href="/service-application/new"
              target="_blank"
            >
              <span className="text-white text-base">Start Application</span>
            </Link>

            <p className="text-primary-foreground text-base pt-5">
              Already submitted an application?{' '}
              <Link
                href="/service-application/track"
                className="underline font-semibold hover:text-gray-300 active:scale-95 "
                target="_blank"
              >
                Track your application here
              </Link>{' '}
            </p>
          </section>
        </div>

        <div className="w-full flex">
          <p className="text-primary px-[8%] mt-10 font-sans font-medium text-lg">
            Apply for a new service connection in just a few steps.{' '}
          </p>
        </div>
      </div>
    </>
  );
}
