
# Name the node stage "builder"
FROM node:16-alpine AS builder
# Set working directory
WORKDIR /usr/app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# copy ngnix configurations
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy static assets from builder stage
COPY --from=builder /usr/app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]