FROM mongo:3.6.21

COPY bootstrap.sh /bootstrap.sh

COPY users.json /users.json
COPY tasks.json /tasks.json

CMD sh ./bootstrap.sh