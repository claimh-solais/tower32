# tower32

### Usecase

There are scenarios DevOps team want to executes simple bash scripts across multiple machines with specific environment variables. This tool is for simple usecase only. For machine states management and complex orchestrate operations, checkout [Ansible](https://www.ansible.com/) or [Terraform](https://www.terraform.io/) 

### Prerequisite

Minimum nodejs version requirement: >= v12

Install all dependencies
```javascripts
npm install
```

Navigate to browser on port 3000: http://127.0.0.1:3000

### Commands

npm run

| Command               | Description                             |
|:----------------------|:----------------------------------------|
| start                 | server start in production mode         |
| start:dev             | server start in debug mode              |
| build                 | build server all files                  |
| frontend:start        | start dev server                        |
| frontend:build        | build frontend files                    |
| frontend:inspect      | view webpack.config.js file             |
| backend:build         | build api server files                  |
| backend:start         | start api server                        |
| backend:start:dev     | start api dev server                    |
| backend:start:debug   | start api dev server with autoreload    |
| backend:start:prod    | start api production server             |
