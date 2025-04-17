'use client'

import { generateDomainName, summarizeImage } from "@/lib/ai";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";

export default function DomainGeneration() {
  const [userPromt, setUserPromt] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneration = async () => {
    if (!userPromt) return toast.error("Чиглэл оруулна уу");
    setLoading(true);
    const result = await generateDomainName(userPromt);
    setLoading(false);
    if (result) {
      setOutput(result);
    } else {
      toast.error("Ямар нэгэн алдаа гарлаа");
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center">Домэйн нэр санал болгох</h1>
      <p className="mt-2 text-base font-medium">Үйл ажиллагааны чиглэл оруулна уу</p>
      <textarea
        value={userPromt}
        onChange={(e) => setUserPromt(e.target.value)}
        className="mt-4 border border-gray-300 rounded-xl py-2 px-3 w-full"
        placeholder="Энд үйл ажиллагааны чиглэлээ оруулна уу"
      />
      { loading ? (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer flex gap-2 items-center"><Loader2 className="animate-spin" size={20} /> Уншиж байна...</button>
      ) : (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer" onClick={handleGeneration}>Боловсруулах</button>
      ) }

      <div className="mt-8 text-center font-sans font-medium">
        {(output && Array.isArray(output)) && (
          output.map((domain, index) => (
            <div key={index} className="text-lg text-zinc-100 font-bold mt-2">
              {domain}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
