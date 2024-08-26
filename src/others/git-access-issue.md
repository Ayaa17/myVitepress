---
icon: pen-to-square
date: 2024-08-21
category:
  - Others
tag:
  - git
  - github
---
# git access fail

## push時, error如下 
```sh
$ git push -u origin main
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

## 連線測試

```bash
$ ping git@github.com
```

```bash
$ ssh -T git@github.com

ssh: connect to host github.com port 22: Connection timed out
```

## Resolve
在 `~/.ssh/`底下新增`config`

`config`:
```sh
Host github.com
  Hostname ssh.github.com
  Port 443
```

## Reference

- [stackoverflow](https://stackoverflow.com/questions/15589682/how-to-fix-ssh-connect-to-host-github-com-port-22-connection-timed-out-for-g)
- [Tamal/git-ssh-error-fix.sh](https://gist.github.com/Tamal/1cc77f88ef3e900aeae65f0e5e504794)