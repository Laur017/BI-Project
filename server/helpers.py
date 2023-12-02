import pycountry
from setup import postgres_conn
from prophet import Prophet
from matplotlib import pyplot

def get_sales_evolution_by_total_sales_data():
    data = []
    try:
        QUERY = "SELECT * FROM SALES_EVOLUTION_BASED_ON_TOTAL_SALES"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"genre": record[0], "year": int(record[1]), "sales": int(record[2])} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data

def get_sales_evolution_by_nr_sales_data():
    data = []
    try:
        QUERY = "SELECT * FROM SALES_EVOLUTION_BASED_ON_NR_SALES"
        cursor = postgres_conn.cursor()
        cursor.execute(query=QUERY)
        
        data = cursor.fetchall()
        
        data = [{"genre": record[0], "year": int(record[1]), "nr_sales": int(record[2])} for record in data]
        
    except Exception as e:
        print('error, details: ' + str(e))
    finally:
        cursor.close()
        
    return data


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
        
        data = [{"genre": record[0].replace('/', '').replace(' ', ''), "date": record[1], "total": int(record[2])} for record in data ]
        
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
    
def get_alpha_3_country_code(country_name):
    try:
        country = pycountry.countries.search_fuzzy(country_name)[0]
        return country.alpha_3
    except LookupError:
        return None  
    
    
def sales_media_types_per_country():
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
