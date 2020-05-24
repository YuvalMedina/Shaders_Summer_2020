#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform float u_time;       // Time in seconds since load
uniform vec2 u_mouse;       // Mouse position

#define BLACK_COL vec3(32,43,51)/255.
#define WHITE_COL vec3(235,241,245)/255.
#define RED vec3(230, 51, 40)/255.

#define PI2 6.2831852
#define PI 3.1415926
#define PI_2 1.5707963
#define PI_4 0.78539815
#define PHI 0.61803398875
#define radius 0.3

vec3 mouseTransform(vec3 color, vec2 pos, vec2 mouse){
    // distance from center of color change
    float distance = length(mouse - pos) - radius;
    return color - vec3(distance,distance,0);
}

void main(){
    vec2 mouse = u_mouse/u_resolution;
    vec2 pos = gl_FragCoord.xy/u_resolution;

    vec3 color = mouseTransform(RED, pos, mouse);
    gl_FragColor = vec4(color,1.);
}