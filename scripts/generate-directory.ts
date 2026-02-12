#!/usr/bin/env bun
import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface Entry {
  name: string;
  path: string;
  displayName: string;
}

interface CategoryEntries {
  [category: string]: Entry[];
}

const ENTRIES_DIR = join(process.cwd(), 'wiki', 'entries');
const OUTPUT_FILE = join(process.cwd(), 'wiki', 'entries', 'dir.md');

// Category display names and order
const CATEGORY_ORDER = [
  'people',
  'organizations',
  'locations',
  'concepts',
  'subjects',
  'technology',
  'events',
];

const CATEGORY_NAMES: { [key: string]: string } = {
  people: 'People',
  organizations: 'Organizations',
  locations: 'Locations',
  concepts: 'Concepts',
  subjects: 'Subjects',
  technology: 'Technology',
  events: 'Events',
};

function formatEntryName(filename: string): string {
  // Remove .md extension and replace hyphens with spaces
  return filename.replace(/\.md$/, '').replace(/-/g, ' ');
}

function scanEntries(): CategoryEntries {
  const categories: CategoryEntries = {};

  // Read all category directories
  const categoryDirs = readdirSync(ENTRIES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categoryDirs) {
    const categoryPath = join(ENTRIES_DIR, category);
    const files = readdirSync(categoryPath)
      .filter((file) => file.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b));

    categories[category] = files.map((file) => ({
      name: file,
      path: `/entries/${category}/${file.replace(/\.md$/, '')}`,
      displayName: formatEntryName(file),
    }));
  }

  return categories;
}

function generateMarkdown(categories: CategoryEntries): string {
  let output = '';
  
  // Frontmatter to hide nav elements
  output += '---\n';
  output += 'layout: page\n';
  output += 'title: Wiki Directory\n';
  output += 'navbar: false\n';
  output += 'sidebar: false\n';
  output += 'outline: false\n';
  output += '---\n\n';
  
  output += '<style>\n';
  output += '.vp-doc h2 {\n';
  output += '  margin-top: 3rem !important;\n';
  output += '  margin-bottom: 1rem !important;\n';
  output += '}\n';
  output += '.vp-doc ul {\n';
  output += '  margin-bottom: 2rem !important;\n';
  output += '}\n';
  output += '</style>\n\n';
  
  output += '<div style="max-width: 800px; margin: 0 auto; padding: 2rem; font-family: monospace;">\n\n';
  
  output += '```\n';
  output += '═══════════════════════════════════════════════════════════════\n';
  output += '                    NEUKO WIKI DIRECTORY                       \n';
  output += '═══════════════════════════════════════════════════════════════\n';
  output += '\n';
  output += 'A complete index of all wiki entries, organized by category.\n';
  output += '\n';

  // Calculate total entries
  const totalEntries = Object.values(categories).reduce(
    (sum, entries) => sum + entries.length,
    0
  );
  output += `Total Entries: ${totalEntries}\n`;
  output += '```\n\n';
  output += '---\n\n';

  // Output entries by category in specified order
  for (const category of CATEGORY_ORDER) {
    if (!categories[category] || categories[category].length === 0) continue;

    const displayName = CATEGORY_NAMES[category] || category.toUpperCase();
    const entries = categories[category];

    output += '<div style="margin-bottom: 3rem;">\n\n';
    output += `## ${displayName}\n\n`;

    for (const entry of entries) {
      output += `- [${entry.displayName}](${entry.path})\n`;
    }
    
    output += '\n</div>\n\n';
  }

  // Add any categories not in the predefined order
  for (const [category, entries] of Object.entries(categories)) {
    if (CATEGORY_ORDER.includes(category) || entries.length === 0) continue;

    const displayName = CATEGORY_NAMES[category] || category.toUpperCase();

    output += '<div style="margin-bottom: 3rem;">\n\n';
    output += `## ${displayName}\n\n`;

    for (const entry of entries) {
      output += `- [${entry.displayName}](${entry.path})\n`;
    }
    
    output += '\n</div>\n\n';
  }

  output += '---\n\n';
  output += '```\n';
  output += `Last updated: ${new Date().toISOString().split('T')[0]}\n`;
  output += '```\n\n';
  output += '</div>\n';

  return output;
}

function main() {
  console.log('Scanning wiki entries...');
  const categories = scanEntries();

  console.log('Generating directory markdown...');
  const markdown = generateMarkdown(categories);

  console.log(`Writing to ${OUTPUT_FILE}...`);
  writeFileSync(OUTPUT_FILE, markdown, 'utf-8');

  console.log('✓ Directory file generated successfully!');
  console.log(`  Location: ${OUTPUT_FILE}`);
  console.log(`  Accessible at: /entries/dir`);
}

main();
