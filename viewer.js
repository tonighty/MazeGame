createMaze();

var display = document.getElementById('display');
var radius = 4;


display.width = 0.9 * Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
display.height = display.width;

playerY = playerX = display.width / 2;

var context = display.getContext('2d');

Hide();

var blocksize = display.width / MAZE_SIZE;

Init();
DrawPlayer();

setInterval('Update()', 16);

function Init()
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
}

function Hide()
{
    context.fillStyle = 'grey';
    context.fillRect(0, 0, display.width, display.height);
    context.fillStyle = 'green';
    context.fillRect(Exit.y * blocksize,Exit.x * blocksize, blocksize, blocksize);
}

function DrawExit(x, y)
{
	context.fillStyle = 'green';
    context.fillRect(x, y, blocksize, blocksize);
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
            if (Maze[i][j] == EXIT)
            	DrawExit(i * blocksize, j * blocksize);
        }
    }

}

function getRandomInRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Update () {
	Hide();
	DrawRadius();
	DrawPlayer();
}