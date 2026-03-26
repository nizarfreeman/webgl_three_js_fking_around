import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
//fov, aspect ratio, planes
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// add a rendered and append an implicit canvas in the html.
renderer.setSize( window.innerWidth, window.innerHeight ); // the canvas will cover the whole scree
document.body.appendChild( renderer.domElement );

// declare a cube.
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

const geometryy = new THREE.ConeGeometry( 1, 2, 4 );
const materiall = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const pyramid = new THREE.Mesh( geometryy, materiall );



// add and move the cam out to see it, since all objects gets rendered at the origin by default
scene.add( cube );
scene.add( pyramid );
cube.position.y = -2
pyramid.position.y = 2;
camera.position.z = 5;

// rendering loop
// function animate(time)
// {
//     renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);

// rendering loop with animation
function animate(time)
{
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    pyramid.rotation.x = time / 2000;
    pyramid.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
