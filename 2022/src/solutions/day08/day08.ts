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

const getOutput = (trees: Tree[][]): string => {
  return trees
    .map((row) => row.map((tree) => (isVisible(tree) ? "Y" : "N")).join(" "))
    .join("\n\n");
};

const getHeights = (trees: Tree[][]): string => {
  return trees
    .map((row) => row.map((tree) => tree.height).join(" "))
    .join("\n\n");
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

const processRow2 = (
  visibleTrees: Partial<Visibility>[],
  treeRow: number[],
  start: "left" | "top",
  end: "right" | "bottom"
): Partial<Visibility>[] => {
  let startI = 0;
  let endI = treeRow.length - 1;

  let tallestFromStart = 0;
  let tallestFromEnd = 0;

  while (startI < treeRow.length && endI >= 0) {
    const treeFromStart = treeRow[startI];
    if (treeFromStart > tallestFromStart) {
      tallestFromStart = treeFromStart;
      visibleTrees[startI][start] = true;
    }

    const treeFromEnd = treeRow[endI];
    if (treeFromEnd > tallestFromEnd) {
      tallestFromEnd = treeFromEnd;
      visibleTrees[endI][end] = true;
    }

    startI++;
    endI++;
  }

  return visibleTrees;
};

const isVisible = ({ visibility }: Tree): boolean => {
  return (
    visibility.bottom || visibility.left || visibility.right || visibility.top
  );
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const treeGrid: Tree[][] = input.map((line) =>
      line.split("").map((treeHeight) => ({
        height: parseInt(treeHeight),
        visibility: { left: false, top: false, right: false, bottom: false },
      }))
    );

    treeGrid.forEach((row) => {
      processRow(row, "left", "right");
    });

    const flippedGrid = flipGrid(treeGrid);

    flippedGrid.forEach((treeCol) => {
      processRow(treeCol, "top", "bottom");
    });

    const reflipped = flipGrid(flippedGrid);

    return reflipped
      .flatMap((col) => col.map((tree) => tree))
      .filter((tree) => isVisible(tree)).length;
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
