import process from "node:process";
import { readFileSync, appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function releasePlan(eventName, event, packageVersion) {
  const requested = eventName === "release" ? event.release?.tag_name
    : eventName === "push" && event.ref?.startsWith("refs/tags/") ? event.ref.slice("refs/tags/".length)
    : event.inputs?.version;
  const version = (requested ?? "").replace(/^v/, "");
  if (eventName === "release" && !version) throw new Error("A published release must have a version tag");
  if (version && !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version)) {
    throw new Error("Use a Docker-compatible version such as 1.2.3 or 1.2.3-rc.1");
  }
  if (version.split("-").slice(1).join("-").split(".").some((part) => /^0[0-9]+$/.test(part))) throw new Error("Numeric prerelease identifiers cannot have leading zeroes");
  if (version && version !== packageVersion) throw new Error(`Release ${version} does not match package.json ${packageVersion}`);
  const stable = Boolean(version) && !version.includes("-") && !event.release?.prerelease;
  return { version, stable, latest: stable || (!version && eventName === "workflow_dispatch") };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const plan = releasePlan(process.env.GITHUB_EVENT_NAME, event, pkg.version);
  const output = Object.entries(plan).map(([key, value]) => `${key}=${value}`).join("\n") + "\n";
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, output);
  else process.stdout.write(output);
}
