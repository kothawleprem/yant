import requests
import json
import os
from together import Together

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
VECTARA_API_KEY = os.getenv("VECTARA_API_KEY")
CORPUS_ID = 5
VECTARA_CUSTOMER_ID = os.getenv("VECTARA_CUSTOMER_ID")



def create_index(user_id: int, document_id: int, topic_id: int, text: str):
    url = "https://api.vectara.io/v1/index"
    metaJSON = {
        "user_id": user_id,
        "topic_id": topic_id
    }
    metaJSON_str = json.dumps(metaJSON)

    payload = json.dumps({
        "customerId": VECTARA_CUSTOMER_ID,
        "corpusId": CORPUS_ID,
        "document": {
            "documentId": str(document_id),
            "metadataJson": metaJSON_str,
            "section": [
                {
                    "text": text,
                }
            ]
        }
        })

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': VECTARA_API_KEY
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    print("index_created")


def query_corpus(query, metadataFilter, numResults, semantics):
    url = "https://api.vectara.io/v1/query"
    
    payload = json.dumps({
        "query": [
                    {
                        "query": query,
                        "start": 0,
                        "numResults": numResults,
                        "corpusKey": [
                            {
                                "corpus_id": CORPUS_ID,
                                "customerId": VECTARA_CUSTOMER_ID,
                                "metadataFilter": metadataFilter,
                                "semantics": semantics
                            }
                        ],
                    }
                ]
        })
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': VECTARA_API_KEY
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response


def chat_corpus(query, metadataFilter, numResults, semantics):
    url = "https://api.vectara.io/v1/query"
    
    payload = json.dumps({
        "query": [
                    {
                        "query": query,
                        "start": 0,
                        "numResults": numResults,
                        "corpusKey": [
                            {
                                "corpus_id": CORPUS_ID,
                                "customerId": VECTARA_CUSTOMER_ID,
                                "metadataFilter": metadataFilter,
                                "semantics": semantics
                            }
                        ],
                        "summary": [
                            {
                                "chat": {
                                    "store": True,
                                    "conversationId": ""
                                },
                                "maxSummarizedResults": 5,
                                "responseLang": "eng"
                            }
                        ]
                    }
                ]
        })
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': VECTARA_API_KEY
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response


def rewrite_note(note_content, tone):
    client = Together(api_key=TOGETHER_API_KEY)

    input_ = f"""Given a piece of text content and the desired tone (e.g., formal, casual, creative, simplified), rewrite the content to reflect the specified tone while preserving the original meaning and intent. Adjust the language, style, and tone of the text to match the desired tone, ensuring that the rewritten version maintains coherence and readability. The goal is to produce a rewritten version of the content that effectively conveys the desired tone while retaining the essence of the original message. Only provide the content without any other messages.

        Tone = {tone}
        Content = {note_content}

    """

    response = client.chat.completions.create(
        model="openchat/openchat-3.5-1210",
        messages=[{"role": "user", "content": input_}],
    )
    return (response.choices[0].message.content)
