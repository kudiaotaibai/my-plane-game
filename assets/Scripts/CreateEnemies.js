
cc.Class({
    extends: cc.Component,

    properties: {
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
    },



    onLoad:function() {
        this.schedule(function(){
            //生成新的飞机
            this.spawnNewPlane0();
        },1+Math.random()*20);

        this.schedule(function(){
            this.spawnNewPlane1();
        },2+Math.random()*16);

        this.schedule(function(){
            this.spawnNewPlane2();
        },1+Math.random()*20);

        this.schedule(function(){
            this.spawnNewPlane3();
        },2+Math.random()*20);

        this.schedule(function(){
            this.spawnNewPlane4();
        },1+Math.random()*16);

        this.schedule(function(){
            this.spawnNewPlane5();
        },2+Math.random()*20);
    },

    spawnNewPlane0: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane0 = cc.instantiate(this.PlanePrefab0);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane0);
        // 为星星设置一个随机位置
        newPlane0.setPosition(this.getNewPlane0Position());
    },
    
    spawnNewPlane1: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane1 = cc.instantiate(this.PlanePrefab1);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane1);
        // 为星星设置一个随机位置
        newPlane1.setPosition(this.getNewPlane0Position());
    },
    
    spawnNewPlane2: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane2 = cc.instantiate(this.PlanePrefab2);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane2);
        // 为星星设置一个随机位置
        newPlane2.setPosition(this.getNewPlane0Position());
    },
    
    spawnNewPlane3: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane3 = cc.instantiate(this.PlanePrefab3);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane3);
        // 为星星设置一个随机位置
        newPlane3.setPosition(this.getNewPlane0Position());
    },
    
    spawnNewPlane4: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane4 = cc.instantiate(this.PlanePrefab4);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane4);
        // 为星星设置一个随机位置
        newPlane4.setPosition(this.getNewPlane0Position());
    },
    
    spawnNewPlane5: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newPlane5 = cc.instantiate(this.PlanePrefab5);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newPlane5);
        // 为星星设置一个随机位置
        newPlane5.setPosition(this.getNewPlane0Position());
    },
    
    getNewPlane0Position: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        //var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var randY = 480;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        randX = Math.random()*641-320;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
    
    //生成Plane飞机****************

    start () {

    },

    // update (dt) {},
});
