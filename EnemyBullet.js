class EnemyBullet extends GameObject {
    

    hitCheck() {
        let len = meArray.length;
        //벽돌에 대한 충돌체크
        for (let i = 0; i<brickArray.length; i++) {
            let result = collisionCheck(this,brickArray[i]);
            if (result) {
                this.container.removeChild(this.img);
                
                let meIndex = enemyBulletArray.indexOf(this);
                enemyBulletArray.splice(meIndex, 1);
                
                this.container.removeChild(brickArray[i].img);
                let youIndex = brickArray.indexOf(brickArray[i]);
                brickArray.splice(youIndex, 1);

                break;
            }
        }

        if(meArray.length>0){
            let result = collisionCheck(this, meArray[0]);
            
            if (result) {

                //총알의 이미지 제거 
                this.container.removeChild(this.img);

                //총알 배열에서 제거    
                //console.log("적군총알이 제거되기 전 수는 ", enemyBulletArray.length);
                let meIndex = enemyBulletArray.indexOf(this);
                enemyBulletArray.splice(meIndex, 1);
                //console.log("적군총알이 제거된 후 수는 ", enemyBulletArray.length);

                //주인공 폭파
                //console.log("지워질 주인공 이미지는 ", meArray[0].img);
                meArray[0].explode();

                if(mapArray[level].meArray<=0){
                    gameOver.style.display="block";    
                }
            }
        }
    }

    render() {
        
        //총알이 화면 밖으로 나가면 죽이기 
        if(this.x<0 || this.x > 900 || this.y <0 || this.y>780 ){
            this.container.removeChild(this.img);
            let meIndex = enemyBulletArray.indexOf(this);
            enemyBulletArray.splice(meIndex, 1);            
        }
        
        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";

        this.hitCheck();
        
    }


}
