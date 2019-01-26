FROM node:latest

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8080

RUN chmod +x /app/run.sh

CMD ["/app/run.sh"]
