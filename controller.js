function klava(n) {
  if ((n == 37) || (n == 65)) {
    mazeUp(Player.y, Player.x);
  }
  if ((n == 38) || (n == 87)) {
    mazeLeft(Player.y, Player.x);
  }
  if ((n == 39) || (n == 68)) {
    mazeDown(Player.y, Player.x);
  }
  if ((n == 40) || (n == 83)) {
    mazeRight(Player.y, Player.x);
  }
}

function SwitchTrapCondition() {
  for (var i = 0; i < CELL_SIZE; i++)
    if (Trap[i].action)
      Trap[i].action = false;
    else Trap[i].action = true;
}

function mazeLeft(i, j) {
  if (Maze[i][j - 1] == 0) {
    --Player.x;
  }
  if (Maze[i][j - 1] == 3) {
    --Player.x;
    alert('WIN');
    reset(1);
  }
}

function mazeUp(i, j) {
  if (Maze[i - 1][j] == 0) {
    --Player.y;
  }
  if (Maze[i - 1][j] == 3) {
    --Player.y;
    alert('WIN');
    reset(1);
  }
}

function mazeRight(i, j) {
  if (Maze[i][j + 1] == 0) {
    ++Player.x;
  }
  if (Maze[i][j + 1] == 3) {
    ++Player.x;
    alert('WIN');
    reset(1);
  }
}

function mazeDown(i, j) {
  if (Maze[i + 1][j] == 0) {
    ++Player.y;
  }
  if (Maze[i + 1][j] == 3) {
    ++Player.y;
    alert('WIN');
    reset(1);
  }
}
