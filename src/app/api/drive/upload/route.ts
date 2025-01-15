import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import { getOAuth2Client, uploadFileToDrive } from "@/lib/drive";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const data = await req.formData();
    const file = data.get("file");
    const name = data.get("name");
    if (!file) {
      // If no file is received, return a JSON response with an error and a 400 status code
      return Response.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = name.replaceAll(" ", "_");
    console.log("SESSION", session);
    const oauth = getOAuth2Client(session.accessToken, session.refreshToken);
    console.log("FILE", file);
    const uploadedFile = await uploadFileToDrive(
      oauth,
      filename,
      buffer,
      file.type
    );
    console.log("File uploaded", uploadedFile);
    uploadedFile.type = file.type;
    uploadedFile.name = filename;

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
