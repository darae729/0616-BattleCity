class Enemy extends GameObject {
    constructor(container, src, width, height, x, y, velX, velY) {
        super(container, src, width, height, x, y, velX, velY);

        //나에 대한 초기화 
        this.sensorArray=new Array(4);
        this.direct;

        /*
        //좌측 센서 
        this.sensorArray[0] = new Sensor(this.wrapper, 1, 45,       -1, (this.height - 45)/2 );
        
        //위쪽 센서
        this.sensorArray[1]=new Sensor(this.wrapper, 45, 1,         (this.width -45)/2, -1 );

        //우측센서 
        this.sensorArray[2]= new Sensor(this.wrapper, 1, 45,         this.width, (this.height - 45)/2  );

        //아래쪽 센서
        this.sensorArray[3]= new Sensor(this.wrapper, 45, 1,        (this.width - 45)/2, this.height);
        */

        //좌측 센서 
        this.sensorArray[0] = new Sensor(this.container, 1, 45,  this.x-1 , this.y+(this.height - 45)/2 );
        
        //위쪽 센서
        this.sensorArray[1]=new Sensor(this.container, 45, 1,    this.x-(this.width -45)/2+5, this.y -1 );

        //우측센서 
        this.sensorArray[2]= new Sensor(this.container, 1, 45,   this.x+this.width, this.y+(this.height - 45)/2  );

        //아래쪽 센서
        this.sensorArray[3]= new Sensor(this.container, 45, 1,   this.x-(this.width - 45)/2+5, this.y+this.height);       

        this.st=[]; //setTimeout을 담아둘 배열 

        this.enemyMove();
        this.enemyFireInterval();
    }
    
    setSensor(){
        /*
        this.sensorArray[0].x=this.x-1; //좌
        this.sensorArray[1].x=this.x+(this.width -45)/2;//위
        this.sensorArray[2].x=this.x+this.width;//우측
        this.sensorArray[3].x=this.x+(this.width - 45)/2;//아래

        this.sensorArray[0].y=this.y+(this.height - 45)/2; //좌
        this.sensorArray[1].y=this.y-1 //위
        this.sensorArray[2].y=this.y+(this.height - 45)/2;//우측
        this.sensorArray[3].y=this.y+this.height; //아래
    */
        this.sensorArray[0].x=this.x-1; //좌
        this.sensorArray[1].x=this.x-(this.width -45)/2+5;//위
        this.sensorArray[2].x=this.x+this.width;//우측
        this.sensorArray[3].x=this.x-(this.width - 45)/2+5;//아래

        this.sensorArray[0].y=this.y+(this.height - 45)/2; //좌
        this.sensorArray[1].y=this.y-1 //위
        this.sensorArray[2].y=this.y+(this.height - 45)/2;//우측
        this.sensorArray[3].y=this.y+this.height; //아래   
    }

    leftCheck(){
        for(let i=0;i<brickArray.length;i++){
            let result=collisionCheck(this.sensorArray[0], brickArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.x=brickArray[i].x+brickArray[i].width+1;
                break;
            }
        }
    }

    topCheck(){
        for(let i=0;i<brickArray.length;i++){
            let result=collisionCheck(this.sensorArray[1], brickArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.y=brickArray[i].y+brickArray[i].height+1;
                break;
            }
        }
    }

    rightCheck(){
        for(let i=0;i<brickArray.length;i++){
            let result=collisionCheck(this.sensorArray[2], brickArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.x=brickArray[i].x-this.width-1;
                break;
            }
        }
    }

    bottomCheck(){
        for(let i=0;i<brickArray.length;i++){
            let result=collisionCheck(this.sensorArray[3], brickArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.y=brickArray[i].y-this.height-1;
                break;
            }
        }
    }

    stoneLeftCheck(){
        for(let i=0;i<stoneArray.length;i++){
            let result=collisionCheck(this.sensorArray[0], stoneArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.x=stoneArray[i].x+stoneArray[i].width+1;
                break;
            }
        }
    }

    stoneTopCheck(){
        for(let i=0;i<stoneArray.length;i++){
            let result=collisionCheck(this.sensorArray[1], stoneArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.y=stoneArray[i].y+stoneArray[i].height+1;
                break;
            }
        }
    }

    stoneRightCheck(){
        for(let i=0;i<stoneArray.length;i++){
            let result=collisionCheck(this.sensorArray[2], stoneArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.x=stoneArray[i].x-this.width-1;
                break;
            }
        }
    }

    stoneBottomCheck(){
        for(let i=0;i<stoneArray.length;i++){
            let result=collisionCheck(this.sensorArray[3], stoneArray[i]);
            if(result){
                //console.log(i, "번째 벽돌과 충돌");
                this.y=stoneArray[i].y-this.height-1;
                break;
            }
        }
    }

    hitCheck(){
        for (let i=0; i<brickArray.length; i++){
            let result = collisionCheck(this.sensorArray[2], brickArray[i]);
            if(result){
                this.velX=0;
                this.x = brickArray[i].x - this.width;
            }
        }
    }

    moveX(n) {
        this.velX = n;
        if (n > 0) {
            this.img.style.transform = "rotate(90deg)";
        } else {
            this.img.style.transform = "rotate(270deg)";
        }
    }

    moveY(n) {
        this.velY = n;
        if (n > 0) {
            this.img.style.transform = "rotate(180deg)";
        } else {
            this.img.style.transform = "rotate(0deg)";
        }
    }

    fire() {
        let velX=0;
        let velY=0;

        if (this.direct == 37) {
            velX = -10;
        } else if (this.direct == 38) {
            velY = -10;
        } else if (this.direct == 39) {
            velX = 10;
        } else if (this.direct == 40) {
            velY = 10;
        }
        
        //container, src, width, height, x, y, velX, velY
        let bullet = new EnemyBullet(this.container, "./images/bullet.png", 8, 8, this.x + (this.width/2), this.y + (this.height / 2), velX, velY);
        enemyBulletArray.push(bullet);
        
    }

    //랜덤한 시간간격으로 적군 스스로 총알 발사하기
    enemyFireInterval(){
        let r = getRandom(5);

        let st=setTimeout(  ()=>{
            this.enemyFireInterval();
        }, r*1000);

        
        if(flag && meArray.length>0){// pause 기능 때문에
            //주인공이 태어나야 발사
            this.fire();
        }

        this.st.push(st);
    }


    enemyMove(){
        let n=getRandomByRange(1,10);

        if(flag){ // pause 기능 때문에
            if(n%2==0){
                let x=getRandomByRange(-3,3);
                this.moveX(x);
                if(x>0){
                    this.direct=39;
                }else{
                    this.direct=37;
                }
            }else{
                let y=getRandomByRange(-3,3);
                this.moveY(y);
                if(y>0){
                    this.direct=40;
                }else{
                    this.direct=38;
                }
            }
        }    
        let st=setTimeout(()=>{
            this.enemyMove();
        }, 3000);
        this.st.push(st);
    }

    birth(){
        this.container.appendChild(this.img);
        
    }

    /*-------------------------------------------------------------
    적군이 죽을때 적군 수 상태정보에서 폭탄 이미지 제거하기
    1) enemyArray의 수가 감소하면 그 수와 비례하여 이미지를 제거한다
    -------------------------------------------------------------*/
    die(){
        this.container.removeChild(this.img); //화면에서 제거

        //센서 제거 
        for(let i=0;i<this.sensorArray.length;i++){
            this.container.removeChild(this.sensorArray[i].div);
        }

        let myIndex = enemyArray.indexOf(this); //배열에서 제거
        enemyArray.splice(myIndex, 1);

        //모든 셋타임 아웃제거 
        for(let i=0;i<this.st.length;i++){
            clearTimeout(this.st[i]);
        }
    }


    //폭파효과
    explode(){
        this.img.src="./images/explode.png";

        let st=setTimeout(()=>{
            this.die();
        }, 200);
        this.st.push(st);
    }


    appear(){
        this.img.src="./images/start.png";

       let st=setTimeout(()=>{
            this.birth();
        }, 400);

        this.st.push(st);
    }


    tick(){
        this.x+=this.velX;
        this.y+=this.velY;        

        if(this.y>780-this.height){
            this.y=780-this.height;
        }
        if(this.y<0){  
            this.y=0;
        }
        if(this.x>900-this.width){
            this.x=900-this.width;
        }
        if(this.x<0){
            this.x=0;
        }

        this.setSensor();
    }
    

    render(){
        this.hitCheck();
        //this.appear();
        this.leftCheck();
        this.topCheck();
        this.rightCheck();
        this.bottomCheck();

        this.stoneLeftCheck();
        this.stoneTopCheck();
        this.stoneRightCheck();
        this.stoneBottomCheck();

        this.sensorArray[0].render();
        this.sensorArray[1].render();
        this.sensorArray[2].render();
        this.sensorArray[3].render();

        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }    
}