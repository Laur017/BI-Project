# routers/todos.py
from fastapi import APIRouter
from setup import postgres_conn


router = APIRouter()

@router.get("/", response_model=list)
async def get_all_customers():
    data = []
    try:
        QUERY = "SELECT \"CustomerId\", \"City\", \"Country\", \"age\", \"occupation\" FROM \"Customer\""
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"id": record[0], "city": record[1], "country": record[2], "age": record[3], "occupation": record[4]} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data