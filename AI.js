var numBots, Bots;

var
  NOT_EXIST = -1,
  LEFT = 1,
  RIGHT = 2,
  UP = 3,
  DOWN = 4;
var ShortPath = new Array(MAZE_SIZE * MAZE_SIZE);
for (var i = 0; i < MAZE_SIZE * MAZE_SIZE; i++) {
  ShortPath[i] = new Array(MAZE_SIZE * MAZE_SIZE);
}

function BFS(firstCell) {
  var queue = [],
    i = Math.floor(firstCell / MAZE_SIZE),
    j = firstCell % MAZE_SIZE,
    tmp;
  if (Maze[i][j + 1] != WALL) {
    tmp = i * MAZE_SIZE + j + 1;
    ShortPath[firstCell][tmp] = RIGHT;
    queue.push(tmp);
  }
  if (Maze[i][j - 1] != WALL) {
    tmp = i * MAZE_SIZE + j - 1;
    ShortPath[firstCell][tmp] = LEFT;
    queue.push(tmp);
  }
  if (Maze[i + 1][j] != WALL) {
    tmp = (i + 1) * MAZE_SIZE + j;
    ShortPath[firstCell][tmp] = UP;
    queue.push(tmp);
  }
  if (Maze[i - 1][j] != WALL) {
    tmp = (i - 1) * MAZE_SIZE + j;
    ShortPath[firstCell][tmp] = DOWN;
    queue.push(tmp);
  }
  var el;
  while ((el = queue.shift()) !== undefined) {
    i = Math.floor(el / MAZE_SIZE);
    j = el % MAZE_SIZE;
    if (Maze[i][j + 1] != WALL) {
      tmp = i * MAZE_SIZE + j + 1;
      if (ShortPath[firstCell][tmp] == NOT_EXIST) {
        ShortPath[firstCell][tmp] = ShortPath[firstCell][el];
        queue.push(tmp);
      }
    }
    if (Maze[i][j - 1] != WALL) {
      tmp = i * MAZE_SIZE + j - 1;
      if (ShortPath[firstCell][tmp] == NOT_EXIST) {
        ShortPath[firstCell][tmp] = ShortPath[firstCell][el];
        queue.push(tmp);
      }
    }
    if (Maze[i + 1][j] != WALL) {
      tmp = (i + 1) * MAZE_SIZE + j;
      if (ShortPath[firstCell][tmp] == NOT_EXIST) {
        ShortPath[firstCell][tmp] = ShortPath[firstCell][el];
        queue.push(tmp);
      }
    }
    if (Maze[i - 1][j] != WALL) {
      tmp = (i - 1) * MAZE_SIZE + j;
      if (ShortPath[firstCell][tmp] == NOT_EXIST) {
        ShortPath[firstCell][tmp] = ShortPath[firstCell][el];
        queue.push(tmp);
      }
    }
  }
}

function findShortestPath() {
  for (var i = 0; i < MAZE_SIZE * MAZE_SIZE; i++)
    for (var j = 0; j < MAZE_SIZE * MAZE_SIZE; j++) {
      ShortPath[i][j] = NOT_EXIST;
    }
  for (var i = 0; i < MAZE_SIZE; i++)
    for (var j = 0; j < MAZE_SIZE; j++) {
      if (Maze[i][j] != WALL)
        BFS(i * MAZE_SIZE + j);
    }

}

function createBots(num) {
  numBots = num;
  Bots = new Array(numBots);
  for (var i = 0; i < numBots; i++) {
    var t1 = 0,
      t2 = 0;
    while (Maze[t1][t2] != EMPTY || (Math.abs(t2 - Player.x) <= 10 && Math.abs(t1 - Player.y) <= 10)) {
      t1 = Math.floor(Math.random() * MAZE_SIZE);
      t2 = Math.floor(Math.random() * MAZE_SIZE);
    }
    Bots[i] = {};
    Bots[i].num = 0;
    Bots[i].mod = 0;
    Bots[i].x = t2;
    Bots[i].y = t1;
  }
}

function botsMove() {
  for (var i = 0; i < numBots; i++) {
    if ((Math.sqrt(Math.pow(Bots[i].x - Player.x, 2) + Math.pow(Bots[i].y - Player.y, 2))) <= radius)
      Bots[i].mod = Player.y * MAZE_SIZE + Player.x;
    if (Bots[i].mod) {
      var cur = Bots[i].y * MAZE_SIZE + Bots[i].x;
      var r = ShortPath[cur][Bots[i].mod];
      switch (r) {
        case LEFT:
          Bots[i].x--;
          break;
        case RIGHT:
          Bots[i].x++;
          break;
        case UP:
          Bots[i].y++;
          break;
        case DOWN:
          Bots[i].y--;
          break;
        default:
          alert("error!");
      }
      if (Bots[i].mod == cur)
        Bots[i].mod = 0;
    } else {
      if (Bots[i].num != 0) {
        Bots[i].num--;
        if(changePos(i))
          Bots[i].num=0;
      } else {
        while (true) {
          Bots[i].lastmove = Math.floor(Math.random() * 4);
          if (!changePos(i)) break;
        }
        Bots[i].num = Math.floor(Math.random() * 5);;
      }
    }
  }
}

function changePos(i) {
  var r = Bots[i].lastmove;
  if (r == 0 && Maze[Bots[i].y + 1][Bots[i].x] != WALL) {
    Bots[i].y++;
    return 0;
  }
  if (r == 1 && Maze[Bots[i].y - 1][Bots[i].x] != WALL) {
    Bots[i].y--;
    return 0;
  }
  if (r == 2 && Maze[Bots[i].y][Bots[i].x + 1] != WALL) {
    Bots[i].x++;
    return 0;
  }
  if (r == 3 && Maze[Bots[i].y][Bots[i].x - 1] != WALL) {
    Bots[i].x--;
    return 0;
  }
  return 1;
}
