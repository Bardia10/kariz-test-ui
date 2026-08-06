PRODUCT LAYOUT V6

PAGE FILES
- index.html       Trade page (current main page)
- profile.html     Profile page
- history.html     History menu page
- trade-history.html Deeper paginated trade-history table
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

NEW REQUIRED ASSETS
- ornamental-text-divider.svg
  Must contain a symbol with id="divider-half".
- history-menu-button.png
  Shared image background for Trade History and Payment History buttons.

SHARED TILE UNDERLAY
Panels using div-tile-background.png receive a translucent black background
from --tile-panel-underlay-color and --tile-panel-underlay-strength.
