npm init -y

npm install express 

node --watch index.js 

npm i -D nodemon


# Peticion Post
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"a": 123, "b": 456}'


  # Peticion Put
  curl -X PUT http://localhost:3000/user \
    -H "Content-Type: application/json" \
    -d '{"a": 789, "b": 101}'

  # Peticion Delete
  curl -X DELETE http://localhost:3000/user

  curl -X DELETE http://localhost:3000/user/123