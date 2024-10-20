
import React from 'react'

import { Navbar } from './_componenets/Navbar';
import Link from 'next/link';


const DashboardLayout = ({
    children
}:
{
    children: React.ReactNode;
}) => {
  
  return (
    <div className='h-full'>
      <div>
<Navbar/>
      </div>
        
        <main className='min-h-screen    dark:bg-primary-foreground dark:text-white'>
        {children}
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:bg-primary-foreground dark:text-white">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FcBlog Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default DashboardLayout