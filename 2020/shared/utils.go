package shared

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"reflect"
	"strconv"
)

const inputFilePath = "/Users/josh.paveley/workspace/aoc/inputs/day%v.txt"

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getInputPath(day int) string {
	return fmt.Sprintf(inputFilePath, day)
}

func openFileForDay(day int) *os.File {
	file, err := os.Open(getInputPath(day))
	check(err)
	return file
}

func getScannerForDay(day int) *bufio.Scanner {
	return bufio.NewScanner(openFileForDay(day))
}

// ReadLineFromFile - Reads the first line of the file for a given day
func ReadLineFromFile(day int) string {
	return getScannerForDay(day).Text()
}

// ReadStringLines - Reads all lines from the file to a string slice
func ReadStringLines(dayNumber int) []string {
	scanner := getScannerForDay(dayNumber)
	var lines []string
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines
}

// ReadIntLines - Reads all lines from the file to a int slice
func ReadIntLines(dayNumber int) []int {
	return ToIntSlice(ReadStringLines(dayNumber))
}

// ToIntSlice converts a slice of strings to a slice of ints
func ToIntSlice(stringSlice []string) []int {
	var lines []int
	for _, str := range stringSlice {
		converted, _ := strconv.Atoi(str)
		lines = append(lines, converted)
	}
	return lines
}

// ValidateInRange checks a string is between the two numbers
func ValidateInRange(num string, start int, end int) bool {
	parsed, err := strconv.Atoi(num)
	return err == nil && start <= parsed && parsed <= end
}

// SetField sets a field in a interface by reflection
func SetField(v interface{}, name string, value string) error {
	// v must be a pointer to a struct
	rv := reflect.ValueOf(v)
	if rv.Kind() != reflect.Ptr || rv.Elem().Kind() != reflect.Struct {
		return errors.New("v must be pointer to struct")
	}

	// Dereference pointer
	rv = rv.Elem()

	// Lookup field by name
	fv := rv.FieldByName(name)
	if !fv.IsValid() {
		return fmt.Errorf("not a field name: %s", name)
	}

	// Field must be exported
	if !fv.CanSet() {
		return fmt.Errorf("cannot set field %s", name)
	}

	// We expect a string field
	if fv.Kind() != reflect.String {
		return fmt.Errorf("%s is not a string field", name)
	}

	// Set the value
	fv.SetString(value)
	return nil
}

// CreateCopy creates a copy of the slice
func CreateCopy(slice []string) []string {
	sliceCopy := make([]string, len(slice))
	copy(sliceCopy, slice)
	return sliceCopy
}
