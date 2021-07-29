## Get Started

1. Clone the code repo and open in your editor (VSCode): https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository
2. Install the project dependancies, run command in terminal: npm i
3. Install the vercel cli: npm i -g vercel
4. Create a dialogflow account and add a new agent: https://dialogflow.cloud.google.com/
5. Create a service account for your agent/bot: https://cloud.google.com/dialogflow/es/docs/quick/setup#sa-create
6. Create a .env file in the root folder to store your secrets
7. Store the service account details to your .env file
e.g.
SERVICE_ACCOUNT_PROJECT_ID=mentality-lpsj
SERVICE_ACCOUNT_EMAIL=mentality-service-account@mentality-lpsj.iam.gserviceaccount.com
SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE ......"
8. Create a vercel account and start the site and api by running: npm run vercel-dev
9. If u want to deploy to vercel. Hook your github repo up to your vercel project and set the same environment variables in your vercel project