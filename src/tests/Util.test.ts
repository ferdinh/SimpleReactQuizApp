import {shuffleArray} from "../Util";

test('shuffleArray(Array) should result with the same number of element after shuffling', () => {
    const testArray: number[] = [1, 2, 3, 4];
    const expectedLength = 4;

    shuffleArray(testArray);

    expect(testArray.length).toEqual(expectedLength);
})