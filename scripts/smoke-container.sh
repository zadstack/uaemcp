#!/usr/bin/env bash
set -euo pipefail
image=${1:?image required}
runtime=${2:?runtime required}
port=${3:?port required}
endpoint=${4:?health endpoint required}
name="container-release-smoke-$$-${RANDOM}"
cleanup() { docker rm -f -v "$name" >/dev/null 2>&1 || true; }
trap cleanup EXIT
# Only localhost is used: no host ports, credentials, or production data.
docker run --pull=never --platform linux/amd64 --network none -d --name "$name" "$image" >/dev/null
for attempt in {1..30}; do
  if docker exec "$name" "$runtime" -e "fetch('http://127.0.0.1:${port}${endpoint}', {signal: AbortSignal.timeout(1500)}).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then
    echo "Container health check passed: $image"
    exit 0
  fi
  sleep 1
done
docker logs "$name"
echo "Container health check failed: $image" >&2
exit 1
