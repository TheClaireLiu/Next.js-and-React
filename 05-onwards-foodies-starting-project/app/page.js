import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 style={{color: 'white', textAlign: 'center'}}>
        Time to get started!
      </h1>
      <p style={{color: 'white',textAlign: 'center'}}>
        <Link href="/meals">Meals</Link>
        <Link href="/meals/share">Share Meals</Link>
        <Link href="/community">Community</Link>
      </p>

    </main>
  );
}
