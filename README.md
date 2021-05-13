# Plot.ly Assignment - Belly Button Biodiversity

In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Step 1: Plotly

Horizontal Bar Chart
Used the D3 library to read in samples.json.
Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Used sample_values as the values for the bar chart.
Used otu_ids as the labels for the bar chart.
Used otu_labels as the hovertext for the chart.

![image](https://user-images.githubusercontent.com/75215001/117309408-63358280-ae50-11eb-925b-addf6ae08705.png)

Bubble Chart that Displays Each Sample.

Used otu_ids for the x values.
Used sample_values for the y values.
Used sample_values for the marker size.
Used otu_ids for the marker colors.
Used otu_labels for the text values.

![image](https://user-images.githubusercontent.com/75215001/117309698-aa237800-ae50-11eb-8663-486b8f5c4086.png)

Displayed the sample metadata, i.e., an individual's demographic information.
Displayed each key-value pair from the metadata JSON object somewhere on the page.

![image](https://user-images.githubusercontent.com/75215001/117309815-c58e8300-ae50-11eb-8040-64542dd94941.png)

Update all of the plots any time that a new sample is selected.


References:
Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
