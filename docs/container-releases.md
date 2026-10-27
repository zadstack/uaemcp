# Container releases and company package migration

The maintained container is `ghcr.io/zadstack/uaemcp`. The old personal-account
package has been removed. Update deployment scripts and saved installation
commands to use the company namespace; old personal URLs no longer work.

```sh
docker pull ghcr.io/zadstack/uaemcp:latest
# Pin a numbered release for an explicit upgrade policy:
docker pull ghcr.io/zadstack/uaemcp:1.85.0
```

## Publishing

1. Update the project version and its generated release metadata together.
2. Publish a GitHub Release tagged `v<version>` whose tag matches `package.json`.
3. The container workflow validates source, builds and starts an isolated test
   container, then publishes both `linux/amd64` and `linux/arm64` images.
4. It anonymously pulls the published digest, verifies the company source label,
   and starts the actual published image to check its health endpoint.

Version tag pushes also trigger publication, so existing automated release
workflows do not depend on GitHub emitting another event for a bot-created Release.

Stable releases publish `<version>`, `<major>.<minor>`, `latest`, and a commit
SHA tag. Prereleases publish their full version and SHA tag, without replacing
`latest` or the stable minor alias. Numbered tags identify a release; pin the
reported `sha256` digest when byte-for-byte reproducibility is required.

You can also run the container workflow manually. Leave `version` blank for a
snapshot (`latest` and SHA), or enter the exact current package version to
publish its numbered tags. A mismatch fails before any image is published.
Main-branch pushes continue to publish only the `edge` and SHA tags.

The workflows use the repository's `GITHUB_TOKEN`; a personal publishing token
is not required. Package and repository visibility are unchanged. Release
publication does not require enabling public package creation for new packages.
