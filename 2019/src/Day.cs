using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;

namespace advent_of_code
{
    abstract class Day
    {
        readonly string baseInputPath = @"C:\Users\josh.paveley\workspace\Personal\advent-of-code-2019\problem-inputs\";

        protected string dayNumber;
        protected string dayTitle;

        protected string partOneAnswer;
        protected string partTwoAnswer;

        protected string[] fileLines;

        double timeTakenInMilliSeconds;

        public abstract void CalculateAnswers();

        public Day(string dayNumber, string dayTitle)
        {
            this.dayNumber = dayNumber;
            this.dayTitle = dayTitle;

            ReadFile();

            var watch = Stopwatch.StartNew();
            CalculateAnswers();
            watch.Stop();
            timeTakenInMilliSeconds = watch.ElapsedMilliseconds;

            PrintDaysAnswers();
        }

        private void ReadFile()
        {
            fileLines = System.IO.File.ReadAllLines($"{baseInputPath}{dayNumber}-input.txt");
        }

        private void PrintDaysAnswers()
        {
            Console.WriteLine($"{adventOfCode2019.CenterString($"Day {dayNumber}: {dayTitle}") }\n" + 
                                adventOfCode2019.CenterTwoStrings($"Part One: {partOneAnswer}",
                                                                 $"Part Two: {partTwoAnswer}") + "\n" +
                                adventOfCode2019.CenterTwoStrings($"Time Taken (s): {(timeTakenInMilliSeconds / 1000d):N5}",
                                                                $"Time Taken (ms): {timeTakenInMilliSeconds}") + "\n" +
            "".PadRight(adventOfCode2019.BANNER_SIZE, adventOfCode2019.BANNER_CHAR));
        }

    }
}
