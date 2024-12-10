import Head from 'next/head';

export default function ComingSoon() {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="A new feature is coming soon!" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 text-white">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Coming Soon
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-gray-400">
          Something amazing is on the way. Stay tuned!
        </p>
      </div>
    </>
  );
}
