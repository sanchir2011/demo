'use client'

import { summarizeImage } from "@/lib/ai";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";

export default function ImageSummarize() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return toast.error("Зураг оруулна уу");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) setFile(file);
      else toast.error("Зураг хуулахад алдаа гарлаа");
    } catch (error) {
      toast.error("Зураг хуулахад алдаа гарлаа: ", error);
    }
  };

  const handleSummarize = async () => {
    if (!file) return toast.error("Зураг оруулна уу");
    setLoading(true);
    const result = await summarizeImage(file);
    setLoading(false);
    if (result) {
      setOutput(result);
    } else {
      toast.error("Ямар нэгэн алдаа гарлаа");
    }
  }

  const handleReset = () => {
    setFile(null);
    setOutput(null);
    setLoading(false);
    fileInputRef.current.value = null;
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Зураг таниулах</h1>
      <p className="mt-2 text-base font-medium">Өөрийн хүссэн зургаа доор оруулна уу</p>
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
        onChange={handleFileUpload}
        className="mt-8 border border-gray-300 rounded p-2 hidden"
        ref={fileInputRef}
      />
      { file ? (
        <img src={URL.createObjectURL(file)} alt="Uploaded" className="aspect-video w-full mt-4 rounded-lg object-cover" />
      ) : (
        <div className="aspect-video w-full mt-4 flex justify-center items-center border-dashed border-2 border-zinc-800 rounded-lg cursor-pointer" onClick={handleClick}>
          Энд зургаа оруулна уу
        </div>
      ) }
      { loading ? (
        <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer flex gap-2 items-center"><Loader2 className="animate-spin" size={20} /> Уншиж байна...</button>
      ) : (
        output ? (
          <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer flex gap-2 items-center" onClick={handleReset}><RotateCcw size={20} /> Дахин эхлэх</button>
        ) : (
          <button className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-lg font-sans font-medium mt-8 cursor-pointer" onClick={handleSummarize}>Боловсруулах</button>
        )
      ) }

      <div className="mt-8 text-center font-sans font-medium">
        {output}
      </div>
    </div>
  );
}
