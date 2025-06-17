
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        this.speed = 1.5;
    },

    start () {

    },

     update (dt) {
        this.node.y -= this.speed;
        if (this.node.y <= -480) {
            this.node.destroy();
        }
     },
});
