import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useScroll, MeshTransmissionMaterial, Stars, Points, PointMaterial, Float, Sparkles, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';
import { SKILLS } from '../constants';
const SkillObject = ({
  skill,
  position,
  onSelect
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });
  return <mesh ref={ref} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => {
        setActive(!active);
        onSelect && onSelect(skill);
      }} scale={active ? 1.5 : 1}>
            <icosahedronGeometry args={[0.1, 2]} />
            <meshStandardMaterial color={hovered ? '#a78bfa' : '#6366f1'} emissive={hovered ? '#a78bfa' : '#4f46e5'} emissiveIntensity={hovered ? 0.8 : 0.4} metalness={0.8} roughness={0.2} />
            {hovered && <Text position={[0, 0.15, 0]} fontSize={0.08} color="white" anchorX="center" anchorY="middle">
                    {skill}
                </Text>}
        </mesh>;
};
function FloatingParticles({
  count = 200
}) {
  const ref = useRef(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), {
    radius: 2.5
  }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });
  return <group ref={ref}>
            <Points positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#818cf8" size={0.018} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>;
}
export const Experience = ({ onSelectSkill, quality = 'high' }) => {
  const scroll = useScroll();
  const groupRef = useRef(null);
  const crystalRef = useRef(null);
  const light1Ref = useRef(null);
  const light2Ref = useRef(null);
  const skillObjects = useMemo(() => {
    const phi = Math.PI * (3. - Math.sqrt(5.)); // golden angle in radians
    return SKILLS.map((skill, i) => {
      const y = 1 - i / (SKILLS.length - 1) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      return {
        skill,
        position: [x, y, z]
      };
    });
  }, []);
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const offset = scroll.offset;

    // Animate group rotation based on scroll AND mouse parallax
    const targetRotationY = offset * -Math.PI * 2 + state.pointer.x * 0.4;
    const targetRotationX = Math.sin(offset * Math.PI) * 0.5 - state.pointer.y * 0.4;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotationY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotationX, 4, delta);

    // Cinematic camera movement
    const zoomLevel = 1 - Math.sin(offset * Math.PI) * 0.4;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 3 * zoomLevel, 4, delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, Math.sin(offset * Math.PI * 1.5) * -0.7, 4, delta);
    state.camera.lookAt(0, 0, 0);

    // Pulsating crystal with scroll-based distortion
    crystalRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.05);
    const material = crystalRef.current.material;
    material.distortion = THREE.MathUtils.damp(material.distortion, Math.sin(offset * Math.PI) * 0.25, 4, delta);
    material.chromaticAberration = THREE.MathUtils.damp(material.chromaticAberration, Math.pow(offset, 2) * 0.1, 4, delta);

    // Dynamic "breathing" lights
    if (light1Ref.current) light1Ref.current.intensity = 1.5 + Math.sin(time * 0.5) * 0.5;
    if (light2Ref.current) light2Ref.current.intensity = 2.5 + Math.sin(time * 0.7) * 1.5;
  });
  return <>
            <ambientLight intensity={1.0} />
            <pointLight ref={light1Ref} position={[10, 10, 10]} intensity={2} />
            <pointLight ref={light2Ref} position={[-10, -10, -5]} color="#4f46e5" intensity={3} />
            <Stars radius={100} depth={quality === 'low' ? 40 : 50} count={quality === 'low' ? 2000 : 5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={quality === 'low' ? 40 : 80} size={2} scale={8} speed={0.4} color="#63e" />
            <FloatingParticles count={quality === 'low' ? 100 : 200} />

            <group ref={groupRef}>
                <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
                <mesh ref={crystalRef}>
                    <icosahedronGeometry args={[0.8, 8]} />
                    <MeshTransmissionMaterial backside samples={10} thickness={0.2} chromaticAberration={0.06} anisotropy={0.1} distortion={0.1} distortionScale={0.1} temporalDistortion={0.2} iridescence={1} iridescenceIOR={1.2} iridescenceThicknessRange={[0, 1400]} color="#818cf8" />
                    <Trail width={2} color={new THREE.Color('#6366f1')} length={1} decay={0.5} attenuation={(t) => t * t} />
                </mesh>
                </Float>

                {skillObjects.map(({
        skill,
        position
      }, index) => <SkillObject key={index} skill={skill} position={position} onSelect={onSelectSkill} />)}
            </group>

            {/* Post-processing bloom and subtle chromatic aberration for a neon look */}
            <EffectComposer disableNormalPass>
              <Bloom mipmapBlur intensity={quality === 'low' ? 0.4 : 0.6} luminanceThreshold={0.2} radius={0.8} />
              <ChromaticAberration offset={[0.0008, 0.0008]} />
              {quality === 'high' && <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={1.4} height={480} />}
              <Vignette eskil={false} offset={0.2} darkness={0.5} />
            </EffectComposer>
        </>;
};
