cc.Class({
    extends: cc.Component,

    properties: {

        buttonAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onStart() {
        //������Ч
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.director.loadScene("About");
    },

    start () {

    },

    // update (dt) {},
});
