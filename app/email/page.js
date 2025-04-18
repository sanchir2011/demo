'use client'

import { generateDomainName, replyToEmail, summarizeImage } from "@/lib/ai";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";

const example = `Сайн байна уу,

Би танай компанийн үйлчилгээг ашигладаг ба их сэтгэл хангалуун байгаа. Гэхдээ нэг асуудал үүссэн нь сүүлийн үед нилээн удаан болчихсон байна. Энийг асуудлыг хурдан шийдэж өгнө үү.

Танд баярлалаа.`

export default function EmailReply() {
  const [content, setContent] = useState(example);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneration = async () => {
    setLoading(true);
    await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify({
        prompt: content,
      }),
    }).then(response => {
      response.json().then(json => {
        setOutput(json.text);
        setLoading(false);
      });
    });
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center">Имэйлд хариулах</h1>
      <p className="mt-2 text-base font-medium">Жишээ имэйл контент оруулна уу</p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-4 border border-gray-300 rounded-xl py-2 px-3 w-full"
        placeholder="Энд жишээ оруулна уу"
        autoFocus
        rows={10}
      />
      { loading ? (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer flex gap-2 items-center"><Loader2 className="animate-spin" size={20} /> Уншиж байна...</button>
      ) : (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer" onClick={handleGeneration}>Боловсруулах</button>
      ) }

      <div className="mt-8 text-left font-sans font-medium">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
}
