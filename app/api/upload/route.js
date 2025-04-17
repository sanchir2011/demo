import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) return NextResponse.json({ error: "Зураг хоосон байна" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  
  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(process.cwd(), "uploads/" + filename), buffer);
    return NextResponse.json({ Message: "Амжилттай", status: 201 });
  } catch (error) {
    console.log("Aldaa garlaa: ", error);
    return NextResponse.json({ Message: "Ямар нэгэн алдаа гарлаа", status: 500 });
  }
};