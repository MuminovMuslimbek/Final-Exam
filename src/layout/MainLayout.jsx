import React from 'react';
import Header from '../components/Header';

function MainLayout({ children }) {
    return (
        <div className="flex lg:flex-row flex-col min-h-screen select-none">
            <div className="lg:fixed lg:w-[280px] lg:h-screen">
                <Header />
            </div>
            <main className="flex-1 bg-[#F8F8FB] dark:bg-[#141625] p-4 lg:p-8 lg:pl-[280px]">
                <div className='w-full max-w-[830px]'>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default MainLayout;
