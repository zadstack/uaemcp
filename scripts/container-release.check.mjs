import { test } from "node:test";
import assert from "node:assert/strict";
import { releasePlan } from "./container-release.mjs";

test("stable releases get a numbered version and latest", () => {
  assert.deepEqual(releasePlan("release", { release: { tag_name: "v1.2.3" } }, "1.2.3"), { version: "1.2.3", stable: true, latest: true });
});
test("prereleases never replace latest", () => {
  assert.equal(releasePlan("release", { release: { tag_name: "v1.2.3-rc.1", prerelease: true } }, "1.2.3-rc.1").latest, false);
  assert.equal(releasePlan("release", { release: { tag_name: "v1.2.3", prerelease: true } }, "1.2.3").latest, false);
});
test("manual publication validates an optional version", () => {
  assert.equal(releasePlan("workflow_dispatch", { inputs: { version: "1.2.3" } }, "1.2.3").stable, true);
  assert.equal(releasePlan("workflow_dispatch", {}, "1.2.3").latest, true);
});
test("branch updates do not replace latest", () => {
  assert.equal(releasePlan("push", {}, "1.2.3").latest, false);
});
test("mismatched and malformed versions fail before publication", () => {
  assert.throws(() => releasePlan("release", { release: { tag_name: "v9.0.0" } }, "1.2.3"));
  assert.throws(() => releasePlan("release", { release: { tag_name: "v01.2.3" } }, "01.2.3"));
  assert.throws(() => releasePlan("release", { release: {} }, "1.2.3"));
  assert.throws(() => releasePlan("workflow_dispatch", { inputs: { version: "1.2.3+build" } }, "1.2.3+build"));
});

test("version tag pushes work with existing automated release workflows", () => {
  assert.equal(releasePlan("push", { ref: "refs/tags/v1.2.3" }, "1.2.3").latest, true);
  assert.equal(releasePlan("push", { ref: "refs/tags/v1.2.3-rc.1" }, "1.2.3-rc.1").latest, false);
  assert.throws(() => releasePlan("push", { ref: "refs/tags/v9.0.0" }, "1.2.3"));
  assert.throws(() => releasePlan("workflow_dispatch", { inputs: { version: "1.2.3-01" } }, "1.2.3-01"));
});
