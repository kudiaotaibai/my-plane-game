

cc.Class({
    extends: cc.Component,

    properties: {
        flyDuration: 10,
        flyDistance: 1320,

        enemybulletPrefab: {
            default: null,
            type: cc.Prefab
        },


    },

    spawnEnemyBullet: function () {
        var enemyBullet = cc.instantiate(this.enemybulletPrefab);
        cc.find("Canvas").addChild(enemyBullet);
        var X1;
        var Y1;
        X1 = this.node.x + 30;
        Y1 = this.node.y - 25;
        enemyBullet.setPosition(X1, Y1);
        var enemyBullet2 = cc.instantiate(this.enemybulletPrefab);
        cc.find("Canvas").addChild(enemyBullet2);
        var X2;
        var Y2;
        X2 = this.node.x - 30;
        Y2 = this.node.y - 25;
        enemyBullet2.setPosition(X2, Y2);
    },

    unInitIt: function () {
        this.node.destroy();
    },

    update: function (dt) {
        if (this.bultime > this.bulduration) {
            this.bultime = 0;
            this.spawnEnemyBullet();
            return;
        }

        this.bultime += dt;

    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;//?????????????????
        this.TTL = window.Global.getLO().ETTL;
        this.isdeath = false;
        this.bultime = 0;
        this.bulduration = 0.1;
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
