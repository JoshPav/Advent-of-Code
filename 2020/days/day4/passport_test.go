package days

import (
	"testing"
)

func TestHasRequiredFields_Invalid(t *testing.T) {
	passport := &Passport{
		BirthYear:      "foo",
		IssueYear:      "foo",
		ExpirationYear: "foo",
		Height:         "foo",
		HairColour:     "foo",
		EyeColour:      "foo",
	}

	if res := passport.HasRequiredFields(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHasRequiredFields_HasRequired(t *testing.T) {
	passport := &Passport{
		BirthYear:      "foo",
		IssueYear:      "foo",
		ExpirationYear: "foo",
		Height:         "foo",
		HairColour:     "foo",
		EyeColour:      "foo",
		PassportID:     "foo",
	}

	if res := passport.HasRequiredFields(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHasRequiredFields_HasAllValid(t *testing.T) {
	passport := &Passport{
		BirthYear:      "foo",
		IssueYear:      "foo",
		ExpirationYear: "foo",
		Height:         "foo",
		HairColour:     "foo",
		EyeColour:      "foo",
		PassportID:     "foo",
		CountryID:      "foo",
	}

	if res := passport.HasRequiredFields(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestBirthYearValid_NotInt(t *testing.T) {
	passport := &Passport{
		BirthYear: "foo",
	}

	if res := passport.birthYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestBirthYearValid_NotBeforeMin(t *testing.T) {
	passport := &Passport{
		BirthYear: "1919",
	}

	if res := passport.birthYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestBirthYearValid_AfterMax(t *testing.T) {
	passport := &Passport{
		BirthYear: "2003",
	}

	if res := passport.birthYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestBirthYearValid_WithinRange(t *testing.T) {
	passport := &Passport{
		BirthYear: "1995",
	}

	if res := passport.birthYearValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestIssueYearValid_NotInt(t *testing.T) {
	passport := &Passport{
		IssueYear: "foo",
	}

	if res := passport.issueYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestIssueYearValid_NotBeforeMin(t *testing.T) {
	passport := &Passport{
		IssueYear: "2009",
	}

	if res := passport.issueYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestIssueYearValid_AfterMax(t *testing.T) {
	passport := &Passport{
		IssueYear: "2021",
	}

	if res := passport.issueYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestIssueYearValid_WithinRange(t *testing.T) {
	passport := &Passport{
		IssueYear: "2015",
	}

	if res := passport.issueYearValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestExpYearValid_NotInt(t *testing.T) {
	passport := &Passport{
		ExpirationYear: "foo",
	}

	if res := passport.expYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestExpYearValid_NotBeforeMin(t *testing.T) {
	passport := &Passport{
		ExpirationYear: "2019",
	}

	if res := passport.expYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestExpYearValid_AfterMax(t *testing.T) {
	passport := &Passport{
		ExpirationYear: "2031",
	}

	if res := passport.expYearValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestExpYearValid_WithinRange(t *testing.T) {
	passport := &Passport{
		ExpirationYear: "2025",
	}

	if res := passport.expYearValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_invalidValue(t *testing.T) {

	passport := &Passport{
		Height: "fooin",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_invalidUnit(t *testing.T) {

	passport := &Passport{
		Height: "125ft",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_inchesTooShort(t *testing.T) {

	passport := &Passport{
		Height: "58in",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_inchesTooTall(t *testing.T) {

	passport := &Passport{
		Height: "77in",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_inchesValid(t *testing.T) {

	passport := &Passport{
		Height: "65in",
	}

	if res := passport.heightValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_cmTooShort(t *testing.T) {

	passport := &Passport{
		Height: "149cm",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_cmTooTall(t *testing.T) {

	passport := &Passport{
		Height: "194cm",
	}

	if res := passport.heightValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHeightValid_cmValid(t *testing.T) {

	passport := &Passport{
		Height: "160cm",
	}

	if res := passport.heightValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHairColourValid_noHash(t *testing.T) {

	passport := &Passport{
		Height: "aaaaaa",
	}

	if res := passport.hairColourValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHairColourValid_upperCaseLetters(t *testing.T) {

	passport := &Passport{
		Height: "#AAAAAA",
	}

	if res := passport.hairColourValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHairColourValid_tooShort(t *testing.T) {

	passport := &Passport{
		Height: "#aaaaa",
	}

	if res := passport.hairColourValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHairColourValid_tooLong(t *testing.T) {

	passport := &Passport{
		Height: "#aaaaaaa",
	}

	if res := passport.hairColourValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestHairColourValid_valid(t *testing.T) {

	passport := &Passport{
		HairColour: "#abc123",
	}

	if res := passport.hairColourValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestEyeColourValid_notValid(t *testing.T) {
	passport := &Passport{
		EyeColour: "colour",
	}

	if res := passport.eyeColourValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestEyeColourValid_valid(t *testing.T) {

	colours := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}

	for _, colour := range colours {
		passport := &Passport{
			EyeColour: colour,
		}

		if res := passport.eyeColourValid(); !res {
			t.Fatalf("Wrong result: %v", res)
		}
	}

}

func TestPassportIdValid_hasLetters(t *testing.T) {

	passport := &Passport{
		PassportID: "12345678a",
	}

	if res := passport.passportIDValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}

}

func TestPassportIdValid_tooShort(t *testing.T) {

	passport := &Passport{
		PassportID: "12345678",
	}

	if res := passport.passportIDValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}

}

func TestPassportIdValid_tooLong(t *testing.T) {

	passport := &Passport{
		PassportID: "1234567890",
	}

	if res := passport.passportIDValid(); res {
		t.Fatalf("Wrong result: %v", res)
	}

}

func TestPassportIdValid_valid(t *testing.T) {

	passport := &Passport{
		PassportID: "123456789",
	}

	if res := passport.passportIDValid(); !res {
		t.Fatalf("Wrong result: %v", res)
	}

}
