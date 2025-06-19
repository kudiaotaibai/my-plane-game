cc.Class({
    extends: cc.Component,

    properties: {
        // --- 原有的属性保持不变 ---
        bullet:{
            default: null,
            type: cc.Prefab
        },
        BulletManager: cc.Node,
        duck: cc.Prefab,
        fly: cc.Prefab,
        EnemyController: cc.Node,
        bulletAudio: {
            default: null,
            type: cc.AudioClip
        },
        player: {
            default: null,
            type: cc.Node
        },
        isShoot: null,

        // --- 新增的属性 ---
        // 我们只需要在这里加一个属性，用来关联背景音乐的 AudioSource 组件
        bgmAudioSource: {
            default: null,
            type: cc.AudioSource
        }
    },

    // --- 新增的函数 ---
    // 我把暂停和恢复的逻辑单独写成两个函数，方便你在按钮上调用
    // 暂停游戏
    pauseGame: function() {
        // 暂停游戏主循环
        cc.director.pause();

        // 暂停背景音乐
        if (this.bgmAudioSource) {
            this.bgmAudioSource.pause();
        }
        
        // 如果你需要在这里显示一个暂停菜单，可以加上这行代码
        // cc.find("Canvas/PauseMenu").active = true; // 假设你的暂停菜单节点路径是这个
    },

    // 恢复游戏
    resumeGame: function() {
        // 恢复游戏主循环
        cc.director.resume();

        // 恢复背景音乐
        if (this.bgmAudioSource) {
            this.bgmAudioSource.resume();
        }

        // 如果你需要在这里隐藏暂停菜单，可以加上这行代码
        // cc.find("Canvas/PauseMenu").active = false;
    },

    // --- 以下是你所有的原有函数，保持不变 ---
    onLoad: function () {
        var isShoot = false; // 注意：这里的 isShoot 是局部变量，可能和你 properties 里的 isShoot 不是同一个
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            var anim1 = cc.find("Canvas/Player").getComponent(cc.Animation);
            if (anim1) anim1.play('player');
            var playerController = cc.find("Canvas/Player").getComponent("playerController");
            if (playerController) playerController.isShoot = true;
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            var playerController = cc.find("Canvas/Player").getComponent("playerController");
            if (playerController) playerController.isShoot = true;
            
            if (this.x > 320) {
                this.x = 320;
            } else if (this.x < -320) {
                this.x = -320;
            } else {
                this.node.x = this.x;
            }
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            var anim1 = cc.find("Canvas/Player").getComponent(cc.Animation);
            if (anim1) anim1.stop('player');
            var playerController = cc.find("Canvas/Player").getComponent("playerController");
            if (playerController) playerController.isShoot = false;
        }, this.node);
    },

    onCollisionEnter: function (other, self) {
        var pos = this.node.getPosition();
        var gameComponent = cc.find("Canvas").getComponent("Game");
        if (gameComponent) {
            gameComponent.createflash(pos);
            if (window.Global && typeof window.Global.loseTTL === 'function') {
                window.Global.loseTTL();
            }
            if (window.Global && window.Global.live < 0) {
                window.Global.live = 0;
                gameComponent.createboom(pos);
                this.scheduleOnce(function () { cc.director.loadScene('Game Over'); }, 0.4);
                this.scheduleOnce(function () { this.node.active = false; }, 0.5);
            }
        }
    },

    start () {
        this.bulletTime = 0.2;
        this.duckTime = 5;
        this.flyTime = 5;
    },

    update(dt) {
        if (this.isShoot) {
            this.bulletTime -= dt;
            if (this.bulletTime <= 0) {
                this.bulletTime = 0.2;
                let bulletNode_1 = cc.instantiate(this.bullet);
                let bulletNode_2 = cc.instantiate(this.bullet);
                bulletNode_1.y = this.node.y + 40;
                bulletNode_1.x = this.node.x - 55;
                bulletNode_2.y = this.node.y + 40;
                bulletNode_2.x = this.node.x + 55;
                if (this.BulletManager) {
                    this.BulletManager.addChild(bulletNode_1);
                    this.BulletManager.addChild(bulletNode_2);
                }
                if (this.bulletAudio) {
                    cc.audioEngine.playEffect(this.bulletAudio, false);
                }
            }
        }

        this.duckTime -= dt;
        if (this.duckTime <= 0) {
            this.duckTime = 5;
            let duckNode = cc.instantiate(this.duck);
            duckNode.y = 960 / 2;
            duckNode.x = Math.random() * 640 - 640 / 2;
            if (this.EnemyController) {
                this.EnemyController.addChild(duckNode);
            }
        }

        this.flyTime -= dt;
        if (this.flyTime <= 0) {
            this.flyTime = 5;
            let flyNode = cc.instantiate(this.fly);
            flyNode.y = 960 / 2;
            flyNode.x = Math.random() * 640 - 640 / 2;
            if (this.EnemyController) {
                this.EnemyController.addChild(flyNode);
            }
        }
    },
});