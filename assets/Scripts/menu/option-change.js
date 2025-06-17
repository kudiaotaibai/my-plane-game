cc.Class({
    extends: cc.Component,

    properties: {
        sndDisable: cc.Node,
        sndEnable: cc.Node,
    },


     clickBtn: function (sender, str) {
        if (str == 'Enable') {
            this.sndDisable.active = true
            this.sndEnable.active = false

        }
        else if (str == 'Disable') {
            this.sndDisable.active = false
            this.sndEnable.active = true
         
            cc.audioEngine.playEffect(this.scoreAudio, false);
        }
    },
});
