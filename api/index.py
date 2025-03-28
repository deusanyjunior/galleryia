from uuid import uuid4
from fastapi import FastAPI, File, UploadFile, status
from fastapi.responses import RedirectResponse
from api.aws_utils import get_all_from_dynamodb, get_bucket_url, save_to_dynamodb, upload_to_s3, create_tagset, get_from_s3

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/upload")
async def upload(file: UploadFile = File(...)):    
    response = upload_to_s3(file)
    if 'error' in response:
        return {"error": response['error']}
    print(file.filename)
    tagset = create_tagset(file.filename)
    if 'error' in tagset:
        return {"error": tagset['error']}
    id = str(uuid4())
    bucket_url = get_bucket_url()
    tags = []
    for t in tagset:
        tags.append(t['Key'])
    data = {}
    data['name'] = file.filename
    data['url'] = f'{bucket_url}/{file.filename}'
    data['tags'] = tags
    
    save_to_dynamodb(id, data)

    return {"message": f"File '{file.filename}' uploaded successfully."}

@app.get("/api/py/get")
async def get():
    # response = get_from_s3()
    response = get_all_from_dynamodb()
    if 'error' in response:
        return {"error": response['error']}
    print("response", response)
    return {"files": response}