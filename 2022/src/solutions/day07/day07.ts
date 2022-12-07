import { dir } from "console";
import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

type CommandType = "ls" | "cd";

type Command = {
  command: CommandType;
  commandArgs?: string;
  output?: string[];
};

const splitIntoCommands = (input: string[]): Command[] => {
  const commands = [];

  let currCommand: Partial<Command> = {};

  for (let i = 0; i < input.length; i++) {
    const currentLine = input[i];
    if (currentLine.startsWith("$")) {
      if (currCommand.command) {
        commands.push(currCommand);
        currCommand = {};
      }
      const command = currentLine.split(" ");
      currCommand.command = command[1] as CommandType;
      currCommand.commandArgs = command[2];
    } else {
      if (!currCommand.output) {
        currCommand.output = [];
      }

      currCommand.output.push(currentLine);
    }

    if (i === input.length - 1) {
      commands.push(currCommand);
    }
  }

  return commands;
};

const getDirSize = (
  fileSystem: Record<string, string[]>,
  seenFolderSizes: Record<string, number>,
  dirName: string,
  dirContents: string[]
): number => {
  if (seenFolderSizes[dirName]) {
    return seenFolderSizes[dirName];
  }

  const size = dirContents
    .map((item) => {
      const split = item.split(" ");
      if (split[0] === "dir") {
        const [_, dirName] = split;
        return getDirSize(
          fileSystem,
          seenFolderSizes,
          dirName,
          fileSystem[dirName]
        );
      } else {
        return parseInt(split[0]);
      }
    })
    .reduce(sum, 0);

  // console.log(`${dirName} has a size of ${size}`);
  seenFolderSizes[dirName] = size;
  return size;
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const commands = splitIntoCommands(input);
    console.log(commands);

    const fileSystem: Record<string, string[]> = {};

    let currentDir = [];

    commands.forEach(({ command, commandArgs, output }, i) => {
      if (command === "cd") {
        if (commandArgs === "..") {
          currentDir.pop();
        } else {
          currentDir.push(commandArgs);
          if (!fileSystem[commandArgs]) {
            fileSystem[commandArgs] = [];
          }
        }
      }

      if (command === "ls") {
        fileSystem[currentDir[currentDir.length - 1]].push(...output);
      }
    });

    console.log(fileSystem);

    const alreadySeen: Record<string, number> = {};

    return Object.entries(fileSystem)
      .map(([dirName, dirContents]) =>
        getDirSize(fileSystem, alreadySeen, dirName, dirContents)
      )
      .filter((dirSize) => dirSize <= 100000)
      .reduce(sum, 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
