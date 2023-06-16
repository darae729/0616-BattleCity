class Mario extends GameObject{
    
    marioDie(){
        this.wrapper.removeChild(this.img); //화면에서 제거

        let myIndex = brickArray.indexOf(this); //배열에서 제거
        brickArray.splice(myIndex, 1);
    }

    //폭파효과
    gameOver(){
        this.img.src="./images/explode.png";
        this.marioDie();
    }
}