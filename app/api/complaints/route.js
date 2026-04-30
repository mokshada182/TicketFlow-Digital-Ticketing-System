import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { Complaint } from "@/app/lib/model/complaint";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  const data = await Complaint.find();

  return NextResponse.json(data);
}

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionStr);

  let complaint = new Complaint(payload);
  const result = await complaint.save();

  return NextResponse.json(result);
}
