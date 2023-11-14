import HanForm from "./components/form";

export default async function Home() {
  return (
    <>
      <main
        className="flex min-h-screen flex-col items-center justify-center p-24 gap-3 overflow-hidden relative
      "
      >
        <div className="absolute -z-5 -top-20 -left-20 opacity-10">
          <div className="bg-blue-400 w-56 h-56 rounded-full"></div>
        </div>
        <div className="absolute -z-15 -top-10 -left-10 opacity-25">
          <div className="bg-blue-700 w-32 h-32 rounded-full shadow-2xl"></div>
        </div>

        <div className="absolute -z-50 -bottom-20 -right-20 opacity-10">
          <div className="bg-blue-400 w-56 h-56 rounded-full"></div>
        </div>
        <div className="absolute -z-50 -bottom-10 -right-10 opacity-25">
          <div className="bg-blue-700 w-32 h-32 rounded-full shadow-2xl"></div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 z-10">
          {" "}
          <h1 className="text-6xl lg:8xl font-semibold text-primary">
            หารเงิน
          </h1>
        </div>

        <HanForm />
      </main>
    </>
  );
}
