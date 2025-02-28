// lib/googleDrive.ts
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { Readable } from "stream";

// Function to authenticate with OAuth2
export const getOAuth2Client = (accessToken: string, refreshToken: string) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return oauth2Client;
};

export const uploadFileToDrive = async (
  oauth2Client: OAuth2Client,
  filename: string,
  buffer: Buffer,
  mimeType: string
) => {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  console.log("YELLOW", filename, mimeType);
  try {
    const fileMetadata = {
      name: filename, // Name of the file to be uploaded
    };

    const media = {
      mimeType: mimeType,
      body: Readable.from(buffer), // Convert the buffer to a readable stream
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, name, webViewLink", // Return file metadata
    });

    if (res.data.id) {
      await drive.permissions.create({
        fileId: res.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    }

    return res.data;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
};