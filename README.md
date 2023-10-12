# 015_aspnetcore_jquery_crud_example

Acceptance criteria of this test project:

Create a simple web application using ASP.Net Core MVC that will ask to enter the user information and save it in Database using AJAX POST.

1. Home Page should have 5 Text Fields for First Name, Last Name, Email Address, Password, Confirm Password and a Button to Submit
2. Button Submit Click - Save the user information in the database. User JQUERY/AJAX to save the user information in the database.
3. Once saved, redirect to Success Page

Important, to migrate Databases Models:
1. Open Nuget's Console
2. Write the following commands:

* Add-Migration 'InitialMigration'
* Update-Database
