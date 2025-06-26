// app/layout.tsx

import MainHeader from '@/components/main-header/main-header';
import './global.css';
import React from "react";

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head>
    <body>
    <MainHeader/>
    {children}
    </body>
    </html>
  );
}
