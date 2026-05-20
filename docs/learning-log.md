# Learning Log

## Week 0: Project Setup and GitHub Workflow

### Learning Goals

- Understand the basic GitHub workflow
- Set up the initial project structure
- Create a roadmap for the project
- Start documenting the development process

### What I Learned

- A repository stores the project and its history
- A README explains the project to collaborators and employers
- GitHub Issues work well as small, trackable task cards
- A Project Board gives a simple Kanban view of progress
- Commit messages should describe meaningful changes clearly, not vague words like “update”
- The roles of `README`, `docs/`, `src/`, `package.json`, `tsconfig.json`, and `.gitignore` in a Node/TypeScript project
- The difference between `npm run dev` (execute the program) and `npm run typecheck` (check types without emitting build output)
- TypeScript can describe object shapes using interfaces and union types
- `.env` and secrets must never be committed; `.gitignore` helps prevent accidents

### What I Built

- Public GitHub repository: `job-application-tracker`
- Project README aligned with the 12-week handbook (status, planned stack, progress checklist, getting started)
- `docs/roadmap.md` and this learning log
- Minimal runnable TypeScript entrypoint (`npm run dev` → `src/index.ts`)
- Initial Issues and Project Board entries for upcoming weeks

### AI-assisted Development Notes

- I used AI and course materials for step-by-step Week 0 setup (folder layout, `package.json` scripts, first `console.log` run).
- I ran every command locally, inspected `git status` before committing, and adjusted README wording to match my own MVP scope (manual-first, no scraping).

### GitHub Updates

- Repository created and linked to local clone
- Initial documentation committed (`Initialise project structure and Week 0 documentation`, plus later handbook alignment commits)
- Issues created for Week 0 setup and forward-looking tasks (CLI, API, database)
- Project Board: moved “Set up initial project structure” through In progress → Done

### Challenges

- Balancing the handbook’s Week 0 README template with clear setup instructions and an honest MVP scope in my own words
- Deciding how much repository structure to create immediately versus adding `cli/`, `backend/`, and `frontend/` only when those weeks start
- Building intuition for when to rely on type checking versus running the script

### Next Steps (from Week 0)

- Learn TypeScript fundamentals in the context of the job tracker domain
- Define the job application data model in dedicated type files
- Build the first CLI prototype (Week 2)

### Additional reflection (same week, deeper notes)

- I practised creating a simple `JobApplication`-shaped type and deliberately introduced a type error to see how `tsc` reports it, then fixed it.
- I still want to solidify how to split types and runtime code across files (addressed in Week 1 with `types.ts` + `index.ts`).
- I am looking forward to the first CLI command for adding applications so the model leaves “sample only” and becomes interactive.

---

## Week 1: TypeScript fundamentals and JobApplication data model

### Learning Goals

- Use core TypeScript syntax: primitives, interfaces, union types, optional properties
- Define `ApplicationStatus` and `Source` as named union types
- Define `JobApplication` and a typed `sampleApplication`
- Run `npm run dev` and `npm run typecheck` with zero errors

### What I Learned

- **Union types** constrain a field to a fixed set of literals—for example `ApplicationStatus` allows only `"Saved" | "Submitted" | …`, which catches typos at compile time.
- **`interface`** describes the shape of an object: required fields vs optional fields (`?`) such as `jobLink`, `source`, `contactPerson`.
- **`export` / `import type`** lets types live in `src/types.ts` while `src/index.ts` imports only the type information for `JobApplication`, keeping the entry file focused on a demo object.
- **`createdAt` / `updatedAt` as ISO strings** (`new Date().toISOString()`) is a simple, JSON-friendly representation before Prisma `DateTime` fields exist in later weeks.
- Field naming is a deliberate trade-off: I used `jobTitle` and `jobLink` in this iteration; the handbook uses `role` and `jobUrl`. Either is valid if the codebase stays consistent until the database schema is introduced.

### What I Built

- **`src/types.ts`**
  - `ApplicationStatus`: six string literals for the application lifecycle
  - `Source`: four literals for where the listing was found
  - `JobApplication`: required `id`, `company`, `jobTitle`, `location`, `status`, `createdAt`, `updatedAt`; optional `jobLink`, `jobDescription`, `salaryRange`, `source`, `contactPerson`, `notes`
- **`src/index.ts`**
  - Imports `JobApplication` with `import type { JobApplication } from "./types"`
  - Defines `sampleApplication` satisfying the interface (including `source: "LinkedIn"` and `contactPerson: "John Doe"`)
  - Prints the object with `console.log(sampleApplication)`
- **`README.md`**: added Week 1 progress bullets (data model, status types, sample data)
- **`package.json`**: `typecheck` script using `tsc --noEmit` for fast static checks

### GitHub Updates

- Commits for Week 1 scope:
  - `c43bb1b` — Add TypeScript job application data model (`src/types.ts`, `src/index.ts`, and related project updates in that commit)
- Issues:
  - Closed: **Define TypeScript data model for job applications**
  - Opened or queued for Week 2: **Build CLI command to list applications**, **Build CLI command to add applications**
- Project board:
  - Moved the Week 1 data-model card from **In progress** to **Done** after `typecheck` and `dev` both succeeded

### Next Steps

- Week 2: implement CLI `list` and `add` commands using `JobApplication`, persisting to `cli/data/applications.json` as specified in the handbook
- Optionally align field names with the handbook (`role`, `jobUrl`) before the database layer, or keep current names and map them explicitly in Prisma later
- The status literals of this project are different from the examples in the manual. The code is working as expected.

---

## Week 2: CLI Prototype 1 — Add and List Applications

### Current Focus

This week I started building the first real CLI prototype for the job application tracker. The goal is to move from a static sample object in Week 1 to a small command-line tool that can:

- list existing job applications
- add a new job application from terminal arguments
- save the data into `cli/data/applications.json`

The intended flow is:

```text
terminal command
→ src/index.ts parses the command
→ src/applicationService.ts handles business logic
→ src/storage.ts reads/writes JSON data
→ cli/data/applications.json stores the records
```

### First Real Blocker: Node.js Types and Project Environment

The first real difficulty I met in Week 2 was not the business logic itself, but the project environment.

When I created `src/storage.ts`, I used Node.js APIs such as:

- `fs` for reading and writing files
- `path` for building file paths
- `process.cwd()` for locating the project root
- `NodeJS.ErrnoException` for checking file-system errors such as `ENOENT`

The code logic was understandable to me: read a JSON file, parse it, return an array, and write the updated array back to disk. However, TypeScript reported errors such as:

```text
Cannot find module 'fs' or its corresponding type declarations.
Cannot find module 'path' or its corresponding type declarations.
Cannot find name 'process'.
Cannot find namespace 'NodeJS'.
```

At first this was confusing because I thought Node.js itself should already know what `fs`, `path`, and `process` are. The important distinction I learned is:

- Node.js is the runtime environment that actually provides APIs like `fs`, `path`, and `process`.
- TypeScript is the type checker. It checks the code before runtime and needs type information to understand those Node.js APIs.
- `@types/node` is the type declaration package that teaches TypeScript what Node.js provides.

So the issue was not that Node.js was missing, and it was not that the storage logic was fundamentally wrong. The issue was that my TypeScript project did not yet include Node.js type declarations.

### What I Changed

I installed the Node.js type declarations as a development dependency:

```bash
npm install --save-dev @types/node
```

This package belongs in `devDependencies` because it is mainly needed during development and type checking. It helps TypeScript understand Node.js APIs, but it is not business logic for the application itself.

I also updated `tsconfig.json` to explicitly include Node types:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src"]
}
```

The most important new line for this issue was:

```json
"types": ["node"]
```

This tells TypeScript to load the Node.js type declarations when checking files in this project.

### What I Learned from This Problem

This blocker helped me understand that a TypeScript/Node.js project has more than just application code. There are several layers working together:

```text
my application code
→ TypeScript type checking
→ Node.js runtime environment
→ npm dependencies and project configuration
```

Before this issue, I mainly focused on whether the function logic made sense. Now I understand that even correct-looking code can fail if the project environment does not know which APIs and types are available.

I also learned that running:

```bash
npm install
```

only installs packages already listed in `package.json`. It does not automatically guess and install missing packages. To add a new package to the project, I need to run a command such as:

```bash
npm install --save-dev @types/node
```

After that, both `package.json` and `package-lock.json` may change, which is expected.

### Notes on `storage.ts`

For Week 2, I decided to keep `storage.ts` simple and beginner-friendly. Instead of using more advanced ESM-specific patterns like `import.meta.url`, I used `process.cwd()` to build the path to the JSON data file:

```ts
const DATA_FILE = path.join(
  process.cwd(),
  "cli",
  "data",
  "applications.json"
);
```

This is easier for me to understand at the current stage:

- `process.cwd()` means the current working directory where the command is run, normally the project root.
- `path.join(...)` safely builds a file path instead of manually writing path strings.
- `cli/data/applications.json` is the temporary JSON storage file for the CLI prototype.

I also learned that `ENOENT` means the file does not exist. In this project, if `applications.json` does not exist yet, returning an empty array is a reasonable first-run behavior:

```ts
if (nodeError.code === "ENOENT") {
  return [];
}
```

This makes the CLI more user-friendly because the first `list` command can show “no applications yet” instead of crashing.

### Reflection

This was the first Week 2 problem that felt like a real development issue rather than a simple syntax mistake. It showed me that full-stack development is not only about writing functions. I also need to understand how the runtime, package manager, type checker, and configuration files work together.

The confusing part was that the error messages looked very technical, but the root cause was actually clear after breaking it down:

```text
I used Node.js APIs
→ TypeScript did not have Node.js type declarations
→ install @types/node
→ tell tsconfig to use Node types
```

This is an important learning point for me because future backend, database, testing, and AI integration work will also involve packages, types, configuration, and runtime assumptions.

For now, my next step is to finish `storage.ts`, confirm that `npm run typecheck` passes, and then continue to `applicationService.ts` for the actual add/list business logic.

### Deeper Understanding: How the Whole CLI Project Fits Together

After understanding the individual code files, I spent more time this week connecting the whole project structure together. I learned that the CLI is not just a group of separate functions. It is a small layered program where each file has a clear responsibility.

The overall flow is:

```text
user types a terminal command
→ index.ts receives the command
→ parseArgs() turns command-line flags into a simple object
→ main() decides whether to run list or add
→ applicationService.ts handles the business rules
→ storage.ts reads or writes the JSON file
→ applications.json stores the actual records
→ index.ts prints the result back to the user
```

The responsibilities of the main files are:

```text
index.ts = CLI entry point and command routing
applicationService.ts = business logic and validation
storage.ts = JSON file persistence
types.ts = shared TypeScript type definitions
applications.json = local data storage
```

This helped me see that the files should not all do the same job. `index.ts` should not directly handle all storage details, `storage.ts` should not decide whether a source is valid, and `types.ts` should not run the program. Keeping each file focused makes the project easier to understand and easier to extend later.

### Function-by-Function Understanding

This week I also reviewed each important function and how they connect to each other.

#### `main()` in `index.ts`

`main()` is the entry point of the CLI program. It reads the command-line input from `process.argv`, removes the first two system-related values with `slice(2)`, and then checks the first real user command.

If the command is:

```bash
npm run dev -- list
```

then `main()` calls `listApplications()`.

If the command is:

```bash
npm run dev -- add --company "Apple" --role "Developer" --location "Hamilton" --source "Seek"
```

then `main()` calls `parseArgs()` first, prepares the values, and then calls `addApplication()`.

If the command is not recognised, `main()` prints the usage instructions and exits with a failure code.

The important thing I learned is that `main()` acts as the command router. It does not do all the work itself. It decides where the work should go.

#### `parseArgs(argv: string[]): Record<string, string>` in `index.ts`

`parseArgs()` takes command-line words and turns them into a dictionary-like object.

For example:

```ts
["--company", "Apple", "--role", "Developer", "--location", "Hamilton"]
```

becomes:

```ts
{
  company: "Apple",
  role: "Developer",
  location: "Hamilton"
}
```

I learned that `Record<string, string>` does not mean only one key-value pair. It means an object where every key is a string and every value is also a string. It can contain many pairs.

I also learned that this parser is currently quite forgiving. If the user types extra unknown words, the function mostly ignores them. However, if a known flag such as `--company` has no value after it, the function throws an error.

Useful English comment I can put in the code:

```ts
// Takes command-line words and turns them into a dictionary object.
// argv example: ["--company", "Apple", "--role", "Developer"]
// Record<string, string> means: string keys and string values.
// Return example: { company: "Apple", role: "Developer" }
```

#### `listApplications()` in `applicationService.ts`

`listApplications()` is the function used when the user wants to see existing applications. It does not print the applications itself. Instead, it calls `readApplications()` to get the saved records and returns them to `main()`.

This separation is useful because the service layer focuses on getting the data, while `index.ts` focuses on showing the result to the terminal.

#### `addApplication(input)` in `applicationService.ts`

`addApplication()` is the main business logic function for adding a new job application.

It does several important jobs:

```text
trim and check required fields
→ validate optional source
→ read existing applications
→ create a new application object
→ add the new object to the array
→ write the updated array back to the JSON file
→ return the created application
```

I learned that this function is the right place for business rules. For example, company, role, and location must not be empty. The source must be one of the allowed source values if the user provides it.

I also learned the difference between `undefined`, an empty string `""`, and a string with spaces like `"   "`. A missing value may be `undefined`, but a user can also provide an empty-looking value. Using `.trim()` helps treat spaces-only input as empty.

#### `isSource(value: string): value is Source` in `applicationService.ts`

`isSource()` checks whether a normal user string is one of the allowed `Source` values.

Allowed values are:

```text
Seek
LinkedIn
Company Website
Other
```

The important TypeScript idea here is that `value is Source` is a type guard. It means that after this function returns `true`, TypeScript can treat the value as a valid `Source`, not just a random string.

This helped me understand that TypeScript types protect the code during development, but user input still needs runtime checking because terminal input is just text.

#### `readApplications()` in `storage.ts`

`readApplications()` is responsible for reading existing job applications from the JSON file.

Its flow is:

```text
read cli/data/applications.json
→ parse the JSON text
→ check that the parsed result is an array
→ return the array
```

If the file does not exist yet, it returns an empty array instead of crashing. This is useful for the first time the program runs.

I learned that `JSON.parse()` turns JSON text into JavaScript data, but the parsed data still needs checking. That is why `Array.isArray(data)` is useful.

#### `writeApplications(applications)` in `storage.ts`

`writeApplications()` is responsible for saving the full applications array back to the JSON file.

Its flow is:

```text
find the data directory
→ create the directory if it does not exist
→ convert the applications array into formatted JSON text
→ write the JSON text to cli/data/applications.json
```

I learned that `fs.mkdirSync(directory, { recursive: true })` is useful because it makes sure the folder exists before writing the file. I also learned that `JSON.stringify(applications, null, 2)` makes the JSON file nicely formatted and readable.

### Detailed Syntax and Logic Points

#### `process.argv.slice(2)`

I learned that `process.argv` contains the command-line input received by Node.js. The first two items are not the real command I typed for my CLI logic. They are usually the Node.js executable path and the script path.

That is why the program uses:

```ts
const args = process.argv.slice(2);
```

This keeps only the real user input, such as:

```bash
add --company "Apple" --role "Developer" --location "Hamilton"
```

So `args[0]` can become the command name, such as `add` or `list`.

#### `undefined` and empty string `""`

I learned that `undefined` and `""` are different.

```text
undefined = the value was not provided / the property does not exist
"" = the value exists, but it is an empty string
```

For example, if the user does not type `--company`, then `flags.company` may be `undefined`. But if a value becomes an empty string after trimming, it means the user provided something that is empty or only spaces.

Understanding this difference helped me understand why missing input and empty-looking input both need to be handled carefully.

#### The `??` operator

I learned that `??` is the nullish coalescing operator. It gives a fallback value only when the left side is `null` or `undefined`.

In this project:

```ts
const company = flags.company ?? "";
const role = flags.role ?? "";
const location = flags.location ?? "";
```

This means that if a required flag is completely missing, the program turns it into an empty string and lets `addApplication()` validate it consistently.

For `source`, the code does not use `?? ""` because `source` is optional. If the user does not provide it, `undefined` is a valid value.

#### Standard `Error` and non-standard `throw`

I learned that JavaScript can throw almost any value:

```ts
throw "Something went wrong";
throw 123;
throw { message: "Bad input" };
```

These are non-standard throw values. They can still interrupt the program and be caught, but they do not behave as nicely as a real `Error` object.

The preferred approach is:

```ts
throw new Error("Something went wrong");
```

A standard `Error` has useful information such as `message` and stack trace, which makes debugging easier.

#### `.catch()` is Promise error handling

I learned that `.catch()` is used on a Promise. It is not a general method for every normal function.

Because `main()` is an async function, calling it returns a Promise:

```ts
main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
```

This means that if an error happens inside `main()`, the Promise becomes rejected, and `.catch()` handles that rejected Promise.

#### Synchronous `try/catch` vs Promise `.catch()`

I learned that synchronous code usually uses `try/catch`:

```ts
try {
  main();
} catch (err) {
  console.error(err);
}
```

Promise-based or async code can use `.catch()`:

```ts
main().catch((err) => {
  console.error(err);
});
```

Inside another async function, I could also use `try/catch` with `await`:

```ts
try {
  await main();
} catch (err) {
  console.error(err);
}
```

This helped me understand that `try/catch` and `.catch()` are both ways to handle errors, but they are used in different styles depending on whether the code is synchronous or Promise-based.

#### Async functions

I learned that an `async function` always returns a Promise, even if I do not manually write `return new Promise(...)`.

For example:

```ts
async function main(): Promise<void> {
  // ...
}
```

means that `main()` returns a `Promise<void>`.

In the current project, `main()` does not strictly need to be async because there is no `await` yet. However, keeping it async is useful because future versions may add asynchronous work, such as database calls, API requests, or async file operations.

#### `throw` and `process.exit(1)`

I learned that `throw` and `process.exit(1)` are related to failure, but they are not the same thing.

```text
throw new Error(...) = report an error and pass it upward to be caught
process.exit(1) = stop the whole Node.js process and mark it as failed
```

`throw` lets the program's error handling decide what to do. `process.exit(1)` is the final exit step for the CLI.

I also learned that `process.exit(1)` itself does not print the error message. The message is printed by `console.error(...)`. The exit code `1` tells the operating system or terminal that the command failed.

#### `randomUUID()`

I learned that `randomUUID()` creates a unique id for a new job application.

In this project, each application needs an `id` so that records can be identified later, especially when future features such as update, delete, or status changes are added.

For example, instead of relying only on a company name like `Apple`, the program can use a unique id to know exactly which application record it is working with.

#### `.trim()`

I learned that `.trim()` removes extra spaces from the beginning and end of a string.

For example:

```ts
"   Apple   ".trim(); // "Apple"
"   ".trim();        // ""
```

This is important for user input. A user might type spaces by accident, and the program should not treat `"   Apple   "` as a different company from `"Apple"`. It should also reject input that is only spaces.

### Understanding `Record<string, string>`

One important TypeScript concept I understood this week was `Record<string, string>`.

At first, I felt like this syntax meant the function only returned one key-value pair. Now I understand that it describes the type of a whole dictionary object.

```ts
Record<string, string>
```

means:

```text
an object where the keys are strings
and the values are strings
```

So this is valid:

```ts
{
  company: "Apple",
  role: "Developer",
  location: "Hamilton",
  source: "Seek"
}
```

It is similar to writing:

```ts
{ [key: string]: string }
```

This is useful for `parseArgs()` because we do not know in advance exactly which flags the user will type, but we know the result should be a dictionary of string keys and string values.

### Understanding `async`, `Promise`, and `.catch()`

Another major topic this week was understanding `async`, `Promise`, and error handling.

I learned that a `Promise` can be understood like a receipt for a future result:

```text
Promise<string> = I will eventually give you a string
Promise<void> = I will eventually finish, but I will not give you a useful value
```

An `async function` always returns a Promise. So this function:

```ts
async function main(): Promise<void> {
  // ...
}
```

returns a `Promise<void>` even if I do not manually create a Promise inside it.

In the current version of the project, `main()` does not strictly need to be async because there is no `await` yet. It could also be written as a normal synchronous function and wrapped with `try/catch`. However, keeping it async makes it easier to add future asynchronous work, such as database calls, API calls, or asynchronous file operations.

I also learned that `.catch()` belongs to Promises. Since `main()` is async, calling `main()` returns a Promise, so this works:

```ts
main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
```

Useful English comment I can put in the code:

```ts
// main() returns a Promise because main is async.
// .catch() handles any error thrown inside main.
// If err is a normal Error object, print err.message.
// Otherwise, print the thrown value itself.
```

### Understanding Error Handling

This week I learned the difference between creating an error, throwing an error, catching an error, printing an error, and exiting the process.

```text
new Error("message") = create an error object
throw new Error("message") = stop the current flow and send the error outward
.catch(...) or try/catch = catch and handle the error
console.error(...) = print the error message
process.exit(1) = end the program and tell the system it failed
```

I also learned that JavaScript can technically throw non-standard values, such as strings, numbers, or objects:

```ts
throw "Something went wrong";
throw 123;
throw { message: "Bad input" };
```

But the better practice is to throw a real Error object:

```ts
throw new Error("Something went wrong");
```

A real Error object usually has a message and stack trace, which makes debugging easier.

The expression:

```ts
err instanceof Error ? err.message : err
```

does not print the letters `err`. It checks what is inside the `err` variable. If it is a real Error, it prints the message. Otherwise, it prints the thrown value itself.

### Understanding Input Tolerance

I also learned that the current CLI argument parser is fairly tolerant.

For example, if the important flags and values are correct, extra unknown words may be ignored:

```bash
npm run dev -- add abc haha --company "Apple" xxx --role "Developer" --location "Hamilton" --source "Seek"
```

This can still become:

```ts
{
  company: "Apple",
  role: "Developer",
  location: "Hamilton",
  source: "Seek"
}
```

However, the program will still fail in situations like:

```bash
npm run dev -- add --company --role "Developer" --location "Hamilton"
```

because `--company` does not have a proper value.

It will also fail if the source is not one of the allowed values:

```bash
npm run dev -- add --company "Apple" --role "Developer" --location "Hamilton" --source "Facebook"
```

This helped me understand the difference between a forgiving CLI parser and a stricter professional CLI parser. The current version is acceptable for a simple learning prototype, but a future version could report unknown arguments as errors.

### Week 2 Summary

By the end of this week, I had a much clearer understanding of how the CLI prototype works as a complete program.

The most important things I learned were:

- how terminal commands become `process.argv`
- why `process.argv.slice(2)` keeps only the real user command arguments
- how `parseArgs()` turns flags into a dictionary object
- how `Record<string, string>` represents a flexible string-to-string object
- how `undefined`, empty strings, `??`, and `.trim()` help handle user input safely
- how `main()` controls the add/list flow
- how `applicationService.ts` handles validation and business rules
- how `storage.ts` reads and writes JSON files
- why Node.js type declarations are needed in a TypeScript project
- how `async`, `Promise`, `.catch()`, and `try/catch` relate to each other
- how standard `Error` objects are better than non-standard thrown values
- how errors move through the program when `throw new Error(...)` is used
- how `process.exit(1)` marks the CLI command as failed
- how `randomUUID()` gives each application a unique id
- why separating files by responsibility makes the project easier to understand

This week was important because the project changed from a static TypeScript model into a working CLI prototype. I now understand not only what each line of code does, but also how the functions work together as one complete flow.

### Next Steps
- Continue to Week 3 and extend the CLI prototype with application status updates.
- Reuse the current layered structure instead of putting all logic into `index.ts`.
- Keep `types.ts` as the single source of truth for application status and source values.
- Be careful when adding new CLI commands: parse terminal input in `index.ts`, put business rules in `applicationService.ts`, and keep file reading/writing in `storage.ts`.
- Review whether the current field names such as `jobTitle` and `jobLink` should stay consistent or be aligned with later database/API naming before introducing Prisma.
- Keep documenting real blockers, not only completed tasks, because environment and configuration problems are part of real software development.