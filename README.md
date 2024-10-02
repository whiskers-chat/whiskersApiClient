# whiskersApiClient
An API client for meower
## Running tests
Before running tests, create a Dotenv file with a valid username and password, as shown below. Github actions uses the account `whiskersGhAcTestRun` to run tests.
```Dotenv
MEOWERTESTUSER="user"
MEOWERTESTPW="password"
```
After creating this file, you can run tests with the command below.
```Shell
deno run tests
```
