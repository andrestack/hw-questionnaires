"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ConfirmationScreenProps {
  name: string;
  message: string;
}

export function ConfirmationScreen({ name, message }: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
      <div className="relative">
        <div className="pt-4">
        <Image
          src="/current_illustation.jpeg"
          alt="Hinterland Web"
          width={100}
          height={100}
          className="h-auto w-40 rounded-5xl"
          priority
        />
      </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-heading-1">
          Thanks {name}
        </h2>
        <p className="max-w-md text-body-text">{message}</p>
      </div>
      
      
      
    </div>
  );
}
