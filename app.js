//idea is creating new cells and removing the previous ones so that movong effect is made

const canvas=document.getElementById('canvas');
//get context helps in writting over canvas
const pen=canvas.getContext('2d');
// giving the color to rextangle
//making the rectangle with x,y,w,h
 

// making snake object
const cs=67;
let food=null;
let gameover=false;
let score=0
const snake={
    init_len:5,
    direction:'right',
    cells:[],
    createsnake:function(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
                x: i,
                y:0
            });
        }
    },
    drawsnake: function(){
        for(let cell of this.cells){
            //multiplying with cs to scale cell cs-1 to see gap b/w cells
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1)
        }
    },
    updatesnake:function(){
        //getting the value of head ie last cell in array
        const headx=this.cells[this.cells.length-1].x;
        const heady=this.cells[this.cells.length-1].y;
        //condition of collison with food and not removing first cell to increase in length
        if(headx===food.x&&heady===food.y){
            food=getfood();
            score++;
        }
        else{
        //remove first cell
        this.cells.shift();
        }
        //value after last cell
        let nextx;
        let nexty;
        if(this.direction==='left'){
            nextx=headx-1;
            nexty=heady;
            if(nextx*cs<0){
                pen.fillStyle='red'
                pen.fillText('Game Over',400,400);
                clearInterval(id);
                }
        }
        else if(this.direction==='up'){
            nextx=headx;
            nexty=heady-1;
            if(nexty*cs<0){
                pen.fillStyle='red'
                pen.fillText('Game Over',400,400);
                clearInterval(id);
                }
        }
        else if(this.direction==='down'){
            nextx=headx;
            nexty=heady+1;
            if(nexty*cs>=735){
                pen.fillStyle='red'
                pen.fillText('Game Over',400,400);
            clearInterval(id);
            }
        }
        else{
            nextx=headx+1;
            nexty=heady;
            if(nextx*cs>=1200){
                pen.fillStyle='red'
                pen.fillText('Game Over',400,400);
                clearInterval(id);
                }
        }


        //pushing the upadated value of head 
        this.cells.push({
            x:nextx,
            y:nexty,
    });
    }
}
function init(){
snake.createsnake();
food=getfood();
function keypress(e){
    if(e.key==='ArrowDown')
    snake.direction='down';
    else if(e.key==='ArrowLeft')
    snake.direction='left';
    else if(e.key==='ArrowUp')
    snake.direction='up';
    else
    snake.direction='right'
}

document.addEventListener('keydown',keypress);

}
function update(){
// init_x+=50;
// init_y+=50;
// if(gameover===true)
// clearInterval(id);
snake.updatesnake();
}
function draw(){
//clearrect so that the previous cells on canvas got removed
pen.clearRect(0,0,1200,750);
//filling the rect by random food
pen.font='40px sans-serif';
pen.fillText(`Score : ${score}`,100,50);
pen.font='80px sans-serif';
pen.fillStyle='blue';
pen.fillRect(food.x*cs,food.y*cs,cs,cs);
// pen.fillRect(init_x,init_y,50,50)
pen.fillStyle='yellow';
snake.drawsnake();
}
init();
function gameloop(){
draw();
update();
}
function getfood(){
    const foodx=Math.round(Math.random()*(1200-cs)/cs);//divided by cs to get multiple of cs as snake size is acc tp cs to make collision and sub by cs so that food not generated out of frame
    const foody=Math.round(Math.random()*(735-cs)/cs);
    food={
        x:foodx,
        y:foody
    }
    return food;
}

const id=setInterval(gameloop,100)