#! /bin/bash

year=$1
day=$2

mainRoot="src/main"
testRoot="src/test"

packageRoot="java/solutions"
templatePath="${packageRoot}/template/template.txt"

if [[ -z "$year" ]]; then
	year=$(date +%Y)
fi

if [[ -z "$day" ]]; then
	day=$(date +%d)
fi

function createFromTemplate() {
  dir=$1
  fileName=$2
  template=$3

  toCreate="${dir}/${fileName}.java"

  if [ ! -f "${toCreate}" ]; then
      echo "No existing file ${fileName}, generating new one..."
      mkdir -p "${dir}" && cp "${template}" "${toCreate}" && sed -i "" "s|<DAY>|${day}|" "${toCreate}"
      echo "Generated new test file: ${toCreate}"
  else
    echo "Existing file ${fileName}, ignoring."
  fi

}

fetchInputForDay () {
  dayNumber=$1
  pathToInput=$2

  inputFile="${pathToInput}/day${dayNumber}.txt"

  if [ ! -f "${inputFile}" ] || [ ! -s "${inputFile}" ]; then
        leadingRemoved=$(echo "${dayNumber}" | sed 's/^0*//')
        echo "No existing input file for day ${leadingRemoved}. Checking for cookie..."
        cookie=$(cat .cookie)
        if [ ! -f "${cookie}" ]; then
            url=https://adventofcode.com/${year}/day/${leadingRemoved}/input
            echo "Cookie found, fetching from ${url}..."
            curl -b "session=${cookie}" "${url}" > "${inputFile}"
            echo "Created file ${inputFile}"
        else
            echo "No cookie found. Please create a .cookie file..."
        fi


    else
      echo "Existing input file, ignoring."
    fi

}

# Create solution file
createFromTemplate "${mainRoot}/${packageRoot}/day${day}" "Day${day}" "${mainRoot}/${templatePath}"

# Create test file
createFromTemplate "${testRoot}/${packageRoot}/day${day}" "Day${day}Test" "${testRoot}/${templatePath}"

# Attempt to fetch file input data
fetchInputForDay "${day}" "${mainRoot}/resources"
