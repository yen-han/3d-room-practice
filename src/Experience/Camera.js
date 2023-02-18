import * as THREE from "three";
import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // console.log(this.experience, this.sizes, this.scene, this.canvas);

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      100
    );
    this.perspectiveCamera.position.z = 3;
    this.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (this.sizes.frustrum * -this.sizes.aspect) / 2,
      (this.sizes.frustrum * this.sizes.aspect) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -100,
      100
    );
    // this.perspectiveCamera.position.z = 3;
    this.scene.add(this.orthographicCamera);
  }
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (this.sizes.frustrum * -this.sizes.aspect) / 2;
    this.orthographicCamera.right =
      (this.sizes.frustrum * this.sizes.aspect) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
  update() {}
}
