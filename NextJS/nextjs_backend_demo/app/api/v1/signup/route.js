import { User } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req) {
  const dataFromFrontend = await req.json();

  // db call
  // save to db

  await User.create({
    name: dataFromFrontend.name,
    email: dataFromFrontend.email,
    password: dataFromFrontend.password,
  });

  return NextResponse.json({
    message: "data recieved on backend and saved in db",
  });
}
