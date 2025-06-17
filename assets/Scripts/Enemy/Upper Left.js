
cc.Class({
    extends: cc.Component,

    properties: {

    },


     onLoad () {
        this.speed = 1;
        this.speedx=0.5;
    },

    start () {

    },

     update (dt) {
        this.node.y -= this.speed;
        this.node.x +=this.speedx;
        if (this.node.y <= -480 ||this.node.x >=320) {
            this.node.destroy();
        }
     },
});
