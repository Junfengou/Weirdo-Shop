Release Steps
-----------
1. Merge sub-branches into master
2. Make sure the code is working
3. Run database migration against prod
4. Publish the project

Dotnet Important Info
-------------
- Important note:
	- The actual migration is running agains DataContextModelSnapshot.cs 
		- DO NOT JUST REMOVE MIGRATION FILES INDIVIDUALLY
		- use the remove command to remove both the latest migration file and the content in the snapshot
	- Once the migration is removed, just run update database to revert the database back to the original state

Create a migration
	- dotnet ef migrations add [fileName]

Remove a migration (This will remove the latest migration file first)
	- dotnet ef migrations remove

Update database
	- dotnet ef database update

Initial setup
---------------------
1. Create the DataContext file in Data\DataContext
2. Follow the example in this project and define the connection string
3. Double check to make sure the database you're going to create doesn't exist
4. Run -> [dotnet ef migrations add (fileName...[usually for the first migration, name it InitialCreate ])]
5. You'll notice a new folder called migration being created
6. Local DB connection string: "Server=(localdb)\\MSSQLLocalDB;Database=superherodb;Trusted_Connection=true;"
7. Run -> [dotnet ef database update] to trigger a migration process. This will update the database based on your sql scripts

New migrations w/ Entity Framework
------------------
To create a new table
	1. Create a new model
	2. Create a new DbSet<newModel> in the DbContext file
	3. Run -> dotnet ef migrations add [...filename]
	4. Run -> dotnet ef database update

To remove a table
	1. Remove or comment out the table model you're trying to remove. 
		1.1 For example....remove DbSet<newModel> in the DbContext file
	2. Make sure all references to that model has been deleted
	3. Run -> [dotnet ef migrations add (fileName...[name it something like remove_table_name ])]
	4. Run -> dotnet ef database update


After the site has been deployed...
----------
- Typical convention: 
	- Create 2 appsettings files. One for development and one for production
	- Each one of these should have it's own unique connection string

Azure SQL
----------
- Azure Portal -> Azure SQL Database


Sync Database for both development and production via migration
------------
1. Create the migration script
2. Run the migration command against the connection string to local
3. Run the migration command against the connection string to prod