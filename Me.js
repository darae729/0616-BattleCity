class Me extends GameObject {
    constructor(container, src, width, height, x, y, velX, velY) {
        super(container, src, width, height, x, y, velX, velY);

        //나에 대한 초기화 
        this.sensorArray=new Array(4);

        // constructor(container, width, height, x, y)

        //좌측 센서 
        this.sensorArray[0] = new Sensor(this.container, 1, 45,  this.x-1 , this.y+(this.height - 45)/2 );
        
        //위쪽 센서
        this.sensorArray[1]=new Sensor(this.container, 45, 1,    this.x-(this.width -45)/2+5, this.y -1 );

        //우측센서 
        this.sensorArray[2]= new Sensor(this.container, 1, 45,   this.x+this.width, this.y+(this.height - 45)/2  );

        //아래쪽 센서
        this.sensorArray[3]= new Sensor(this.container, 45, 1,   this.x-(this.width - 45)/2+5, this.y+this.height);
    
        this.st=[]; //setTimeout을 담아둘 배열 
    }
    
    setSensor(){
        
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

    //벽돌에 대한 충돌체크
    hitCheck(){
        for (let i=0; i<brickArray.length; i++){
            let result = collisionCheck(this.sensorArray[2], brickArray[i]);
            if(result){
                this.velX=0;
                this.x = brickArray[i].x - this.width;
            }
        }
    }

    die(){
        this.container.removeChild(this.img); //화면에서 제거

        meArray.splice(0, 1); //배열에서 제거

        //센서 제거 
        for(let i=0;i<this.sensorArray.length;i++){
            this.container.removeChild(this.sensorArray[i].div);
        }        


        for(let i=0;i<this.st.length;i++){
            clearTimeout(this.st[i]);
        }
    }

    explode(){
        this.img.src="./images/explode.png";

        let st=setTimeout(()=>{
            this.die();
        }, 2000);
        this.st.push(st);
    }

    tick(){
        this.setSensor();

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
        
        
    }
    
    render(){
        this.hitCheck();
        

        //충돌체크
        this.stoneLeftCheck();
        this.stoneTopCheck();
        this.stoneRightCheck();
        this.stoneBottomCheck();

        this.leftCheck();
        this.topCheck();
        this.rightCheck();
        this.bottomCheck();


        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.sensorArray[0].render();
        this.sensorArray[1].render();
        this.sensorArray[2].render();
        this.sensorArray[3].render();

    }    
}