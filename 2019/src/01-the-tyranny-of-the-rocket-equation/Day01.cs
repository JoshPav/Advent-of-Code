using System;
using System.Linq;

namespace advent_of_code
{
    class Day01 : Day
    {
        public Day01(string inputPath, string dayTitle) : base(inputPath, dayTitle) { }

        public override void CalculateAnswers()
        {
            partOneAnswer = Array.ConvertAll(fileLines, s => int.Parse(s))
                .Select(mass => mass /3 - 2)
                .Sum().ToString();
            
            partTwoAnswer = Array.ConvertAll(fileLines, s => int.Parse(s))
                .Select(mass => GetFuelRequiredPartTwo(mass))
                .Sum().ToString();
        }

        static int GetFuelRequiredPartTwo(int mass)
        {
            int fuelRequired = mass / 3 - 2;

            return fuelRequired <= 0 ? 0 : fuelRequired + GetFuelRequiredPartTwo(fuelRequired);
        }
    }
}
