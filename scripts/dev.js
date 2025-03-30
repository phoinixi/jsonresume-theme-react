#!/usr/bin/env node

/**
 * Development script that supports different languages and resume files
 * Usage:
 *   node scripts/dev.js --lang=it
 *   node scripts/dev.js --lang=fr --resume=path/to/custom/resume.json
 *
 * If no language is specified, it will default to English.
 * If no resume is specified, it will look for resume-{lang}.json in the root directory.
 * Falls back to resume.json if the language-specific resume doesn't exist.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
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

// Set environment variables
process.env.VITE_LANGUAGE = lang;

// Replace resume.json with our language-specific resume if needed
if (resumePath !== path.join(rootDir, 'resume.json')) {
  console.log(`Using ${path.basename(resumePath)} for this session...`);
  fs.copyFileSync(resumePath, path.join(rootDir, 'resume.json'));
}

console.log(`Starting dev server with language: ${lang}`);
console.log(`Using resume: ${resumePath}`);

// Start the Vite dev server
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env },
});

vite.on('error', error => {
  console.error('Failed to start dev server:', error);
  process.exit(1);
});
