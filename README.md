# careerEx_Camppus_Lost_Item_Search
This is the backend solution for a Campus App for display of misplaced Items
This is done based on the CareerEx Backend assignment
It is uses Node.js and express server.
# Database is hosted on a local machine for now
# API testing
POST /api/items/add/: Add a new found item.

GET /api/items/unclaimed: Get all unclaimed items.

GET /api/items/view/:id: Get a single item by its ID.

PUT /api/items/edit/:id: Update an item’s details or mark it as claimed.

DELETE /api/items/remove/:id: Delete an item.