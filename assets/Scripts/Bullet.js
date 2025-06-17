cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {

    },

    update(dt) {
        this.node.y += 3;

        if (this.node.y >= 970) {
            this.node.destroy();
        }
    },
});