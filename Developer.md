# Developer's Documentation for Eagle Nest
                                                 Developer’s Doc


How to Obtain the Source Code
The Eagle Nest source code is hosted on a public GitHub repository. To obtain the source code, follow these steps:
 
1.         Clone the Repository
-           git clone https://github.com/Sanmeet-EWU/github-teams-project-bid-code-crusaders.git
 
2.         Navigate to the Project Directory
-           cd github-teams-project-bid-code-crusaders         
 
Directory Structure
The directory structure of the project is organized as follows:
 
- .expo: Contains Expo-specific configuration files.
- .github: GitHub-related configurations, such as workflows.
- .idea: IntelliJ IDEA project files.
- .vscode: Visual Studio Code configurations.
-  assets: Contains images and other static assets.
-  node_modules: Directory containing installed Node.js modules.
-  app.js: Main app component.
-  app.json: Application configuration file.
-  babel.config.js: Babel configuration file.
-  Comment.js: Comment component.
-  EditProfile.js: Edit Profile component.
-  FirebaseConfig.ts: Firebase configuration file (TypeScript).
-  Followers.js: Followers component.
-  Following.js: Following component.
-  ForgotPassword.js: Forgot Password component.
-  HomePage.js: Home Page component.
-  Login.js: Login component.
          
 
How to Build the Software
To build the software, follow these steps:
1. Install Dependencies:
   - Yarn install
 
2.  Run Development Server
   - Yarn start
 
3.  Build for Production
   - Yarn build
 
How to Test the Software
We tested our software using the built-in web tester on Expo with real-time updates. Our testing strategy included running sprints by building small pieces of the project, then testing and moving on. Here are the steps we followed:

1. Real-Time Updates with Expo:
   * We utilized Expo's built-in web tester to view real-time updates as we developed the app.
   * This allowed us to immediately see the effects of our code changes and verify functionality.

2. Sprint-Based Development:
   * We adopted an iterative approach by dividing the project into small, manageable sprints.
   * For each sprint, we built a specific feature or component, tested it thoroughly, and resolved any issues before moving on to the next piece.

3. Manual Testing:
   * Each core functionality was manually tested to ensure it met the requirements and worked as expected.

   * This included testing user registration, login, profile management, posting, commenting, and direct messaging.
How to Build a Release of the Software

1. Update Version Number: Before building a release, update the version number in package.json


2. Run Build Command: Execute the build command to create a production-ready build:
    * Yarn build
Sanity Checks: Ensure all affected functionalities are working as expected through manual testing after each release