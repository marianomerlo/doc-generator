# Microservice Template

A template to create Microservices in Node using ES6, Express and dependable

## Instructions

1. Clone this repo:

  ```
  git clone <path_to_this_repo> <project_name>
  ```

2. Delete .git directory

  ```
  rm -rf <project_name>/.git
  ```

3. Rename `microservice-template.js` to `<project_name>.js`

  ```
  mv microservice-template.js <project_name>.js
  ```

4. Replace `microservice-template` with `<project_name>` in source files:

  MacOS
  ```
  grep --exclude="*.md" -r -l 'microservice-template' * | xargs sed -i "" 's/microservice-template/<project_name>/g'
  ```

  Linux
  ```
  grep --exclude="*.md" -r -l 'microservice-template' * | xargs sed -i 's/microservice-template/exchange-custom-assets-facade/g'
  ```

5. Replace property `newRelic.appName` in `./config/default.js`:

  ```
  sed -i 's/Microservice Template/New Project Name/' config/default.js
  ```
