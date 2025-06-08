FROM node:20-alpine AS builder

RUN apk add --no-cache bash curl

RUN bash -c "curl -fsSL https://bun.sh/install | bash"

ENV BUN_INSTALL="/root/.bun"
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

COPY .env ./

RUN bun run build

FROM public.ecr.aws/docker/library/nginx:alpine AS production

WORKDIR /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]