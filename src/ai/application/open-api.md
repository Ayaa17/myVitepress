---
icon: pen-to-square
date: 2024-07-23
category:
  - AI
tag:
  - open-ai
  - nlp
---
# OpenAI api
The OpenAI API provides a simple interface for developers to create an intelligence layer in their applications, powered by OpenAI's state of the art models. The Chat Completions endpoint powers ChatGPT and provides a simple way to take text as input and use a model like GPT-4o to generate an output.

## Install

1. Install python > 3.7.1
1. pip requirement
    - pip install --upgrade openai
    - pip install python-dotenv

## setup
1. create ``.env`` in root
    ``` bash
    #.env
    # Once you add your API key below, make sure to not share it with anyone! The API key should remain private.

    OPENAI_API_KEY=abc123
    ```
1. The API key can be imported by running the code below:
    ``` python
    from dotenv import load_dotenv
    from openai import OpenAI

    load_dotenv()

    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system",
            "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        ]
    )

    print(completion.choices[0].message)
    ```

    will return like:
    ``` python
    ChatCompletionMessage(content='In the realm of code, where logic does dance,  \nThere lies a concept, a charming romance—  \nRecursion, it whispers, a tale of the same,  \nWhere functions call forth, a recursive game.  \n\n**Oh, function dear, take a step in the night,**  \n**For within you lies magic, both wondrous and bright.**  \n**A problem before you, complex and wide,**  \n**But break it in pieces—let smaller ones ride.**  \n\nPicture a mirror, reflecting each face,  \nIn finite dimensions, a looping embrace.  \nWhen faced with a puzzle too vast to unfold,  \nYou summon your function, both daring and bold.  \n\n“With input so slender, solve me, you must,  \nThen call me again, in your wisdom I trust.”  \nIt answers your call, then thus it returns,  \nLike ripples on water, their lesson it learns.  \n\nBase case, the anchor, the end of this tale,  \nWhen conditions are met, it will not derail.  \nBut should you forget, and call forth too deep,  \nA stack overflow waits, in silence it’ll creep.  \n\nSo ponder this beauty, this method so grand,  \nBreaking down problems, like grains in the sand.  \nEach call a new story, each step a new friend,  \nIn the heart of recursion, solutions ascend.  \n\nSo embrace the recursion, let layers unfold,  \nIn the dance of the code, let your algorithms hold.  \nFor sometimes the journey, taken step by step,  \nBrings journey’s end closer, with each careful rep.  ', role='assistant', function_call=None, tool_calls=None)

    ```

## Services
- **Image generation:** Generate images using our DALL·E model [**(link)**](https://platform.openai.com/docs/guides/images)

- **Embeddings:** Create text embeddings [**(link)**](https://platform.openai.com/docs/guides/embeddings)

- **Text-to-speech:** Generate voice with our TTS model [**(link)**](https://platform.openai.com/docs/guides/text-to-speech)

- **Speech-to-text:** Create transcriptions with our Whisper model [**(link)**](https://platform.openai.com/docs/guides/speech-to-text)

- **Moderation:** Moderate text content with our moderation model [**(link)**](https://platform.openai.com/docs/guides/moderation)

- **Fine-tuning:** Fine-tune our models with your own data [**(link)**](https://platform.openai.com/docs/guides/fine-tuning)

- **Batch:** Batch requests for async jobs [**(link)**](https://platform.openai.com/docs/guides/batch)



## Reference
- [open ai docs](https://platform.openai.com/docs/quickstart)