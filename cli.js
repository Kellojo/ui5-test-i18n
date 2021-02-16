#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const propertiesReader = require("properties-reader");
const { exit } = require("process");



const [,, ...args] = process.argv




/**
 * Finds all .properties fiels in a given directory
 * @param {string} sPath 
 * @private
 */
const findPropertiesFiles = function(sPath) {
    let files = fs.readdirSync(sPath);
    return files.filter( file => file.match(new RegExp(`.*\.(.properties)`, 'ig')));
}

/**
 * Get's a list of all properties in a given .properties file
 * @param {string} sFilePath 
 * @returns {string[]}
 * @private
 * 
 */
const getKeysFromPropertiesFile = function(sFilePath) {
    let aKeys = [];
    propertiesReader(sFilePath).each((sKey, sValue) => {
        aKeys.push(sKey);
    });
    return aKeys;
}

/**
 * Get's a list of all properties in a given .properties file
 * @param {string} sFilePath - the path to the file
 * @param {string[]} aDesiredProperties - the properties the file should have
 * @returns {boolean}
 * @private
 */
const doesFileMissAnyProperties = function(sFilePath, aDesiredProperties) {
    let aFileKeys = getKeysFromPropertiesFile(sFilePath);
    let missesAnyProperties = false;
    let iMissingKeys = 0;


    console.log(chalk.underline(`\nChecking ${sFilePath} for missing properties`));

    aDesiredProperties.forEach(sDesiredKey => {
        if (!aFileKeys.includes(sDesiredKey)) {
            console.log(chalk.redBright(`Property "${sDesiredKey}" does not exist in ${sFilePath}`));

            missesAnyProperties = true;
            iMissingKeys++;
        }
    });

    if (iMissingKeys > 0) {
        console.log(`❌ Found ${iMissingKeys} missing properties`);
    } else {
        console.log(chalk.green(`Found ${iMissingKeys} missing properties, well done!`));
    }


    return missesAnyProperties;
}

const checkForMissingKeys = function(sScanDir) {

    console.log(chalk.bold("Starting ui5-test-i18n"));

    // check that path exists
    if (!fs.existsSync(sScanDir)) {
        console.log(chalk.redBright(`Scan directory ${sScanDir} does not exist`));
        process.exit(1);
    }

    // get all files
    console.log(`Looking for .properties files in ${sScanDir}`);
    const aFiles = findPropertiesFiles(sScanDir);
    console.log(`Found ${aFiles.length} .properties files`);

    // get all keys from file
    var aPorperties = [];
    aFiles.forEach(sFile => {
        const sFilePath = path.join(sScanDir, sFile);
        const aCurrentPorperties = getKeysFromPropertiesFile(sFilePath);
        console.log(`Found ${aCurrentPorperties.length} translations in ${sFile}`);

        // add to collection, is not already present
        aCurrentPorperties.forEach(sKey => {
            if (!aPorperties.includes(sKey)) {
                aPorperties.push(sKey);
            }
        });
    });

    
    // cross check every file for missing key
    let bErrorsFound = false;
    aFiles.forEach(sFile => {
        const sFilePath = path.join(sScanDir, sFile);
        if (doesFileMissAnyProperties(sFilePath, aPorperties)) {
            bErrorsFound = true;
        }
    });

    console.log("");

    process.exit(bErrorsFound ? 1 : 0);
}



checkForMissingKeys(args[0]);