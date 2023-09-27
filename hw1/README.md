# Web Programming HW#1

## Run the project

If you only want to run the project, you can follow the steps below.

### 1. Setup MongoDB
  add the following lines in `backend/.env`
  ```bash
  PORT=8000
  MONGO_URL=<your connection string>
  ```

### 2. Install dependencies

```bash
cd backend
yarn
```

### 3. Run the server

```bash
yarn start
```

### 4. Open the frontend

Open `frontend/index.html` by clicking it in your file explorer.

Or if you're on ubuntu, you can run the following command to open it in your browser.

```bash
cd frontend
xdg-open index.html
```

If you're on macOS, you can run the following command to open it in your browser.

```bash
cd frontend
open index.html
```

## about My Diary

### 除 "作業內容（Pass）" 額外的功能

- 進階要求(Perfect)

1. (完成) Filter：請在**首頁**實作 Filter 功能，篩選類別至少包含**學業、人際、社團、快樂、生氣、難過**，Filter 後僅顯示出所選日記卡
2. (完成) 新增日記卡時，可以更改日記卡的日期。更改日期時必須檢查該日期是否為合法日期，若不合法（如：2022.02.30、2023.13.01 等）則無法儲存日記卡。



注意：

若開啟My Dairy後首頁上出現很多undefined 為正常，因為mongoDB中存有其他資料。