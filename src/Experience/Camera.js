import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // console.log(this.experience, this.sizes, this.scene, this.canvas);

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      100
    );
    this.perspectiveCamera.position.x = 29; //10;
    this.perspectiveCamera.position.y = 14; //5;
    this.perspectiveCamera.position.z = 5;
    this.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (this.sizes.frustrum * -this.sizes.aspect) / 2,
      (this.sizes.frustrum * this.sizes.aspect) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -10,
      10
    );
    this.scene.add(this.orthographicCamera);

    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    this.scene.add(this.helper);

    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
    // this.perspectiveCamera.position.z = 3;
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
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
  update() {
    this.controls.update();
    this.helper.matrixWorldNeedsUpdate = true;
    this.helper.update();
    this.helper.position.copy(this.orthographicCamera.position);
    this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
