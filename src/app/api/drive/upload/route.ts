import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import { getOAuth2Client, uploadFileToDrive } from "@/lib/drive";
import { AuthSession } from "@/types";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const data = await req.formData();
    const file = data.get("file") as Blob;
    const name = data.get("name") as string;
    if (!file || !name) {
      return Response.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = name.replaceAll(" ", "_");
    const oauth = getOAuth2Client(
      session.accessToken as string,
      session.refreshToken as string
    );
    console.log("FILE", file);
    const uploadedFile = await uploadFileToDrive(
      oauth,
      filename,
      buffer,
      file.type
    );

    return new Response(
      JSON.stringify({
        media: uploadedFile,
        message: "File uploaded successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
