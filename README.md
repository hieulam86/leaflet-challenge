# leaflet-challenge

# Module 15 Challenge: Earthquake Data Visualization

![leaflet_challenge](https://github.com/hieulam86/leaflet-challenge/assets/132635473/8d3f113a-d02b-4e67-9063-64ab110c431d)

Background
The United States Geological Survey (USGS) plays a vital role in providing scientific data related to natural hazards, ecosystem health, environmental conditions, and the effects of climate change and land-use practices. USGS scientists are dedicated to developing innovative methods and tools to deliver timely, relevant, and valuable information about Earth and its dynamic processes.

The USGS aims to create effective tools for visualizing their extensive earthquake data, which is collected from around the world daily. This visualization will enable them to better inform the public and other government organizations and potentially secure more funding for addressing critical global challenges.

Part 1: Create the Earthquake Visualization
Basic Map

Get the Dataset

  - The USGS provides earthquake data in a number of different formats, updated every 5 minutes
  - The "All Earthquakes from the Past 7 Days" data set was selected from the USGS GeoJSON Feed page
  - The data was given in JSON format which was used to pull in the data for the visualization

Import and Visualize the Data

  - Employing the Leaflet library, an interactive map has been crafted to pinpoint all the earthquakes in the selected dataset. This is achieved by plotting their longitude and latitude coordinates.
  - To enhance the visualization, data markers have been tailored to represent earthquake magnitude through marker size and earthquake depth through marker color. Larger markers signify higher-magnitude earthquakes, while deeper earthquakes are denoted by darker colors.
  - To offer an immersive experience, each earthquake marker is equipped with a popup feature. When clicked, it presents additional information about the respective earthquake.
  - A legend has been thoughtfully integrated to assist users in interpreting the map data, ensuring that   they can easily grasp the significance of marker sizes and colors.
