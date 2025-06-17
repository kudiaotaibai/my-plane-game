window.Global = {
    level: 0,
    score: 0,
    live: 0,
    gameLevel: [],
    LOb: null,

    getNextLevel: function () {
        if (this.LOb === null) {
            this.gameLevel.push({
                ETTL: 2,
                WTTL: 100,
                INCREAMENT_SCORE: 100,
                TOTAL_SCORE: 500
            });
            this.gameLevel.push({
                ETTL: 3,
                WTTL: 85,
                INCREAMENT_SCORE: 90,
                TOTAL_SCORE: 500
            });
            this.gameLevel.push({
                ETTL: 3,
                WTTL: 70,
                INCREAMENT_SCORE: 80,
                TOTAL_SCORE: 500
            });
        }

        this.LOb = this.gameLevel[this.level++];
    },
    getLO: function () {
        return this.LOb;
    },

    gainScore: function (isPlus) {
        if (isPlus) {
            this.score += this.getLO().INCREAMENT_SCORE;
        }
        else {

            this.score -= this.getLO().INCREAMENT_SCORE;
        }
    },
    loseTTL: function () {
        this.live = this.live - 1;
    },

};