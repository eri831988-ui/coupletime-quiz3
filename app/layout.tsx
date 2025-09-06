export const metadata = {
  title: "夫婦時間 診断ツール",
  description: "10問に答えるだけで、あなたに合った夫婦時間タイプを判定します。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
