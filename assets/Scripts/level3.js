cc.Class({
    extends: cc.Component,

    properties: {
        playAudio: {
            default: null,
            type: cc.AudioClip
        },
    },


    onLoad() {
        // ���ŵ÷���Ч
        cc.audioEngine.playEffect(this.playAudio, true);
    },
    clickBtn: function (sender, str) {
        if (str == 'gameEnd') {
            cc.audioEngine.stopAllEffects();
            this.scheduleOnce(function () { cc.director.loadScene('Menu'); }, 0.1);
        }
    },

    start () {

    },

});
