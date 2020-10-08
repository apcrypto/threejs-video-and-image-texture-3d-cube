// standard global variables
var scene, camera, renderer, loader, geometry, light;
// custom global variables
var materials, video, videoImage, videoImageContext, videoTexture, cube;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

video = document.createElement("video");
video.setAttribute("muted", "");
video.setAttribute("playsinline", "");
video.autoplay = true;
video.loop = true;
video.muted = true;
video.src = "textures/video.mp4";

videoImage = document.createElement("canvas");

videoImageContext = videoImage.getContext("2d");
videoImageContext.fillStyle = "#000000";
videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

loader = new THREE.TextureLoader();

materials = [
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_Camouflage0018_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({ map: videoTexture }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_Snow0158_9_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_WoodChips0040_1_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_Gravel0160_1_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_Ice0034_1_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_Snow0158_9_seamless_S.jpg"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("textures/TexturesCom_WoodChips0040_1_seamless_S.jpg"),
  }),
];

geometry = new THREE.BoxGeometry(2.2, 3.2, 2.2);
cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

function onUpdate() {
  cube.position.x = position.x;
  cube.position.y = position.y;
}

var position = { x: 0.0, y: 0.0 };

var tweenToPosOne = new TWEEN.Tween(cube.rotation)
  .to({ x: 0.0, y: 1.56 }, 3000)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(onUpdate);
var tweenToPosTwo = new TWEEN.Tween(cube.rotation)
  .to({ x: 0.0, y: 3.12 }, 3000)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(onUpdate);
var tweenToPosThree = new TWEEN.Tween(cube.rotation)
  .to({ x: 0.0, y: 4.68 }, 3000)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(onUpdate);
var tweenToPosFour = new TWEEN.Tween(cube.rotation)
  .to({ x: 0.0, y: 6.28 }, 3000)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onUpdate(onUpdate);

tweenToPosOne.chain(tweenToPosTwo);
tweenToPosTwo.chain(tweenToPosThree);
tweenToPosThree.chain(tweenToPosFour);
tweenToPosFour.chain(tweenToPosOne);

tweenToPosOne.start();

camera.position.z = 5;

light = new THREE.AmbientLight("rgb(255,255,255)"); // soft white light
scene.add(light);

window.addEventListener("resize", onResize, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  render();
}

function render() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    video.play();
    videoImageContext.drawImage(video, 0, 0);
    if (videoTexture) videoTexture.needsUpdate = true;
  }
  renderer.render(scene, camera);
}

animate();
