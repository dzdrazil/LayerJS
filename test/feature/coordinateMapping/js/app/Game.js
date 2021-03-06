define([
    'layer/RunLoop',
    'layer/Scene',
    'layer/RenderableGroup',
    'app/Rectangle'
], function(
    RunLoop,
    Scene,
    RenderableGroup,
    Rectangle
) {
    'use strict';
    
    var rect;
    var rotation = 0;
    var stepSize = Math.PI / 8000;
    
    var Game = function() {
        this.init();
    };
    
    Game.prototype.init = function() {
        this.loop = new RunLoop();
        
        var layerName = 'main';
        
        var viewport = document.getElementById('js-viewport');
        var scene = this.scene = new Scene(viewport, 800, 600);
        var stage = scene.getStage();
        
        stage.createAndAppendLayer(layerName);
        stage.enableCSSAcceleration();
        
        var firstRect = null;
        var group = window.group = new RenderableGroup(20, 100);
        for (var i = 0; i < 3; i++) {
            rect = new Rectangle(Math.random() * 400, Math.random() * 400, Math.random() * 200, Math.random() * 200);
            if (firstRect === null) {
                firstRect = rect;
            }
            
            group.addChild(rect);
        }
        
        scene.addChild(group);
        
        var position = [firstRect.x, firstRect.y];
        position = firstRect.toWorldCoordinates(position);
        var region = firstRect.getRegion();
        
        var newRect = new Rectangle(region.x, region.y, region.halfWidth, region.halfHeight);
        scene.addChild(newRect);
        
        window.newRect = newRect;
        window.firstRect = firstRect;
        
        window.scene = scene;
        this.setupHandlers();
        
        this.loop.addCall(this.updateCycle, RunLoop.UPDATE_CYCLE);
        this.loop.addCall(this.renderCycle, RunLoop.RENDER_CYCLE);
    };
    
    Game.prototype.setupHandlers = function() {
        this.updateCycle = this.update.bind(this);
        this.renderCycle = this.render.bind(this);
    };
    
    Game.prototype.start = function() {
        this.loop.start();
    };
    
    Game.prototype.stop = function() {
        this.loop.stop();
    };
    
    Game.prototype.update = function(elapsed) {
        rect.setRotation(rotation);
        rotation += stepSize * elapsed;
        
        this.scene.update();
    };
    
    Game.prototype.render = function() {
        scene.render();
    };
    
    return Game;
});