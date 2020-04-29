# --- BUILDER ---
FROM node:14-alpine AS builder

ARG NODE_AUTH_TOKEN

# inject and install dependencies
COPY --chown=1000:0 package.json package-lock.json /app/
WORKDIR /app
COPY .npmrc.ci .npmrc
RUN set -x && npm ci

# --- RUNTIME ---
FROM node:14-alpine

# inject dependencies
COPY --from=builder --chown=1000:0 /app/node_modules /app/node_modules

# inject service logic
COPY --chown=1000:0 package.json /app/package.json
COPY --chown=1000:0 src /app/src
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# switch to a non-root user
USER 1000

# start the micro server on a dynamic port (as required by Heroku)
CMD ["/serve.sh"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", '-f', 'http://localhost:${PORT}' ]
