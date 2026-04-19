import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
//fov, aspect ratio, planes
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set( 0, 0, 15 );
camera.lookAt( 0, 0, 0 );
const renderer = new THREE.WebGLRenderer();

//orbit
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.1;
controls.maxDistance = 1500;
controls.zoomSpeed = 2.0;
controls.screenSpacePanning = true;

// add a rendered and append an implicit canvas in the html.
renderer.setSize(window.innerWidth, window.innerHeight); // the canvas will cover the whole scree
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(3, 32, 32);
const material = new THREE.MeshNormalMaterial({ flatShading: true });
//const ball = new THREE.Mesh(geometry, material);
//scene.add(ball);

// function addBall()
// {
//     const ball = new THREE.Mesh(geometry, material);
//     ball.position.x = THREE.MathUtils.randFloatSpread(50);
//     ball.position.y = THREE.MathUtils.randFloatSpread(50);
//     ball.position.z = THREE.MathUtils.randFloatSpread(50);
//     ball.rotation.x = THREE.MathUtils.randFloatSpread(Math.PI);
//     return  ball;
// }


// rejection simpling
function isOverlapping(newPos, placedBalls, minDist)
{
    for (const ball of placedBalls)
    {
        const dist = newPos.distanceTo(ball.position);
        if (dist < minDist)
            return (true);
    }
    return (false);
}

function addBall(placedBalls, radius, spread, maxAttempts = 100)
{
    const minDist = radius * 2;
    for (let index = 0; index < maxAttempts; index++)
    {
        const pos = new THREE.Vector3(THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread));
        if (!isOverlapping(pos, placedBalls, minDist))
        {
            const ball = new THREE.Mesh(geometry, material);
            ball.position.copy(pos);
            ball.userData.spin = 
            {
                x: THREE.MathUtils.randFloatSpread(0.02),
                y: THREE.MathUtils.randFloatSpread(0.02),
                z: THREE.MathUtils.randFloatSpread(0.02),
            };

            ball.userData.spin = 
            {
              x: THREE.MathUtils.randFloatSpread(0.02),
              y: THREE.MathUtils.randFloatSpread(0.02),
              z: THREE.MathUtils.randFloatSpread(0.02),
            };
            ball.userData.velocity = new THREE.Vector3
            (
              THREE.MathUtils.randFloatSpread(0.05),
              THREE.MathUtils.randFloatSpread(0.05),
              THREE.MathUtils.randFloatSpread(0.05),
            );

            return (ball);
        }
    }
    return (null);
}

let num = 20;
const placedBalls = [];

for (let index = 0; index < num; index++)
{
    let ball = addBall(placedBalls, 1, 100);
    if (ball)
    {
        scene.add(ball);
        placedBalls.push(ball);
    }
}

const BOUND = 50;

function animate()
{
    requestAnimationFrame(animate);
    for (const ball of placedBalls)
    {
        ball.rotation.x += ball.userData.spin.x;
        ball.rotation.y += ball.userData.spin.y;
        ball.rotation.z += ball.userData.spin.z;

        ball.position.add(ball.userData.velocity);

        if (ball.position.x >  BOUND) ball.position.x = -BOUND;
        if (ball.position.x < -BOUND) ball.position.x =  BOUND;
        if (ball.position.y >  BOUND) ball.position.y = -BOUND;
        if (ball.position.y < -BOUND) ball.position.y =  BOUND;
        if (ball.position.z >  BOUND) ball.position.z = -BOUND;
        if (ball.position.z < -BOUND) ball.position.z =  BOUND;
    }
    controls.update();
    renderer.render(scene, camera);
}

animate();