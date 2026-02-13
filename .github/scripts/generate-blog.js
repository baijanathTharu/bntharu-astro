// generate-blog.js
// Script to generate a blog post using a free AI API and publish it

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const topicsPath = path.join(__dirname, '../topics.json');
const blogDir = path.join(__dirname, '../../src/pages/blog');

// Load topics
const topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
const published = topicsData.published;
const topics = topicsData.topics;

// Select next topic not yet published
const nextTopic = topics.find(t => !published.includes(t.title.replace(/\s+/g, '-').toLowerCase()));
if (!nextTopic) {
  console.log('No new topics to publish.');
  process.exit(0);
}

// Prepare AI prompt
const prompt = `Write a highly detailed, senior engineer-level blog post on the topic: "${nextTopic.title}".\n\nDescription: ${nextTopic.description}\n\nFormat as markdown with Astro frontmatter:\n---\nlayout: '../../../layouts/BlogPost.astro'\ntitle: '${nextTopic.title}'\ndescription: '${nextTopic.description}'\npubDate: '${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}'\nheroImage: '/code.jpg'\nisPublished: true\n---\n\nInclude code examples, explanations, and actionable advice. Minimum 1200 words.`;

// Use Hugging Face Inference API (free tier)
const HF_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
const HF_API_KEY = process.env.AI_API_KEY;

async function generateBlog() {
  try {
    // Azure OpenAI API details
    const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT; // e.g. https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/completions?api-version=2023-05-15
    const AZURE_OPENAI_API_KEY = process.env.AI_API_KEY;
    const AZURE_DEPLOYMENT_NAME = process.env.AZURE_DEPLOYMENT_NAME; // Optional, if endpoint is generic
    const AZURE_API_VERSION = process.env.AZURE_API_VERSION || '2023-05-15';

    // Compose endpoint if needed
    let endpoint = AZURE_OPENAI_ENDPOINT;
    if (!endpoint && AZURE_DEPLOYMENT_NAME) {
      endpoint = `https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/${AZURE_DEPLOYMENT_NAME}/completions?api-version=${AZURE_API_VERSION}`;
    }
    if (!endpoint) {
      throw new Error('Azure OpenAI endpoint not set.');
    }

    // Azure OpenAI request body (Claude Opus)
    const requestBody = {
      prompt,
      max_tokens: 2048,
      temperature: 0.7,
      stop: null
    };

    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      }
    });
    const content = response.data.choices?.[0]?.text || '';
    if (!content || content.length < 1000) {
      throw new Error('AI output too short or missing.');
    }

    // Save blog file
    const year = new Date().getFullYear();
    const fileName = nextTopic.title.replace(/\s+/g, '-').toLowerCase() + '.md';
    const yearDir = path.join(blogDir, String(year));
    if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
    const filePath = path.join(yearDir, fileName);
    fs.writeFileSync(filePath, content);
    console.log('Blog post generated:', filePath);

    // Update topics.json
    published.push(nextTopic.title.replace(/\s+/g, '-').toLowerCase());
    fs.writeFileSync(topicsPath, JSON.stringify({ published, topics }, null, 2));
  } catch (err) {
    console.error('Error generating blog:', err.message);
    process.exit(1);
  }
}

generateBlog();
