#!/bin/sh
# docker-entrypoint.sh
# Wait for the database by retrying the prisma commands until they succeed.
# This approach avoids needing `nc`/`netcat` and works better inside minimal images.

set -eu

RETRIES=${RETRIES:-30}
SLEEP_SECONDS=${SLEEP_SECONDS:-2}

echo "ENTRYPOINT: NODE_ENV=${NODE_ENV:-development}"

if [ "${NODE_ENV:-development}" = "production" ]; then
  PRISMA_CMD="npx prisma migrate deploy"
  echo "ENTRYPOINT: running production migrations (migrate deploy)"
else
  PRISMA_CMD="npx prisma db push"
  echo "ENTRYPOINT: running development schema sync (db push)"
fi

COUNT=0
until $PRISMA_CMD; do
  COUNT=$((COUNT+1))
  if [ "$COUNT" -ge "$RETRIES" ]; then
    echo "ENTRYPOINT: failed to run '$PRISMA_CMD' after $RETRIES attempts" >&2
    exit 1
  fi
  echo "ENTRYPOINT: attempt $COUNT/$RETRIES failed; retrying in ${SLEEP_SECONDS}s..."
  sleep $SLEEP_SECONDS
done

echo "ENTRYPOINT: prisma schema applied successfully"

echo "ENTRYPOINT: generating Prisma client"

npx prisma generate

echo "ENTRYPOINT: executing provided command"
exec "$@"
