import { getOAuth2Client, uploadFileToDrive } from "@/lib/drive";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  const token = await getToken({ req: req as unknown as NextApiRequest });
  if (!token) {
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

    const filename = name.replaceAll(" ", "_");
    const oauth = getOAuth2Client(
      token.accessToken as string,
      token.refreshToken as string
    );
    const uploadedFile = await uploadFileToDrive(
      oauth,
      filename,
      buffer,
      file.type
    );

    return new Response(
      JSON.stringify({
        media: uploadedFile,
        type: file.type,
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
