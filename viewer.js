var display = document.getElementById('display');
var radius = 8;


display.width = 0.8 * Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
display.height = display.width;

playerY = playerX = display.width / 2;

var context = display.getContext('2d');

var blocksize = display.width / MAZE_SIZE;

function drawMaze()
{
    for (var i = 0; i < MAZE_SIZE; i++)
    {
        for (var j = 0; j < MAZE_SIZE; j++)
        {
            if (Maze[i][j] == EMPTY)
                DrawEmpty(i * blocksize, j * blocksize);
            if (Maze[i][j] == EXIT)
                DrawExit(i * blocksize, j * blocksize);
        }
    }

    for (var i = 0; i < CELL_SIZE; i++)
        if (Trap[i].action == true)
            DrawTrap(Trap[i].x * blocksize, Trap[i].y * blocksize);

    DrawBots();
}

function Hide()
{
    context.fillStyle = 'black';
    context.fillRect(0, 0, display.width, display.height);
}

function DrawExit(x, y)
{
    context.fillStyle = '#ff4b39';
    context.fillRect(Exit.x * blocksize, Exit.y * blocksize, blocksize, blocksize);
}

function DrawPlayer()
{
    context.beginPath();
    context.arc(Player.y * blocksize + 0.5 * blocksize, Player.x * blocksize + 0.5 * blocksize, blocksize * 0.35, 0, 2 * Math.PI, false);
    context.fillStyle = '#ff4b39';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#ff4b39';
    context.stroke();
}

function DrawBot(x, y)
{
    context.beginPath();
    context.arc(x * blocksize + 0.5 * blocksize, y * blocksize + 0.5 * blocksize, blocksize * 0.35, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'green';
    context.stroke();
}

function DrawBots() {
  for (var i = 0; i < numBots; i++) {
    context.beginPath();
    context.arc(Bots[i].y * blocksize + 0.5 * blocksize, Bots[i].x * blocksize + 0.5 * blocksize, blocksize * 0.35, 0, 2 * Math.PI, false);
    context.fillStyle = '7cfc00';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '7cfc00';
    context.stroke();
  }
}

function DrawEmpty(x, y)
{
    context.fillStyle = 'white';
    context.fillRect(x, y, blocksize, blocksize);
}

function DrawRadius()
{
    for (var i = Player.y - radius; i < Player.y + radius; i++)
    {
        for (var j = Player.x - radius; j < Player.x + radius; j++)
        {
            if (i < 0 || j < 0 || i > MAZE_SIZE - 1 || j > MAZE_SIZE - 1) continue;
            if (Maze[i][j] == 0)
                DrawEmpty(i * blocksize, j * blocksize);

            for (var k = 0; k < CELL_SIZE; k++)
            {
                if (Trap[k].x == i && Trap[k].y == j && Trap[k].action == true)
                    DrawTrap(i * blocksize, j * blocksize);
            }

            for (var k = 0; k < numBots; k++)
            {
                if (Bots[k].y == i && Bots[k].x == j)
                    DrawBot(i, j);
            }
        }
    }
}

function DrawTrap(x, y)
{
    context.fillStyle = '#944e7e';
    context.fillRect(x, y, blocksize, blocksize);
}

function getRandomInRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Update()
{
    Hide();
    DrawRadius();
    DrawExit();
    //drawMaze();
    DrawPlayer();
    for (var i = 0; i < CELL_SIZE; i++)
      {
        if (Trap[i].x == Player.y && Trap[i].y == Player.x && Trap[i].action)
        {
          alert('nu ti loh');
          reset();
        }
      }
}
