---
icon: pen-to-square
date: 2024-09-24
category:
  - Others
tag:
  - linux
  - fedora
  - smb
---

# Linux Samba setting

要在 Fedora 上設定一個 Samba 共用資料夾，以便外部網路上的電腦可以訪問，可以按照以下步驟進行操作：

## 1. 安裝 Samba

首先，確保你已經安裝了 Samba 軟體包：

```bash
sudo dnf install samba samba-client
```

## 2. 添加 Samba 用戶

```bash
sudo smbpasswd -a guest
```

## 3. 建立共用資料夾

選擇你想要分享的目錄，或建立一個新的目錄。例如：

```bash
sudo mkdir -p /srv/samba/shared
sudo chmod 2775 /srv/samba/shared
sudo chown nobody:nobody /srv/samba/shared

# 根据你的用户 guest 来设置 Samba 共享
# sudo chown -R guest:guest /srv/samba/shared
```

## 4. 設定 SELinux（如果啟用）

要確定你的系統是否啟用了 SELinux，可以使用以下方法：

### 使用 `sestatus` 指令

這是最簡單的方法。打開終端機並執行以下命令：

```bash
sestatus
```

此指令將輸出 SELinux 的狀態資訊。例如：

```plaintext
SELinux status: enabled
SELinuxfs mount: /sys/fs/selinux
SELinux root directory: /etc/selinux
Loaded policy name: targeted
Current mode: enforcing
Mode from config file: enforcing
Policy MLS status: enabled
Policy deny_unknown status: allowed
Max kernel policy version: 31
```

如果 `SELinux status` 顯示為 `enabled`，則表示 SELinux 已啟用。如果顯示為 `disabled`，則表示 SELinux 已停用。

### 進一步操作

如果 SELinux 已啟用且您需要為 Samba 共用設定正確的標籤，請依照下列步驟操作：

1. **設定 SELinux 標籤**：

   ```bash
   sudo chcon -t samba_share_t /srv/samba/shared
   ```

2. **使標籤永久生效**：

   ```bash
   sudo semanage fcontext -a -t samba_share_t "/srv/samba/shared(/.*)?"
   sudo restorecon -R /srv/samba/shared
   ```

3. **配置防火墙**: 允許 Samba 通过 SELinux：

```bash
sudo setsebool -P samba_enable_home_dirs on
sudo setsebool -P samba_export_all_rw on
```

## 5. 編輯 Samba 設定檔

開啟並編輯 `/etc/samba/smb.conf` 檔案：

```bash
sudo nano /etc/samba/smb.conf
```

在文件的末尾添加以下內容來配置你的共享資料夾：

```ini
[shared]
 path = /srv/samba/shared
 browsable = yes
 writable = yes
 guest ok = yes
 create mask = 0664
 directory mask = 2775
```

## 6. 設定防火牆

確保防火牆允許 Samba 流量通過：

```bash
sudo firewall-cmd --permanent --add-service=samba
sudo firewall-cmd --reload
```

## 7. 啟動並啟用 Samba 服務

啟動並啟用 Samba 服務，使其在系統啟動時自動運作：

```bash
sudo systemctl start smb
sudo systemctl enable smb
sudo systemctl start nmb
sudo systemctl enable nmb
```

## 8. 存取共享資料夾

在網路上的其他電腦上，你現在應該可以透過檔案瀏覽器存取共用資料夾。使用以下格式的位址：

```
\\你的Fedora主機IP位址\shared
```

例如，如果你的 Fedora 主機 IP 位址是 `192.168.1.100`，那麼你可以在檔案瀏覽器中輸入：

```
\\192.168.1.100\shared
```

## 範例 `smb.conf` 文件

以下是一個完整的 `smb.conf` 檔案範例：

```ini
#======================= Global Settings ======================== =============

[global]

# Network-Related Options
workgroup = MYGROUP
server string = Samba Server Version %v

# Logging Options
log file = /var/log/samba/log.%m
max log size = 50

# Standalone Server Options
security = user
passdb backend = tdbsam

# Printing Options
load printers = yes
cups options = raw

#============================ Share Definitions ===================== ===========

[homes]
comment = Home Directories
browseable = no
writable = yes

[printers]
comment = All Printers
path = /var/tmp
browseable = no
guest ok = no
writable = no
printable = yes

[shared]
path = /srv/samba/shared
browsable = yes
writable = yes
guest ok = yes
create mask = 0664
directory mask = 2775
```

### 儲存並測試配置

1. 儲存修改後的 `smb.conf` 檔案。
2. 執行 `testparm` 指令來檢查設定檔的語法：

    ```bash
    sudo testparm
    ```

3. 重新啟動 Samba 服務以套用變更：

    ```bash
    sudo systemctl restart smb
    sudo systemctl restart nmb

    # or

    sudo systemctl restart smb nmb
    ```

4. 查看共享列表:使用 smbclient 查看可用共享

    ```bash
    smbclient -L 127.0.0.1 -U guest
    ```

    result:
    ``` 
        Sharename       Type      Comment
        ---------       ----      -------
        print$          Disk      Printer Drivers
        shared          Disk      
        IPC$            IPC       IPC Service (Samba 4.20.5)
        guest           Disk      Home Directories
    SMB1 disabled -- no workgroup available
    ```



## Reference

- [Configuring Samba File Sharing on Fedora 38](https://reintech.io/blog/configuring-samba-file-sharing-fedora-38)
- [設定 windows 共享資料夾](https://hackmd.io/@ult-yu1/r1VHUP1Gp)
- [指定的網路密碼錯誤](https://blog.csdn.net/sandy9919/article/details/89352645)
- [how-to-get-samba-working-on-fedora-37](https://discussion.fedoraproject.org/t/how-to-get-samba-working-on-fedora-37/70804)
- [what-does-nt-status-bad-network-name-mean-in-samba](https://serverfault.com/questions/137135/what-does-nt-status-bad-network-name-mean-in-samba)
