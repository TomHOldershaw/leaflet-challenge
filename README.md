# leaflet-challenge

This project maps earthquake data, showing the location, magnitude and depth of each recorded earthquake

## Data
Data is sourced from the US Geological Survey, taking [all earthquakes with a magnitude greater than 1.0 for the past month](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson)

## Visualisation
The map is created using Leaflet, with the following characteristics:

1. Colours: a colour scale is defined and the colour for each point set via a function. Colour is dependent on depth of the earthquake
2. Size: based on magnitude. Reflecting the nature of the data being a logarithmic scale, the radius is 10^(magnitude/5). This calculation results in a visualisation representing the power of each earthquake, whilst keeping the size to a reasonable level for the map.
3. Legend: a legend is added showing the colour grading of each earthquake plot
4. Popup: each earthquake has a popup on hover giving the location, magnitude and depth of the recorded earthquake

## Publication
The map is available on [GitHub pages](https://tomholdershaw.github.io/leaflet-challenge/)
