import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    id: "1",
    todo: "go to gym",
  });
}



