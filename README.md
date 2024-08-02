# Swipe-Frontend-Assignment

## Features added to the existing application

* Added a `Browse All Products` button on invoice form which navigates to products tab.
* Products Tab ensuring all associated products are displayed in it.
* User can modify the product on products tab and all the invoices containing the product is updated.
* If a product already used in previous invoices is edited, the updated details reflect both in the 'Products' tab and in all existing invoices where it's used.
* If a product is added to a new invoice with different values than the already stored values, update its details in the products tab and all invoices where it appears.
* validation for any changes made in the products tab. Ensuring the Redux store is updated accordingly to maintain application state consistency.
* Grouping of Products in Invoice Creation based on their purpose for better organization.

## Approach used

* Created a slice named ProductSlice in redux store that maintains products and defined reducers like `addproduct`, `editProduct` and `deleteProduct` to it.
* Created `Products Tab` with interactive UI consisting of back navigation and table.
* User can find `Add Product` button that adds a product to our product state using 'addProduct' reducer.
* In the products table, I have added edit and delete a product buttons which does the product manipulation using corresponding reducers.
* Used these reducers to dynamically change the product information through out the application.
* Created a reducer in invoiceSlice namely `updateExistingInvoices` that changes all the invoices which contains a product that is changed recently.
* Used the 'updateExistingInvoices' reducer at the products tab and invoice form to dynamically update all the invoices whenever a product is changed either in products tab or in invoice form.
* To group the items on invoice, I have added an extra key named 'category' in each product.
* Later used the category in existing `InvoiceModal` where I have segregated the items based on category and updated the table structure in it.

## Deployment

Deployed the application on Vercel - 