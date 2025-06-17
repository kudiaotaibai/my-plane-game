cc.Class({
    extends: cc.Component,

    properties: {
        //buttonEffect
        buttonAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onStart() {

        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.director.loadScene("Option");
    },

    start () {

    },

    // update (dt) {},
});
