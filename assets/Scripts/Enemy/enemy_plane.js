cc.Class({
    extends: cc.Component,

    properties: {
     
    },



    update(dt) {
        if (this.node.y <= -960) {
            this.node.destroy();
        }
    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this.TTL = window.Global.getLO().ETTL;
        this.isdeath = false;
        this.speed = 2;
        this.BulletManager = cc.find("Canvas/BulletManager");
    },


    onCollisionEnter: function (other, self) {
        if (this.isdeath == true) return;
        else {
            var pos = this.node.getPosition();
            cc.find("Canvas").getComponent("Game").createflash(pos);
            this.TTL -= 1
            if (this.TTL < 0) {
                cc.find("Canvas").getComponent("Game").createboom(pos);
                this.isdeath = true;
                this.node.destroy();
                window.Global.gainScore(true);
            }
        }

    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
    }
});
