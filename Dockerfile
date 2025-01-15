# this is the docker file for the **development**
# we will make an image for the project with these directives

# we have to specify the node version first
# node.js base image
FROM node:20-alpine

# we have to put our local files inside the docker's container and we have to specify a destination for those files
# the last / is important because it means that if the container doesn't have that file yet, it will be created
COPY package*.json /app/

# now that we set the files we have to change the directory for docker in order to go and install the dependencies just like we would in a local project
# cd is WORKDIR in docker
WORKDIR /app

# install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# starting the application
# this should be the last command
CMD ["npm", "run", "dev"]

# after this in the terminal we have to run this command to build the image:
# docker build -t next-news-app:1.0 .
# -t => tag
# 1.0 => the version of our project
# . => the path of the Dockerfile
