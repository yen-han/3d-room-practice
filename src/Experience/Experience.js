import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";

import Objects from "./Objects/Objects";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.objects = new Objects();

    this.time.on("update", () => this.update());
    this.sizes.on("resize", () => {
      this.resize();
    });
  }
  resize = () => {
    this.camera.resize();
    this.renderer.resize();
  };
  update = () => {
    this.camera.update();
    this.renderer.update();
  };
}
