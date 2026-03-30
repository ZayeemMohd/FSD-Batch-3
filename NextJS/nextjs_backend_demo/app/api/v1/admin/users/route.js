import { User } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const allUsers = await User.find({});

  return NextResponse.json(allUsers);
}
