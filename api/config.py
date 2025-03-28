from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "GalleryAI API"
    aws_bucket_name: str = "galleryai"
    aws_dynamodb_table: str = "galleryai"
    aws_bucket_url: str = "https://galleryai.s3.amazonaws.com/"
    aws_region: str = "us-east-1"
    model_config = SettingsConfigDict(env_file=".env")
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""