'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header(){
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if(userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }
    return(
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            ST PIZZA
          </Link>  
          <Link href={'/'} className="hover:bg-slate-200 rounded-full py-2 px-4">Home</Link>
          <Link href={''} className="hover:bg-slate-200 rounded-full py-2 px-4">Menu</Link>
          <Link href={''} className="hover:bg-slate-200 rounded-full py-2 px-4">About</Link>
          <Link href={''} className="hover:bg-slate-200 rounded-full py-2 px-4">Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === 'authenticated' && (
            <main className="flex gap-2 items-center">
              <Link href={'/profile'} className="whitespace-nowrap hover:bg-slate-200 px-4 py-2 rounded-full">
                Hello, {userName}
              </Link>
              <button 
                onClick = {() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2 hover:bg-red-400">
                Logout
              </button>
            </main>
          )}
          {status !== 'authenticated' && (
            <main className="flex gap-2 items-center">
              <Link href={'/login'} className="hover:bg-slate-200 px-4 py-2 rounded-full">Login</Link>  
              <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2 hover:bg-red-400">Register</Link>
            </main>
          )}
        </nav>
      </header>
    );
}