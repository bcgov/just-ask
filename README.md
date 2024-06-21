# [Just Ask](https://justask.cloud)
[![Aqua Trivy Vulnerability Scanner](https://github.com/patricksimonian/just-ask/actions/workflows/trivy.yaml/badge.svg)](https://github.com/patricksimonian/just-ask/actions/workflows/trivy.yaml)
[![CodeQL](https://github.com/patricksimonian/just-ask/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/patricksimonian/just-ask/actions/workflows/codeql-analysis.yml)


A management api/interface for organizations to self-serve org membership. 
## Local Development

 Local development is served by a `dev-container`.  Boot it up using VSCODE.

 ### Running API

 > detailed instructions in api README
 1. `cp api/.env.example api/.env` and then fill in details as appropriate
 2. copy config files and configure as needed `cp api/src/config/config.example.json api/src/config/config.json` `cp api/src/config/rolemappers.example.json api/src/config/rolemappers.json`
 3. add your `.pem` file to the project ``cp /api/src/config/github-private-key.pem`
 4. `cd api && npm i`
 5. `npm run dev`


### Running Web
> detailed instruction in web README
1. `cp web/.env.example web/.env` and fill in details as appropriate
2. `cd web && npm i`
3. `npm run start`

### Troubleshooting dev container
**Error:**
```
Error: Cannot find module '/home/node/.vscode-server/data/User/workspaceStorage/a99351aea6a5bd234dcb9a69463ecc7b/ms-vscode.js-debug/bootloader.js'
Require stack:
- internal/preload
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1026:15)
    at Function.Module._load (node:internal/modules/cjs/loader:871:27)
    at internalRequire (node:internal/modules/cjs/loader:169:19)
    at Module._preloadModules (node:internal/modules/cjs/loader:1373:5)
    at loadPreloadModules (node:internal/bootstrap/pre_execution:583:5)
    at prepareMainThreadExecution (node:internal/bootstrap/pre_execution:95:3)
    at node:internal/main/run_main_module:9:1 {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ 'internal/preload' ]
```
**Solution:**

* Toggle "VSCode -> View -> Command Palette -> Debug: Toggle Auto Detach" to Disabled and then Smart

## Docs

Checkout out [justask.cloud](https://justask.cloud) for the app documentation.


## Contributions

Contributions are welcome! The project is extremely young and immature :) 

## Bugs

Please make github issues with any bugs, questions, or concerns

## Credits

I'd like to personally thank the [BC Gov Platform Services' Team](https://bcdevexchange.org/AboutUs) organization for support and granting me the time to develop this tool. Github org membership mamangment is extremely toilous for an organization as large as a government. Thank you for the support!
