PRODUCT LAYOUT V12

PAGE FILES
- index.html       Trade page (current main page)
- home.html        Home page (replaces Profile)
- history.html     History menu page
- trade-history.html Deeper paginated trade-history table
- payment-history.html Paginated payment/withdrawal records
- finance.html      Finance menu page
- possessions.html  Paginated possessions/account-statement table
- payment-withdrawal.html Pay/request-money choice page

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
rounded glass-island header/footer, and dark card artwork.

NEW REQUIRED HOME ASSETS
- home-page-background.png
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

HOME-ONLY GLASS ISLANDS
The Home header and footer use translucent color plus backdrop blur. Other pages
keep the standard header/footer. Adjust these variables in style.css:
- --home-glass-color
- --home-glass-opacity
- --home-glass-blur
- --home-glass-saturation
- --home-glass-radius
- --home-glass-side-inset

HOME COLORS AND EXPANSION CONTROL
Home card values use --home-card-text (white by default); headings and labels
use --home-card-heading (gold by default). My Info shows V while collapsed and
X while expanded.

V10 CHANGES
- Trade opening card bottom space: --info-card-bottom-margin
- Independent Home logo controls: --home-logo-height, --home-logo-left-offset,
  --home-logo-vertical-offset
- Content-sized table panel: --history-table-min-width and
  --history-table-max-width
- Pagination now lives inside the table background panel
- Translucent vertical separators use --history-table-vertical-line-width and
  --history-table-vertical-line-strength
- Back arrow changes color instead of size
- Account Info has Edit, Cancel, and Submit Change Info Request states
- Gem price text dynamically fits between the configured min/max sizes

USER-CONFIRMED HOME ASSETS
- home-page-background.webp
- home-page-div-background.webp
- xhome-page-div-background.png
- home-page-section-title-background.webp
- home-page-input-background.webp

HOME-ONLY COLORS
Footer navigation is silver by default, black on hover, and gold when active.
The Home announcement is silver. My Info uses silver mask icons that become
white on hover; its title and Home action buttons change from white to gold.

V11 CHANGES
- Account Info is read-only again; editing belongs to expandable My Info
- Home cards and title-image spans use fit-content with viewport limits
- Trade, History, and Finance now have page titles
- Every Buy/Sell opens a calculated confirmation modal
- Confirmation changes to a five-second waiting state and then succeeds
- Payment History now has its own paginated table
- Finance Payment and Withdrawal now opens a two-button choice page

TRADE MODAL
The five-second delay is controlled by body[data-trade-confirm-duration] on
index.html. The current JavaScript is a front-end demonstration; replace the
timeout with a backend transaction request for production.

V12 CHANGES
- Increased configurable spacing inside Home section cards
- Added 2px WebKit scrollbars and Firefox thin scrollbars to Trade pieces
- Added category-style SVG ornaments around every main page title
- Added independent CSS controls for page-title and category ornaments

ORNAMENT VISIBILITY
In style.css :root, use:
--page-title-separator-display: none;  Hide main-title SVGs
--category-separator-display: none;    Hide category SVGs
Change either value back to block to show that ornament group.

HOME INNER SPACING
--home-card-title-gap controls title-to-content space.
--home-info-row-gap controls vertical field spacing.
--home-info-column-gap controls horizontal field spacing.
--home-info-label-value-gap controls the label-to-value gap.
