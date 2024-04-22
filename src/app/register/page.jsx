"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() { 
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <div className="block max-w-xs mx-auto">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center hover:bg-slate-200"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Sign up with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
