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
- profile.svg
- trade.svg
- history.svg
- account-statement.svg

The SVG artwork is used as a CSS mask. Use a solid silhouette. The SVG's own
--icon-size and --icon-color values are intentionally ignored because style.css
must control silver, bronze, and gold navigation states. Adjust icon size with
--footer-nav-icon-size in :root, and adjust state colors with the footer-nav
color variables in :root.

OTHER REQUIRED IMAGE
- div-tile-background.png

LOADING DURATION
The duration is controlled in each HTML body tag:
<body data-loading-duration="5000">
The value is milliseconds, so 5000 means five seconds.
