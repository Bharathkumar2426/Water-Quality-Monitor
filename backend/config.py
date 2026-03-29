import os
from dotenv import load_dotenv

# Load environment variables from a .env file (for local development)
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set. Please create a .env file based on .env.example "
        "and set DATABASE_URL to your database connection string."
    )

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY is not set. Please create a .env file based on .env.example "
        "and set SECRET_KEY to a strong, random value."
    )

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
)

#print("DATABASE_URL =", DATABASE_URL)
