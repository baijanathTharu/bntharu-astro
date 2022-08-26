---
layout: '../../../layouts/BlogPost.astro'
title: 'Audit the npm dependencies'
description: 'This post shows how to audit our npm dependencies in a project.'
pubDate: 'Aug 04 2022'
heroImage: '/code.jpg'
isPublished: true
---

`npm` CLI offers us a [npm-audit](https://docs.npmjs.com/cli/v7/commands/npm-audit) command in order to perform security audit of our project dependencies. When `npm audit` command is run, it scans our dependencies tree and report vulnerabilities along with their remedies if any. If you provide the `fix` argument then npm will try to apply the remedies.

- The audit command will exit with code 0 if no vulnerabilities are found and with non zero code if vulnerabilities are not found.

- There are two audit end points in order to fetch vulnerabilities informations:

  - Bulk Advisory: Pretty fast end point
  - Quick Audit: Slower than bulk advisory and it is only called when bulk advisory returns some error and invalid data.

- Uses:

```bash
# Scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies
npm audit fix

# Fix without modifying the node_modules and only updating the package-lock.json
npm audit fix --package-lock-only

# Force fix i.e. update to major sem-versions
npm audit fix --force

# Perform a dry run which generate a json output
npm audit fix --dry-run --json

# Set audit-level to moderate
npm audit --audit-level=moderate
```
