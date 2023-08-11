"use client";

import React from "react";
import { signIn } from "next-auth/react";

type Props = {};

function Login({}: Props) {
  const backgroundImageUrl = "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <button
        onClick={() => signIn("google")}
        className="rounded-2xl p-5 font-bold text-3xl animate-pulse bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
      >
        Sign In to talk to Amelia
      </button>
    </div>
  );
}

export default Login;