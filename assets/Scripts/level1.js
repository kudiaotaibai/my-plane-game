
cc.Class({
    extends: cc.Component,

    properties: {
        playAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad() {

        cc.audioEngine.playEffect(this.playAudio, true);
    },
    clickBtn: function (sender, str) {

        if (str == 'restart') {
            cc.audioEngine.stopAllEffects();//ֹͣ������Ч
            this.scheduleOnce(function () { cc.director.loadScene('Game'); }, 0.1);
        }

    },
});
