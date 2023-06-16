class Sensor{
    constructor(container, width, height, x, y){
        this.container=container;
        this.div = document.createElement("div");
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;

        //this.div.style.background="yellow";
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.position="absolute"; //wrapper의 자식
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.container.appendChild(this.div);
    }

    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
    }       
}