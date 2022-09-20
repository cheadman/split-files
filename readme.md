# Split Files

## Description
This was created to split a workload of cypress tests. Finds files in a directory and logs a subset of them based on desired amounts of splits and index.

## Parameters
Accepts a path, a regex, a number of splits and the index wanted.

` split-files <search-path> <regex-pattern> <total-splits> <requested-index>`


## Example Usage

` ./node_modules/split-files/splitFiles.js 'cypress/e2e' '.*\.cy\.js$' 3 2 `

or


`npx split-files 'cypress/e2e' '.*\.cy\.js$' 3 2 `
