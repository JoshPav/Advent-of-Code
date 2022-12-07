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
  seenFolderSizes: Record<string, number>,
  dirContents: string[]
): number => {
  const size = dirContents
    .map((item) => {
      const split = item.split(" ");
      if (split[0] === "dir") {
        const [_, dirName] = split;
        return seenFolderSizes[dirName];
      } else {
        return parseInt(split[0]);
      }
    })
    .reduce(sum, 0);

  // console.log(`${dirName} has a size of ${size}`);
  // seenFolderSizes[dirName] = size;
  return size;
};

const getDirNames = (arr: string[]): string[] => {
  return arr
    .filter((item) => item.startsWith("dir"))
    .map((dir) => dir.split(" ")[1]);
};

type File = {
  name: string;
  size: number;
};

type Folder = {
  [name: string]: File | Folder;
};

const buildFileSystem = (commands: Command[]): Folder => {
  const fileSystem: Folder = {};

  let currentDir: Folder = fileSystem;

  commands.forEach(({ command, commandArgs, output }) => {
    switch (command) {
      case "cd": {
        if (!currentDir[commandArgs]) {
          currentDir[commandArgs] = { "..": currentDir };
        }

        currentDir = currentDir[commandArgs] as Folder;
        break;
      }
      case "ls": {
        output.forEach((dirItem) => {
          const split = dirItem.split(" ");

          if (split[0] === "dir") {
            const dirName = split[1];
            if (!currentDir[dirName]) {
              currentDir[dirName] = { "..": currentDir };
            }
          } else {
            const [fileSize, fileName] = split;
            if (!currentDir[fileName]) {
              currentDir[fileName] = {
                name: fileName,
                size: parseInt(fileSize),
              };
            }
          }
        });
      }
    }
  });

  return fileSystem;
};

function getDirectorySize(dirSizes: number[], folder: Folder): number {
  const filtered = Object.entries(folder).filter(([name]) => name !== "..");

  const mapped = filtered.map(([_, dirItem]) => {
    if (dirItem.size) {
      // Is a file
      return dirItem.size as number;
    }
    return getDirectorySize(dirSizes, dirItem as Folder);
  });

  const summed = mapped.reduce(sum, 0);
  dirSizes.push(summed);
  return summed;
}

export default {
  solvePartOne: (input: string[]): string | number => {
    const commands = splitIntoCommands(input);

    const fileSystem = buildFileSystem(commands);

    const dirSizes = [];

    getDirectorySize(dirSizes, fileSystem);

    const sizeLimit = 100000;
    const sizeLimitApplied = dirSizes.filter((size) => size <= sizeLimit);

    return sizeLimitApplied.reduce(sum, 0);

    // console.log(fileSystem);
    // let currentDir = [];

    // commands.forEach(({ command, commandArgs, output }, i) => {
    //   if (command === "cd") {
    //     if (commandArgs === "..") {
    //       currentDir.pop();
    //     } else {
    //       currentDir.push(commandArgs);
    //       if (!fileSystem[commandArgs]) {
    //         fileSystem[commandArgs] = [];
    //       }
    //     }
    //   }

    //   if (command === "ls") {
    //     fileSystem[currentDir[currentDir.length - 1]].push(...output);
    //   }
    // });

    // console.log(fileSystem);

    // const alreadySeen: Record<string, number> = {};

    // const totalFolders = Object.keys(fileSystem).length;

    // while (Object.keys(alreadySeen).length < totalFolders) {
    //   // console.log(`alreadySeen ${Object.keys(alreadySeen).length}`);
    //   // console.log(`Total ${totalFolders}`);

    //   Object.entries(fileSystem)
    //     .filter(([name]) => !alreadySeen[name])
    //     .forEach(([name, contents]) => {
    //       const subDirectories = getDirNames(contents);

    //       console.log(Object.keys(alreadySeen).length);

    //       if (
    //         subDirectories.length == 0 ||
    //         subDirectories.every((dir) => alreadySeen[dir])
    //       ) {
    //         const size = getDirSize(alreadySeen, contents);
    //         alreadySeen[name] = size;
    //         console.log(`${name}: ${size}`);
    //       }
    //     });
    // }

    // return Object.values(alreadySeen)
    //   .filter((dirSize) => dirSize <= 100000)
    //   .reduce(sum, 0);

    return "";
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
