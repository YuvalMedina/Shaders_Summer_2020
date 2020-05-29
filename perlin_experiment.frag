#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform float u_time;       // Time in seconds since load
uniform vec2 u_mouse;       // Mouse position


vec2 rotate(vec2 vec, float theta){
    return mat2(cos(theta), sin(theta),
                -sin(theta), cos(theta))
                * vec;
}

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// circle border:
float circle(in vec2 _st, in vec2 center, in float _radius){
    float dist = length(_st - center);
    if(dist > _radius){
        return smoothstep(_radius-(_radius*0.02),
                    _radius+(_radius*0.02),
                    dist);
    }
    else{
        return 1.-smoothstep(_radius-(_radius*0.02),
                    _radius+(_radius*0.02),
                    dist);
    }
}

vec2 permute(in vec2 _st, vec2 center){
    vec2 adj = _st - center;
    float theta = atan(adj.x, adj.y);
    if(adj.x == 0.) theta = 0.;
    return _st + _st * noise(vec2(theta*5.,sin(u_time)))/15.;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float color = circle(permute(st, vec2(.5)), vec2(.5), .2);
    
    gl_FragColor = vec4(vec3(color), 1.0);
}