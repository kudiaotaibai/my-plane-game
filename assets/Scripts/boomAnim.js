cc.Class({
    extends: cc.Component,

    reuse(play) {
        this.play = play;
    },

    onBoomEnd() {
        this.node.destroy(this.node);
    },
});