class Bullet extends GameObject {


    //적군에 대한 충돌체크
    hitCheck() {
        let len = enemyArray.length;

        for (let i = 0; i < len; i++) {
            let result = collisionCheck(this, enemyArray[i]);

            if (result) {
                console.log(i, "번째 적군과 충돌");

                this.container.removeChild(this.img);
                let meIndex = bulletArray.indexOf(this);
                bulletArray.splice(meIndex, 1);

                enemyArray[i].explode(); //폭파효과

                killCount++; //적군 죽인 수 추가

                removeEnemyHp();//적군 hp 감소시키기

                if(killCount>=mapArray[level].enemycount){
                    win.style.display="block";    
                }

                //setScore();
                break;
            }
        }

        for (let i = 0; i < brickArray.length; i++) {
            let result = collisionCheck(this, brickArray[i]);
            if (result) {
                this.container.removeChild(this.img);

                let meIndex = bulletArray.indexOf(this);
                bulletArray.splice(meIndex, 1);

                this.container.removeChild(brickArray[i].img);
                let youIndex = brickArray.indexOf(brickArray[i]);
                brickArray.splice(youIndex, 1);

                break;
            }
        }   
    }

    render() {
        this.hitCheck();

        //총알이 화면 밖으로 나가면 죽이기 
        if(this.x<0 || this.x > 900 || this.y <0 || this.y>780 ){
            this.container.removeChild(this.img);
            let meIndex = bulletArray.indexOf(this);
            bulletArray.splice(meIndex, 1);            
        }

        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";
    }
}
