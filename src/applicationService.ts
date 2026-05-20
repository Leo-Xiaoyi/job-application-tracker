import { randomUUID } from "crypto";
import type { ApplicationStatus, JobApplication, Source } from "./types";
import { readApplications, writeApplications } from "./storage";

const SOURCES: Source[] = ["Seek", "LinkedIn", "Company Website", "Other"];

function isSource(value: string): value is Source {
  return (SOURCES as string[]).includes(value);
}

export type AddApplicationInput = {
  company: string;
  role: string;
  location: string;
  source?: string;
};

export function listApplications(): JobApplication[] {
  return readApplications();
}

export function addApplication(input: AddApplicationInput): JobApplication {
  const company = input.company.trim();  // trim() means remove the leading and trailing whitespace.
  const role = input.role.trim();
  const location = input.location.trim();

  if (!company || !role || !location) {
    throw new Error("Missing required fields: company, role, and location are required.");
  } 

  let source: Source | undefined;
  if (input.source !== undefined && input.source.trim() !== "") { // undefined means the source doesn't exist at all, while trim() === "" means the source is an empty string.
    const s = input.source.trim();
    if (!isSource(s)) {
      throw new Error(
        `Invalid --source "${s}". Allowed: Seek | LinkedIn | Company Website | Other`
      );
    }
    source = s;
  }

  const apps = readApplications();
  const now = new Date().toISOString();

  const defaultStatus: ApplicationStatus = "Saved";

  const newApp: JobApplication = {
    id: randomUUID(),
    company,
    jobTitle: role,
    location,
    status: defaultStatus,
    createdAt: now,
    updatedAt: now,
  };

  if (source !== undefined) {
    newApp.source = source;
  }

  apps.push(newApp);
  writeApplications(apps);

  return newApp;
}