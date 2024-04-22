"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex gap-4 justify-center hover:bg-slate-200"
      >
        <Image src={"/google.png"} alt={""} width={24} height={24} />
        Sign in with Google
      </button>
    </section>
  );
}
