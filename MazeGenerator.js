var EMPTY = 0,
    WALL = 1,
    USED = 2,
    EXIT = 3,
    TRAP_ON = 4,///???
    TRAP_OFF = 5,///???
    MAZE_SIZE = 50,
    CELL_SIZE = (MAZE_SIZE / 2),
    CYCLE_NUM = parseInt(MAZE_SIZE / 3),
    MIN_DIF = parseInt((MAZE_SIZE - 2) / 2) - 1,
    //parseInt(MAZE_SIZE * 9 / 24),
    Player = {},
    random_k = 65535,
    Maze = new Array(MAZE_SIZE),
    Trap = new Array(CELL_SIZE);
    var Exit = {};

function addCycles() {///TEST
    var i, j, k = 0;
    while (k < CYCLE_NUM) {
        i = Math.floor(Math.random() * MAZE_SIZE);
        j = Math.floor(Math.random() * MAZE_SIZE);
        if (Maze[i][j] == WALL && i && j && i < MAZE_SIZE - 1 && j < MAZE_SIZE - 1 &&
            (Maze[i - 1][j] == WALL && Maze[i + 1][j] == WALL && Maze[i][j - 1] != WALL && Maze[i][j + 1] != WALL ||
             Maze[i - 1][j] != WALL && Maze[i + 1][j] != WALL && Maze[i][j - 1] == WALL && Maze[i][j + 1] == WALL)) {
            Maze[i][j] = EMPTY;
            ++k;
        }
    }
}

function addTraps() {
    var i, x, y;
    for (i = 0; i < CELL_SIZE; ++i) {
        Trap[i] = {};
        do {
            x = Math.floor(Math.random() * MAZE_SIZE);
            y = Math.floor(Math.random() * MAZE_SIZE);
        } while (Maze[x][y] != EMPTY || (Player.x == x && Player.y == y));
        Trap[i].x = x;
        Trap[i].y = y;
        Trap[i].action = (Math.floor(Math.random() * MAZE_SIZE) % 2) ? (false) : (true);
        /*
        Maze[y][x] = (Math.floor(Math.random() * MAZE_SIZE) % 2) ? (TRAP_OFF) : (TRAP_ON);
        setInterval(function () { Maze[y][x] = (Maze[y][x] == TRAP_ON) ? (TRAP_OFF) : (TRAP_ON) }, 3000);///???*/
    }
}

function setSE() {
    var i, j;
    for (i = 1; i < MAZE_SIZE - 1; ++i)
        for (j = 1; j < MAZE_SIZE - 1; ++j)
            if (Maze[i][j] == USED)
                Maze[i][j] = EMPTY;
    do {
        i = Math.floor(Math.random() * MAZE_SIZE);
        j = Math.floor(Math.random() * MAZE_SIZE);
    } while (Maze[i][j] != EMPTY);
    Player.x = j;
    Player.y = i;
    while (Maze[i][j] != EMPTY || Player.x == j && Player.y == i ||
           Math.abs(Player.x - j) < MIN_DIF ||
           Math.abs(Player.y - i) < MIN_DIF) {
        i = Math.floor(Math.random() * MAZE_SIZE);
        j = Math.floor(Math.random() * MAZE_SIZE);
    }
    Maze[i][j] = EXIT;
}

function countOffset(cell, side) {
    var offset, LEFT = 0, RIGHT = 1, UP = 2, DOWN = 3;
    switch (side) {///check out of range???
        case LEFT:
            if (cell.x == MAZE_SIZE - 2 && !(MAZE_SIZE % 2))
                offset = -1;
            else
                offset = -2;
            break;
        case RIGHT:
            if (cell.x == MAZE_SIZE - 3 && !(MAZE_SIZE % 2))
                offset = 1;
            else
                offset = 2;
            break;
        case UP:
            if (cell.y == MAZE_SIZE - 2 && !(MAZE_SIZE % 2))
                offset = -1;
            else
                offset = -2;
            break;
        case DOWN:
            if (cell.y == MAZE_SIZE - 3 && !(MAZE_SIZE % 2))
                offset = 1;
            else
                offset = 2;
            break;
    }
    return offset;
}

function createMaze() {
    var LEFT = 0,
        RIGHT = 1,
        UP = 2,
        DOWN = 3,
        i, j;
    for (i = 0; i < MAZE_SIZE; ++i) {
        Maze[i] = new Array(MAZE_SIZE);
        for (j = 0; j < MAZE_SIZE; ++j)
            if (i % 2 && j % 2 && i < MAZE_SIZE - 1 && j < MAZE_SIZE - 1)
                Maze[i][j] = EMPTY;
            else
                Maze[i][j] = WALL;
    }
    Maze[1][1] = USED;
    var cell_num = CELL_SIZE * CELL_SIZE - 1, offset, Neighboor = new Array(4), n_num, rand_n,
        S = [],
        cur_cell = { x: 1, y: 1, l: 0, r: 0, u: 0, d: 0 },
        tmp_cell = new Object();
    for (i in cur_cell)
        tmp_cell[i] = cur_cell[i];
    //cur_cell.l=cur_cell.r=cur_cell.u=cur_cell.d=0;
    S.push(tmp_cell);
    while (cell_num && S.length) {
        n_num = 0;
        tmp_cell = S.pop();
        for (i in cur_cell)
            cur_cell[i] = tmp_cell[i];
        if (!(cur_cell.l && cur_cell.r && cur_cell.u && cur_cell.d)) {
            if (!cur_cell.l) {
                offset = countOffset(cur_cell, LEFT);
                if (cur_cell.x + offset <= 0)
                    cur_cell.l = 1;
                else if (cur_cell.x + offset > 0 && Maze[cur_cell.y][cur_cell.x + offset] == USED)
                    cur_cell.l = 1;
                else {
                    Neighboor[n_num] = LEFT;
                    ++n_num;
                }
            }
            if (!cur_cell.r) {
                offset = countOffset(cur_cell, RIGHT);
                if (cur_cell.x + offset >= MAZE_SIZE - 1)
                    cur_cell.r = 1;
                else if (cur_cell.x + offset < MAZE_SIZE - 1 && Maze[cur_cell.y][cur_cell.x + offset] == USED)
                    cur_cell.r = 1;
                else {
                    Neighboor[n_num] = RIGHT;
                    ++n_num;
                }
            }
            if (!cur_cell.u) {
                offset = countOffset(cur_cell, UP);
                if (cur_cell.y + offset <= 0)
                    cur_cell.u = 1;
                else if (cur_cell.y + offset > 0 && Maze[cur_cell.y + offset][cur_cell.x] == USED)
                    cur_cell.u = 1;
                else {
                    Neighboor[n_num] = UP;
                    ++n_num;
                }
            }
            if (!cur_cell.d) {
                offset = countOffset(cur_cell, DOWN);
                if (cur_cell.y + offset >= MAZE_SIZE - 1)
                    cur_cell.d = 1;
                else if (cur_cell.y + offset < MAZE_SIZE - 1 && Maze[cur_cell.y + offset][cur_cell.x] == USED)
                    cur_cell.d = 1;
                else {
                    Neighboor[n_num] = DOWN;
                    ++n_num;
                }
            }
            /*if(S.length>1&&parseInt(Math.random() * random_k) % 100 < 5)///TEST
                n_num=0;*/
            if (!n_num)
                continue;
            tmp_cell = new Object();
            for (i in cur_cell)
                tmp_cell[i] = cur_cell[i];
            S.push(tmp_cell);
            //srand(rand()*131076+rand());///???
            rand_n = parseInt(Math.random() * random_k) % n_num; ///???
            switch (Neighboor[rand_n]) {
                case LEFT:
                    Maze[cur_cell.y][cur_cell.x - 1] = EMPTY;
                    cur_cell.x += countOffset(cur_cell, LEFT);
                    break;
                case RIGHT:
                    Maze[cur_cell.y][cur_cell.x + 1] = EMPTY;
                    cur_cell.x += countOffset(cur_cell, RIGHT);
                    break;
                case UP:
                    Maze[cur_cell.y - 1][cur_cell.x] = EMPTY;
                    cur_cell.y += countOffset(cur_cell, UP);
                    break;
                case DOWN:
                    Maze[cur_cell.y + 1][cur_cell.x] = EMPTY;
                    cur_cell.y += countOffset(cur_cell, DOWN);
                    break;
            }
            cur_cell.l = cur_cell.r = cur_cell.u = cur_cell.d = 0;
            Maze[cur_cell.y][cur_cell.x] = USED;
            --cell_num;
            tmp_cell = new Object();
            for (i in cur_cell)
                tmp_cell[i] = cur_cell[i];
            S.push(tmp_cell);
        }
    }
    addCycles();
    setSE();
    addTraps();
    for (var i = 0; i < MAZE_SIZE; i++)
      for (var j = 0; j < MAZE_SIZE; j++)
        if (Maze[i][j] == EXIT) {
          Exit.x = i;
          Exit.y = j;
        }
}

/*function addCycles() {
  var i, j;
  for (i = 1; i < MAZE_SIZE / 2; ++i)
      for (j = 1; j < MAZE_SIZE / 2; ++j)
          if (parseInt(Math.random() * random_k) % 100 < 10 &&
              i > 0 && j > 0 && i < MAZE_SIZE - 1 && j < MAZE_SIZE - 1)
        Maze[2 * i][2 * j] = EMPTY;
}*/
/*function addTraps() {
    for (var i = 0; i < CELL_SIZE; ++i) {
        Trap[i] = {};
        Trap[i].x = 2 * (parseInt(Math.random() * random_k) % CELL_SIZE) + 1;
        Trap[i].y = 2 * (parseInt(Math.random() * random_k) % CELL_SIZE) + 1;
        if (Trap[i].x == Player.x && Trap[i].y == Player.y || Maze[Trap[i].y][Trap[i].x] == EXIT)
            Trap[i].action = false;
        else
            Trap[i].action = true;
    }
}*/
