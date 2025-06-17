cc.Class({
    extends: cc.Component,

    properties: {
        //buttonEffect
        buttonAudio: {
            default: null,
            type: cc.AudioClip
        },
        Flare: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Flare.active = false
    },

    onStart() {
        this.Flare.active = true
        var anim1 = this.Flare.getComponent(cc.Animation);
        anim1.play('flare');
        cc.audioEngine.playEffect(this.buttonAudio, false);
        this.scheduleOnce(function () { cc.director.loadScene('Game'); }, 1.5);
    },
    start () {

    },

    // update (dt) {},
});
