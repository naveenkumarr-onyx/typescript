import ytdlp from "yt-dlp-exec";
import { Request, Response } from "express";
import { encryptData } from "../utils/encryption";

interface VideoFormat {
  formatId: string;
  url: string;
  ext: string;
  resolution: string;
  audioBitrate?: number;
  hasAudio: boolean;
  hasVideo: boolean;
}

export async function youtubeaudiodownloader(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: true,
        message: "No URL provided",
      });
    }

    const info: any = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      skipDownload: true,
      noPlaylist: true,
      preferFreeFormats: true,
    });
 

    const formats: VideoFormat[] = info.formats
      .filter((format: any) => format.url)
      .map((format: any) => ({
        formatId: format.format_id,
        url: format.url,
        ext: format.ext,
        resolution:
          format.resolution || `${format.width ?? ""}x${format.height ?? ""}`,
        audioBitrate: format.abr,
        hasAudio: !!format.abr,
        hasVideo: !!format.height,
      }));

    const payload = {
      videoDetails: {
        title: info.title,
        duration: info.duration,
        viewCount: info.view_count,
      },
      data: formats,
    };

    const encrypted = encryptData(payload);

    return res.status(200).json(encrypted);
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to fetch video info",
    });
  }
}
