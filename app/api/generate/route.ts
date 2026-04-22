import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GeneratePayload = {
  url?: string;
  appName?: string;
  packageName?: string;
};

function slugifyToPackage(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
  return `com.webtoapk.${slug || "app"}`;
}

export async function POST(request: Request) {
  let payload: GeneratePayload;
  try {
    payload = (await request.json()) as GeneratePayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const url = (payload.url ?? "").trim();
  const appName = (payload.appName ?? "").trim();
  const packageName = (payload.packageName ?? "").trim() || slugifyToPackage(appName);

  if (!url || !appName) {
    return NextResponse.json(
      { success: false, error: "Both `url` and `appName` are required." },
      { status: 400 },
    );
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json(
      { success: false, error: "The provided URL is not valid." },
      { status: 400 },
    );
  }

  const buildId = Math.random().toString(36).slice(2, 10);

  return NextResponse.json({
    success: true,
    message: "APK generated successfully (demo).",
    appName,
    url,
    packageName,
    size: "4.2 MB",
    generatedAt: new Date().toISOString(),
    downloadUrl: `https://example.com/builds/${buildId}.apk`,
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Send a POST request with { url, appName, packageName? } to generate an APK.",
  });
}
