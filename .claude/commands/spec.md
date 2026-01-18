---
description: Generate or update technical specification for a file/feature
argument-hint: <relative-path>
---

# Feature Specification Generator

Generate or update the technical specification for: **$ARGUMENTS**

## Process

1. **Read and Analyze the Target File**
   - Read the file at path: `$ARGUMENTS`
   - Identify what type of file it is (component, API route, utility, etc.)
   - Extract the feature/component name from the filename

2. **Trace Dependencies**
   - Find all imports used by this file
   - Identify related API routes (e.g., component → `/api/...`)
   - Find type definitions used
   - Locate translation keys if i18n is used

3. **Check for Existing Specification**
   - Derive spec filename from the source file (e.g., `AIChatbot.tsx` → `ai-chatbot.md`)
   - Check if `docs/specs/<derived-name>.md` exists
   - If exists: compare with current code to identify changes
   - If new: create fresh specification

4. **Generate Specification Document**
   Create or update `docs/specs/<derived-name>.md` with:

   ### Overview
   - Feature purpose and goals
   - User-facing functionality

   ### Architecture
   - Component structure diagram (if applicable)
   - Data flow description
   - Integration points with other parts of the system

   ### Implementation Details
   - Key files and their responsibilities
   - State management approach
   - Event handlers and lifecycle

   ### API/Interface
   - Props (for components)
   - API endpoints (for backend features)
   - Type definitions with code snippets

   ### Security Considerations
   - Input validation
   - Rate limiting (if applicable)
   - Sanitization measures

   ### Internationalization
   - Translation keys used
   - Locale-specific behavior

   ### Related Files
   - List all files that implement this feature
   - Include file paths and primary responsibilities

5. **Version Tracking**
   - Add `Last Updated: YYYY-MM-DD` header
   - Note significant changes from previous version (if updating)

## Output Filename Derivation

Convert the source filename to spec filename:

- `AIChatbot.tsx` → `docs/specs/ai-chatbot.md`
- `ContactSection.tsx` → `docs/specs/contact-section.md`
- `route.ts` (in `/api/chat/`) → `docs/specs/api-chat.md`
- `Navigation.tsx` → `docs/specs/navigation.md`

## Output Format

The specification must be:

- Written in clear, technical English
- Use markdown tables for structured data
- Include code snippets where helpful
- Be comprehensive but scannable
