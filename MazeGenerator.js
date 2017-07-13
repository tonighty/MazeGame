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
    var iterations = MAZE_SIZE * MAZE_SIZE;

    var moves = [];
    for (var i = 0; i < MAZE_SIZE; i++)
    {
        Maze[i] = [];
        for (var j = 0; j < MAZE_SIZE; j++)
        {
            Maze[i][j] = 1;
        }
    }
    var posX = 1;
    var posY = 1;
    Maze[posX][posY] = 0;
    moves.push(posY + posY * MAZE_SIZE);
    for (var itr = 0; itr < iterations; ++itr)
    {
        if (moves.length)
        {
            var possibleDirections = "";
            if (posX + 2 > 0 && posX + 2 < MAZE_SIZE - 1 && Maze[posX + 2][posY] == 1)
            {
                possibleDirections += "S";
            }
            if (posX - 2 > 0 && posX - 2 < MAZE_SIZE - 1 && Maze[posX - 2][posY] == 1)
            {
                possibleDirections += "N";
            }
            if (posY - 2 > 0 && posY - 2 < MAZE_SIZE - 1 && Maze[posX][posY - 2] == 1)
            {
                possibleDirections += "W";
            }
            if (posY + 2 > 0 && posY + 2 < MAZE_SIZE - 1 && Maze[posX][posY + 2] == 1)
            {
                possibleDirections += "E";
            }
            if (possibleDirections)
            {
                var move = Math.floor(Math.random() * (possibleDirections.length + 1));
                switch (possibleDirections[move])
                {
                    case "N":
                        Maze[posX - 2][posY] = 0;
                        Maze[posX - 1][posY] = 0;
                        posX -= 2;
                        break;
                    case "S":
                        Maze[posX + 2][posY] = 0;
                        Maze[posX + 1][posY] = 0;
                        posX += 2;
                        break;
                    case "W":
                        Maze[posX][posY - 2] = 0;
                        Maze[posX][posY - 1] = 0;
                        posY -= 2;
                        break;
                    case "E":
                        Maze[posX][posY + 2] = 0;
                        Maze[posX][posY + 1] = 0;
                        posY += 2;
                        break;
                }
                moves.push(posY + posX * MAZE_SIZE);
            }
            else
            {
                var back = moves.pop();
                posX = Math.floor(back / MAZE_SIZE);
                posY = back % MAZE_SIZE;
            }
        }
    }
    while (true)
    {
        var i = getRandomInRange(0, MAZE_SIZE - 1)
        var j = getRandomInRange(0, MAZE_SIZE - 1)
        if (Maze[i][j] == 0)
        {
            Player.x = i;
            Player.y = j;
            break;
        }
    }
    while (true)
    {
        var i = getRandomInRange(0, MAZE_SIZE - 1)
        var j = getRandomInRange(0, MAZE_SIZE - 1)
        if (Maze[i][j] == 0)
        {
            Exit.x = i;
            Exit.y = j;
            Maze[i][j] = EXIT;
            break;
        }
    }
    return Maze;
}
