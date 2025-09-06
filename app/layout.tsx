export const metadata = { title: "夫婦時間 診断ツール" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        {children}
      </body>
    </html>
  );
}
