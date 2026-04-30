import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db";
import { Complaint } from "@/app/lib/model/complaint";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Complaint.find();

  return NextResponse.json(data);
}

export async function POST(request) {
  const payload = await request.json();
  await connectDB();

  let complaint = new Complaint(payload);
  const result = await complaint.save();

  return NextResponse.json(result);
}
