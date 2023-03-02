from dotenv import load_dotenv
import os

load_dotenv()

# DATABASE_URL = os.getenv("MYSQL_CONNECTION")
DATABASE_URL = "mysql+mysqldb://root@127.0.0.1:3306/csgo"