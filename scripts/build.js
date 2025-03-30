#!/usr/bin/env node

/**
 * Build script that supports different languages and resume files
 * Usage:
 *   node scripts/build.js --lang=it
 *   node scripts/build.js --lang=fr --resume=path/to/custom/resume.json
 *
 * If no language is specified, it will default to English.
 * If no resume is specified, it will look for resume-{lang}.json in the root directory.
 * Falls back to resume.json if the language-specific resume doesn't exist.
 *
 * The build output will be in dist/{lang}/ directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import minimist from 'minimist';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Parse command line arguments
const argv = minimist(process.argv.slice(2), {
  string: ['lang', 'resume'],
  default: {
    lang: 'en',
    resume: null,
  },
});

// Get the language parameter
const lang = argv.lang;

// Determine resume path
let resumePath = argv.resume;
if (!resumePath) {
  // Only use language-specific resume for non-English languages or if explicitly requested
  if (lang !== 'en') {
    // Try language-specific resume first (e.g., resume-it.json)
    const langSpecificResume = path.join(rootDir, `resume-${lang}.json`);
    if (fs.existsSync(langSpecificResume)) {
      resumePath = langSpecificResume;
      console.log(`Using language-specific resume: ${langSpecificResume}`);
    } else {
      // Fall back to default resume.json
      const defaultResume = path.join(rootDir, 'resume.json');
      if (fs.existsSync(defaultResume)) {
        resumePath = defaultResume;
        console.log(`Using default resume.json (no resume-${lang}.json found)`);
      } else {
        console.error('Error: No resume file found. Create resume.json in the root directory.');
        process.exit(1);
      }
    }
  } else {
    // For English, always use the default resume.json
    const defaultResume = path.join(rootDir, 'resume.json');
    if (fs.existsSync(defaultResume)) {
      resumePath = defaultResume;
      console.log('Using default resume.json for English');
    } else {
      console.error('Error: No resume file found. Create resume.json in the root directory.');
      process.exit(1);
    }
  }
} else {
  // Use provided resume path
  const absoluteResumePath = path.isAbsolute(resumePath)
    ? resumePath
    : path.join(rootDir, resumePath);

  if (!fs.existsSync(absoluteResumePath)) {
    console.error(`Error: Resume file not found at ${absoluteResumePath}`);
    process.exit(1);
  }

  resumePath = absoluteResumePath;
}

try {
  // Copy the specified resume to resume.json if needed
  if (resumePath !== path.join(rootDir, 'resume.json')) {
    console.log(`Using ${path.basename(resumePath)} for build...`);
    fs.copyFileSync(resumePath, path.join(rootDir, 'resume.json'));
  }

  // Set environment variables
  process.env.VITE_LANGUAGE = lang;

  // Build the project
  console.log(`Building project with language: ${lang}`);
  console.log(`Using resume: ${resumePath}`);

  execSync('npm run build:base', { stdio: 'inherit', env: { ...process.env } });

  // Create language-specific directory in dist
  const distDir = path.join(rootDir, 'dist');
  const langDistDir = path.join(rootDir, 'dist', lang);

  if (!fs.existsSync(langDistDir)) {
    fs.mkdirSync(langDistDir, { recursive: true });
  }

  // Copy the built files to language-specific directory
  console.log(`Copying build files to dist/${lang}/`);
  const files = fs.readdirSync(distDir);
  for (const file of files) {
    // Skip directories
    const filePath = path.join(distDir, file);
    if (fs.statSync(filePath).isDirectory() && file !== lang) {
      continue;
    }

    // Skip language directories
    if (file === lang) {
      continue;
    }

    const destPath = path.join(langDistDir, file);
    fs.copyFileSync(filePath, destPath);
  }

  console.log(`Build completed successfully! Output is in dist/${lang}/`);
} catch (error) {
  console.error('Error building project:', error);
  process.exit(1);
}
