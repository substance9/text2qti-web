FROM python:3.6.10 

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

CMD ["python3", "server.py"] 

EXPOSE 3001
