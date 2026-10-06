import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Check, 
  Copy, 
  ExternalLink, 
  Terminal, 
  CheckCircle2, 
  Globe, 
  FileCode2,
  Rocket
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const GitHubPagesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useStore();
  const [username, setUsername] = useState('your-github-username');
  const [repoName, setRepoName] = useState('seekana-store');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const liveUrl = `https://${username}.github.io/${repoName}/`;
  const remoteUrl = `https://github.com/${username}/${repoName}.git`;

  const gitCommands = `# 1. Initialize git and commit files
git init
git add .
git commit -m "Deploy SEEKANA to GitHub Pages"

# 2. Add remote repository and push to main
git branch -M main
git remote add origin ${remoteUrl}
git push -u origin main`;

  const workflowYaml = `name: Deploy SEEKANA to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install --legacy-peer-deps
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4`;

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSection(section);
    showToast(`Copied ${section} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl border border-[#E8E8E8] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm tracking-wide">
                Integrated GitHub Pages Deployment
              </h3>
              <p className="text-[11px] text-neutral-400">
                Automated CI/CD Workflow Ready (.github/workflows/deploy.yml)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-none flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">Project Pre-Configured for GitHub Pages</p>
              <p className="text-emerald-800 mt-0.5 leading-relaxed">
                Relative base path (<code className="font-mono bg-emerald-100 px-1">base: './'</code>), single-page 404 fallback, <code className="font-mono bg-emerald-100 px-1">.nojekyll</code>, and GitHub Actions workflow have all been configured.
              </p>
            </div>
          </div>

          {/* Repo Name input for personalized URL */}
          <div className="bg-[#F7F7F5] p-4 border border-[#E8E8E8] space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#111111]" />
              <span>Customize Your Deployment URL</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#555555] mb-1">
                  GitHub Username / Org
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim() || 'your-username')}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] font-mono focus:border-[#111111] focus:outline-none"
                  placeholder="e.g. saifodoosh"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-semibold text-[#555555] mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.trim() || 'seekana-store')}
                  className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] font-mono focus:border-[#111111] focus:outline-none"
                  placeholder="e.g. seekana-store"
                />
              </div>
            </div>

            <div className="pt-2 text-xs text-[#555555]">
              Your live website will be accessible at:
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-bold text-[#111111] block mt-1 hover:underline break-all"
              >
                {liveUrl}
              </a>
            </div>
          </div>

          {/* 3 Simple Steps */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111]">
              Deployment Steps (Automated)
            </h4>

            {/* Step 1 */}
            <div className="border border-[#E8E8E8] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#777777]" />
                  <span>Step 1: Push code to your repository</span>
                </span>
                <button
                  onClick={() => handleCopy(gitCommands, 'Git Commands')}
                  className="text-xs text-[#111111] hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedSection === 'Git Commands' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 bg-[#111111] text-[#EEEEEE] font-mono text-[11px] overflow-x-auto rounded-none">
                {gitCommands}
              </pre>
            </div>

            {/* Step 2 */}
            <div className="border border-[#E8E8E8] p-4 space-y-2">
              <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#777777]" />
                <span>Step 2: Enable GitHub Pages in Repository Settings</span>
              </span>
              <ol className="text-xs text-[#555555] space-y-1 list-decimal pl-5 leading-relaxed">
                <li>Go to your repository on GitHub: <strong className="text-[#111111]">Settings</strong> tab.</li>
                <li>In the left sidebar, click <strong className="text-[#111111]">Pages</strong>.</li>
                <li>Under <strong>Build and deployment &gt; Source</strong>, choose <strong className="text-[#111111]">GitHub Actions</strong>.</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="border border-[#E8E8E8] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-[#777777]" />
                  <span>Workflow File (<code className="font-mono text-[11px]">.github/workflows/deploy.yml</code>)</span>
                </span>
                <button
                  onClick={() => handleCopy(workflowYaml, 'Workflow YAML')}
                  className="text-xs text-[#111111] hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedSection === 'Workflow YAML' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy YAML</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#777777]">
                Already generated in your project root! GitHub Actions triggers automatically on every push to <code className="font-mono">main</code>.
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F7F5] border-t border-[#E8E8E8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
