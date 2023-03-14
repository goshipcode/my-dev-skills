FROM node:lts-bullseye-slim
COPY . ./
ENV PUBLIC_URL=/
ENV REACT_APP_BACKEND_HOST=http://localhost:8080  # todo change this
ENV REACT_APP_FRONTEND_HOST=http://localhost:3000 # todo change this
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
