from functools import lru_cache
from api.config import Settings
from botocore.exceptions import NoCredentialsError
import boto3

@lru_cache
def get_settings():
    return Settings()

def get_bucket_url():
    settings = get_settings()
    return settings.aws_bucket_url

def get_from_s3():
    settings = get_settings()
    s3 = boto3.client('s3', aws_access_key_id=settings.access_key_id, aws_secret_access_key=settings.secret_access_key)
    bucket_name = settings.aws_bucket_name

    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            return [obj['Key'] for obj in response['Contents']]
        else:
            return []
    except NoCredentialsError:
        return {"error": "AWS credentials not available."}
    except Exception as e:
        return {"error": str(e)}

def upload_to_s3(file):
    settings = get_settings()
    s3 = boto3.client('s3', aws_access_key_id=settings.access_key_id, aws_secret_access_key=settings.secret_access_key, region_name=settings.aws_region)
    bucket_name = settings.aws_bucket_name
    try:
        s3.upload_fileobj(file.file, bucket_name, file.filename)
        return {"message": f"File '{file.filename}' uploaded successfully to S3 bucket '{bucket_name}'."}
    except NoCredentialsError:
        return {"error": "AWS credentials not available."}
    except Exception as e:
        return {"error": str(e)}
    
def create_tagset(photo):
    settings = get_settings()
    rekognition = boto3.client('rekognition', aws_access_key_id=settings.access_key_id, aws_secret_access_key=settings.secret_access_key, region_name=settings.aws_region)
    bucket_name = settings.aws_bucket_name
    response = rekognition.detect_labels(
        Image={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': photo
            },
        },
    )
    tag_list = []
    for t in response['Labels']:
        tag_list.append({'Key': t['Name'],
                        'Value': 'True'})
    return tag_list

def save_to_dynamodb(id, data):
    settings = get_settings()    
    dynamodb = boto3.resource('dynamodb', region_name=settings.aws_region)
    table = dynamodb.Table(settings.aws_dynamodb_table)
    table.put_item(Item={'id': id, **data})
    return {'message': 'Item saved successfully'}

def get_all_from_dynamodb():
    settings = get_settings()
    dynamodb = boto3.resource('dynamodb', region_name=settings.aws_region)
    table = dynamodb.Table(settings.aws_dynamodb_table)
    response = table.scan()
    items = response['Items']    
    return items