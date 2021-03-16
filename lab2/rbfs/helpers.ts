import {Field} from '../field';
import {TreeNode} from './tree-node';

// compare two nodes based on score
export const sortByScore = (a: TreeNode, b: TreeNode) => a.score - b.score;

// check if two fields are the same
export const areFieldsTheSame = (firstField: Field, secondField: Field): boolean => {
  return firstField.flat().toString() === secondField.flat().toString()
}

// check if current field equals target one
export const isGoal = (field: Field, targetField: Field): boolean => {
  return areFieldsTheSame(field, targetField);
}

// copy field object
const copyField = (field: Field): Field => field.map((row) => [...row]);

// calculate state heuristic
export const getScore = (field: Field, targetField: Field): number => {
  let score = 0;
  field.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value !== targetField[x][y]) {
        score++;
      }
    })
  })

  return score;
}

// get coordinates of hole on the field
export const getHolePosition = (field: Field): [number, number] => {
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field.length; y++) {
      if (field[x][y] === null) {
        return [x, y];
      }
    }
  }
}

// get horizontal and vertical neighbours coordinates according for provided cell
export const getAllNeighbourCells = (x: number, y: number): [number, number][] => {
  const result: [number, number][] = [];

  [1, -1].forEach((xChange) => {
    const changedX = x + xChange;
    if (changedX >= 0 && changedX <= 2) {
      result.push([changedX, y]);
    }
  });

  [1, -1].forEach((yChange) => {
    const changedY = y + yChange;
    if (changedY >= 0 && changedY <= 2) {
      result.push([x, changedY]);
    }
  })

  return result;
}

// get new state with swapped number and hole
export const getNewState = (holeX: number, holeY: number, x: number, y: number, field: Field): Field => {
  const newField = copyField(field);
  newField[holeX][holeY] = newField[x][y];
  newField[x][y] = null;
  return newField;
}

// generate possible next states from current one
export const getPossibleStates = (node: TreeNode): Field[] => {
  const [holeX, holeY] = getHolePosition(node.field);
  const neighbours = getAllNeighbourCells(holeX, holeY);
  const result: Field[] = []
  neighbours.map(([x, y]) => {
    const newState = getNewState(holeX, holeY, x, y, node.field)
    let shouldAdd = true;
    if (node.parent && areFieldsTheSame(newState, node.parent?.field)) {
      shouldAdd = false;
    }
    if (node.parent?.parent && areFieldsTheSame(newState, node.parent?.parent?.field)) {
      shouldAdd = false;
    }

    if (shouldAdd) {
      result.push(newState);
    }


  })

  return result;
}
