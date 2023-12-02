from fastapi import APIRouter
from constants import PREDICTIVE_ANALYSIS_CHART_OPTIONS
import pandas as pd
from pydantic import BaseModel
from helpers import get_sales_data, get_genre_sales_data
import time

class PredictiveRequest(BaseModel):
    dataset_name: str = 'total'
    type_of_predict: str = 'linear'
    nr_years_to_predict: int = 1
    poly_order: int  = 2

class Criteria(BaseModel):
    field: str 
    sign: str 
    value: int 
    color: str
    
class DescriptiveRequest(BaseModel):
    dataset_name: str = 'total'
    criteria: list[Criteria]
    
    
exports_router = APIRouter()


@exports_router.post('/predictive')
def execute_predictive_analysis(request: PredictiveRequest): 
    """Return predictive analysis in respect to the given request
    """
    #create the excel file
    #TODO: refactor this
    try:
        PREDICTIVE_ANALYSIS_EXCEL_NAME = 'sales_predictive_analysis_' + str(int(time.time()*1000)) + '.xlsx'
        excel_writer = pd.ExcelWriter(PREDICTIVE_ANALYSIS_EXCEL_NAME, engine='xlsxwriter')

        #create the worksheet
        
        DATA = None 
        
        if request.dataset_name == 'genre':
            DATA = get_genre_sales_data()
            
            df = pd.DataFrame(DATA)
            
            df['date'] = pd.to_datetime(df['date'])
            df['date'] = df['date'].dt.date
            
            for genre in df['genre'].unique():
                genre_df = df[df['genre'] == genre]
                genre_df.to_excel(excel_writer, sheet_name=genre, index=False)
                
                nr_records = len(genre_df.index)
                
                workbook = excel_writer.book 
                worksheet = excel_writer.sheets[genre]
                
                
                chart = workbook.add_chart({'type': 'line', 'name': f'Trend {genre}'})
                
                PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict].update(dict({'forward': int(request.nr_years_to_predict) * 365}))
        
            
                if request.type_of_predict == 'poly':
                    PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict].update(dict({'order': request.poly_order}))
                
                print('Type requested', PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict])
                
                chart.add_series({
                    'name': f'Series',
                    'categories':f'={genre}!$B$2:$B${nr_records + 1}',
                    'values': f'={genre}!$C$2:$C${nr_records + 1}',
                    'trendline': PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict]
                })
                
                worksheet.insert_chart('G4', chart)
            
            
        else:
            DATA = get_sales_data()
        
            df = pd.DataFrame(DATA)
            
            df['date'] = pd.to_datetime(df['date'])
            df['date'] = df['date'].dt.date
            
            df.to_excel(excel_writer, sheet_name='DataAnalysis')
            
            nr_records = len(df.index)
            
            workbook = excel_writer.book 
            worksheet = excel_writer.sheets['DataAnalysis']
            
            chart = workbook.add_chart({'type': 'line', 'name': f'Trend {request.type_of_predict}'})
            PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict].update(dict({'forward': int(request.nr_years_to_predict) * 365}))
        
            
            if request.type_of_predict == 'poly':
                PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict].update(dict({'order': request.poly_order}))
            
            print('Type requested', PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict])
            
            chart.add_series({
                'name': f'Series',
                'categories':f'=DataAnalysis!$B$2:$B${nr_records + 1}',
                'values': f'=DataAnalysis!$C$2:$C${nr_records + 1}',
                'trendline': PREDICTIVE_ANALYSIS_CHART_OPTIONS[request.type_of_predict]
            })
            
            worksheet.insert_chart('G4', chart)
            
            
        
        excel_writer.close()
    

    except Exception as e:
        print('errors details: ' + str(e))
        raise e
    
    return DATA


@exports_router.post('/descriptive')
def execute_descriptive_analysis(request: DescriptiveRequest): 
    return request



