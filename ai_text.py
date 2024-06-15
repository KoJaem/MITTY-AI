from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "너에 대해서 설명해줘",
        }
    ],
    model="gpt-4o",
)

result = chat_completion.choices[0].message.content

print(result)