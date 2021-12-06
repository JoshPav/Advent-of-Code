#! /bin/bash

DAY=$1

MAIN_ROOT="src/main"
TEST_ROOT="src/test"

PACKAGE_ROOT="java/solutions"
TEMPLATE_PATH="${PACKAGE_ROOT}/template/template.txt"

if [[ -z "$DAY" ]]; then
	DAY=$(date +%d)
fi

function createFromTemplate() {
  DIRECTORY=$1
  FILE_NAME=$2
  TEMPLATE_FILE=$3

  TO_CREATE="${DIRECTORY}/${FILE_NAME}.java"

  if [ ! -f ${TO_CREATE} ]; then
      echo "No existing file ${FILE_NAME}, generating new one..."
      mkdir -p "${DIRECTORY}" && cp "${TEMPLATE_FILE}" "${TO_CREATE}" && sed -i "" "s|<DAY>|${DAY}|" "${TO_CREATE}"
      echo "Generated new test file: ${TO_CREATE}"
  else
    echo "Existing file ${FILE_NAME}, ignoring."
  fi

}

# Create solution file
createFromTemplate "${MAIN_ROOT}/${PACKAGE_ROOT}/day${DAY}" "Day${DAY}" "${MAIN_ROOT}/${TEMPLATE_PATH}"

# Create test file
createFromTemplate "${TEST_ROOT}/${PACKAGE_ROOT}/day${DAY}" "Day${DAY}Test" "${TEST_ROOT}/${TEMPLATE_PATH}"
