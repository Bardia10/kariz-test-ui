PRODUCT LAYOUT V9

PAGE FILES
- index.html       Trade page (current main page)
- home.html        Home page (replaces Profile)
- history.html     History menu page
- trade-history.html Deeper paginated trade-history table
- finance.html      Finance menu page
- possessions.html  Paginated possessions/account-statement table

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

DECORATIVE-IMAGE SHADOW UNDERLAY
Almost every shadowed component with a background image should also receive a
translucent base behind that image. PNG artwork often contains transparent
pixels; the base fills those areas so the shadowed component remains visually
solid. The information card, shared placeholder panels, history buttons, and
the trade-history table all use --tile-panel-underlay-color and
--tile-panel-underlay-strength.

The trade-history table also uses div-tile-background.png, matching the opening
information card. Table headings use --history-table-heading-color; table values
use --history-table-text.

FINANCE SECTION
The fourth footer section is now Finance. finance.html contains two buttons:
- Your Possessions / Account Statement -> possessions.html
- Payment and Withdraw -> intentionally inactive

BACK ARROWS
Both deeper tables use a white arrow controlled by --back-button-color. Hover
growth uses --back-button-hover-scale and --back-button-hover-duration.

PAGINATION
trade-history.html and possessions.html both use the shared pagination code in
app.js. Change data-page-size on either table to adjust rows per page.

HOME PAGE
The first footer section is now Home and links to home.html. Home intentionally
omits the decorative frame and content-shadow markup. It uses its own wallpaper,
header, and card artwork.

NEW REQUIRED HOME ASSETS
- home-page-background.png
- home-page-header.png
- home-page-div-background.png

The existing profile.svg footer icon is retained for Home.

HOME CONTENT
- Account Info with username, user ID, status, and membership date
- Expandable My Info using native HTML details/summary
- My Possessions link to possessions.html
- My Payments Info button intentionally inactive
- Contact information and a Google Maps embed matching the displayed address

All personal details and contact values in home.html are sample placeholders.
Replace them with live account data before production use.
