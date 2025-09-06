import dynamic from "next/dynamic";
const Quiz = dynamic(() => import("@/components/CoupleTimeQuiz"), { ssr: false });

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Quiz />
    </main>
  );
}
