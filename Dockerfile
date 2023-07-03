# Starting from a Node.js image.
FROM node:18-alpine

ARG BROWSER=chromium

# Selenium needs a UI to interact with, so we will use xvfb to mock one.
RUN apk add --no-cache xvfb

# Installing the browser.
RUN if [ "$BROWSER" = "firefox" ] ; then apk add --no-cache firefox ; else apk add --no-cache chromium ; fi

# Creating and setting the working directory.
RUN mkdir -p /usr/src/
WORKDIR /usr/src/

# Copying over the package.json file to install dependencies.
COPY package*.json ./
COPY cucumber.js ./
COPY next*.js ./
COPY *.config.js ./
COPY tsconfig.json ./

# Installing app dependencies.
RUN npm install

# Installing selenium-webdriver, the Node.js binding for Selenium.
RUN npm install selenium-webdriver

# Adding a script that will run xvfb, start our app, and run our tests.
RUN if [ "$BROWSER" = "firefox" ] ; then echo 'TEST_BROWSER=firefox' > .env ; else echo 'TEST_BROWSER=chrome' > .env ; fi


# The command that will be run when the container starts.
ENTRYPOINT [ "npm", "run", "dev" ]