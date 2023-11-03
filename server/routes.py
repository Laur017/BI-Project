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


# -----  serve point 1 of HW1

# 1.a.b
@router.get("/customers-music-associations")
async def get_customer_music_associations_data(lower_age: int=20, upper_age: int=80):
    data = []
    if lower_age > upper_age:
        lower_age,upper_age = upper_age, lower_age
    
    try:
        QUERY = f"SELECT * FROM CUSTOMER_MUSIC_PREFERENCES WHERE \"age\" >= {lower_age}  AND \"age\" <= {upper_age}"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"name": record[0], "age": record[1], "job": record[2], "music_type": record[3]} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data
    
    
    
    
# 1.c.
@router.get("/country-musictypes-sales")
async def get_country_music_types_sales_data():
    pass


# -----  serve point 2 of HW1

# 2.a sales evolution based on quantity sold per each genre
@router.get("/sales-evolution-based-on-quantities")
async def get_sales_evolution_based_on_quantites_sold_data():
    pass


# 2.b sales evolution based on total money got per each genre
@router.get("/sales-evolution-based-on-totals")
async def get_sales_evolution_based_on_totals_data():
    pass


# -----  serve point 3 of HW1

@router.get("/average-per-mediatype-based-on-past-months")
async def get_average_per_mediatypes_based_on_past_months_data():
    pass
