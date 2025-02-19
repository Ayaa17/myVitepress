---
icon: pen-to-square
date: 2025-02-19
category:
  - Android
tag:
  - android
  - jetpack-compose
---

# Jetpack Compose element

## Spinner

![android-jetpack-compose-spinner](./iamges/android-jetpack-compose-spinner.jpg)

<details>

<summary>sample code</summary>

```kotlin
   @Composable
fun SampleSpinner(
    list: List<Pair<String, String>>,
    preselected: Pair<String, String>,
    onSelectionChanged: (selection: Pair<String, String>) -> Unit
) {

    var selected by remember { mutableStateOf(preselected) }
    var expanded by remember { mutableStateOf(false) } // initial value

    Box {
        Column {
            OutlinedTextField(
                value = (selected.second),
                onValueChange = { },
                label = { Text(text = "My List") },
                modifier = Modifier.fillMaxWidth(),
                trailingIcon = { Icon(Icons.Outlined.ArrowDropDown, null) },
                readOnly = true
            )
            DropdownMenu(
                modifier = Modifier.fillMaxWidth(),
                expanded = expanded,
                onDismissRequest = { expanded = false },
            ) {
                list.forEach { entry ->

                    DropdownMenuItem(
                        modifier = Modifier.fillMaxWidth(),
                        onClick = {
                            selected = entry
                            expanded = false
                        },
                        text = {
                            Text(
                                text = (entry.second),
                                modifier = Modifier
                                    .wrapContentWidth()
                                    .align(Alignment.Start)
                            )
                        }
                    )
                }
            }
        }

        Spacer(
            modifier = Modifier
                .matchParentSize()
                .background(Color.Transparent)
                .padding(10.dp)
                .clickable(
                    onClick = { expanded = !expanded }
                )
        )
    }
}


@Preview(showBackground = true)
@Composable
fun SampleSpinner_Preview() {
    MaterialTheme {

        val entry1 = Pair("Key1", "Entry1")
        val entry2 = Pair("Key2", "Entry2")
        val entry3 = Pair("Key3", "Entry3")

        SampleSpinner(
            listOf(entry1, entry2, entry3),
            preselected = entry2,
            onSelectionChanged = { selected -> /* do something with selected */ }
        )
    }
}
```

</details>

## Reference

- [Android - create Spinner with Compose](https://stackoverflow.com/questions/65632626/android-create-spinner-with-compose)
