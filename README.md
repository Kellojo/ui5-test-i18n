# ui5-test-i18n
A small cli that cross checks your ui5 message bundles for missing translations.

![How a failure looks like](https://i.imgur.com/wVaA0p8.png)
![How success looks like](https://i.imgur.com/3HPr8th.png)

## How to use:
Simply run the command from your terminal after installation:
```
ui5-test-i18n ./webapp/
```
The result will be printed to the console.

## Local Development Setup
1. Clone the repository
2. navigate into the root of the repo
3. run `npm link` in the root dir
4. you can now use `ui5-test-i18n` as a command locally
