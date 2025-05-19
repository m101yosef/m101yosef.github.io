---
title: "Olympics performance and Economic status"

authors:
- admin
date: "2024-10-04"
doi: ""
publishDate: "2024-10-07"
share: true
show_related: true
featured: true

publication_types: ["report"]

# Publication name and optional abbreviated publication name.
publication: "Kaggle"


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Designed by Mohamed Yosef'
  focal_point: ""
  preview_only: false

abstract: "When we think about Olympic success, our minds often jump to economic powerhouses like the United States and China. But what happens when we look beyond the raw medal counts? This research dives into a more nuanced question: Which nations are truly punching above their economic weight in the Olympic arena?."

summary: "When we think about Olympic success, our minds often jump to economic powerhouses like the United States and China. But what happens when we look beyond the raw medal counts? This research dives into a more nuanced question: Which nations are truly punching above their economic weight in the Olympic arena?."

tags:
- Data Analytics

links:
- name: "Kaggle"
  url: "https://www.kaggle.com/code/mohamedyosef101/how-economic-status-impact-olympics-performance"
url_pdf: ''
url_code: 'https://github.com/mohamedyosef101/olympics-economics'
url_dataset: 'https://www.kaggle.com/datasets/mohamedyosef101/2024-olympics-medals-and-economic-status'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''
---

## Research Approach
Instead of focusing on the direct correlation between GDP and medal counts, I developed two key metrics to uncover hidden patterns of success:

- **Medals per GDP**: Measuring Olympic efficiency relative to economic resources
- **Medals per Capita**: Evaluating success relative to population size

This approach helps identify countries that excel despite economic constraints, revealing stories of exceptional athletic development programs and national sporting cultures that transcend economic limitations.

  

## Key Findings

  

### Economic Efficiency in Olympic Performance

Most countries seem clustered around lower GDP values (<span style="color: crimson;">below 20,000 USD</span>), suggesting that a large number of countries have lower economic performance, but their medal counts vary widely within this range. While some countries with high GDP (<span style="color: crimson;">above 60,000 USD</span>) still win relatively few medals, suggesting that <span style="background: crimson; color: white; padding: 2px 4px;">wealth alone doesn’t guarantee athletic success</span>.

![GDP vs total medals](images/gdp-total_medals.png)
  

### The Overachievers
Three nations emerged as remarkable performers when considering medals per GDP <span style="color: white; background: crimson; padding: 2px 4px; border-radius: 4px;">(Uzbekistan, Kenya, and North Korea)</span>. These countries demonstrated exceptional efficiency in converting their economic resources into Olympic success, suggesting robust sporting infrastructures and effective talent development systems despite limited financial resources.
![Medals per GDP](images/medals_per_gdp.png)


### Small Nations, Big Impact
When analysing medals per capita, a different group of overachievers emerged <span style="color: white; background: crimson; padding: 2px 4px; border-radius: 4px;">(St Lucia, Dominica, and Grenada)</span>. These small nations showed remarkable efficiency in converting their population into Olympic success, suggesting highly focused and effective sporting programs.

![Medals per capita](images/medals_per_capita.png)

## Research Implications
This analysis challenges conventional wisdom about Olympic success. While economic resources certainly play a role, the data reveals that:
1. **Economic Power ≠ Olympic Success**: Some wealthy nations underperform relative to their GDP
2. **Efficient Resource Usage**: Smaller or less wealthy nations can achieve significant success through focused programs
3. **Population Size Impact**: Small nations can excel when measuring success relative to population

## Future Research Directions
This initial analysis opens several promising avenues for future investigation:
1. Developing predictive models for Olympic success based on economic factors
2. Analysing how investment in sports infrastructure impacts performance
3. Studying the evolution of this GDP-medals relationship across multiple Olympic cycles
  

## Methodology Note
The analysis excluded traditional Olympic powerhouses (USA and China) to focus on patterns among other nations. Data includes GDP per capita, population statistics, and medal counts from the Paris 2024 Olympics, analysed using Python with pandas and seaborn libraries.

## Conclusion
This research demonstrates that Olympic success isn't solely a function of national wealth. Countries can achieve remarkable results through efficient resource utilization, focused sporting programs, and effective talent development systems. The findings suggest that smaller or less wealthy nations can compete effectively on the global stage when success is measured relative to their economic and demographic resources.