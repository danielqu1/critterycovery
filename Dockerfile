FROM nikolaik/python-nodejs

RUN git clone https://gitlab.com/cs373-group16/critterycovery.git

WORKDIR /critterycovery

RUN git pull --force

RUN cd frontend && yarn install && yarn build

RUN pip3 install -r backend/requirements.txt

EXPOSE 80

CMD python3 backend/api.py