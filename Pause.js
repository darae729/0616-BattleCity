class Pause{

    constructor(container, width, height, x, y){
        this.container=container;
        this.div;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.text="PAUSE";
        this.blinkFlag=false;
        
        this.div = document.createElement("div");
        this.div.innerText=this.text;
        this.div.style.width=this.width+"px";
        this.div.style.width=this.height+"px";

        this.div.style.position="absolute";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        
        this.div.style.textAlign="center";
        this.div.style.fontSize=150+"px";
        this.div.style.fontWeight="bold";
        this.div.style.color="#FFFFFF";
        this.div.style.boxSizing="border-box";
        this.div.style.padding="100px 250px";
        this.div.style.display="none";

        this.container.appendChild(this.div);

        this.blink();
    }
    
    /*-------------------------------------------------------------
    지정한 시간 간격으로 PAUSE 텍스트를 깜빡거리게 하는 메서드 
    - ESC 키를 눌렀을때 등장한다
    -------------------------------------------------------------*/
    blink(){
        if(!flag){ // pause 때문에
            let state = (this.blinkFlag)? "block":"none";
            this.div.style.display=state;
            
            this.blinkFlag=!this.blinkFlag;
        }

        setTimeout(()=>{
            this.blink();
        }, 300);
    }
}