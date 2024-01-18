Home of MiddDash

Helpful commands:

# Prisma
When you modify the database schema, run the migration on the database (to save the changes to the model and db):
```shell
npx prisma migrate dev
```

To view the database models and data:
```shell
npx prisma studio
```

# Git
Making a new branch:
```shell
git checkout -b branchName
```

Staging all changes in all files (execpt those ignored by the .gitignore):
```shell
git add .
```

Committting all the changes with a message:
```shell
git commit -m "message here" 
```

Pushing all your changes to github on your currentBranch
```shell
git push origin branchName
```



