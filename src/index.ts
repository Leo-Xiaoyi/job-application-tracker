import type { JobApplication } from "./types";

const sampleApplication: JobApplication = {
  id: "1",
  company: "Example Company",
  jobTitle: "Software Engineer",
  location: "New York, NY",
  status: "Submitted",
  source: "LinkedIn",
  contactPerson: "John Doe",
  notes: "I applied for this job on LinkedIn.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

console.log(sampleApplication);