cc.Class({
    extends: cc.Component,

    properties: {
        // === 新增属性开始 ===
        // 敌人的子弹预制体，需要在编辑器里拖拽关联
        enemyBulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 子弹发射频率（秒），比如 2.0 代表每 2 秒发射一次
        fireRate: 2.0,
        // === 新增属性结束 ===
    },

    onLoad: function () {
        // 防止重复加分的死亡标记
        this.isDead = false;
        
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;

        // === 新增代码开始 ===
        // 初始化发射子弹的计时器
        // 我们给一个随机的初始值，这样所有敌机就不会在同一时间开火
        this.fireTimer = Math.random() * this.fireRate;
        // === 新增代码结束 ===
    },

    onCollisionEnter: function (other, self) {
        // 如果已经死了，直接返回
        if (this.isDead) {
            return;
        }

        // 和玩家子弹碰撞的逻辑 (这部分我们之前已经修复好了)
        if (other.node.group === 'bullet') { 
            this.isDead = true;

            const playerNode = cc.find("Canvas/player");
            if (playerNode) {
                const playerController = playerNode.getComponent('playerController');
                if (playerController && typeof playerController.addScore === 'function') {
                    playerController.addScore();
                }
            }
            
            other.node.destroy();
            this.node.destroy();
        }
    },

    // === 新增函数开始 ===
    fireBullet: function() {
        // 检查子弹预制体是否已经设置
        if (!this.enemyBulletPrefab) {
            cc.log("Enemy bullet prefab is not set!");
            return;
        }

        // 创建子弹实例
        let bullet = cc.instantiate(this.enemyBulletPrefab);
        
        // 将子弹添加到和敌机相同的父节点下（通常是 Canvas 或一个专门的管理节点）
        this.node.parent.addChild(bullet);

        // 设置子弹的初始位置（从敌机正下方发射）
        // 这里假设子弹锚点在中心 (0.5, 0.5)
        let bulletPos = this.node.position;
        bullet.setPosition(bulletPos.x, bulletPos.y - 50); // y-50 是为了让子弹从飞机头下方出来
    },
    // === 新增函数结束 ===

    update: function (dt) {
        // === 新增代码开始 ===
        // 发射子弹的计时器逻辑
        if (!this.isDead) { // 只有活着的敌机才能发射子弹
            this.fireTimer -= dt;
            if (this.fireTimer <= 0) {
                // 时间到了，发射子弹
                this.fireBullet();
                // 重置计时器
                this.fireTimer = this.fireRate;
            }
        }
        // === 新增代码结束 ===

        // 保留你原来的出屏销毁逻辑
        var a = this.node.getComponent(cc.Animation);
        if(a){
            var b = a.getAnimationState("Space1_animation");
        }
        if (this.node.y < -320) {
            this.node.destroy();
        }
    },
});