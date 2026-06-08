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
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <CheckCircle2 className="relative h-16 w-16 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-heading-1">
          Thanks {name}
        </h2>
        <p className="max-w-md text-body-text">{message}</p>
      </div>
      <div className="pt-4">
        <Image
          src="/logo_new.png"
          alt="Hinterland Web"
          width={160}
          height={48}
          className="h-auto w-40"
          priority
        />
      </div>
    </div>
  );
}
