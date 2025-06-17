
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 800
    },
    onLoad: function () {
        if (this.node.y < -500) {
            this.node.destroy();
        }
    },


    onCollisionEnter: function (other, self) {
        this.node.destroy();

    },
 
    update: function (dt) {
        this.node.y -= this.speed * dt;
    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        
    },
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        
    },
});
