# Fur & Feather
<p style="text-align: justify;">
<i>Fur & Feather</i> is a pet adoption and care platform developed as part of a collaborative Software Development Life Cycle (SDLC) internship project by Batch 5/Group 2. The platform connects adopters, shelters, and administrators through a centralized adoption management system.
</p>

## Getting Started
First, set up your local Git repository by following `git_workflow.md` inside `docs\`.<br>
Following that, team-wise instructions are as follows:

### For the back-end team
From the root `fur_and_feather`:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
```

Run the development server:
```bash
python manage.py runserver
```

### For the front-end team
> Front-end setup instructions will be added once the React project is initialized.

## Documentation
All the necessary project documentation is available inside the `docs/` sub-directory.

Current documents and directories:
- `images\` containing all the images used in documentation.
- `erd.md` containing Entity-Relationship Diagrams for all the database models used across the back-end.
- `git_workflow.md` describing the steps to operate with local and remote Git repositories.
- `hld.md` describing the High-Level Design (HLD).
- `project_logs.md` containing a periodic and brief log of contributions made by each member.

Additional/existing documents will be added/updated as development progresses.