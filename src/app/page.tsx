// src/app/page.tsx
'use client'
import React from 'react';

export default function HomePage() {
    return (
        <div className="space-y-4">
            <section className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300">
                <h2 className="text-3xl font-semibold text-white">Welcome to the Form Management App</h2>
                <p className="text-gray-400">Manage forms and submissions efficiently.</p>
            </section>
        </div>
    );
}