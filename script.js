import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 2;
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

const cube = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight(0xFFFFFF, 3);
light.position.set(-1, 2, 4);

scene.add(cube);
scene.add(light);

function render(time) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);