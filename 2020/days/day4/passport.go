package days

import (
	"regexp"

	"../../shared"
)

// Passport details
type Passport struct {
	BirthYear      string
	IssueYear      string
	ExpirationYear string
	Height         string
	HairColour     string
	EyeColour      string
	PassportID     string
	CountryID      string
}

// HasRequiredFields checks all required fields are present
func (p *Passport) HasRequiredFields() bool {
	return len(p.BirthYear) > 0 &&
		len(p.IssueYear) > 0 &&
		len(p.ExpirationYear) > 0 &&
		len(p.Height) > 0 &&
		len(p.HairColour) > 0 &&
		len(p.EyeColour) > 0 &&
		len(p.PassportID) > 0
}

// IsValid checks all required fields are present, and that all fields are valid
func (p *Passport) IsValid() bool {
	return p.HasRequiredFields() &&
		p.birthYearValid() &&
		p.issueYearValid() &&
		p.expYearValid() &&
		p.heightValid() &&
		p.hairColourValid() &&
		p.eyeColourValid() &&
		p.passportIDValid()
}

func (p *Passport) birthYearValid() bool {
	return shared.ValidateInRange(p.BirthYear, 1920, 2002)
}

func (p *Passport) issueYearValid() bool {
	return shared.ValidateInRange(p.IssueYear, 2010, 2020)
}

func (p *Passport) expYearValid() bool {
	return shared.ValidateInRange(p.ExpirationYear, 2020, 2030)
}

func (p *Passport) heightValid() bool {

	if height, unit := p.parseHeight(); unit == "in" {
		return shared.ValidateInRange(height, 59, 76)
	} else if unit == "cm" {
		return shared.ValidateInRange(height, 150, 193)
	}
	return false
}

func (p *Passport) hairColourValid() bool {
	return regexp.MustCompile(`#[a-f0-9]{6}`).MatchString(p.HairColour)
}

func (p *Passport) eyeColourValid() bool {
	colours := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}
	for _, colour := range colours {
		if colour == p.EyeColour {
			return true
		}
	}
	return false
}

func (p *Passport) passportIDValid() bool {
	return len(p.PassportID) == 9 &&
		regexp.MustCompile(`[0-9]{9}`).MatchString(p.PassportID)
}

func (p *Passport) parseHeight() (string, string) {
	height := regexp.MustCompile(`([0-9]*)`).FindString(p.Height)
	unit := regexp.MustCompile(`[a-z]{2}`).FindString(p.Height)
	return height, unit
}
