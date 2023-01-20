#!/bin/sh

sed -i 's/%NAME%/'$MY_NAME'/' /tasks.json
sed -i 's/%NAME%/'$MY_NAME'/' /users.json

mongoimport --uri mongodb://mongodb:27017/master --collection tasks --type json --file /tasks.json --jsonArray
mongoimport --uri mongodb://mongodb:27017/master --collection users --type json --file /users.json --jsonArray
