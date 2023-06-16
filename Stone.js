class Stone extends GameObject{

    //게임에 등장하는 총알 배열과 충돌체크
    hitTest(){
        for(let i=0;i<bulletArray.length;i++){
            let result=collisionCheck(this, bulletArray[i]);
            if(result){
                //너만 죽어
                this.container.removeChild(bulletArray[i].img);
                //총알 배열에서 총알제거
                bulletArray.splice(i,1);
            }
        }
    }

    enemyHitTest(){
        for(let i=0;i<enemyBulletArray.length;i++){
            let result=collisionCheck(this, enemyBulletArray[i]);
            if(result){
                //너만 죽어
                this.container.removeChild(enemyBulletArray[i].img);
                //총알 배열에서 총알제거
                enemyBulletArray.splice(i,1);
            }
        }
    }

    render(){
        this.hitTest();
        this.enemyHitTest();

        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

    }
}