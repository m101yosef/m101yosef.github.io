---
title: "Interactive Sales Dashboard with Streamlit"
authors:
- admin
date: "2023-08-08"
doi: ""
publishDate: "2023-08-22"
share: false
show_related: true
featured: false

publication_types: ["report"]

# Publication name and optional abbreviated publication name.
publication: "MohamedYosef101"
publication_short: "MY101"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Designed by Mohamed Yosef'
  focal_point: ""
  preview_only: true

abstract: The growth of supermarkets in most populated cities are increasing and market competitions are also high. In this dashboard we'll give it a try and turn everything into a readable visualizations. Here, I’ll walk through how I built a sales dashboard using Streamlit — a powerful framework in Python for creating web apps for data science and machine learning.

# Summary. An optional shortened abstract.
summary: The growth of supermarkets in most populated cities are increasing and market competitions are also high. In this dashboard we'll give it a try and turn everything into a readable visualizations.

tags:
- Data Analysis
- Streamlit 
- Data Visualization
- Data Science

links:
- name: "Medium"
  url: "https://medium.com/@mohamedyosef101/build-an-interactive-sales-dashboard-with-streamlit-and-python-4f02fe49b470"
url_pdf: ''
url_code: 'https://github.com/mohamedyosef101/Super-Dashboard'
url_dataset: 'https://www.kaggle.com/datasets/aungpyaeap/supermarket-sales'
url_poster: ''
url_project: 'https://super-dashboard.streamlit.app/'
url_slides: ''
url_source: ''
url_video: ''
---


These are some highlights from the project not the whole project.

## 1. Importing the libraries
We’ll need core data analysis libraries like Pandas, NumPy as well as plotting libraries like Plotly Express. Streamlit is imported as st.

```python
import streamlit as st
import pandas as pd
import plotly.express as px
```

<div><br></div>

## 2. Getting Ready
I loaded a supermarket sales CSV file using Pandas, did some preprocessing like setting page config as well as creating the layout variables.

```python
# Load the data
superSales = pd.read_csv('data/superSales.csv')

# Setting page config
st.set_page_config(page_title="Super Store Dashboard",
                   initial_sidebar_state="expanded",
                   )

# the layout Variables
hero = st.container()
topRow = st.container()
midRow = st.container()
chartRow = st.container()
footer = st.container()
```

<div><br></div>

## 3. Editing the sidebar
Sidebars in Streamlit provide an easy way to add filters that users can tweak to update the dashboard.


```python
# Sidebar
with st.sidebar:
    st.markdown(f'''
        <style>
        section[data-testid="stSidebar"] {{
                width: 500px;
                background-color: #000b1a;
                }}
        section[data-testid="stSidebar"] h1 {{
                color: #e3eefc;
                }}
        section[data-testid="stSidebar"] p {{
                color: #ddd;
                text-align: left;
                }}
        section[data-testid="stSidebar"] svg {{
                fill: #ddd;
                }}
        </style>
    ''',unsafe_allow_html=True)
    st.title(":anchor: About the dataset")
    st.markdown("""The growth of supermarkets in most populated cities are increasing and 
    competitions are also high. In this dashboard we'll give it a try and turn everything 
    into a readable visualizations.""")
```

<div><br></div>

## 4. I also added selectbox filters to choose Product Line….

<img width="560" alt="sidebar" src="https://github.com/mohamedyosef101/Super-Dashboard/assets/118842452/79912ea2-6c1a-4ba0-adb6-c36f99d05365">


```python
# The Selectbox
    Product_lines = superSales['Product_line'].unique()
    line = st.selectbox('',['Choose the Product Line'] + list(Product_lines))
    if line == 'Choose the Product Line':
        chosen_line = superSales
    else:
        chosen_line = superSales[superSales['Product_line'] == line]

    # Customizing the select box
    st.markdown(f'''
    <style>
        .stSelectbox div div {{
                background-color: #fafafa;
                color: #333;
        }}
        .stSelectbox div div:hover {{
                cursor: pointer
        }}
        .stSelectbox div div .option {{
                background-color: red;
                color: #111;
        }}
        .stSelectbox div div svg {{
                fill: black;
        }}
    </style>
    ''', unsafe_allow_html=True)
```

<div><br></div>

## 5. The most important part: THE CHART

<img width="560" alt="main chart" src="https://github.com/mohamedyosef101/Super-Dashboard/assets/118842452/3df137ad-b4f0-4af7-8ecc-3464c5ed858f">

```python
with chartRow:
    # Filter for the month
    superSales['Order_date'] = pd.to_datetime(superSales['Order_date'])
    mar_data = (superSales['Order_date'].dt.month == 3)
    lineQuantity = chosen_line[(mar_data)]

    # Quantity for each day
    quantity_per_day = lineQuantity.groupby('Order_date')['Quantity'].sum().reset_index()

    # some space
    st.markdown('<div></div>', unsafe_allow_html=True)
    
    # Create a line chart for Quantity over the last month using Plotly
    fig_quantity = px.line(
        quantity_per_day, 
        x='Order_date', 
        y='Quantity', 
        title='Quantity Sold over the Last Month'
    )
    fig_quantity.update_layout(
        margin_r=100,
    )
    st.plotly_chart(fig_quantity)

```

<div><br></div>

## 6. Deploying the Dashboard
Once ready, I deployed the app using Streamlit sharing which provides free hosting for Streamlit apps!

This allows me to share the interactive dashboard with anyone.

For more about the deployment: https://youtu.be/B0MUXtmSpiA