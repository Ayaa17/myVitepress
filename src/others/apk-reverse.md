---
icon: pen-to-square
date: 2024-08-05
category:
  - Others
tag:
  - apk
  - android
---

# APK 反組譯

## Tools

1. **Apktool**

   - **Installation**: [Apktool Installation Guide](https://ibotpeaches.github.io/Apktool/install/)
   - **Note**: Add Apktool to your environment variables.

2. **dex2jar**

   - **Download**: [dex2jar on SourceForge](https://sourceforge.net/projects/dex2jar/files/)

3. **JD-GUI**
   - **Download**: [JD-GUI Website](http://java-decompiler.github.io/)

## Decompilation Process

### Apktool

1. Open a command prompt.
2. Run the following command to decompile the APK:
   ```bash
   apktool d xxx.apk
   ```

This will extract the contents, including smali files.

### dex2jar

1. Rename the APK file extension from .apk to .zip.
1. Extract the contents of the ZIP file.
1. Use 2j-dex2jar.bat to convert the DEX files to JAR:

   ```bash
    d2j-dex2jar.bat xxx.dex
   ```

1. open the file with `jd-gui`

## References

- [CSDN Blog Post on APK Decompilation](https://blog.csdn.net/Soinice/article/details/88087125)
