import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Send a POST with { text } to get an echo.",
    example: {
      text: "Hello",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = typeof body?.text === "string" ? body.text : "";
    return NextResponse.json({
      echoed: input,
      length: input.length,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
