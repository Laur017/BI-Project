import pycountry
from setup import postgres_conn
from prophet import Prophet
from matplotlib import pyplot

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
    
    
