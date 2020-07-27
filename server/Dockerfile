FROM python:3.6.10 

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

WORKDIR /usr/src/app/text2qti
RUN python3 setup.py install

WORKDIR /usr/src/app

CMD ["python3", "server.py"] 

EXPOSE 3001
