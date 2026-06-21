import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';

import FathersDayCard from './fathers-day-card';

// A warm, characterful serif for the card headline + signature — an intentional,
// non-default type choice scoped to this one page.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Happy Father's Day",
  description: 'A little card, just for you.',
  // Keep this private: unguessable route + no indexing by search engines.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FathersDayCard serifClassName={fraunces.className} />;
}
