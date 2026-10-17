
# 👕 3D T-Shirt Customizer Web App

An interactive, production-ready 3D t-shirt customizer web app built with **Next.js (App Router)**, **React Three Fiber (R3F)**, **Three.js**, and **Tailwind CSS**. 

Hosted on GitHub at `mirajg/customizeTShirt`, this application allows users to view a 3D t-shirt model in real-time, pick custom colors, select preset artwork, upload custom logos, and enjoy smooth responsive animations.

---

## ✨ Features

* **Interactive 3D Viewport:** Render and interact with a `.glb` 3D t-shirt model with smooth rotation limits (constrained to the Y-axis) and continuous floating animations.
* **Real-Time Color Customization:** Instantly change the t-shirt base color using an integrated color picker.
* **Preset & Custom Artwork:** Choose from built-in sample logos or upload your own custom design images (`.png`, `.jpg`) dynamically via texture mapping.
* **Smooth UI/UX:** Polished Tailwind CSS modals with smooth fade-in and scale transitions.
* **Responsive Design:** Optimized for both desktop and mobile viewports.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **3D Library:** [Three.js](https://threejs.org/) / [React Three Fiber](https://github.com/pmndrs/react-three-fiber) / [Drei](https://github.com/pmndrs/drei)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** Vercel

---

## 🚀 Getting Started Locally

Follow these steps to run the project locally on your machine:

### Clone the Repository
```bash
1. git clone [https://github.com/mirajg/customizeTShirt.git](https://github.com/mirajg/customizeTShirt.git)
2. cd customizeTShirt
3. npm install
4. npm run dev