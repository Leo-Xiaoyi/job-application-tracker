import fs from "fs";
import path from "path";
import type { JobApplication } from "./types";

// define the data file(applications.json) path
const DATA_FILE = path.join(
  process.cwd(), // current working directory(root directory of the project)
  "cli",
  "data",
  "applications.json"
);

export function readApplications(): JobApplication[] {
  try {
    const rawcontent = fs.readFileSync(DATA_FILE, "utf8"); // Sync(Synchronous) means the function will block the execution until the file is read.
    const data = JSON.parse(rawcontent);

    if (!Array.isArray(data)) {
      return [];
    }

    return data as JobApplication[];
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") { // ENOENT： Error No Entry. means the file does not exist.
      return [];
    }

    throw error; // throw the error to the caller.
  }
}

export function writeApplications(applications: JobApplication[]): void {
  const directory = path.dirname(DATA_FILE); // get the directory name of the data file，eg: DATA_FILE is /Users/leo/job-application-tracker/cli/data/applications.json, then directory is /Users/leo/job-application-tracker/cli/data

  fs.mkdirSync(directory, { recursive: true }); // { recursive: true } means create the directory if it doesn't exist.

  const rawContent = JSON.stringify(applications, null, 2);

  fs.writeFileSync(DATA_FILE, rawContent, "utf8"); // if the file does not exist, it will be created by writeFileSync.
}