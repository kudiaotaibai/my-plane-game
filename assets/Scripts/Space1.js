
cc.Class({
    extends: cc.Component,

    properties: {
        speed:4,

    },


    start () {

    },

    update (dt) {
        this.node.y += this.speed*dt;
        if(this.node.y>480)
        {
            this.node.destroy();
        }
    },
});
