---
icon: pen-to-square
date: 2024-09-13
category:
  - Other
tag:
  - python
  - docker
---

# Dockekr image Public GPG key error 
apt-get update 

```sh
FROM tensorflow/tensorflow:1.12.0-gpu-py3 as base

RUN apt-get update
RUN apt-get install -y libgl1-mesa-glx
RUN apt-get clean

WORKDIR /app

EXPOSE 8888
```

Throw error like this:

```sh
17.25 W: GPG error: https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64  InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY A4B469963BF863CC 
17.25 E: The repository 'https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64  InRelease' is no longer signed.
------
Dockerfile:13
--------------------
  12 |
  13 | >>> RUN apt-get update
  14 |     RUN apt-get install -y libgl1-mesa-glx
  15 |     RUN apt-get clean
--------------------
ERROR: failed to solve: process "/bin/bash -c apt-get update" did not complete successfully: exit code: 100

```
##  Resolve

dockerfile add below sh:

```sh
RUN \
    # Update nvidia GPG key
    rm /etc/apt/sources.list.d/cuda.list && \
    rm /etc/apt/sources.list.d/nvidia-ml.list && \
    apt-key del 7fa2af80 && \
    apt-get update && apt-get install -y --no-install-recommends wget && \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-keyring_1.0-1_all.deb && \
    dpkg -i cuda-keyring_1.0-1_all.deb && \
    apt-get update

```

##
- [NVIDIA/nvidia-container-toolkit - GPG error "public key is not available" in Ubuntu 20.04 CUDA 11.4.0 image while building](https://github.com/NVIDIA/nvidia-container-toolkit/issues/257)
- [NVIDIA/nvidia-container-toolkit - Public GPG key error#258](https://github.com/NVIDIA/nvidia-container-toolkit/issues/258)
- [NVIDIA - forums(unused)](https://forums.developer.nvidia.com/t/notice-cuda-linux-repository-key-rotation/212772)