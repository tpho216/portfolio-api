FROM node as build

WORKDIR /app

# copying all the files from your file system to container file system.
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY package.json .
RUN npm install --only=production

COPY --from=build /app/dist ./dist



# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
#RUN apk add openssh \
#     && echo "root:Docker!" | chpasswd

# Copy the sshd_config file to the /etc/ssh/ directory
#COPY sshd_config /etc/ssh/

# Open port 2222 for SSH access
#EXPOSE 2222

#expose the port
EXPOSE 3070
EXPOSE 80

# command to run when intantiate an image
CMD npm run start:prod


