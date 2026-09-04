#!/usr/bin/env bash
#
# Redeploy lostcactus.xyz
#
# Builds the Next.js static export locally and syncs it to the server's web
# root. The server intentionally has no Node/npm installed, so all building
# happens here and only plain static files are shipped.
#
# Usage:  ./deploy.sh
# Config: override SSH_KEY / SERVER via environment variables if needed.

set -euo pipefail

SSH_KEY="${SSH_KEY:-$HOME/code/ssh/server-key.key}"
SERVER="${SERVER:-opc@147.5.123.178}"
WEBROOT="/var/www/lostcactus.xyz"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$REPO_ROOT/portfolio"

[ -f "$SSH_KEY" ] || { echo "ERROR: ssh key not found at $SSH_KEY" >&2; exit 1; }

echo "==> Installing dependencies"
cd "$APP_DIR"
npm ci --no-audit --no-fund

echo "==> Building static export"
npm run build

if [ ! -d out ]; then
  echo "ERROR: build produced no out/ directory." >&2
  echo "       Check that next.config.ts still sets output: \"export\"." >&2
  exit 1
fi

echo "==> Uploading $(du -sh out | cut -f1) to $SERVER"
ssh -i "$SSH_KEY" "$SERVER" "sudo rm -rf ${WEBROOT}.new && sudo mkdir -p ${WEBROOT}.new"
tar czf - -C out . | ssh -i "$SSH_KEY" "$SERVER" "sudo tar xzf - -C ${WEBROOT}.new"

echo "==> Swapping into place atomically"
ssh -i "$SSH_KEY" "$SERVER" "sudo bash -s" <<REMOTE
set -e
# root owns the content; caddy can read but never write it
chown -R root:root ${WEBROOT}.new
find ${WEBROOT}.new -type d -exec chmod 755 {} +
find ${WEBROOT}.new -type f -exec chmod 644 {} +

# atomic swap so visitors never see a half-written site
rm -rf ${WEBROOT}.old
[ -d ${WEBROOT} ] && mv ${WEBROOT} ${WEBROOT}.old
mv ${WEBROOT}.new ${WEBROOT}
rm -rf ${WEBROOT}.old

# SELinux is Enforcing; new files need the web content label
restorecon -R ${WEBROOT}
systemctl reload caddy
echo "    deployed: \$(du -sh ${WEBROOT} | cut -f1)"
REMOTE

echo "==> Done -> https://lostcactus.xyz"
