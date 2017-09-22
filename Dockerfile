FROM devdocker.mulesoft.com:18078/base/node:6.9-1.5.0-2-ge901d36

# Folder to deploy artifacts
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./artifacts /usr/src/app/

EXPOSE 3001

CMD ["bash", "-c", "PORT=3001 node microservice-template.js"]
