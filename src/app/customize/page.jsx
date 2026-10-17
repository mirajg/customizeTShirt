
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Center, Decal, useGLTF, useTexture } from '@react-three/drei';
import CustomButton from '@/components/CustomButton.jsx';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Link from 'next/link';

function LogoDecal({ logo, shirtMesh }) {
    const texture = useTexture(logo);
    const shirtMeshRef = useRef(shirtMesh);
    const mirroredTexture = useMemo(() => {
        const result = texture.clone();
        result.wrapS = THREE.RepeatWrapping;
        result.repeat.x = -1;
        result.offset.x = 1;
        result.needsUpdate = true;
        return result;
    }, [texture]);

    useEffect(() => () => mirroredTexture.dispose(), [mirroredTexture]);

    return (
        <Decal
            mesh={shirtMeshRef}
            position={[0, 0.2, 0.42]}
            rotation={Math.PI}
            scale={[0.42, 0.42, 0.42]}
        >
            <meshStandardMaterial
                map={mirroredTexture}
                transparent
                alphaTest={0.05}
                roughness={0.75}
                metalness={0}
                polygonOffset
                polygonOffsetFactor={-1}
            />
        </Decal>
    );
}

function ShirtModel({ isMobile, shirtColor, selectedLogo }) {
    const tShirtRef = useRef(null);
    const { scene } = useGLTF('/model/boyModel.glb');
    const shirtMesh = useMemo(() => {
        let mesh = null;
        scene.traverse((child) => {
            if (child.isMesh && !mesh) mesh = child;
        });
        return mesh;
    }, [scene]);

    // Smooth subtle movement
    useFrame((state) => {
        if (tShirtRef.current) {
            tShirtRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
            tShirtRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.02;
        }
    });

    // Dynamically change color of the shirt mesh
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(shirtColor);
            }
        });
    }, [scene, shirtColor]);

    return (
        <Center scale={isMobile ? 0.75 : 1}>
            <group ref={tShirtRef}>
                <primitive object={scene} />
                {selectedLogo && shirtMesh && <LogoDecal logo={selectedLogo} shirtMesh={shirtMesh} />}
            </group>
        </Center>
    );
}

export default function CustomizePage() {
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [selectedLogo, setSelectedLogo] = useState(null);

    // Pre-made design samples (store these in public/images/ or assets)
    const sampleLogos = [
        '/images/logo1.png',
        '/images/logo2.png',
        '/images/logo3.png',
    ];


    // Handle user custom logo upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            console.log(logoUrl); // For debugging
            setSelectedLogo(logoUrl);
        }
    };

    const handleDownloadScreenshot = () => {
        // 1. Find the canvas element rendered by React Three Fiber
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        // 2. Convert canvas to a data URL (PNG format)
        const dataUrl = canvas.toDataURL('image/png');

        // 3. Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'my-custom-shirt.png'; // File name for the download

        // 4. Simulate a click to start download and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='absolute top-1 right-1 z-10'>
                <CustomButton label={"Home"} navigate={"/"} />
            </div>

            <div className="relative w-full h-[100dvh] bg-[url(/images/bg.jpg)] text-white overflow-hidden">
                {/* 3D Canvas */}
                <div className="w-full h-full">
                    <Canvas camera={{ position: [0, 0, isMobile ? 4.5 : 3], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
                        {/* Soft neutral ambient light to fill in shadows */}
                        <ambientLight intensity={0.7} />

                        {/* Directional light provides shape, highlights, and 3D depth */}
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />

                        <Suspense fallback={null}>
                            <ShirtModel isMobile={isMobile} shirtColor={shirtColor} selectedLogo={selectedLogo} />
                        </Suspense>

                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            minPolarAngle={Math.PI / 2}
                            maxPolarAngle={Math.PI / 2}
                        />
                    </Canvas>

                </div>

                {/* Customize Button (Triggers Popup) */}
                <div className="absolute bottom-10 flex gap-1 flex-col sm:flex-row justify-center items-center left-1/2 -translate-x-1/2 z-10">
                    <CustomButton
                        label="Customize"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <CustomButton
                        label="Download Design"
                        onClick={handleDownloadScreenshot}
                    />
                </div>

                {/* Customization Popup Modal */}
                {/* Modal Backdrop with smooth fade */}
                <div className={`fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}>

                    {/* Modal Box with smooth scale & slide-up effect */}
                    <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative text-slate-100 transition-all duration-300 transform ${isModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
                        }`}>

                        {/* Header & Close Button */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Customize T-Shirt</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Personalize color and artwork in real time</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* SECTION 1: COLOR SELECTION */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                T-Shirt Base Color
                            </label>
                            <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-800">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-700 shadow-inner cursor-pointer">
                                    <input
                                        type="color"
                                        value={shirtColor}
                                        onChange={(e) => {
                                            setShirtColor(e.target.value);
                                        }}
                                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer border-0 p-0 bg-transparent"
                                    />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold block text-white">Custom Picker</span>
                                    <span className="text-xs font-mono text-indigo-400 uppercase">{shirtColor}</span>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: DESIGN / LOGO SELECTION */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                Preset Artwork
                            </label>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {sampleLogos.map((logo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedLogo(logo);
                                            setIsModalOpen(false); // Closes instantly after picking logo
                                        }}
                                        className={`aspect-square rounded-2xl border-2 overflow-hidden bg-slate-800/80 p-2 transition-all hover:scale-[1.03] flex items-center justify-center ${selectedLogo === logo
                                            ? 'border-indigo-500 ring-4 ring-indigo-500/20 bg-indigo-950/30'
                                            : 'border-slate-800 hover:border-slate-700'
                                            }`}
                                    >
                                        <img src={logo} alt={`Sample ${index + 1}`} className="w-full h-full object-contain filter drop-shadow" />
                                    </button>
                                ))}
                            </div>

                            {/* Custom File Upload Box */}
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Upload Custom Design
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 hover:border-indigo-500/50 transition-all group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-6 h-6 mb-2 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-xs text-slate-300 font-medium">Click to upload image <span className="text-slate-500 font-normal">(PNG, JPG)</span></p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        handleFileUpload(e);
                                        setIsModalOpen(false); // Closes instantly after uploading
                                    }}
                                    className="hidden"
                                />
                            </label>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
