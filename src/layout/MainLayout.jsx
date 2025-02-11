import React from 'react';
import Header from '../components/Header';

function MainLayout({ children }) {
    return (
        <div className="flex lg:flex-row flex-col min-h-screen select-none">
            <div className="z-50 lg:fixed lg:w-[100px] lg:h-screen">
                <Header />
            </div>
            <main className="flex-1 bg-[#F8F8FB] dark:bg-[#141625] p-4 lg:p-4 pt-[90px] lg:pt-8 lg:pl-0">
                <div className='mx-auto w-full max-w-[730px]'>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default MainLayout;
