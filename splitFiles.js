#!/usr/bin/env node

const fs = require('fs')
const path = require('path');

const args = process.argv.slice(2)
const searchDir = args[0]
const searchPattern = new RegExp(args[1])
const splits = args[2]
const index = args[3]

if (isNaN(index)) {
    console.log('Index must be a number')
    process.exit(1)
}

const findFiles = (dir, pattern) => {
    const files = []
    const dirEntries = fs.readdirSync(dir, { withFileTypes: true })
    for (const dirEntry of dirEntries) {
        const fullPath = path.join(dir, dirEntry.name)
        if (dirEntry.isDirectory()) {
            files.push(...findFiles(fullPath, pattern))
        } else if (dirEntry.isFile() && dirEntry.name.match(pattern)) {
            files.push(fullPath)
        }
    }
    return files
}

const splitFiles = (files, numberOfSplits, wantedIndex) => {
    const splitFiles = []
    for (let i = 0; i < numberOfSplits; i++) {
        splitFiles.push([])
    }
    for (let i = 0; i < files.length; i++) {
        splitFiles[i % numberOfSplits].push(files[i])
    }
    return splitFiles[wantedIndex].join(',')
}

const testFiles = findFiles(searchDir, searchPattern).sort()
console.log(splitFiles(testFiles, splits, index))