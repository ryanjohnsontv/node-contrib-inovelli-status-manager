module.exports = function(RED) {
  function InovelliStatusManager(config) {
      RED.nodes.createNode(this, config);
      var node = this;
      const { 
        nodeid,
        color,
        level,
        duration,
        display,
      } = config;

      this.nodeid = nodeid;
      this.color = parseInt(color, 10);
      this.level = parseInt(level, 10);
      this.duration = duration;
      this.display = parseInt(display, 10);

      node.on('input', msg => {
          const { 
            nodeid,
            color: presetColor,
            level: presetLevel,
            duration: presetDuration,
            display: presetDisplay,
          } = node;
          const { payload } = msg;

          const color = payload.color || presetColor
          const level = (payload.level || presetLevel) * 255;
          const duration = (payload.duration ||  presetDuration) * 65536;
          const display = (payload.display || presetDisplay) * 16777216;
          const nodeId = payload.nodeId || nodeid
          const value = color + level + duration + display;
          const data = {
            node_id: nodeId,
            parameter: 8,
            size: 4,
            value
        }
        
        node.status({ text: `Sent color: ${color}` });
        node.send({
          ...msg,
          payload: { data }
        });
      });
  }
  RED.nodes.registerType('inovelli-status-manager',InovelliStatusManager);
}