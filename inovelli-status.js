module.exports = function (RED) {
  var convert = require("color-convert");
  function InovelliStatusManager(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    const { zwave, entityid, nodeid, color, level, duration, effect, switchtype } = config;

    this.zwave = zwave;
    this.entityid = entityid;
    this.nodeid = parseInt(nodeid, 10);
    this.color = color;
    this.level = parseInt(level, 10);
    this.duration = parseInt(duration, 10);
    this.effect = parseInt(effect, 10);
    this.switchtype = parseInt(switchtype, 10);

    node.on("input", (msg) => {
      const {
        zwave: presetZwave,
        entityid,
        nodeid,
        color: presetColor,
        level: presetLevel,
        duration: presetDuration,
        effect: presetEffect,
        switchtype: presetSwitchtype,
      } = node;
      const { payload } = msg;

      var color = payload.color || presetColor;
      if (isNaN(parseInt(color)) === false && typeof color != "object") {
        color = parseInt(color);
      }
      var rgb = [255, 0, 0];
      var inputconvert = function (color) {
        if (Array.isArray(color) && typeof color === "object") {
          if (color.length === 3) {
            rgb = color;
          } else {
            node.error(`Check your RGB values: ${color}`);
          }
        } else if (typeof color === "string") {
          if (color.startsWith("#") === true) {
            rgb = convert.hex.rgb(color);
          } else {
            color = color.replace(" ", "").toLowerCase();
            rgb = convert.keyword.rgb(color);
          }
        } else if (typeof color === "number") {
          if (color >= 0 && color <= 360) {
            let conv_hsv = [color, 100, 100];
            rgb = convert.hsv.rgb(conv_hsv);
          } else {
            node.error(`Incorrect Hue Value: ${color}`);
          }
        }
        return rgb;
      };
      inputconvert(color);
      if (rgb === undefined) {
        node.error(`Incorrect Color: ${color}`);
      }
      const hsl = convert.rgb.hsl(rgb);
      const keyword = convert.rgb.keyword(rgb);
      color = parseInt((hsl[0] * (17 / 24)).toFixed(0));
      const level = payload.level || presetLevel;
      const duration = payload.duration || presetDuration;
      const effect = payload.effect || presetEffect;
      const zwave = payload.zwave || presetZwave;
      const switchtype = payload.switchtype || presetSwitchtype;
      if (zwave === "zwave_js") {
        const entity_id = payload.entity_id || entityid;
        if (entity_id === undefined || entity_id === "") {
          node.send({
            ...msg,
            payload: { data:{parameter: switchtype,value: level} }
          });
        } else {
          node.send({
            ...msg,
            payload: { target:{ entity_id }, data:{parameter: switchtype,value: level} }
          });
        }
      } else if (zwave === "ozw") {
        const value = color + (level * 255) + (duration * 65536) + (effect * 16777216);
        const nodeId = payload.node_id || nodeid;
        const node_id = nodeId ? { node_id: nodeId } : {};
        node.send({
          ...msg,
          payload: { ...node_id, parameter: switchtype, value },
        });
      }

      node.status({ text: `Sent color: ${keyword}` });
    });
  }
  RED.nodes.registerType("inovelli-status-manager", InovelliStatusManager);
};
