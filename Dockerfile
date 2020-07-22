FROM nikolaik/python-nodejs:python3.7-nodejs14

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install

RUN pip install -r ./server/requirements.txt

CMD ["npm", "start"]

EXPOSE 3000