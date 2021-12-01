using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace advent_of_code
{
    class Day03 : Day
    {
        public Day03(string inputFileName, string dayTitle) : base(inputFileName, dayTitle) { }
        public override void CalculateAnswers()
        {
            Point ORIGIN = new Point(0, 0);

            Wire wire1 = new Wire(fileLines[0]);
            Wire wire2 = new Wire(fileLines[1]);

            var intersectionPoints = wire1.GetIntersectionPoints(wire2);

            partOneAnswer = intersectionPoints
                            .Where(s => s != ORIGIN)
                            .Min(x => x.CalculateManhattanDistanceBetweenPoints(ORIGIN))
                            .ToString();

            partTwoAnswer = intersectionPoints
                            .Where(s => s != ORIGIN)
                            .Min(x => wire1.GetNumberOfSteps(x) + wire2.GetNumberOfSteps(x))
                            .ToString();
        }
    }

    struct Point
    {
        private int x { get; set; }
        private int y { get; set;  }

        public Point(int x,int y)
        {
            this.x = x;
            this.y = y;
        }

        public void AddX(int amount)
        {
            x += amount;
        }

        public void AddY(int amount)
        {
            y += amount;
        }

        public override string ToString()
        {
            return $"({x},{y})";
        }

        public int CalculateManhattanDistanceBetweenPoints(Point otherPoint)
        {
            return Math.Abs(x - otherPoint.x) + Math.Abs(y - otherPoint.y);
        }

        public static bool operator ==(Point a, Point b)
        {
            return (a.x == b.x) && (a.y == b.y);
        }

        public static bool operator !=(Point a, Point b)
        {
            return !(a == b);
        }
    }

    class Wire
    {
        Point currentPos;

        List<Point> WirePath { get; }

        public Wire(string inputLine)
        {
            currentPos = new Point(0, 0);

            WirePath = new List<Point>
            {
                currentPos
            };

            foreach (string wire in inputLine.Split(','))
            {
                RecordPath(wire);
            }
        }

        public int GetNumberOfSteps(Point point)
        {
            return WirePath.IndexOf(point);
        }

        public void RecordPath(string inputLine)
        {
            int moveAmount = int.Parse(inputLine[1..]);
            char direction = inputLine[0];

            for (int amountMoved = 0; amountMoved < moveAmount; amountMoved++)
            {
                switch(direction)
                {
                    case 'U':
                        currentPos.AddY(1);
                        break;
                    case 'D':
                        currentPos.AddY(-1);
                        break;
                    case 'R':
                        currentPos.AddX(1);
                        break;
                    case 'L':
                        currentPos.AddX(-1);
                        break;
                    default:
                        throw new InvalidOperationException($"Unknown Direction: {direction}");
                }
                WirePath.Add(currentPos);
            }
        }

        public IEnumerable<Point> GetIntersectionPoints(Wire otherWire)
        {
            return WirePath.Intersect(otherWire.WirePath);
        }
    }

}
