PRODUCT LAYOUT V6

PAGE FILES
- index.html       Trade page (current main page)
- profile.html     Profile page
- history.html     Trade History page
- accounting.html  Account Statement page

SHARED FILES
- style.css
- app.js

REQUIRED FOOTER SVG FILENAMES
Place these files inside the assets folder:
- profile-icon.svg
- trade-icon.svg
- history-icon.svg
- accounting-icon.svg

The SVG artwork is used as a CSS mask. Use a solid silhouette; its original
SVG fill color does not matter because CSS supplies silver, bronze, or gold.

OTHER REQUIRED IMAGE
- div-tile-background.png

LOADING DURATION
The duration is controlled in each HTML body tag:
<body data-loading-duration="5000">
The value is milliseconds, so 5000 means five seconds.
