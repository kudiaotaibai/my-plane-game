cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad:function(){
        this.speed = 2;
        this.BulletManager = cc.find("Canvas/BulletManager");
    },


    update(dt) {
        this.node.y -= this.speed;
        if (this.node.y <= -960) {
            this.node.destroy();
        }
        for (let bullet of this.BulletManager.children) {
            if (Math.abs(this.node.x - bullet.x) <= 50 && Math.abs(this.node.y - bullet.y) <= 10) {
                this.speed = 0;
                window.Global.gainScore(false);
                this.node.destroy();
                bullet.destroy();
            }
        }
    },
});
