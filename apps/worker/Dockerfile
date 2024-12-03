FROM node:16-alpine

# Set the build argument for DATABASE_URL
ARG DATABASE_URL

# Set the environment variable inside the container
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]



# FROM node:16-alpine

# WORKDIR /app

# COPY . .

# RUN npm install -g typescript
# RUN npm install
# RUN npm run build

# CMD ["node", "dist/index.js"]