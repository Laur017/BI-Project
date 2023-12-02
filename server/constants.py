
PREDICTIVE_ANALYSIS_CHART_OPTIONS = {
    'linear':{
        'type': 'linear', 'display_r_squared': True,
        'display_equation': True, 
         'line':{
             'color': 'red',
             'width': 2,
             'dash_type': 'long_dash'
         }
    },
    'log':{
        'type': 'log', 'display_r_squared': True,
        'display_equation': True,
         'line':{
             'color': 'red',
             'width': 2,
             'dash_type': 'long_dash'
         }
    },
    'polynomial':
        { 'type': 'polynomial',
           'order': 2,
           'display_r_squared': True,
           'display_equation': True,
            'line':{
             'color': 'red',
             'width': 2,
             'dash_type': 'long_dash'
         }
        },
    'exponential':{
         'type': 'exponential',
         'display_r_squared': True, 
         'display_equation': True,
          'line':{
             'color': 'red',
             'width': 2,
             'dash_type': 'long_dash'
         }
    },
    'power':{
         'type': 'power',
         'display_r_squared': True, 
         'display_equation': True,
          'line':{
             'color': 'red',
             'width': 2,
             'dash_type': 'long_dash'
         }
    }   
}
