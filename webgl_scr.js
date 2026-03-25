import { initBuffers } from "./init_buffer.js";
import { drawScene } from "./draw.js";

main();

function initShaderProgram(gl, vsSource, fsSource)
{
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        alert(`Unable to initialize shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }
    return shaderProgram;
}

function loadShader(gl, type, source)
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function main()
{
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main()
        {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    const fsSource = `
        void main()
        {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
        }
    `;

    const canvas = document.querySelector("#canvas_");
    const gl = canvas.getContext("webgl");
    if (!gl) { alert("WebGL not supported"); return; }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo =
    {
        program: shaderProgram,
        attribLocations:
        {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations:
        {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix:  gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    const buffers = initBuffers(gl);

    let rotation = 0.0;
    let lastTime = 0;

    function render(now)
    {
        now *= 0.001; // convert to seconds
        const delta = now - lastTime;
        lastTime = now;

        rotation += delta; // 1 radian per second

        drawScene(gl, programInfo, buffers, rotation);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}