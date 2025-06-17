
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    reuse(Game) {
        this.Game = Game;
        
    },

    onFlashEnd() {

        this.node.destroy(this.node);

    },

    start () {

    },

});
