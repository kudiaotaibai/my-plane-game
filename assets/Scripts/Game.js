cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        boomPrefab: {
            default: null,
            type: cc.Prefab
        },
        explodeAudio: {
            default: null,
            type: cc.AudioClip
        },
        flashPrefab: {
            default: null,
            type: cc.Prefab
        },
        //航天器的预制体的引用
        SpacePrefab1: {
            default: null,
            type: cc.Prefab
        },
        SpacePrefab2: {
            default: null,
            type: cc.Prefab
        },
        SpacePrefab3: {
            default: null,
            type: cc.Prefab
        },
        SpacePrefab4: {
            default: null,
            type: cc.Prefab
        },

        //飞机的预制体的引用
        PlanePrefab0: {
            default: null,
            type: cc.Prefab
        },
        PlanePrefab1: {
            default: null,
            type: cc.Prefab
        },
        PlanePrefab2: {
            default: null,
            type: cc.Prefab
        },
        PlanePrefab3: {
            default: null,
            type: cc.Prefab
        },
        PlanePrefab4: {
            default: null,
            type: cc.Prefab
        },
        PlanePrefab5: {
            default: null,
            type: cc.Prefab
        },
        //背景图加载
        background_1: cc.Node,
        background_2: cc.Node,
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        TTLDisplay: {
            default: null,
            type: cc.Label
        },
        
    },


    
    onLoad: function () {
        
        //背景图片位置设置
        this.background_1.y = 0
        this.background_2.y = this.background_1.y + this.background_1.height

        window.Global.getNextLevel();
        
        window.Global.live = window.Global.getLO().WTTL;
        window.Global.score = 0;

        this.currentBoomRoot = null;
        this.boomPool = new cc.NodePool('boom');
        this.currentFlashRoot = null;
        this.flashPool = new cc.NodePool('flash');

        this.scoreDisplay.string = 'Score: ' + window.Global.getLO().TOTAL_SCORE.toString();
        this.TTLDisplay.string = 'TTL: ' + window.Global.getLO().WTTL.toString();
        
        //计时器
        this.schedule(function(){
            //生成新的space
            this.spawnNewSpace1();
        },1+Math.random()*10);

        this.schedule(function(){
            //生成新的space
            this.spawnNewSpace2();
        },2+Math.random()*15);
        this.schedule(function(){
            //生成新的space
            this.spawnNewSpace3();
        },4+Math.random()*15);
        this.schedule(function(){
            //生成新的space
            this.spawnNewSpace4();
        },5+Math.random()*15);

    },

//生成space航天器**************开始
    spawnNewSpace1: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newSpace1 = cc.instantiate(this.SpacePrefab1);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newSpace1);
        // 为星星设置一个随机位置
        newSpace1.setPosition(this.getNewSpace1Position());
    },

    spawnNewSpace2: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newSpace2 = cc.instantiate(this.SpacePrefab2);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newSpace2);
        // 为星星设置一个随机位置
        newSpace2.setPosition(this.getNewSpace1Position());
    },

    spawnNewSpace3: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newSpace3 = cc.instantiate(this.SpacePrefab3);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newSpace3);
        // 为星星设置一个随机位置
        newSpace3.setPosition(this.getNewSpace1Position());
    },

    spawnNewSpace4: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newSpace4 = cc.instantiate(this.SpacePrefab4);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newSpace4);
        // 为星星设置一个随机位置
        newSpace4.setPosition(this.getNewSpace1Position());
    },

    getNewSpace1Position: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        //var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var randY = -480;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        //var maxX = this.node.width/2;
        //randX = (Math.random() - 0.5) * 2 * maxX;
        randX = Math.random()*641-320;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

//生成space航天器************结束
    
    update(dt) {
        

        //背景循环滚动
        this.background_1.y -= 1
        this.background_2.y -= 1
        if (this.background_1.y <= -this.background_1.height)//背景图滚出边界时返回屏幕顶部
        {
            this.background_1.y = this.background_2.y + this.background_1.height
        }
        if (this.background_2.y <= -this.background_1.height) {
            this.background_2.y = this.background_1.y + this.background_1.height
        }

        this.scoreDisplay.string = 'Score: ' + window.Global.score.toString();
       
        this.TTLDisplay.string = 'TTL: ' + window.Global.live.toString();

        if (window.Global.score >= window.Global.getLO().TOTAL_SCORE) {
            if (window.Global.level == 1) {
                cc.director.loadScene('Moon Warriors 1');
            }
            if (window.Global.level == 2) {
                cc.director.loadScene('Moon Warriors 2');
            }
            if (window.Global.level == 3) {
                cc.director.loadScene('Moon Warriors 3');
            }
            cc.audioEngine.stopAllEffects();//停止所有音效
        }
    },
    spawnBoomRoot: function () {
        var fx;
        if (this.boomPool.size() > 0) {
            fx = this.boomPool.get(this);
        } else {
            fx = cc.instantiate(this.boomPrefab);
            fx.getComponent('boomAnim').reuse(this);
        }
        return fx;
    },
    createboom: function (pos) {

        // 播放特效
        this.currentBoomRoot = this.spawnBoomRoot();
        this.node.addChild(this.currentBoomRoot);
        this.currentBoomRoot.setPosition(pos);

        cc.audioEngine.playEffect(this.explodeAudio, false);
    },
    despawnBoomRoot() {
        this.boomPool.put(this.currentBoomRoot);
    },

    spawnFlashRoot: function () {
        var fx;
        if (this.flashPool.size() > 0) {
            fx = this.flashPool.get(this);
        } else {
            fx = cc.instantiate(this.flashPrefab);
            fx.getComponent('flashAnim').reuse(this);
        }
        return fx;
    },
    createflash: function (pos) {

        // 播放特效
        this.currentFlashRoot = this.spawnFlashRoot();
        this.node.addChild(this.currentFlashRoot);
        this.currentFlashRoot.setPosition(pos);

    },
    
});
