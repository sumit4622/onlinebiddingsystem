from dotenv import load_dotenv
import os
from pathlib import Path

# Adjusted path — go one level up from Backend/ to onlinebiddingsystem/
env_path = Path(__file__).resolve().parent.parent / '.env'
print(f"Looking for .env at: {env_path}")

load_dotenv(dotenv_path=env_path)

print("EMAIL_HOST:", os.getenv("EMAIL_HOST"))
print("EMAIL_HOST_USER:", os.getenv("EMAIL_HOST_USER"))
print("EMAIL_HOST_PASSWORD:", os.getenv("EMAIL_HOST_PASSWORD"))
