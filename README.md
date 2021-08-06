# Note App (Back-end)

A simple CRUD Note App (Back-end) using ExpressJS and MongoDB

## **DOCS**

Base URL = https://note-app-697812.herokuapp.com (Basically the base URL is also a docs)

**Available route:**

***NOTES***

| GET                   | POST                                    | PUT                                     | DELETE         |
| --------------------- | --------------------------------------- | --------------------------------------- | -------------- |
| /api/notes            | /api/notes                              | /api/notes/:id                          | /api/notes/:id |
| **Params**            | **requestBody  [form-data]**            | :id = Note id                           | :id = Note id  |
| q = search by title   | title: text                             | **requestBody  [form-data]**            |
| tags = search by tags | description: text                       | title: text                             |
|                       | image: file                             | description: text                       |
|                       | tags: text (you can input multiple tag) | image: file                             |
|                       |                                         | tags: text (you can input multiple tag) |


***TAGS***

| GET                    | POST                         | PUT                          | DELETE        |
| ---------------------- | ---------------------------- | ---------------------------- | ------------- |
| /api/tags              | /api/tags                    | /api/tags/:id                | /api/tags/:id |
| **Params**             | **requestBody  [form-data]** | :id = Tag id                 | :id = Tag id  |
| q = search by tag name | name: text                   | **requestBody  [form-data]** |
|                        |                              | name: text                   |
