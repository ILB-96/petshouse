import { listFilesFromDrive } from "@/lib/drive";

// Define the GET request handler
export async function GET() {
  try {
    // Fetch the list of files from Google Drive using the listFilesFromDrive function
    const files = await listFilesFromDrive();

    // Return the list of files in the response
    return new Response(JSON.stringify({ files }), { status: 200 });
  } catch (error) {
    console.error("Error fetching files from Google Drive:", error);

    // Return an error response if something goes wrong
    return new Response(
      JSON.stringify({ error: "Failed to fetch files from Google Drive" }),
      { status: 500 }
    );
  }
}
