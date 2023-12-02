from fastapi import APIRouter
from setup import postgres_conn
import pandas as pd
import xlsxwriter as excel
from pydantic import BaseModel
from presentation_router import get_sales_data, get_genre_sales_data

PREDICTIVE_ANALYSIS_EXCEL_NAME = 'sales_predictive_analysis.xlsx'

class PredictiveRequest(BaseModel):
    dataset_name: str 
    type_of_predict: str 
    

exports_router = APIRouter()

@exports_router.post('/predictive')
def execute_predictive_analysis(request: PredictiveRequest): 
    #create the excel file
    
    try:
        excel_writer = pd.ExcelWriter(PREDICTIVE_ANALYSIS_EXCEL_NAME, engine='xlsxwriter')

        #create the worksheet
        
        DATA = None 
        
        if request.dataset_name == 'genre':
            DATA = get_genre_sales_data()
        else:
            DATA = get_sales_data()
        
        df = pd.DataFrame(DATA)
        
        df.to_excel(excel_writer, sheet_name='DataAnalysis')
        excel_writer.close()
    
        
    except Exception as e:
        print('errors details: ' + str(e))
        raise e
    
    return DATA