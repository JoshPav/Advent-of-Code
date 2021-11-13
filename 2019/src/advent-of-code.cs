using System;
using System.Collections.Generic;
using System.Text;

namespace advent_of_code
{
    static class adventOfCode2019
    {
        public const int BANNER_SIZE = 60;
        public const char BANNER_CHAR = '-';

        public static string CenterString(string input, int maxLength = BANNER_SIZE)
        {
            return input.Length < maxLength ?
                input.PadLeft(
                    ((maxLength - input.Length) / 2) + input.Length).PadRight(maxLength) 
                : input;
        }

        public static string CenterTwoStrings(string inputOne, string inputTwo, int maxLength = BANNER_SIZE)
        {
            return CenterString(inputOne, maxLength / 2) + CenterString(inputTwo, maxLength / 2);
        }

        static void Main(string[] args)
        {
            string title = "Advent Of Code 2019";

            Console.WriteLine("".PadLeft(BANNER_SIZE, BANNER_CHAR) + "\n");
            Console.WriteLine($"{ CenterString(title, BANNER_SIZE)}\n");
            Console.WriteLine("".PadLeft(BANNER_SIZE, BANNER_CHAR));

            
            new Day01("01","The Tyranny of the Rocket Equation");
            new Day02("02", "1202 Program Alarm");
            new Day03("03", "Crossed Wires");
        }
    }
}
