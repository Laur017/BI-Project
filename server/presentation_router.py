# presentation_routers/todos.py
from fastapi import APIRouter
from setup import postgres_conn
import pycountry
import pandas as pd

from prophet import Prophet 
from matplotlib import pyplot


presentation_router = APIRouter()


def get_alpha_3_country_code(country_name):
    try:
        country = pycountry.countries.search_fuzzy(country_name)[0]
        return country.alpha_3
    except LookupError:
        return None
    
    
def get_sales_data():
    data = []
    try:
        QUERY = "SELECT * FROM TOTAL_SALES_PER_DATE"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"date": record[0], "total": int(record[1])} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data

def get_genre_sales_data():
    data = []
    try:
        QUERY = "SELECT * FROM GENRE_SALES_PER_DATE"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"genre": record[0], "date": record[1], "total": int(record[2])} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data



def prophet_prediction(data, nr_of_years_to_predict):
    # prophet dataset preparation

    df = pd.DataFrame(data)
    df = df.rename(columns={"date": "ds", "total": "y"})
    
    # define the model:
    model = Prophet()
    model.fit(df)
    
    future = model.make_future_dataframe(periods = 12 * nr_of_years_to_predict, freq='M')
    
    forecast = model.predict(future)
    
    model.plot(forecast)
    pyplot.show()
    
    # print(df)
    
    # print(forecast.loc[forecast['ds'].dt.year >= 2014])
    forecast=forecast.loc[forecast['ds'].dt.year >= 2014]
    forecast['ds'] = forecast['ds'].dt.date
    
    
    
    forecast = forecast[['ds', 'yhat']] 
    result = forecast[['ds', 'yhat']].values.tolist()

    print(list(zip(result)))
    return [{"date": record[0][0], "total": record[0][1]} for record in zip(result) ]
    
    
    
    


@presentation_router.get("/", response_model=list)
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
@presentation_router.get("/customers-music-associations")
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
@presentation_router.get("/country-musictypes-sales")
async def get_country_music_types_sales_data():
    data = []
    media_types_data = dict()
    
    try:
        QUERY = f"SELECT * FROM COUNTRY_MEDIATYPE_SALES"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        for record in data: 
            if record[1] in media_types_data:
                media_types_data[record[1]]['media_type'] = record[1]
                media_types_data[record[1]]['countries'].append(get_alpha_3_country_code(record[0]))
                media_types_data[record[1]]['sales'].append(record[2])
            else: 
                media_types_data[record[1]] = dict()
                media_types_data[record[1]]['countries']=[get_alpha_3_country_code(record[0])]
                media_types_data[record[1]]['sales']=[record[2]]
             
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return [value for _, value in media_types_data.items()]


# -----  serve point 2 of HW1

# 2.a sales evolution based on quantity sold per each genre
@presentation_router.get("/sales-evolution-based-on-quantities")
async def get_sales_evolution_based_on_quantites_sold_data():
    data = []
    genre_data = dict()
    try:
        QUERY = f"SELECT * FROM SALES_EVOLUTION_BASED_ON_NR_SALES"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        for record in data: 
            if record[0] in genre_data:
                genre_data[record[0]]['genre'] = record[0]
                genre_data[record[0]]['date'].append(record[1])
                genre_data[record[0]]['sales'].append(record[2])
            else: 
                genre_data[record[0]] = dict()
                genre_data[record[0]]['date']=[record[1]]
                genre_data[record[0]]['sales']=[record[2]]
                     
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    
    return [value for _, value in genre_data.items()]


# 2.b sales evolution based on total money got per each genre
@presentation_router.get("/sales-evolution-based-on-totals")
async def get_sales_evolution_based_on_totals_data():
    data = []
    genre_data = dict()
    try:
        QUERY = f"SELECT * FROM SALES_EVOLUTION_BASED_ON_TOTAL_SALES"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        for record in data: 
            if record[0] in genre_data:
                genre_data[record[0]]['genre'] = record[0]
                genre_data[record[0]]['date'].append(record[1])
                genre_data[record[0]]['sales'].append(record[2])
            else: 
                genre_data[record[0]] = dict()
                genre_data[record[0]]['date']=[record[1]]
                genre_data[record[0]]['sales']=[record[2]]
                     
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    
    return [value for _, value in genre_data.items()]


# -----  serve point 3 of HW1

@presentation_router.get("/average-per-mediatype-based-on-past-months")
async def get_average_per_mediatypes_based_on_past_months_data():
    data = []
    media_types_data = dict()
    
    try:
        QUERY = f"SELECT * FROM MEDIA_TYPES_AVG_MONTHS_ALL_YEARS"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        for record in data: 
            if record[0] in media_types_data:
                media_types_data[record[0]]['media_type'] = record[0]
                media_types_data[record[0]]['months'].append(record[1])
                media_types_data[record[0]]['avg'].append(record[2])
            else: 
                media_types_data[record[0]] = dict()
                media_types_data[record[0]]['months']=[record[1]]
                media_types_data[record[0]]['avg']=[record[2]]
             
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return [value for _, value in media_types_data.items()]


@presentation_router.get("/predict-sales-evolution")
async def predict_sales_evolution(nr_years):
    data= get_sales_data()
    return prophet_prediction(data=data, nr_of_years_to_predict=int(nr_years))



@presentation_router.get("/sales-evolution")
async def get_sales_evolution_per_month():
    data= get_sales_data()
    return data




    
