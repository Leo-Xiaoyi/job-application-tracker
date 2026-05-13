export type ApplicationStatus = 
  | "Saved"
  | "Submitted"
  | "Interviewing"
  | "Rejected"
  | "Offer"
  | "Withdrawn";

export type Source = "Seek" | "LinkedIn" | "Company Website" | "Other";

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  location: string;  
  jobLink?: string;
  jobDescription?: string;
  salaryRange?: string;
  status: ApplicationStatus;
  source?: Source;
  contactPerson?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}