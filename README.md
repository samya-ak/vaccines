# Vaccines
### Get Started
Start client
- Technologies used: TypeScript, React, Redux, React router
- Note: All environment variables required are in config.ts

```bash
cd client
npm install
npm start
```

Start server
- Technologies used: TypeScript, Express, Nhost
- Note: All environment variables are in file named .env.sample. Please edit it to .env before starting the server.

```bash
cd server
npm install
npm run dev
```
### Requirements
- [x] Create POST /signup endpoint for user signup. The endpoint should take email and
password as payload.
- [x] Create POST /signin endpoint for user signin. The endpoint should take the same
payload as /signup.
- [x] Create a token-based authentication mechanism.
- [x] Create GET /vaccine endpoint to fetch all vaccine
- [x] Create POST /vaccine endpoint to add a new vaccine
- [x] Create PUT /vaccine/{vaccine_id} to update a vaccine
- [x] Create DELETE /patient/{vaccine_id} to delete a vaccine
- [x] All endpoints need to be accessible to only authenticated users.
- [x] You will have to create a user and vaccine table for storing details.
- [x] The mandatory fields for a vaccine are Name, Description, and number of doses. You
can choose all extra fields. (e.g., address, email,...)
- [x] Resize the vaccine image/photograph to a desirable size for a vaccine and upload the
photographs to any free cloud storage service of your choice.
- [x] The application should have a login/signup page
- [x] Show list of vaccines once logged in
- [x] The main vaccine page should only be accessible once authenticated
- [x] Allow users to add a new vaccine
- [x] Allow users to edit existing vaccine detail
- [x] Allow users to delete a vaccine
- [x] Allow users to mark a Mandatory
- [x] The mandatory vaccine should always be listed at the top in alphabetical order.
- [ ] Unit tests
- [x] Database connection abstraction to support more than 1 database connection
- [ ] Capability to add allergies. For example, different allergies to a vaccine.
- [x] Time-bound token authentication. The access token needs to expire after a few minutes,
- [ ] Access Token is regenerated using a refresh token.



