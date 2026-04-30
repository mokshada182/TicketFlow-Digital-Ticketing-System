import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  admno: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  stdClass: { type: String, required: true },
  section: { type: String, required: true },
  comp: { type: String, required: true },
  date: { type: Date, default: Date.now }, 
});

export const Complaint = mongoose.models.complaints || mongoose.model("complaints", complaintSchema);
