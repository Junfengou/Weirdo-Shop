Dotnet Important Info
-------------
-Important note:
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
