var EMPTY = 0,
    WALL = 1,
    //PLAYER = 2,
    EXIT = 3,
    PATH = 4, ///???
    MAZE_SIZE = 51, //сторона лабиринта 200    
    Player = {},
    Maze = new Array(MAZE_SIZE),
    Exit = {};

function createMaze()
{
    var i, j;
    for (i = 0; i < MAZE_SIZE; ++i)
    {
        Maze[i] = new Array(MAZE_SIZE);
        for (j = 0; j < MAZE_SIZE; ++j)
            Maze[i][j] = (Math.random() * 100 < 40) ? (WALL) : (EMPTY);
    }
    var c = {},
        last = {};
    c.x = parseInt(MAZE_SIZE * (10 + Math.random())) % parseInt(MAZE_SIZE / 4) + 1; ///???
    c.y = 1;
    Player.x = c.x;
    Player.y = c.y;
    Maze[c.y][c.x] = PATH;
    while (!(c.x == MAZE_SIZE - 2 && c.y == 1) &&
        !(c.x == MAZE_SIZE - 2 && c.y >= (MAZE_SIZE * 3 / 4)) &&
        !(c.y == MAZE_SIZE - 2 && c.x >= (MAZE_SIZE * 3 / 4)))
    { ///add left???
        last.x = c.x;
        last.y = c.y;
        while (c.x + 1 < MAZE_SIZE - 1 && Maze[c.y][c.x + 1] == EMPTY)
        {
            ++c.x;
            Maze[c.y][c.x] = PATH;
        }
        if (c.y + 1 < MAZE_SIZE - 1 && Maze[c.y + 1][c.x] == EMPTY)
            while (c.y + 1 < MAZE_SIZE - 1 && Maze[c.y + 1][c.x] == EMPTY)
            {
                ++c.y;
                Maze[c.y][c.x] = PATH;
            }
        else
            while (c.y - 1 > 0 && Maze[c.y - 1][c.x] == EMPTY)
            {
                --c.y;
                Maze[c.y][c.x] = PATH;
            }
        if (last.x == c.x && last.y == c.y)
        { ///cut walls
            if (c.x + 1 < MAZE_SIZE - 1 && Maze[c.y][c.x + 1] == WALL)
            {
                Maze[c.y][c.x + 1] = EMPTY;
                continue;
            }
            if (c.y + 1 < MAZE_SIZE - 1 && Maze[c.y + 1][c.x] == WALL)
            {
                Maze[c.y + 1][c.x] = EMPTY;
                continue;
            }
            if (c.y - 1 > 0 && Maze[c.y - 1][c.x] == WALL)
            {
                Maze[c.y - 1][c.x] = EMPTY;
                continue;
            }
        }
    }
    Maze[c.y][c.x] = EXIT;
    Exit.x = c.x;
    Exit.y = c.y;
    for (i = 0; i < MAZE_SIZE; ++i)
    {
        Maze[i][0] = WALL;
        Maze[i][MAZE_SIZE - 1] = WALL;
    }
    for (j = 0; j < MAZE_SIZE; ++j)
    {
        Maze[0][j] = WALL;
        Maze[MAZE_SIZE - 1][j] = WALL;
    }
    for (i = 1; i < MAZE_SIZE - 1; ++i)
        for (j = 1; j < MAZE_SIZE - 1; ++j)
            if (Maze[i][j] == PATH)
                Maze[i][j] = EMPTY;
}
