import { initBuffers } from "./init_buffer.js";
import { drawScene } from "./draw.js";

main();

function initShaderProgram(gl, vsSource, fsSource)
{
    // loading both shaders, each with its type. "vertex and fragment"
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    // and assembling the program through attaching both shaders and linking them
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // the webGL context provides linking and compiling feedbacks through LINK_STATUS n COMPILE_STATUS constants
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        alert(`Unable to initialize shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }
    return shaderProgram;
}

// here we get each shader source, compile it and return to initShaderProgram(), "loaded shader"
function loadShader(gl, type, source)
{
    // the t
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
    // supplying vertix shader n fragmet shader in GLSL/webGL GLSL/OpenGL ES Shading Language,
    // which is used for writing shaders that will run on the gpu
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

    // grabing the canvas element from index.html
    const canvas = document.querySelector("#canvas_");
    // and getting the webgl context
    const gl = canvas.getContext("webgl");
    if (!gl) { alert("WebGL not supported"); return; }

    // making the shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    // the programInfo is basically a control panel object or let's say an object where we store all the data
    // needed for the render process, by gathering the needed data onece n providing it once only, so it can
    // be used without any further overhead done by each step lookup.
    const programInfo =
    {
        // our shader program we made earlier, gl.useProgram(programInfo.program)
        program: shaderProgram,
        // storing our shader attribute vec4 aVertexPosition.
        attribLocations:
        {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        // and uniforms too
        uniformLocations:
        {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix:  gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    const buffers = initBuffers(gl);

    let rotation = 0.0;
    let lastTime = 0;

    // this final block basically do two things:
    // time rate rendering, unlike frame rate rendering which generates a specific number of frames per second
    // time rate rendering is based on a timestamp, each frame is generated when a specific timestamp is passed.
    // we do it here by getting delta which is the difference between last time (the current we capture when entering)
    // the block, and current time)
    // recursive call to function render() that will gonna keep rendering the object's infinite animation.
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