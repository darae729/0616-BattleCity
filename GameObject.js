/* 게임에 등장하는 모든 객체들의 최상위 클래스 */
class GameObject{
    constructor(container, src, width, height, x, y, velX, velY){
        this.container=container; //객체가 붙여질 부모요소 
        this.img;
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;
        
        //객체의 스타일 정의 
        this.img=document.createElement("img");
        this.img.src=this.src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.container.appendChild(this.img);
    }

    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
    }

    //화면을 처리한다
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}