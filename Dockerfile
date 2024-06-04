FROM oven/bun:1.1-alpine
WORKDIR /app
COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT [ "bun", "start" ]