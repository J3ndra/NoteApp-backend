FROM node:16.10.0
WORKDIR /home/node/app
EXPOSE 3000
COPY . /home/node/app
RUN npm install
CMD ["npm","start"]