# Git Workflow
<p style="text-align: justify;">
This document describes the Git workflow to be followed by all members of the project. Following these guidelines helps prevent merge conflicts, accidental commits, and repository corruption.
</p>

## 1. Repository
The official repository is:

```
https://github.com/F1894125/fur_and_feather
```

Always clone **this repository**.<br>
**Do not fork the repository.**


## 2. Initial Setup
Clone the repository:

```bash
git clone https://github.com/F1894125/fur_and_feather.git
```

Move into the project directory:

```bash
cd fur_and_feather
```

Fetch all remote branches:

```bash
git fetch origin
```


## 3. Branches
Every member has a dedicated development branch. Like:

```
backend/angsh
backend/bedaanntica

frontend/member_name
```

Never work directly on `main`.<br>
The `main` branch in GitHub is write-protected to prevent possibly broken updates or uncoordinated changes to be merged.

Switch to your branch:

```bash
git switch backend/member_name
```

If your branch does not exist yet:

```bash
git switch -c backend/member_name
git push -u origin backend/member_name
```


## 4. Starting New Work
Before starting any work:

```bash
git switch main
git pull origin main

git switch backend/member_name
git merge main
```

This keeps your branch synchronized with the latest project changes and prevents merge conflicts.


## 5. Committing Changes
Check what changed:

```bash
git status
```

Stage files:

```bash
git add .
```

Commit:

```bash
git commit -m "Short description of changes"
```

Push:

```bash
git push
```

You may push as often as you like to back up your work.


## 6. Pull Requests
Create a Pull Request **only when**:

- a meaningful feature is complete,
- a bug has been fixed,
- documentation has been updated.

Do **not** create a Pull Request after every small commit.<br>
It's infeasible to frequently review a PR for minor changes.


## 7. Repository Structure
Always follow the project structure.

```
backend/
```

For back-end source code.

```
frontend/
```

For front-end source code.

```
docs/
```

For project documentation.

```
docs/images/
```

Images used inside documentation.<br>
Do not create new top-level folders unless discussed with the team.


## 8. Files That Must NOT Be Committed
Never commit:

_For the back-end team:_

```
venv/
.env
__pycache__/
*.pyc
db.sqlite3
.idea/
.vscode/
```

> The front-end team is requested to mention here the files that shouldn't be committed.

Also never commit:

- local configuration files
- temporary files
- editor-generated files


## 9. Do NOT Create Another Git Repository
Never run:

```bash
git init
```

inside this project.

Never clone another repository inside this project.<br>
Doing so creates a nested Git repository (Git submodule), which breaks the project structure.<br>
There should only be **one Git repository** for this project.


## 10. Do NOT Fork This Repository
This project uses a shared repository where all added contributors have read/write permissions.<br>
Do **not** click the **Fork** button.<br>
All development should happen inside your assigned branch of the official repository to ensure exclusive ownership of features.


## 11. Before Opening a Pull Request
Verify that:

- [ ] Latest `main` has been merged into your branch.
- [ ] Project builds successfully.
- [ ] Only intended files are committed.
- [ ] Documentation has been updated (if required).
- [ ] Repository structure has been followed.
- [ ] No unnecessary files are included.


## Need Help?
If you encounter merge conflicts or Git-related issues, ask before attempting random fixes. It is easier to prevent repository problems than to recover from them.