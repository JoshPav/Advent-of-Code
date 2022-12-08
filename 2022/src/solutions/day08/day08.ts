import { Day } from "../../types/day";
import { buildArray, flipGrid } from "../../utils/collections";

type Visibility = {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
};

type Tree = {
  height: number;
  visibility: Visibility;
};

const processRow = (
  treeRow: Tree[],
  start: "left" | "top",
  end: "right" | "bottom"
): Partial<Tree>[] => {
  let startI = 0;
  let endI = treeRow.length - 1;

  let tallestFromStart = -1;
  let tallestFromEnd = -1;

  while (startI < treeRow.length && endI >= 0) {
    const treeFromStart = treeRow[startI];
    if (treeFromStart.height > tallestFromStart) {
      tallestFromStart = treeFromStart.height;
      treeFromStart.visibility[start] = true;
    }

    const treeFromEnd = treeRow[endI];
    if (treeFromEnd.height > tallestFromEnd) {
      tallestFromEnd = treeFromEnd.height;
      treeFromEnd.visibility[end] = true;
    }

    startI++;
    endI--;
  }

  return treeRow;
};

const isVisible = ({ visibility }: Tree): boolean => {
  return (
    visibility.bottom || visibility.left || visibility.right || visibility.top
  );
};

const parseGrid = (input: string[]): Tree[][] => {
  return input.map((line) =>
    line.split("").map((treeHeight) => ({
      height: parseInt(treeHeight),
      visibility: { left: false, top: false, right: false, bottom: false },
    }))
  );
};

const getProcessedGrid = (input: string[]): Tree[][] => {
  let treeGrid: Tree[][] = parseGrid(input);

  treeGrid.forEach((row) => {
    processRow(row, "left", "right");
  });

  treeGrid = flipGrid(treeGrid);

  treeGrid.forEach((treeCol) => {
    processRow(treeCol, "top", "bottom");
  });

  return flipGrid(treeGrid);
};

const getScenicScore = (trees: Tree[][], row: number, col: number): number => {
  // Get score to left

  const treeHeight = trees[row][col].height;

  let ssL = 0;
  for (let i = col - 1; i >= 0; i--) {
    if (trees[row][i].height < treeHeight) {
      ssL++;
    } else {
      ssL++;
      break;
    }
  }

  let ssR = 0;
  for (let i = col + 1; i < trees[row].length; i++) {
    if (trees[row][i].height < treeHeight) {
      ssR++;
    } else {
      ssR++;
      break;
    }
  }

  let ssT = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (trees[i][col].height < treeHeight) {
      ssT++;
    } else {
      ssT++;
      break;
    }
  }

  let ssB = 0;
  for (let i = row + 1; i < trees.length; i++) {
    if (trees[i][col].height < treeHeight) {
      ssB++;
    } else {
      ssB++;
      break;
    }
  }

  return ssB * ssL * ssR * ssT;
};

export default {
  solvePartOne: (input: string[]): string | number => {
    return getProcessedGrid(input)
      .flatMap((col) => col.map((tree) => tree))
      .filter((tree) => isVisible(tree)).length;
  },
  solvePartTwo: (input: string[]): string | number => {
    const processedTrees = getProcessedGrid(input);

    const allScenicScores: number[][] = [];

    for (let i = 0; i < processedTrees.length; i++) {
      const treeRow = processedTrees[i];

      const rowScenicScores: number[] = [];

      for (let j = 0; j < treeRow.length; j++) {
        const element = treeRow[j];
        rowScenicScores.push(getScenicScore(processedTrees, i, j));
      }

      allScenicScores.push(rowScenicScores);
    }

    return allScenicScores
      .flatMap((row) => row)
      .reduce((prev, curr) => Math.max(prev, curr), 0);
  },
} as Day;
