# ui5-test-i18n
A small cli that cross checks your ui5 message bundles for missing translations.

![How a failure looks like](https://i.imgur.com/bmWcrKj.png)
![How success looks like](https://i.imgur.com/zGqIlt3.png)

It looks for any .properties fils in the given directory and report any missing properties.

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
