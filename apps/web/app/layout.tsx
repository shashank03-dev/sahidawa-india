import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SahiDawa',
  description: 'India\'s First Open-Source Citizen Medicine Verifier & Rural Health Bridge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
