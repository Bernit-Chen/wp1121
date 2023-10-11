# Web Programming HW#2
## Run the app

Follow the instructions in this section to run the app locally.

### 1. setup backend `.env`

Start by copying the `.env.example` file to `.env`.

```bash
cd backend
cp .env.example .env
```

Then, fill in the `MONGO_URL` field in `.env` with your MongoDB connection string and fill in the `PORT` field with the port you want to use. After that, you're `.env` file should look like this. If you don't want to use MongoDB Atlas, you can also run a local MongoDB server with Docker. You can find the instructions [here](https://hub.docker.com/_/mongo).

```bash
PORT=8000
MONGO_URL="mongodb+srv://<username>:<password>@<cluster>.example.mongodb.net/?retryWrites=true&w=majority"
```

### 2. setup frontend `.env`

Start by copying the `.env.example` file to `.env`.

```bash
cd frontend
cp .env.example .env
```

Then, fill in the `VITE_API_URL` field in `.env` with the url of your backend server. After that, you're `.env` file should look like this. Note that the port should be the same as the one you set in the backend `.env` file.

```bash
VITE_API_URL="http://localhost:8000/api"
```

### 3. start the backend server

```bash
cd backend
yarn add -D vite
yarn dev
```

### 4. start the frontend server

```bash
cd frontend
yarn add -D vite
yarn dev
```

Visit `http://localhost:5173` to see the app in action. That's it, you're done! If you want to set up the whole project from scratch, you can follow the instructions below.

## eslint and prettier

The setup process is very similar to the one in the [previous project](https://github.com/ntuee-web-programming/112-1-unit1-todo-list). However, please keep in mind that we use different configuration files this time, frontend configuration is also different from that of backend, this may effect your homework grade. The required plugins can be found in `package.json`, if you can't run the linter or formatter, make sure you have all of the plugins installed correctly.

The `lint` script is required in homeworks, please add these lines in your `package.json`.

```json
{
...
  "scripts": {
    "lint": "eslint src",
    "format": "prettier --write src"
  }
...
}
```
### 1. backend linting
```bash
cd backend
yarn
yarn lint
```
### 2. frontend linting
```bash
cd frontend
yarn 
yarn lint
```


## about My HW2

### 除 "作業內容（Pass）" 額外的功能

- 進階要求(Perfect)

1. (完成) **使用者提示**：當使用者未輸入資訊或是進行錯誤操作時，給予適當提示。例如使用者新增或編輯清單時，未輸入標題，以彈窗提示「Please Enter playlist information」。
2. (完成) **重複名稱檢測**：新增播放清單、歌曲時，需檢查資料庫，確定名稱不可重複。
