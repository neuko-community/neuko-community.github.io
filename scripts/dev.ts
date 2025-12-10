import { spawn } from "bun";

async function startDev() {
    console.log(`Starting VitePress...`);

    // Let Vite handle port selection
    const proc = spawn(["bun", "run", "vitepress", "dev"], {
        stdio: ["inherit", "inherit", "inherit"],
    });

    await proc.exited;
}

startDev();
