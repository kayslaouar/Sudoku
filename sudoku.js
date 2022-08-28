function isValidSudoku(board) {
    const n = 9;
    const sqrt = 3;
    const boxes = new Array(n).fill(0);
    const rows = new Array(n).fill(0);
    const cols = new Array(n).fill(0);
    let boxi;
    let boxj;
    for (let i = 0; i < n; ++i) {
        boxi = Math.floor(i / sqrt) * 3;
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === '.') {
                continue;
            }
            boxj = Math.floor(j / sqrt);
            const bit = 1 << parseInt(board[i][j], 10) - 1;
            if ((rows[i] & bit) !== 0 || (cols[j] & bit) !== 0 || (boxes[boxi + boxj] & bit) !== 0) {
                return false;
            }
            rows[i] |= bit;
            cols[j] |= bit;
            boxes[boxi + boxj] |= bit;
        }
    }
    return true;
};

function solveSudoku(board) {
    const n = 9;
    const sqrt = 3;
    
    // arrs
    const boxes = new Array(n).fill(0);
    const rows = new Array(n).fill(0);
    const cols = new Array(n).fill(0);
    const unassigned = [];
    
    function addBitToArrs(row, col, box, bit) {
        rows[row] |= bit;
        cols[col] |= bit;
        boxes[box] |= bit;
    }
    
    function removeBitFromArrs(row, col, box, bit) {
        rows[row] &= ((1 << 9) - 1) ^ bit;
        cols[col] &= ((1 << 9) - 1) ^ bit;
        boxes[box] &= ((1 << 9) - 1) ^ bit;
    }
    
    // initialize arrs and unassigned
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (board[i][j] === '.') {
                unassigned.push([i, j]);
            } else {
                const box = (Math.floor(i / 3) * 3) + Math.floor(j / 3);
                const bit = 1 << (parseInt(board[i][j], 10) - 1);
                addBitToArrs(i, j, box, bit);
            }
        }
    }
    function recur(cur) {
        if (cur === unassigned.length) {
            return true;
        } else {
            const [i, j] = unassigned[cur];
            for (let k = 0; k < n; ++k) {
                const box = (Math.floor(i / 3) * 3) + Math.floor(j / 3);
                const bit = 1 << k;
                if ((rows[i] & bit) === 0 && (cols[j] & bit) === 0 && (boxes[box] & bit) === 0) {
                    addBitToArrs(i, j, box, bit);
                    if (recur(cur + 1)) {
                        board[i][j] = (k + 1).toString();
                        return true;
                    }
                    removeBitFromArrs(i, j, box, bit);
                }
            }
            return false;
        }
    }
    recur(0);
    return board;
};