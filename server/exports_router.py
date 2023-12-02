from fastapi import APIRouter
from setup import postgres_conn
import pandas as pd
import xlsxwriter as excel
from pydantic import BaseModel
from presentation_router import get_sales_data, get_genre_sales_data

PREDICTIVE_ANALYSIS_EXCEL_NAME = 'sales_predictive_analysis.xlsx'
predictive_analysis_chart_options = {
    'linear':{
        'type': 'linear', 'display_r_squared': True, 'display_equation': True
    },
    'log':{
        'type': 'log', 'display_r_squared': True, 'display_equation': True
    },
    'poly':
        { 'type': 'polynomial',
           'order': 2,
           'display_r_squared': True,
           'display_equation': True
        },
    'exponential':{
         'type': 'exponential',
         'display_r_squared': True, 
         'display_equation': True
    }
    
}


class PredictiveRequest(BaseModel):
    dataset_name: str = 'total'
    type_of_predict: str = 'linear'
    nr_years_to_predict: int = 1
    poly_order: int  = 2
    

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
        
        nr_records = len(df.index)
        
        workbook = excel_writer.book 
        worksheet = excel_writer.sheets['DataAnalysis']
        
        chart = workbook.add_chart({'type': 'line'})
        predictive_analysis_chart_options[request.type_of_predict].update(dict({'forward': int(request.nr_years_to_predict) * 365}))
       
        
        if request.type_of_predict == 'poly':
            predictive_analysis_chart_options[request.type_of_predict].update(dict({'order': request.poly_order}))
        
        print('Type requested', predictive_analysis_chart_options[request.type_of_predict])
        
        chart.add_series({
            'name': f'Trend {request.type_of_predict}',
            'categories':f'=DataAnalysis!$B$2:$B${nr_records}',
            'values': f'=DataAnalysis!$C$2:$C${nr_records}',
            'trendline': predictive_analysis_chart_options[request.type_of_predict]
        })
        
        worksheet.insert_chart('G4', chart)
        
        
        
        excel_writer.close()
    

    except Exception as e:
        print('errors details: ' + str(e))
        raise e
    
    return DATA