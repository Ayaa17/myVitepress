---
icon: pen-to-square
date: 2025-03-26
category:
  - Others
tag:
  - linux
  - fedora
  - smb
---

# Linux modify smaba sharing settings

## 測試 Samba 設定

```bash
testparm
```

## Samba 共享限制設定

Samba 主要透過 /etc/samba/smb.conf 來設定存取權限。

## 1.打開 Samba 設定檔：

```sh
sudo nano /etc/samba/smb.conf
sudo vi /etc/samba/smb.conf

```

在 [global] 區塊或 [共享資料夾名稱] 區塊內加入或修改以下參數：

📌 限制特定使用者或群組存取

```
[shared]
   path = /home/user/shared
   valid users = user1 user2 @group1  # 只允許 user1、user2 和 group1 存取
   read only = no                      # 允許寫入
```

- valid users = user1 user2 @group1：只允許 user1、user2 和 group1 群組存取
- read only = no：允許寫入（若要唯讀，改為 yes）

📌 設定唯讀或完全拒絕存取

```
[private]
   path = /home/user/private
   valid users = user1  # 只允許 user1
   read only = yes      # 只能讀取，不能修改
```

- read only = yes：只能讀取
- valid users = user1：只有 user1 能存取

📌 限制最大連線數

```
   max connections = 5  # 限制最多 5 個使用者同時連線
```

📌 禁止匿名存取

```
   guest ok = no  # 禁止未登入用戶訪問
```

## 2. 建立 Samba 使用者(Optional)

Samba 需要使用者有 Samba 密碼，執行以下指令：

```bash
sudo smbpasswd -a user1

```

- 這會為 user1 設定 Samba 密碼

## 3. 設定共享資料夾權限(Optional)

確保資料夾擁有正確的權限：

```bash
sudo mkdir -p /home/user/shared
sudo chown -R user1:user1 /home/user/shared  # 指定擁有者
sudo chmod -R 770 /home/user/shared          # 只允許擁有者和群組存取
```

## 4. 重新啟動 Samba 服務
套用新的設定：

```bash
sudo systemctl restart smb
```

再次檢查:
```bash
testparm
```
