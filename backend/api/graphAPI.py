import requests
import os
import json
from msal import ConfidentialClientApplication

AUTHORITY = f'https://login.microsoftonline.com/{os.environ["TENANT_ID"]}'
SCOPES = ['https://graph.microsoft.com/.default']

GRAPH_API = 'https://graph.microsoft.com/v1.0/'

USER_ID = '88d8184f-c184-4c14-836c-3abbb1c4238f' #rachel.horton@racdev.uk
LOCATION = 'users/' + USER_ID

def connect():
    msal_app = ConfidentialClientApplication(
        client_id = os.environ["APP_ID"],
        client_credential = os.environ["CLIENT_SECRET"],
        authority = AUTHORITY,
    )

    result = msal_app.acquire_token_silent(
        scopes = SCOPES,
        account = None,
    )

    if not result:
        result = msal_app.acquire_token_for_client(scopes=SCOPES)

    if "access_token" in result:
        access_token = result["access_token"]
    else:
        raise Exception("No Access Token found")

    return access_token

def send_file(file_name, content, claim, access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'text/plain',
    }

    response = requests.put(
        url=GRAPH_API + f'{LOCATION}/drive/items/root:/{claim}/{file_name}:/content',
        headers=headers,
        data=content,
    )

    response = response.json()

    return response["id"], response["webUrl"]

def delete_file(item_id, access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    response = requests.delete(
        url=GRAPH_API + f'{LOCATION}/drive/items/{item_id}',
        headers=headers,
    )

    return response

def delete_claim_folder(child_id, access_token):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    response = requests.get(
        url=GRAPH_API + f'{LOCATION}/drive/items/{child_id}',
        headers=headers,
    )

    response = response.json()
    folder_id = response["parentReference"]["id"]

    response = requests.delete(
        url=GRAPH_API + f'{LOCATION}/drive/items/{folder_id}',
        headers=headers,
    )

    print(response)

    return response