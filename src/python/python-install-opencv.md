---
icon: pen-to-square
date: 2024-09-12
category:
  - Python
tag:
  - python
  - opencv
---

# python install open-cv

when `pip install opencv-python` throw error like this:

```
...
...
Working directory:
      C:\Users\XXXXXX\AppData\Local\Temp\pip-install-kzx3vj4c\opencv-python_c2ee9d023a4a45e584477071884f30ac\_skbuild\win-amd64-3.6\cmake-build
  Please see CMake's output for more information.
  ----------------------------------------
  ERROR: Failed building wheel for opencv-python
Failed to build opencv-python
ERROR: Could not build wheels for opencv-python which use PEP 517 and cannot be installed directly
```

## Solution for py >= 3.7 (windows)

```
pip install --upgrade pip setuptools wheel
pip install opencv-python
```

## Solution for py < 3.7

```
pip install opencv-python==4.5.5.64
```

## Reference

- [stackoverflow - ERROR: Could not build wheels for opencv-python which use PEP 517 and cannot be installed directly](https://stackoverflow.com/questions/63732353/error-could-not-build-wheels-for-opencv-python-which-use-pep-517-and-cannot-be)
