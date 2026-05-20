import { addApplication, listApplications } from "./applicationService";

// Takes command-line words and turns them into a dictionary object.
// argv example: ["--company", "Apple", "--role", "Developer"]
// Record<string, string> means this function returns an object like a dictionary.
// The keys are strings, and the values are also strings.
// Return example: { company: "Apple", role: "Developer" }
function parseArgs(argv: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--company" || token === "--role" || token === "--location" || token === "--source") {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error(`Missing value for ${token}`);
      }
      const key = token.slice(2); // slice(2) means remove the first 2 characters (--company -> company)
      result[key] = value;
      i++;
    }
  }
  return result;
}

// async means this function always returns a Promise.
// Promise<void> means the function will finish in the future,
// but it does not return any useful value.
// We do not use await here yet, but this makes it easy to add async work later,
// such as reading files asynchronously, calling an API, or using a database.
async function main(): Promise<void> {
  const args = process.argv.slice(2); 
  const cmd = args[0];
  // process.argv is an array of command line arguments.
  // eg: npm run dev -- add --company "Example Co" --role "Junior Developer" --location "Hamilton" [--source "Seek"]
  // process.argv will be ["node", "src/index.ts", "add", "--company", "Example Co", "--role", "Junior Developer", "--location", "Hamilton", "--source", "Seek"]

  if (cmd === "list") {
    const apps = listApplications();
    if (apps.length === 0) {
      console.log("No applications yet.");
      return;
    }
    for (const app of apps) {
      console.log(
        `[${app.status}] ${app.company} - ${app.jobTitle} - ${app.location}` +
          (app.source ? ` (source: ${app.source})` : "") // ?: means if the left side is true, then use the left side, otherwise use the right side.
      );
    }
    return;
  }

  if (cmd === "add") {
    const flags = parseArgs(args.slice(1));
    const company = flags.company ?? ""; // ?? means if the left side is null or undefined, then use the right side.
    const role = flags.role ?? "";
    const location = flags.location ?? "";
    const source = flags.source; // source is optional, so it can be undefined, but company, role, location are required， if not provided, they will be ""(empty string) instead of undefined.

    const created = addApplication({ company, role, location, source });
    console.log("Added application:");
    console.log(created);
    return;
  }

  console.error("Usage:");
  console.error('  npm run dev -- list');
  console.error(
    '  npm run dev -- add --company "Example Co" --role "Junior Developer" --location "Hamilton" [--source "Seek"]'
  );
  process.exit(1); // throw new Error will exit the function and go to the caller···until reach "catch" block.
  // process.exit(1) will stop the whole program.
}

// main() returns a Promise because main is async.
// .catch() handles any error thrown inside main.
// If err is a normal Error object, print err.message.
// Otherwise, print the thrown value itself.
main().catch((err) => {
  console.error(err instanceof Error ? err.message : err); // check if the error is a standard Error object, if yes, then print the message, otherwise print the error.
  process.exit(1);
});