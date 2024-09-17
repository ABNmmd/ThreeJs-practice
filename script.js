import * as THREE from 'three';

const canvas = document.getElementById(canvas);
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);

const scene = new THREE.scene();

const geometry = THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

