'use client'

import { generateDomainName, replyToEmail, speechToText, summarizeImage } from "@/lib/ai";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";

const example = `Сайн байна уу,

Би танай компанийн үйлчилгээг ашигладаг ба их сэтгэл хангалуун байгаа. Гэхдээ нэг асуудал үүссэн нь сүүлийн үед нилээн удаан болчихсон байна. Энийг асуудлыг хурдан шийдэж өгнө үү.

Танд баярлалаа.`

export default function Audio() {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneration = async () => {
    setLoading(true);
    const result = await speechToText();
    setLoading(false);
    if (result) {
      setOutput(result);
    } else {
      toast.error("Ямар нэгэн алдаа гарлаа");
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center">Яриа орчуулах</h1>
      <p className="mt-2 text-base font-medium">Доорх яриаг англи хэл рүү орчуулна</p>
      <audio className="mt-4" controls>
        <source src="/demo-audio.mp3" type="audio/mp3" />
        Таны браузер дэмжихгүй байна.
      </audio>
      { loading ? (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer flex gap-2 items-center"><Loader2 className="animate-spin" size={20} /> Уншиж байна...</button>
      ) : (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer" onClick={handleGeneration}>Орчуулах</button>
      ) }

      <div className="mt-8 text-center font-sans font-medium">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
}
