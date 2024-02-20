---
title: Energy Data Analysis and Growth Speed
date: '2024-02-20'
summary: The energy system has transformed dramatically since the Industrial Revolution. We'll see this transformation of the global energy supply in this notebook. It shows global energy consumption from 1983 onwards.
featured: true
share: false
authors: 
  - admin
tags: 
  - Energy
  - Data Analysis
  - Economics
---

[Open in Kaggle](https://www.kaggle.com/code/mohamedyosef101/energy-data-analysis-and-growth-speed)

<div><br></div>

The energy system has transformed dramatically since the Industrial Revolution. We'll see this transformation of the global energy supply in this notebook. It shows global energy consumption from 1983 onwards.

**Data Source:** [Global Energy Substitution from 1983 to 2022](https://www.kaggle.com/datasets/mohamedyosef101/global-energy-substitution-from-1983-to-2022)

![energy 2](https://github.com/mohamedyosef101/energy-substitution/assets/118842452/ffae65d5-2c29-4626-a13c-115897bc8952)


<div><br></div>

# Step 0: set it up

```python
# import the libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# customize the style
pd.options.display.float_format = '{:.5f}'.format
pd.options.display.max_rows = 12

# load the data
filepath = '/kaggle/input/global-energy-substitution-from-1983-to-2022/global-energy-substitution.csv'
df = pd.read_csv(filepath)

df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Year</th>
      <th>Other_renewables</th>
      <th>Biofuels</th>
      <th>Solar</th>
      <th>Wind</th>
      <th>Hydropower</th>
      <th>Nuclear</th>
      <th>Gas</th>
      <th>Oil</th>
      <th>Coal</th>
      <th>Traditional_biomass</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1983</td>
      <td>211.77058</td>
      <td>49.01924</td>
      <td>0.00887</td>
      <td>0.09697</td>
      <td>5552.54250</td>
      <td>2933.45900</td>
      <td>14703.83300</td>
      <td>32956.61300</td>
      <td>22046.34600</td>
      <td>10321</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1984</td>
      <td>236.32065</td>
      <td>57.80642</td>
      <td>0.01866</td>
      <td>0.13234</td>
      <td>5740.62000</td>
      <td>3559.85670</td>
      <td>15902.68000</td>
      <td>33680.13000</td>
      <td>23001.07800</td>
      <td>10430</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1985</td>
      <td>243.15495</td>
      <td>68.41009</td>
      <td>0.03474</td>
      <td>0.18990</td>
      <td>5852.60500</td>
      <td>4224.83740</td>
      <td>16262.22200</td>
      <td>33667.09800</td>
      <td>23987.82600</td>
      <td>10541</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1986</td>
      <td>263.68542</td>
      <td>84.20299</td>
      <td>0.04490</td>
      <td>0.41052</td>
      <td>5931.91260</td>
      <td>4525.08640</td>
      <td>16421.11000</td>
      <td>34712.90200</td>
      <td>24258.03500</td>
      <td>10653</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1987</td>
      <td>282.44330</td>
      <td>85.33012</td>
      <td>0.03135</td>
      <td>0.57773</td>
      <td>6012.11570</td>
      <td>4922.33100</td>
      <td>17281.89500</td>
      <td>35404.36000</td>
      <td>25212.42600</td>
      <td>10765</td>
    </tr>
  </tbody>
</table>
</div>
<div><br></div>


# 1. Renewable Energy over time

Explore the change in Solar, Wind, Hydropower, Biofuels, Tranditional Biomass, and Other Renewables (which may include geothermal, tidal, etc.) over the time.

**Before starting** and because I don't like repeating the code so I'll create a plot fuction to use it with both renwable and non-renewable columns.

```python
# here is the function
def plot_over_years(columns, title):
    for col in columns:
        sns.lineplot(data=df, x='Year', y=col, label=col, marker='o', linestyle='-')

    plt.xlabel('Year')
    plt.ylabel('Value')
    plt.title(title)
    plt.legend()
    plt.show()

# Now, let's use the function
renewable_columns = ['Solar', 'Wind', 'Hydropower', 'Biofuels', 'Traditional_biomass', 'Other_renewables']
plot_over_years(renewable_columns, 'Change in Renewable Energy Sources Over Time')
```

    
![png](output_5_0.png)
    
<div><br></div>
<div style="background: #e3eefc; padding: 24px 12px; color: #00a; margin: 4px 80px 4px 4px; border-radius: 4px;">
<p style="font-weight: bold;">As you can see, traditional biomass is going down not higher like the rest. And this because traditional biomass sources like wood, crop residues, and animal dung have relatively low energy efficiency compared to modern renewable sources like solar panels or wind turbines.</p>
<p style="color: #fc0000; font-weight: bold;">Which means: the more we have access to more efficient and cleaner energy technologies, the less we'll rely on traditional biomass.</p>
</div>
<div><br></div>


# 2. Non-Renewable Energy over time

Now, let's explore the change in Nuclear, Gas, Oil, and Coal over time.

```python
# using the same function but with the non-renewables
non_renewable_columns = ['Coal', 'Gas', 'Nuclear', 'Oil']
plot_over_years(non_renewable_columns, 'Change in Non-Renewable Energy Sources Over Time')
```

    
![png](output_8_0.png)
    
<div><br></div>
<div style="background: #e3eefc; padding: 24px 12px; color: #00a; margin: 4px 80px 4px 4px; border-radius: 4px;">
<p style="font-weight: bold;">You might noticed that everthing is going up but Nuclear energy is relatively stable.</p>
<p style="color: #fc0000; font-weight: bold;">This because Nuclear energy is a reliable baseload energy source (it can generate electricity reliably 24/7), but its growth is limited by safety concerns, cost, and nuclear waste.</p>
</div>
<div><br></div>


# 3. Growth Speed.

I'm going to identify the fastest- and slowest-growing energy sources.

```python
# Calculate annual growth rates for each energy source
for column in df.columns[2:]:  # Start from the third column ('Other_renewables' onward)
    df[f'{column}_GrowthRate'] = df[column].pct_change() * 100

# Group by energy source and calculate the average growth rate
average_growth_rates = df.iloc[:, 11:].mean()  # Columns from the 12th onward

# Sort the energy sources by average growth rate
sorted_energy_sources = average_growth_rates.sort_values(ascending=False)

# Identify the fastest and slowest-growing energy sources
fastest_growing_source = sorted_energy_sources.index[0]
slowest_growing_source = sorted_energy_sources.index[-1]

print(f"Fastest-growing energy source: {fastest_growing_source}")
print(f"Slowest-growing energy source: {slowest_growing_source}")
```

    Fastest-growing energy source: Solar_GrowthRate
    Slowest-growing energy source: Traditional_biomass_GrowthRate

<div><br></div>
<div style="background: #e3eefc; padding: 24px 12px; color: #00a; margin: 4px 80px 4px 4px; border-radius: 4px;">
<p style="font-weight: bold;">We have explained why tradition biomass is going down but why solar energy is growing so fast?</p>
<p style="color: #fc0000; font-weight: bold;">The simple answer is that solar energy's rapid growth is driven by a combination of falling costs, environmental awareness, supportive government policies, and ongoing technological progress.</p>
</div>
<div><br></div>


*The long answer in an article by Energy Concept titled [Why Solar is Growing So Fast](https://energyconceptsfresno.com/why-solar-is-growing-so-fast).*

<div><br></div>


# Next Steps
* **Identify the most and least significant energy sources.** You can do this by calculating the percentage contribution of each energy source to the total energy mix in each year.

* **Identify trends in the energy mix.** For example, you can look at how the relative importance of different energy sources has changed over time. You can also look at how the energy mix has changed in different regions of the world.

* **Identify factors that are driving changes in the energy mix.** For example, you can look at the impact of government policies, technological advancements, and economic conditions.

<div><br></div>