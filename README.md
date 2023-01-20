# Code Challenge

## Getting Started

1. If you haven't those already, please install [Node.js](https://nodejs.org/en/download/), [yarn](https://yarnpkg.com/getting-started) and [Docker](https://docs.docker.com/get-docker/)
1. Git clone the repository to your local development environment and open cloned folder with your preferred IDE
1. Open the `.env` file and add `MY_NAME=your-name-here`, you may replace `your-name-here` with your actual name, make sure this does not include any whitespaces or special characters, an example of a valid value would be `MY_NAME=Sergio`
1. Open the terminal in project root path and run `yarn` in order to install dependencies
1. With your terminal still open, run `docker compose -f "docker-compose.yaml" up -d --build` to bootstrap required infrastructure
1. Run the users project with `yarn start:user` and the tasks project with `yarn start:task`
1. If you ran into issues, you can start debugging with `yarn debug:user` or `yarn debug:task`
1. (Optional) It may be useful to add [NX Console](https://nx.dev/core-features/integrate-with-editors) extension to your IDE 
1. That's it! After first start, the schema will be published and the router will get the changes, you'll be able to trigger your GraphQL API from `http://localhost:4000/graphql`

Make sure to commit regularly following good practices on structuring and message description, this may be something which would help us to understand the final solution. Once you've finished, you can provide us with a link to a private repository of your own.

## Summary of the Challenge

We need to provide a way for users to keep on track with their business processes, thus we need to implement kind of a task management application to help them out with that.

## Requirements

1. Implement following queries and mutations for tasks, using the models provided right below as a reference:

* Queries
    * task
        - May return a Task which matches provided id
        - May return a `NOT_FOUND` error if no task is found by provided id
    * tasks
        - May return a list of [Task]
        - [Bonus] May accept pagination arguments (skip, limit and order) 
        - [Bonus] May accept an object to filter results 

* Mutations
    * createTask
        - May create a Task document, according to provided object
        - May return the created Task
        - The `done` property must always be false at creation
        - The `creator` property must check if incoming user id does actually exist
    * updateTask
        - May do a partial update on Task by provided id
        - May return the updated Task
        - May return a `NOT_FOUND` error if no task is found by provided id
        - It should not be possible to update neither of the following properties: `_id`, `creator`
    * deleteTask
        - May do a hard delete on Task by provided id
        - May return the deleted Task
        - May return a `NOT_FOUND` error if no task is found by provided id

2. [Bonus] Resolve the Task `creator` field in order to return a User instead of an ObjectId
3. [Bonus] Resolve the Task `assigned` field in order to return a list of [User] instead of a list of [ObjectId]
4. [Bonus] Resolve the User `tasks` field in order to return a list of [Task]

## Models
> ℹ️ Glossary of keywords:
> * [] -> Array
> * = -> Default
> * ? -> Optional (otherwise means required)
> * (Bonus) -> Properly resolving these would give you extra points on this challenge

### Data Models

#### Tasks
```
  _id: ObjectId
  name: string
  done: boolean = false
  assigned: ObjectId[] = []
  creator: ObjectId
```

#### Users
```
  _id: ObjectId
  name: string
  email: string
  phone?: string
```
  ### Query Models

  #### Tasks
```
  _id: ObjectId
  name: string
  done: boolean
  assigned: [User] (Bonus)
  creator: User (Bonus)
```
#### Users
```
  _id: ObjectId
  name: string
  email: string
  phone?: string
  tasks: [Task] = [] (Bonus)
```
