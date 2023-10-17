### 1. Create Branches for Each Client
Create separate branches for each client to manage their specific features or changes. Additionally, keep the `main` or `master` branch for common features applicable to both clients.

- **Main Branch:** Common features for both clients.
- **Client1 Branch:** Specific features for Client 1.
- **Client2 Branch:** Specific features for Client 2.

### Commands
Here are the commands that you might find useful:

#### Clone your Repository (If not already done)
```bash
git clone <repository-url>
cd <repository-directory>
```

#### Checkout to Main Branch
Make sure you are on the main branch before creating new branches.
```bash
git checkout main
```

#### Create and Checkout to Client Branches
Create and switch to client-specific branches.
```bash
git checkout -b client1
git checkout -b client2
```

### 2. Develop Features
Develop features on the appropriate branch. For common features, use the `main` branch; for client-specific features, use their respective branches.

### 3. Commit Changes
Commit changes to the appropriate branches.

```bash
git add .
git commit -m "Describe your changes here"
git push origin <branch-name>
```

Replace `<branch-name>` with `main`, `client1`, or `client2` based on where you are committing your changes.

### 4. Merge Changes
When you want to merge changes from the `main` branch into client-specific branches, you can do so to keep them updated with the common features.

```bash
git checkout client1
git merge main
```

Handle merge conflicts if there are any and commit the merge.

### 5. Deliver to Clients
You can now deliver the client-specific branches to the respective clients. If needed, you can also create build or release branches from client-specific branches.

### Important Points
- Always keep your local repository updated with `git pull`.
- Regularly commit and push your changes to avoid losing your work and to allow collaboration with other developers.
- It’s a good practice to pull the latest changes from the main branch and merge them into client branches to keep them updated.

This setup allows you to isolate the development for each client while also being able to manage common features in a centralized manner. Make sure to communicate and collaborate effectively with other team members to avoid conflicts and ensure smooth development.