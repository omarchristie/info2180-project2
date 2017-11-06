//End of game notification
"use strict";
var div;
var blink;
var time;
var spaceY;
var spaceX;

function checkMove(pos)
// function to test if tile can move.
{
  if (calculateLeft(spaceX, spaceY) == (pos-1))
  {
    return true;
  }

  if (calculateDown(spaceX, spaceY) == (pos-1))
  {
    return true;
  }

  if (calculateUp(spaceX, spaceY) == (pos-1))
  {
    return true;
  }

  if (calculateRight(spaceX, spaceY) == (pos-1))
  {
    return true;
  }
}
function Blink()
{
  //Print out You win while blinking
  blink --;
  if (blink == 0)
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FFFFFF";
    alert('you win');
    return;
  }
  if (blink % 2)
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#00FF00";  
  }
  else
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
  }
  time = setTimeout(Blink, 100);
}

function winGame()
{
  // call the Blink function
  var body = document.getElementsByTagName('body');
  body[0].style.backgroundColor = "#FF0000";
  blink = 10;
  time = setTimeout(Blink, 100);
}

function completion()
{
  //check if the puzzle is completed
  var flag = true;
  for (var i = 0; i < div.length; i++) {
    var y = parseInt(div[i].style.top);
    var x = parseInt(div[i].style.left);

    if (x != (i%4*100) || y != parseInt(i/4)*100)
    {
      flag = false;
      break;
    }
  }
  return flag;
}

function calculateLeft(x, y)
// // check if space is available to the left
{
  var xx = parseInt(x);
  var yy = parseInt(y);

  if (xx > 0)
  {
    for (var i = 0; i < div.length; i++) 
    {
      if (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)
      {
        return i;
      } 
    }
  }
  else 
  {
    return -1;
  }
}

function calculateRight (x, y) {
  // // check if space is available to the right
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (xx < 300)
  {
    for (var i =0; i<div.length; i++){
      if (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) 
      {
        return i;
      }
    }
  }
  else
  {
    return -1;
  } 
}

function calculateUp (x, y) {
  // // check if space is available at top of tile
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (yy > 0)
  {
    for (var i=0; i<div.length; i++)
    {
      if (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) 
      {
        return i;
      }
    } 
  }
  else 
  {
    return -1;
  }
}

function calculateDown (x, y)
{
  // check if space is available to the bootom
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (yy < 300)
  {
    for (var i=0; i<div.length; i++)
    {
      if (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) 
      {
        return i;
      }
    }
  }
  else
  {
    return -1;
  } 
}
//change tile position
function chaneTile (pos) {
  var temp = div[pos].style.top;
  div[pos].style.top = spaceY;
  spaceY = temp;

  temp = div[pos].style.left;
  div[pos].style.left = spaceX;
  spaceX = temp;
}

window.onload = function ()
{
  var puzzleArea = document.getElementById('puzzlearea');
  
  div = puzzleArea.getElementsByTagName('div');

  for (var i=0; i<div.length; i++)
  {
    // set apparance
    div[i].setAttribute("class","puzzlepiece");
    div[i].style.left = (i%4*100)+'px';
    div[i].style.top = (parseInt(i/4)*100) + 'px';
    div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
    div[i].onmouseover = function()
    {
      if (checkMove(parseInt(this.innerHTML)))
      {
        //set class
        this.setAttribute("class","puzzlepiece movablepiece");
      }
    };
    div[i].onmouseout = function()
    {
      this.setAttribute("class","puzzlepiece");
    };

    div[i].onclick = function()
    {
      if (checkMove(parseInt(this.innerHTML)))
      {
        chaneTile(this.innerHTML-1);
        if (completion())
        {
          winGame();
        }
        return;
      }
    };
  }

  spaceX = '300px';
  spaceY = '300px';

  var shufflebutton = document.getElementById('shufflebutton');
  shufflebutton.onclick = function()
  {
    // Change up tile on the click of the button shuffle
    for (var i=0; i<250; i++)
    {
      var rand = parseInt(Math.random()* 100) %4;
      if (rand == 0)
      {
        var tmp = calculateUp(spaceX, spaceY);
        if ( tmp != -1)
        {
          chaneTile(tmp);
        }
      }
      if (rand == 1)
      {
        var tmp = calculateDown(spaceX, spaceY);
        if ( tmp != -1) 
        {
          chaneTile(tmp);
        }
      }

      if (rand == 2)
      {
        var tmp = calculateLeft(spaceX, spaceY);
        if ( tmp != -1)
        {
          chaneTile(tmp);
        }
      }

      if (rand == 3)
      {
        var tmp = calculateRight(spaceX, spaceY);
        if (tmp != -1)
        {
          chaneTile(tmp);
        }
      }
    }
  };
};