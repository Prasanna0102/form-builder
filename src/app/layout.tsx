import './globals.css';
import { ReactNode } from 'react';
//import Navigation from './components/Navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-black text-white font-sans antialiased min-h-screen flex flex-col">
                <header className="bg-gray-900 text-white p-4 shadow-md">
                    <h1 className="text-2xl font-bold">Form Management App</h1>
                    
                </header>
                <main className="flex-grow container mx-auto p-4">{children}</main>
                <footer className="bg-gray-800 text-gray-400 p-4 text-center">
                    <p>© 2023 My App. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
