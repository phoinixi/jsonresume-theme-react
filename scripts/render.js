import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs/promises';
import minimist from 'minimist';

const rootDir = process.cwd();
// Define the fixed output path
const outputFilePathHtml = path.join(rootDir, 'public', 'index.html');
const themeName = 'jsonresume-theme-local';

// Parse arguments using minimist
const argv = minimist(process.argv.slice(2));
const resumeFileRelativePath = argv._[0] || 'resume.json';

// Top-level await is available in ES Modules
const resumeFilePath = path.resolve(rootDir, resumeFileRelativePath);
console.log(`[Render Script] Rendering: ${resumeFileRelativePath} using theme '${themeName}'`);

// --- Validation ---
try {
  await fs.access(resumeFilePath);
} catch {
  console.error(`[Render Script] Error: Input resume file not found at ${resumeFilePath}`);
  process.exit(1);
}
try {
  await fs.access(path.join(rootDir, 'dist', 'index.cjs'));
} catch {
  console.error(
    '[Render Script] Error: Theme build artifact (dist/index.cjs) not found. Please run `npm run build` first.'
  );
  process.exit(1);
}
// --- End Validation ---

try {
  // Ensure the output directory (public) exists
  await fs.mkdir(path.dirname(outputFilePathHtml), { recursive: true });

  // Language detection is still useful for the theme internal logic, but not for path
  let language = 'en';
  try {
    const fileContent = await fs.readFile(resumeFilePath, 'utf-8');
    const resumeData = JSON.parse(fileContent);
    language = resumeData.language || 'en';
  } catch {
    console.warn(
      `[Render Script] Couldn't determine language from ${resumeFileRelativePath}, defaulting to 'en'.`
    );
  }
  console.log(`[Render Script] Detected language: ${language} (Theme will use this)`);

  // Output path is now fixed
  console.log(`[Render Script] Outputting to fixed path: ${outputFilePathHtml}`);

  // Construct and execute the resumed command with the fixed output path
  const commandHtml = `resumed render "${resumeFilePath}" --theme ${themeName} -o "${outputFilePathHtml}"`;
  execSync(commandHtml, { stdio: 'inherit', cwd: rootDir });

  console.log(`[Render Script] Successfully rendered to ${outputFilePathHtml}`);
} catch (error) {
  console.error(`[Render Script] Error processing ${resumeFileRelativePath}:`, error.message);
  if (error.stderr) {
    console.error('resumed stderr:', error.stderr.toString());
  }
  process.exit(1);
}
