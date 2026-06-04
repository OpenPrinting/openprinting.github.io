import { spawnSync } from "child_process";

const forwardedArgs = process.argv.slice(2);
const skipPpd = forwardedArgs.includes("--skip-ppd");
const steps: Array<[string, string[]]> = [
  ["scripts/foomatic/generate-from-xml.ts", []],
  ["scripts/foomatic/generate-ppds.sh", skipPpd ? ["--skip-ppd"] : []],
  ["scripts/foomatic/combine-data.ts", forwardedArgs],
  ["scripts/foomatic/split-printers.ts", []],
];

for (const [scriptPath, args] of steps) {
  const command = scriptPath.endsWith(".sh") ? "/bin/bash" : "tsx";
  const commandArgs = scriptPath.endsWith(".sh")
    ? [scriptPath, ...args]
    : [scriptPath, ...args];
  const result = spawnSync(command, commandArgs, {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
