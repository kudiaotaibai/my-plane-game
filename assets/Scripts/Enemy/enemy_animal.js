cc.Class({
    extends: cc.Component,

    properties: {
        scoreValue: 10,  // 每个敌人的得分，可在编辑器中调整
        hitEffect: cc.Prefab,  // 受击效果预制体
        explosionEffect: cc.Prefab,  // 爆炸效果预制体
    },

    onLoad:function(){
        this.speed = 2;
        this.BulletManager = cc.find("Canvas/BulletManager");
        this.isDestroyed = false;  // 新增状态标记
    },

    update(dt) {
        if (this.isDestroyed) return;  // 已销毁则不再更新
        
        // 敌人向下移动
        this.node.y -= this.speed;
        
        // 边界检测
        if (this.node.y <= -960) {
            this.destroyEnemy();
            return;
        }
        
        // 遍历子弹检测碰撞
        for (let bullet of this.BulletManager.children) {
            if (!bullet.active) continue;  // 跳过非激活子弹
            
            // 计算敌人与子弹的距离
            const dx = Math.abs(this.node.x - bullet.x);
            const dy = Math.abs(this.node.y - bullet.y);
            
            // 碰撞判定
            if (dx <= 50 && dy <= 10) {
                this.takeDamage(bullet);
                break;  // 避免重复计分
            }
        }
    },

    takeDamage(bullet) {
        this.isDestroyed = true;
        this.speed = 0;  // 停止移动
        
        // 播放受击与爆炸效果
        this.playHitEffects();
        
        // 增加分数（传递固定分值）
        window.Global.gainScore(this.scoreValue);
        
        // 延迟销毁敌人与子弹，确保效果显示
        this.scheduleOnce(() => {
            this.destroyEnemy();
            if (bullet && bullet.isValid) bullet.destroy();
        }, 0.2);
    },

    playHitEffects() {
        // 创建受击效果
        if (this.hitEffect) {
            const effect = cc.instantiate(this.hitEffect);
            effect.setPosition(this.node.position);
            this.node.parent.addChild(effect);
            this.scheduleOnce(() => {
                if (effect && effect.isValid) effect.destroy();
            }, 0.3);
        }
        
        // 创建爆炸效果
        if (this.explosionEffect) {
            const explosion = cc.instantiate(this.explosionEffect);
            explosion.setPosition(this.node.position);
            this.node.parent.addChild(explosion);
            this.scheduleOnce(() => {
                if (explosion && explosion.isValid) explosion.destroy();
            }, 0.5);
        }
    },

    destroyEnemy() {
        this.isDestroyed = true;
        this.node.destroy();
    },
});